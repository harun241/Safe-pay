"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchSubscription } from "@/Redux/Slices/subscriptions";
import { fetchTransactions } from "@/Redux/Slices/transactionsSlice";

export default function SuccessPage() {
  const { theme } = useTheme();
  const dispatch = useDispatch()
  const user = useSelector((state) => state.userInfo);
  const searchParams = useSearchParams();
  const paymentStatus = searchParams.get("payment");
  const [subscription,setSubscription] = useState(null);

  // ✅ Fetch transactions on mount
  useEffect(() => {

    const fetchData = async()=>{
      const res = await fetch(`http://localhost:3000/`)
    }

    
  }, []);

  console.log(user)
  console.log(subscription)
 

  // const paymentData = async () => {
  //   const res = await fetch('')
  // }

  console.log(paymentStatus)

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
          className={`w-16 h-16 mx-auto mb-6 ${theme === "dark" ? "text-green-400" : "text-green-500"}`}
        />
        <h1 className="text-4xl font-extrabold mb-4">
          Payment Successful!
        </h1>
        <p className={`text-lg mb-8 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
          Thank you for subscribing. Your plan has been activated and you can now enjoy all the premium features.
        </p>
        <Link
          href="/plans"
          className={`inline-block px-8 py-4 rounded-2xl font-semibold text-lg transition
            ${theme === "dark" ? "bg-green-400 text-gray-900 hover:bg-green-500" : "bg-green-500 text-white hover:bg-green-600"}`}
        >
          Back to Plans
        </Link>
      </motion.div>
    </section>
  );
}
