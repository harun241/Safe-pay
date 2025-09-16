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
      router.push("/"); // redirect to homepage
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="w-full bg-green-500 text-white p-3 rounded hover:bg-green-600 transition">
          Login
        </button>
         <p className="mt-4 text-gray-600 text-center">
          Already have an account?{" "}
          <a href="/register" className="text-green-500 hover:underline">
            Register
          </a>
        </p>
      </form>
        
    </div>
  );
}
