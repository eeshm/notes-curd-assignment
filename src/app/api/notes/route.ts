import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

interface CreateNoteBody {
  title: string;
  content: string;
}

export async function GET(request: NextRequest) {
  try {
    const notes = await prisma.note.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(notes);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch notes' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  // Authentication
  const authHeader = request.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }
  const token = authHeader.split(' ')[1];
  const user = verifyToken(token);
  if (!user) {
    return NextResponse.json(
      { error: 'Invalid token' },
      { status: 401 }
    );
  }

  let body: CreateNoteBody;
  try {
    body = (await request.json()) as CreateNoteBody;
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON body' },
      { status: 400 }
    );
  }

  const { title, content } = body;

  if (!title || title.trim() === '') {
    return NextResponse.json(
      { error: 'Title is required' },
      { status: 400 }
    );
  }
  if (content.length > 5000) {
    return NextResponse.json(
      { error: 'Content too long' },
      { status: 400 }
    );
  }

  try {
    const note = await prisma.note.create({
      data: { title, content },
    });
    return NextResponse.json(note);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create note' },
      { status: 500 }
    );
  }
}
