"use client";

import { useTheme } from "next-themes";
import Link from "next/link";
import {
    Bell,
    Search,
    Shield,
    Menu,

} from "lucide-react";
import { ThemeSwitcher } from "@/app/(base)/Components/ThemeSwitcher";

export default function ProfileHeader({ setIsSidebarOpen }) {
    const { theme } = useTheme();

    const toggleSidebar = () => setIsSidebarOpen(prev => !prev);




    return (
        <header
            className={`sticky pl-0 pr-0 lg:pl-5 lg:pr-5 top-0 left-0 w-full z-40 flex-shrink-0 border-b ${theme === "dark" ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"
                }`}
        >
            <div className="flex items-center justify-between h-16 px-4">

                <Link href="/" className="flex items-center space-x-2">
                    <Shield
                        className={`h-7 w-7 transition-colors ${theme === "dark" ? "text-cyan-400" : "text-green-500"
                            }`}
                    />
                    <span
                        className={`font-bold text-xl transition-colors hidden sm:block ${theme === "dark" ? "text-cyan-400" : "text-green-500"
                            }`}
                    >
                        Account Manager
                    </span>
                </Link>



                <div className="flex items-center space-x-4">
                    {/* Search Bar */}
                    <div className="hidden md:block relative group">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <Search
                                size={16}
                                className={`transition-colors duration-200 
        group-hover:text-gray-300 group-focus-within:text-green-500
        ${theme === "dark" ? "text-gray-400" : "text-gray-500"}
      `}
                            />
                        </span>
                        <input
                            type="text"
                            placeholder="Search..."
                            className={`block w-64 rounded-md border py-2 pl-10 pr-4 text-sm 
      focus:outline-none focus:ring-2 focus:ring-green-500 
      transition-colors duration-200
      ${theme === "dark"
                                    ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400 hover:border-gray-500"
                                    : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 hover:border-gray-400"
                                }`}
                        />
                    </div>


                    {/* Notifications */}
                    <button
                        className="relative p-2 rounded-full transition-colors duration-200 
             hover:bg-gray-200 dark:hover:bg-gray-800 group"
                    >
                        <Bell
                            size={20}
                            className={`transition-colors duration-200
      ${theme === "dark" ? "text-gray-300 group-hover:text-black" : "text-gray-600 group-hover:text-black"}
    `}
                        />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>


                    <ThemeSwitcher />


                    <button
                        onClick={toggleSidebar}
                        className="lg:hidden  rounded-md"
                    >
                        <Menu size={24} />
                        <span className="sr-only">Open sidebar</span>
                    </button>
                </div>
            </div>
        </header>
    );
}