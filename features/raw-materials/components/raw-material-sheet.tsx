"use client";

import { z } from "zod";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRawMaterialSheet } from "../hooks/use-raw-material-sheet";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CurrencyInput from 'react-currency-input-field';

const formSchema = z.object({
    name: z.string().min(1, "Nama wajib diisi"),
    unit: z.string().min(1, "Satuan wajib diisi"),
    costPerUnit: z.string().min(1, "Biaya wajib diisi"),
});
type FormValues = z.input<typeof formSchema>;
function getAuthToken(): string | null { 
    if (typeof window !== "undefined") {
        return localStorage.getItem("token");
    }
    return null; 
 }

export const RawMaterialSheet = ({ onReload }: { onReload: () => void }) => {
    const { isOpen, onClose, isEdit, data } = useRawMaterialSheet();
    const [isPending, setIsPending] = useState(false);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
    });

    useEffect(() => {
        if (isEdit && data) {
            form.reset({
                name: data.name,
                unit: data.unit,
                costPerUnit: data.costPerUnit.toString(),
            });
        } else {
            form.reset({ name: "", unit: "", costPerUnit: "" });
        }
    }, [isOpen, isEdit, data, form]);

    const onSubmit = async (values: FormValues) => {
        setIsPending(true);
        const token = getAuthToken();
        if (!token) { /* ... */ return; }

        const apiData = {
            name: values.name,
            unit: values.unit,
            costPerUnit: parseFloat(values.costPerUnit.replace(/[^0-9,-]+/g, "").replace(",", ".")),
        };
        
        const url = isEdit ? `/api/raw-materials/${data?.id}` : "/api/raw-materials";
        const method = isEdit ? "PATCH" : "POST";

        try {
            const response = await fetch(url, {
                method: method,
                headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
                body: JSON.stringify(apiData)
            });
            
            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.message || `Gagal ${isEdit ? 'update' : 'membuat'} bahan baku`);
            }
            
            toast.success(`Bahan baku berhasil ${isEdit ? 'diupdate' : 'dibuat'}!`);
            onReload();
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
                    <SheetTitle>{isEdit ? "Edit Bahan Baku" : "Bahan Baku Baru"}</SheetTitle>
                    <SheetDescription>
                        {isEdit ? "Edit detail bahan baku ini." : "Tambahkan bahan baku baru untuk resep Anda."}
                    </SheetDescription>
                </SheetHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
                        <FormField name="name" control={form.control} render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nama Bahan Baku</FormLabel>
                                <FormControl><Input {...field} placeholder="mis: Tepung Terigu" /></FormControl>
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
                        
                        <SheetFooter>
                            <Button type="submit" disabled={isPending} className="w-full">
                                {isPending && <Loader2 className="size-4 mr-2 animate-spin" />}
                                {isEdit ? "Simpan Perubahan" : "Simpan Bahan Baku"}
                            </Button>
                        </SheetFooter>
                    </form>
                </Form>
            </SheetContent>
        </Sheet>
    );
};