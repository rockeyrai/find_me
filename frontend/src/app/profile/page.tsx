'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';

const ProfilePage = () => {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [isChangingId, setIsChangingId] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0d1117]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6 sm:p-12 font-sans relative overflow-hidden">
      {/* Background glowing orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-600 rounded-full mix-blend-screen filter blur-[120px] opacity-20 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-600 rounded-full mix-blend-screen filter blur-[120px] opacity-20 transform translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

      <div className="relative w-full max-w-lg bg-[#111111]/90 border border-[#222222] rounded-3xl shadow-2xl overflow-hidden backdrop-blur-xl transition-all duration-500 hover:shadow-blue-500/10 hover:border-[#333333]">
        {/* Header Banner */}
        <div className="h-32 bg-gradient-to-r from-blue-600 to-purple-600 relative">
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
        
        {/* Profile Content */}
        <div className="px-8 pb-8 z-10 relative">
          {/* Avatar (Initials) */}
          <div className="relative -mt-16 mb-6 flex justify-center">
            <div className="w-32 h-32 bg-gradient-to-tr from-gray-800 to-[#111111] rounded-full border-4 border-[#111111] flex items-center justify-center shadow-2xl">
              <span className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </span>
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-white tracking-tight">{user.name || 'User'}</h1>
            <p className="text-gray-400 mt-1 capitalize">{user.role || 'Member'} Account</p>
          </div>

          <div className="space-y-5">
            {/* Email Field */}
            <div className="group relative bg-[#1a1a1a] rounded-xl p-4 transition-colors hover:bg-[#222222] border border-transparent hover:border-[#333333]">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Email Address</label>
              <div className="flex items-center text-gray-200 font-medium">
                <svg className="w-5 h-5 mr-3 text-gray-400 group-hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                {user.email}
              </div>
            </div>

            {/* Google ID Field */}
            <div className="group relative bg-[#1a1a1a] rounded-xl p-4 transition-colors hover:bg-[#222222] border border-transparent hover:border-[#333333] flex items-center justify-between">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Google Identity</label>
                <div className="flex items-center text-gray-300 font-medium tracking-wide">
                  <svg className="w-5 h-5 mr-3 text-gray-400 group-hover:text-purple-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
                  </svg>
                  Linked Account
                </div>
              </div>
              <button 
                onClick={() => setIsChangingId(!isChangingId)}
                className="px-4 py-2 bg-[#2a2a2a] text-blue-400 text-sm font-semibold rounded-lg hover:bg-[#333333] hover:text-blue-300 transition-all focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                {isChangingId ? 'Cancel' : 'Change'}
              </button>
            </div>
            
            {/* Dynamic changing prompt */}
            {isChangingId && (
              <div className="p-4 bg-blue-900/10 border border-blue-500/20 rounded-xl text-sm text-blue-200 animate-in fade-in slide-in-from-top-2 duration-300">
                <p className="mb-3 leading-relaxed">
                  To change your linked Google ID, you must sign out and authenticate with a different Google account.
                </p>
                <button 
                   onClick={() => {
                      logout();
                   }}
                   className="inline-flex items-center justify-center w-full px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 font-semibold rounded-lg transition-colors border border-blue-500/30 hover:border-blue-500/50"
                >
                  Proceed to Re-authenticate
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </button>
              </div>
            )}
          </div>

          <div className="mt-8 pt-6 border-t border-[#222222]">
            <button 
              onClick={logout}
              className="w-full relative group overflow-hidden rounded-xl bg-[#1a1a1a] border border-[#333333] hover:border-red-500/30 transition-all p-4 focus:outline-none focus:ring-2 focus:ring-red-500/50"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative flex items-center justify-center text-red-400 font-semibold group-hover:text-red-300 transition-colors">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                Secure Logout
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;