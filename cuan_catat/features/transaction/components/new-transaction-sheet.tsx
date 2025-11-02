"use client";

import { 
    Sheet,
    SheetTitle,
    SheetHeader,
    SheetContent,
    SheetDescription 
} from "@/components/ui/sheet";
import { useNewTransaction } from "@/features/transaction/hooks/use-new-transaction";
import { useClassificationModal } from "@/features/transaction/hooks/use-classification-modal";

import { TransactionForm, type FormValues } from "@/features/transaction/components/transaction-form";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner"; 
import { useRouter } from "next/navigation"; 

type Option = { 
    label: string; 
    value: string; 
}

type ApiData = { 
    id: string; 
    name: string; 
}

function getAuthToken(): string | null {
    if (typeof window !== "undefined") {
        return localStorage.getItem("token");
    }
    return null;
}

export const NewTransactionSheet = () => {
    const router = useRouter();
    const { isOpen, onClose } = useNewTransaction();
    
    const { onOpen: onClassificationOpen } = useClassificationModal();
    
    const [categories, setCategories] = useState<Option[]>([]);
    const [paymentMethods, setPaymentMethods] = useState<Option[]>([]);

    const [isLoading, setIsLoading] = useState(true);
    const [isPending, setIsPending] = useState(false);

    const [products, setProducts] = useState<Option[]>([]);

    useEffect(() => {
        if (isOpen) {
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
                fetch("/api/payment_method", { 
                    headers: { 
                        "Authorization": `Bearer ${token}` 
                    }
                }),
                fetch("/api/products", { 
                    headers: { 
                        "Authorization": `Bearer ${token}` 
                    } 
                })
            ])
            .then(async ([pmRes, prodRes]) => {
                if (!pmRes.ok || !prodRes.ok) throw new Error("Gagal mengambil data default");

                const pmData: ApiData[] = await pmRes.json();
                
                const prodData: { 
                    id: string, 
                    name: string 
                }[] = await prodRes.json(); 

                setPaymentMethods(pmData.map(d => (
                    { 
                        label: d.name, 
                        value: d.id 
                    }
                )));

                setProducts(prodData.map(p => (
                    { 
                        label: p.name, 
                        value: p.id 
                    }
                ))); 

            })
            .catch(error => {
                console.error("Gagal mengambil data:", error);
                toast.error("Gagal mengambil data default.");
            }).finally(() => {
                setIsLoading(false);
            });
        }
    }, [isOpen, onClose]); 
    
    const onSubmit = async (values: FormValues) => {
        setIsPending(true);
        const token = getAuthToken();
        if (!token) {
            toast.error("Sesi Anda berakhir. Silakan login ulang.");
            setIsPending(false);
            return;
        }

        const apiValues = {
            ...values,
            amount: parseFloat(values.amount), 
            date: values.date.toISOString(), 
        };

        try {
            const response = await fetch("/api/transactions", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(apiValues),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || "Gagal membuat transaksi");
            }
            
            if (response.status === 201) {
                toast.success("Transaksi berhasil dibuat!");
                onClose();
            } else if (response.status === 202 && result.status === "NEEDS_CLASSIFICATION") {
                toast.info(`Item baru "${result.itemName}" perlu diklasifikasi.`);
                
                onClassificationOpen(result.itemName, result.transactionId); 
                
                onClose();
            } else {
                throw new Error("Menerima respons tidak terduga dari server.");
            }      
        } catch (error: any) {
            console.error(error);
            toast.error(error.message); 
        } finally {
            setIsPending(false);
        }
    }

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent 
                className="space-y-2"
            >
                <SheetHeader>
                    <SheetTitle>
                        Transaksi Baru
                    </SheetTitle>
                    <SheetDescription>
                        Tambahkan transaksi baru untuk memantau aktivitas transaksi
                    </SheetDescription>
                </SheetHeader>
                {
                    isLoading
                    ? (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Loader2 className="size-4 animate-spin text-muted-foreground"/>
                        </div>
                    )
                    : (
                        <TransactionForm
                            onSubmit={onSubmit}
                            disabled={isPending} 
                            // categoryOptions={categories}
                            paymentMethodOptions={paymentMethods}
                            productOptions={products}
                        />
                    )
                }
            </SheetContent>
        </Sheet>
    );
}