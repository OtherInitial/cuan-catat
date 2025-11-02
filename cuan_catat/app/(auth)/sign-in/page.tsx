"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Label } from "@radix-ui/react-label";
import Link from "next/link";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log(data.data);
      
      localStorage.setItem("token", data.data.token);
      localStorage.setItem("email", data.data.email);
      localStorage.setItem("phone", data.data.phone);
      localStorage.setItem("avatar", data.data.avatar);
      localStorage.setItem("userId", data.data.user_id);
      localStorage.setItem("username", data.data.username);

      if (!response.ok) {
        setError(data.error || "Login gagal");
        return;
      }
      
      router.push("/dashboard");
    } catch (err) {
      setError("Terjadi kesalahan. Silakan coba lagi.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-emerald-600 text-white py-10 relative min-h-screen h-screen">
      <div className={cn("flex justify-between items-center px-10")}>
        <p>Belum punya akun?</p>
        <Link href="/sign-up">
          <Button variant="default" className={cn("bg-white/20")}>
            Buat Akun
          </Button>
        </Link>
      </div>

      <div className="flex justify-center items-center my-20">
        <h1 className="text-4xl font-semibold">CUAN Catat</h1>
      </div>

      <div className="w-full h-full bg-white rounded-t-4xl px-10">
        <h2 className="text-black text-center font-semibold py-10 text-3xl">
          Selamat Datang
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email" className="text-black">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Masukkan email disini"
              value={email}
              className="text-black"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-black">
              Password
            </Label>
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Masukkan password disini"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="text-black"
            />
          </div>

          <section className="w-full flex justify-end">
            <Button
              type="button"
              variant="link"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Sembunyikan" : "Lihat"} password
            </Button>
          </section>

          <div className="w-full mt-8 space-y-12">
            <Button
              type="submit"
              className="w-full bg-emerald-600 py-6"
              disabled={isLoading}
            >
              {isLoading ? "Memproses..." : "Masuk"}
            </Button>

            <Button className="w-full py-6" variant="link" type="button">
              <Link href="/forgot-password">Lupa password?</Link>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}