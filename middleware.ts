import { auth } from "@/auth"
import { NextRequest, NextResponse } from "next/server";

const PRIVATE_ROUTES = ['/dashboard','/dashboard/chats','/dashboard/my-streams','/dashboard/analytics','/dashboard/keys','/dashboard/settings','/dashboard/community'];
const AUTHENTICATION_ROUTES = ['/login','/sign-up','/username'];

export async function middleware(req:NextRequest) {
    const session = await auth();
    const pathname = req.nextUrl.pathname

    const isPrivateRoute = PRIVATE_ROUTES.includes(pathname);
    if(!session?.user && isPrivateRoute) {
        return NextResponse.redirect(new URL('/login',req.url))
    }

    const authenticatedRoutes = AUTHENTICATION_ROUTES.includes(pathname)
    if(session?.user && authenticatedRoutes) {
        return NextResponse.redirect(new URL('/dashboard',req.url))
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*','/login','/sign-up','/username']
}