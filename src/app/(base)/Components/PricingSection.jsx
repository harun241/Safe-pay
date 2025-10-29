"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { useTheme } from "./ThemeProvider";

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
    <section className="py-20 relative">
      {/* Background Accent */}
      <div
        className={`absolute inset-0 opacity-10 transition-colors duration-500
          ${theme === "dark"
            ? "bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-green-400 via-transparent to-transparent"
            : "bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-400 via-transparent to-transparent"
          }`}
      ></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl text-center font-extrabold mb-6 text-cyan-500"
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

        {/* Cards Grid */}
        <div className="grid gap-10 md:grid-cols-3">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
              className={`relative p-10 rounded-2xl transition-all duration-300 ${plan.customGradient
                  ? "border-y-10 border-x-2 border-cyan-500 text-white shadow-lg hover:shadow-cyan-400/50"
                  : theme === "dark"
                    ? plan.highlight
                      ? "border-y-10   bg-cyan-500/30  text-white shadow-xl hover:shadow-cyan-400/30"
                      : "border border-cyan-500 text-gray-100 shadow-md hover:shadow-cyan-400/30"
                    : plan.highlight
                      ? "bg-gray-300 border-cyan-400 text-slate-900 shadow-xl hover:shadow-cyan-400/30"
                      : "bg-white border-slate-200 text-slate-900 shadow-md hover:shadow-cyan-300/20"
                }`}
            >
              {plan.customGradient &&
                <>
                  {/* Animated gradient orbs */}
                  <div
                    className="absolute -top-10 left-10 w-72 h-72 bg-cyan-600/20 rounded-full blur-3xl"
                  />
                  <div
                    className="absolute bottom-0 right-10 w-60 h-60 bg-cyan-500/20 rounded-full blur-3xl"
                  />

                </>}

              {plan.highlight && !plan.customGradient && (
                <span
                  className={`absolute top-4 right-4 text-xs font-bold px-3 py-1 rounded-full shadow-md
                    ${theme === "dark" ? "bg-cyan-500 text-black" : "bg-cyan-500 text-black"}`}
                >
                  Most Popular
                </span>
              )}

              <h3
                className={`text-2xl font-semibold mb-3 ${plan.customGradient
                    ? "text-white"
                    : theme === "dark"
                      ? "text-gray-300"
                      : "text-slate-600"
                  }`}
              >
                {plan.title}
              </h3>

              <p
                className={`opacity-80 mb-8 ${plan.customGradient
                    ? "text-white"
                    : theme === "dark"
                      ? "text-gray-300"
                      : "text-slate-800"
                  }`}
              >
                {plan.description}
              </p>

              <p
                className={`text-5xl font-extrabold mb-8 ${plan.customGradient
                    ? "text-white"
                    : theme === "dark"
                      ? "text-gray-300"
                      : "text-slate-800"
                  }`}
              >
                {plan.price === "Custom" ? (
                  "Custom"
                ) : (
                  <>
                    ${plan.price}
                    <span className="text-lg font-medium opacity-70">/mo</span>
                  </>
                )}
              </p>

              <div className={`border-t mb-8 ${theme === "dark" ? "border-white/20" : "border-slate-300"}`} />

              <ul className={`space-y-4 mb-10 ${theme === "dark" ? "text-gray-300" : "text-slate-700"}`}>
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle
                      className={`w-5 h-5 shrink-0 ${plan.customGradient
                          ? "text-white"
                          : theme === "dark"
                            ? "text-gray-300"
                            : "text-slate-800"
                        }`}
                    />
                    <span
                      className={`${plan.customGradient
                          ? "text-white"
                          : theme === "dark"
                            ? "text-gray-300"
                            : "text-slate-800"
                        }`}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href={`/plans/${plan.title.toLowerCase()}`}
                className={`border-2 rounded-lg font-semibold px-6 py-3 transition
                  ${plan.customGradient
                    ? "border-white text-white hover:bg-white hover:text-gray-900"
                    : theme === "dark"
                      ? "border-white text-white hover:bg-white hover:text-gray-900"
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
