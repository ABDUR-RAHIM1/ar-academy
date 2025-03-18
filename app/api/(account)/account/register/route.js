import { connectDb } from "@/db/ConnetcDb";
import { NextResponse } from "next/server";
import Jwt from "jsonwebtoken";
import { secretKey, adminSecretKey } from "@/constans"; // Admin Secret Key ইম্পোর্ট করতে হবে
import { cookies } from "next/headers";
import bcrypt from "bcrypt";
import AccountModel from "@/db/models/account/accountModel";

export const POST = async (req) => {
    const body = await req.json();
    const { plan, username, email, password, profilePhoto, role, bkashNumber, amount, adminKey } = body; // `adminKey` ইনপুট নিতে হবে

    //  All Fields Validation
    if (!plan || !username || !email || !password || !bkashNumber || !amount) {
        return NextResponse.json({
            message: "All Fields required"
        }, { status: 400 });
    }


    try {
        await connectDb();

        // যদি ইউজার `admin` হয়, তাহলে secret key যাচাই করতে হবে
        if (role === "admin") {
            if (!adminKey || adminKey !== adminSecretKey) {
                return NextResponse.json({
                    message: "Invalid Admin Secret Key"
                }, { status: 403 }); // Unauthorized Request
            }
        }

        //  Email Exist Check
        const isExist = await AccountModel.findOne({ email });
        if (isExist) {
            return NextResponse.json({
                message: "Email Already Exist"
            }, { status: 400 });
        }

        //  New User Create
        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = new AccountModel({
            plan,
            username,
            email,
            password: hashPassword,
            profilePhoto,
            role,
            bkashNumber,
            amount
        });

        const account = await newUser.save();

        //  Token Generate
        const accountToken = {
            id: account._id,
            username: account.username,
            email: account.email,
            plan: account.plan,
            role: account.role,
            profilePhoto: account.profilePhoto
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
