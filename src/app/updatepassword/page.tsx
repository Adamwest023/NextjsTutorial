"use client"
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";


export default function UpdatePasswordPage() {
    const [token, setToken] = useState("");
    const [user,setUser] = useState({
        password:""})
    // const [password, setPassword] = useState(false);
    const [error, setError] = useState(false);

    //update password
    const onUpdatePassword = async () => {
        try {
            await axios.post('/api/users/updatepassword',{token});
        } catch (error: any) {
            setError(true);
            console.log(error.response.data);
            
        }
    }
    //use effect to pull token
    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);
    //use effect to validate token
    useEffect(() => {
        if(token.length > 0) {
            onUpdatePassword();
        }
    }, [token]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl">Update password</h1>
            <hr />
            <label htmlFor="password">password</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="password"
                type="text"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="password"
            />
            {/* <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="password"
                type="text"
                value={user.password}
                placeholder="Reenter password"
            /> */}
            <button
                onClick={onUpdatePassword}
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">Update Password</button>

        </div>

    )
}