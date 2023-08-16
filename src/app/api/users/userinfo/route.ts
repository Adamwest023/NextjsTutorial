import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {email} = reqBody;
        console.log(reqBody);
        const user = await User.findOne({email})
        if (!user) {
            return NextResponse.json({ error: "bad request" }, { status: 400 })
            
        }
        const response = NextResponse.json({
            message: "Success",
            success: true, 
            user
        });
        return response;

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
        
    }
}