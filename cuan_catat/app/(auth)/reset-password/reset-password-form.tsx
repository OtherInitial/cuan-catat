"use client"; // Pastikan "use client" ada di sini

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams, useRouter } from "next/navigation"; // Hook dipanggil di sini
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { 
    Card, 
    CardHeader, 
    CardTitle, 
    CardDescription, 
    CardContent 
} from "@/components/ui/card";
import { 
    Form, 
    FormControl, 
    FormField, 
    FormItem, 
    FormLabel, 
    FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ResetPasswordForm() {
    const router = useRouter();
    const searchParams = useSearchParams(); 
    const token = searchParams.get('token');

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const form = useForm({
        defaultValues: { password: "", confirmPassword: "" }
    });

    const onSubmit = async (values: any) => {
        if (values.password !== values.confirmPassword) {
            toast.error("Password dan konfirmasi password tidak cocok.");
            return;
        }

        if (!token) {
            setError("Token reset tidak ditemukan. Silakan ulangi proses lupa password.");
            return;
        }
        
        setIsLoading(true);
        setError(null);
        
        try {
            const response = await fetch("/api/auth/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token: token, password: values.password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Gagal mereset password");
            }

            toast.success(data.message);
            router.push("/login"); 

        } catch (error: any){
            setError(error.message);
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    if (!token) {
        return (
             <div className="min-h-screen flex items-center justify-center">
                <Card className="w-full max-w-md p-6">
                    <p className="text-red-600 text-center font-medium">
                        Link tidak valid atau token tidak ditemukan. Silakan ulangi permintaan reset password.
                    </p>
                </Card>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Reset Password Baru</CardTitle>
                    <CardDescription>
                        Masukkan password baru Anda.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                name="password"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password Baru</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="password"
                                                disabled={isLoading}
                                                required
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="confirmPassword"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Konfirmasi Password Baru</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="password"
                                                disabled={isLoading}
                                                required
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            
                            {error && <p className="text-sm text-red-600">{error}</p>}
                            
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? <Loader2 className="animate-spin" /> : "Simpan Password Baru"}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}