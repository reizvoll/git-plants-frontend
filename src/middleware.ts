import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // API proxy handling: all /api/* requests except /api/mypage are proxied to the backend
  if (pathname.startsWith("/api/")) {
    // /api/mypage is handled by Next.js API Route
    if (pathname.startsWith("/api/mypage")) {
      return NextResponse.next();
    }

    // Proxy all other /api/* requests to the backend
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const url = new URL(pathname + request.nextUrl.search, apiUrl);
    return NextResponse.rewrite(url);
  }

  // pass through i18n query parameters to the backend
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-search", request.nextUrl.search);

  return NextResponse.next({
    request: {
      headers: requestHeaders
    }
  });
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)"
  ]
};
