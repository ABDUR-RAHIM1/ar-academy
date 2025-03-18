import { decodedToken } from "@/costomMiddlewere/decodedToken";
import { connectDb } from "@/db/ConnetcDb";
import ResultsModel from "@/db/models/results/resultsModel";
import { NextResponse } from "next/server";
import AccountModel from "@/db/models/account/accountModel";

export const POST = async (req) => {
    const body = await req.json();
    const { results, correctAns, wrongAns, skip, totalQuestions } = body;
    try {

        const accountInfo = await decodedToken()
        if (accountInfo.error) {
            return NextResponse.json({
                message: accountInfo.error,
                token: false
            }, { status: 400 })
        }

        await connectDb();

        const newResult = new ResultsModel({
            user: accountInfo.id,
            results,
            correctAns,
            wrongAns,
            skip,
            totalQuestions
        });

        await newResult.save();

        return NextResponse.json({
            message: "Question Submited succesfully"
        }, { status: 201 })

    } catch (error) {
        return NextResponse.json({
            message: "Failed to Submit Question paper",
            error: error,
            token: false
        }, { status: 500 })
    }
}


export const GET = async (req) => {
    try {

        await connectDb();

        const results = await ResultsModel.find().populate("user", "username email")
        return NextResponse.json(results, { status: 200 })

    } catch (error) { 
        return NextResponse.json({
            message: "Failed to Fetch Question paper",
            error: error,
            token: false
        }, { status: 500 })
    }
}