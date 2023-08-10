import React, { useState } from "react";
import Link from "next/link";

export default function Navbar() {
    const [darkMode, setDarkMode] = React.useState(false);

    const darkModeSwitch = async () => {
        if (darkMode) {
            setDarkMode(true)
        } else {
            setDarkMode(false)
        }
    }
    return (
        <div className="justify-end">
            <button  onClick={darkModeSwitch}type="button" className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false"></button>
        </div>
    )

}