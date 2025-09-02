'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // Check login status on mount
    const loginStatus = localStorage.getItem('token') === 'true'
    setIsLoggedIn(loginStatus)
  }, [])

  return (
    <div className="min-h-screen  flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600">
      <div className="text-center bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to My Notes App</h1>
        <p className="text-lg text-gray-600 mb-8">A simple place to organize your thoughts and ideas.</p>
        
        {/* Conditional Link based on login status */}
        <Link
          href={isLoggedIn ? '/notes' : '/login'}
          className="px-6 py-3 bg-indigo-600 text-white text-lg font-medium rounded-lg shadow-lg transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {isLoggedIn ? 'Go to Notes' : 'Login to Start'}
        </Link>
      </div>
    </div>
  )
}
