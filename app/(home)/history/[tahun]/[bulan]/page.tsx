"use client";

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { TransactionChart } from './transaction-chart'; 
import { CashflowStatus } from '@prisma/client';
import { cn } from '@/lib/utils';

interface HistoryDetail {
    kondisi: string;
    statusEnum: CashflowStatus;
    saldo: number;
    saldoPercent: number;
    pemasukan: number;
    pemasukanPercent: number;
    pengeluaran: number;
    pengeluaranPercent: number;
    tanggalMulai: string; 
    tanggalSelesai: string;
    transactions: { name: string; Pemasukan: number; Pengeluaran: number }[];
}

function getAuthToken(): string | null {
    if (typeof window !== "undefined") {
        return localStorage.getItem("token");
    }
    return null;
}

const MONTH_MAP: { [key: string]: { nama: string; range: string } } = {
    januari: { nama: "Januari", range: "01 - 31 Jan" },
    februari: { nama: "Februari", range: "01 - 28 Feb" }, // Nanti bisa ditambahkan logika tahun kabisat
    maret: { nama: "Maret", range: "01 - 31 Mar" },
    april: { nama: "April", range: "01 - 30 Apr" },
    mei: { nama: "Mei", range: "01 - 31 Mei" },
    juni: { nama: "Juni", range: "01 - 30 Jun" },
    juli: { nama: "Juli", range: "01 - 31 Jul" },
    agustus: { nama: "Agustus", range: "01 - 31 Agu" },
    september: { nama: "September", range: "01 - 30 Sep" },
    oktober: { nama: "Oktober", range: "01 - 31 Okt" },
    november: { nama: "November", range: "01 - 30 Nov" },
    desember: { nama: "Desember", range: "01 - 31 Des" },
};

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(value);
};

const PercentDisplay = ({ value }: { value: number }) => {
    const isPositive = value > 0;
    const colorClass = isPositive ? "text-green-600" : "text-red-600";
    const formattedValue = `${isPositive ? '+' : ''}${value.toFixed(1)}%`;

    return (
        <p className={`text-sm font-medium ${colorClass}`}>
            {formattedValue} dari bulan sebelumnya
        </p>
    );
};

const statusMap = {
    [CashflowStatus.SEHAT]: "from-green-400 to-green-600",
    [CashflowStatus.WASPADA]: "from-yellow-400 to-yellow-600",
    [CashflowStatus.KRITIS]: "from-red-400 to-red-600",
};

export default function DetailRiwayatPage() {
    const params = useParams();
    const { tahun, bulan } = params;

    const [data, setData] = useState<HistoryDetail | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const monthName = MONTH_MAP[bulan as string]?.nama || (bulan as string);
    const dateRange = MONTH_MAP[bulan as string]?.range || `01 - 30 ${monthName.slice(0, 3)}`;
    const pageTitle = `Riwayat Bulan ${monthName} Tahun ${tahun}`;

    useEffect(() => {
        if (!tahun || !bulan) return; 

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
                const response = await fetch(`/api/riwayat/detail?year=${tahun}&month=${bulan}`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    const errData = await response.json();
                    throw new Error(errData.message || "Gagal mengambil data");
                }
                
                const result: HistoryDetail = await response.json();
                setData(result);
                
            } catch (err: any) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();

    }, [tahun, bulan]); 

    if (isLoading) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <Loader2 className="size-12 animate-spin text-emerald-600" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-emerald-600 text-white p-6 pb-24 rounded-b-3xl shadow-md text-center">
                <h1 className="text-2xl font-semibold">Oops!</h1>
                <p className="text-lg opacity-90 mt-1">
                    {error}
                </p>
            </div>
        )
    }

    if (!data) {
        return <div className="p-6">Data tidak ditemukan.</div>;
    }

    const backgroundClass = statusMap[data.statusEnum] || statusMap[CashflowStatus.SEHAT];

    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            <div className={cn(
                "text-white px-6 pt-16 pb-32 rounded-b-2xl shadow-md",
                "bg-gradient-to-br", 
                backgroundClass      
            )}>
                <h1 className="text-2xl font-semibold">{pageTitle}</h1>
                <p className="text-lg opacity-90 mt-1">
                    Kondisi keuanganmu: <span className="font-semibold">{data.kondisi}</span>
                </p>
            </div>

            <div className="container mx-auto -mt-16 px-4 space-y-6">

                <Card className="shadow-lg border-none">
                    <CardHeader>
                        <CardTitle className="text-base font-medium text-gray-600">Saldo</CardTitle>
                        <p className="text-sm text-gray-500">{dateRange}</p>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold text-gray-900">{formatCurrency(data.saldo)}</p>
                        <PercentDisplay value={data.saldoPercent} />
                    </CardContent>
                </Card>

                <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
                    <Card className="shadow-lg border-none">
                        <CardHeader>
                            <CardTitle className="text-base font-medium text-gray-600">Pemasukan</CardTitle>
                            <p className="text-sm text-gray-500">{dateRange}</p>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold text-gray-900 mb-2">{formatCurrency(data.pemasukan)}</p>
                            <PercentDisplay value={data.pemasukanPercent} />
                        </CardContent>
                    </Card>

                    <Card className="shadow-lg border-none">
                        <CardHeader>
                            <CardTitle className="text-base font-medium text-gray-600">Pengeluaran</CardTitle>
                            <p className="text-sm text-gray-500">{dateRange}</p>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold text-gray-900 mb-2">{formatCurrency(data.pengeluaran)}</p>
                            <PercentDisplay value={data.pengeluaranPercent} />
                        </CardContent>
                    </Card>
                </div>

                <h2 className="text-xl font-semibold text-gray-800 pt-4">
                    Diagram Transaksi
                </h2>

                <Card className="shadow-lg border-none min-h-[300px]">
                    <CardContent className="pt-6">
                        <TransactionChart data={data.transactions} />
                    </CardContent>
                </Card>

            </div>
        </div>
    );
}