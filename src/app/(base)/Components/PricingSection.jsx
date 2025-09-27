"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function PricingSection() {
  const plans = [
    {
      title: "Basic",
      price: "49",
      description: "Perfect for startups or small businesses wanting fraud protection.",
      features: [
        "Real-time fraud monitoring",
        "Basic anomaly detection",
        "Email alerts",
        "Up to 5,000 transactions/month",
        "Basic dashboard analytics",
        "Standard support (24-48h)",
      ],
      style: "bg-gray-800/70 backdrop-blur-md text-gray-100 shadow-lg hover:shadow-green-400/30",
      buttonColor: "bg-green-500 hover:bg-green-600 text-white",
    },
    {
      title: "Pro",
      price: "149",
      description: "Ideal for growing businesses needing advanced AI protection.",
      features: [
        "Everything in Basic",
        "AI-powered risk scoring",
        "Device fingerprinting",
        "API Access + Webhooks",
        "Up to 50,000 transactions/month",
        "Priority support",
      ],
      style: "bg-gray-900/80 backdrop-blur-md text-white shadow-2xl hover:shadow-green-400/50",
      buttonColor: "bg-green-500 hover:bg-green-600 text-white",
      highlight: true,
    },
    {
      title: "Enterprise",
      price: "Custom",
      description: "Best for enterprises handling high-volume, high-risk transactions.",
      features: [
        "Everything in Pro",
        "Dedicated fraud analyst",
        "Custom ML model training",
        "Unlimited transactions",
        "SLA-backed uptime guarantee",
        "24/7 premium support",
      ],
      style: "bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white shadow-2xl hover:shadow-pink-400/50", // Unique gradient
      buttonColor: "bg-pink-500 hover:bg-pink-600 text-white", // Unique button color
    },
  ];

  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-24 px-6 overflow-hidden">
      {/* Background Accent */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-green-400 via-transparent to-transparent"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-extrabold text-center mb-4 text-green-400 tracking-wide"
        >
          Subscription Plans
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-center text-gray-300 mb-16 max-w-2xl mx-auto text-lg"
        >
          Scale your business confidently with AI-driven fraud detection.
        </motion.p>

        <div className="grid gap-10 md:grid-cols-3">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
              className={`relative p-10 rounded-2xl transition-all duration-300 ${plan.style}`}
            >
              {plan.highlight && (
                <span className="absolute top-4 right-4 text-xs font-bold bg-green-400 text-gray-900 px-3 py-1 rounded-full shadow-md">
                  Most Popular
                </span>
              )}

              <h3 className="text-2xl font-semibold mb-3">{plan.title}</h3>
              <p className="opacity-80 mb-8">{plan.description}</p>

              <p className="text-5xl font-extrabold mb-8">
                {plan.price === "Custom" ? (
                  "Custom"
                ) : (
                  <>
                    ${plan.price}
                    <span className="text-lg font-medium opacity-70">/mo</span>
                  </>
                )}
              </p>

              <div className="border-t border-white/20 mb-8" />

              <ul className="space-y-4 mb-10">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={
                  plan.title === "Basic"
                    ? "/plans/basic"
                    : plan.title === "Pro"
                    ? "/plans/pro"
                    : "/plans/enterprise"
                }
                className={`px-6 py-3 rounded-lg font-semibold transition ${plan.buttonColor}`}
              >
                {plan.price === "Custom" ? "Contact Sales" : "Get Started"}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
