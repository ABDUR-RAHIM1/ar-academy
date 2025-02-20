import UserModel from "@/db/models/users/userModel";
import { NextResponse } from "next/server"

export const PUT = async (req, { params }) => {
    const { userId } = await params;
    const { status } = await req.json();

    try {

        if (!status) {
            return NextResponse.json({
                message: "Status Required"
            }, { status: 400 })
        }

        const isUpdated = await UserModel.findByIdAndUpdate(userId, {
            $set: {
                status: status
            }
        }, { new: true });

        if (!isUpdated) {
            return NextResponse.json({
                message: "User not found"
            }, { status: 404 })
        };

        return NextResponse.json({
            message: "Status Updated",
            data: isUpdated
        }, { status: 200 })


    } catch (error) {
        return NextResponse.json({
            message: "Failed to Update User",
            error: error
        }, { status: 500 })
    }
};


export const DELETE = async (req, { params }) => {
    const { userId } = await params
    try {
        if (!userId) {
            return NextResponse.json({
                message: "User not found"
            }, { status: 400 })
        }

        const isDeleted = await UserModel.findByIdAndDelete(userId);

        if (isDeleted) {
            return NextResponse.json({
                message: "User Deleted Succesfully"
            }, { status: 200 })
        }

    } catch (error) {
        return NextResponse.json({
            message: "Failed to Delete User",
            error: error
        })
    }
};