"use client";

import { Loader2 } from "lucide-react";

import { useState, useEffect, useRef } from "react";
import * as XLSX from "xlsx"; 
import { toast } from "sonner";

import { useNewTransaction } from "@/features/transaction/hooks/use-new-transaction"; 
import { useEditTransaction } from "@/features/transaction/hooks/use-edit-transaction";

import { Button } from "@/components/ui/button";
import { FinancialReport, columns } from "./columns"; 
import { DataTable } from "@/components/ui/data-table";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function getAuthToken(): string | null {
    return localStorage.getItem("token"); 
}

const currentYear = new Date().getFullYear();

const years = Array.from({ length: 10 }, (_, i) => (currentYear - i).toString());
const months = [
    { value: "1", label: "Januari" }, { value: "2", label: "Februari" }, { value: "3", label: "Maret" },
    { value: "4", label: "April" }, { value: "5", label: "Mei" }, { value: "6", label: "Juni" },
    { value: "7", label: "Juli" }, { value: "8", label: "Agustus" }, { value: "9", label: "September" },
    { value: "10", label: "Oktober" }, { value: "11", label: "November" }, { value: "12", label: "Desember" }
];

export const ReportClient = () => {
    const { onOpen: onNewOpen, isOpen: isNewOpen } = useNewTransaction(); 
    const { isOpen: isEditOpen } = useEditTransaction();
    
    const [data, setData] = useState<FinancialReport[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [selectedYear, setSelectedYear] = useState<string>(currentYear.toString());
    const [selectedMonth, setSelectedMonth] = useState<string>((new Date().getMonth() + 1).toString());

    const fetchData = async () => {
        setIsLoading(true);
        setError(null);
        const token = getAuthToken(); 

        if (!token) {
            setError("Autentikasi tidak ditemukan. Silakan login ulang.");
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch(`/api/transactions?year=${selectedYear}&month=${selectedMonth}`, {
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
    }, [selectedYear, selectedMonth]);

    useEffect(() => {
        if (!isNewOpen && !isEditOpen) {
            fetchData();
        }
    }, [isNewOpen, isEditOpen]);

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    if (fileExtension !== 'xlsx' && fileExtension !== 'xls') {
        toast.error("File yang anda masukkan tidak cocok. Silahkan coba lagi"); 
        
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
        return; 
    }
    
    setIsUploading(true);
    const reader = new FileReader();

    reader.onload = async (event) => {
        try {
            const data = event.target?.result;
            const workbook = XLSX.read(data, { 
                type: "array", 
                cellDates: true 
            });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            
            const json = XLSX.utils.sheet_to_json(worksheet, { 
                raw: false 
            });

            if (json.length === 0) {
                throw new Error("File Excel kosong atau tidak memiliki data.");
            }

            const firstRow = json[0] as any;
            const actualColumns = Object.keys(firstRow);
            
            const requiredColumns = ["Tanggal", "Nama Item", "Jenis Transaksi", "Jumlah Uang"];

            for (const col of requiredColumns) {
                if (!actualColumns.includes(col)) {
                    throw new Error(`Format kolom tidak valid. Kolom "${col}" tidak ditemukan.`);
                }
            }
            
            const transformedData = json.map((row: any) => {
                if (!row.Tanggal || !row["Nama Item"] || !row["Jenis Transaksi"] || !row["Jumlah Uang"]) {
                    console.warn("Melewati baris dengan data tidak lengkap:", row);
                    return null; 
                }

                const type = row["Jenis Transaksi"].toUpperCase();
                if (type !== 'PEMASUKAN' && type !== 'PENGELUARAN') {
                    console.warn(`Melewati baris dengan Tipe Transaksi tidak valid: ${row["Jenis Transaksi"]}`, row);
                    return null;
                }

                return {
                    date: row.Tanggal.toISOString(),
                    itemName: row["Nama Item"],
                    type: type, 
                    amount: parseFloat(row["Jumlah Uang"]),
                    paymentMethodName: row["Metode Pembayaran"] || null, 
                    categoryName: row.Kategori || null,
                };
            }).filter(Boolean); 

            if (transformedData.length === 0) {
                throw new Error("Tidak ada data valid yang dapat diimpor dari file.");
            }
            
            await uploadData(transformedData as any[]); 

        } catch (err: any) {
            // console.error("Kesalahan unggah file:", err.message);
            
            toast.error("File yang anda masukkan tidak cocok. Silahkan coba lagi");

        } finally {
            setIsUploading(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
    };

    reader.readAsArrayBuffer(file);
};

    const uploadData = async (transactions: any[]) => {
        const token = getAuthToken();
        if (!token) {
            toast.error("Sesi Anda berakhir. Silakan login ulang.");
            return;
        }

        try {
            const response = await fetch("/api/transactions/bulk", { 
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ transactions }) 
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Gagal mengunggah data");
            }

            toast.success("Data berhasil diunggah!");
            fetchData(); 

        } catch (err: any) {
            console.error(err);
            toast.error(err.message);
        }
    };

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
                        onClick={onNewOpen} 
                        className="w-full md:w-auto"
                    >
                        + Buat Laporan
                    </Button>
                    <Button 
                        className="w-full md:w-auto"
                        onClick={handleUploadClick} 
                        disabled={isUploading || isLoading} 
                    >
                        {isUploading ? (
                            <Loader2 className="mr-2 size-4 animate-spin" />
                        ) : null}
                        {isUploading ? "Mengunggah..." : "Unggah Excel"}
                    </Button>
                </div>
            </div>

            <div className="flex md:flex-row items-center gap-2 my-5">
                <h4 className="font-semibold">
                    Filter:
                </h4>
                <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                    <SelectTrigger className="w-full md:w-[180px]">
                        <SelectValue placeholder="Pilih Bulan" />
                    </SelectTrigger>
                    <SelectContent>
                        {months.map(m => <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>)}
                    </SelectContent>
                </Select>
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                    <SelectTrigger className="w-full md:w-[180px]">
                        <SelectValue placeholder="Pilih Tahun" />
                    </SelectTrigger>
                    <SelectContent>
                        {years.map(y => <SelectItem key={y} value={y}>{y}</SelectItem>)}
                    </SelectContent>
                </Select>
            </div>

            <DataTable columns={columns} data={data} />

            <input 
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept=".xlsx, .xls" 
            />
        </div>
    );
}