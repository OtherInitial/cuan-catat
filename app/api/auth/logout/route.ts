import { NextResponse } from 'next/server';

export async function POST() {
    try {
        const response = new NextResponse(
            JSON.stringify({ message: "Logout berhasil" }), 
            { status: 200 }
        );

        response.cookies.set('auth_token', '', { 
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
            maxAge: -1, 
        });

        return response;

    } catch (error) {
        console.error("Logout error:", error);
        return new NextResponse(JSON.stringify({ message: "Internal server error" }), { status: 500 });
    }
}