"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";

export default function PricingSection() {
  const { theme } = useTheme();

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
      customGradient: true, // Custom gradient flag
    },
  ];

  return (
    <section
      className={`relative py-24 px-6 overflow-hidden transition-colors duration-500
        ${theme === "dark" ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white"
                          : "bg-gradient-to-br from-slate-100 via-white to-slate-100 text-slate-900"}`}
    >
      {/* Background Accent */}
      <div
        className={`absolute inset-0 opacity-10 transition-colors duration-500
          ${theme === "dark" ? "bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-green-400 via-transparent to-transparent"
                              : "bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-400 via-transparent to-transparent"}`}
      ></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={`text-4xl md:text-5xl font-extrabold text-center mb-4 tracking-wide
            ${theme === "dark" ? "text-green-400" : "text-cyan-600"}`}
        >
          Subscription Plans
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className={`text-center mb-16 max-w-2xl mx-auto text-lg
            ${theme === "dark" ? "text-gray-300" : "text-slate-600"}`}
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
              className={`relative p-10 rounded-2xl transition-all duration-300 ${
                plan.customGradient
                  ? theme === "dark"
                    ? "bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white shadow-2xl hover:shadow-pink-400/50"
                    : "bg-gradient-to-r from-purple-400 via-pink-300 to-red-400 text-white shadow-2xl hover:shadow-pink-300/50"
                  : theme === "dark"
                  ? plan.highlight
                    ? "bg-gray-900/80 backdrop-blur-md text-white shadow-2xl hover:shadow-green-400/50"
                    : "bg-gray-800/70 backdrop-blur-md text-gray-100 shadow-lg hover:shadow-green-400/30"
                  : plan.highlight
                  ? "bg-white border border-slate-300 shadow-xl hover:shadow-cyan-400/30 text-slate-900"
                  : "bg-white border border-slate-100 shadow-md hover:shadow-cyan-300/20 text-slate-900"
              }`}
            >
              {plan.highlight && !plan.customGradient && (
                <span
                  className={`absolute top-4 right-4 text-xs font-bold px-3 py-1 rounded-full shadow-md
                    ${theme === "dark" ? "bg-green-400 text-gray-900" : "bg-cyan-500 text-white"}`}
                >
                  Most Popular
                </span>
              )}

              <h3 className={`text-2xl font-semibold mb-3 ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                {plan.title}
              </h3>
              <p className={`opacity-80 mb-8 ${theme === "dark" ? "text-gray-300" : "text-slate-600"}`}>
                {plan.description}
              </p>

              <p className={`text-5xl font-extrabold mb-8 ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                {plan.price === "Custom" ? "Custom" : <>${plan.price}<span className="text-lg font-medium opacity-70">/mo</span></>}
              </p>

              <div className={`border-t mb-8 ${theme === "dark" ? "border-white/20" : "border-slate-300"}`} />

              <ul className={`space-y-4 mb-10 ${theme === "dark" ? "text-gray-300" : "text-slate-700"}`}>
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle className={`w-5 h-5 shrink-0 ${theme === "dark" ? "text-green-400" : "text-cyan-600"}`} />
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
  className={`border-2 rounded-lg font-semibold px-6 py-3 transition hover:text-green-600 ${
    theme === "dark"
      ? "border-white text-white hover:bg-white"
      : "border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white"
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
