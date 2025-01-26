import { connectDb } from "@/db/ConnetcDb";
import CategorieModel from "@/db/models/CategoriesModel";
import SubCategories from "@/db/models/Sub_categorieModel";
import { NextResponse } from "next/server";


/// get by categories
export async function GET(req, { params }) {
    const { categorieIdentifier } = await params;

    try {
        await connectDb();
 
        const categories = await CategorieModel.findOne({
            identifier: { $regex: `^${categorieIdentifier}$`, $options: "i" },
        });

        if (!categories) {
            return NextResponse.json({
                message: "Category Not Found",
            }, { status: 404 });
        }

        const categorieId = categories._id;

        const subCategories = await SubCategories.find({ categorieId });

        return NextResponse.json(subCategories, { status: 200 });

    } catch (error) {
        return NextResponse.json({
            message: "Failed To Fetch",
        }, { status: 500 });
    }
}
