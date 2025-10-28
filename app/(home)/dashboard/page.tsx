"use client";

import { useState, useEffect } from 'react';
import { 
    Card, 
    CardContent, 
    CardDescription, 
    CardFooter, 
    CardHeader, 
    CardTitle 
} from '@/components/ui/card';
import { 
    Loader2, 
    Package, 
    ShoppingBag, 
    TrendingUp 
} from 'lucide-react';
import { DashboardChart } from './dashboard-chart';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

import Link from 'next/link';
import { format } from 'date-fns'; 
import { id } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { useNewTransaction } from '@/features/transaction/hooks/use-new-transaction';

type RecentTransaction = {
    id: string;
    itemName: string;
    date: string; 
    amount: number;
    type: string; 
}

interface DashboardData {
    saldo: number;
    saldoPercent: number;
    pemasukan: number;
    pemasukanPercent: number;
    pengeluaran: number;
    pengeluaranPercent: number;
    dateRange: string; 
    salesSummary: { 
        totalRevenue: number;
        totalUnitsSold: number;
        bestProductName: string;
        bestProductUnits: number;
    };
    chartData: { 
        day: string; 
        Pemasukan: number; 
        Pengeluaran: number 
    }[];
    recentTransactions: RecentTransaction[];
}

function getAuthToken(): string | null {
    if (typeof window !== "undefined") {
        return localStorage.getItem("token");
    }
    return null;
}

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

export default function DashboardPage() {
    const router = useRouter();
    const { onOpen: onNewOpen } = useNewTransaction();

    const [data, setData] = useState<DashboardData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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
                const response = await fetch(`/api/dashboard`, {
                    headers: { "Authorization": `Bearer ${token}` }
                });

                if (!response.ok) {
                    const errData = await response.json();
                    throw new Error(errData.message || "Gagal mengambil data");
                }
                
                const result: DashboardData = await response.json();
                setData(result);
                
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
            <div className="relative -mt-32 px-4 md:px-8"> 
                <Card className="shadow-lg border-none min-h-[50vh] flex items-center justify-center">
                    <Loader2 className="size-12 animate-spin text-gray-500" />
                </Card>
            </div>
        );
    }

    if (error) {
        return (
            <div className="relative -mt-32 px-4 md:px-8">
                <Card className="shadow-lg border-none min-h-[50vh] flex items-center justify-center">
                    <p className="text-red-500">{error}</p>
                </Card>
            </div>
        )
    }

    if (!data) {
        return (
             <div className="relative -mt-32 px-4 md:px-8">
                <Card className="shadow-lg border-none min-h-[50vh] flex items-center justify-center">
                    <p>Data tidak ditemukan.</p>
                </Card>
            </div>
        );
    }

    return (
        <div className="relative -mt-24 container mx-auto px-4 space-y-6 pb-12">
            <Card className="shadow-lg border-none">
                <CardHeader>
                    <CardTitle className="text-base font-medium text-gray-600">
                        Penjualan Bulan Ini
                    </CardTitle>
                    <CardDescription>{data.dateRange}</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="flex items-center space-x-3">
                        <ShoppingBag className="size-8 text-green-500" />
                        <div>
                            <p className="text-sm text-gray-500">Pendapatan</p>
                            <p className="text-xl font-semibold">{formatCurrency(data.salesSummary.totalRevenue)}</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3">
                        <Package className="size-8 text-blue-500" />
                        <div>
                            <p className="text-sm text-gray-500">Unit Terjual</p>
                            <p className="text-xl font-semibold">{data.salesSummary.totalUnitsSold} unit</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3 col-span-2 md:col-span-1">
                        <TrendingUp className="size-8 text-purple-500" />
                        <div>
                            <p className="text-sm text-gray-500">Produk Terlaris</p>
                            <p className="text-xl font-semibold">{data.salesSummary.bestProductName} ({data.salesSummary.bestProductUnits} unit)</p>
                        </div>
                    </div>
                </CardContent>
            
                <CardFooter>
                        <Button 
                        className="w-full md:w-auto" 
                        size="lg"
                        onClick={() => router.push("/produk-penjualan")}
                        >
                            Lihat Penjualan per Produk
                        </Button>
                    
                </CardFooter>
            </Card>
            
            <Card className="shadow-lg border-none">
                <CardHeader>
                    <CardTitle className="text-base font-medium text-gray-600">Laba Bersih Bulan Ini</CardTitle>
                    <p className="text-sm text-gray-500">{data.dateRange}</p>
                </CardHeader>
                <CardContent>
                    <p className="text-3xl font-bold text-gray-900">{formatCurrency(data.saldo)}</p>
                    <PercentDisplay value={data.saldoPercent} />
                </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-6">
                <Card className="shadow-lg border-none">
                    <CardHeader>
                        <CardTitle className="text-base font-medium text-gray-600">Pemasukan</CardTitle>
                        <p className="text-sm text-gray-500">{data.dateRange}</p>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold text-gray-900 mb-2">{formatCurrency(data.pemasukan)}</p>
                        <PercentDisplay value={data.pemasukanPercent} />
                    </CardContent>
                </Card>

                <Card className="shadow-lg border-none">
                    <CardHeader>
                        <CardTitle className="text-base font-medium text-gray-600">Pengeluaran</CardTitle>
                        <p className="text-sm text-gray-500">{data.dateRange}</p>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold text-gray-900 mb-2">{formatCurrency(data.pengeluaran)}</p>
                        <PercentDisplay value={data.pengeluaranPercent} />
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Kolom 1: Diagram */}
                <div>
                    <h2 className="text-xl font-semibold text-gray-800 pt-4">
                        Diagram Transaksi Harian
                    </h2>
                    <Card className="shadow-lg border-none min-h-[300px] mt-4">
                        <CardContent className="pt-6">
                            <DashboardChart data={data.chartData} />
                        </CardContent>
                    </Card>
                </div>

                <div>
                    <div className="flex justify-between items-center pt-4">
                        <h2 className="text-xl font-semibold text-gray-800">
                            Transaksi Terakhir
                        </h2>
                        {/* <Button variant="outline" size="sm" onClick={onNewOpen}>
                            <Plus className="size-4 mr-2" />
                            Tambah Data
                        </Button> */}
                    </div>

                    <div className="space-y-3 mt-4">
                        {data.recentTransactions.map(tx => (
                            <Card key={tx.id} className="p-4 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="font-semibold capitalize">{tx.itemName}</p>
                                        <p className="text-sm text-gray-500">
                                            {format(new Date(tx.date), "PPP", { locale: id })}
                                        </p>
                                    </div>
                                    <p className={cn(
                                        "font-semibold",
                                        tx.type === "PEMASUKAN" ? "text-green-600" : "text-red-600"
                                    )}>
                                        {tx.type === "PEMASUKAN" ? "+" : "-"} {formatCurrency(tx.amount)}
                                    </p>
                                </div>
                            </Card>
                        ))}
                        
                        <Button 
                            variant="outline" 
                            className="w-full h-14 flex items-center justify-center text-gray-600 hover:text-black" 
                            asChild
                        >
                            <Link href="/report">
                                Lihat Semua Transaksi &rarr;
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}