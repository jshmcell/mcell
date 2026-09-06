import { getSessionCookie } from "better-auth/cookies";
import { NextResponse, type NextRequest } from "next/server";

import {
  LOCALE_COOKIE,
  LOCALE_HEADER,
  stripLocalePrefix,
  type Locale,
} from "@/i18n/config";

// Optimistic session check only — real authorization lives in server
// components / actions (per Next.js 16 auth guide). Presence of the session
// cookie bounces logged-in users away from the auth pages.
const AUTH_PAGES = [
  "/login",
  "/signup",
  "/find-account",
  "/find-account/reset",
];

const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

function prefersEnglish(acceptLanguage: string | null): boolean {
  if (!acceptLanguage) return false;
  const primary = acceptLanguage.split(",")[0]?.split(";")[0]?.trim().toLowerCase();
  return primary === "en" || !!primary?.startsWith("en-");
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isEnPath = pathname === "/en" || pathname.startsWith("/en/");
  const locale: Locale = isEnPath ? "en" : "ko";
  // Canonical in-app path without the locale prefix.
  const path = isEnPath ? stripLocalePrefix(pathname) : pathname;

  // Root-only first-visit handling: cookie or Accept-Language may lift "/" to "/en".
  // Scoped to "/" so explicit URLs always win (and the KR switcher can't loop).
  if (!isEnPath && path === "/") {
    const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
    if (cookieLocale === "en") {
      const url = request.nextUrl.clone();
      url.pathname = "/en";
      const res = NextResponse.redirect(url);
      res.cookies.set(LOCALE_COOKIE, "en", {
        path: "/",
        maxAge: COOKIE_MAX_AGE,
      });
      return res;
    }
    if (
      !request.cookies.has(LOCALE_COOKIE) &&
      prefersEnglish(request.headers.get("accept-language"))
    ) {
      const url = request.nextUrl.clone();
      url.pathname = "/en";
      const res = NextResponse.redirect(url);
      res.cookies.set(LOCALE_COOKIE, "en", {
        path: "/",
        maxAge: COOKIE_MAX_AGE,
      });
      return res;
    }
  }

  // Auth-page bounce works for both locales (checked against the stripped path).
  if (
    AUTH_PAGES.includes(path) ||
    AUTH_PAGES.some((a) => path.startsWith(`${a}/`))
  ) {
    const sessionCookie = getSessionCookie(request, {
      cookiePrefix: "mcell",
    });
    if (sessionCookie) {
      const url = request.nextUrl.clone();
      url.pathname = locale === "en" ? "/en" : "/";
      url.search = "";
      return NextResponse.redirect(url);
    }
  }

  // Serve /en/* from the single route tree via rewrite; the locale travels
  // in a header (primary) + cookie (fallback for server components).
  // NOTE: locale 헤더는 반드시 *요청* 헤더로 주입해야 서버 컴포넌트가 읽을 수 있다.
  // (res.headers 에 설정하면 응답 헤더일 뿐, ko 분기에서는 헤더가 사라져
  //  쿠키 폴백으로 잘못된 언어가 렌더링된다.)
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(LOCALE_HEADER, locale);

  if (isEnPath) {
    const url = request.nextUrl.clone();
    url.pathname = path;
    const res = NextResponse.rewrite(url, { request: { headers: requestHeaders } });
    res.headers.set(LOCALE_HEADER, "en");
    res.cookies.set(LOCALE_COOKIE, "en", {
      path: "/",
      maxAge: COOKIE_MAX_AGE,
    });
    return res;
  }

  const res = NextResponse.next({ request: { headers: requestHeaders } });
  res.headers.set(LOCALE_HEADER, "ko");
  return res;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|assets|.*\\..*).*)"],
};
