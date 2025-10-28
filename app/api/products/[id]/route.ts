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

const updateProductSchema = z.object({
    name: z.string().min(1).optional(),
    sellingPrice: z.number().positive().optional(),
    hppCalculationType: z.nativeEnum(HppType).optional(),
    manualHpp: z.number().optional().nullable(),
    recipe: z.array(recipeItemSchema).optional().nullable(),
});

export async function GET(
    req: NextRequest, 
    context: { params: Promise<{ id: string }> }
) {
    let authUser;
    try { authUser = getAuthUser(req); }
    catch (error: any) { return new NextResponse(JSON.stringify({ message: error.message }), { status: 401 }); }

    try {
        const params = await context.params;
        const product = await db.product.findUnique({
            where: { id: params.id, userId: authUser.id },
            include: {
                materials: { 
                    select: {
                        rawMaterialId: true,
                        quantity: true,
                        rawMaterial: {
                            select: { name: true, unit: true, costPerUnit: true }
                        }
                    }
                }
            }
        });

        if (!product) {
            return new NextResponse(JSON.stringify({ message: "Produk tidak ditemukan" }), { status: 404 });
        }

        const recipeForClient = product.materials.map(m => ({
            rawMaterialId: m.rawMaterialId,
            quantity: m.quantity,
            name: m.rawMaterial.name,
            unit: m.rawMaterial.unit,
            costPerUnit: m.rawMaterial.costPerUnit.toNumber(),
        }));

        const productForClient = {
            ...product,
            sellingPrice: product.sellingPrice.toNumber(),
            manualHpp: product.manualHpp?.toNumber() || null,
            calculatedHpp: product.calculatedHpp?.toNumber() || null,
            recipe: recipeForClient, 
        };

        delete (productForClient as any).materials;

        return NextResponse.json(productForClient);

    } catch (error) {
        return new NextResponse(JSON.stringify({ message: "Gagal mengambil data produk" }), { status: 500 });
    }
}

export async function PATCH(
    req: NextRequest, 
    context: { params: Promise<{ id: string }> }
) {
    let authUser;
    try { authUser = getAuthUser(req); }
    catch (error: any) { return new NextResponse(JSON.stringify({ message: error.message }), { status: 401 }); }

    try {
        const body = await req.json();
        const data = updateProductSchema.parse(body);

        let finalManualHpp: Decimal | null | undefined = undefined; 
        let finalCalculatedHpp: Decimal | null | undefined = undefined;

        if (data.hppCalculationType) {
            if (data.hppCalculationType === HppType.MANUAL) {
                if (!data.manualHpp || data.manualHpp <= 0) {
                    throw new Error("HPP Manual wajib diisi saat tipe MANUAL");
                }
                finalManualHpp = new Decimal(data.manualHpp);
                finalCalculatedHpp = null; 
            } else { 
                if (!data.recipe) {
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
                    calculatedHpp = calculatedHpp.plus(material.costPerUnit.times(item.quantity));
                }
                finalCalculatedHpp = calculatedHpp;
                finalManualHpp = null; 
            }
        }

        const updatedProduct = await db.$transaction(async (tx) => {
            const params = await context.params;
            const product = await tx.product.update({
                where: { id: params.id, userId: authUser.id },
                data: {
                    name: data.name,
                    sellingPrice: data.sellingPrice ? new Decimal(data.sellingPrice) : undefined,
                    hppCalculationType: data.hppCalculationType,
                    manualHpp: finalManualHpp,
                    calculatedHpp: finalCalculatedHpp,
                }
            });

            if ((data.hppCalculationType === HppType.OTOMATIS || data.recipe) && data.recipe) {
                await tx.productMaterial.deleteMany({
                    where: { productId: params.id }
                });
        
                if (data.recipe.length > 0) {
                    await tx.productMaterial.createMany({
                        data: data.recipe.map(r => ({
                            productId: params.id,
                            rawMaterialId: r.rawMaterialId,
                            quantity: r.quantity
                        }))
                    });
                }
            }
        
            else if (data.hppCalculationType === HppType.MANUAL) {
                 await tx.productMaterial.deleteMany({
                    where: { productId: params.id }
                });
            }

            return product;
        });

        return NextResponse.json(updatedProduct);

    } catch (error: any) {
        return new NextResponse(JSON.stringify({ message: error.message || "Gagal memperbarui produk" }), { status: 400 });
    }
}

export async function DELETE(
    req: NextRequest, 
    context: { params: Promise<{ id: string }> }
) {
    let authUser;
    try {
        authUser = getAuthUser(req);
    } catch (error: any) {
        return new NextResponse(JSON.stringify({ message: error.message }), { status: 401 });
    }

    try {
        const params = await context.params;
        await db.product.delete({
            where: {
                id: params.id,
                userId: authUser.id,
            },
        });

        return new NextResponse(null, { status: 204 });

    } catch (error: any) {
        if (error.code === 'P2025') {
            return new NextResponse(JSON.stringify({ message: "Produk tidak ditemukan" }), { status: 404 });
        }
    
        if (error.code === 'P2014' || error.code === 'P2003') {
             return new NextResponse(JSON.stringify({ message: "Gagal menghapus: Produk ini masih digunakan dalam transaksi." }), { status: 400 });
        }
        console.error("Gagal menghapus produk:", error);
        return new NextResponse(JSON.stringify({ message: "Gagal menghapus produk" }), { status: 500 });
    }
}