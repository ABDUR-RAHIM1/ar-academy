import SubCategories from "@/db/models/Sub_categorieModel";
import { NextResponse } from "next/server";



export async function PUT(req, { params }) {

    const body = await req.json();
    const { sub_id } = await params;
    const { sub_name, identifier } = body;

    try {

        const isUpdated = await SubCategories.findByIdAndUpdate(sub_id, {
            $set: {
                sub_name,
                identifier,
            }
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