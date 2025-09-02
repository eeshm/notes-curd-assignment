'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

interface Note {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  version: number;
}

export default function NotePage() {
  const { id } = useParams();
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/notes/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Note not found');
        return res.json();
      })
      .then(setNote)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold">{note?.title}</h1>
      <p className="mt-4 whitespace-pre-wrap">{note?.content}</p>
      <div className="mt-6 space-x-4">
        <Link href={`/notes/edit/${id}`} className="text-blue-600 underline">
          Edit
        </Link>
        <Link href="/notes" className="text-gray-600 underline">
          Back to list
        </Link>
      </div>
    </div>
  );
}
