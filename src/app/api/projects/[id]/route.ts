import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const project = await db.getProjectById(id);
    if (!project) {
        return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }
    return NextResponse.json(project);
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const body = await request.json();
    const updatedProject = await db.updateProject(id, body);
    if (!updatedProject) {
        return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }
    return NextResponse.json(updatedProject);
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    await db.deleteProject(id);
    return NextResponse.json({ success: true });
}
