import { create } from "zustand";

export interface RawMaterial {
    id: string;
    name: string;
    unit: string;
    costPerUnit: number;
}

type SheetState = {
    isOpen: boolean;
    isEdit: boolean;
    data?: RawMaterial;
    onOpen: () => void; 
    onOpenEdit: (data: RawMaterial) => void; 
    onClose: () => void;
};

export const useRawMaterialSheet = create<SheetState>((set) => ({
    isOpen: false,
    isEdit: false,
    data: undefined,
    onOpen: () => set({ isOpen: true, isEdit: false, data: undefined }),
    onOpenEdit: (data) => set({ isOpen: true, isEdit: true, data }),
    onClose: () => set({ isOpen: false, isEdit: false, data: undefined }),
}));