"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubscription } from "@/Redux/Slices/subscriptions"; // ✅
import { useEffect } from "react";

export default function SuccessContent() {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userInfo);
  const a = useSelector((state) => state.subscription);
  const searchParams = useSearchParams();
  const paymentStatus = searchParams.get("payment");

  const userUID = user?.uid;

  useEffect(() => {
    if (userUID) {
      dispatch(fetchSubscription(userUID)); // ✅ Correct thunk
    }
  }, [dispatch, userUID]); // ✅ Dependency array fixed

  console.log("a Subscription:", a);

  return (
    <section
      className={`flex items-center justify-center min-h-screen px-6 py-24 transition-colors duration-500
        ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-lg w-full text-center bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-12 border border-gray-200 dark:border-gray-700"
      >
        <CheckCircle
          className={`w-16 h-16 mx-auto mb-6 ${theme === "dark" ? "text-green-400" : "text-green-500"
            }`}
        />
        <h1 className="text-4xl font-extrabold mb-4">
          Payment Successful!
        </h1>
        <p
          className={`text-lg mb-8 ${theme === "dark" ? "text-gray-300" : "text-gray-700"
            }`}
        >
          Thank you for subscribing. Your plan has been activated and you can
          now enjoy all the premium features.
        </p>

        {a && (
          <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
            <p><strong>Plan:</strong> {a.planName}</p>
            <p><strong>Price:</strong> ${a.price}</p>
            <p><strong>Date:</strong> {new Date(a.createdAt).toLocaleString()}</p>
          </div>
        )}

        <Link
          href="/plans"
          className={`inline-block px-8 py-4 mt-8 rounded-2xl font-semibold text-lg transition
            ${theme === "dark"
              ? "bg-green-400 text-gray-900 hover:bg-green-500"
              : "bg-green-500 text-white hover:bg-green-600"
            }`}
        >
          Back to Plans
        </Link>
      </motion.div>
    </section>
  );
}
