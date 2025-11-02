import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob'; 
import { getAuthUser } from '@/lib/auth-utils'; 

export async function POST(req: NextRequest) {
    let authUser;
    try {
        authUser = getAuthUser(req);
    } catch (error: any) {
        return new NextResponse(JSON.stringify({ message: error.message }), { status: 401 });
    }

    const filename = req.headers.get('x-filename');
    if (!filename) {
        return new NextResponse(JSON.stringify({ message: "Nama file tidak ditemukan" }), { status: 400 });
    }

    if (!req.body) {
         return new NextResponse(JSON.stringify({ message: "File tidak ditemukan" }), { status: 400 });
    }

    try {
        const path = `avatars/${authUser.id}/${Date.now()}-${filename}`;

        const blob = await put(path, req.body, {
            access: 'public', 
        });
        
        return NextResponse.json(blob);

    } catch (error: any) {
        console.error("Gagal unggah file:", error);
        return new NextResponse(JSON.stringify({ message: "Gagal mengunggah file" }), { status: 500 });
    }
}