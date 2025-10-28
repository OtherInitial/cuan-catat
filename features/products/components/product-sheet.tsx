"use client";

import { z } from "zod";
import { toast } from "sonner";
import { HppType } from "@prisma/client";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { Loader2, Calculator } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import CurrencyInput from 'react-currency-input-field';

import { useNewProductSheet } from "@/features/products/hooks/use-new-product-sheet";
import { useEditProductSheet } from "@/features/products/hooks/use-edit-product-sheet";

import { 
    Form, 
    FormControl, 
    FormField, 
    FormItem, 
    FormLabel, 
    FormMessage, 
    FormDescription 
} from "@/components/ui/form";
import { 
    Sheet, 
    SheetContent, 
    SheetHeader, 
    SheetTitle, 
    SheetDescription, 
    SheetFooter 
} from "@/components/ui/sheet";
import { 
    RadioGroup, 
    RadioGroupItem 
} from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
    const { isOpen: isNewOpen, onClose: onNewClose } = useNewProductSheet();
    const { isOpen: isEditOpen, onClose: onEditClose, data: editData } = useEditProductSheet();

    const isOpen = isNewOpen || isEditOpen;
    const isEdit = isEditOpen; 

    const onClose = isEdit ? onEditClose : onNewClose; 
    
    const [isLoading, setIsLoading] = useState(true);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
    const [recipe, setRecipe] = useState<RecipeItem[]>([]);
    const [calculatedHpp, setCalculatedHpp] = useState<number | null>(null);

    const [productionYield, setProductionYield] = useState<number>(1);

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

    useEffect(() => {
        if (isOpen) {
            if (isEdit && editData) {
                form.reset({
                    name: editData.name,
                    sellingPrice: editData.sellingPrice.toString(), 
                    hppCalculationType: editData.hppCalculationType,
                    manualHpp: editData.manualHpp?.toString() || null, 
                });
                
                setRecipe(editData.recipe || []); 
                setCalculatedHpp(editData.calculatedHpp);
                setProductionYield(editData.productionYield || 1); 

            } else {
                form.reset({
                    name: "", 
                    sellingPrice: "",
                    hppCalculationType: HppType.MANUAL, 
                    manualHpp: null,
                });
                setRecipe([]);
                setCalculatedHpp(null);
                setProductionYield(1); 
            }
        }
    }, [isOpen, isEdit, editData, form]);

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
            manualHpp: values.hppCalculationType === HppType.MANUAL 
                ? (values.manualHpp ? parseFloat(values.manualHpp.replace(/[^0-9,-]+/g, "").replace(",", ".")) : null) 
                : null,
            recipe: values.hppCalculationType === HppType.OTOMATIS ? recipe : null,
            productionYield: values.hppCalculationType === HppType.OTOMATIS ? productionYield : null,
            calculatedHpp: values.hppCalculationType === HppType.OTOMATIS ? calculatedHpp : null,
        };
        
        try {
            const response = await fetch("/api/products", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json", 
                    "Authorization": `Bearer ${token}` 
                },
                body: JSON.stringify(apiData)
            });
            
            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.message || `Gagal ${isEdit ? 'update' : 'membuat'} produk`);
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

    const onCalculatorSave = (newRecipe: RecipeItem[], newHppPerUnit: number, newYield: number) => {
        setRecipe(newRecipe);
        setCalculatedHpp(newHppPerUnit); 
        console.log("HPP per unit: ", newHppPerUnit);
        setProductionYield(newYield); 
        setIsCalculatorOpen(false);
    };
    
    return (
        <>
            <HppCalculatorModal 
                isOpen={isCalculatorOpen}
                onClose={() => setIsCalculatorOpen(false)}
                onSave={onCalculatorSave}
                initialRecipe={recipe}
                initialYield={productionYield}
            />
        
            <Sheet open={isOpen} onOpenChange={onClose}>
                <SheetContent className="overflow-y-auto">
                    <SheetHeader>
                        <SheetTitle>{isEdit ? "Edit Produk" : "Tambah Produk Baru"}</SheetTitle>
                        <SheetDescription>
                            {isEdit ? "Perbarui detail produk ini." : "Masukkan detail produk yang Anda jual."}
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
                                    <FormLabel>Harga Jual (per pcs)</FormLabel>
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
                                    <FormLabel>Metode Hitung Modal Per Unit (HPP)</FormLabel>
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
                                        <FormLabel>Modal Produk</FormLabel>
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
                                <div className="space-y-2 mt-8">
                                    <FormLabel>Kalkulator HPP</FormLabel>
                                    <Button type="button" variant="outline" className="w-full" onClick={() => setIsCalculatorOpen(true)}>
                                        <Calculator className="size-4 mr-2" />
                                        {recipe.length > 0 ? `Edit Resep (${recipe.length} bahan)` : "Buka Kalkulator Resep"}
                                    </Button>
                                    {calculatedHpp !== null && (
                                        <div className="p-2 bg-gray-100 rounded-md text-center">
                                            <p className="text-sm text-gray-600">Total HPP Dihitung:</p>
                                            <p className="font-bold text-lg">
                                                Rp {calculatedHpp.toLocaleString('id-ID')}
                                            </p>
                                        </div>
                                    )}
                                    <FormDescription>HPP akan dihitung dari bahan baku yang Anda pilih.</FormDescription>
                                </div>
                            )}
                            
                            <SheetFooter>
                                <Button type="submit" disabled={isPending} className="w-full">
                                    {isPending && <Loader2 className="size-4 mr-2 animate-spin" />}
                                    {isEdit ? "Simpan Perubahan" : "Simpan Produk"}
                                </Button>
                            </SheetFooter>
                        </form>
                    </Form>
                </SheetContent>
            </Sheet>
        </>
    );
}