import { connectDb } from "@/db/ConnetcDb"
import UserModel from "@/db/models/users/userModel"
import { NextResponse } from "next/server"

export const GET = async (req) => {
    try {

        await connectDb()
        const users = await UserModel.find().select("-password");
        return NextResponse.json(users)

    } catch (error) {
        return NextResponse.json({
            message: "Failed to fetch Users",
            error: error
        })
    }
}