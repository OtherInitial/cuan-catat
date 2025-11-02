import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const publicPaths = [
  '/sign-in',
  '/sign-up',
  '/forgot-password',
  '/reset-password',
];

const authPages = [
  '/sign-in',
  '/sign-up',
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAuthenticated = request.cookies.has('auth_token');

  const isPublicPage = publicPaths.some(path => pathname.startsWith(path));

  const isAuthPage = authPages.some(path => pathname.startsWith(path));

  if (!isPublicPage && !isAuthenticated) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  if (isAuthPage && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|images|favicon.ico).*)',
  ],
};