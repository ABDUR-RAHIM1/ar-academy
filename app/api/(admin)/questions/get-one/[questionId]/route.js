import { connectDb } from "@/db/ConnetcDb";
import QuestionsModel from "@/db/models/questions/questionsModel";
import { NextResponse } from "next/server"
import SubjectModel from "@/db/models/Sub_categorieModel";

export const GET = async (req, { params }) => {
    const { questionId } = await params;
    try {

        await connectDb()
        const questions = await QuestionsModel.findById(questionId)
            .populate("sub_categorie", "sub_name identifier type")

        return NextResponse.json(questions)

    } catch (error) {
        return NextResponse.json({
            message: "Failed to fetch Questions",
            error: error
        })
    }
}