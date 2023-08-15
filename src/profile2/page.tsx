"use client"
import axios from "axios"
import Link from "next/link"
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";


export async function ProfilePage() {
    const router = useRouter();
    const [data, setData] = useState("nothing");
    const [user,setUser] = useState("")

    const getUserDataStat = async () => {
        const res = await axios.get("/api/users/me")
        console.log(res.data);
        setData(res.data.data._id);
        setUser(res.data)

    }


    const logout = async () => {
        try {
            await axios.get('/api/users/logout');
            toast.success("logout successfully");
            router.push('/login');
        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message);
        }
    }

    const getUserDetails = async () => {
        const res = await axios.get("/api/users/me")
        console.log(res.data);
        setData(res.data.data._id);
    }



    return (
        <div className=" flex flex-row flex-wrap ">
            <div className=" logout">
                <button
                    onClick={logout}
                    className=" button mr-6 py-2">Logout</button>
            </div>
            <div className=" flex flex-row basis-full bg-slate-200 h-screen">
                <div className=" profileBox1 ">
                    <div className="basis-1/3 pl-6 rounded border-slate-400 border-solid border-2">This is for profile picture</div>
                    <div className="detailBox ">
                        <h2><span>Details</span></h2>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa, nam nobis placeat nihil omnis nesciunt mollitia. Quo enim quibusdam nemo delectus necessitatibus pariatur aliquam distinctio autem, veritatis quam? Vero, natus.</p>
                    </div>
                    <div className="detailBox"><h2>
                        <span>Skills</span></h2>
                        <br />
                        <ul>
                            <li>one</li>
                            <li>two</li>
                            <li>three</li>
                            <li>four</li>
                        </ul></div>
                </div>
                <div className=" profileBox2">
                    <div className="detailBox2">
                        <div className="infoTab "><h2>Name</h2><p>profession</p></div>
                        <div className="infoTab"><h3>area</h3></div>
                        <div>
                            <button
                                onClick={getUserDetails}
                                className="button">Verified User</button>
                        </div>
                    </div>
                    <div className="contactBox"><h2 className="p-3 rounded bg-green-500">{data === "About" ? "About" : <Link
                        href={`/profile/${data}`}>{data}
                    </Link>}
                    </h2>
                        <h3>Contact Information</h3>
                        <ul>
                            <li><span >Phone:</span></li><li><span>Address:</span></li><li><span>E-mail:</span></li><li><span>Site</span></li>
                            <h3>basic Information</h3>
                            <li><span></span></li><li><span></span></li>
                        </ul>
                    </div>
                    <hr />
                </div>
            </div>
        </div>
    )
}