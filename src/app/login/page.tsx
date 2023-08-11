"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";


export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    });
    const [error, setError] = React.useState(false)

    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);


    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("Login success", response.data);
            toast.success("Login success");
            router.push("/profile");

        } catch (error: any) {
            setError(true);
            console.log("Login failed", error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    const onForgotPassword = async () => {
        router.push("/forgotpassword");
    }
    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true)
        }
    }, [user]);



    return (


        <div className="flex loginDiv flew-row content-center min-h-screen">
            <div className="sideBox sideBox1"></div>
            <div className="loginBox"><h1 className="py-4">{loading ? "Processing" : "Login"}</h1>
                <hr />
                {/* <label htmlFor="email">email</label> */}
                <input
                    className="input"
                    id="email"
                    type="text"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    placeholder="email"
                />
                {/* <label htmlFor="password">password</label> */}
                <input
                    className="input"
                    id="password"
                    type="text"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    placeholder="password"
                />
                <button
                    onClick={onLogin}
                    className="button2">{buttonDisabled ? "Login Here" : "Login"}
                </button>
                {error && (
                    <><h3>Need Help?</h3><button
                        onClick={onForgotPassword}
                        className="button2  ">Forgot password
                    </button></>)
                }
                <div className="linkDiv">
                    <button className="loginLink"><Link  href="/signup">Signup Page</Link></button>
                    <button className="loginLink"><Link  href="/forgotpassword">Forgot Password?</Link></button>
                </div>
            </div>
            <div className="sideBox sideBox2"></div>
        </div>
    )
}