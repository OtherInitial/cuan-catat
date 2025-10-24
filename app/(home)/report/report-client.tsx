"use client";

import { Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

import { useNewTransaction } from "@/features/transaction/hooks/use-new-transaction"; 

import { Button } from "@/components/ui/button";
import { FinancialReport, columns } from "./columns"; 
import { DataTable } from "@/components/ui/data-table";

function getAuthToken(): string | null {
    return localStorage.getItem("id");
}

export const ReportClient = () => {
    const { onOpen, isOpen } = useNewTransaction(); 
    
    const [data, setData] = useState<FinancialReport[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        setIsLoading(true);
        setError(null);
        const token = localStorage.getItem("token");

        if (!token) {
            setError("Autentikasi tidak ditemukan. Silakan login ulang.");
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch("/api/transactions", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error("Gagal mengambil data transaksi");
            }

            const transactions: FinancialReport[] = await response.json();
            setData(transactions);

        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (!isOpen) {
            fetchData();
        }
    }, [isOpen]); 

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="size-8 animate-spin text-gray-500" />
            </div>
        )
    }

    if (error) {
        return (
            <div className="bg-white shadow-xl rounded-xl p-5 -mt-12 text-center">
                <p className="text-red-500">{error}</p>
                <Button onClick={fetchData} className="mt-4">Coba Lagi</Button>
            </div>
        )
    }

    return (
        <div className="bg-white shadow-xl rounded-xl p-5 absolute -mt-12 left-5 right-5">
            <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
                <div className="mt-6 md:mt-0">
                    <h2 className="text-xl font-semibold mb-4">Riwayat Transaksi</h2>
                </div>
                <div className="w-full md:w-auto flex flex-col md:flex-row space-y-3 md:space-x-3">
                    <Button 
                        onClick={onOpen} 
                        className="w-full md:w-auto"
                    >
                        + Buat Laporan
                    </Button>
                    <Button className="w-full md:w-auto">
                        Unggah Excel
                    </Button>
                </div>
            </div>

            <DataTable columns={columns} data={data} />
        </div>
    );
}