import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getAuthUser } from '@/lib/auth-utils'; 
import { TransactionType } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

const MONTH_INDEX_MAP: { [key: string]: number } = {
    'januari': 0, 'februari': 1, 'maret': 2, 'april': 3, 'mei': 4, 'juni': 5,
    'juli': 6, 'agustus': 7, 'september': 8, 'oktober': 9, 'november': 10, 'desember': 11
};

function processAggregates(agg: { type: TransactionType; _sum: { amount: Decimal | null } }[]) {
    const pemasukanRaw = agg.find(g => g.type === 'PEMASUKAN')?._sum.amount || new Decimal(0);
    const pengeluaranRaw = agg.find(g => g.type === 'PENGELUARAN')?._sum.amount || new Decimal(0);

    const pemasukan = pemasukanRaw.toNumber();
    const pengeluaran = pengeluaranRaw.toNumber();
    
    const saldo = pemasukan - pengeluaran;
    return { pemasukan, pengeluaran, saldo };
}

function calculatePercentChange(current: number, previous: number): number {
    if (previous === 0) {
        return current > 0 ? 100.0 : 0.0; 
    }
    return ((current - previous) / previous) * 100;
}

function groupTxsByWeek(transactions: { date: Date; type: TransactionType; amount: Decimal }[]) {
    const weeks = [
        { name: 'Minggu 1', Pemasukan: 0, Pengeluaran: 0 },
        { name: 'Minggu 2', Pemasukan: 0, Pengeluaran: 0 },
        { name: 'Minggu 3', Pemasukan: 0, Pengeluaran: 0 },
        { name: 'Minggu 4', Pemasukan: 0, Pengeluaran: 0 },
    ];

    for (const tx of transactions) {
        const dayOfMonth = tx.date.getDate();
        let weekIndex = 3; 
        if (dayOfMonth <= 7) weekIndex = 0; 
        else if (dayOfMonth <= 14) weekIndex = 1; 
        else if (dayOfMonth <= 21) weekIndex = 2; 

        const txAmount = tx.amount.toNumber(); 

        if (tx.type === 'PEMASUKAN') {
            weeks[weekIndex].Pemasukan += txAmount;
        } else if (tx.type === 'PENGELUARAN') {
            weeks[weekIndex].Pengeluaran += txAmount;
        }
    }
    return weeks;
}

export async function GET(req: NextRequest) {
    let authUser;
    try {
        authUser = getAuthUser(req);
    } catch (error: any) {
        return new NextResponse(JSON.stringify({ message: error.message }), { status: 401 });
    }

    try {
        const { searchParams } = req.nextUrl;
        const yearStr = searchParams.get('year');
        const monthStr = searchParams.get('month')?.toLowerCase(); 

        const yearNum = parseInt(yearStr || '');
        const monthIdx = monthStr ? MONTH_INDEX_MAP[monthStr] : undefined; 

        if (!yearNum || monthIdx === undefined) {
            return new NextResponse(JSON.stringify({ message: "Parameter tahun atau bulan tidak valid" }), { status: 400 });
        }

        const startDateCurr = new Date(yearNum, monthIdx, 1);
        const endDateCurr = new Date(yearNum, monthIdx + 1, 1); 
        const startDatePrev = new Date(yearNum, monthIdx - 1, 1);
        const endDatePrev = startDateCurr; 

        const [currentMonthAgg, prevMonthAgg, currentMonthTxs] = await Promise.all([
            db.transaction.groupBy({
                by: ['type'],
                where: { userId: authUser.id, date: { gte: startDateCurr, lt: endDateCurr } },
                _sum: { amount: true }
            }),
            
            db.transaction.groupBy({
                by: ['type'],
                where: { userId: authUser.id, date: { gte: startDatePrev, lt: endDatePrev } },
                _sum: { amount: true }
            }),
            
            db.transaction.findMany({
                where: { userId: authUser.id, date: { gte: startDateCurr, lt: endDateCurr } },
                select: { date: true, type: true, amount: true }
            })
        ]);

        const currentStats = processAggregates(currentMonthAgg);
        const prevStats = processAggregates(prevMonthAgg);
        const transactionsChart = groupTxsByWeek(currentMonthTxs);

        const saldoPercent = calculatePercentChange(currentStats.saldo, prevStats.saldo);
        const pemasukanPercent = calculatePercentChange(currentStats.pemasukan, prevStats.pemasukan);
        const pengeluaranPercent = calculatePercentChange(currentStats.pengeluaran, prevStats.pengeluaran);
        
        // 7. Tentukan Kondisi Keuangan
        let kondisi = "Aman";
        if (currentStats.saldo < 0) kondisi = "Minus";
        else if (currentStats.pengeluaran > currentStats.pemasukan * 0.75) kondisi = "Waspada";

        // 8. Susun Respons
        const responseData = {
            kondisi: kondisi,
            saldo: currentStats.saldo,
            saldoPercent: saldoPercent,
            pemasukan: currentStats.pemasukan,
            pemasukanPercent: pemasukanPercent,
            pengeluaran: currentStats.pengeluaran,
            pengeluaranPercent: pengeluaranPercent,
            transactions: transactionsChart, // Data untuk chart
        };

        return NextResponse.json(responseData, { status: 200 });

    } catch (error: any) {
        console.error("DETAIL_RIWAYAT_ERROR:", error);
        return new NextResponse(JSON.stringify({ message: "Gagal memproses permintaan" }), { status: 500 });
    }
}