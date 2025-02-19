
import { connectDb } from "@/db/ConnetcDb";
import SubCategories from "@/db/models/Sub_categorieModel";
import { createSlug } from "@/helpers/createSlug";
import { NextResponse } from "next/server";

export async function POST(req) {
    const body = await req.json();
    const { sub_name, description, categorieId, coverPhoto } = body;


    // Validate inputs
    if (!sub_name || !categorieId) {
        return NextResponse.json({
            message: "All Fields Are Required!",
        }, { status: 400 });
    }

    const slug = createSlug(sub_name)

    try {
        await connectDb();

        //  < ======== Validation =========>

        const exists = await SubCategories.findOne({ identifier: slug })

        if (exists) {
            return NextResponse.json({
                message: `${slug} Already Created!`
            },
                { status: 400 }
            )
        }

        //  < ======== Validation =========>


        // [ ===== Create new subject ======]
        const newSubject = SubCategories({
            sub_name,
            identifier: slug,
            description,
            categorieId,
            coverPhoto
        });
        // [ ===== Create new subject ======]

        // [ =====  Save subject to database ====== ]
        await newSubject.save();

        return NextResponse.json({
            message: "Created Successfully"
        }, { status: 201 });

    } catch (error) {
        return NextResponse.json({
            message: "Failed To Post",
        }, { status: 500 });
    }
};


// get all
export async function GET(req) {
    try {

        await connectDb();

        const sub_categories = await SubCategories.find()

        return NextResponse.json(sub_categories, { status: 200 })

    } catch (error) {
        return NextResponse.json({
            message: "Failed To Fetch ",
        }, { status: 500 });
    }
}

