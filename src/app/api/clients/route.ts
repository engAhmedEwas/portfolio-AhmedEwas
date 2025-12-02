import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { Client } from '@/types';

export async function GET() {
    const clients = await db.getClients();
    return NextResponse.json(clients);
}

export async function POST(request: Request) {
    const body = await request.json();
    const newClient: Client = {
        id: Date.now().toString(),
        ...body,
    };
    await db.createClient(newClient);
    return NextResponse.json(newClient, { status: 201 });
}
