import { connect } from "@/dbConfig/dbConfig"
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs"
import { getDataFromToken } from "@/helpers/getDataFromToken";
connect()

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const userId = await getDataFromToken(request);
    const {website,phoneNumber,address,birthday,about} = reqBody
    // const { token, , email } = reqBody
    console.log(reqBody);
    console.log(userId);
    
    //check if there is a user
    const user = await User.findOne({_id:userId})
    console.log(user);
    
    if (!user) {
      return NextResponse.json({ error: "Email is not correct" }, { status: 400 });
    }
    
    //updates users info
    user.website = website
    user.phoneNumber = phoneNumber
    user.address = address
    user.birthday = birthday
    user.about = about 
    //saves the user's info
    await user.save()
    console.log(user.website);
    

    return NextResponse.json({
      message: "successfully updated user",
      success: true,
      user
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 505 });
  }

}
