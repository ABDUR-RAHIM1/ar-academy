import { decodedToken } from "@/costomMiddlewere/decodedToken"
import { cookies } from "next/headers";
import { NextResponse } from "next/server"

export const GET = async (req) => {
    try {
        const cookieStore = await cookies()
        const getToken = cookieStore.get('ar_academy_token');
        const token = getToken?.value;
        const user = await decodedToken();
        console.log(11, token)
        return NextResponse.json({
            user : token
        }, { status: 200 })

    } catch (error) {
        return NextResponse.json({
            message: "Failed to Submit Question paper",
            error: error,
            token: false
        }, { status: 500 })
    }
}