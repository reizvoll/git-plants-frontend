import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // URL 쿼리 파라미터에서 언어 감지 (?locale=ko)
  const localeParam = request.nextUrl.searchParams.get("locale");
  const locale = (localeParam === "ko" || localeParam === "en") ? localeParam : "en";

  // next-intl이 사용할 헤더 설정
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-next-intl-locale", locale);
  requestHeaders.set("x-search", request.nextUrl.search);

  console.log("Middleware - URL:", request.nextUrl.href);
  console.log("Middleware - locale param:", localeParam);
  console.log("Middleware - final locale:", locale);

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
