"use client";
import React from "react";
import { motion } from "framer-motion";

const aboutCards = [
  {
    title: "Mission",
    description:
      "To provide a secure transaction environment for all users using AI-driven solutions.",
    icon: "🎯",
  },
  {
    title: "Vision",
    description:
      "To become the most trusted AI-powered platform for fraud detection worldwide.",
    icon: "🔮",
  },
  {
    title: "Values",
    description:
      "Trust, Security, Innovation, and Customer-first approach in all services.",
    icon: "💎",
  },
];

const AboutSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-20 px-6 overflow-hidden">
      {/* Background Accent */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-green-400 via-transparent to-transparent"></div>

      <div className="max-w-6xl mx-auto text-center relative z-10">
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-extrabold text-green-400 mb-6 tracking-wide"
        >
          About SafePay
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto mb-14"
        >
          SafePay is an AI-powered platform dedicated to securing online
          transactions. Our mission is to protect users from fraud using
          cutting-edge technology, real-time monitoring, and intelligent AI
          algorithms.
        </motion.p>

        {/* Cards */}
        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-8">
          {aboutCards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              viewport={{ once: true }}
              className="bg-gray-800/70 backdrop-blur-md shadow-lg rounded-2xl p-8 hover:shadow-green-400/30 hover:-translate-y-2 transition-all duration-300"
            >
              {/* Icon */}
              <div className="text-5xl mb-5 bg-gradient-to-tr from-green-400 to-green-200 text-transparent bg-clip-text">
                {card.icon}
              </div>
              <h2 className="text-2xl font-semibold text-green-400 mb-3">
                {card.title}
              </h2>
              <p className="text-gray-400 leading-relaxed">{card.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
