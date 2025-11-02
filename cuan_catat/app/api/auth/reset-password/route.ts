import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import * as crypto from 'crypto';
import * as bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
    try {
        const { token, password } = await req.json();

        if (!token || !password) {
            return new NextResponse(JSON.stringify({ message: "Data tidak lengkap" }), { status: 400 });
        }
        
        const hashedToken = crypto
            .createHash('sha256')
            .update(token)
            .digest('hex');
        
        const user = await db.user.findFirst({
            where: {
                passwordResetToken: hashedToken,
                passwordResetExpires: { gt: new Date() } 
            }
        });

        if (!user) {
            return new NextResponse(JSON.stringify({ 
                message: "Token tidak valid atau telah kedaluwarsa." 
            }), { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await db.user.update({
            where: { id: user.id },
            data: {
                password: hashedPassword,
                passwordResetToken: null, 
                passwordResetExpires: null,
            }
        });

        return new NextResponse(JSON.stringify({ 
            message: "Password berhasil direset. Silakan login." 
        }), { status: 200 });

    } catch (error) {
        console.error("Reset Password Error:", error);
        return new NextResponse(JSON.stringify({ 
            message: "Terjadi kesalahan internal" 
        }), { status: 500 });
    }
}