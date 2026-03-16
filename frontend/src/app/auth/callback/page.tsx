import { Suspense } from 'react';
import AuthCallback from '../../../auth/callback';

export default function CallbackPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <div className="mb-6 h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent mx-auto"></div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Loading...</h2>
          <p className="text-gray-500">Preparing authentication environment.</p>
        </div>
      </div>
    }>
      <AuthCallback />
    </Suspense>
  );
}
