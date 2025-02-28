
import { connectDb } from "@/db/ConnetcDb";
import AccountModel from "@/db/models/account/accountModel";
import CommentModel from "@/db/models/comments/commentsModel";
import { NextResponse } from "next/server";

//  get all comment for specefic chapters with Id 
export const GET = async (req, { params }) => {

    const { chapterId } = await params;

    try {

        await connectDb();

        const comments = await CommentModel.find({ chapterId })
            .populate("accountId", "username profilePhoto _id")  // Comment er accountId populate
            .populate("replies.accountId", "username _id") // Replies er accountId populate
            .sort({ createdAt: -1 });


        return NextResponse.json({
            message: "succesfully Fetch",
            data: comments
        }, { status: 200 });

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            message: "Failed to fetch comments",
            error: error
        }, { status: 500 })
    }
}
