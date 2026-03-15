import { useEffect } from "react";

// pages/auth/callback.tsx (Simplified)
useEffect(() => {
  const code = new URLSearchParams(window.location.search).get('code');
  const state = new URLSearchParams(window.location.search).get('state');

  if (state !== localStorage.getItem('auth_state')) {
      alert("Security mismatch! CSRF detected.");
      return;
  }

  // Send code to Express backend
  fetch('/api/auth/google/verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code }),
  }).then(res => {
    if (res.ok) window.location.href = '/dashboard';
  });
}, []);