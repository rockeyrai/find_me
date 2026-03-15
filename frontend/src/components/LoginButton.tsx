import React from 'react';

const GoogleLoginButton = () => {
  const handleLogin = () => {
    // 1. Generate a random 'state' to prevent CSRF (Cross-Site Request Forgery)
    const state = Math.random().toString(36).substring(7);
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