import { z } from 'zod';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { v4 as uuidv4, validate as validateUuid } from 'uuid';

import { prisma } from '@/lib/prisma';
import { getAuthUser } from '@/lib/auth-utils';
import { createTransactionSchema } from '@/lib/schemas'; 

export async function GET(request: NextRequest) {
  try {
    const authUser = getAuthUser(request);
    const { searchParams } = new URL(request.url);
    const from = searchParams.get('from');
    const to = searchParams.get('to');

    const where: any = {
      userId: authUser.id,
    };

    if (from && to) {
      where.date = {
        gte: new Date(from),
        lte: new Date(to),
      };
    }

    const transactions = await prisma.transaction.findMany({
      where: where,
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

    const data = createTransactionSchema.parse(body);

    let finalCategoryId = data.categoryId;

    if (finalCategoryId && !validateUuid(finalCategoryId)) {
      const newCategoryName = finalCategoryId;
      let existingCategory = await prisma.category.findFirst({
        where: { 
            userId: authUser.id, 
            name: newCategoryName, 
            type: data.type 
        },
      });

      if (existingCategory) {
        finalCategoryId = existingCategory.id;
      } else {
        const newCategory = await prisma.category.create({
          data: { 
            userId: authUser.id, 
            name: newCategoryName, 
            type: data.type 
        },
        });
        finalCategoryId = newCategory.id;
      }
    } else if (!finalCategoryId) {
      let defaultCategory = await prisma.category.findFirst({
        where: { 
            userId: authUser.id, 
            name: "Tidak diketahui", 
            type: data.type 
        },
      });
      if (!defaultCategory) {
        defaultCategory = await prisma.category.create({
          data: { 
            userId: authUser.id, 
            name: "Tidak diketahui", 
            type: data.type, 
            isDefault: true 
        },
        });
      }
      finalCategoryId = defaultCategory.id;
    }

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
        categoryId: finalCategoryId,
        paymentMethodId: finalPaymentMethodId,
      },
      include: {
        category: true,
        paymentMethod: true,
      },
    });

    return NextResponse.json(newTransaction, { status: 201 });
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