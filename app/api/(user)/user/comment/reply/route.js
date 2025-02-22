import { decodedToken } from "@/costomMiddlewere/decodedToken";
import { connectDb } from "@/db/ConnetcDb";
import CommentModel from "@/db/models/comments/commentsModel";
import { NextResponse } from "next/server"

export const POST = async (req) => {
    const { commentId, reply } = await req.json();
    try {

        const accountInfo = await decodedToken();
        await connectDb();

        const repliedBody = {
            accountName: accountInfo.username,
            accountId: accountInfo.id,
            reply: reply,
            createdAt: new Date()
        }

        const isReplied = await CommentModel.findByIdAndUpdate(
            commentId,
            {
                $push: {
                    replies: repliedBody
                }
            },
            { new: true }
        );

        if (!isReplied) {
            return NextResponse.json({
                message: "Comment not found",
                error: error
            }, { status: 404 })
        }


        return NextResponse.json({
            message: "Reply Succesfull"
        }, { status: 200 })

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            message: "Failed to post reply",
            error: error
        }, { status: 500 })
    }
}