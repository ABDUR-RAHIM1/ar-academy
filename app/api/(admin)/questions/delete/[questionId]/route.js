import { connectDb } from "@/db/ConnetcDb";
import QuestionsModel from "@/db/models/questions/questionsModel";
import { NextResponse } from "next/server"

export const DELETE = async (req, { params }) => {
    const { questionId } = await params;
    try {

        await connectDb();

        const isDeleted = await QuestionsModel.findByIdAndDelete(questionId);

        if (!isDeleted) {
            return NextResponse.json({
                message: " Question Not found",
            }, { status: 404 })
        };


        return NextResponse.json({
            message: " Questions Deleted succesfully"
        }, { status: 200 })

    } catch (error) {
        return NextResponse.json({
            message: "Failed to Delete Questions",
            error: error
        }, { status: 500 })

    }
}