"use client";

import Link from "next/link";
import { useState } from "react";
import { Shield, Menu, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-900 text-white shadow-lg fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Shield className="h-7 w-7 text-green-400" />
            <span className="font-bold text-xl">SafePay</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="hover:text-green-400 transition">Home</Link>
            <Link href="/features" className="hover:text-green-400 transition">Features</Link>
            <Link href="/about" className="hover:text-green-400 transition">About</Link>
            <Link href="/contact" className="hover:text-green-400 transition">Contact</Link>

            {user ? (
              // User logged in
              <div className="flex items-center space-x-4">
                {user.photoURL && (
                  <img
                    src={user.photoURL}
                    alt="User Photo"
                    className="h-8 w-8 rounded-full object-cover"
                  />
                )}
                <span>{user.displayName || user.email}</span>
                <button
                  onClick={logout}
                  className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded-lg font-medium transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              // User not logged in
              <>
                <Link
                  href="/login"
                  className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg font-medium transition"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg font-medium transition"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-gray-800">
          <div className="flex flex-col space-y-4 px-4 py-6">
            <Link href="/" className="hover:text-green-400 transition">Home</Link>
            <Link href="/features" className="hover:text-green-400 transition">Features</Link>
            <Link href="/about" className="hover:text-green-400 transition">About</Link>
            <Link href="/contact" className="hover:text-green-400 transition">Contact</Link>

            {user ? (
              <div className="flex flex-col space-y-2 items-center">
                {user.photoURL && (
                  <img
                    src={user.photoURL}
                    alt="User Photo"
                    className="h-8 w-8 rounded-full object-cover"
                  />
                )}
                <span>{user.displayName || user.email}</span>
                <button
                  onClick={logout}
                  className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-medium transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col space-y-2">
                <Link
                  href="/login"
                  className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg font-medium text-center transition"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg font-medium text-center transition"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
