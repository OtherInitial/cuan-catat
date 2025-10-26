"use client"

import type React from "react";
import { useState } from "react";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { toast } from "sonner"; 

import { useConfirm } from "@/hooks/use-confirm";
import { useEditTransaction } from "@/features/transaction/hooks/use-edit-transaction";

import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

function getAuthToken(): string | null {
    if (typeof window !== "undefined") {
        return localStorage.getItem("token");
    }
    return null;
}

type Props = {
  id: string
}

const Actions = ({ id }: Props) => {
  const { onOpen } = useEditTransaction();
  
  const [isPending, setIsPending] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [ConfirmDialog, confirm] = useConfirm(
      "Konfirmasi Pilihan",
      "Apakah anda yakin ingin menghapus transaksi ini?"
    )

  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDropdownOpen(false)

    setTimeout(() => {
      onOpen(id)
    }, 100)
  }

  const handleDelete = async () => {
    const ok = await confirm();

    if(ok){
      setIsPending(true);
      const token = getAuthToken();

      if (!token) {
          toast.error("Sesi Anda berakhir. Silakan login ulang.");
          setIsPending(false);
          return;
      }

      try {
        const response = await fetch(`/api/transactions/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error("Gagal menghapus transaksi");
        }
        
        toast.success("Transaksi berhasil dihapus");
        
        window.location.reload(); 

      } catch (error: any) {
        console.error(error);
        toast.error(error.message || "Gagal menghapus transaksi.");
      } finally {
        setIsPending(false);
      }
    }
  }

  return (
    <>
    <ConfirmDialog/>
      <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="size-8 p-0" disabled={isPending}>
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem 
            disabled={isPending} 
            onClick={handleEdit}
          >
            <Edit className="size-4 mr-2" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem 
            disabled={isPending} 
            onClick={handleDelete}
          >
            <Trash className="size-4 mr-2" />
            Hapus
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export { Actions }