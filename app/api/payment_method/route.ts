import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthUser } from '@/lib/auth-utils';

export async function GET(request: NextRequest) {
  try {
    const authUser = getAuthUser(request);

    const paymentMethods = await prisma.paymentMethod.findMany({
      where: {
        OR: [
          { userId: authUser.id }, 
          { userId: null, isDefault: true }
        ],
      },
      orderBy: {
        isDefault: 'desc',
      },
    });

    return NextResponse.json(paymentMethods);

  } catch (error: any) {
    if (error.message === "Unauthorized" || error.message.includes("token")) {
      return NextResponse.json({ 
        error: "Unauthorized" 
    }, { status: 401 });
    }
    console.error("Gagal mengambil payment methods:", error);
    return NextResponse.json({ error: "Gagal mengambil data" }, { status: 500 });
  }
}