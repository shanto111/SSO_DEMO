import { NextResponse } from "next/server";

export function middleware(req) {
  const token =
    typeof window === "undefined" ? null : localStorage.getItem("token");
  const { pathname } = req.nextUrl;

  if (token && (pathname === "/login" || pathname === "/register")) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  const protectedPaths = ["/dashboard", "/reports"];
  if (!token && protectedPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/reports/:path*", "/login", "/register"],
};
