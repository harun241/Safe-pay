"use client";

import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

const stats = [
  {
    value: 185,
    suffix: "+",
    label: "Countries",
    description: "Solutions designed to adapt to global complexities.",
  },
  {
    value: 1100000,
    suffix: "+",
    label: "Merchants Protected",
    description: "Proven success across industries.",
  },
  {
    value: 1000000,
    suffix: "+",
    label: "Identities Tracked",
    description: "Global Digital Identity insights, at scale.",
  },
  {
    value: 600,
    suffix: "+",
    label: "Fraud Methodologies",
    description: "Comprehensive threat coverage.",
  },
];

const ImpactSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });
  const { theme } = useTheme();

  return (
    <section ref={ref} className="relative py-24 px-6 overflow-hidden">
      {/* Background radial accent */}
      <div
        className={`absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))]
          from-cyan-400 via-cyan-500 to-cyan-600`}
      ></div>

      <div className="relative z-10 max-w-7xl mx-auto text-center">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-extrabold mb-6 text-cyan-500"
        >
          Impact
        </motion.h2>

        {/* Mission */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className={`text-lg sm:text-xl max-w-4xl mx-auto mb-16 leading-relaxed
            ${theme === "dark" ? "text-gray-300" : "text-slate-700"}`}
        >
          "To ensure the integrity of payments worldwide by delivering real-time
          fraud, risk, and compliance solutions that reduce friction, build
          trust, and empower sustainable growth."
        </motion.p>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              viewport={{ once: true }}
              className={`p-8 rounded-3xl shadow-2xl transition-all backdrop-blur-md hover:-translate-y-3
                ${
                  theme === "dark"
                    ? "bg-gray-800/70 border border-gray-700 hover:shadow-cyan-400/40"
                    : "bg-white/70 border border-slate-200 hover:shadow-cyan-400/30"
                }`}
            >
              <h3 className="text-4xl md:text-5xl font-bold mb-2 text-cyan-500">
                {inView ? (
                  <CountUp
                    start={0}
                    end={item.value}
                    duration={4}
                    separator=","
                    suffix={item.suffix}
                  />
                ) : (
                  0
                )}
              </h3>
              <h4 className="text-2xl font-semibold mb-2 text-slate-900 dark:text-white">
                {item.label}
              </h4>
              <p
                className={`text-sm ${
                  theme === "dark" ? "text-gray-300" : "text-slate-600"
                }`}
              >
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
