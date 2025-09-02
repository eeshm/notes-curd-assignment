'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check login status on mount
    const loginStatus = localStorage.getItem('token') === 'true';
    setIsLoggedIn(loginStatus);
  }, []);

  function handleLogout() {
    localStorage.removeItem('token');
    router.push('/login');
  }

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  return (
    <nav className="bg-black/90 p-4 flex justify-between items-center sticky top-0">
      <Link href="/notes" className="font-bold text-white text-2xl hover:text-yellow-300 transition-colors duration-300">
        Thoughts and Notes
      </Link>
      
      {/* Conditional render for login/logout */}
      {isLoggedIn ? (
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition-all duration-300 focus:outline-none"
        >
          Logout
        </button>
      ) : (
        <Link href="/login" className="text-white text-lg hover:text-yellow-300 underline transition-colors duration-300">
          Login
        </Link>
      )}
    </nav>
  );
}
