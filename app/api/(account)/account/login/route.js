import { connectDb } from "@/db/ConnetcDb"
import { NextResponse } from "next/server"
import Jwt from "jsonwebtoken"
import { secretKey } from "@/constans"
import { cookies } from "next/headers"
import bcrypt from "bcrypt"
import AccountModel from "@/db/models/account/accountModel"

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
        const isAccount = await AccountModel.findOne({ email });
        if (!isAccount) {
            return NextResponse.json({
                message: "Invalid Credentials"
            }, { status: 404 });
        }


        const matchPassword = await bcrypt.compare(password, isAccount.password)

        if (matchPassword) {

            //  Token Generate
            const accountToken = {
                id: isAccount._id,
                username: isAccount.username,
                email: isAccount.email,
                role: isAccount.role,
                plan: isAccount.plan,
                profilePhoto: isAccount.profilePhoto
            };

            const token = Jwt.sign({ account: accountToken }, secretKey, { expiresIn: "7d" });

            // HTTP-Only Cookie সেট করা
            const cookie = await cookies(); // Here we await cookies()
            cookie.set("ar_academy_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                secure: false,
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
