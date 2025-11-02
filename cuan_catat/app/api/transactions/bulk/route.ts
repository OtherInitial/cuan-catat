import { NextRequest, NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/auth-utils'; 
import { db } from '@/lib/db';
import { TransactionType } from '@prisma/client';

type TransactionInput = {
  date: string;
  itemName: string;
  type: TransactionType;
  amount: number;
  paymentMethodName?: string | null;
  categoryName?: string | null;
}

export async function POST(req: NextRequest) {
    let authUser;
    try {
        authUser = getAuthUser(req);
    } catch (error: any) {
        return new NextResponse(JSON.stringify({ message: error.message }), { status: 401 });
    }

    const userId = authUser.id;

    try {
        const body = await req.json();
        const { transactions } = body;

        if (!Array.isArray(transactions) || transactions.length === 0) {
            return new NextResponse(JSON.stringify({ message: "Data transaksi tidak valid atau kosong" }), { status: 400 });
        }

        const paymentMethodCache = new Map<string, string>();
        const categoryCache = new Map<string, string>();

        await db.$transaction(async (tx) => {
            for (const item of transactions as TransactionInput[]) {
                
                let paymentMethodId: string | undefined = undefined;
                let categoryId: string | undefined = undefined;

                if (item.paymentMethodName) {
                    const name = item.paymentMethodName.trim();
                    if (paymentMethodCache.has(name)) {
                        paymentMethodId = paymentMethodCache.get(name);
                    } else {
                        let pm = await tx.paymentMethod.findUnique({
                            where: { name_userId: { name, userId } } 
                        });
                        
                        if (!pm) {
                            pm = await tx.paymentMethod.create({
                                data: { name, userId }
                            });
                        }
                        paymentMethodId = pm.id;
                        paymentMethodCache.set(name, pm.id);
                    }
                }

                if (item.type !== 'PEMASUKAN' && item.type !== 'PENGELUARAN') {
                    throw new Error(`Jenis transaksi tidak valid: ${item.type} untuk item ${item.itemName}`);
                }
                
                await tx.transaction.create({
                    data: {
                        itemName: item.itemName,
                        amount: item.amount,
                        type: item.type,
                        date: new Date(item.date),
                        userId: userId,
                        paymentMethodId: paymentMethodId,
                        categoryId: categoryId,
                    }
                });
            }
        });

        return new NextResponse(JSON.stringify({ message: `Berhasil mengunggah ${transactions.length} transaksi` }), { status: 201 });

    } catch (error: any) {
        console.error("BULK_UPLOAD_ERROR:", error);

        if (error.code === 'P2002') { 
             return new NextResponse(JSON.stringify({ message: `Gagal: Terdapat data duplikat.` }), { status: 400 });
        }
        
        return new NextResponse(JSON.stringify({ message: `Gagal memproses data: ${error.message}` }), { status: 400 });
    }
}