"use server"

import { getCurrentUser } from "@/utils/auth";
import { NextRequest, NextResponse } from "next/server";

const SIGN_IN_URL = "/auth/sign-in";
const DASHBOARD_URL = "/";


export async function proxy(request: NextRequest) {
    const { access, refresh } = await getCurrentUser();
    // console.log("refresh", refresh, access);
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