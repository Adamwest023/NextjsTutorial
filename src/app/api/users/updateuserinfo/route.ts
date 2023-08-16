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
    console.log(reqBody);

    const userId = await getDataFromToken(request);
    const { website, phoneNumber, address, birthday, about, profession } = reqBody
    // const { token, , email } = reqBody
    console.log(reqBody);
    console.log(userId);

    //check if there is a user
    const user = await User.findOne({ _id: userId })
    console.log(user);

    if (!user) {
      return NextResponse.json({ error: "Email is not correct" }, { status: 400 });
    }
    // updatetes user info not letting logic erase data
    if (website !== "") { user.website = website }
    if (phoneNumber !== "") { user.phoneNumber = phoneNumber }
    if (address !== "") { user.address = address }
    if (birthday !== "") { user.birthday = birthday }
    if (about !== "") { user.about = about }
    if (profession !== "") { user.profession = profession }

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
