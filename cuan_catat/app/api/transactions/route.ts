import { z } from 'zod';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { v4 as uuidv4, validate as validateUuid } from 'uuid';

import { prisma } from '@/lib/prisma';
import { db } from '@/lib/db';
import { getAuthUser } from '@/lib/auth-utils';
import { TransactionType } from '@prisma/client';
import { createTransactionSchema } from '@/lib/schemas'; 

import { updateFinancialsForMonth } from '@/lib/financial-analytics';

export async function GET(request: NextRequest) {
  try {
    const authUser = getAuthUser(request);
    const { searchParams } = request.nextUrl;
    const yearStr = searchParams.get('year');
    const monthStr = searchParams.get('month');

    if (!yearStr || !monthStr) {
        return new NextResponse(JSON.stringify({ message: "Parameter tahun dan bulan diperlukan" }), { status: 400 });
    }

    const year = parseInt(yearStr);
    const month = parseInt(monthStr); 

    const startDate = new Date(year, month - 1, 1);
  
    const endDate = new Date(year, month, 1);

    const transactions = await prisma.transaction.findMany({
      where: {
        userId: authUser.id,
        date: {
          gte: startDate,
          lt: endDate
        }
      },
      include: {
        category: true,
        paymentMethod: true,
      },
      orderBy: {
        date: 'desc',
      },
    });

    return NextResponse.json(transactions);
  } catch (error) {
    if (error instanceof Error 
        && (
            error.message === "Unauthorized" || 
            error.message === "Invalid token payload" ||
            error.message === "Token expired" || 
            error.message === "Invalid token"
        )) {
      return NextResponse.json({ 
        error: "Unauthorized" 
    }, { 
        status: 401 
    });
    }
    if (error instanceof Error 
        && error.message.includes("JWT_SECRET")) {
      return NextResponse.json({ 
        error: "Internal Server Error" 
    }, { 
        status: 500 
    });
    }
    return NextResponse.json({ 
        error: "Gagal mengambil data" 
    }, { 
        status: 500 
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const authUser = getAuthUser(request);
    const body = await request.json();
    console.log("checking body: ", body);

    const data = createTransactionSchema.parse(body);

    let itemMappingId: number | undefined = undefined;
    const existingMapping = await db.itemMapping.findUnique({
        where: { itemName: data.itemName }
    });

    if (existingMapping) {
        itemMappingId = existingMapping.id;
    }

    // let finalCategoryId = data.categoryId;

    // if (finalCategoryId && !validateUuid(finalCategoryId)) {
    //   const newCategoryName = finalCategoryId;
    //   let existingCategory = await prisma.category.findFirst({
    //     where: { 
    //         userId: authUser.id, 
    //         name: newCategoryName, 
    //         type: data.type 
    //     },
    //   });

    //   if (existingCategory) {
    //     finalCategoryId = existingCategory.id;
    //   } else {
    //     const newCategory = await prisma.category.create({
    //       data: { 
    //         userId: authUser.id, 
    //         name: newCategoryName, 
    //         type: data.type 
    //     },
    //     });
    //     finalCategoryId = newCategory.id;
    //   }
    // } else if (!finalCategoryId) {
    //   let defaultCategory = await prisma.category.findFirst({
    //     where: { 
    //         userId: authUser.id, 
    //         name: "Tidak diketahui", 
    //         type: data.type 
    //     },
    //   });
    //   if (!defaultCategory) {
    //     defaultCategory = await prisma.category.create({
    //       data: { 
    //         userId: authUser.id, 
    //         name: "Tidak diketahui", 
    //         type: data.type, 
    //         isDefault: true 
    //     },
    //     });
    //   }
    //   finalCategoryId = defaultCategory.id;
    // }

    let finalPaymentMethodId = data.paymentMethodId;

    if (!validateUuid(finalPaymentMethodId)) {
      const newPaymentMethodName = finalPaymentMethodId;
      let existingPM = await prisma.paymentMethod.findFirst({
        where: {
          userId: authUser.id,
          name: newPaymentMethodName,
        },
      });

      if (existingPM) {
        finalPaymentMethodId = existingPM.id;
      } else {
        const newPM = await prisma.paymentMethod.create({
          data: {
            userId: authUser.id,
            name: newPaymentMethodName,
            isDefault: false,
          },
        });
        finalPaymentMethodId = newPM.id;
      }
    }

    const newTransaction = await prisma.transaction.create({
      data: {
        userId: authUser.id,
        itemName: data.itemName,
        date: new Date(data.date), 
        type: data.type,
        amount: data.amount, 
        note: data.note,
        categoryId: null,
        paymentMethodId: finalPaymentMethodId,
        itemMappingId: itemMappingId,
        productId: data.productId
      },
      include: {
        category: true,
        paymentMethod: true,
      },
    });

    updateFinancialsForMonth(authUser.id, newTransaction.date);

    if (itemMappingId) {
        return NextResponse.json(newTransaction, { status: 201 });
    } else {
        return NextResponse.json(
            { 
                status: "NEEDS_CLASSIFICATION", 
                transactionId: newTransaction.id, 
                itemName: newTransaction.itemName 
            }, 
            { status: 202 }
        );
    }

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ 
        error: "Input tidak valid", 
        details: error.issues 
    }, { 
        status: 400 
    });
    }
    if (error instanceof Error 
        && (
            error.message === "Unauthorized" || 
            error.message === "Invalid token payload"
        )) {
      return NextResponse.json({ 
        error: "Unauthorized" 
    }, { 
        status: 401 
    });
    }

    if (error instanceof Error && error.message.includes("JWT_SECRET")) {
      return NextResponse.json({ 
        error: "Internal Server Error" 
    }, { 
        status: 500 
    });
    }
    console.error(error);
    return NextResponse.json({ 
        error: "Gagal membuat transaksi" 
    }, { 
        status: 500 
    });
  }
}