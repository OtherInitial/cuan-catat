import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getAuthUser } from '@/lib/auth-utils'; 
import { z } from 'zod';
import { GroupType } from '@prisma/client';

const updateMappingSchema = z.object({
    groupType: z.nativeEnum(GroupType, { message: "Tipe grup tidak valid" }),
});

export async function PATCH(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    let authUser;
    try {
        authUser = getAuthUser(req);
    } catch (error: any) {
        return new NextResponse(JSON.stringify({ message: error.message }), { status: 401 });
    }

    try {
        const body = await req.json();
        const data = updateMappingSchema.parse(body);
        const id = parseInt(params.id); 

        if (isNaN(id)) {
            return new NextResponse(JSON.stringify({ message: "ID tidak valid" }), { status: 400 });
        }

        const updatedMapping = await db.itemMapping.update({
            where: {
                id: id,
            },
            data: {
                groupType: data.groupType,
            },
        });

        return NextResponse.json(updatedMapping);

    } catch (error: any) {
        if (error instanceof z.ZodError) {
            return new NextResponse(JSON.stringify({ message: error.issues[0].message }), { status: 400 });
        }
        return new NextResponse(JSON.stringify({ message: "Gagal memperbarui item" }), { status: 500 });
    }
}