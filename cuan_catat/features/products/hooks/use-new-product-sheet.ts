import { create } from "zustand";

type NewProductSheetState = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

export const useNewProductSheet = create<NewProductSheetState>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));