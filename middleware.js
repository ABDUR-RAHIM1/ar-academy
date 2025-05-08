import { NextResponse } from 'next/server';

export async function middleware(req) {

    try {
        // **Get Token from Cookies**
        const token = req.cookies.get('ar_academy_session')?.value;
      
        if (!token) {

            if (req.nextUrl.pathname.startsWith('/profile') || req.nextUrl.pathname.startsWith('/dashboard')) {
                return NextResponse.redirect(new URL('/account/login', req.url));
            }

            if (req.nextUrl.pathname.startsWith('/api')) {
                return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
            }
        }

    } catch (error) { 
        return NextResponse.redirect(new URL('/account/login', req.url));
    }
}

// **Middleware Apply on Specific Routes**
export const config = {
    matcher: [
        //  client
        "/profile/:path*",
        // "/dashboard",

        //  api 

        // "/api/test",
        "/api/user/results/get-me"

    ],
};
