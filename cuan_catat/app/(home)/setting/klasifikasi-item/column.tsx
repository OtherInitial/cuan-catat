"use client";

import { ColumnDef } from "@tanstack/react-table";
import { GroupType } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import { MappingItem } from "@/features/transaction/hooks/use-edit-classification";
import { Actions } from "./actions"; 

const typeVariantMap: Record<GroupType, "default" | "destructive" | "secondary" | "outline"> = {
    PEMASUKAN: "default",
    VARIABEL: "secondary",
    TETAP: "outline",
    MODAL: "destructive", 
};

export const columns: ColumnDef<MappingItem>[] = [
    {
        accessorKey: "itemName",
        header: "Nama Item",
    },
    {
        accessorKey: "groupType",
        header: "Klasifikasi",
        cell: ({ row }) => {
            const type = row.getValue("groupType") as GroupType;
            return (
                <Badge variant={typeVariantMap[type] || "secondary"}>
                    {type}
                </Badge>
            );
        },
    },
    {
        id: "actions",
        cell: ({ row }) => <Actions item={row.original} />,
    },
];