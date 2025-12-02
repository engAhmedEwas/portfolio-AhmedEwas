import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { Task } from '@/types';

export async function GET() {
    const tasks = await db.getTasks();
    return NextResponse.json(tasks);
}

export async function POST(request: Request) {
    const body = await request.json();
    const newTask: Task = {
        id: Date.now().toString(),
        ...body,
    };
    await db.createTask(newTask);
    return NextResponse.json(newTask, { status: 201 });
}
