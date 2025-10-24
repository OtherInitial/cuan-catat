import { z } from 'zod';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthUser } from '@/lib/auth-utils';
import { createTransactionSchema } from '@/lib/schemas'; 

const updateTransactionSchema = createTransactionSchema.partial();

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
  { params }: { params: { id: string } }
) {
  try {
    const authUser = getAuthUser(request);
    const transaction = await verifyTransactionOwner(authUser.id, params.id);
    return NextResponse.json(transaction);
  } catch (error: any) {
    return handleError(error);
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authUser = getAuthUser(request);

    await verifyTransactionOwner(authUser.id, params.id);

    const body = await request.json();

    const data = updateTransactionSchema.parse(body);

    const updatedTransaction = await prisma.transaction.update({
      where: {
        id: params.id,
      },
      data: {
        ...data,

        amount: data.amount ? data.amount : undefined,

        date: data.date ? new Date(data.date) : undefined,
      },
    });
    return NextResponse.json(updatedTransaction);
  } catch (error: any) {
    return handleError(error);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authUser = getAuthUser(request);

    await verifyTransactionOwner(authUser.id, params.id);

    await prisma.transaction.delete({
      where: {
        id: params.id,
      },
    });
    return new NextResponse(null, { status: 204 }); 
  } catch (error: any) {
    return handleError(error);
  }
}