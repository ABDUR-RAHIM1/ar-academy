import { connectDb } from "@/db/ConnetcDb"
import AccountModel from "@/db/models/account/accountModel"
import { NextResponse } from "next/server"

export const GET = async (req) => {
    try {

        await connectDb()
        const accounts = await AccountModel.find().select("-password");
        console.log(accounts)
        return NextResponse.json(accounts)

    } catch (error) {
        return NextResponse.json({
            message: "Failed to fetch Users",
            error: error
        })
    }
}