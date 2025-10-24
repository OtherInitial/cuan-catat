import { 
  NextRequest, 
  NextResponse 
} from 'next/server';
import jwt from 'jsonwebtoken'; 

import { prisma } from '@/lib/prisma';
import { verifyPassword } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email dan password harus diisi' },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Email atau password salah' }, 
        { status: 401 }
      );
    }

    const isPasswordValid = await verifyPassword(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Email atau password salah' }, 
        { status: 401 }
      );
    }

    const payload = {
      id: user.id,
      email: user.email,
    };

    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) {
      throw new Error('JWT_SECRET tidak ditemukan di environment variable');
    }

    const token = jwt.sign(payload, secretKey, {
      expiresIn: '1d', 
    });

    const response = NextResponse.json({
        message: 'Login berhasil',
        data : {
          user_id: user.id,
          email: user.email,
          username: user.name,
          phone: user.phone,
          avatar: user.avatarUrl,
          token: token
        },
    }, { status: 200 });

    response.cookies.set("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: "/",
        maxAge: 60 * 60 * 24, 
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    );
  }
}

export async function GET(){
  try{

  } catch(error){

  }
}