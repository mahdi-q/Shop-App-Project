import { NextResponse } from "next/server";
import middlewareAuth from "./utils/middlewareAuth";

export async function middleware(req) {
  const url = req.url;
  const { pathname } = req.nextUrl;

  const user = await middlewareAuth(req);

  if (
    !pathname.startsWith("/complete-profile") &&
    !pathname.startsWith("/auth")
  ) {
    if (user && !user.isActive)
      return NextResponse.redirect(new URL("/complete-profile", url));
  }

  if (pathname.startsWith("/admin")) {
    if (!user) return NextResponse.redirect(new URL("/auth", url));
    if (user && user.role !== "ADMIN")
      return NextResponse.redirect(new URL("/", url));
  }

  if (pathname.startsWith("/profile")) {
    if (!user) return NextResponse.redirect(new URL("/auth", url));
  }

  if (pathname.startsWith("/complete-profile")) {
    if (!user) return NextResponse.redirect(new URL("/auth", url));
    if (user && user.isActive) return NextResponse.redirect(new URL("/", url));
  }

  if (pathname.startsWith("/auth")) {
    if (user) return NextResponse.redirect(new URL("/", url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin:path*",
    "/profile:path*",
    "/complete-profile",
    "/auth",
    "/",
  ],
};
