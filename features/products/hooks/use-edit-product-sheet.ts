import { create } from "zustand";
import { Product } from "@/app/(home)/produk/page"; 

type EditProductSheetState = {
    isOpen: boolean;
    data?: Product; 
    onOpen: (data: Product) => void;
    onClose: () => void;
};

export const useEditProductSheet = create<EditProductSheetState>((set) => ({
    isOpen: false,
    data: undefined,
    onOpen: (data) => set({ isOpen: true, data }),
    onClose: () => set({ isOpen: false, data: undefined }),
}));