import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { Project } from '@/types';

export async function GET() {
    const projects = await db.getProjects();
    return NextResponse.json(projects);
}

export async function POST(request: Request) {
    const body = await request.json();
    const newProject: Project = {
        id: Date.now().toString(), // Simple ID generation
        ...body,
    };
    await db.createProject(newProject);
    return NextResponse.json(newProject, { status: 201 });
}
