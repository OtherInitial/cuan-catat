"use client";

import Image from "next/image";
import Link from "next/link";

import {
    Sheet,
    SheetContent,
    SheetClose,
    SheetTrigger,
    SheetHeader,  
    SheetTitle,
    SheetFooter,   
} from "@/components/ui/sheet";
import { Button } from "./ui/button";

import { LogoutButton } from "./LogoutButton";

export function Navbar() {
    return (
        <nav className="bg-white w-full px-8 py-6 flex justify-between items-center sticky top-0 shadow-md z-50">
            <Image
                src="/images/logo_apk.png" alt="logo cuan catat"
                width={70}
                height={70}
            />

            <div className="flex items-center">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="secondary" className="bg-white">
                            <Image
                                src="/images/burger_menu.png" alt="logo cuan catat"
                                width={25}
                                height={25}
                            />
                        </Button>
                    </SheetTrigger>
                    
                    <SheetContent side="left" className="w-[300px]">
                        <SheetHeader className="border-b pb-4 mb-3 text-left">
                            <Image
                                src="/images/logo_apk.png" alt="logo cuan catat"
                                width={50}
                                height={50}
                            />
                            <SheetTitle className="text-xl font-semibold mt-2">
                                CuanCatat Menu
                            </SheetTitle>
                        </SheetHeader>

                        <nav className="flex flex-col space-y-1">
                            <SheetClose asChild>
                                <Link
                                    href="/dashboard"
                                    className="text-lg font-medium p-3 rounded-md hover:bg-gray-100 transition-colors"
                                >
                                    Dashboard
                                </Link>
                            </SheetClose>
                            
                            <SheetClose asChild>
                                <Link
                                    href="/report"
                                    className="text-lg font-medium p-3 rounded-md hover:bg-gray-100 transition-colors"
                                >
                                    Transaksi
                                </Link>
                            </SheetClose>
                            
                            <SheetClose asChild>
                                <Link
                                    href="/history"
                                    className="text-lg font-medium p-3 rounded-md hover:bg-gray-100 transition-colors"
                                >
                                    Riwayat Keuangan
                                </Link>
                            </SheetClose>

                            <SheetClose asChild>
                                <Link
                                    href="/setting"
                                    className="text-lg font-medium p-3 rounded-md hover:bg-gray-100 transition-colors"
                                >
                                    Pengaturan
                                </Link>
                            </SheetClose>
                        </nav>

                        <SheetFooter>
                            <LogoutButton />
                        </SheetFooter>
                    </SheetContent>
                </Sheet>
            </div>
        </nav>
    );
}