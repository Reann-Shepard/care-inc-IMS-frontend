import { NextRequest, NextResponse } from 'next/server';
import { jwtDecode } from 'jwt-decode';

const PUBLIC_PATH = ['/auth/login', '/unauthorized'];

interface JwtPayload {
  sub: string;
  name: string;
  roles: string;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get('access_token')?.value;
  const refreshToken = request.cookies.get('refresh_token')?.value;

  if (PUBLIC_PATH.includes(pathname)) {
    return NextResponse.next();
  }

  if (!token && !refreshToken) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  if (token) {
    const isValidToken = await verifyAccessToken(token);
    if (isValidToken) {
      const role = getRoleFromToken(token);
      console.log('Role:', role);
      if (isAuthorized(pathname, role)) {
        return NextResponse.next();
      } else {
        return NextResponse.redirect(new URL('/unauthorized', request.url));
      }
    } else {
      if (refreshToken) {
        return await refreshAccessToken(request, refreshToken);
      } else {
        return NextResponse.redirect(new URL('/auth/login', request.url));
      }
    }
  }

  if (refreshToken) {
    return await refreshAccessToken(request, refreshToken);
  }

  return NextResponse.next();
}

async function verifyAccessToken(token: string): Promise<boolean> {
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
    return response.ok;
  } catch (error) {
    return false;
  }
}

async function refreshAccessToken(request: NextRequest, refreshToken: string) {
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

function getRoleFromToken(token: string): string | null {
  try {
    const decodedToken = jwtDecode<JwtPayload>(token);
    return decodedToken.roles;
  } catch (error) {
    return null;
  }
}

function isAuthorized(pathname: string, role: string | null): boolean {
  const protectedPaths = [
    { path: '/color', roles: ['ADMIN', 'MANAGER'] },
    { path: '/type', roles: ['ADMIN', 'MANAGER'] },
    { path: '/manufacturer', roles: ['ADMIN', 'MANAGER'] },
    // Add more protected paths and roles here
  ];

  const protectedPath = protectedPaths.find((p) => pathname.startsWith(p.path));
  if (!protectedPath) return true; // Path is not protected

  return protectedPath.roles.includes(role || '');
}

export const config = {
  matcher: ['/', '/((?!api|_next|static|public|favicon.ico).*)'],
};
