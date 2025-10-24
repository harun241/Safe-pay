"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllSubscriptions } from "@/Redux/Slices/subscriptions";
import { useEffect } from "react";

export default function SuccessContent() {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const list = useSelector((state) => state.subscription);

  useEffect(() => {
    dispatch(fetchAllSubscriptions());
  }, [dispatch]);

  console.log("All Subscriptions:", list);

  return (
    <section
      className={`flex flex-col items-center justify-center min-h-screen px-6 py-24 transition-colors duration-500
        ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl w-full text-center bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-12 border border-gray-200 dark:border-gray-700"
      >
        <CheckCircle
          className={`w-16 h-16 mx-auto mb-6 ${theme === "dark" ? "text-green-400" : "text-green-500"
            }`}
        />
        <h1 className="text-4xl font-extrabold mb-4">
          Subscriptions Overview
        </h1>

        {status === "loading" && <p>Loading subscriptions...</p>}
        {status === "failed" && <p className="text-red-500">{error}</p>}

        {status === "succeeded" && list.length > 0 ? (
          <div className="overflow-x-auto mt-6">
            <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-700 text-left">
              <thead className="bg-gray-200 dark:bg-gray-700">
                <tr>
                  <th className="p-3 border">Transaction ID</th>
                  <th className="p-3 border">User ID</th>
                  <th className="p-3 border">Amount</th>
                  <th className="p-3 border">Payment Method</th>
                  <th className="p-3 border">Status</th>
                  <th className="p-3 border">Date</th>
                </tr>
              </thead>
              <tbody>
                {list.map((sub) => (
                  <tr key={sub.transaction_id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                    <td className="p-3 border">{sub.transaction_id}</td>
                    <td className="p-3 border">{sub.user_id}</td>
                    <td className="p-3 border">${sub.amount}</td>
                    <td className="p-3 border">{sub.payment_method}</td>
                    <td className="p-3 border">{sub.status}</td>
                    <td className="p-3 border">
                      {new Date(sub.timestamp).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          status === "succeeded" && <p>No subscriptions found.</p>
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
