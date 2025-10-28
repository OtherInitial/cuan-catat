// app/(home)/bahan-baku/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Loader2, Plus } from "lucide-react";
import { toast } from "sonner";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { columns } from "./columns";
import { RawMaterialSheet } from "@/features/raw-materials/components/raw-material-sheet";
import { useRawMaterialSheet, RawMaterial } from "@/features/raw-materials/hooks/use-raw-material-sheet";

function getAuthToken(): string | null { 
    if (typeof window !== "undefined") {
        return localStorage.getItem("token");
    }
    return null; 
 }

export default function BahanBakuPage() {
    const [data, setData] = useState<RawMaterial[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { onOpen } = useRawMaterialSheet(); 

    const fetchData = async () => {
        setIsLoading(true);
        const token = getAuthToken();
        if (!token) { /* ... */ return; }

        try {
            const response = await fetch("/api/raw-materials", {
                headers: { "Authorization": `Bearer ${token}` }
            });
            if (!response.ok) throw new Error("Gagal mengambil bahan baku");
            const result: RawMaterial[] = await response.json();
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
            {/* Sediakan Sheet/Modal di sini */}
            <RawMaterialSheet onReload={onReload} />

            <div className="relative -mt-24 container mx-auto px-4 pb-12">
                <div className="bg-white p-4 rounded-lg shadow-lg">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-semibold text-gray-800">
                            Bahan Baku
                        </h1>
                        <Button onClick={onOpen}>
                            <Plus className="size-4 mr-2" />
                            Tambah Bahan Baku
                        </Button>
                    </div>

                    {isLoading ? (
                        <div className="flex justify-center items-center h-64">
                            <Loader2 className="size-8 animate-spin text-gray-500" />
                        </div>
                    ) : (
                        <DataTable columns={columns} data={data} />
                    )}
                </div>
            </div>
        </>
    );
}