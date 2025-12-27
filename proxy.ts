"use server"
import { getCurrentUser } from "@/utils/auth";
import { NextRequest, NextResponse } from "next/server";


const SIGN_IN_URL = "/auth/sign-in";
const DASHBOARD_URL = "/";


export async function proxy(request: NextRequest) {
    const { refresh } = await getCurrentUser();
    const { pathname } = request.nextUrl;

    const isAuthPage = pathname.startsWith("/auth");

    if (refresh && isAuthPage) {
        return NextResponse.redirect(new URL(DASHBOARD_URL, request.url));
    }

    if (!refresh && !isAuthPage) {
        return NextResponse.redirect(new URL(SIGN_IN_URL, request.url));
    }

    return NextResponse.next();
}


export const config = {
    matcher: [
        "/", 
        "/users", 
        "/subscription", 
        "/notifications", 
        "/settings", 
        "/settings/personal-information", 
        "/settings/change-password", 
        "/settings/privacy-policy", 
        "/settings/privacy-policy/edit-terms-conditions",
        "/auth/:path*"
    ]
};