"use client";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useRawMaterialSheet, RawMaterial } from "@/features/raw-materials/hooks/use-raw-material-sheet";
// TODO: Tambahkan hook 'useDeleteRawMaterial'

type Props = { data: RawMaterial };

export const Actions = ({ data }: Props) => {
    const { onOpenEdit } = useRawMaterialSheet();
    // const deleteMutation = useDeleteRawMaterial(data.id);
    
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="size-8 p-0">
                    <MoreHorizontal className="size-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onOpenEdit(data)}>
                    <Edit className="size-4 mr-2" /> Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => {/* deleteMutation.mutate() */}} className="text-red-500">
                    <Trash className="size-4 mr-2" /> Hapus
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};