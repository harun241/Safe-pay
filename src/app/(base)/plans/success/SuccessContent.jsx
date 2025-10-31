"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { useTheme } from "../../Components/ThemeProvider";

export default function SuccessPage() {
  const { theme } = useTheme();
  const user = useSelector((state) => state.userInfo);
  const searchParams = useSearchParams();
  const paymentStatus = searchParams.get("payment");

  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [prediction, setPrediction] = useState(null);

  const uid = user?.uid;

  useEffect(() => {
    if (paymentStatus !== "success" || !uid) return;

    const fetchLatestSubscription = async () => {
      try {
        // 🔹 Get user data
        const resp = await fetch(`/api/users?uid=${uid}`);
        const userData = await resp.json();
        // 🔹 Get latest transaction
        const res = await fetch(`/api/subscriptions?user_id=${uid}`);
        const data = await res.json();

        // 🔹 Get fraudDetactionApi
        const apiData = await fetch(`/api/fraudDetactionApis`);
        const api = await apiData.json();

        console.log(api);
        console.log(data);


        if (!res.ok) {
          console.error("Error:", data.error || data.message);
          setLoading(false);
          return;
        }

        console.log("user data", userData.user?.subscriptionPlans);
        console.log(data.subscriptions);

        const latest = data.subscriptions
          ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];

        setSubscription(latest);
        console.log(latest);

        // 🔹 Call prediction API
        const predictionRes = await fetch(
          "https://freud-detection-ai-model.onrender.com/predict",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(latest),
          }
        );

        const predictionData = await predictionRes.json();
        console.log(predictionData)
        setPrediction(predictionData.prediction || "unknown");
        setLoading(false);

        // 🔹 Show toast
        if (predictionData.prediction === "Real") {
          toast.success("✅ Transaction verified as REAL");
        } else if (predictionData.prediction === "Fraud") {
          toast.error("⚠️ Transaction flagged as FRAUD");
        }
      } catch (err) {
        console.error("Request failed:", err);
        setLoading(false);
        toast.error("Prediction request failed!");
      }
    };

    fetchLatestSubscription();
  }, [uid, paymentStatus]);



  if (loading) {
    return (
      <section
        className={`flex items-center justify-center min-h-screen transition-colors duration-500
          ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full"
        />
      </section>
    );
  }

  return (
    <>
      <Toaster position="top-right" />
      <section
        className={`flex items-center justify-center min-h-screen px-6 py-24 transition-colors duration-500
          ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className={`max-w-lg w-full text-center rounded-3xl shadow-2xl p-12 border transition-all ${prediction === "Real"
            ? theme === "dark"
              ? "bg-gray-800 border-green-400"
              : "bg-white border-green-500"
            : theme === "dark"
              ? "bg-gray-800 border-red-400"
              : "bg-white border-red-500"
            }`}
        >
          {prediction === "Real" ? (
            <CheckCircle
              className={`w-16 h-16 mx-auto mb-6 ${theme === "dark" ? "text-green-400" : "text-green-500"
                }`}
            />
          ) : (
            <AlertCircle
              className={`w-16 h-16 mx-auto mb-6 ${theme === "dark" ? "text-red-400" : "text-red-500"
                }`}
            />
          )}

          <h1 className="text-4xl font-extrabold mb-4">
            {prediction === "Real" ? "Transaction Verified!" : "⚠️ Potential Fraud Detected"}
          </h1>

          <p
            className={`text-lg mb-8 ${theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
          >
            {prediction === "Real"
              ? "Your transaction is authentic. Enjoy all premium features securely."
              : "This transaction may be fraudulent. Please contact support immediately."}
          </p>

          {subscription && (
            <div
              className={`text-left mb-6 p-4 rounded-lg border ${prediction === "Real"
                ? theme === "dark"
                  ? "border-green-400 bg-gray-700"
                  : "border-green-500 bg-green-50"
                : theme === "dark"
                  ? "border-red-400 bg-gray-700"
                  : "border-red-500 bg-red-50"
                }`}
            >
              <p>
                <strong>Transaction ID:</strong> {subscription.transaction_id}
              </p>
              <p>
                <strong>Transacton Statement:</strong> {prediction || "N/A"} Trasactons
              </p>
              <p>
                <strong>Amount:</strong> ${subscription.amount || "0"}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(subscription.timestamp).toLocaleString()}
              </p>
            </div>
          )}

          <Link
            href="/"
            className={`inline-block px-8 py-4 rounded-2xl font-semibold text-lg transition
              ${prediction === "Real"
                ? theme === "dark"
                  ? "bg-green-400 text-gray-900 hover:bg-green-500"
                  : "bg-green-500 text-white hover:bg-green-600"
                : theme === "dark"
                  ? "bg-red-400 text-gray-900 hover:bg-red-500"
                  : "bg-red-500 text-white hover:bg-red-600"
              }`}
          >
            Back to Home
          </Link>
        </motion.div>
      </section>
    </>
  );
}
