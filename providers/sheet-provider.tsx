"use client";

import { EditTransactionSheet } from "@/features/transaction/components/edit-transaction-sheet";
import { NewTransactionSheet } from "@/features/transaction/components/new-transaction-sheet";
import { ClassificationModal } from "@/features/transaction/components/classification-modal";

import { useEffect, useState } from "react";
import { RawMaterialSheet } from "@/features/raw-materials/components/raw-material-sheet";

export const SheetProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <>
            <NewTransactionSheet />
            <EditTransactionSheet />
            <ClassificationModal/>
        </>
    );
}