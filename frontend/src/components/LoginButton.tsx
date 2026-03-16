'use client';

import React from 'react';

const GoogleLoginButton = () => {
  const handleLogin = () => {
    // 1. Generate a cryptographically secure 'state' to prevent CSRF (Cross-Site Request Forgery)
    const array = new Uint8Array(16);
    window.crypto.getRandomValues(array);
    const state = Array.from(array, dec => dec.toString(16).padStart(2, '0')).join('');
    
    localStorage.setItem('auth_state', state);

    // 2. Construct the Google OAuth URL manually
    const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
    const options = {
      redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_CALLBACK_URL as string,
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
      access_type: 'offline', // Essential for getting a Refresh Token
      response_type: 'code',    // We want a CODE, not a token
      prompt: 'consent',
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
      ].join(' '),
      state: state,
    };

    const qs = new URLSearchParams(options);
    window.location.href = `${rootUrl}?${qs.toString()}`;
  };

  return (
    <button onClick={handleLogin} className="google-btn">
      Sign in with Google
    </button>
  );
};

export default GoogleLoginButton;