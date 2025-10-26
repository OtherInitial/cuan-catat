// app/api/transactions/bulk-delete/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/auth-utils';
import { db } from '@/lib/db'; 

export async function POST(req: NextRequest) {
    let authUser;
    try {
        authUser = getAuthUser(req);
    } catch (error: any) {
        return new NextResponse(JSON.stringify({ message: error.message }), { status: 401 });
    }

    try {
        const body = await req.json();
        const { ids } = body; 

        if (!Array.isArray(ids) || ids.length === 0) {
            return new NextResponse(JSON.stringify({ message: "ID tidak valid atau kosong" }), { status: 400 });
        }

        const result = await db.transaction.deleteMany({
            where: {
                id: {
                    in: ids,
                },
                userId: authUser.id, 
            },
        });

        return new NextResponse(JSON.stringify({ count: result.count }), { status: 200 });

    } catch (error: any) {
        console.error("BULK_DELETE_ERROR:", error);
        return new NextResponse(JSON.stringify({ message: "Gagal memproses permintaan" }), { status: 500 });
    }
}