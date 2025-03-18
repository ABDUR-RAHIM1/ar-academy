import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const GET = async (req) => {
    const cookieStore = await cookies()
    const getToken = cookieStore.get('ar_academy_token');
    const token = getToken?.value;

    try {
        if (!token) {
            return NextResponse.json({
                message: "Token not found",
                token: null
            }, { status: 400 })
        };

        return NextResponse.json({
            message: "Auhtorized",
            token: token
        }, { status: 200 })
    } catch (error) {
        return NextResponse.json({
            message: "Failed to fetch Token",
            token: null
        }, { status: 500 })
    }

}