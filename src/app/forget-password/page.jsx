"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Swal from "sweetalert2";
import { useAuth } from "@/context/AuthContext";

export default function ForgetPasswordPage() {
  const { resetPassword } = useAuth(); // assumes you exposed this in AuthContext
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await resetPassword(email);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Password reset email sent!",
        showConfirmButton: false,
        timer: 3000,
      });
      router.push("/login");
    } catch (error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: `${error.message}`,
        showConfirmButton: false,
        timer: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 dark:text-white px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-green-500 text-center mb-6">
          Reset Password
        </h1>

        <form onSubmit={handleReset} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 rounded-md transition"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <p className="mt-4 text-gray-600 text-center">
          <a href="/login" className="text-green-500 hover:underline">
            Back to Login
          </a>
        </p>
      </div>
    </div>
  );
}
