"use client";

import { 
    Loader2, 
    Trash, 
    Settings 
} from "lucide-react";
import { toast } from "sonner";
import Select from "react-select";
import { useState, useEffect, useCallback } from "react";

import { 
    AlertDialog, 
    AlertDialogContent, 
    AlertDialogHeader, 
    AlertDialogTitle, 
    AlertDialogDescription, 
    AlertDialogFooter, 
    AlertDialogCancel
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { RawMaterialManagementModal } from "@/features/raw-materials/components/raw-material-management-modal";

interface RawMaterial {
    id: string;
    name: string;
    unit: string;
    costPerUnit: number;
}

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
    onSave: (recipe: RecipeItem[], totalHpp: number, yieldAmount: number) => void;
    initialRecipe: RecipeItem[];
    initialYield: number;
}

function getAuthToken(): string | null { 
    if (typeof window !== "undefined") {
        return localStorage.getItem("token");
    }
    return null; 
}

export const HppCalculatorModal = ({ 
    isOpen, 
    onClose, 
    onSave, 
    initialRecipe,
    initialYield 
}: Props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isManageOpen, setIsManageOpen] = useState(false);
    const [currentQuantity, setCurrentQuantity] = useState<number>(0);
    const [rawMaterials, setRawMaterials] = useState<RawMaterial[]>([]);
    const [recipeItems, setRecipeItems] = useState<RecipeItem[]>(initialRecipe);
    const [selectedMaterial, setSelectedMaterial] = useState<RawMaterial | null>(null);
    const [productionYield, setProductionYield] = useState<number>(initialYield || 1);

    const fetchMaterials = useCallback(() => {
        setIsLoading(true);
        const token = getAuthToken();
        if (!token) { toast.error("Sesi tidak valid"); return; }

        fetch("/api/raw-materials", { headers: { 
            "Authorization": `Bearer ${token}` 
        }})
        .then(res => res.json())
        .then(data => setRawMaterials(data))
        .catch(() => toast.error("Gagal memuat bahan baku"))
        .finally(() => setIsLoading(false));
    }, []);

    useEffect(() => {
        if (isOpen) {
            fetchMaterials();
        }
    }, [isOpen, fetchMaterials]);
    
    const handleManageModalClose = () => {
        setIsManageOpen(false);
        fetchMaterials(); 
    };

    useEffect(() => {
        setRecipeItems(initialRecipe);
        setProductionYield(initialYield || 1);
    }, [initialRecipe, initialYield]);

    const totalBatchCost = recipeItems.reduce((acc, item) => {
        return acc + (item.costPerUnit * item.quantity);
    }, 0);

    const hppPerUnit = productionYield > 0 ? totalBatchCost / productionYield : 0;

    const handleAddItem = () => {
        if (!selectedMaterial || currentQuantity <= 0) {
            toast.error("Pilih bahan baku dan isi jumlahnya");
            return;
        }
        
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
        
        setSelectedMaterial(null);
        setCurrentQuantity(0);
    };

    const handleRemoveItem = (rawMaterialId: string) => {
        setRecipeItems(prev => prev.filter(item => item.rawMaterialId !== rawMaterialId));
    };

    const handleSave = () => {
        if (productionYield <= 0) {
            toast.error("Jumlah unit dihasilkan harus lebih dari 0");
            return;
        }
        
        onSave(recipeItems, hppPerUnit, productionYield);
    };
    
    const materialOptions = rawMaterials.map(m => ({
        label: `${m.name} (Rp ${m.costPerUnit}/${m.unit})`,
        value: m
    }));

    return (
        <>
            <RawMaterialManagementModal
                isOpen={isManageOpen}
                onClose={handleManageModalClose} 
            />

            <AlertDialog open={isOpen} onOpenChange={onClose}>
                <AlertDialogContent className="max-w-3xl">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Kalkulator HPP Otomatis</AlertDialogTitle>
                        <AlertDialogDescription>
                            Masukkan semua bahan baku untuk <strong>satu kali produksi</strong>, lalu masukkan jumlah unit yang dihasilkan.
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    {isLoading ? (
                        <div className="flex justify-center items-center h-40">
                            <Loader2 className="animate-spin text-muted-foreground" />
                        </div>
                    ) : (
                        <div className="space-y-4 max-h-[65vh] overflow-y-auto pr-4">
                            
                            <div className="space-y-2 p-2 border rounded-md">
                                {recipeItems.length === 0 ? (
                                    <p className="text-sm text-gray-500 text-center py-4">Resep masih kosong...</p>
                                ) : recipeItems.map(item => (
                                    <div key={item.rawMaterialId} className="flex items-center gap-3 p-2 border rounded-md">
                                        <div className="flex-1">
                                            <p className="font-medium">{item.name}</p>
                                            <p className="text-sm text-gray-600">
                                                {item.quantity} {item.unit} @ Rp {item.costPerUnit.toLocaleString('id-ID')}
                                            </p>
                                        </div>
                                        <p className="font-semibold text-base">
                                            Rp {(item.quantity * item.costPerUnit).toLocaleString('id-ID')}
                                        </p>
                                        <Button variant="outline" size="icon" onClick={() => handleRemoveItem(item.rawMaterialId)}>
                                            <Trash className="size-4 text-red-500" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        
                            <div className="p-4 border rounded-md shadow-sm grid grid-cols-3 gap-4 items-center">
                                <div className="col-span-3 sm:col-span-2">
                                    <div className="flex justify-between items-center mb-1">
                                        <Label htmlFor="material-select" className="text-sm font-medium">Bahan Baku</Label>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            className="text-xs text-blue-600 hover:text-blue-800"
                                            onClick={() => setIsManageOpen(true)}
                                        >
                                            <Settings className="size-3 mr-1" /> Kelola
                                        </Button>
                                    </div>
                                    <Select 
                                        id="material-select"
                                        options={materialOptions}
                                        value={selectedMaterial ? { label: selectedMaterial.name, value: selectedMaterial } : null}
                                        onChange={(option) => setSelectedMaterial(option?.value || null)}
                                        placeholder="Cari bahan baku..."
                                        className="text-sm"
                                    />
                                </div>
                                <div className="col-span-3 sm:col-span-1">
                                    <Label htmlFor="material-quantity" className="text-sm font-medium">Jumlah</Label>
                                    <Input 
                                        id="material-quantity"
                                        type="number"
                                        value={currentQuantity}
                                        onChange={(e) => setCurrentQuantity(parseFloat(e.target.value) || 0)}
                                        placeholder="Jml"
                                        className="mt-1"
                                    />
                                </div>
                                <div className="col-span-3">
                                    <Button 
                                        variant="secondary" 
                                        onClick={handleAddItem} 
                                        className="w-full"
                                    >
                                        Tambahkan ke Resep
                                    </Button>
                                </div>
                            </div>
                            
                            <div className="pt-4 border-t space-y-4">
                                <div className="flex justify-between items-center">
                                    <Label htmlFor="production-yield" className="text-base">Jumlah Unit Dihasilkan</Label>
                                    <Input 
                                        id="production-yield"
                                        type="number"
                                        className="w-28"
                                        value={productionYield}
                                        onChange={(e) => setProductionYield(parseFloat(e.target.value) || 0)}
                                        placeholder="cth: 50"
                                    />
                                </div>
                                <div className="flex justify-between items-center">
                                    <p className="text-sm font-medium">Total Modal Resep (1x Produksi)</p>
                                    <p className="text-lg font-bold">
                                        Rp {totalBatchCost.toLocaleString('id-ID')}
                                    </p>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                                    <p className="text-lg font-semibold">Estimasi Modal per Unit (HPP)</p>
                                    <p className="text-xl font-bold text-blue-600">
                                        Rp {hppPerUnit.toLocaleString('id-ID')}
                                    </p>
                                </div>
                            </div>

                        </div>
                    )}

                    <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <Button 
                            onClick={handleSave} 
                            disabled={isLoading || recipeItems.length === 0 || productionYield <= 0}
                        >
                            Simpan HPP & Resep
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};