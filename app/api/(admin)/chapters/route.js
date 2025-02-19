import { connectDb } from "@/db/ConnetcDb";
import ChaptersModel from "@/db/models/ChaptersModel";
import { createSlug } from "@/helpers/createSlug";
import { NextResponse } from "next/server"

export const POST = async (req) => {
    const body = await req.json();

    const { chapter_name, contents, sub_categorie_id, type } = body;

    if (!chapter_name || !contents || !sub_categorie_id || !type) {
        return NextResponse.json({
            message: "All Field Are Required"
        }, { status: 400 })
    }

    const slug = createSlug(chapter_name)

    try {
        await connectDb();

        const exist = await ChaptersModel.findOne({ identifier: slug });

        if (exist) {
            return NextResponse.json({
                message: `${chapter_name} is already created.`
            }, { status: 400 });
        };

        const newChapter = new ChaptersModel({
            chapter_name,
            identifier: slug,
            contents,
            sub_categorie_id,
            type
        });
 

         await newChapter.save();

        return NextResponse.json({
            message: "Chapter Created Successfully", 
        },
            { status: 201 }
        );

    } catch (error) {
        return NextResponse.json({
            message: "Chapter Creation Failed."
        },
            { status: 500 }
        );
    }
};



//  without content
export const GET = async (req) => {
    try {
        await connectDb()
        const chapters = await ChaptersModel.find().select("-contents");
        return NextResponse.json(chapters, { status: 200 })
    } catch (error) {
        return NextResponse.json({
            message: "Chapter Created Failed"
        },
            { status: 500 }
        )
    }
}