"use client"

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { Navbar } from "@/components/Navbar";
import { Status } from "../../components/Status";

import { CashflowStatus } from "@prisma/client";

function getAuthToken(): string | null {
    if (typeof window !== "undefined") return localStorage.getItem("token");
    return null;
}

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>){
    const pathname = usePathname();

    const [status, setStatus] = useState("Aman");
    const [statusEnum, setStatusEnum] = useState<CashflowStatus>(CashflowStatus.SEHAT);

    useEffect(() => {
        const fetchStatus = async () => {
            const token = getAuthToken();
            if (!token) return; 

            try {
                const res = await fetch("/api/financial-status", {
                    headers: { "Authorization": `Bearer ${token}` }
                });
                if (!res.ok) return;
                
                const data = await res.json();
                setStatus(data.statusText);
                setStatusEnum(data.statusEnum);
            } catch (error) {
                console.error("Gagal fetch status", error);
            }
        };

        fetchStatus();
    }, [pathname]);

    const showGlobalHeader = !pathname.startsWith('/history');
    const showGlobalHeader2 = !pathname.startsWith('/setting');
    const showGlobalHeader3 = !pathname.startsWith('/profil');

    return(
        <main className="bg-white relative">
            <Navbar/>
            
            {
              (showGlobalHeader && showGlobalHeader2 && showGlobalHeader3) 
              && <Status 
                    status={status} 
                    statusEnum={statusEnum}
                  />
            } 

            {children}
        </main>
    )
}