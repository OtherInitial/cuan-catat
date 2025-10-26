"use client"

import { useConfirm } from "@/hooks/use-confirm"
import { toast } from "sonner"
import { Loader2, Trash } from "lucide-react"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
  RowSelectionState
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import React, { useState } from "react"
import { FinancialReport } from "@/app/(home)/report/columns"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

function getAuthToken(): string | null {
    if (typeof window !== "undefined") {
        return localStorage.getItem("token");
    }
    return null;
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const [isDeleting, setIsDeleting] = useState(false);
  const [ConfirmDialog, confirm] = useConfirm(
      "Konfirmasi Pilihan",
      "Apakah anda yakin ingin menghapus semua transaksi yang dipilih?"
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    enableRowSelection: true,
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      rowSelection
    },
  })

  const selectedRows = table.getFilteredSelectedRowModel().rows;

  const handleDeleteSelected = async () => {
    const selectedIds = selectedRows.map(row => (row.original as FinancialReport).id);
    
    const ok = await confirm();
    if (!ok) return;

    setIsDeleting(true);
    const token = getAuthToken();
    if (!token) {
        toast.error("Sesi Anda berakhir. Silakan login ulang.");
        setIsDeleting(false);
        return;
    }

    try {
        const response = await fetch("/api/transactions/bulk-delete", {
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ ids: selectedIds }) 
        });

        if (!response.ok) {
            throw new Error("Gagal menghapus transaksi yang dipilih.");
        }

        toast.success("Transaksi yang dipilih berhasil dihapus.");
        
        window.location.reload();

    } catch (error: any) {
        toast.error(error.message || "Terjadi kesalahan.");
    } finally {
        setIsDeleting(false);
    }
  }

  return (
    <div>
      <ConfirmDialog />

      {selectedRows.length > 0 && (
        <div className="mb-4">
          <Button
            variant="destructive"
            onClick={handleDeleteSelected}
            disabled={isDeleting}
          >
            {isDeleting ? (
                <Loader2 className="size-4 mr-2 animate-spin" />
            ) : (
                <Trash className="size-4 mr-2" />
            )}
            Hapus {selectedRows.length} item terpilih
          </Button>
        </div>
      )}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Sebelumnya
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Berikutnya
        </Button>
      </div>
    </div>
  )
}