import { z } from 'zod';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthUser } from '@/lib/auth-utils';
import { updateFinancialsForMonth } from '@/lib/financial-analytics';
import { TransactionType } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

const patchTransactionSchema = z.object({
    date: z.string().datetime().optional(),
    itemName: z.string().min(1).optional(),
    amount: z.number().positive().optional(), 
    type: z.nativeEnum(TransactionType).optional(),
    paymentMethodId: z.string().uuid().optional(),
    categoryId: z.string().uuid().nullable().optional(),
    note: z.string().nullable().optional(),
});

async function verifyTransactionOwner(userId: string, transactionId: string) {
  const transaction = await prisma.transaction.findFirst({
    where: { id: transactionId, userId: userId },
  });
  if (!transaction) {
    throw new Error("Not Found");
  }
  return transaction;
}

function handleError(error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Input tidak valid", details: error.issues }, { status: 400 });
    }
    if (error instanceof Error && (error.message.includes("Unauthorized") || error.message.includes("token"))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (error instanceof Error && error.message === "Not Found") {
      return NextResponse.json({ error: "Transaksi tidak ditemukan" }, { status: 404 });
    }
    console.error(error);
    return NextResponse.json({ error: "Terjadi kesalahan server" }, { status: 500 });
}

export async function GET(
  request: NextRequest,
  context: { params: { id: string } } 
) {
  try {
    const transactionId = context.params.id; 

    const authUser = getAuthUser(request);
    
    const transaction = await verifyTransactionOwner(authUser.id, transactionId);
    return NextResponse.json(transaction);
  } catch (error: any) {
    return handleError(error);
  }
}

export async function PATCH(
  request: NextRequest,
  context: { params: { id: string } } 
) {
  try {
    const authUser = getAuthUser(request);
    const transactionId = context.params.id;

    await verifyTransactionOwner(authUser.id, transactionId);

    const body = await request.json();
    const data = patchTransactionSchema.parse(body); 

    const updatedTransaction = await prisma.transaction.update({
      where: {
        id: transactionId,
      },
      data: {
        ...data,
        amount: data.amount ? new Decimal(data.amount) : undefined,
        date: data.date ? new Date(data.date) : undefined,
      },
    });

    updateFinancialsForMonth(authUser.id, updatedTransaction.date);
    return NextResponse.json(updatedTransaction);
  } catch (error: any) {
    return handleError(error);
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: { id: string } } 
) {
  try {
    const authUser = getAuthUser(request);
    const transactionId = context.params.id; 

    const transaction = await verifyTransactionOwner(authUser.id, transactionId);

    await prisma.transaction.delete({
      where: {
        id: transactionId,
      },
    });

    updateFinancialsForMonth(authUser.id, transaction.date); 
    
    return new NextResponse(null, { status: 204 }); 
  } catch (error: any) {
    return handleError(error);
  }
}