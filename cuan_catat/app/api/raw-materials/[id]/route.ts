import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getAuthUser } from '@/lib/auth-utils';
import { z } from 'zod';
import { Decimal } from '@prisma/client/runtime/library';

const rawMaterialSchema = z.object({
  name: z.string().min(1),
  unit: z.string().min(1),
  costPerUnit: z.number().positive(),
});

export async function PATCH(
    req: NextRequest, 
    context: { params: Promise<{ id: string }> }
) {
    let authUser;
    try { authUser = getAuthUser(req); } 
    catch (error: any) { return new NextResponse(JSON.stringify({ message: error.message }), { status: 401 }); }

    try {
        const body = await req.json();
        const data = rawMaterialSchema.parse(body);

        const params = await context.params;

        const material = await db.rawMaterial.update({
            where: { 
                id: params.id, 
                userId: authUser.id 
            },
            data: {
                ...data,
                costPerUnit: new Decimal(data.costPerUnit),
            }
        });
        return NextResponse.json(material);
    } catch (error: any) {
        return new NextResponse(JSON.stringify({ message: "Input tidak valid" }), { status: 400 });
    }
}

export async function DELETE(
    req: NextRequest, 
    context: { params: Promise<{ id: string }> }
) {
    let authUser;
    try { authUser = getAuthUser(req); } 
    catch (error: any) { return new NextResponse(JSON.stringify({ message: error.message }), { status: 401 }); }

    try {
        const params = await context.params;

        await db.rawMaterial.delete({
            where: { id: params.id, userId: authUser.id }
        });
        return new NextResponse(null, { status: 204 });
    } catch (error: any) {
        return new NextResponse(JSON.stringify({ message: "Gagal menghapus" }), { status: 500 });
    }
}