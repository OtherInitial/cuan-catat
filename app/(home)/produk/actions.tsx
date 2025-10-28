"use client";

import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { useState } from "react"; 
import { Loader2 } from "lucide-react";
import { Product } from "./page"; 
import { useEditProductSheet } from "@/features/products/hooks/use-edit-product-sheet";
import { useConfirm } from "@/hooks/use-confirm";

type Props = {
    product: Product; 
    onReload: () => void;
};

function getAuthToken(): string | null {    
    if (typeof window !== "undefined") {
        return localStorage.getItem("token");
    }
    return null;
 }

export const Actions = ({ product, onReload }: Props) => {
    const { onOpen: onOpenEdit } = useEditProductSheet(); 
    const [isDeleting, setIsDeleting] = useState(false);
    const [ConfirmDialog, confirm] = useConfirm(
        "Konfirmasi Hapus",
        `Yakin ingin menghapus produk "${product.name}"?`
    );

    const handleDelete = async () => {
        const ok = await confirm();
        if (!ok) return;

        setIsDeleting(true);
        const token = getAuthToken();
        if (!token) { /* ... */ return; }

        try {
            const response = await fetch(`/api/products/${product.id}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${token}` }
            });
            if (!response.ok) {
                 const err = await response.json(); // Coba ambil pesan error
                 throw new Error(err.message || "Gagal menghapus produk");
            }
            toast.success("Produk berhasil dihapus");
            onReload(); // Panggil reload di halaman utama

        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <>
            <ConfirmDialog />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="size-8 p-0" disabled={isDeleting}>
                        {isDeleting ? <Loader2 className="size-4 animate-spin"/> : <MoreHorizontal className="size-4" />}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem
                        disabled={isDeleting}
                        onClick={() => onOpenEdit(product)} // Buka sheet edit dengan data produk
                    >
                        <Edit className="size-4 mr-2" /> Edit Detail
                    </DropdownMenuItem>
                    {/* Anda bisa tambahkan lagi menu "Atur HPP" di sini jika perlu */}
                    <DropdownMenuItem
                        disabled={isDeleting}
                        onClick={handleDelete}
                        className="text-red-500"
                    >
                        <Trash className="size-4 mr-2" /> Hapus Produk
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};