import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth"

export async function middleware(req:NextRequest){
    const session = await auth();
    const protectedRoute = req.nextUrl.pathname.startsWith("/dashboard");

    if(protectedRoute && !session?.user){
        return NextResponse.redirect(new URL("/login",req.url))
    }
    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        '/(api|trpc)(.*)',
        "/dashboard/:path*"
    ]
}