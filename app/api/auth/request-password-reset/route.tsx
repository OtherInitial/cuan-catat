import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { Resend } from 'resend';
import * as crypto from 'crypto';

import { ResetPasswordEmail } from '@/components/emails/reset-password-email'; 

const resend = new Resend(process.env.RESEND_API_KEY);
const appUrl = process.env.NEXT_PUBLIC_APP_URL;

export async function POST(req: NextRequest) {
    try {
        const { email } = await req.json();

        const user = await db.user.findUnique({
            where: { email: email.toLowerCase() }
        });

        if (!user) {
            return new NextResponse(JSON.stringify({ 
                message: "Jika email Anda terdaftar, Anda akan menerima email untuk reset password." 
            }), { status: 200 });
        }

        const rawToken = crypto.randomBytes(32).toString('hex');

        const hashedToken = crypto
            .createHash('sha256')
            .update(rawToken)
            .digest('hex');

        const expires = new Date(Date.now() + 3600000); 

        await db.user.update({
            where: { id: user.id },
            data: {
                passwordResetToken: hashedToken,
                passwordResetExpires: expires,
            }
        });

        const resetLink = `${appUrl}/reset-password?token=${rawToken}`;

        await resend.emails.send({
            from: 'onboarding@resend.dev', 
            to: user.email,
            subject: 'Reset Password Akun Cuan Catat Anda',
            
            react: <ResetPasswordEmail userName={user.name} resetLink={resetLink} />,
        });

        return new NextResponse(JSON.stringify({ 
            message: "Jika email Anda terdaftar, Anda akan menerima email untuk reset password." 
        }), { status: 200 });

    } catch (error) {
        console.error("Request Reset Error:", error);
        return new NextResponse(JSON.stringify({ 
            message: "Terjadi kesalahan internal" 
        }), { status: 500 });
    }
}