"use client";

import { toast } from "sonner";
import { useConfirm } from "@/hooks/use-confirm"; 
import { useState, useEffect, useCallback } from "react";
import { Loader2, Plus, Edit, Trash } from "lucide-react";

import {
    AlertDialog, 
    AlertDialogContent, 
    AlertDialogHeader, 
    AlertDialogTitle, 
    AlertDialogDescription, 
    AlertDialogFooter, 
    AlertDialogCancel
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { RawMaterial } from "../hooks/use-raw-material-sheet";
import { AddEditRawMaterialModal } from "./add-edit-raw-material-modal";

type Props = {
    isOpen: boolean;
    onClose: () => void; 
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

export const RawMaterialManagementModal = ({ isOpen, onClose }: Props) => {
    const [materials, setMaterials] = useState<RawMaterial[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isAddEditOpen, setIsAddEditOpen] = useState(false);
    const [editingMaterial, setEditingMaterial] = useState<RawMaterial | undefined>(undefined);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const [ConfirmDialog, confirm] = useConfirm("Konfirmasi Hapus", "Yakin ingin hapus bahan baku ini?");

    const fetchMaterials = useCallback(async () => {
        setIsLoading(true);
        const token = getAuthToken();
        if (!token) { return; }
        try {
            const response = await fetch("/api/raw-materials", { 
                headers: { 
                    "Authorization": `Bearer ${token}` 
                }
            });
            if (!response.ok) throw new Error("Gagal memuat bahan baku");
            setMaterials(await response.json());
        } catch (error: any) { 
            toast.error(error.message); 
        }
        finally { setIsLoading(false); }
    }, []);

    useEffect(() => {
        if (isOpen) {
            fetchMaterials();
        }
    }, [isOpen, fetchMaterials]);

    const handleAdd = () => {
        setEditingMaterial(undefined);
        setIsAddEditOpen(true);
    };

    const handleEdit = (material: RawMaterial) => {
        setEditingMaterial(material);
        setIsAddEditOpen(true);
    };

    const handleDelete = async (id: string) => {
        const ok = await confirm();
        if (!ok) return;

        setDeletingId(id); 
        const token = getAuthToken();
        if (!token) { 
            return; 
        }

        try {
            const response = await fetch(`/api/raw-materials/${id}`, {
                method: "DELETE",
                headers: { 
                    "Authorization": `Bearer ${token}` 
                }
            });
            if (!response.ok) throw new Error("Gagal menghapus bahan baku");
            toast.success("Bahan baku dihapus");
            fetchMaterials();
        } catch (error: any) { 
            toast.error(error.message); 
        } finally { 
            setDeletingId(null); 
        }
    };

    return (
        <>
            <AddEditRawMaterialModal
                isOpen={isAddEditOpen}
                onClose={() => setIsAddEditOpen(false)}
                onSuccess={fetchMaterials} 
                initialData={editingMaterial}
            />
        
            <ConfirmDialog />

            <AlertDialog open={isOpen} onOpenChange={onClose}>
                <AlertDialogContent className="max-w-xl">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Kelola Bahan Baku</AlertDialogTitle>
                        <AlertDialogDescription>
                            Tambah, edit, atau hapus bahan baku yang Anda gunakan.
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <div className="flex justify-end mb-4">
                        <Button size="sm" onClick={handleAdd}>
                            <Plus className="size-4 mr-2" /> Tambah Baru
                        </Button>
                    </div>

                    {isLoading ? (
                        <div className="flex justify-center h-40">
                            <Loader2 className="animate-spin" />
                        </div>
                    ) : (
                        <div className="space-y-2 max-h-[50vh] overflow-y-auto pr-2 border rounded-md p-2">
                            {materials.length === 0 ? (
                                <p className="text-sm text-gray-500 text-center py-4">
                                    Belum ada bahan baku.
                                </p>
                            ) : materials.map(item => (
                                <div 
                                key={item.id} 
                                className="flex items-center gap-2 p-2 border rounded-md hover:bg-gray-50">
                                    <div className="flex-1">
                                        <p className="font-medium">{item.name}</p>
                                        <p className="text-sm text-gray-600">
                                            {formatCurrency(item.costPerUnit)} / {item.unit}
                                        </p>
                                    </div>
                                    <Button 
                                        variant="outline" 
                                        size="icon" 
                                        onClick={() => handleEdit(item)} 
                                        disabled={!!deletingId}
                                    >
                                        <Edit className="size-4" />
                                    </Button>

                                    <Button 
                                        variant="outline" 
                                        size="icon" 
                                        onClick={() => handleDelete(item.id)} 
                                        disabled={!!deletingId}
                                    >
                                        {deletingId === item.id 
                                        ? <Loader2 className="size-4 animate-spin"/> 
                                        : <Trash className="size-4 text-red-500" />
                                        }
                                    </Button>
                                </div>
                            ))}
                        </div>
                    )}

                    <AlertDialogFooter>
                        <Button onClick={onClose}>Selesai</Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};