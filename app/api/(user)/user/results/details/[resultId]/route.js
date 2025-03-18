import AccountModel from "@/db/models/account/accountModel";
import ResultsModel from "@/db/models/results/resultsModel";
import { NextResponse } from "next/server"

export const GET = async (req, { params }) => {
    const { resultId } = await params;
    try {

        const result = await ResultsModel.findById(resultId).populate("user", "username email")

        return NextResponse.json(result, { status: 200 })

    } catch (error) {
        return NextResponse.json({
            message: "Failed to Fetch Question paper",
            error: error,
            token: false
        }, { status: 500 })
    }
}