
import { connectDb } from "@/db/ConnetcDb";
import SubjectModel from "@/db/models/SubjectModel";
import { NextResponse } from "next/server";

export async function POST(req) {
    const { subjectName, username, description, coverPhoto } = await req.json();

    // Validate inputs
    if (!subjectName || !username || !description || !coverPhoto) {
        return NextResponse.json({
            message: "All Fields Are Required!",
        }, { status: 400 });
    }

    try {
        await connectDb();

        //  < ======== Validation =========>

        const exists = await SubjectModel.findOne({ subjectName: subjectName })

        if (exists) {
            return NextResponse.json({
                message: `${subjectName} Already Created!`
            },
                { status: 400 }
            )
        }

        //  < ======== Validation =========>


        // [ ===== Create new subject ======]
        const newSubject = SubjectModel({
            subjectName,
            username,
            description,
            coverPhoto
        });
        // [ ===== Create new subject ======]

        // [ =====  Save subject to database ====== ]
        await newSubject.save();

        return NextResponse.json({
            message: "Subject Created Successfully"
        }, { status: 201 });

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            message: "Failed To Post Subject",
        }, { status: 500 });
    }
};

export async function GET(req) {
    try {

        await connectDb();

        const subjects = await SubjectModel.find()

        return NextResponse.json(subjects, { status: 200 })

    } catch (error) {
        return NextResponse.json({
            message: "Failed To Fetch Subjects",
        }, { status: 500 });
    }
}
