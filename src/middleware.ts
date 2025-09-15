import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // i18n에서 필요한 쿼리 파라미터만 헤더에 전달
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
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)"
  ]
};
