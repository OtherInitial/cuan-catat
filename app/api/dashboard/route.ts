import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getAuthUser } from '@/lib/auth-utils';
import { GroupType, TransactionType } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

function processAggregates(agg: { type: TransactionType; _sum: { amount: Decimal | null } }[]) {
    const pemasukanRaw = agg.find(g => g.type === 'PEMASUKAN')?._sum.amount || new Decimal(0);
    const pengeluaranRaw = agg.find(g => g.type === 'PENGELUARAN')?._sum.amount || new Decimal(0);
    
    const pengeluaran = pengeluaranRaw.toNumber();
    const pemasukan = pemasukanRaw.toNumber();
    
    const saldo = pemasukan - pengeluaran;
    return { pemasukan, pengeluaran, saldo };
}

function calculatePercentChange(current: number, previous: number): number {
    if (previous === 0) {
        return current > 0 ? 100.0 : 0.0;
    }
    return ((current - previous) / previous) * 100;
}

function getDaysInMonth(year: number, month: number) {
    return new Date(year, month + 1, 0).getDate();
}

const shortDateFormatter = new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'short' });

export async function GET(req: NextRequest) {
    let authUser;
    try {
        authUser = getAuthUser(req);
    } catch (error: any) {
        return new NextResponse(JSON.stringify({ message: error.message }), { status: 401 });
    }

    try {
        const now = new Date();
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth();

        const startDateCurr = new Date(currentYear, currentMonth, 1);
        const endDateCurr = new Date(currentYear, currentMonth + 1, 1);
        
        const startDatePrev = new Date(currentYear, currentMonth - 1, 1);
        const endDatePrev = startDateCurr;

        // --- PENGAMBILAN DATA (Promise.all) ---
        // Menambahkan 'allProducts' dan 'salesTransactions'
        const [
            currentMonthAgg, 
            prevMonthAgg, 
            currentMonthTxs, 
            recentTransactions,
            allProducts,
            salesTransactions
        ] = await Promise.all([
            // 1. Agregat bulan ini
            db.transaction.groupBy({
                by: ['type'],
                where: { userId: authUser.id, date: { gte: startDateCurr, lt: endDateCurr } },
                _sum: { amount: true }
            }),
            
            // 2. Agregat bulan lalu
            db.transaction.groupBy({
                by: ['type'],
                where: { userId: authUser.id, date: { gte: startDatePrev, lt: endDatePrev } },
                _sum: { amount: true }
            }),
            
            // 3. Transaksi harian (untuk chart)
            db.transaction.findMany({
                where: { userId: authUser.id, date: { gte: startDateCurr, lt: endDateCurr } },
                select: { date: true, type: true, amount: true }
            }),

            // 4. Transaksi terakhir (untuk list)
            db.transaction.findMany({
                where: { userId: authUser.id },
                orderBy: { date: 'desc' }, 
                take: 5,
                select: {
                    id: true,
                    itemName: true,
                    date: true,
                    amount: true,
                    type: true
                }
            }),

            // 5. [BARU] Ambil semua nama produk untuk pencocokan
            db.product.findMany({
                where: { userId: authUser.id },
                select: { name: true }
            }),

            // 6. [BARU] Ambil semua transaksi pemasukan bulan ini
            db.transaction.findMany({
                where: {
                    userId: authUser.id,
                    date: { gte: startDateCurr, lt: endDateCurr },
                    type: TransactionType.PEMASUKAN,
                },
                select: { itemName: true }
            })
        ]);

        // --- LOGIKA BARU SALES SUMMARY (Mencocokkan Nama) ---
        
        // Buat Set (daftar unik) dari nama produk yang sudah di-trim
        const productNames = new Set(allProducts.map(p => p.name.trim()));

        // Hitung penjualan HANYA untuk item yang ada di daftar produk
        const productCounts = salesTransactions.reduce((acc, tx) => {
            const trimmedItemName = tx.itemName.trim();
            // Jika nama item transaksi ada di daftar produk, hitung
            if (productNames.has(trimmedItemName)) {
                acc[trimmedItemName] = (acc[trimmedItemName] || 0) + 1;
            }
            return acc;
        }, {} as Record<string, number>);

        let bestProductInfo = { name: "N/A", units: 0 };
        let totalProductUnitsSold = 0;

        // Urutkan produk terlaris
        const sortedProducts = Object.entries(productCounts).sort((a, b) => b[1] - a[1]);

        if (sortedProducts.length > 0) {
            const bestProduct = sortedProducts[0];
            bestProductInfo = { name: bestProduct[0], units: bestProduct[1] };
        }

        // Hitung total unit produk yang terjual
        totalProductUnitsSold = Object.values(productCounts).reduce((sum, count) => sum + count, 0);
        // --- AKHIR LOGIKA BARU ---


        // --- Logika Statistik (Tidak Berubah) ---
        const currentStats = processAggregates(currentMonthAgg);
        const prevStats = processAggregates(prevMonthAgg);

        const saldoPercent = calculatePercentChange(currentStats.saldo, prevStats.saldo);
        const pemasukanPercent = calculatePercentChange(currentStats.pemasukan, prevStats.pemasukan);
        const pengeluaranPercent = calculatePercentChange(currentStats.pengeluaran, prevStats.pengeluaran);

        // --- Logika Chart (Tidak Berubah) ---
        const daysInMonth = getDaysInMonth(currentYear, currentMonth);
        const dailyDataMap = new Map<number, { Pemasukan: Decimal, Pengeluaran: Decimal }>();
        for (let i = 1; i <= daysInMonth; i++) {
            dailyDataMap.set(i, { Pemasukan: new Decimal(0), Pengeluaran: new Decimal(0) });
        }
        for (const tx of currentMonthTxs) {
            const day = tx.date.getDate();
            const dayData = dailyDataMap.get(day);
            if (dayData) {
                if (tx.type === TransactionType.PEMASUKAN) {
                    dayData.Pemasukan = dayData.Pemasukan.plus(tx.amount);
                } else if (tx.type === TransactionType.PENGELUARAN) {
                    dayData.Pengeluaran = dayData.Pengeluaran.plus(tx.amount);
                }
            }
        }
        const chartData = Array.from(dailyDataMap.entries()).map(([day, data]) => ({
            day: shortDateFormatter.format(new Date(currentYear, currentMonth, day)),
            Pemasukan: data.Pemasukan.toNumber(),
            Pengeluaran: data.Pengeluaran.toNumber(),
        }));

        // --- Persiapan Data (Tidak Berubah) ---
        const recentTxsForClient = recentTransactions.map(tx => ({
            ...tx,
            amount: tx.amount.toNumber()
        }));
        const dateRange = `${shortDateFormatter.format(startDateCurr)} - ${shortDateFormatter.format(new Date(currentYear, currentMonth, daysInMonth))}`;

        // --- Kirim Respons JSON (Diperbarui) ---
        return NextResponse.json({
            saldo: currentStats.saldo,
            saldoPercent,
            pemasukan: currentStats.pemasukan,
            pemasukanPercent,
            pengeluaran: currentStats.pengeluaran,
            pengeluaranPercent,
            dateRange,
            chartData,
            salesSummary: {
                totalRevenue: currentStats.pemasukan, // Total Pemasukan (Revenue)
                totalUnitsSold: totalProductUnitsSold, // [BARU] Total unit produk terjual
                bestProductName: bestProductInfo.name,  // [BARU] Nama produk terlaris
                bestProductUnits: bestProductInfo.units, // [BARU] Unit produk terlaris
            },
            recentTransactions: recentTxsForClient
        });

    } catch (error: any) {
        console.error("Dashboard API Error:", error);
        return new NextResponse(JSON.stringify({ message: "Gagal memproses data dashboard" }), { status: 500 });
    }
}