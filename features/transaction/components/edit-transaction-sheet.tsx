"use client";

import { 
    Sheet,
    SheetTitle,
    SheetHeader,
    SheetContent,
    SheetDescription 
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Loader2, Trash } from "lucide-react";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { useEditTransaction } from "@/features/transaction/hooks/use-edit-transaction";
import { TransactionForm, type FormValues } from "./transaction-form";
import { FinancialReport } from "@/app/(home)/report/columns";

type Option = { label: string; value: string; }
type ApiData = { id: string; name: string; }

function getAuthToken(): string | null {
    if (typeof window !== "undefined") {
        return localStorage.getItem("token");
    }
    return null;
}

export const EditTransactionSheet = () => {
    const { id, isOpen, onClose } = useEditTransaction();
    
    const [isLoading, setIsLoading] = useState(true);
    const [isPending, setIsPending] = useState(false);
    
    const [categories, setCategories] = useState<Option[]>([]);
    const [paymentMethods, setPaymentMethods] = useState<Option[]>([]);
    const [defaultValues, setDefaultValues] = useState<FormValues | undefined>(undefined);

    useEffect(() => {
        if (isOpen && id) {
            setIsLoading(true);
            const token = getAuthToken();
            
            if (!token) {
                console.error("Token tidak ditemukan!");
                toast.error("Sesi Anda berakhir. Silakan login ulang.");
                setIsLoading(false);
                onClose();
                return;
            }

            Promise.all([
                fetch("/api/payment_method", { headers: { "Authorization": `Bearer ${token}` } }),
                fetch(`/api/transactions/${id}`, { headers: { "Authorization": `Bearer ${token}` } })
            ])
            .then(async ([pmRes, txRes]) => {
                if (!pmRes.ok || !txRes.ok) throw new Error("Gagal mengambil data");
                
                const paymentMethodsData: ApiData[] = await pmRes.json();
                const txData: FinancialReport = await txRes.json();

                setPaymentMethods(paymentMethodsData.map(pm => ({ label: pm.name, value: pm.id })));
                
                setDefaultValues({
                    date: new Date(txData.date),
                    itemName: txData.itemName,
                    amount: txData.amount.toString(),
                    type: txData.type,
                    paymentMethodId: txData.paymentMethodId || "",
                    categoryId: txData.category?.id || null,
                    // note: txData.note || null,
                });
            })
            .catch(error => {
                console.error("Gagal mengambil data:", error);
                toast.error("Gagal mengambil data.");
            }).finally(() => {
                setIsLoading(false);
            });
        }
    }, [isOpen, id]);

    const onSubmit = async (values: FormValues) => {
        if (!id) return;
        setIsPending(true);
        const token = getAuthToken();
        if (!token) { 
            console.error("Token tidak ditemukan!");
            toast.error("Sesi Anda berakhir. Silakan login ulang.");
            setIsLoading(false);
            onClose();
            return;
        }

        const apiValues = {
            ...values,
            amount: parseFloat(values.amount), 
            date: values.date.toISOString(), 
        };

        try {
            const response = await fetch(`/api/transactions/${id}`, { 
                method: "PATCH", 
                headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
                body: JSON.stringify(apiValues),
            });
            if (!response.ok) throw new Error("Gagal mengupdate transaksi");
            
            toast.success("Transaksi berhasil diupdate");
            onClose();
        } catch (error: any) {
            console.error(error);
            toast.error(error.message);
        } finally {
            setIsPending(false);
        }
    }

    const onDelete = async () => {
        if (!id) return;
        if (!window.confirm("Apakah Anda yakin ingin menghapus transaksi ini?")) {
            return;
        }

        setIsPending(true);
        const token = getAuthToken();

        if (!token) { 
            console.error("Token tidak ditemukan!");
            toast.error("Sesi Anda berakhir. Silakan login ulang.");
            setIsLoading(false);
            onClose();
            return; 
        }

        try {
            const response = await fetch(`/api/transactions/${id}`, { 
                method: "DELETE", 
                headers: { "Authorization": `Bearer ${token}` },
            });
            if (!response.ok) throw new Error("Gagal menghapus transaksi");

            toast.success("Transaksi berhasil dihapus");
            onClose();
        } catch (error: any) {
            console.error(error);
            toast.error(error.message);
        } finally {
            setIsPending(false);
        }
    }

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="space-y-1">
                <SheetHeader>
                    <SheetTitle>Edit Transaksi</SheetTitle>
                    <SheetDescription>Update atau hapus transaksi ini.</SheetDescription>
                </SheetHeader>
                {isLoading ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Loader2 className="size-4 animate-spin text-muted-foreground"/>
                    </div>
                ) : (
                    <TransactionForm
                        onSubmit={onSubmit}
                        disabled={isPending}
                        paymentMethodOptions={paymentMethods}
                        initialValues={defaultValues} 
                        isEdit={true}
                    />
                )}

                {/* <div className="w-full px-4">
                    <Button
                        variant="outline"
                        className="w-full text-red-500 hover:text-red-600"
                        disabled={isPending}
                        onClick={onDelete}
                    >
                        <Trash className="size-4 mr-2" /> Hapus Transaksi Ini
                </Button>
                </div> */}
            </SheetContent>
        </Sheet>
    );
}