"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";


export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: "",
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("Signup success", response.data);
            router.push("/login");

        } catch (error: any) {
            console.log("Signup failed", error.message);

            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);


    return (
        <div className="flex flex-row min-h-screen ">
            <hr />
            <div className="info">
                <div className="infoBox1">
                    <h1 className="infoText">Be apart!</h1>
                </div>

                <div className="infoBox2"></div>
            </div>
            <div className="signupBox">
                <div className=" grid grid-row-2 ">
                    <h1>{loading ? "Processing" : "Signup"}</h1>
                    <label className="text-align:left item" htmlFor="username">Username <span style={{ color: "red" }}>*</span></label>
                    <input
                        className="input"
                        id="username"
                        type="text"
                        value={user.username}
                        onChange={(e) => setUser({ ...user, username: e.target.value })}
                        placeholder="username"
                    />
                </div>
                <div className="flex grid grid-row-2 ">
                    <label className="text-align:left" htmlFor="email">Email <span style={{ color: "red" }}>*</span></label>
                    <input
                        className="input"
                        id="email"
                        type="text"
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        placeholder="email"
                    />
                </div>
                <div className="grid grid-row-2">
                    <label className="text-align:left" htmlFor="password">Password <span style={{ color: "red" }}>*</span></label>
                    <input
                        className="input"
                        id="password"
                        type="password"
                        value={user.password}
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                        placeholder="password"
                    />
                </div>
                <br />
                <div className=" flex flex-row-2 
                flex-wrap
                place-content-evenly">
                    <button
                        onClick={onSignup}
                        className="button">{buttonDisabled ? "Insert information" : "Signup"}</button>
                    <Link className="linkBox" href="/login">Visit login page</Link>
                </div>
            </div>
        </div>
    )

}
