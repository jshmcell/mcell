import { getSessionCookie } from "better-auth/cookies";
import { NextResponse, type NextRequest } from "next/server";

// Optimistic session check only — real authorization lives in server
// components / actions (per Next.js 16 auth guide). Presence of the session
// cookie bounces logged-in users away from the auth pages.
const AUTH_PAGES = [
  "/login",
  "/signup",
  "/find-account",
  "/find-account/reset",
];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (!AUTH_PAGES.includes(pathname)) {
    return NextResponse.next();
  }
  const sessionCookie = getSessionCookie(request, {
    cookiePrefix: "mcell",
  });
  if (sessionCookie) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/signup", "/find-account", "/find-account/reset"],
};
