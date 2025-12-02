import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const authToken = request.cookies.get('auth_token')?.value;
    const isAuthPage = request.nextUrl.pathname === '/login';

    // Protect /admin routes
    if (request.nextUrl.pathname.startsWith('/admin')) {
        if (!authToken) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    // Redirect to /admin if already logged in and visiting /login
    if (isAuthPage && authToken) {
        return NextResponse.redirect(new URL('/admin', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*', '/login'],
};
