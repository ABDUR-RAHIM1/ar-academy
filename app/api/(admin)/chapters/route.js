import { connectDb } from "@/db/ConnetcDb";
import ChaptersModel from "@/db/models/ChaptersModel";
import { NextResponse } from "next/server"

export const POST = async (req) => {
    const body = await req.json();

    const { chapter_name, identifier, contents, sub_categorie_id } = body;

    if (!chapter_name || !identifier || !contents || !sub_categorie_id) {
        return NextResponse.json({
            message: "All Field Are Required"
        }, { status: 400 })
    }

    try {
        await connectDb();

        const exist = await ChaptersModel.findOne({ identifier, chapter_name });

        if (exist) {
            return NextResponse.json({
                message: `Chapter with identifier: ${identifier} or chapter_name: ${chapter_name} is already created.`
            }, { status: 400 });
        };

        const newChapter = new ChaptersModel({
            chapter_name,
            identifier,
            contents,
            sub_categorie_id
        });


        const x = await newChapter.save();

        return NextResponse.json({
            message: "Chapter Created Successfully",
            data: x
        },
            { status: 201 }
        );

    } catch (error) {
        console.log(error)
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