import { connectDb } from "@/db/ConnetcDb"
import UserModel from "@/db/models/users/userModel"
import { NextResponse } from "next/server"
import Jwt from "jsonwebtoken"
import { secretKey } from "@/constans"
import { cookies } from "next/headers"
import bcrypt from "bcrypt"

export const POST = async (req) => {
    const body = await req.json();
    const { plan, username, email, password, bkashNumber, amount } = body;

    //  All Fields Validation
    if (!plan || !username || !email || !password || !bkashNumber || !amount) {
        return NextResponse.json({
            message: "All Fields required"
        }, { status: 400 });
    }

    try {
        await connectDb();

        //  Email Exist Check
        const isExist = await UserModel.findOne({ email });
        if (isExist) {
            return NextResponse.json({
                message: "Email Already Exist"
            }, { status: 400 });
        }

        //  New User Create

        const hashPassword = await bcrypt.hash(password, 10)


        const newUser = new UserModel({
            plan,
            username,
            email,
            password: hashPassword,
            bkashNumber,
            amount
        });

        const user = await newUser.save();

        //  Token Generate
        const userToken = {
            id: user._id,
            username: user.username,
            email: user.email,
            plan: user.plan
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
            message: "Account Created Successfully",
            token: true
        }, { status: 201 });

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Failed to Create account"
        }, { status: 500 });
    }
};
