"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button'; 

export const LogoutButton = () => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleLogout = async () => {
        setIsLoading(true);
        try {
            await fetch('/api/auth/logout', { method: 'POST' });

            localStorage.removeItem('token');

            router.refresh();
            router.push('/login');

        } catch (error) {
            console.error("Gagal logout:", error);
            setIsLoading(false);
        }
    };

    return (
        <Button
            variant="destructive"
            onClick={handleLogout}
            disabled={isLoading}
            size="sm"
            className='mx-3'
        >
            {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
                <LogOut className="mr-2 h-4 w-4" />
            )}
            Logout
        </Button>
    );
};