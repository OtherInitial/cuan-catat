"use client"

import { ColumnDef } from "@tanstack/react-table";
import { TransactionType } from "@prisma/client"; 
import { ArrowUpDown } from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox" ;
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Actions } from "./actions";

export type FinancialReport = {
  id: string
  date: string 
  itemName: string
  type: TransactionType 
  amount: number 
  category?: {
    name: string
    id: string
  } | null
  paymentMethod?: {
    name: string
  } | null
  paymentMethodId? : string
  productId?: string | null
}

export const columns: ColumnDef<FinancialReport>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "date", 
        header: "Tanggal",
        cell: ({ row }) => {
            const date = new Date(row.getValue("date"))
            return <span>{date.toLocaleDateString("id-ID")}</span>
        }
    },
    {
        accessorKey: "itemName", 
        header: "Nama Item",
    },
    {
        accessorKey: "type", 
        header: "Jenis Transaksi",
        cell: ({ row }) => {
            const type = row.getValue("type") as TransactionType
            return <Badge variant={type === 'PEMASUKAN' ? 'default' : 'destructive'}>{type}</Badge>
        }
    },
    {
        accessorKey: "amount", 
        header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Jumlah Uang
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
        },
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("amount"))
            const formatted = new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(amount)
   
            return <div className="text-left font-medium">{formatted}</div>
        },
    },
    {
        accessorKey: "paymentMethod", 
        header: "Metode Pembayaran",
        cell: ({ row }) => {
            const paymentMethod = row.original.paymentMethod
            return <span>{paymentMethod?.name || "N/A"}</span>
        }
    },
    {
        id: "actions",
        cell: ({ row }) => {
          const report = row.original;
          return (
            <Actions id={report.id} />
          )
        },
    },
]