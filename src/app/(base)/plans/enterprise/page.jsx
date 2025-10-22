"use client";

import { getDeviceInfo } from "@/lib/getDeviceInfo";
import { motion } from "framer-motion";
import {
  CheckCircle,
  ShieldCheck,
  Zap,
  Cpu,
  BarChart,
  Building2,
  Headphones,
  Lock,
  Users,
  Server,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function EnterprisePlanPage() {
  const plan = {
    title: "Enterprise Plan",
    price: "499",
    description:
      "Tailored for large organizations requiring enterprise-grade fraud prevention, compliance, and dedicated partnership.",
    features: [
      "Everything in Pro",
      "Unlimited transactions",
      "Dedicated account manager",
      "Custom AI model training",
      "Enterprise SLA (99.99% uptime)",
      "24/7 priority phone + chat support",
      "Compliance & audit reports",
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
          amount: 499,
          subscriptionPlans:"Enterprise Plan",
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
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-5 py-1.5 text-sm font-semibold rounded-full bg-purple-600/30 border border-purple-500 text-purple-300 mb-4">
            Enterprise Scale
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
          className="bg-gradient-to-b from-purple-700 to-purple-900 rounded-3xl shadow-2xl p-12 border border-purple-500 grid md:grid-cols-2 gap-12"
        >
          {/* Features */}
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

          {/* Pricing */}
          <div className="flex flex-col items-center justify-center text-center">
            <p className="text-6xl font-bold mb-2">
              ${plan.price}
              <span className="text-xl text-purple-200">/mo</span>
            </p>
            <p className="text-purple-200 mb-6">
              Enterprise-grade security, compliance, and scalability
            </p>
            <button
              onClick={handlePayment}
              disabled={loading}
              className="inline-block px-10 py-4 rounded-2xl bg-white text-purple-700 font-semibold text-lg shadow-lg hover:bg-gray-100 transition"
            >
              {loading ? "Redirecting..." : "Contact Sales"}
              
            </button>
          </div>
        </motion.div>
              <h2 className="text-3xl font-bold text-center my-10">
            Why Enterprises Choose Us
          </h2>
        {/* Why Enterprise Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 grid md:grid-cols-3 gap-8 text-center"
        >
          
          <div className="p-6 bg-gray-800/50 rounded-2xl border border-gray-700">
            <Building2 className="w-10 h-10 text-purple-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Enterprise Scale</h3>
            <p className="text-gray-400 text-sm">
              Handle millions of transactions monthly with zero performance drop.
            </p>
          </div>
          <div className="p-6 bg-gray-800/50 rounded-2xl border border-gray-700">
            <Headphones className="w-10 h-10 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Dedicated Support</h3>
            <p className="text-gray-400 text-sm">
              A dedicated account manager and 24/7 support team at your service.
            </p>
          </div>
          <div className="p-6 bg-gray-800/50 rounded-2xl border border-gray-700">
            <Lock className="w-10 h-10 text-green-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Compliance Ready</h3>
            <p className="text-gray-400 text-sm">
              SOC 2, PCI DSS, and GDPR-ready compliance with audit reporting.
            </p>
          </div>
        </motion.div>

        {/* Extra Cards - Customization & Analytics */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-10 grid md:grid-cols-2 gap-8"
        >
          <div className="p-8 bg-gray-800/60 rounded-2xl border border-gray-700">
            <Users className="w-8 h-8 text-blue-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Custom Integrations</h3>
            <p className="text-gray-400 text-sm">
              Integrate seamlessly with your internal systems, CRMs, and APIs.
            </p>
          </div>
          <div className="p-8 bg-gray-800/60 rounded-2xl border border-gray-700">
            <Server className="w-8 h-8 text-pink-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Advanced Infrastructure</h3>
            <p className="text-gray-400 text-sm">
              Enterprise SLA and dedicated cloud infrastructure ensure 99.99%
              uptime and global performance.
            </p>
          </div>
        </motion.div>

        {/* Back link */}
        <div className="text-center mt-12">
          <Link
            href="/#pricing"
            className="text-purple-400 hover:underline text-sm"
          >
            ← Back to Pricing Plans
          </Link>
        </div>
      </div>
    </section>
  );
}
