
import { connectDb } from "@/db/ConnetcDb";
import SubCategories from "@/db/models/Sub_categorieModel";
import { NextResponse } from "next/server";

export async function POST(req) {
    const body = await req.json();
    const  { sub_name, identifier, categorieId } = body;
    
    // Validate inputs
    if (!sub_name || !identifier || !categorieId) {
        return NextResponse.json({
            message: "All Fields Are Required!",
        }, { status: 400 });
    }

    try {
        await connectDb();

        //  < ======== Validation =========>

        const exists = await SubCategories.findOne({ identifier })

        if (exists) {
            return NextResponse.json({
                message: `${identifier} Already Created!`
            },
                { status: 400 }
            )
        }

        //  < ======== Validation =========>


        // [ ===== Create new subject ======]
        const newSubject = SubCategories({
            sub_name,
            identifier,
            categorieId
        });
        // [ ===== Create new subject ======]

        // [ =====  Save subject to database ====== ]
        await newSubject.save();

        return NextResponse.json({
            message: "Created Successfully"
        }, { status: 201 });

    } catch (error) {
        console.log(error)
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

