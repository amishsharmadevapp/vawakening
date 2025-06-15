
// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// With client-side Firebase Auth, middleware plays a less direct role in session validation.
// The primary auth check and redirection will happen in `src/app/admin/dashboard/layout.tsx`.
// This middleware primarily defines which paths are part of the "admin" concern.
// It won't redirect to login itself, as that's handled client-side by the layout.

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // If accessing the login page itself, allow it.
  if (pathname === '/admin/login') {
    return NextResponse.next();
  }

  // For other /admin paths, the client-side guard in AdminDashboardLayout
  // will handle redirection if the user is not authenticated via Firebase client SDK.
  // This middleware can be used for other purposes in the future, like setting headers.

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*', // Matches all paths under /admin
  ],
};
