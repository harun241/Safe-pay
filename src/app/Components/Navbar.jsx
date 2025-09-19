"use client";

import Link from "next/link";
import { useState } from "react";
import { Shield, Menu, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { ThemeSwitcher } from "./ThemeSwitcher";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [hoverPreview, setHoverPreview] = useState(null); // hovered link
  const { user, logout } = useAuth();

  // Glassy navbar background
  const navClasses = "bg-gray-800/80 backdrop-blur-md text-gray-100 shadow-lg fixed top-0 left-0 w-full z-50";
  const mobileMenuClasses = "md:hidden bg-gray-800/80 backdrop-blur-md text-gray-100";

  const navLinks = [
    { name: "Home", href: "/", preview: "Welcome to SafePay! Learn about our platform and services." },
    { name: "Technology", href: "/features", preview: "Explore our AI-powered fraud prevention and risk management tools." },
    { name: "Resources", href: "/resources", preview: "Access guides, tutorials, and documentation to maximize FraudNet." },
    { name: "Company", href: "/company", preview: "Discover our mission, vision, team, and latest news." }
  ];

  return (
    <nav className={navClasses}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Shield className="h-7 w-7 text-green-500 dark:text-green-400" />
            <span className="font-bold text-xl">SafePay</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6 relative">
            {navLinks.map((link, idx) => (
              <div
                key={idx}
                onMouseEnter={() => setHoverPreview(link.name)}
                onMouseLeave={() => setHoverPreview(null)}
                className="relative"
              >
                <Link
                  href={link.href}
                  className={`transition ${
                    hoverPreview === link.name
                      ? "bg-gradient-to-r from-purple-500 to-cyan-400 text-transparent bg-clip-text font-semibold"
                      : "hover:text-green-500 dark:hover:text-green-400"
                  }`}
                >
                  {link.name}
                </Link>

                {/* Hover Preview Card */}
                {hoverPreview === link.name && (
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-64 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-lg rounded-lg p-4 text-sm z-50">
                    {link.preview}
                  </div>
                )}
              </div>
            ))}

            <ThemeSwitcher />

            {user ? (
              <div className="flex items-center space-x-4">
                {/* Profile */}
                <div className="relative group">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="User Photo"
                      className="h-8 w-8 rounded-full object-cover cursor-pointer"
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-gray-500 flex items-center justify-center cursor-pointer">
                      <span className="text-white font-medium">
                        {user.displayName?.[0] || user.email?.[0]}
                      </span>
                    </div>
                  )}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full opacity-0 group-hover:opacity-100 transition-all bg-gray-700 dark:bg-gray-800 text-white text-sm px-2 py-1 rounded mt-2 whitespace-nowrap z-50">
                    {user.displayName || user.email}
                  </div>
                </div>

                <button
                  onClick={logout}
                  className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded-lg font-medium transition text-white"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  href="/login"
                  className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg font-medium transition text-white"
                >
                  Login
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <ThemeSwitcher />
            <button onClick={() => setOpen(!open)}>
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className={mobileMenuClasses}>
          <div className="flex flex-col space-y-4 px-4 py-6">
            {navLinks.map((link, idx) => (
              <Link
                key={idx}
                href={link.href}
                className="hover:text-green-500 dark:hover:text-green-400 transition"
              >
                {link.name}
              </Link>
            ))}

            <hr className="border-gray-300 dark:border-gray-700" />

            {user ? (
              <div className="flex flex-col space-y-2 items-center">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="User Photo"
                    className="h-8 w-8 rounded-full object-cover cursor-pointer"
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-gray-500 flex items-center justify-center cursor-pointer">
                    <span className="text-white font-medium">
                      {user.displayName?.[0] || user.email?.[0]}
                    </span>
                  </div>
                )}
                <span>{user.displayName || user.email}</span>
                <button
                  onClick={logout}
                  className="bg-red-500 hover:bg-red-600 w-full px-4 py-2 rounded-lg font-medium transition text-white"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col space-y-2">
                <Link
                  href="/login"
                  className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg font-medium text-center transition text-white"
                >
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
