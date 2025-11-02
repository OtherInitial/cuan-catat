"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { GroupType } from "@prisma/client";

import { useEditClassification } from "@/features/transaction/hooks/use-edit-classification";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetFooter,
} from "@/components/ui/sheet";
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
    groupType: z.nativeEnum(GroupType),
});
type FormValues = z.input<typeof formSchema>;

function getAuthToken(): string | null {
    if (typeof window !== "undefined") return localStorage.getItem("token");
    return null;
}

export const EditClassificationModal = ({ onReload }: { onReload: () => void }) => {
    const { isOpen, onClose, item } = useEditClassification();
    const [isPending, setIsPending] = useState(false);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
    });

    useEffect(() => {
        if (item) {
            form.reset({ groupType: item.groupType });
        }
    }, [item, form]);

    const onSubmit = async (values: FormValues) => {
        if (!item) return;

        setIsPending(true);
        const token = getAuthToken();
        if (!token) {
            toast.error("Sesi Anda berakhir.");
            setIsPending(false);
            return;
        }

        try {
            const response = await fetch(`/api/item_mapping/${item.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ groupType: values.groupType }),
            });

            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.message || "Gagal menyimpan klasifikasi");
            }

            toast.success(`Item "${item.itemName}" berhasil diupdate.`);
            onReload(); // Panggil fungsi reload dari parent
            onClose();

        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setIsPending(false);
        }
    };

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Edit Klasifikasi Item</SheetTitle>
                    <SheetDescription>
                        Ubah klasifikasi untuk <span className="font-bold text-black">{`"${item?.itemName}"`}</span>.
                    </SheetDescription>
                </SheetHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
                        <FormField
                            name="groupType"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className="px-4">
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
                        <SheetFooter>
                            <Button type="submit" disabled={isPending}>
                                {isPending ? <Loader2 className="size-4 animate-spin" /> : "Simpan"}
                            </Button>
                        </SheetFooter>
                    </form>
                </Form>
            </SheetContent>
        </Sheet>
    );
};