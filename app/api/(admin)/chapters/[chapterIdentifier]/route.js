import { connectDb } from "@/db/ConnetcDb";
import ChaptersModel from "@/db/models/ChaptersModel";
import SubCategories from "@/db/models/Sub_categorieModel";
import { NextResponse } from "next/server";

//  get Chapter By _Id
export const GET = async (req, { params }) => {
    const { chapterIdentifier } = await params;

    if (!chapterIdentifier) {
        return NextResponse.json({
            message: "Chapter Identifier Missing!"
        }, { status: 404 })
    }

    try {
        await connectDb()

        const subCategorie = await SubCategories.findOne({
            identifier: { $regex: `^${chapterIdentifier}$`, $options: "i" },
        });

        if (!subCategorie) {
            return NextResponse.json({
                message: "Sub Categorie Not Found!"
            }, { status: 404 })
        };

        const sub_id = subCategorie._id;

        const chapters = await ChaptersModel.find({ sub_categorie_id: sub_id }).select("-contents")

        return NextResponse.json(chapters, { status: 200 })
    } catch (error) {
        return NextResponse.json({
            message: "Chapter Fetch Failed"
        },
            { status: 500 }
        )
    }
}