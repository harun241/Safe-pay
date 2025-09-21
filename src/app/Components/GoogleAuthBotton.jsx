"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function GoogleSignInButton() {
  const { googleSignIn } = useAuth();
  const router = useRouter();
  

  const handleGoogleLogin = async () => {
    try {
      await googleSignIn();
      Swal.fire({
        icon: "success",
        title: "Logged in with Google!",
        showConfirmButton: false,
        timer: 2000,
      });
      router.push("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error.message,
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 font-medium py-2 rounded-md hover:bg-gray-100 transition"
    >
      <img
        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
        alt="Google"
        className="w-5 h-5"
      />
      Sign in with Google
    </button>
  );
}