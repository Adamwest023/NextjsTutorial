"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import { sendEmail } from "@/helpers/mailer";

export default function ForgotPassword() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
    });

    //using state for resend buttons 
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    //function to send token
    const onReset = async () => {
        try {
            setLoading(true);
            const response = await axios.post('/api/users/forgotpassword', user)
            console.log("reset successful", response.data);
            toast.success("Check your email");
            // router.push("/login");
        } catch (error: any) {
            console.log("email not valid!!", error.message);
            toast.success("Email not valid");
        } finally {
            setLoading(false);
        }
    }

    //effect for changing if the user has input an email
    useEffect(() => {
        if (user.email.length > 0) {
            setButtonDisabled(true);
        } else {
            setButtonDisabled(false);
        }
    }, [user]);


    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading ? "Processing" : "Forgot Password"}</h1>
            <hr />
            {/* <label htmlFor="email">email</label> */}
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="email"
                type="text"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="email"
            ></input>
            {buttonDisabled && (
                <button
                    onClick={onReset}
                    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">Submit
                </button>
            )}
            <Link href="/signup">Visit Signup page</Link>
        </div>
    )
}
