"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
 Bell,
 Search,
 Settings,
 LogOut,
 LayoutDashboard,
 Shield,
 Menu,
 Home,
 ChevronDown,
} from "lucide-react";
import { useState } from "react";
import { ThemeSwitcher } from "@/app/(base)/Components/ThemeSwitcher";
import { useTheme } from "@/app/(base)/Components/ThemeProvider";

export default function DashboardHeader({ setIsSidebarOpen }) {
 const { user, logout } = useAuth();
 const { theme } = useTheme();
 const [isDropdownOpen, setIsDropdownOpen] = useState(false);

 const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
 const closeDropdown = () => setIsDropdownOpen(false);
 const toggleSidebar = () => setIsSidebarOpen(prev => !prev);

 
 const userAvatar = user?.photoURL ||
  `https://ui-avatars.com/api/?name=${encodeURIComponent(
   user?.displayName || user?.email || "User"
  )}&background=0ea5e9&color=fff`;

 return (
  <header
   className={`fixed pl-0 pr-0 lg:pl-5 lg:pr-5 top-0 left-0 w-full z-40 flex-shrink-0 border-b ${
    theme === "dark" ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"
   }`}
  >
   <div className="flex items-center justify-between h-16 px-4">
    
    <Link href="/" className="flex items-center space-x-2">
     <Shield
      className={`h-7 w-7 transition-colors ${
       theme === "dark" ? "text-cyan-400" : "text-green-500"
      }`}
     />
     <span
      className={`font-bold text-xl transition-colors hidden sm:block ${
       theme === "dark" ? "text-cyan-400" : "text-green-500"
      }`}
     >
      SafePay
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
      ${
        theme === "dark"
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

     {/* User Profile Dropdown */}
     <div className="relative">
      <button
       onClick={toggleDropdown}
       className="flex items-center space-x-2  rounded-full   focus:outline-none"
      >
       <img
        src={userAvatar}
        alt="User Avatar"
        className="w-8 h-8 rounded-full"
       />
       <span className="hidden sm:block text-sm font-medium">
        {user?.displayName?.split(" ")[0] || "User"}
       </span>
       <ChevronDown size={16} className="hidden sm:block" />
      </button>
      <AnimatePresence>
       {isDropdownOpen && (
        <motion.div
         initial={{ opacity: 0, scale: 0.95 }}
         animate={{ opacity: 1, scale: 1 }}
         exit={{ opacity: 0, scale: 0.95 }}
         transition={{ duration: 0.2 }}
         className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 z-50 ${
          theme === "dark"
           ? "bg-gray-800 ring-1 ring-black ring-opacity-5"
           : "bg-white ring-1 ring-black ring-opacity-5"
         }`}
         onMouseLeave={closeDropdown}
        >
         <Link
          href="/"
          onClick={closeDropdown}
          className={`flex items-center px-4 py-2 text-sm hover:bg-gray-200 dark:hover:bg-gray-700 ${
           theme === "dark" ? "text-gray-300" : "text-gray-700"
          }`}
         >
          <Home size={16} className="mr-2" />
          Home
         </Link>
         <Link
          href="/dashboard/setting"
          onClick={closeDropdown}
          className={`flex items-center px-4 py-2 text-sm hover:bg-gray-200 dark:hover:bg-gray-700 ${
           theme === "dark" ? "text-gray-300" : "text-gray-700"
          }`}
         >
          <Settings size={16} className="mr-2" />
          Settings
         </Link>
         <hr className="my-1 border-gray-700" />
         <button
          onClick={() => {
           logout();
           closeDropdown();
          }}
          className={`flex items-center w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/10`}
         >
          <LogOut size={16} className="mr-2" />
          Logout
         </button>
        </motion.div>
       )}
      </AnimatePresence>
     </div>
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