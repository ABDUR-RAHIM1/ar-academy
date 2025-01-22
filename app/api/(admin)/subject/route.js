
import { connectDb } from "@/db/ConnetcDb";
import SubjectModel from "@/db/models/SubjectModel";
import { NextResponse } from "next/server";

export async function POST(req) {
    const { name, description, coverPhoto } = await req.json();

    // Validate inputs
    if (!name || !description || !coverPhoto) {
        return NextResponse.json({
            message: "All Fields Are Required!",
        }, { status: 400 });
    }

    try {
        await connectDb();

        //  < ======== Validation =========>

        const exists = await SubjectModel.findOne({ name: name })

        if (exists) {
            return NextResponse.json({
                message: `${name} Already Created!`
            },
                { status: 400 }
            )
        }

        //  < ======== Validation =========>


        // [ ===== Create new subject ======]
        const newSubject = SubjectModel({
            name,
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


export async function PUT(req) {

    const { subjectId, name, description } = await req.json();
    try {

        const isUpdated = await SubjectModel.findByIdAndUpdate(subjectId, {
            $set: {
                name,
                description
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


export async function DELETE(req) {
    const { subjectId } = await req.json()
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