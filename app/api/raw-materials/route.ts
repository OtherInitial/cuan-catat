// app/api/raw-materials/route.ts
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

export async function GET(req: NextRequest) {
    let authUser;
    try {
        authUser = getAuthUser(req);
    } catch (error: any) {
        return new NextResponse(JSON.stringify({ message: error.message }), { status: 401 });
    }

    const materials = await db.rawMaterial.findMany({
        where: { userId: authUser.id },
        orderBy: { name: 'asc' }
    });
    
    const materialsForClient = materials.map(m => ({
        ...m,
        costPerUnit: m.costPerUnit.toNumber()
    }));
    return NextResponse.json(materialsForClient);
}

export async function POST(req: NextRequest) {
    let authUser;
    try { authUser = getAuthUser(req); } 
    catch (error: any) { return new NextResponse(JSON.stringify({ message: error.message }), { status: 401 }); }

    try {
        const body = await req.json();
        const data = rawMaterialSchema.parse(body);

        const material = await db.rawMaterial.create({
            data: {
                ...data,
                costPerUnit: new Decimal(data.costPerUnit),
                userId: authUser.id
            }
        });
        return NextResponse.json(material, { status: 201 });
    } catch (error: any) {
        // ... (Zod error handling, dll)
        return new NextResponse(JSON.stringify({ message: "Input tidak valid" }), { status: 400 });
    }
}