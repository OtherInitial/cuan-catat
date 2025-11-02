"use client";

import { 
    Edit, 
    MoreHorizontal, 
    Trash 
} from "lucide-react";
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import { MappingItem, useEditClassification } from "@/features/transaction/hooks/use-edit-classification";

type Props = {
    item: MappingItem;
};

export const Actions = ({ item }: Props) => {
    const { onOpen } = useEditClassification();

    // TODO: Tambahkan hook 'useDeleteClassification' jika Anda ingin fitur hapus

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="size-8 p-0">
                    <MoreHorizontal className="size-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem 
                    disabled={false} 
                    onClick={() => onOpen(item)} 
                >
                    <Edit className="size-4 mr-2" />
                    Edit
                </DropdownMenuItem>
                {/* <DropdownMenuItem 
                    disabled={false} // Ganti dengan 'deleteMutation.isPending'
                    onClick={() => {}} // Panggil 'deleteMutation'
                    className="text-red-500"
                >
                    <Trash className="size-4 mr-2" />
                    Hapus
                </DropdownMenuItem>
                */}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};