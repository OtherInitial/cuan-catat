"use client";

import { z } from "zod";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { HppType } from "@prisma/client";
import { Loader2, Calculator } from "lucide-react";
import { toast } from "sonner";
import { useEditHppSheet, ProductForHppEdit } from "../hooks/use-edit-hpp-sheet";
import { HppCalculatorModal, RecipeItem } from "./hpp-calculator-modal"; 
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import CurrencyInput from 'react-currency-input-field';

// Skema HANYA untuk form ini
const formSchema = z.object({
    hppCalculationType: z.nativeEnum(HppType),
    manualHpp: z.string().optional().nullable(),
});
type FormValues = z.input<typeof formSchema>;
function getAuthToken(): string | null { 
    if (typeof window !== "undefined") {
        return localStorage.getItem("token");
    }
    return null;
 }

export const EditHppSheet = ({ onReload }: { onReload: () => void }) => {
    const { isOpen, onClose, data } = useEditHppSheet();
    const [isPending, setIsPending] = useState(false);
    
    // State kalkulator
    const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
    // State untuk menyimpan resep BARU dari kalkulator
    const [currentRecipe, setCurrentRecipe] = useState<RecipeItem[]>([]);
    // State untuk HPP BARU dari kalkulator
    const [currentCalculatedHpp, setCurrentCalculatedHpp] = useState<number | null>(null);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
    });

    // Isi form & state resep saat modal terbuka
    useEffect(() => {
        if (data) {
            form.reset({
                hppCalculationType: data.hppCalculationType,
                manualHpp: data.manualHpp?.toString() || null,
            });
            setCurrentRecipe(data.recipe || []); // Isi resep awal
            setCurrentCalculatedHpp(data.calculatedHpp); // Isi HPP awal
        } else {
            // Reset saat ditutup
            form.reset({ hppCalculationType: HppType.MANUAL, manualHpp: null });
            setCurrentRecipe([]);
            setCurrentCalculatedHpp(null);
        }
    }, [data, form]);

    const hppType = form.watch("hppCalculationType");

    const onSubmit = async (values: FormValues) => {
        if (!data) return;
        setIsPending(true);
        const token = getAuthToken();
        if (!token) { /* ... */ return; }

        const apiData = {
            // Kita hanya mengirim data HPP
            hppCalculationType: values.hppCalculationType,
            manualHpp: values.manualHpp ? parseFloat(values.manualHpp.replace(/[^0-9,-]+/g, "").replace(",", ".")) : null,
            recipe: currentRecipe, // Kirim resep terbaru dari state
        };
        
        try {
            const response = await fetch(`/api/products/${data.id}`, { // Gunakan ID produk
                method: "PATCH",
                headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
                body: JSON.stringify(apiData)
            });
            
            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.message || "Gagal menyimpan pengaturan HPP");
            }
            
            toast.success("Pengaturan Modal Produk berhasil disimpan!");
            onReload(); 
            onClose(); 
            
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setIsPending(false);
        }
    };

    const onCalculatorSave = (newRecipe: RecipeItem[], newHpp: number) => {
        setCurrentRecipe(newRecipe);
        setCurrentCalculatedHpp(newHpp);
        setIsCalculatorOpen(false);
    };
    
    return (
        <>
            {/* Kalkulator tetap sama */}
            <HppCalculatorModal 
                isOpen={isCalculatorOpen}
                onClose={() => setIsCalculatorOpen(false)}
                onSave={onCalculatorSave}
                initialRecipe={currentRecipe} // Kirim resep dari state ini
            />
        
            <Sheet open={isOpen} onOpenChange={onClose}>
                <SheetContent className="overflow-y-auto">
                    <SheetHeader>
                        <SheetTitle>Atur Modal Produk (HPP)</SheetTitle>
                        <SheetDescription>
                            Untuk produk: <span className="font-bold">{data?.name}</span>
                        </SheetDescription>
                    </SheetHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4 px-1">
                            
                             <FormField name="hppCalculationType" control={form.control} render={({ field }) => (
                                <FormItem className="space-y-3">
                                    <FormLabel>Pilih Metode Perhitungan</FormLabel>
                                    <FormControl>
                                        <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-4">
                                            <FormItem className="flex items-center space-x-2">
                                                <FormControl><RadioGroupItem value={HppType.MANUAL} /></FormControl>
                                                <FormLabel className="font-normal">Manual</FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center space-x-2">
                                                <FormControl><RadioGroupItem value={HppType.OTOMATIS} /></FormControl>
                                                <FormLabel className="font-normal">Hitung Otomatis</FormLabel>
                                            </FormItem>
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />

                            {/* --- Bagian HPP Dinamis --- */}
                            {hppType === HppType.MANUAL && (
                                <FormField name="manualHpp" control={form.control} render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Modal Produk (HPP) Manual</FormLabel>
                                        <FormControl>
                                            <CurrencyInput
                                                name={field.name} ref={field.ref} onBlur={field.onBlur}
                                                value={field.value ?? undefined} 
                                                onValueChange={(value) => field.onChange(value === undefined ? null : value)}
                                                prefix="Rp " customInput={Input} 
                                            />
                                        </FormControl>
                                        <FormDescription>Isi berdasarkan hitungan Anda sendiri.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                            )}
                            
                            {hppType === HppType.OTOMATIS && (
                                <div className="space-y-2">
                                    <FormLabel>Modal Produk (via Kalkulator)</FormLabel>
                                    <Button type="button" variant="outline" className="w-full" onClick={() => setIsCalculatorOpen(true)}>
                                        <Calculator className="size-4 mr-2" />
                                        {currentRecipe.length > 0 ? `Edit Resep (${currentRecipe.length} bahan)` : "Buka Kalkulator Resep"}
                                    </Button>
                                    {/* Tampilkan HPP yang DIHITUNG, bukan dari DB */}
                                    {(currentCalculatedHpp !== null) && (
                                        <div className="p-2 bg-gray-100 rounded-md text-center">
                                            <p className="text-sm text-gray-600">Total Modal Dihitung:</p>
                                            <p className="font-bold text-lg">Rp {currentCalculatedHpp.toLocaleString('id-ID')}</p>
                                        </div>
                                    )}
                                    <FormDescription>Akan dihitung dari bahan baku yang Anda pilih.</FormDescription>
                                </div>
                            )}
                            
                            <SheetFooter>
                                <Button type="submit" disabled={isPending} className="w-full">
                                    {isPending && <Loader2 className="size-4 mr-2 animate-spin" />}
                                    Simpan Pengaturan HPP
                                </Button>
                            </SheetFooter>
                        </form>
                    </Form>
                </SheetContent>
            </Sheet>
        </>
    );
}