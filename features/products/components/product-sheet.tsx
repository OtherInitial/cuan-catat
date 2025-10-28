"use client";

import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { HppType } from "@prisma/client";
import { Loader2, Calculator } from "lucide-react";
import { toast } from "sonner";
import { useNewProductSheet } from "@/features/products/hooks/use-new-product-sheet";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import CurrencyInput from 'react-currency-input-field';

import { HppCalculatorModal, RecipeItem } from "./hpp-calculator-modal"; 

const formSchema = z.object({
    name: z.string().min(1, "Nama produk wajib diisi"),
    sellingPrice: z.string().min(1, "Harga jual wajib diisi"),
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

export const ProductSheet = ({ onReload }: { onReload: () => void }) => {
    const { isOpen, onClose } = useNewProductSheet();
    
    const [isLoading, setIsLoading] = useState(true);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
    const [recipe, setRecipe] = useState<RecipeItem[]>([]);
    const [calculatedHpp, setCalculatedHpp] = useState<number | null>(null);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            sellingPrice: "",
            hppCalculationType: HppType.MANUAL,
            manualHpp: null,
        },
    });

    const hppType = form.watch("hppCalculationType");

    const onSubmit = async (values: FormValues) => {
        setIsPending(true);
        const token = getAuthToken();
        if (!token) { 
            setError("Otentikasi gagal. Silakan login ulang.");
            setIsLoading(false);
            return;
         }

        const apiData = {
            name: values.name,
            sellingPrice: parseFloat(values.sellingPrice.replace(/[^0-9,-]+/g, "").replace(",", ".")),
            hppCalculationType: values.hppCalculationType,
            manualHpp: values.manualHpp ? parseFloat(values.manualHpp.replace(/[^0-9,-]+/g, "").replace(",", ".")) : null,
            recipe: recipe, 
        };
        
        try {
            const response = await fetch("/api/products", {
                method: "POST",
                headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
                body: JSON.stringify(apiData)
            });
            
            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.message || "Gagal membuat produk");
            }
            
            toast.success("Produk berhasil dibuat!");
            onReload(); 
            onClose(); 
            form.reset();
            setRecipe([]);
            setCalculatedHpp(null);
            
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setIsPending(false);
        }
    };

    // Callback saat kalkulator ditutup
    const onCalculatorSave = (newRecipe: RecipeItem[], newHpp: number) => {
        setRecipe(newRecipe);
        setCalculatedHpp(newHpp);
        setIsCalculatorOpen(false);
    };
    
    return (
        <>
            <HppCalculatorModal 
                isOpen={isCalculatorOpen}
                onClose={() => setIsCalculatorOpen(false)}
                onSave={onCalculatorSave}
                initialRecipe={recipe}
            />
        
            <Sheet open={isOpen} onOpenChange={onClose}>
                <SheetContent className="overflow-y-auto">
                    <SheetHeader>
                        <SheetTitle>Tambah Produk Baru</SheetTitle>
                        <SheetDescription>
                            Masukkan detail produk yang Anda jual.
                        </SheetDescription>
                    </SheetHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4 px-4">
                            <FormField name="name" control={form.control} render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nama Produk</FormLabel>
                                    <FormControl><Input {...field} placeholder="mis: Nasi Goreng" /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            
                            <FormField name="sellingPrice" control={form.control} render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Harga Jual</FormLabel>
                                    <FormControl>
                                        <CurrencyInput
                                            name={field.name}
                                            ref={field.ref}
                                            onBlur={field.onBlur}
                                            disabled={field.disabled}
                                            value={field.value} 
                                            onValueChange={(value) => field.onChange(value === undefined ? "" : value)}
                                            prefix="Rp " 
                                            customInput={Input} 
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />

                            <FormField name="hppCalculationType" control={form.control} render={({ field }) => (
                                <FormItem className="space-y-3">
                                    <FormLabel>Metode Hitung HPP</FormLabel>
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

                            {hppType === HppType.MANUAL && (
                                <FormField name="manualHpp" control={form.control} render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>HPP Manual</FormLabel>
                                        <FormControl>
                                            <CurrencyInput
                                                name={field.name}
                                                ref={field.ref}
                                                onBlur={field.onBlur}
                                                disabled={field.disabled}
                                                value={field.value ?? undefined} 
                                                onValueChange={(value) => field.onChange(value === undefined ? null : value)}
                                                prefix="Rp " 
                                                customInput={Input} 
                                            />
                                        </FormControl>
                                        <FormDescription>Isi HPP berdasarkan hitungan Anda sendiri.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                            )}
                            
                            {hppType === HppType.OTOMATIS && (
                                <div className="space-y-2">
                                    <FormLabel>HPP Otomatis (via Kalkulator)</FormLabel>
                                    <Button type="button" variant="outline" className="w-full" onClick={() => setIsCalculatorOpen(true)}>
                                        <Calculator className="size-4 mr-2" />
                                        {recipe.length > 0 ? `Edit Resep (${recipe.length} bahan)` : "Buka Kalkulator Resep"}
                                    </Button>
                                    {calculatedHpp !== null && (
                                        <div className="p-2 bg-gray-100 rounded-md text-center">
                                            <p className="text-sm text-gray-600">Total HPP Dihitung:</p>
                                            <p className="font-bold text-lg">Rp {calculatedHpp.toLocaleString('id-ID')}</p>
                                        </div>
                                    )}
                                    <FormDescription>HPP akan dihitung dari bahan baku yang Anda pilih.</FormDescription>
                                </div>
                            )}
                            
                            <SheetFooter>
                                <Button type="submit" disabled={isPending} className="w-full">
                                    {isPending && <Loader2 className="size-4 mr-2 animate-spin" />}
                                    Simpan Produk
                                </Button>
                            </SheetFooter>
                        </form>
                    </Form>
                </SheetContent>
            </Sheet>
        </>
    );
}