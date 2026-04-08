import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import type { NextRequest } from "next/server";

type AuthenticatedRequest = NextRequest & {
  auth: {
    user?: {
      id: string;
      plan?: string;
    };
  } | null;
};

const PRO_ROUTES = ["/passwords", "/projects"];

export default auth((req: AuthenticatedRequest) => {
  const { pathname } = req.nextUrl;
  const plan = req.auth?.user?.plan ?? "free";

  const isAuthenticated = !!req.auth;

  if (!isAuthenticated && pathname !== "/login" && pathname !== "/register") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (PRO_ROUTES.some((r) => pathname.startsWith(r)) && plan === "free") {
    return NextResponse.redirect(new URL("/pricing", req.url));
  }

  return NextResponse.next();
});