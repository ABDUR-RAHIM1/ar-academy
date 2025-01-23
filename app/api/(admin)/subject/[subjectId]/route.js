import SubjectModel from "@/db/models/SubjectModel";
import { NextResponse } from "next/server";



export async function PUT(req, { params }) {

    const body = await req.json();
    const { subjectId } = await params;
    const { subjectName, username, description, coverPhoto } = body;

    try {

        const isUpdated = await SubjectModel.findByIdAndUpdate(subjectId, {
            $set: {
                subjectName,
                username,
                description,
                coverPhoto
            }
        }, { new: true, runValidators: true });

        if (!isUpdated) {
            return NextResponse.json()
        };


        return NextResponse.json({
            message: "Subject Updated"
        },
            { status: 200 }
        )

    } catch (error) {
        return NextResponse.json({
            message: "Failed To Update Subject",
        }, { status: 500 });
    }
};



export const DELETE = async (req, { params }) => {

    const { subjectId } = await params;
    try {

        const isDeleted = await SubjectModel.findByIdAndDelete(subjectId);

        if (!isDeleted) {
            return NextResponse.json({
                message: "Subject Not Found!"
            },
                { status: 404 }
            )
        };


        return NextResponse.json(
            { message: "Subject Deleted" },
            { status: 200 }
        )

    } catch (error) {
        return NextResponse.json({
            message: "Failed To Delete Subject",
        }, { status: 500 });
    }
}