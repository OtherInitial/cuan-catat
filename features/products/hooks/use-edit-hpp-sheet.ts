import { create } from "zustand";
import { HppType } from "@prisma/client";
import { RecipeItem } from "../components/hpp-calculator-modal"; // Ambil tipe dari kalkulator

// Tipe data produk yang akan diedit HPP-nya
export interface ProductForHppEdit {
    id: string;
    name: string;
    hppCalculationType: HppType;
    manualHpp: number | null;
    calculatedHpp: number | null;
    recipe: RecipeItem[]; // Resep awal
}

type EditHppSheetState = {
    isOpen: boolean;
    data?: ProductForHppEdit;
    onOpen: (data: ProductForHppEdit) => void;
    onClose: () => void;
};

export const useEditHppSheet = create<EditHppSheetState>((set) => ({
    isOpen: false,
    data: undefined,
    onOpen: (data) => set({ isOpen: true, data }),
    onClose: () => set({ isOpen: false, data: undefined }),
}));