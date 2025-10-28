import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getAuthUser } from '@/lib/auth-utils';
import { TransactionType, HppType } from '@prisma/client';

const getProfitStatus = (profitMargin: number) => {
    if (profitMargin <= 0) return { text: "Rugi", color: "🔴" };
    if (profitMargin < 15) return { text: "Perlu Naik Harga", color: "🟠" }; 
    if (profitMargin < 30) return { text: "Tipis", color: "🟡" }; 
    return { text: "Untung", color: "🟢" }; 
};

export async function GET(req: NextRequest) {
    let authUser;
    try {
        authUser = getAuthUser(req);
    } catch (error: any) {
        return new NextResponse(JSON.stringify({ message: error.message }), { status: 401 });
    }

    try {
        const { searchParams } = req.nextUrl;
        const year = parseInt(searchParams.get('year') || new Date().getFullYear().toString());
        const month = parseInt(searchParams.get('month') || (new Date().getMonth() + 1).toString());

        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 1);

        const products = await db.product.findMany({
            where: { userId: authUser.id },
            select: { 
                id: true, 
                name: true, 
                sellingPrice: true, 
                hppCalculationType: true,
                manualHpp: true,
                calculatedHpp: true 
            }
        });

        const salesData = await db.transaction.groupBy({
            by: ['productId'],
            where: {
                userId: authUser.id,
                date: { gte: startDate, lt: endDate },
                type: TransactionType.PEMASUKAN,
                productId: { not: null }
            },
            _count: { id: true }, 
            _sum: { amount: true }, 
        });

        const summary = products.map(product => {
            const sale = salesData.find(s => s.productId === product.id);

            const unitsSold = sale?._count.id || 0;
            const revenue = sale?._sum.amount?.toNumber() || 0;
            const hppValue = product.hppCalculationType === HppType.MANUAL
                ? product.manualHpp
                : product.calculatedHpp; 
            
            const hppPerUnit = hppValue?.toNumber() || 0;
            const sellingPrice = product.sellingPrice.toNumber();
            const profitPerUnit = sellingPrice - hppPerUnit;
            const totalProfit = profitPerUnit * unitsSold;
            const profitMargin = (revenue > 0) ? (totalProfit / revenue) * 100 : 0;
            const status = getProfitStatus(profitMargin);

            return {
                id: product.id,
                name: product.name,
                unitsSold: unitsSold,
                revenue: revenue,
                hppPerUnit: hppPerUnit,
                profitPerUnit: profitPerUnit,
                statusText: status.text,
                statusColor: status.color,
            };
        });

        const sortedSummary = summary.sort((a, b) => b.unitsSold - a.unitsSold);

        return NextResponse.json(sortedSummary);

    } catch (error: any) {
        console.error("Product Sales API Error:", error);
        return new NextResponse(JSON.stringify({ message: "Gagal memproses data" }), { status: 500 });
    }
}