import { connectDb } from "@/db/ConnetcDb";
import QuestionsModel from "@/db/models/questions/questionsModel";
import SubjectModel from "@/db/models/Sub_categorieModel";
import { NextResponse } from "next/server"

// post questions for admin
export const POST = async (req) => {
    const body = await req.json();
    //  subCategoire mean subject
    const { sub_categorie, questions } = body;

    try {

        await connectDb();

        const newQuestions = await QuestionsModel({
            sub_categorie,
            questions
        });

        await newQuestions.save();

        return NextResponse.json({
            message: "Questions added Succesfully"
        }, { status: 201 })


    } catch (error) {
        return NextResponse.json({
            message: "Failed to Post Questions",
            error: error
        }, { status: 500 })
    }
};



// post questions for admin and user
export const GET = async (req) => {

    try {

        await connectDb();

        const questions = await QuestionsModel.find()
            .sort({ createdAt: -1 })
            .populate("sub_categorie", "sub_name identifier type")

        return NextResponse.json(questions, { status: 200 })


    } catch (error) {
        return NextResponse.json({
            message: "Failed to Fetch Questions",
            error: error
        }, { status: 500 })
    }
}