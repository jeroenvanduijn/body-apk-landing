import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only split on the root path
  if (pathname !== '/') return NextResponse.next();

  // Check if visitor already has a variant assigned
  const variant = request.cookies.get('ab-variant')?.value;

  if (variant === 'B') {
    // Redirect to /b and keep the cookie
    const url = request.nextUrl.clone();
    url.pathname = '/b';
    return NextResponse.redirect(url);
  }

  if (variant === 'A') {
    // Already on A, continue
    return NextResponse.next();
  }

  // New visitor: randomly assign 50/50
  const assigned = Math.random() < 0.5 ? 'A' : 'B';

  if (assigned === 'B') {
    const url = request.nextUrl.clone();
    url.pathname = '/b';
    const response = NextResponse.redirect(url);
    response.cookies.set('ab-variant', 'B', { maxAge: 60 * 60 * 24 * 30 }); // 30 days
    return response;
  }

  // Variant A: stay on /
  const response = NextResponse.next();
  response.cookies.set('ab-variant', 'A', { maxAge: 60 * 60 * 24 * 30 }); // 30 days
  return response;
}

export const config = {
  matcher: '/',
};
