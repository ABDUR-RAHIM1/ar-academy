import { connectDb } from "@/db/ConnetcDb";
import CategorieModel from "@/db/models/CategoriesModel";
import { createSlug } from "@/helpers/createSlug";
import { NextResponse } from "next/server"

export const PUT = async (req, { params }) => {
    const { categorieId } = await params;
    const body = await req.json();
    const { position, categorie, description } = body;

    const slug = createSlug(categorie);


    try {

        if (!categorieId) {
            return NextResponse.json({
                message: "Categories Id is Required"
            }, { status: 404 })
        }

        const updatedData = {
            position,
            categorie,
            identifier: slug,
            description
        }

        await connectDb()
        const updated = await CategorieModel.findByIdAndUpdate(categorieId, {
            $set: updatedData
        }, { new: true });

        if (!updated) {
            return NextResponse.json({
                message: "Categories Not Found"
            }, { status: 404 })
        };

        return NextResponse.json({
            message: "Succesfully Updated"
        }, { status: 200 })

    } catch (error) {
        return NextResponse.json({
            message: "Failed To Update"
        },
            {
                status: 500
            }
        )
    }
};


export const DELETE = async (req, { params }) => {
    const { categorieId } = await params;

    try {

        if (!categorieId) {
            return NextResponse.json({
                message: "Categories Id is Required"
            }, { status: 404 })
        }

        await connectDb()
        const deleted = await CategorieModel.findByIdAndDelete(categorieId);

        if (!deleted) {
            return NextResponse.json({
                message: "Categories Not Found"
            }, { status: 404 })
        };

        return NextResponse.json({
            message: "Succesfully Delete"
        }, { status: 200 })

    } catch (error) {
        return NextResponse.json({
            message: "Failed To Delete"
        },
            {
                status: 500
            }
        )
    }
}