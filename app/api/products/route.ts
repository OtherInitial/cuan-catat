import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getAuthUser } from '@/lib/auth-utils';
import { z } from 'zod';
import { HppType } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

const recipeItemSchema = z.object({
    rawMaterialId: z.string().uuid(),
    quantity: z.number().positive(),
});

const productSchema = z.object({
    name: z.string().min(1),
    sellingPrice: z.number().positive(),
    hppCalculationType: z.nativeEnum(HppType),
    manualHpp: z.number().optional().nullable(),
    recipe: z.array(recipeItemSchema).optional().nullable(),
    calculatedHpp: z.number().nullable()
});

export async function GET(req: NextRequest) {
    let authUser;
    try { authUser = getAuthUser(req); } 
    catch (error: any) { return new NextResponse(JSON.stringify({ message: error.message }), { status: 401 }); }

    const products = await db.product.findMany({
        where: { userId: authUser.id },
        orderBy: { name: 'asc' }
    });
    
    const productsForClient = products.map(p => ({
        ...p,
        sellingPrice: p.sellingPrice.toNumber(),
        manualHpp: p.manualHpp?.toNumber() || null,
        calculatedHpp: p.calculatedHpp?.toNumber() || null,
    }));
    return NextResponse.json(productsForClient);
}

export async function POST(req: NextRequest) {
    let authUser;
    try { authUser = getAuthUser(req); } 
    catch (error: any) { 
        return new NextResponse(JSON.stringify({ 
            message: error.message 
        }), { status: 401 }); 
    }

    try {
        const body = await req.json();
        const data = productSchema.parse(body);
        console.log(data);

        let finalManualHpp: Decimal | null = null;
        let finalCalculatedHpp: Decimal | null = null;

        if (data.hppCalculationType === HppType.MANUAL) {
            if (!data.manualHpp || data.manualHpp <= 0) {
                throw new Error("HPP Manual wajib diisi");
            }
            finalManualHpp = new Decimal(data.manualHpp);
        } else {
            if (!data.recipe || data.recipe.length === 0) {
                throw new Error("Resep (Bahan Baku) wajib diisi untuk HPP Otomatis");
            }
            
            const materialIds = data.recipe.map(r => r.rawMaterialId);
            const rawMaterials = await db.rawMaterial.findMany({
                where: { id: { in: materialIds }, userId: authUser.id }
            });

            let calculatedHpp = new Decimal(0);
            for (const item of data.recipe) {
                const material = rawMaterials.find(m => m.id === item.rawMaterialId);
                if (!material) throw new Error(`Bahan baku ${item.rawMaterialId} tidak ditemukan`);
                
                const itemCost = material.costPerUnit.times(item.quantity);
                calculatedHpp = calculatedHpp.plus(itemCost);
            }
            finalCalculatedHpp = calculatedHpp;
        }

        const newProduct = await db.product.create({
            data: {
                name: data.name,
                sellingPrice: new Decimal(data.sellingPrice),
                hppCalculationType: data.hppCalculationType,
                manualHpp: finalManualHpp,
                calculatedHpp: data.calculatedHpp,
                userId: authUser.id,
                
                materials: data.hppCalculationType === HppType.OTOMATIS
                    ? {
                        createMany: {
                            data: data.recipe!.map(r => ({
                                rawMaterialId: r.rawMaterialId,
                                quantity: r.quantity
                            }))
                        }
                    } 
                    : undefined
            }
        });
        
        return NextResponse.json(newProduct, { status: 201 });

    } catch (error: any) {
        // ... (Zod error handling, dll)
        return new NextResponse(JSON.stringify({ message: error.message || "Input tidak valid" }), { status: 400 });
    }
}