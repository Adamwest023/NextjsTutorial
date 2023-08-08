import { connect } from "@/dbConfig/dbConfig"
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs"

connect()

export async function POST(request: NextRequest){

    try {
        const reqBody = await request.json()
        const { token, password, email } = reqBody
        console.log(reqBody);
        console.log(token);
        
        //check if user exists
        const user = await User.findOne({ email })
        console.log(user.email);
        

        if (!user) {
            return NextResponse.json({ error: "Email is not correct" }, { status: 400 });
        }
        
        //hash password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        user.password = hashedPassword;
        console.log(user.password);
        
        user.forgotPasswordToken = undefined;
        user.forgotPasswordTokenExpiry = undefined;
        await user.save();
        console.log(user.password);

        return NextResponse.json({
            message: "Password Updated",
            success: true,
            user
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 506 });
    }
}