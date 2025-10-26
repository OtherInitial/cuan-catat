import { NextRequest, NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/auth-utils'; 

import { db } from '@/lib/db';

export async function GET(req: NextRequest) {
    let authUser;
    try {
        authUser = getAuthUser(req);
    } catch (error: any) {
        return new NextResponse(JSON.stringify({ message: error.message }), { status: 401 });
    }

    try {
        const user = await db.user.findUnique({
            where: { id: authUser.id },
            select: {
                name: true,
                email: true,
                phone: true,
                address: true,
                avatarUrl: true
            }
        });

        if (!user) {
            return new NextResponse(JSON.stringify({ message: "User tidak ditemukan" }), { status: 404 });
        }

        return NextResponse.json(user);

    } catch (error) {
        console.error("Gagal mengambil profil:", error);
        return new NextResponse(JSON.stringify({ message: "Internal server error" }), { status: 500 });
    }
}

export async function PATCH(req: NextRequest) {
    let authUser;
    try {
        authUser = getAuthUser(req);
    } catch (error: any) {
        return new NextResponse(JSON.stringify({ message: error.message }), { status: 401 });
    }
    
    try {
        const body = await req.json();
        const { name, email, phone, address, avatarUrl } = body;
        
        if (!name || !email) {
            return new NextResponse(JSON.stringify({ message: "Nama dan Email wajib diisi" }), { status: 400 });
        }

        const updatedUser = await db.user.update({
            where: { id: authUser.id },
            data: {
                name,
                email,
                phone,
                address,
                avatarUrl
            }
        });

        return NextResponse.json({ message: "Profil berhasil diperbarui", user: updatedUser });

    } catch (error: any) {
        if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
            return new NextResponse(JSON.stringify({ message: "Email ini sudah digunakan" }), { status: 409 });
        }
        console.error("Gagal memperbarui profil:", error);
        return new NextResponse(JSON.stringify({ message: "Gagal memperbarui profil" }), { status: 500 });
    }
}