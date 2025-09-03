'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem('token');
      setIsLoggedIn(!!token); // Sets true if token exists
    };

    checkLoginStatus();

    // Listen for localStorage changes from other tabs
    window.addEventListener('storage', checkLoginStatus);

    return () => {
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, []);


function handleLogout() {
  localStorage.removeItem('token');
  setIsLoggedIn(false); // immediately update UI
  router.push('/login');
}


  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  return (
    <nav className=" bg-gradient-to-br from-gray-50 via-white  border-b-2 p-4 flex justify-between items-center ">
      <Link href="/notes" className="font-bold text-black text-2xl hover:text-yellow-300 transition-colors duration-300">
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
        <Link href="/login" className="text-white bg-black text-lg hover:text-yellow-300 underline transition-colors duration-300">
          Login
        </Link>
      )}
    </nav>
  );
}
