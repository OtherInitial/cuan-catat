// features/products/components/hpp-calculator-modal.tsx
"use client";

import { useState, useEffect } from "react";
import { Loader2, Plus, Trash } from "lucide-react";
import { toast } from "sonner";
import Select from "react-select"; // Import react-select
import { 
    AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Tipe data bahan baku dari API
interface RawMaterial {
    id: string;
    name: string;
    unit: string;
    costPerUnit: number;
}
// Tipe data item resep
export interface RecipeItem {
    rawMaterialId: string;
    name: string;
    unit: string;
    costPerUnit: number;
    quantity: number;
}

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onSave: (recipe: RecipeItem[], totalHpp: number) => void;
    initialRecipe: RecipeItem[];
}
function getAuthToken(): string | null { if (typeof window !== "undefined") {
        return localStorage.getItem("token");
    }
    return null; }

export const HppCalculatorModal = ({ isOpen, onClose, onSave, initialRecipe }: Props) => {
    const [rawMaterials, setRawMaterials] = useState<RawMaterial[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [recipeItems, setRecipeItems] = useState<RecipeItem[]>(initialRecipe);
    
    // State untuk form tambah
    const [selectedMaterial, setSelectedMaterial] = useState<RawMaterial | null>(null);
    const [currentQuantity, setCurrentQuantity] = useState<number>(0);

    // 1. Ambil data bahan baku saat modal dibuka
    useEffect(() => {
        if (isOpen) {
            setIsLoading(true);
            const token = getAuthToken();
            if (!token) { toast.error("Sesi tidak valid"); return; }

            fetch("/api/raw-materials", { headers: { "Authorization": `Bearer ${token}` }})
                .then(res => res.json())
                .then(data => setRawMaterials(data))
                .catch(() => toast.error("Gagal memuat bahan baku"))
                .finally(() => setIsLoading(false));
        }
    }, [isOpen]);
    
    // 2. Set resep awal
    useEffect(() => {
        setRecipeItems(initialRecipe);
    }, [initialRecipe]);

    // 3. Hitung Total HPP
    const totalHpp = recipeItems.reduce((acc, item) => {
        return acc + (item.costPerUnit * item.quantity);
    }, 0);

    // 4. Handler Tambah Item ke Resep
    const handleAddItem = () => {
        if (!selectedMaterial || currentQuantity <= 0) {
            toast.error("Pilih bahan baku dan isi jumlahnya");
            return;
        }
        
        // Cek duplikat
        if (recipeItems.find(item => item.rawMaterialId === selectedMaterial.id)) {
            toast.error(`${selectedMaterial.name} sudah ada di resep.`);
            return;
        }

        setRecipeItems(prev => [
            ...prev,
            {
                rawMaterialId: selectedMaterial.id,
                name: selectedMaterial.name,
                unit: selectedMaterial.unit,
                costPerUnit: selectedMaterial.costPerUnit,
                quantity: currentQuantity,
            }
        ]);
        
        // Reset form
        setSelectedMaterial(null);
        setCurrentQuantity(0);
    };

    // 5. Handler Hapus Item dari Resep
    const handleRemoveItem = (rawMaterialId: string) => {
        setRecipeItems(prev => prev.filter(item => item.rawMaterialId !== rawMaterialId));
    };

    // 6. Handler Simpan Resep (kirim data ke parent)
    const handleSave = () => {
        onSave(recipeItems, totalHpp);
    };
    
    // Opsi untuk React-Select
    const materialOptions = rawMaterials.map(m => ({
        label: `${m.name} (Rp ${m.costPerUnit}/${m.unit})`,
        value: m
    }));

    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent className="max-w-2xl">
                <AlertDialogHeader>
                    <AlertDialogTitle>Kalkulator HPP Otomatis</AlertDialogTitle>
                    <AlertDialogDescription>
                        Tambahkan bahan baku yang dibutuhkan untuk membuat 1 unit produk ini.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                {isLoading ? (
                    <div className="flex justify-center h-40"><Loader2 className="animate-spin" /></div>
                ) : (
                    <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                        {/* --- Daftar Item Resep --- */}
                        <div className="space-y-2">
                            {recipeItems.length === 0 ? (
                                <p className="text-sm text-gray-500 text-center py-4">Resep masih kosong...</p>
                            ) : recipeItems.map(item => (
                                <div key={item.rawMaterialId} className="flex items-center gap-2 p-2 border rounded-md">
                                    <div className="flex-1">
                                        <p className="font-medium">{item.name}</p>
                                        <p className="text-sm text-gray-600">
                                            {item.quantity} {item.unit} @ Rp {item.costPerUnit.toLocaleString('id-ID')}
                                        </p>
                                    </div>
                                    <p className="font-semibold text-lg">
                                        Rp {(item.quantity * item.costPerUnit).toLocaleString('id-ID')}
                                    </p>
                                    <Button variant="outline" size="icon" onClick={() => handleRemoveItem(item.rawMaterialId)}>
                                        <Trash className="size-4 text-red-500" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    
                        {/* --- Form Tambah Item --- */}
                        <div className="flex items-end gap-2 p-4 border rounded-md shadow-sm">
                            <div className="flex-1">
                                <label className="text-sm font-medium">Bahan Baku</label>
                                <Select 
                                    options={materialOptions}
                                    value={selectedMaterial ? { label: selectedMaterial.name, value: selectedMaterial } : null}
                                    onChange={(option) => setSelectedMaterial(option?.value || null)}
                                    placeholder="Cari bahan baku..."
                                />
                            </div>
                            <div className="w-28">
                                <label className="text-sm font-medium">Jumlah</label>
                                <Input 
                                    type="number"
                                    value={currentQuantity}
                                    onChange={(e) => setCurrentQuantity(parseFloat(e.target.value) || 0)}
                                    placeholder="Jml"
                                />
                            </div>
                            <Button variant="secondary" onClick={handleAddItem}>
                                <Plus className="size-4" />
                            </Button>
                        </div>
                    </div>
                )}
                
                {/* --- Footer Total --- */}
                <div className="pt-4 border-t">
                    <div className="flex justify-between items-center">
                        <p className="text-lg font-semibold">Total HPP per Produk</p>
                        <p className="text-2xl font-bold text-blue-600">
                            Rp {totalHpp.toLocaleString('id-ID')}
                        </p>
                    </div>
                </div>

                <AlertDialogFooter>
                    <AlertDialogCancel>Batal</AlertDialogCancel>
                    <Button onClick={handleSave} disabled={isLoading || recipeItems.length === 0}>
                        Simpan HPP & Resep
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};