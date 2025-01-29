import { connectDb } from "@/db/ConnetcDb";
import ChaptersModel from "@/db/models/ChaptersModel";
import SubCategories from "@/db/models/Sub_categorieModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

//  get Chapter By Identifier then find By _id without content (only chapter name,  decription)
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



export const PUT = async (req, { params }) => {
    const { chapterIdentifier } = await params;

    const body = await req.json();
    const chapterId = chapterIdentifier;

    // chapterId সঠিকভাবে প্রাপ্ত না হলে error মেসেজ
    if (!chapterId || chapterId === 'undefined') {
        return NextResponse.json({ message: "Invalid chapterId" }, { status: 400 });
    }

    // _id ছাড়া বাকি ফিল্ড গুলির আপডেট করার জন্য filter
    const { _id, ...updateData } = body;

    // আপডেট করার আগে check
    if (Object.keys(updateData).length === 0) {
        return NextResponse.json({
            message: "No fields to update"
        }, { status: 400 });
    }

    try {

        const isUpdate = await ChaptersModel.findByIdAndUpdate(chapterId, {
            $set: updateData  // _id ছাড়া বাকি ফিল্ড গুলি আপডেট হবে
        }, { new: true });


        if (!isUpdate) {
            return NextResponse.json({
                message: "Chapter not found!"
            }, { status: 404 });
        }

        return NextResponse.json({
            message: "Chapter Updated Successfully"
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json({
            message: "Chapter Update Failed"
        }, { status: 500 });
    }
};


// delete Chapters
export const DELETE = async (req, { params }) => {
    const { chapterIdentifier } = await params;

    const chapterId = chapterIdentifier;

    // chapterId সঠিকভাবে প্রাপ্ত না হলে error মেসেজ
    if (!chapterId || chapterId === 'undefined') {
        return NextResponse.json({ message: "Invalid chapterId" }, { status: 400 });
    }

    try {

        const isDelete = await ChaptersModel.findByIdAndDelete(chapterId);

        if (!isDelete) {
            return NextResponse.json({
                message: "Chapter not found!"
            }, { status: 404 });
        }

        return NextResponse.json({
            message: "Chapter Deleted Successfully"
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json({
            message: "Chapter Delete Failed"
        }, { status: 500 });
    }
};
