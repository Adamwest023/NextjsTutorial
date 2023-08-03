"use client"
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import { set } from "mongoose";


export default function UpdatePasswordPage() {
    const [token, setToken] = useState("");
    const [user, setUser] = useState({
        password: " ",
        token: " "
    })
    // const [password, setPassword] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = React.useState(false);




    //update password
    const onUpdatePassword = async () => {
        user.token= token
        
        
        try {
            setLoading(true);
            console.log(user.password);
            console.log(user.token); 
            const response = await axios.post('/api/users/updatepassword',  user );
            console.log(response.data);

        } catch (error: any) {
            setError(true);
            console.log(error.response.data);
            
        } finally {
            setLoading(false);
        }
    }
    //use effect to pull token
    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);
    //use effect to validate token
    useEffect(() => {
        if (token.length > 0) {
            onUpdatePassword();
        }
    }, [token]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl">{loading ? "Processing" : "Update password"}</h1>
            <hr />
            <label htmlFor="password">{token ? `${token}` : "no token"}</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="password"
                type="password"
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