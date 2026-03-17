import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get('session')?.value

  // Check if we are on a protected route
  if (request.nextUrl.pathname.startsWith('/home') || request.nextUrl.pathname.startsWith('/profile')) {
    // If no session cookie exists, redirect to login page (assuming '/' or '/auth/login')
    if (!sessionCookie) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  // If user is authenticated and tries to access login page, maybe redirect to home
  if (request.nextUrl.pathname === '/') {
    if (sessionCookie) {
      return NextResponse.redirect(new URL('/home', request.url))
    }
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/home/:path*', '/profile/:path*', '/'],
}
