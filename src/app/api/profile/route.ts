import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';

const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || 'your-secret-key-change-this-in-production'
);

export async function PUT(request: Request) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('auth_token')?.value;

        if (!token) {
            return NextResponse.json(
                { error: 'Not authenticated' },
                { status: 401 }
            );
        }

        // Verify JWT
        const { payload } = await jwtVerify(token, JWT_SECRET);
        const userId = payload.userId as string;

        const body = await request.json();
        const { name, username, email, currentPassword, newPassword } = body;

        // Get current user
        const user = await db.getUserById(userId);
        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        // Prepare updates
        const updates: any = {};
        if (name) updates.name = name;
        if (username) updates.username = username;
        if (email) updates.email = email;

        // Handle password change
        if (newPassword) {
            if (!currentPassword) {
                return NextResponse.json(
                    { error: 'Current password is required to change password' },
                    { status: 400 }
                );
            }

            const isPasswordValid = await bcrypt.compare(currentPassword, user.passwordHash);
            if (!isPasswordValid) {
                return NextResponse.json(
                    { error: 'Current password is incorrect' },
                    { status: 400 }
                );
            }

            updates.passwordHash = await bcrypt.hash(newPassword, 10);
        }

        // Update user
        const updatedUser = await db.updateUser(userId, updates);

        return NextResponse.json({
            success: true,
            user: {
                id: updatedUser!.id,
                name: updatedUser!.name,
                username: updatedUser!.username,
                email: updatedUser!.email,
            },
        });
    } catch (error) {
        console.error('Profile update error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
