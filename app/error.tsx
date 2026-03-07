'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Root Error Boundary caught:', error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background px-4 text-center font-general-sans">
      <div className="max-w-md w-full bg-background p-8 rounded-xl shadow-sm border border-border">
        <div className="mb-6 inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full">
          <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        
        <h2 className="text-2xl font-bold text-foreground mb-2">Something went wrong</h2>
        <p className="text-gray-600 mb-8">
          We encountered an unexpected error. This might be a temporary connection issue.
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => reset()}
            className="w-full py-3 px-4 bg-foreground hover:bg-foreground/70 text-background font-medium rounded-lg transition-colors"
          >
            Try again
          </button>
          
          <Link 
            href="/"
            className="w-full py-3 px-4 bg-background text-foreground font-medium rounded-lg border border-border transition-colors"
          >
            Go back home
          </Link>
        </div>

        {error.digest && (
          <p className="mt-6 text-xs text-gray-400 font-mono">
            Error ID: {error.digest}
          </p>
        )}
      </div>
    </div>
  )
}