import { create } from "zustand";
import { HppType } from "@prisma/client";
import { RecipeItem } from "../components/hpp-calculator-modal"; 

export interface ProductForHppEdit {
    id: string;
    name: string;
    hppCalculationType: HppType;
    manualHpp: number | null;
    calculatedHpp: number | null;
    recipe: RecipeItem[]; 
    productionYield: number;
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