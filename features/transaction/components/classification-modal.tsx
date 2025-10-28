"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { GroupType } from "@prisma/client"; 

import { useClassificationModal } from "@/features/transaction/hooks/use-classification-modal";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
    groupType: z.nativeEnum(GroupType, { 
        message: "Tipe grup harus dipilih" 
    }),
});

type FormValues = z.input<typeof formSchema>;

function getAuthToken(): string | null {
    if (typeof window !== "undefined") {
        return localStorage.getItem("token");
    }
    return null;
}

export const ClassificationModal = () => {
    const { isOpen, onClose, itemName, transactionId } = useClassificationModal();
    const [isPending, setIsPending] = useState(false);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            groupType: undefined,
        },
    });

    const onSubmit = async (values: FormValues) => {
        if (!itemName || !transactionId) return;

        setIsPending(true);
        const token = getAuthToken();
        if (!token) {
            toast.error("Sesi Anda berakhir.");
            setIsPending(false);
            return;
        }

        try {
            const response = await fetch("/api/item_mapping", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    itemName: itemName,
                    groupType: values.groupType,
                    transactionIdToUpdate: transactionId,
                }),
            });

            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.message || "Gagal menyimpan klasifikasi");
            }

            toast.success(`Item "${itemName}" berhasil diklasifikasi.`);
            onClose();
            form.reset();

        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setIsPending(false);
        }
    };

    const handleClose = () => {
        if (isPending) return; 
        form.reset();
        onClose();
    };

    return (
        <AlertDialog open={isOpen} onOpenChange={handleClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Item Baru Terdeteksi</AlertDialogTitle>
                    <AlertDialogDescription>
                        Anda memasukkan item <span className="font-bold text-black">{`"${itemName}"`}</span>. 
                        Untuk analisis keuangan, item ini termasuk tipe apa?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            name="groupType"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tipe Item</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        disabled={isPending}
                                        required
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Pilih tipe..." />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value={GroupType.PEMASUKAN}>Pemasukan (Penjualan)</SelectItem>
                                            <SelectItem value={GroupType.VARIABEL}>Biaya Variabel (Bahan Baku, Kemasan)</SelectItem>
                                            <SelectItem value={GroupType.TETAP}>Biaya Tetap (Sewa, Gaji, Listrik)</SelectItem>
                                            <SelectItem value={GroupType.MODAL}>Modal (Beli Aset, Oven, Mesin)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        
                        <AlertDialogFooter>
                            <AlertDialogCancel onClick={handleClose} disabled={isPending}>
                                Batal
                            </AlertDialogCancel>
                            <Button type="submit" disabled={isPending}>
                                {isPending ? <Loader2 className="size-4 animate-spin" /> : "Simpan"}
                            </Button>
                        </AlertDialogFooter>
                    </form>
                </Form>
            </AlertDialogContent>
        </AlertDialog>
    );
};