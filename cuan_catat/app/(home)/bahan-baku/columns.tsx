"use client";

import { ColumnDef } from "@tanstack/react-table";
import { RawMaterial } from "@/features/raw-materials/hooks/use-raw-material-sheet";
import { Actions } from "./actions"; 

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(value);
};

export const columns: ColumnDef<RawMaterial>[] = [
    { accessorKey: "name", header: "Nama Bahan" },
    { accessorKey: "unit", header: "Satuan" },
    {
        accessorKey: "costPerUnit",
        header: "Biaya per Satuan",
        cell: ({ row }) => formatCurrency(row.original.costPerUnit)
    },
    { id: "actions", cell: ({ row }) => <Actions data={row.original} /> },
];