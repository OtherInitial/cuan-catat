"use client";

import { useState, useEffect, useRef } from 'react';

import { Loader2, Save, User, Mail, Phone, Home, Upload } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface UserProfile {
    name: string;
    email: string;
    phone: string | null;
    address: string | null;
    avatarUrl: string | null;
}

function getAuthToken(): string | null {
    if (typeof window !== "undefined") {
        return localStorage.getItem("token");
    }
    return null;
}

export default function ProfilePage() {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            setIsLoading(true);
            const token = getAuthToken();
            if (!token) {
                toast.error("Sesi tidak valid. Silakan login ulang.");
                setIsLoading(false);
                return;
            }

            try {
                const response = await fetch('/api/profile', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                
                if (!response.ok) {
                    throw new Error("Gagal memuat profil");
                }
                
                const data: UserProfile = await response.json();
                setProfile(data);
            } catch (error: any) {
                toast.error(error.message);
            } finally {
                setIsLoading(false);
            }
        };
        
        fetchProfile();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProfile(prev => (prev ? { ...prev, [name]: value } : null));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!profile) return;

        setIsSaving(true);
        const token = getAuthToken();
        if (!token) {
            toast.error("Sesi Anda berakhir.");
            setIsSaving(false);
            return;
        }

        try {
            const response = await fetch('/api/profile', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(profile)
            });

            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.message || "Gagal menyimpan perubahan");
            }

            toast.success("Profil berhasil diperbarui!");
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setIsSaving(false);
        }
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            toast.error("File harus berupa gambar (jpg, png, webp).");
            return;
        }

        if (file.size > 2 * 1024 * 1024) {
            toast.error("Ukuran file maksimal adalah 2MB.");
            return;
        }

        setIsUploading(true);
        const token = getAuthToken();
        if (!token) {
            toast.error("Sesi tidak valid.");
            setIsUploading(false);
            return;
        }

        try {
            const response = await fetch('/api/profile/upload', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'x-filename': file.name, 
                },
                body: file, 
            });

            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.message || "Gagal mengunggah gambar");
            }

            const blob = await response.json();

            setProfile(prev => (prev ? { ...prev, avatarUrl: blob.url } : null));
            toast.success("Foto profil diubah. Tekan 'Simpan Perubahan' untuk konfirmasi.");

        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <Loader2 className="size-12 animate-spin text-gray-500" />
            </div>
        );
    }

    if (!profile) {
        return <div className="p-8 text-center text-red-500">Gagal memuat data profil.</div>;
    }

    return (
        <div className="p-4 md:p-8">
            <h1 className="font-semibold text-2xl mb-4">Profil Saya</h1>
            
            <Card className="max-w-3xl mx-auto shadow-lg">
                <form onSubmit={handleSubmit}>
                    <CardHeader>
                        <CardTitle>Detail Profil</CardTitle>
                        <CardDescription>Perbarui informasi pribadi dan akun Anda.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        
                        <div className="flex items-center space-x-4">
                            <label 
                                htmlFor="avatarFile" 
                                className="relative cursor-pointer rounded-full"
                            >
                                <Avatar className="h-20 w-20">
                                    <AvatarImage src={profile.avatarUrl || ''} alt={profile.name} />
                                    <AvatarFallback>
                                        {profile.name?.substring(0, 2).toUpperCase() || <User />}
                                    </AvatarFallback>
                                </Avatar>
                                
                                {isUploading && (
                                    <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                                        <Loader2 className="h-6 w-6 animate-spin text-white" />
                                    </div>
                                )}
                                
                                {!isUploading && (
                                     <div className="absolute bottom-0 right-0 p-1 bg-white rounded-full shadow border">
                                        <Upload className="h-4 w-4 text-gray-700" />
                                    </div>
                                )}
                            </label>
                            
                            <input 
                                ref={fileInputRef}
                                id="avatarFile"
                                type="file"
                                onChange={handleFileChange}
                                className="hidden"
                                accept="image/png, image/jpeg, image/webp"
                                disabled={isUploading}
                            />
                            
                            <div className="flex-grow space-y-1">
                                <Label>Perbarui Foto Profil</Label>
                                <p className="text-sm text-gray-500">
                                    Klik pada gambar untuk memilih file baru (Maks 2MB).
                                </p>
                            </div>
                        </div>
                        
                        <div className="space-y-1">
                            <Label htmlFor="avatarUrl">URL Avatar (Otomatis)</Label>
                            <Input 
                                id="avatarUrl" 
                                name="avatarUrl"
                                value={profile.avatarUrl || ''} 
                                onChange={handleChange}
                                placeholder="Akan terisi otomatis setelah upload..." 
                                readOnly={isUploading} 
                            />
                        </div>
                        
                        <div className="space-y-2">
                            <Label htmlFor="name">Nama Lengkap</Label>
                            <Input 
                                id="name" 
                                name="name"
                                value={profile.name} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                        
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input 
                                id="email" 
                                name="email"
                                type="email" 
                                value={profile.email} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phone">Nomor Telepon</Label>
                            <Input 
                                id="phone" 
                                name="phone"
                                type="tel" 
                                value={profile.phone || ''} 
                                onChange={handleChange} 
                                placeholder="08123456789" 
                            />
                        </div>
                        
                        <div className="space-y-2">
                            <Label htmlFor="address">Alamat</Label>
                            <Input 
                                id="address" 
                                name="address"
                                value={profile.address || ''} 
                                onChange={handleChange} 
                                placeholder="Jl. Merdeka No. 17, Jakarta" 
                            />
                        </div>
                    </CardContent>
                    
                    <CardFooter className='mt-7'>
                        <Button type="submit" disabled={isSaving}>
                            {isSaving ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <Save className="mr-2 h-4 w-4" />
                            )}
                            {isSaving ? "Menyimpan..." : "Simpan Perubahan"}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}