"use client";

import { getDeviceInfo } from "@/lib/getDeviceInfo";
import { motion } from "framer-motion";
import { CheckCircle, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function BasicPlan() {
  const features = [
    "Fraud Risk Scoring for up to 1,000 transactions/month",
    "Email & Dashboard Alerts",
    "Basic Analytics Reports",
    "Standard Support (24-48h)",
  ];

    const dispatch = useDispatch();
    const user = useSelector((state) => state.userInfo);
    const [loading, setLoading] = useState(false);

    
    if(!user){
      return <h1> please login</h1>
    }


     // payment event
      const handlePayment = async (e) => {
        const deviceInfo = await getDeviceInfo();
    
        setLoading(true);
        const presentData = {
          user_id: user?.uid || "guest_demo",
          amount: 49,
          subscriptionPlans:"BasicPlan",
          ...deviceInfo,
        };
    
        try {
          const res = await fetch("/api/subscribe-plans/initiate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(presentData),
          });
    
          const data = await res.json();
          if (data.url) window.location.href = data.url;
          else alert("Payment initiation failed");
        } catch (err) {
          console.error("Payment error:", err);
          alert("Something went wrong");
        } finally {
          setLoading(false);
        }
      };








  return (
    <section className="relative py-20 bg-gradient-to-b from-gray-900 to-black text-white min-h-screen">
      <div className="max-w-5xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-extrabold mb-4 text-blue-400">Basic Plan</h1>
          <p className="text-gray-300 max-w-3xl mx-auto text-lg">
            Perfect for startups and small businesses looking to protect online transactions with AI-powered fraud detection.
          </p>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gray-800/50 backdrop-blur-md rounded-3xl shadow-2xl p-10 md:p-14 border border-gray-700 grid md:grid-cols-2 gap-10"
        >
          {/* Left: Features */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">Features Included</h2>
            <ul className="space-y-4">
              {features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-400 shrink-0 mt-1" />
                  <span className="text-gray-200 text-lg">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Pricing */}
          <div className="flex flex-col items-center justify-center text-center">
            <p className="text-6xl font-bold mb-2 text-blue-400">
              $49<span className="text-xl text-gray-300">/mo</span>
            </p>
            <p className="text-gray-300 mb-6">Essential protection for small businesses</p>
            <button
              disabled={loading}
              onClick={handlePayment}
              className="inline-block px-10 py-4 rounded-2xl bg-blue-400 text-gray-900 font-semibold text-lg shadow-lg hover:bg-blue-500 transition"
            >
              {loading ? "Redirecting..." : "Subscribe Now"}
              
            </button>
          </div>
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 grid md:grid-cols-3 gap-8 text-center"
        >
          <div className="p-6 bg-gray-800/60 rounded-2xl border border-gray-700">
            <ShieldCheck className="w-10 h-10 text-blue-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Secure Transactions</h3>
            <p className="text-gray-300 text-sm">
              AI-driven monitoring ensures safe and reliable transactions for small businesses.
            </p>
          </div>
          <div className="p-6 bg-gray-800/60 rounded-2xl border border-gray-700">
            <Zap className="w-10 h-10 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Quick Setup</h3>
            <p className="text-gray-300 text-sm">
              Get started in minutes and start monitoring transactions immediately.
            </p>
          </div>
          <div className="p-6 bg-gray-800/60 rounded-2xl border border-gray-700">
            <CheckCircle className="w-10 h-10 text-green-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Affordable Plan</h3>
            <p className="text-gray-300 text-sm">
              Small businesses can access essential features without breaking the bank.
            </p>
          </div>
        </motion.div>

        {/* Back link */}
        <div className="text-center mt-12">
          <Link
            href="/#pricing"
            className="text-blue-400 hover:underline text-sm"
          >
            ← Back to Pricing Plans
          </Link>
        </div>
      </div>
    </section>
  );
}
