"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
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
import Link from "next/link";

export default function ForgotPasswordPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const form = useForm({
        defaultValues: { email: "" }
    });

    const onSubmit = async (values: { email: string }) => {
        setIsLoading(true);
        try {
            const response = await fetch("/api/auth/request-password-reset", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });

            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || "Gagal mengirim email");
            }

            toast.success(data.message);
            setIsSubmitted(true);

        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Lupa Password</CardTitle>
                    <CardDescription>
                        Masukkan email Anda untuk menerima link reset password.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {isSubmitted ? (
                        <div className="text-center">
                            <p className="text-green-600 font-medium">
                                Email telah terkirim!
                            </p>
                            <p className="text-sm text-gray-600 mt-2">
                                Silakan periksa kotak masuk (dan folder spam) Anda.
                            </p>
                            <Button variant="link" asChild className="mt-4">
                                <Link href="/login">Kembali ke Login</Link>
                            </Button>
                        </div>
                    ) : (
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                <FormField
                                    name="email"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    type="email"
                                                    placeholder="email@anda.com"
                                                    disabled={isLoading}
                                                    required
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" className="w-full" disabled={isLoading}>
                                    {isLoading ? <Loader2 className="animate-spin" /> : "Kirim Link Reset"}
                                </Button>
                            </form>
                        </Form>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}