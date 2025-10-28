import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getAuthUser } from '@/lib/auth-utils';
import { z } from 'zod';
import { GroupType } from '@prisma/client';
import { updateFinancialsForMonth } from '@/lib/financial-analytics';

const createMappingSchema = z.object({
    itemName: z.string().min(1, "Nama item wajib diisi"),
    groupType: z.nativeEnum(GroupType, { message: "Tipe grup tidak valid" }),
    transactionIdToUpdate: z.string().uuid("ID Transaksi tidak valid"),
});

export async function POST(req: NextRequest) {
    let authUser;
    try {
        authUser = getAuthUser(req);
    } catch (error: any) {
        return new NextResponse(JSON.stringify({ 
            message: error.message 
        }), { status: 401 });
    }

    try {
        const body = await req.json();
        const data = createMappingSchema.parse(body);

        const [newMapping, updatedTransaction] = await db.$transaction(async (tx) => {
            
            const mapping = await tx.itemMapping.upsert({
                where: { itemName: data.itemName },
                create: {
                    itemName: data.itemName,
                    groupType: data.groupType,
                },
                update: {
                    groupType: data.groupType 
                }
            });

            const transaction = await tx.transaction.update({
                where: { 
                    id: data.transactionIdToUpdate,
                    userId: authUser.id 
                },
                data: {
                    itemMappingId: mapping.id 
                }
            });
            
            return [mapping, transaction];
        });

        updateFinancialsForMonth(authUser.id, updatedTransaction.date);

        return NextResponse.json({ 
            status: "SUCCESS", 
            newMapping, 
            updatedTransaction 
        });

    } catch (error: any) {
        if (error instanceof z.ZodError) {
            return new NextResponse(JSON.stringify({ 
                message: error.issues[0].message 
            }), { status: 400 });
        }
        
        return new NextResponse(JSON.stringify({ 
            message: "Terjadi kesalahan server" 
        }), { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    try {
        const mappings = await db.itemMapping.findMany({
            orderBy: {
                groupType: 'asc', 
            }
        });
        return NextResponse.json(mappings);

    } catch (error) {
        return new NextResponse(JSON.stringify({ message: "Gagal mengambil data mapping" }), { status: 500 });
    }
}