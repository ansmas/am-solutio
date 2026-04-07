import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

const PRO_ROUTES = ["/passwords", "/projects"];
const PREMIUM_ROUTES: string[] = [];

export default auth((req) => {
     const { pathname } = req.nextUrl;
     const plan = (req.auth?.user as any)?.plan ?? "free";

     const isAuthenticated = !!req.auth;

     if(!isAuthenticated && pathname !== "/login" && pathname !== "/register") {
          return NextResponse.redirect(new URL("/login", req.url));
     }

     if(PRO_ROUTES.some((r) => pathname.startsWith(r)) && plan === "free") {
          return NextResponse.redirect(new URL("/pricing", req.url));
     }

     if(PRO_ROUTES.some((r) => pathname.startsWith(r)) && plan === "premium") {
          return NextResponse.redirect(new URL("/pricing", req.url));
     }

     return NextResponse.next();
});

export const config = {
     matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};