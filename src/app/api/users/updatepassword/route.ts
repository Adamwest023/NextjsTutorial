import { connect } from "@/dbConfig/dbConfig"
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { token, password, email } = reqBody
        console.log(reqBody);
        console.log(token);
        console.log(email);
        console.log(password);
        

        //check if user exists
        const user = await User.findOne({ email })
        console.log(user.email);
        

        // if (!user) {
        //     return NextResponse.json({ error: "Invalid token" }, { status: 400 });
        //     console.log(token);
        // }
        

        // user.password = password;
        // user.forgotPasswordToken = undefined;
        // user.forgotPasswordTokenExpiry = undefined;
        // await user.save();

        // return NextResponse.json({
        //     message: "Password Updated",
        //     success: true
        // });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 506 });
    }
}