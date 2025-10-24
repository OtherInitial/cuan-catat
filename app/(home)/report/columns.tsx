"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, ArrowUpDown } from "lucide-react"
import { TransactionType } from "@prisma/client" 

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

export type FinancialReport = {
  id: string
  date: string 
  itemName: string
  type: TransactionType 
  amount: number 

  category?: {
    name: string
  } | null
  
  paymentMethod?: {
    name: string
  } | null
}

export const columns: ColumnDef<FinancialReport>[] = [
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
          const report = row.original
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                <DropdownMenuItem>
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Hapus
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Lihat Detail</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        },
    },
]