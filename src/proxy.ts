"use server"

import { getCurrentUser, removeToken } from "@/utils/auth";
import { NextRequest, NextResponse } from "next/server";

const SIGN_IN_URL = "/auth/sign-in";
const DASHBOARD_URL = "/";

// Function to check if JWT token is expired
function isTokenExpired(token: string): boolean {
    try {
        const parts = token.split('.');
        if (parts.length !== 3) return true;
        
        const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString());
        const exp = payload.exp;
        
        if (!exp) return false;
        return Date.now() >= exp * 1000;
    } catch (error) {
        return true;
    }
}

export async function proxy(request: NextRequest) {
    const { access, refresh } = await getCurrentUser();
    const { pathname } = request.nextUrl;
    const isAuthPage = pathname.startsWith("/auth");

    // Check if refresh token exists and is not expired
    if (refresh && isTokenExpired(refresh)) {
        // Token is expired - logout immediately
        await removeToken();
        return NextResponse.redirect(new URL(SIGN_IN_URL, request.url));
    }

    // If refresh token exists but is on auth page, redirect to dashboard
    if (refresh && isAuthPage) {
        return NextResponse.redirect(new URL(DASHBOARD_URL, request.url));
    }

    // If no refresh token and not on auth page, redirect to sign-in
    if (!refresh && !isAuthPage) {
        return NextResponse.redirect(new URL(SIGN_IN_URL, request.url));
    }

    return NextResponse.next();
}


export const config = {
    matcher: [
        "/",
        "/auth/:path*",
        '/users',
        "/ai-translation",
        "/ai-translation/:path*",
        "/manage-translation",
        "/manage-translation/:path*",
        "/upload-dataset",
        "/upload-dataset/add-translation",
        "/upload-dataset/add-category",
        "/upload-dataset/:path*",
        "/settings",
        "/settings/change-password",
        '/settings/terms-and-service',
        "/settings/privacy-and-policy",
        "/settings/about"
    ]
};