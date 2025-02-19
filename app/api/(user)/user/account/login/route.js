import { connectDb } from "@/db/ConnetcDb"
import UserModel from "@/db/models/users/userModel"
import { NextResponse } from "next/server"
import Jwt from "jsonwebtoken"
import { secretKey } from "@/constans"
import { cookies } from "next/headers"
import bcrypt from "bcrypt"

//  user login
export const POST = async (req) => {
    const body = await req.json();
    const { email, password } = body;

    //  All Fields Validation
    if (!email || !password) {
        return NextResponse.json({
            message: "All Fields required"
        }, { status: 400 });
    }

    try {
        await connectDb();

        //  Email Exist Check
        const isUser = await UserModel.findOne({ email });
        if (!isUser) {
            return NextResponse.json({
                message: "Invalid Credentials"
            }, { status: 404 });
        }


        const matchPassword = await bcrypt.compare(password, isUser.password)

        if (matchPassword) {

            //  Token Generate
            const userToken = {
                id: isUser._id,
                username: isUser.username,
                email: isUser.email,
                plan: isUser.plan
            };

            const token = Jwt.sign({ user: userToken }, secretKey, { expiresIn: "7d" });

            // HTTP-Only Cookie সেট করা
            cookies().set("u_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                path: "/",
                maxAge: 7 * 24 * 60 * 60, //  7 দিন থাকবে
            });

            return NextResponse.json({
                message: "Login Successfully",
                token: true
            }, { status: 201 });
        } else {
            return NextResponse.json({
                message: "Invalid Credentials"
            }, { status: 404 });
        }



    } catch (error) {
        return NextResponse.json({
            message: "Failed to Create account"
        }, { status: 500 });
    }
};
