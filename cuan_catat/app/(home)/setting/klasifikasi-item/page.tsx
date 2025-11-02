"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { DataTable } from "@/components/ui/data-table"; // Gunakan ulang DataTable
import { MappingItem } from "@/features/transaction/hooks/use-edit-classification";
import { EditClassificationModal } from "@/features/transaction/components/edit-classification-modal";
import { columns } from "./column";

function getAuthToken(): string | null {
    if (typeof window !== "undefined") return localStorage.getItem("token");
    return null;
}

export default function KlasifikasiItemPage() {
    const [data, setData] = useState<MappingItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        setIsLoading(true);
        const token = getAuthToken();
        if (!token) {
            toast.error("Sesi Anda berakhir.");
            setIsLoading(false);
            return;
        }
        
        try {
            const response = await fetch("/api/item_mapping", {
                headers: { "Authorization": `Bearer ${token}` }
            });
            if (!response.ok) throw new Error("Gagal mengambil data");
            
            const mappings: MappingItem[] = await response.json();
            setData(mappings);
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    // Ambil data saat halaman dimuat
    useEffect(() => {
        fetchData();
    }, []);

    // Render modal edit di sini
    // Kirim 'fetchData' sebagai prop 'onReload'
    return (
        <>
            <EditClassificationModal onReload={fetchData} />
            
            <div className="p-4 md:p-8">
                <h1 className="font-semibold text-2xl mb-4">
                    Manajemen Klasifikasi Item
                </h1>
                <p className="text-gray-600 mb-6">
                    Kelola kamus internal yang digunakan untuk mengklasifikasikan transaksi Anda secara otomatis.
                </p>

                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <Loader2 className="size-8 animate-spin text-gray-500" />
                    </div>
                ) : (
                    <div className="bg-white p-4 rounded-lg shadow">
                        <DataTable columns={columns} data={data} />
                    </div>
                )}
            </div>
        </>
    );
}