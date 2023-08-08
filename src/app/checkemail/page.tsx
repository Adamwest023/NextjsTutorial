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
            <h1 className="py-4 center">Follow the link provided in the email to change your password.</h1>
            <hr />
            <button className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600" onClick={onLogin}>Visit login page</button>

        </div>
    )

}
