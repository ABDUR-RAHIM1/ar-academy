import { connectDb } from "@/db/ConnetcDb";
import CategorieModel from "@/db/models/CategoriesModel";
import { createSlug } from "@/helpers/createSlug";
import { NextResponse } from "next/server"

export const POST = async (req) => {
    const body = await req.json();
    const { position, categorie, description } = body

    const slug = createSlug(categorie);

    try {
        await connectDb()
        const exist = await CategorieModel.findOne({ identifier: slug });

        if (exist) {
            return NextResponse.json({
                message: `${slug} Already Created!`
            }, { status: 400 })
        }

        const newCategorie = CategorieModel({
            position,
            categorie,
            identifier: slug,
            description
        });

        await newCategorie.save();

        return NextResponse.json({
            message: "Succesfully Created"
        },
            { status: 201 }
        )

    } catch (error) {
        return NextResponse.json({
            message: "Failed To Post Categporie",
            error: error?.message
        },
            { status: 500 }
        )
    }
};

export const GET = async (req) => {
    try {
        await connectDb()
        const categories = await CategorieModel.find()
            .sort({ position: 1, _id: 1 });
 

        return NextResponse.json(categories, { status: 200 })


    } catch (error) {
        return NextResponse.json({
            message: "Failed To Fetch Categporie",
            error: error?.message
        }, {
            status: 500
        })
    }
}