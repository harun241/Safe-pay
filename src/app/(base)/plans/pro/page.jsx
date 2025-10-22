"use client";

import { getDeviceInfo } from "@/lib/getDeviceInfo";
import { motion } from "framer-motion";
import { CheckCircle, ShieldCheck, Zap, Cpu, BarChart } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ProPlanPage() {
  const plan = {
    title: "Pro Plan",
    price: "149",
    description:
      "Designed for scaling businesses that need advanced AI-driven fraud detection, powerful analytics, and priority support.",
    features: [
      "Everything in Basic",
      "AI-powered risk scoring",
      "Device fingerprinting",
      "API Access + Webhooks",
      "Up to 50,000 transactions/month",
      "Priority support",
    ],
  };

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
            amount: 149,
            subscriptionPlans:"ProPlan",
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
    <section className="relative py-20 bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 text-sm font-semibold rounded-full bg-blue-600/30 border border-blue-500 text-blue-300 mb-4">
            Most Popular Choice
          </span>
          <h1 className="text-5xl font-extrabold mb-6">{plan.title}</h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            {plan.description}
          </p>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gradient-to-b from-blue-600 to-blue-800 rounded-3xl shadow-2xl p-10 border border-blue-500 grid md:grid-cols-2 gap-10"
        >
          {/* Left: Features */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">What’s included</h2>
            <ul className="space-y-4">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-300 shrink-0 mt-1" />
                  <span className="text-lg">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Pricing */}
          <div className="flex flex-col items-center justify-center text-center">
            <p className="text-6xl font-bold mb-2">
              ${plan.price}
              <span className="text-xl text-blue-200">/mo</span>
            </p>
            <p className="text-blue-200 mb-6">
              Advanced protection for scaling businesses
            </p>
            <button
              onClick={handlePayment}
              disabled={loading}
              className="inline-block px-10 py-4 rounded-2xl bg-white text-blue-700 font-semibold text-lg shadow-lg hover:bg-gray-100 transition"
            >
              {loading ? "Redirecting..." : "Get Started with Pro"}
              
            </button>
          </div>
        </motion.div>

        {/* Why Pro Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 grid md:grid-cols-3 gap-8 text-center"
        >
          <div className="p-6 bg-gray-800/50 rounded-2xl border border-gray-700">
            <ShieldCheck className="w-10 h-10 text-blue-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Stronger Protection</h3>
            <p className="text-gray-400 text-sm">
              Advanced fraud monitoring ensures every transaction is safe and
              trustworthy.
            </p>
          </div>
          <div className="p-6 bg-gray-800/50 rounded-2xl border border-gray-700">
            <Zap className="w-10 h-10 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Faster Response</h3>
            <p className="text-gray-400 text-sm">
              Priority support with quicker response times for growing businesses.
            </p>
          </div>
          <div className="p-6 bg-gray-800/50 rounded-2xl border border-gray-700">
            <CheckCircle className="w-10 h-10 text-green-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Scalable Solution</h3>
            <p className="text-gray-400 text-sm">
              Handle more transactions confidently with AI-powered scalability.
            </p>
          </div>
        </motion.div>

        {/* Extra Cards - Compare */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-20"
        >
          <h2 className="text-3xl font-bold text-center mb-10">Why upgrade to Pro?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 bg-gray-800/60 rounded-2xl border border-gray-700">
              <Cpu className="w-8 h-8 text-purple-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">AI-Powered Insights</h3>
              <p className="text-gray-400 text-sm">
                Get real-time fraud scoring and machine learning intelligence to
                stay ahead of attackers.
              </p>
            </div>
            <div className="p-8 bg-gray-800/60 rounded-2xl border border-gray-700">
              <BarChart className="w-8 h-8 text-green-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Advanced Analytics</h3>
              <p className="text-gray-400 text-sm">
                Dive deeper into transaction trends with advanced dashboards and
                reporting tools.
              </p>
            </div>
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
