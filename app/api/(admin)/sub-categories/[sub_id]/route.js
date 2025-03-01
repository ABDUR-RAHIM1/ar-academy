import SubCategories from "@/db/models/Sub_categorieModel";
import { createSlug } from "@/helpers/createSlug";
import { NextResponse } from "next/server";



export async function PUT(req, { params }) {

    const body = await req.json();
    const { sub_id } = await params;
    const { sub_name, description, type, coverPhoto } = body;

    const slug = createSlug(sub_name);

    const updatedBody = {
        sub_name,
        identifier: slug,
        description,
        type,
        coverPhoto
    }

    try {

        const isUpdated = await SubCategories.findByIdAndUpdate(sub_id, {
            $set: updatedBody
        }, { new: true, runValidators: true });

        if (!isUpdated) {
            return NextResponse.json()
        };


        return NextResponse.json({
            message: "Updated"
        },
            { status: 200 }
        )

    } catch (error) {
        return NextResponse.json({
            message: "Failed To Update",
        }, { status: 500 });
    }
};



export const DELETE = async (req, { params }) => {

    const { sub_id } = await params;
    try {

        const isDeleted = await SubCategories.findByIdAndDelete(sub_id);

        if (!isDeleted) {
            return NextResponse.json({
                message: "Not Found!"
            },
                { status: 404 }
            )
        };


        return NextResponse.json(
            { message: "Deleted" },
            { status: 200 }
        )

    } catch (error) {
        return NextResponse.json({
            message: "Failed To Delete",
        }, { status: 500 });
    }
}