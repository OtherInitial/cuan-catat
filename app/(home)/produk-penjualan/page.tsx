"use client";

import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

interface ProductSale {
    id: string;
    name: string;
    unitsSold: number;
    revenue: number;
    hppPerUnit: number;
    profitPerUnit: number;
    statusText: string;
    statusColor: string;
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

export default function ProductSalesPage() {
    const [data, setData] = useState<ProductSale[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const token = getAuthToken();
            // TODO: Tambahkan filter bulan/tahun
            
            try {
                const res = await fetch('/api/product-sales', {
                    headers: { "Authorization": `Bearer ${token}` }
                });
                if (!res.ok) throw new Error("Gagal mengambil data");
                const result = await res.json();
                setData(result);
            } catch (error: any) {
                toast.error(error.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <Loader2 className="size-12 animate-spin text-gray-500" />
            </div>
        );
    }

    return (
        <div className="relative -mt-28 container mx-auto px-4 pb-12">
            <Card className="shadow-lg border-none">
                <CardHeader>
                    <CardTitle>Penjualan Produk Bulan Ini</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Produk</TableHead>
                                    <TableHead className="text-center">Terjual</TableHead>
                                    <TableHead className="text-right">Pendapatan</TableHead>
                                    <TableHead className="text-right">HPP/unit</TableHead>
                                    <TableHead className="text-right">Laba/unit</TableHead>
                                    <TableHead className="text-center">Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {data.map((item) => (
                                    <TableRow key={item.id} className="hover:bg-gray-50">
                                        <TableCell className="font-medium">{item.name}</TableCell>
                                        <TableCell className="text-center">{item.unitsSold} unit</TableCell>
                                        <TableCell className="text-right">{formatCurrency(item.revenue)}</TableCell>
                                        <TableCell className="text-right text-red-600">{formatCurrency(item.hppPerUnit)}</TableCell>
                                        <TableCell className="text-right text-green-600 font-medium">{formatCurrency(item.profitPerUnit)}</TableCell>
                                        <TableCell className="text-center">
                                            <span className="font-medium">
                                                {item.statusColor} {item.statusText}
                                            </span>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        {data.length === 0 && (
                            <p className="text-center text-gray-500 py-8">
                                Belum ada produk yang terjual bulan ini.
                            </p>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}