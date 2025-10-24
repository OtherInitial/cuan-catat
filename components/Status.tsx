"use client"; 

import { useState, useEffect } from "react";

type Props = {
    status : string 
}

export const Status = ({
    status
}: Props) => {
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

    return(
        <div className="w-full px-9 pt-12 pb-36 text-left bg-gradient-to-br from-green-400 to-green-600 space-y-5">
            <p className="text-white text-3xl w-full">
                Selamat datang, <br/>{username}
            </p>

            <p className="text-white text-lg">
                Kondisi keuanganmu: <span className="text-2xl">{status}</span>
            </p>
        </div>
    )
}