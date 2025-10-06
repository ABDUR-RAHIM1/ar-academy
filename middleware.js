import { NextResponse } from 'next/server';

export function middleware(req) {
    try {
        const userToken = req.cookies.get('onushilon_academy_session')?.value;
        const subAdminToken = req.cookies.get('onushilon_academy_sub_session')?.value;
        const adminToken = req.cookies.get('onushilon_access')?.value;

        const { pathname } = req.nextUrl;

        // User token না থাকলে /profile এর যেকোনো route এ গেলে login page এ redirect
        if (!userToken && pathname.startsWith('/profile')) {
            return NextResponse.redirect(new URL('/account/student/login', req.url));
        }

        // subAdmin token না থাকলে /subAdmin এর যেকোনো route এ গেলে login page এ redirect
        if (!subAdminToken && pathname.startsWith('/subAdmin')) {
            return NextResponse.redirect(new URL('/account/subAdmin/login', req.url));
        }

        // Admin token না থাকলে /dashboard এর যেকোনো route এ গেলে admin login page এ redirect
        if (!adminToken && pathname.startsWith('/dashboard')) {
            return NextResponse.redirect(new URL('/auth-admin', req.url));
        }

    } catch (error) {
        // error হলে default redirect to login
        return NextResponse.redirect(new URL('/account/login', req.url));
    }
}

export const config = {
    matcher: [
        "/profile/:path*",
        "/subAdmin/:path*",
        "/dashboard/:path*",
    ],
};
