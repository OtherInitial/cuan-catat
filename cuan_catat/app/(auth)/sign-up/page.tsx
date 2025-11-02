"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    if (!email || !name || !password || !confirmPassword) {
      setError("Semua field harus diisi");
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Password dan konfirmasi password tidak sama");
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password minimal 6 karakter");
      setIsLoading(false);
      return;
    }

    try {
      console.log("Calling API:", "/api/auth/sign-up");
      const response = await fetch("/api/auth/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name }),
      });

      console.log("Response status:", response.status);
      const data = await response.json();
      console.log("Response data:", data);

      if (!response.ok) {
        setError(data.error || "Registrasi gagal");
        return;
      }

      setSuccess("Registrasi berhasil! Mengalihkan ke halaman login...");
      
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("bg-emerald-600 text-white py-10 relative min-h-screen h-screen")}>
      <div className={cn("flex justify-between items-center px-10")}>
        <p>Sudah punya akun?</p>
        <Link href="/">
          <Button variant="default" className={cn("bg-white/20")}>
            Masuk
          </Button>
        </Link>
      </div>

      <div className="flex justify-center items-center my-20">
        <h1 className="text-4xl font-semibold">CUAN Catat</h1>
      </div>

      <div className="w-full py-10 bg-white rounded-t-4xl px-10">
        <h2 className="text-black text-center font-semibold py-10 text-3xl">
          Daftarkan Akun Anda
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
              {success}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email" className="text-black">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              className="text-black"
              placeholder="Masukkan email disini"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="nama" className="text-black">
              Nama
            </Label>
            <Input
              id="nama"
              type="text"
              placeholder="Masukkan nama Anda disini"
              className="text-black"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-black">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Masukkan password disini"
              className="text-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password_confirmation" className="text-black">
              Konfirmasi Password
            </Label>
            <Input
              id="password_confirmation"
              type="password"
              placeholder="Masukkan password disini"
              className="text-black"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <div className="w-full mt-8 space-y-6">
            <Button
              type="submit"
              className="w-full bg-emerald-600 py-6"
              disabled={isLoading}
            >
              {isLoading ? "Memproses..." : "Buat Akun"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}