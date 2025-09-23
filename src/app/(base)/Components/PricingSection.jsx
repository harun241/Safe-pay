"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function PricingSection() {
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
      highlight: false,
      style: "bg-white/70 dark:bg-gray-800/50 backdrop-blur-lg border-gray-200 dark:border-gray-700",
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
      style: "bg-gradient-to-b from-blue-600 to-blue-800 text-white border-blue-500 shadow-2xl",
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
      highlight: false,
      style: "bg-gradient-to-b from-gray-900 to-gray-800 text-white border-gray-700",
    },
  ];

  return (
    <section className=" py-20 relative overflow-hidden">
      {/* Background glow effect */}
      <div className="" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <h2 className="text-4xl font-bold text-center mb-4 text-gray-300 dark:text-white">
          Subscription Plans
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
          Scale your business confidently with AI-driven fraud detection.
        </p>

        <div className="grid gap-8 md:grid-cols-3">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.title}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              whileHover={{ y: -10 }}
              className={`relative p-8 rounded-2xl border transition-all duration-300 ${plan.style}`}
            >
              {plan.highlight && (
                <span className="absolute top-4 right-4 text-xs font-bold bg-yellow-400 text-gray-900 px-3 py-1 rounded-full shadow-md">
                  Most Popular
                </span>
              )}
              <h3 className="text-2xl font-semibold mb-2">{plan.title}</h3>
              <p className="opacity-80 mb-6">{plan.description}</p>
              <p className="text-5xl font-bold mb-6">
                {plan.price === "Custom" ? (
                  "Custom"
                ) : (
                  <>
                    ${plan.price}
                    <span className="text-lg opacity-70">/mo</span>
                  </>
                )}
              </p>

              {/* Divider */}
              <div className="border-t border-white/20 mb-6" />

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
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
                className={`border-2 border-white  font-semibold px-6 py-3 rounded-lg hover:bg-white hover:text-green-600 transition ${plan.highlight
                    ? "border-2 border-white  font-semibold px-6 py-3 rounded-lg hover:bg-white hover:text-green-600 transition"
                    : "border-2 border-white  font-semibold px-6 py-3 rounded-lg hover:bg-white hover:text-green-600 transition"
                  }`}
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
