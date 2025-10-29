"use client";

import { getDeviceInfo } from "@/lib/getDeviceInfo";
import { motion } from "framer-motion";
import { CheckCircle, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation"; // ✅ URL parameter নেওয়ার জন্য

export default function DynamicPlanPage() {
  const user = useSelector((state) => state.userInfo);
  const [loading, setLoading] = useState(false);

  // ✅ URL parameter থেকে plan নাম নেওয়া
  const { plan } = useParams();

  console.log("User Info:", user);
  console.log("Selected Plan from URL:", plan);

  const plans = [
    {
      title: "Basic",
      price: "49",
      description:
        "Perfect for startups or small businesses wanting fraud protection.",
      features: [
        "Real-time fraud monitoring",
        "Basic anomaly detection",
        "Email alerts",
        "Up to 5,000 transactions/month",
        "Basic dashboard analytics",
        "Standard support (24-48h)",
      ],
    },
    {
      title: "Pro",
      price: "149",
      description:
        "Ideal for growing businesses needing advanced AI protection.",
      features: [
        "Everything in Basic",
        "AI-powered risk scoring",
        "Device fingerprinting",
        "API Access + Webhooks",
        "Up to 50,000 transactions/month",
        "Priority support",
      ],
      highlight: true,
    },
    {
      title: "Enterprise",
      price: "Custom",
      description:
        "Best for enterprises handling high-volume, high-risk transactions.",
      features: [
        "Everything in Pro",
        "Dedicated fraud analyst",
        "Custom ML model training",
        "Unlimited transactions",
        "SLA-backed uptime guarantee",
        "24/7 premium support",
      ],
      customGradient: true,
    },
  ];

  // ✅ URL থেকে পাওয়া plan এর সাথে মিল খোঁজা
  const normalizedTitle = plan?.toLowerCase() || "basic";
  const selectedPlan =
    plans.find((p) => p.title.toLowerCase() === normalizedTitle) || plans[0];

  if (!user) {
    return (
      <section className="flex items-center justify-center h-screen bg-black text-white text-2xl">
        Please log in to view this page.
      </section>
    );
  }

  // ✅ Payment initiation handler
  const handlePayment = async () => {
    const deviceInfo = await getDeviceInfo();
    setLoading(true);

    const payload = {
      user_id: user.uid,
      amount: selectedPlan.price === "Custom" ? 0 : selectedPlan.price,
      subscriptionPlans: selectedPlan.title,
      value_a: user.uid,
      value_b: selectedPlan.title,
      value_c: deviceInfo.browser,
      value_d: user?.email,
    };

    try {
      const res = await fetch("/api/subscribe-plans/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (data.url) window.location.href = data.url;
      else alert("Payment initiation failed");
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative py-20  min-h-screen overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1
            className={`text-5xl font-extrabold mb-4 ${
              selectedPlan.customGradient
                ? "text-white"
                : selectedPlan.highlight
                ? "text-cyan-400"
                : "text-blue-400"
            }`}
          >
            {selectedPlan.title} Plan
          </h1>
          <p className="text-gray-300 max-w-3xl mx-auto text-lg">
            {selectedPlan.description}
          </p>
        </motion.div>

        {/* Plan Details */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`${
            selectedPlan.customGradient
              ? "border text-white"
              : "bg-gray-800/50 backdrop-blur-md text-white"
          } rounded-3xl shadow-2xl p-10 md:p-14 border border-gray-700 grid md:grid-cols-2 gap-10`}
        >
          {/* Features */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">Features Included</h2>
            <ul className="space-y-4">
              {selectedPlan.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-400 shrink-0 mt-1" />
                  <span className="text-gray-200 text-lg">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Payment Card */}
          <div className="flex flex-col items-center justify-center text-center">
            <p className="text-6xl font-bold mb-2">
              {selectedPlan.price === "Custom" ? (
                "Custom"
              ) : (
                <>
                  ${selectedPlan.price}
                  <span className="text-xl text-gray-300">/mo</span>
                </>
              )}
            </p>
            <p className="text-gray-300 mb-6">
              {selectedPlan.title === "Basic"
                ? "Essential protection for small businesses"
                : selectedPlan.title === "Pro"
                ? "Advanced AI protection for high-volume transactions"
                : "Tailored protection for enterprise-grade needs"}
            </p>

            <button
              disabled={loading}
              onClick={handlePayment}
              className={`inline-block px-10 py-4 rounded-2xl font-semibold text-lg shadow-lg transition ${
                selectedPlan.customGradient
                  ? "bg-white text-gray-900 hover:opacity-90"
                  : "bg-cyan-400 text-gray-900 hover:opacity-90"
              }`}
            >
              {loading
                ? "Redirecting..."
                : selectedPlan.price === "Custom"
                ? "Contact Sales"
                : "Subscribe Now"}
            </button>
          </div>
        </motion.div>

        {/* Extra Info Cards */}
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
              AI-driven monitoring ensures safe and reliable transactions for
              your business.
            </p>
          </div>
          <div className="p-6 bg-gray-800/60 rounded-2xl border border-gray-700">
            <Zap className="w-10 h-10 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Quick Setup</h3>
            <p className="text-gray-300 text-sm">
              Get started in minutes and start monitoring transactions
              immediately.
            </p>
          </div>
          <div className="p-6 bg-gray-800/60 rounded-2xl border border-gray-700">
            <CheckCircle className="w-10 h-10 text-green-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">AI-Powered Accuracy</h3>
            <p className="text-gray-300 text-sm">
              Our model continuously improves to detect new patterns of fraud
              behavior.
            </p>
          </div>
        </motion.div>

        {/* Back to Plans */}
        <div className="text-center mt-12">
          <Link href="/plans" className="text-blue-400 hover:underline text-sm">
            ← Back to Pricing Plans
          </Link>
        </div>
      </div>
    </section>
  );
}
