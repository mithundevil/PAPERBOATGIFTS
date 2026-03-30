import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Define protected paths
  const isProtectedPath = path.startsWith('/admin') && path !== '/admin/login';

  // Skip middleware for non-protected paths
  if (!isProtectedPath) {
    return NextResponse.next();
  }

  // Get token from cookies
  const token = request.cookies.get('jwt')?.value;

  // If no token and trying to access admin, redirect to login
  if (!token && isProtectedPath) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // For now, we assume if token exists, it's valid for initial client-side check.
  // Full role verification happens on the backend API layer.
  // In a more complex setup, we could decode the JWT here to check role.
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
