import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if accessing admin routes
  if (pathname.startsWith("/admin")) {
    // Check if admin is enabled via environment variable
    const adminEnabled = process.env.LH_PARTY_ADMIN_ENABLED === "true";

    if (!adminEnabled) {
      // Redirect to home if admin is not enabled
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
