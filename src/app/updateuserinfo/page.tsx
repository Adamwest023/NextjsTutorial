"use client"
import axios from "axios"
import Link from "next/link"
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast"


export default function addUserInfo() {
        const router = useRouter();
        const [error, setError] = useState(false);
        const [loading, setLoading] = React.useState(false);

        const [user, setUser] = React.useState({
                website: "",
                phoneNumber: "",
                address: "",
                birthday: "",
                about: "",
        });

        //updating the user's new information
        const onUpdateUser = async () => {
                console.log("success");
                console.log(user);
                try {
                        setLoading(true);
                        const response = await axios.post('/api/users/updateuserinfo', user);
                        console.log(response.data);
                        router.push("/profile");
                } catch (error: any) {
                        setError(true);
                        console.log(error.response.data);
                } finally {
                        setLoading(false);
                        console.log(user);
                        router.push("/profile");
                }
        }


        return (
                <div className="flexDis userInfoDiv">
                        <form className="userForm">
                                <div className="flex flex-col items-center justify-evenly">
                                        <h2 className="">{loading ? "Processing" : "Tell Us More About Yourself"} </h2>
                                        <p className="mt-1 text-sm leading-6 text-gray-600">  This information will be displayed publicly so be careful what you share.
                                        </p>
                                </div>
                                <div className=" flex basis-2 flex-col items-center ">
                                        <div className="basis-9/12 flex flex-col justify-evenly items-center">
                                                <div className=" flex flex-col">
                                                        <label htmlFor="website">Website/profile</label>
                                                        <div>
                                                                <div>
                                                                        <input className="input"
                                                                                id="website"
                                                                                type="text"
                                                                                value={user.website}
                                                                                onChange={(e) => setUser({ ...user, website: e.target.value })}
                                                                                placeholder="website"
                                                                        />
                                                                </div>

                                                        </div>
                                                </div>
                                                <div className=" flex flex-col">
                                                        <label htmlFor="phoneNumber">Phone Number</label>
                                                        <div>
                                                                <div>
                                                                        <input className="input"
                                                                                id="phoneNumber"
                                                                                type="text"
                                                                                value={user.phoneNumber}
                                                                                onChange={(e) => setUser({ ...user, phoneNumber: e.target.value })}
                                                                                placeholder="Phone Number"
                                                                        />

                                                                </div>

                                                        </div>
                                                </div>
                                                <div className=" flex basis-2 flex-col items-center border-t-4 border-slate-300	 ">
                                                        <div className="basis-9/12 flex flex-col justify-evenly items-center">
                                                                <div className=" flex flex-col">
                                                                        <label htmlFor="address">Address</label>
                                                                        <div>
                                                                                <div>
                                                                                        <input className="input"
                                                                                                id="address"
                                                                                                type="text"
                                                                                                value={user.address}
                                                                                                onChange={(e) => setUser({ ...user, address: e.target.value })}
                                                                                                placeholder="Address"
                                                                                        />
                                                                                </div>

                                                                        </div>
                                                                </div>
                                                                <div className=" flex flex-col">
                                                                        <label htmlFor="birthday">Birthday</label>
                                                                        <div>
                                                                                <div>
                                                                                        <input className="input"
                                                                                                id="birthday"
                                                                                                type="text"
                                                                                                value={user.birthday}
                                                                                                onChange={(e) => setUser({ ...user, birthday: e.target.value })}
                                                                                                placeholder="Birthday"
                                                                                        />
                                                                                </div>

                                                                        </div>
                                                                </div>
                                                                <div className=" flex flex-col">
                                                                        <label htmlFor="about">Tell us about yourself!</label>
                                                                        <div>
                                                                                <div>
                                                                                        <textarea
                                                                                                className="input"
                                                                                                id="info"
                                                                                                value={user.about}
                                                                                                onChange={(e) => setUser({ ...user, about: e.target.value })}
                                                                                                placeholder="About You"
                                                                                        />
                                                                                </div>

                                                                        </div>
                                                                </div>

                                                        </div>
                                                </div>
                                        </div>
                                        <button className="button"
                                                onClick={onUpdateUser}
                                        >
                                                Submit
                                        </button>
                                        <Link className="button"
                                                href="/profile"
                                        >
                                                back to profile
                                        </Link>
                                </div>
                        </form>
                </div>
        )
}