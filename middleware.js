import { NextResponse } from 'next/server';
import { decodeToken } from './middlewere/decodedToken';

export async function middleware(req) {

    try {
        // **Get Token from Cookies**
        const token = req.cookies.get('ar_academy_token')?.value;
        // console.log(9, token)
        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // const userInfo = await DecoedToken(token);
        const userInfo = await decodeToken(token);
        
        // Store decoded user info as custom header to pass it forward
        const response = NextResponse.next();
        response.headers.set('x-user-info', JSON.stringify(userInfo));

        return response


    } catch (error) {
        console.log(23, error)
        return NextResponse.json({ error: `Invalid Token : ${error}` }, { status: 403 });
    }
}

// **Middleware Apply on Specific Routes**
export const config = {
    matcher: ["/profile", "/dashboard"],
};
