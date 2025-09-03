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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-blue-50 relative">
      <div className="relative z-10 text-center max-w-md mx-4">

        <div className="bg-white/80 backdrop-blur-sm border border-gray-100 p-12 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300">
          
          <div className="mb-8 flex justify-center">
            <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center shadow-sm">
              <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
          </div>

          <h1 className="text-4xl font-light text-gray-800 mb-3 tracking-tight">
            Notes
          </h1>
          
          <p className="text-gray-500 mb-2 font-normal">
            Simple & Clean
          </p>
          <p className="text-sm text-gray-400 mb-10 leading-relaxed">
            A minimal space for your thoughts and ideas.
          </p>

          {/* Clean button */}
          <Link
            href={isLoggedIn ? '/notes' : '/login'}
            className="inline-flex items-center justify-center px-8 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl shadow-sm hover:bg-gray-50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all duration-200 group"
          >
            <span className="mr-2">{isLoggedIn ? 'Go to Notes' : 'Get Started'}</span>
            <svg className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7"></path>
            </svg>
          </Link>

          {/* Minimal status */}
          <div className="mt-8 flex items-center justify-center space-x-2">
            <div className={`w-1.5 h-1.5 rounded-full ${isLoggedIn ? 'bg-green-400' : 'bg-amber-400'}`}></div>
            <span className="text-xs text-gray-400 font-light">
              {isLoggedIn ? 'Signed in' : 'Ready to start'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}