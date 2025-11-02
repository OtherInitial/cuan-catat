"use client"; 

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils"; 
import { CashflowStatus } from "@prisma/client";

type Props = {
    status: string; 
    statusEnum: CashflowStatus; 
}

const statusMap = {
    [CashflowStatus.SEHAT]: "from-green-400 to-green-600",
    [CashflowStatus.WASPADA]: "from-yellow-400 to-yellow-600",
    [CashflowStatus.KRITIS]: "from-red-400 to-red-600",
};

export const Status = ({ status, statusEnum }: Props) => {
    const [username, setUsername] = useState("Pengguna");

    useEffect(() => {
        const userString = localStorage.getItem("username"); 
        
        if (userString) {
            try {
                setUsername(userString);
            } catch (error) {
                console.error("Gagal mengambil data user dari localStorage", error);
            }
        }
    }, []);

    const backgroundClass = statusMap[statusEnum] || statusMap[CashflowStatus.SEHAT];

    return(
        <div className={cn(
            "w-full px-9 pt-12 pb-36 text-left bg-gradient-to-br space-y-5 rounded-b-2xl",
            backgroundClass 
        )}>
            <p className="text-white text-3xl w-full">
                Selamat datang, <br/>{username}
            </p>

            <p className="text-white text-lg">
                Kondisi keuanganmu: <span className="text-2xl">{status}</span>
            </p>
        </div>
    )
}