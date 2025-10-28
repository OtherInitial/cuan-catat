"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Product } from "./page"; 
import { Badge } from "@/components/ui/badge";
import { Actions } from "./actions";

const formatCurrency = (value: number | null) => {
    if (value === null) return "-";
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(value);
};

export const columns: ColumnDef<Product>[] = [
    {
        accessorKey: "name",
        header: "Nama Produk",
    },
    {
        accessorKey: "sellingPrice",
        header: "Harga Jual",
        cell: ({ row }) => formatCurrency(row.original.sellingPrice)
    },
    {
        id: "hpp",
        header: "Modal Produk", //Pengganti istilah HPP
        cell: ({ row }) => {
            const hpp = row.original.hppCalculationType === "MANUAL" 
                ? row.original.manualHpp 
                : row.original.calculatedHpp;
            return formatCurrency(hpp);
        }
    },
    {
        id: "laba",
        header: "Laba / unit",
        cell: ({ row }) => {
            const hpp = row.original.hppCalculationType === "MANUAL" 
                ? row.original.manualHpp 
                : row.original.calculatedHpp;
            const laba = row.original.sellingPrice - (hpp || 0);
            return (
                <span className={laba >= 0 ? "text-green-600" : "text-red-600"}>
                    {formatCurrency(laba)}
                </span>
            );
        }
    },
    {
        accessorKey: "hppCalculationType",
        header: "Tipe HPP",
        cell: ({ row }) => {
            const type = row.original.hppCalculationType;
            return <Badge variant={type === "MANUAL" ? "outline" : "default"}>{type}</Badge>
        }
    },
    {
        id: "actions",
        cell: ({ row, table }) => {
            const { onReload } = table.options.meta as any; 
            return <Actions product={row.original} onReload={onReload} />
        },
    },
];