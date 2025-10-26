import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db'; 
import { getAuthUser } from '@/lib/auth-utils'; 

const MONTH_NAMES = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

const processHistoryData = (transactions: { date: Date }[]) => {
    const historyMap = new Map<number, Set<number>>(); // Map<Tahun, Set<IndexBulan>>

    transactions.forEach(tx => {
        const year = tx.date.getFullYear();
        const monthIndex = tx.date.getMonth(); // 0-11
        
        if (!historyMap.has(year)) {
            historyMap.set(year, new Set<number>());
        }
        historyMap.get(year)!.add(monthIndex);
    });

    const serializableData: { [year: number]: string[] } = {};

    historyMap.forEach((monthIndexes, year) => {
        const sortedMonths = Array.from(monthIndexes)
            .sort((a, b) => a - b)
            .map(index => MONTH_NAMES[index]);
            
        serializableData[year] = sortedMonths;
    });
    
    return serializableData;
};

export async function GET(req: NextRequest) {
    let authUser;
    
    try {
        authUser = getAuthUser(req);
    } catch (error: any) {
        return new NextResponse(JSON.stringify({ message: error.message }), { status: 401 });
    }

    try {
        const transactions = await db.transaction.findMany({
            where: { 
                userId: authUser.id 
            },
            select: { 
                date: true 
            },
            orderBy: { 
                date: 'desc'
            }
        });
        const historyData = processHistoryData(transactions);

        return NextResponse.json(historyData);

    } catch (error) {
        console.error("Gagal mengambil data riwayat:", error);
        return new NextResponse(JSON.stringify({ message: "Gagal mengambil data dari database" }), { status: 500 });
    }
}