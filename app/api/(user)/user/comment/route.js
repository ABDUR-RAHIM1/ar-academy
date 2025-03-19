import { decodedToken } from "@/costomMiddlewere/DecodedToken";
import { connectDb } from "@/db/ConnetcDb";
import CommentModel from "@/db/models/comments/commentsModel";
import { NextResponse } from "next/server";

//  Create a comment
export const POST = async (req) => {
    const body = await req.json();
    const { chapterId, comment } = body;

    try {

        const accountInfo = await decodedToken()
        if (accountInfo.error) {
            return NextResponse.json({
                message: accountInfo.error,
                token: false
            }, { status: 400 })
        }

        await connectDb()
        const newComment = new CommentModel({
            chapterId,
            accountId: accountInfo.id,
            comment
        });
        await newComment.save();
        return NextResponse.json({
            message: "Comment Done",
            token: true
        }, { status: 201 });

    } catch (error) {
        return NextResponse.json({
            message: "Failed to post comment",
            error: error,
            token: false
        }, { status: 500 })
    }
}


//  get all comment for admin 
export const GET = async (req) => {

    try {

        await connectDb();

        const comments = await CommentModel.find();

        return NextResponse.json({
            message: "succesfully Fetch",
            data: comments
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json({
            message: "Failed to fetch comments",
            error: error
        }, { status: 500 })
    }
}

