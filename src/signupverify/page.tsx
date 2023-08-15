"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CheckEmailPage() {
    const router = useRouter();

    const onLogin = async () => {
        const login = router.push("/login");

    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Account Created!</h1>
            <h2 className="py-4 center">Follow the link provided in the email to verify your email.</h2>
            <hr />
            <button className="button" onClick={onLogin}>Visit login page</button>

        </div>
    )

}
