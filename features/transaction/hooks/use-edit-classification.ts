import { create } from "zustand";
import { GroupType } from "@prisma/client";

export type MappingItem = {
    id: number;
    itemName: string;
    groupType: GroupType;
}

type EditClassificationState = {
    isOpen: boolean;
    item?: MappingItem;
    onOpen: (item: MappingItem) => void;
    onClose: () => void;
};

export const useEditClassification = create<EditClassificationState>((set) => ({
    isOpen: false,
    item: undefined,
    onOpen: (item) => set({ isOpen: true, item }),
    onClose: () => set({ isOpen: false, item: undefined }),
}));