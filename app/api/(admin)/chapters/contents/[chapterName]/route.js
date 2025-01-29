import { connectDb } from "@/db/ConnetcDb";
import ChaptersModel from "@/db/models/ChaptersModel";
import { NextResponse } from "next/server";

//  get Chapter By Sub Categorie Identifier then find By _id
export const GET = async (req, { params }) => {
    const { chapterName } = await params;

    if (!chapterName) {
        return NextResponse.json({
            message: "Chapter Name Missing!"
        }, { status: 404 })
    }

    try {
        await connectDb()

        const chapters = await ChaptersModel.findOne({
            identifier: { $regex: `^${chapterName}$`, $options: "i" },
        })

        return NextResponse.json(chapters, { status: 200 })
    } catch (error) {
        return NextResponse.json({
            message: "Chapter Fetch Failed"
        },
            { status: 500 }
        )
    }
};

