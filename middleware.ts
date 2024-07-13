import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_PATH = ['/auth/login'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get('access_token')?.value;
  const refreshToken = request.cookies.get('refresh_token')?.value;

  if (!token && !PUBLIC_PATH.includes(pathname)) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  if (token) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/verify-token`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ access_token: token }),
        },
      );

      if (!response.ok) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
      }
    } catch (err) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  } else if (refreshToken) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ refresh_token: refreshToken }),
        },
      );

      if (!response.ok) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
      } else {
        const data = await response.json();
        const newAccessToken = data.access_token;

        const responseWithCookie = NextResponse.next();
        responseWithCookie.cookies.set('access_token', newAccessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          maxAge: 15 * 60 * 1000,
        });
        return responseWithCookie;
      }
    } catch (err) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/((?!api|_next|static|public|favicon.ico).*)'],
};
