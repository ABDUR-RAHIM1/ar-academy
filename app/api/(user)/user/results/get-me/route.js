// import { decodedToken } from "@/costomMiddlewere/decodedToken"; 
import { connectDb } from "@/db/ConnetcDb";
import ResultsModel from "@/db/models/results/resultsModel";
import { decodeToken } from "@/middleware";
import { NextResponse } from "next/server"


//  nirdistha user er result get korbe
export const GET = async (req) => {
    try {
        // const accountInfo = await decodedToken();
        const accountInfo = await decodeToken(req)
    
        if (accountInfo.error) {
            return NextResponse.json({
                message: accountInfo.error,
                token: false
            }, { status: 400 })
        }

        await connectDb();

        const myResults = await ResultsModel.find();

        return NextResponse.json(myResults, { status: 200 });


    } catch (error) {
        return NextResponse.json({
            message: "Failed to Submit Question paper",
            error: error,
            token: false
        }, { status: 500 })
    }
}