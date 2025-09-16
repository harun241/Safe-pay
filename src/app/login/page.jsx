"use client";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(email, password);
<<<<<<< HEAD
      
       if (res.user.uid) {
              try {
      
                // upDateAt  when user login like a lest Login
                const res = await fetch("/api/users", {
                  method: "PATCH",
                  headers: {
                    "content-type": "application/json",
                  },
                  body: JSON.stringify({uid:res.user.uid,email,updatedAt: new Date().toISOString()  }),
                });
      
                
              } catch (error) {
                 Swal.fire({
                   position: "top-end",
                   icon: "error",
                   title: `${error.message}`,
                   showConfirmButton: false,
                   timer: 1500,
                 });
              }
            }
=======

      if (res.user.uid) {
        try {
          await fetch("/api/users", {
            method: "PATCH",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({ email, updatedAt: new Date().toISOString() }),
          });
        } catch (error) {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: `${error.message}`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
>>>>>>> e4da3a60919dea1f203d57f4bbd7eb2e882aeb59
      router.push("/"); // redirect to homepage
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.message,
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-100 to-green-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md flex flex-col gap-6"
      >
        {/* Header */}
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Welcome Back
        </h1>
        <p className="text-center text-gray-500 text-sm">
          Sign in to your account to continue
        </p>

        {/* Email Input */}
        <div className="flex flex-col">
          <label className="text-gray-600 mb-2 text-sm font-medium">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password Input */}
        <div className="flex flex-col">
          <label className="text-gray-600 mb-2 text-sm font-medium">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Login Button */}
        <button className="w-full bg-green-500 text-white p-3 rounded-xl hover:bg-green-600 shadow-md transition font-semibold">
          Login
        </button>

        {/* Footer */}
        <p className="text-gray-500 text-center text-sm">
          Don't have an account?{" "}
          <a href="/register" className="text-green-500 font-medium hover:underline">
            Register
          </a>
        </p>
      </form>
    </div>
  );
}
