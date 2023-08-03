import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { sendEmail } from "@/helpers/mailer";


connect()

export async function POST(request: NextRequest) {

    try {
        const reqBody = await request.json()
        const {email} = reqBody;
        console.log(reqBody);

        //check if user exists
        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({error: "User does not exist"}, {status: 400})
        }
        console.log("user exists");

        const userCurrent = await user
        console.log(user.email);
        
        //send email to change password
        await sendEmail({email, emailType:"RESET", userId: userCurrent._id});
        
        const response =  NextResponse.json({
            message:"Email Sent",
            success:true,
            user
        });

        return response;

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}