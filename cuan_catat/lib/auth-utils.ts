import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

interface UserPayload {
  id: string;
  email: string;
}

export function getAuthUser(req: NextRequest): UserPayload {
  const authHeader = req.headers.get("Authorization");
  let token: string | undefined = authHeader?.split(" ")[1];

  if (!token) {
    const tokenCookie = req.cookies.get("auth_token");
    token = tokenCookie?.value;
  }
  
  if (!token) {
    throw new Error('Unauthorized'); 
  }

  const secretKey = process.env.JWT_SECRET;
  
  if (!secretKey) {
    throw new Error('JWT_SECRET tidak dikonfigurasi di server'); 
  }

  try {
    const payload = jwt.verify(token, secretKey) as UserPayload;
    
    if (!payload.id) {
       throw new Error('Invalid token payload');
    }

    console.log("Payload JWT berhasil diverifikasi:", payload);
    
    return payload;
  } catch (error: any) { 
    
    console.error("JWT VERIFICATION GAGAL:", error.name, error.message);
    
    if (error.name === 'TokenExpiredError') {
        throw new Error('Token expired');
    }
    
    if (error.name === 'JsonWebTokenError') {
        throw new Error('Invalid token');
    }

    throw new Error('Unauthorized'); 
  }
}