import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const client = await db.getClients().then(clients => clients.find(c => c.id === id));
    if (!client) {
        return NextResponse.json({ error: 'Client not found' }, { status: 404 });
    }
    return NextResponse.json(client);
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const body = await request.json();
    const updatedClient = await db.updateClient(id, body);
    if (!updatedClient) {
        return NextResponse.json({ error: 'Client not found' }, { status: 404 });
    }
    return NextResponse.json(updatedClient);
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    await db.deleteClient(id);
    return NextResponse.json({ success: true });
}
