"use client";

import { z } from "zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import CurrencyInput from 'react-currency-input-field';

import { 
    Form, 
    FormControl, 
    FormField, 
    FormItem, 
    FormLabel, 
    FormMessage 
} from "@/components/ui/form";
import { 
    AlertDialog, 
    AlertDialogContent, 
    AlertDialogHeader, 
    AlertDialogTitle, 
    AlertDialogDescription, 
    AlertDialogFooter, 
    AlertDialogCancel 
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RawMaterial } from "../hooks/use-raw-material-sheet"; 

const formSchema = z.object({ 
    name: z.string().min(1, "Nama wajib diisi"),
    unit: z.string().min(1, "Satuan wajib diisi"),
    costPerUnit: z.string().min(1, "Biaya wajib diisi"),
 });

type FormValues = z.input<typeof formSchema>;

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void; 
    initialData?: RawMaterial; 
}
function getAuthToken(): string | null { 
    if (typeof window !== "undefined") {
        return localStorage.getItem("token");
    }
    return null; 
 }

export const AddEditRawMaterialModal = ({ isOpen, onClose, onSuccess, initialData }: Props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const isEdit = !!initialData; 

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
    });

    useEffect(() => {
        if (isOpen) {
            if (isEdit && initialData) {
                form.reset({
                    name: initialData.name,
                    unit: initialData.unit,
                    costPerUnit: initialData.costPerUnit.toString(),
                });
            } else {
                form.reset({ name: "", unit: "", costPerUnit: "" });
            }
        }
    }, [isOpen, isEdit, initialData, form]);


    const onSubmit = async (values: FormValues) => {
        setIsPending(true);
        const token = getAuthToken();

        if (!token) { 
            setError("Autentikasi gagal. Silakan login ulang.");
            setIsLoading(false);
            return; 
        }

        const apiData = { 
            name: values.name,
            unit: values.unit,
            costPerUnit: parseFloat(values.costPerUnit.replace(/[^0-9,-]+/g, "").replace(",", ".")),
         };

        const url = isEdit ? `/api/raw-materials/${initialData?.id}` : "/api/raw-materials";
        const method = isEdit ? "PATCH" : "POST";

        try {
            const response = await fetch(url, { 
                method: method,
                headers: { 
                    "Content-Type": "application/json", 
                    "Authorization": `Bearer ${token}` 
                },
                body: JSON.stringify(apiData)
             });

            if (!response.ok) { 
                const err = await response.json();
                throw new Error(err.message || `Gagal ${isEdit ? 'update' : 'membuat'} bahan baku`);
             }

            toast.success(`Bahan baku berhasil ${isEdit ? 'diupdate' : 'dibuat'}!`);
            onSuccess();
            onClose();

        } catch (error: any) { 
            toast.error(error.message);
         }
        finally { setIsPending(false); }
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
                    <AlertDialogTitle>
                        {isEdit ? "Edit Bahan Baku" : "Tambah Bahan Baku Baru"}
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        {isEdit ? "Edit detail bahan baku ini." : "Tambahkan bahan baku baru untuk resep Anda."}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField 
                            name="name" 
                            control={form.control} 
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nama Bahan Baku</FormLabel>
                                    
                                    <FormControl>
                                        <Input {...field} placeholder="mis: Tepung Terigu" />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )} />
                            
                            <div className="flex gap-4">
                                <FormField name="unit" control={form.control} render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Satuan</FormLabel>
                                        <FormControl><Input {...field} placeholder="mis: gram, ml, pcs" /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                <FormField name="costPerUnit" control={form.control} render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Biaya / Satuan</FormLabel>
                                        <FormControl>
                                            <CurrencyInput
                                                name={field.name} ref={field.ref} onBlur={field.onBlur}
                                                value={field.value}
                                                onValueChange={(value) => field.onChange(value === undefined ? "" : value)}
                                                prefix="Rp " customInput={Input}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                            </div>
                            
                            <AlertDialogFooter>
                                <AlertDialogCancel onClick={handleClose} disabled={isPending}>Batal</AlertDialogCancel>

                                <Button type="submit" disabled={isPending}>
                                    {isPending && <Loader2 className="size-4 mr-2 animate-spin" />}
                                    {isEdit ? "Simpan Perubahan" : "Simpan Bahan Baku"}
                                </Button>
                            </AlertDialogFooter>
                    </form>
                </Form>
            </AlertDialogContent>
        </AlertDialog>
    );
};