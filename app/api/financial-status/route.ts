import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getAuthUser } from '@/lib/auth-utils';
import { CashflowStatus } from '@prisma/client';

export async function GET(req: NextRequest) {
    let authUser;
    try {
        authUser = getAuthUser(req);
    } catch (error: any) {
        return new NextResponse(JSON.stringify({ message: error.message }), { status: 401 });
    }

    try {
        const latestIndicator = await db.financialIndicators.findFirst({
            where: { userId: authUser.id },
            orderBy: {
                updatedAt: 'desc'
            }
        });

        const status = latestIndicator?.cashflowStatus || CashflowStatus.SEHAT;
        
        const statusMap = {
            [CashflowStatus.SEHAT]: "Aman",
            [CashflowStatus.WASPADA]: "Waspada",
            [CashflowStatus.KRITIS]: "Kritis",
        };

        return NextResponse.json({ 
            statusEnum: status,
            statusText: statusMap[status] 
        });

    } catch (error) {
        return new NextResponse(JSON.stringify({ message: "Gagal mengambil status ", error }), { status: 500 });
    }
}