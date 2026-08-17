// middleware.ts

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const authRoutes = [
  "/login",
  "/signup",
  "/forgot-password",
];

const protectedRoutes = [
  "/profile",
  "/checkout",
  "/orders",
];


function matchesRoute(
  pathname: string,
  routes: string[],
) {
  return routes.some(
    (route) =>
      pathname === route ||
      pathname.startsWith(`${route}/`),
  );
}


export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;


  const token =
    request.cookies.get("accessToken")?.value;


  const isAuthenticated = Boolean(token);


  // کاربر لاگین است ولی می‌رود login/register
  if (
    isAuthenticated &&
    matchesRoute(pathname, authRoutes)
  ) {
    return NextResponse.redirect(
      new URL("/", request.url),
    );
  }


  // کاربر مهمان وارد صفحات خصوصی شده
  if (
    !isAuthenticated &&
    matchesRoute(pathname, protectedRoutes)
  ) {
    return NextResponse.redirect(
      new URL("/login", request.url),
    );
  }


  return NextResponse.next();
}


export const config = {
  matcher: [
    "/profile/:path*",
    "/checkout/:path*",
    "/orders/:path*",
    "/login",
    "/signup",
    "/forgot-password",
  ],
};