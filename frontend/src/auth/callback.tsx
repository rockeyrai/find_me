'use client';

import { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const hasFetched = useRef(false);

  useEffect(() => {
    // Prevent double fetching in React Strict Mode
    if (hasFetched.current) return;
    
    const code = searchParams.get('code');
    const state = searchParams.get('state');

    if (!code || !state) {
      setError("Wait! Missing authenticating callback parameters.");
      return;
    }

    const savedState = localStorage.getItem('auth_state');
    if (state !== savedState) {
      setError("Security mismatch! CSRF detected.");
      return;
    }

    hasFetched.current = true;

    // Send code to Express backend
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/auth/google`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ code }),
    })
      .then(async (res) => {
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error || data.message || 'Authentication verification failed');
        }
        // Cleanup state
        localStorage.removeItem('auth_state');
        router.push('/dashboard');
      })
      .catch((err) => {
        setError(err.message || "An error occurred during authentication.");
      });
  }, [searchParams, router]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <h2 className="text-xl font-bold text-red-600 mb-4">Authentication Error</h2>
          <p className="text-gray-700">{error}</p>
          <button 
            onClick={() => router.push('/')}
            className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Return to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="text-center bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <div className="mb-6 h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent mx-auto"></div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Verifying Authentication...</h2>
        <p className="text-gray-500">Please wait while we securely log you in. Do not close this page.</p>
      </div>
    </div>
  );
}