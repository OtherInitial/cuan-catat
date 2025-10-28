// app/(home)/produk/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Loader2, Plus } from "lucide-react";
import { toast } from "sonner";
import { DataTable } from "@/components/ui/data-table"; 
import { Button } from "@/components/ui/button";
import { useNewProductSheet } from "@/features/products/hooks/use-new-product-sheet";
import { columns } from "./columns";
import { ProductSheet } from "@/features/products/components/product-sheet";
import { EditHppSheet } from "@/features/products/components/edit-hpp-sheet"; 
import { RecipeItem } from "@/features/products/components/hpp-calculator-modal"; 

export interface Product {
    id: string;
    name: string;
    sellingPrice: number;
    hppCalculationType: "MANUAL" | "OTOMATIS";
    manualHpp: number | null;
    calculatedHpp: number | null;
    recipe: RecipeItem[] | null; 
    productionYield: number | null;
}

function getAuthToken(): string | null { 
    if (typeof window !== "undefined") {
        return localStorage.getItem("token");
    }
    return null;
}

export default function ProdukPage() {
    const [data, setData] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { onOpen } = useNewProductSheet();
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        setIsLoading(true);
        const token = getAuthToken();
        if (!token) { 
            setError("Otentikasi gagal. Silakan login ulang.");
            setIsLoading(false);
            return;
         }

        try {
            const response = await fetch("/api/products", {
                headers: { "Authorization": `Bearer ${token}` }
            });
            if (!response.ok) throw new Error("Gagal mengambil data produk");
            const result: Product[] = await response.json();
            setData(result);
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const onReload = () => fetchData();

    return (
        <>
            <ProductSheet onReload={onReload} />
            <EditHppSheet onReload={onReload}/>

            <div className="relative -mt-24 container mx-auto px-4 pb-12">
                <div className="bg-white p-4 rounded-lg shadow-lg">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-semibold text-gray-800">
                            Daftar Produk
                        </h1>
                        <Button onClick={onOpen}>
                            <Plus className="size-4 mr-2" />
                            Tambah Produk
                        </Button>
                    </div>

                    {isLoading ? (
                        <div className="flex justify-center items-center h-64">
                            <Loader2 className="size-8 animate-spin text-gray-500" />
                        </div>
                    ) : (
                        <DataTable columns={columns} data={data} 
                        meta={{ onReload: onReload }}
                        />
                    )}
                </div>
            </div>
        </>
    );
}