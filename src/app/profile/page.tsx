"use client"
import axios from "axios"
import Link from "next/link"
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { get } from "http";


export default function ProfilePage() {
    const router = useRouter();
    const [data, setData] = useState("loading");
    const [email, setEmail] = useState("loading");
    const [loading, setLoading] = React.useState(false);
    const [user, setUser] = React.useState("nothing");
    const [updateUser, setUpdateUser] = React.useState({
        _id: "",
        email: "",
    });

    //logut function
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

    //instantly gets user data
    const getUserDetails = async () => {
        const res = await axios.get("/api/users/me")
        console.log(res.data);
        setData(res.data.data._id);
        setEmail(res.data.data.email);
        setUser(res.data.data);
        return res.data 
    };

    //sends user to update information
    const onUserInfo = async () => {
        updateUser._id = data
        updateUser.email =email 
        console.log(data);
        console.log(email);
        try {
            setLoading(true);
            const response = await axios.post("/api/users/userinfo", updateUser);
            console.log("success", response.data);
            router.push("/updateuserinfo");
        } catch (error: any) {
            console.log("error", error.message);
            console.log(data);
        } finally {
            setLoading(false);
        }
    }



    //calls user data function on page load 
    useEffect(() => {
        window.addEventListener("load", getUserDetails());
    }, []);

    return (
        <div className=" flexDis flex-wrap"  >
            <div className=" logout">
                <button
                    className="button"
                    onClick={onUserInfo}>
                    Add User info
                </button>
                <button
                    onClick={logout}
                    className=" button pl-3 mr-6 py-2 ">Logout</button>
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
                            <li></li>
                            <li>two</li>
                            <li>three</li>
                            <li>four</li>
                        </ul></div>
                </div>
                <div className=" profileBox2">
                    <div className="detailBox2">
                        <div className="infoTab "><h2>{user.username}</h2><p>profession</p></div>
                        <div className="infoTab"><h3>area</h3></div>
                        <div>

                        </div>
                    </div>
                    <div className="contactBox"><h2 className="p-3 rounded bg-green-500">{data === "Loading" ? "About" : <Link
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