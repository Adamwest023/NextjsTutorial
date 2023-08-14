"use client"
import axios from "axios"
import Link from "next/link"
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";


export default function ProfilePage() {
    const router = useRouter();
    const [data, setData] = useState("nothing");

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
        setData(res.data.data.username);
        console.log(res.data.data.username);
        
    }

    return (
        <div className=" flex flex-row flex-wrap ">
            <div className=" flex basis-full bg-slate-100 place-content-end h-14 mb-3 ">
                <button
                    onClick={logout}
                    className=" place-content-end bg-blue-500 hover:bg-blue-700 text-white font-bold  mr-6 py-2 px-4 my-2 rounded">Logout</button>
            </div>
            <div className=" flex flex-row basis-full gap-4 bg-slate-200 h-screen">
                <div className=" flex-col flew-auto  flex flew-wrap basis-1/3 ">
                    <div className="basis-1/3">This is for profile picture</div>
                    <div className="basis-1/3"><h2>{data === "none" ? "nothing" :<Link href={`/profile/${data}`}>{data}</Link>}</h2></div>
                    <div className="basis-1/3">This is for profil picture</div>
                </div>
                <div className="basis-2/3 bg-slate-300">
                    <button
                        onClick={getUserDetails}
                        className="bg-green-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Verified User</button>
                    <h2 className="p-3 rounded bg-green-500">{data === "nothing" ? "Nothing" : <Link
                        href={`/profile/${data}`}>{data}
                    </Link>}
                    </h2>
                    <hr />
                </div>
            </div>
        </div>


        // <div className=" min-h-screen p-4">
        //     <div className="col-span-3 g-slate-100 "><button
        //             onClick={logout}
        //             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-2 rounded">Logout</button></div>
        //     <div className="grid grid-rows-3 grid-flow-col gap-4 g-slate-200">
        //         <div className="row-span-3">
        //             <h1>Profile</h1>
        //             <hr />
        //             <p>Profile page</p>
        //         </div>
        //         <div className="col-span-2 g-slate-300">
        //             <button
        //                 onClick={getUserDetails}
        //                 className="bg-green-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Verified User</button>
        //             <h2 className="p-3 rounded bg-green-500">{data === "nothing" ? "Nothing" : <Link
        //                 href={`/profile/${data}`}>{data}
        //             </Link>}
        //             </h2>
        //             <hr />
        //         </div>
        //         <div className="row-span-2 col-span-2 g-slate-400">

        //         </div>  
        //     </div>
        // </div>
    )
}