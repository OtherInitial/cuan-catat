"use client"

import { usePathname } from "next/navigation";

import { Navbar } from "@/components/Navbar";
import { Status } from "../../components/Status";
import DataCard from "../../components/DataCard";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>){
    const pathname = usePathname();

    const showGlobalHeader = !pathname.startsWith('/history');

    const showGlobalHeader2 = !pathname.startsWith('/setting');

    const showGlobalHeader3 = !pathname.startsWith('/profil');

    return(
        <main className="bg-white relative">
            <Navbar/>
            
            {
              (showGlobalHeader && showGlobalHeader2 && showGlobalHeader3) && <Status status="Aman"/>
            } 

            {children}
        </main>
    )
}