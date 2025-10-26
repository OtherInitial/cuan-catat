"use client";

import { EditTransactionSheet } from "@/features/transaction/components/edit-transaction-sheet";
import { NewTransactionSheet } from "@/features/transaction/components/new-transaction-sheet";

import { useEffect, useState } from "react";

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
        </>
    );
}