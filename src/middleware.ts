import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || 'your-secret-key-change-this-in-production'
);

export async function middleware(request: NextRequest) {
    const authToken = request.cookies.get('auth_token')?.value;
    const isAuthPage = request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/signup';
    const isProfilePage = request.nextUrl.pathname === '/profile';
    const isAdminPage = request.nextUrl.pathname.startsWith('/admin');

    // Protect /admin routes
    if (isAdminPage) {
        if (!authToken) {
            return NextResponse.redirect(new URL('/login', request.url));
        }

        try {
            const { payload } = await jwtVerify(authToken, JWT_SECRET);
            if (!payload.isAdmin) {
                // Redirect non-admins to profile or home
                return NextResponse.redirect(new URL('/profile', request.url));
            }
        } catch {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    // Protect /profile route
    if (isProfilePage) {
        if (!authToken) {
            return NextResponse.redirect(new URL('/login', request.url));
        }

        try {
            await jwtVerify(authToken, JWT_SECRET);
        } catch {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    // Redirect to /profile if already logged in and visiting /login or /signup
    if (isAuthPage && authToken) {
        try {
            await jwtVerify(authToken, JWT_SECRET);
            return NextResponse.redirect(new URL('/profile', request.url));
        } catch {
            // Invalid token, allow access to auth pages
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*', '/login', '/signup', '/profile'],
};
