import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const allowedPaths = ['/', '/contact', '/shop'];

  const isAllowed = allowedPaths.some((path) => pathname === path || pathname.startsWith(path + '/'));

  // Allow these paths (important!)
  if (
    pathname.startsWith('/_next') || // Next.js internals
    pathname.startsWith('/api') || // API routes
    pathname.startsWith('/favicon') ||
    pathname.match(/\.(.*)$/) // static files (images, css, etc.)
  ) {
    return NextResponse.next();
  }

  if (isAllowed) {
    return NextResponse.next();
  }

  // Redirect everything else to landing page
  const url = request.nextUrl.clone();
  url.pathname = '/';
  return NextResponse.redirect(url);
}
