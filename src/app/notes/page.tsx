'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Note {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  version: number;
}

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/notes')
      .then((res) => res.json())
      .then(setNotes)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Notes</h1>
      <Link href="/notes/new" className="text-black underline mb-4 inline-block">
        + New Note
      </Link>
      {notes.length === 0 && <p>No notes found.</p>}
      <ul className="space-y-4">
        {notes.map(({ id, title, content }) => (
          <li key={id} className="border p-4 rounded shadow-sm">
            <Link href={`/notes/${id}`} className="text-xl font-semibold text-pink-800">
              {title}
            </Link>
            <p className="text-black mt-2 line-clamp-2">{content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
