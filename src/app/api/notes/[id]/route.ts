import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

interface UpdateNoteBody {
  title: string;
  content: string;
  version: number;
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  if (isNaN(id) || id <= 0) {
    return NextResponse.json(
      { error: 'Invalid note id' },
      { status: 400 }
    );
  }

  try {
    const note = await prisma.note.findUnique({ where: { id } });
    if (!note) {
      return NextResponse.json(
        { error: 'Note not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(note);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch note' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  if (isNaN(id) || id <= 0) {
    return NextResponse.json(
      { error: 'Invalid note id' },
      { status: 400 }
    );
  }

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

  let body: UpdateNoteBody;
  try {
    body = (await request.json()) as UpdateNoteBody;
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON body' },
      { status: 400 }
    );
  }

  const { title, content, version } = body;

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
  if (typeof version !== 'number' || version < 1) {
    return NextResponse.json(
      { error: 'Valid version is required' },
      { status: 400 }
    );
  }

  try {
    // Optimistic locking: update only if version matches
    const updateResult = await prisma.note.updateMany({
      where: { id, version },
      data: {
        title,
        content,
        version: { increment: 1 },
      },
    });

    if (updateResult.count === 0) {
      // No rows updated means version conflict or note not found
      // Check if note exists
      const existingNote = await prisma.note.findUnique({ where: { id } });
      if (!existingNote) {
        return NextResponse.json(
          { error: 'Note not found' },
          { status: 404 }
        );
      }
      // Version conflict
      return NextResponse.json(
        { error: 'Conflict: Note was updated by someone else' },
        { status: 409 }
      );
    }

    // Return updated note
    const updatedNote = await prisma.note.findUnique({ where: { id } });
    return NextResponse.json(updatedNote);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update note' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  if (isNaN(id) || id <= 0) {
    return NextResponse.json(
      { error: 'Invalid note id' },
      { status: 400 }
    );
  }

  // Authentication
  const authHeader = request.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer')) {
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

  try {
    await prisma.note.delete({ where: { id } });
    return NextResponse.json({ message: 'Note deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Note not found' },
      { status: 404 }
    );
  }
}
