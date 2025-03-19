import { connectDb } from "@/db/ConnetcDb";
import { NextResponse } from "next/server";
import { SignJWT } from "jose"; // jose import 
import bcrypt from "bcrypt";
import AccountModel from "@/db/models/account/accountModel";
import { secretKey } from "@/constans";

const secret = new TextEncoder().encode(secretKey); // Secret Key Encode

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

        const matchPassword = await bcrypt.compare(password, isAccount.password);

        if (matchPassword) {

            //  Token Generate using `jose`
            const accountToken = {
                id: isAccount._id.toString(),
                username: isAccount.username,
                email: isAccount.email,
                role: isAccount.role,
                plan: isAccount.plan,
                profilePhoto: isAccount.profilePhoto
            };

            const token = await new SignJWT({ account: accountToken })
                .setProtectedHeader({ alg: "HS256" })
                .setExpirationTime("7d")
                .sign(secret);

            const response = NextResponse.json({
                message: 'Login successfully!',
                token: true
            }, { status: 201 });

            response.cookies.set('ar_academy_token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                path: '/',
                maxAge: 7 * 24 * 60 * 60, // 7 Days
            });

            return response;
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
