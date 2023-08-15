"use client"
import axios from "axios"
import Link from "next/link"
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function addUserInfo() {
        const router = useRouter();
        const [token, setToken] = useState();
        const [user, setUser] = React.useState({
                website: "",
                phoneNumber: "",
                address: "",
                birthday: "",
        });
        console.log(token);

        const onUpdateUser = async ()=>{
        
        }


        return (
                <div className="flexDis userInfoDiv  justify-center">
                        <form className="userForm">
                                <div className=" flex basis-2 flex-col items-center">
                                        <h2 className="">Tell Us More About Yourself, </h2>
                                        <p className="mt-1 text-sm leading-6 text-gray-600">  This information will be displayed publicly so be careful what you share.
                                        </p>
                                </div>
                                <div className="basis-9/12 flex flex-col items-center">
                                        <div className="basis-full flex flex-col">
                                                <label>Website/profile</label>
                                                <div>
                                                        <div>
                                                                <input className=""
                                                                        id="website"
                                                                        type="text"
                                                                        value={user.website}
                                                                        onChange={(e)=>setUser({...user,website:e.target.value})}
                                                                        placeholder="website">
                                                                </input>
                                                        </div>

                                                </div>
                                        </div>

                                </div>
                                <button className="button"
                                onClick={onUpdateUser}
                                >
                                        Submit
                                </button>
                        </form>
                </div>

        )

}