import { create } from "zustand";

type ClassificationModalState = {
    isOpen: boolean;
    itemName?: string;
    transactionId?: string;
    onOpen: (itemName: string, transactionId: string) => void;
    onClose: () => void;
};

export const useClassificationModal = create<ClassificationModalState>((set) => ({
    isOpen: false,
    itemName: undefined,
    transactionId: undefined,
    onOpen: (itemName, transactionId) => set({ 
        isOpen: true, 
        itemName, 
        transactionId 
    }),
    onClose: () => set({ 
        isOpen: false, 
        itemName: undefined, 
        transactionId: undefined 
    }),
}));