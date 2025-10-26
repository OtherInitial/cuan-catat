"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { Status } from '@/components/Status';

type HistoryData = {
    [year: number]: string[]; // Contoh: { 2025: ['Maret', 'November'], ... }
}

function getAuthToken(): string | null {
    if (typeof window !== "undefined") {
        return localStorage.getItem("token");
    }
    return null;
}

export const HistoryClient = () => {
    const [historyData, setHistoryData] = useState<HistoryData>({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const availableYears = Object.keys(historyData).map(Number).sort((a, b) => b - a);
    const [selectedYear, setSelectedYear] = useState<number | null>(null);

    const monthsForSelectedYear = selectedYear ? historyData[selectedYear] : [];

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            const token = getAuthToken();

            if (!token) {
                setError("Otentikasi gagal. Silakan login ulang.");
                setIsLoading(false);
                return;
            }

            try {
                const response = await fetch('/api/riwayat', {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error("Gagal mengambil data riwayat");
                }

                const data: HistoryData = await response.json();
                setHistoryData(data);

                const firstYear = Object.keys(data).map(Number).sort((a, b) => b - a)[0];
                setSelectedYear(firstYear || null);

            } catch (err: any) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []); 

    if (isLoading) {
        return (
            <div className="bg-white shadow-xl rounded-xl p-5 absolute -mt-12 left-5 right-5 h-64 flex justify-center items-center">
                <Loader2 className="size-8 animate-spin text-gray-500" />
            </div>
        );
    }
    
    if (error) {
         return (
            <div className="bg-white shadow-xl rounded-xl p-5 absolute -mt-12 left-5 right-5 text-center">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    if (availableYears.length === 0) {
        return (
            <div className="bg-white shadow-xl rounded-xl p-5 absolute -mt-12 left-5 right-5 space-y-5">
                <h1 className="font-semibold text-2xl">Riwayat Keuangan</h1>
                <p className="text-gray-600">Anda belum memiliki riwayat transaksi.</p>
            </div>
        );
    }

    return (
        <>
         <Status 
            status="Aman"
         />
         <div className="bg-white shadow-xl rounded-xl p-5 absolute -mt-12 left-5 right-5 space-y-5">
            <h1 className="font-semibold text-2xl">Riwayat Keuangan</h1>

            <div className="flex items-center space-x-3 overflow-x-auto pb-2">
                <p className="text-gray-600 shrink-0">Tahun: </p>
                {availableYears.map((year) => (
                    <Button
                        key={year}
                        variant={selectedYear === year ? 'default' : 'outline'}
                        className="rounded-full font-medium"
                        onClick={() => setSelectedYear(year)}
                    >
                        {year}
                    </Button>
                ))}
            </div>

            <div className="grid grid-cols-1 gap-3 pt-2">
                {selectedYear && monthsForSelectedYear.length > 0 ? (
                    monthsForSelectedYear.map((month) => (
                        <Link
                            key={month}
                            href={`/history/${selectedYear}/${month.toLowerCase()}`}
                            className="w-full text-left p-4 border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 hover:border-blue-500 transition-all duration-200 ease-in-out"
                        >
                            <p className="font-semibold text-gray-700">{month}</p>
                        </Link>
                    ))
                ) : (
                    <p className="text-gray-500 text-center py-4">
                        Tidak ada data untuk tahun {selectedYear}.
                    </p>
                )}
            </div>
        </div>
        </>
        
    );
}