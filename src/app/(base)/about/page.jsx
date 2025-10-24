"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Spinner from "../Components/Spinner";
import { Heart, Target, Gem } from "lucide-react";
import { useTheme } from "../Components/ThemeProvider";

const aboutCards = [
  {
    icon: <Target className="w-10 h-10 text-cyan-400" />,
    title: "Mission",
    description:
      "To provide a secure transaction environment for all users using AI-driven fraud detection and prevention systems.",
  },
  {
    icon: <Heart className="w-10 h-10 text-cyan-400" />,
    title: "Vision",
    description:
      "To become the world’s most trusted AI-powered platform ensuring digital financial safety and transparency for everyone.",
  },
  {
    icon: <Gem className="w-10 h-10 text-cyan-400" />,
    title: "Values",
    description:
      "Innovation, Trust, Security, and Customer-Centricity form the core of everything we do at SafePay.",
  },
];

export default function AboutSection() {
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.3 } },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <section
      className={`relative py-20 px-6 lg:px-20 text-center overflow-hidden 
      ${theme === "dark"
        ? "bg-gradient-to-br from-gray-950 via-gray-900 to-black"
        : "bg-gradient-to-br from-cyan-50 via-white to-green-50"
      } transition-colors duration-500`}
    >
      {loading && <Spinner />}

      {/* Animated Background Squares */}
      <div className="absolute inset-0 -z-10 overflow-hidden opacity-20">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
              scale: [0.8, 1.2, 0.8],
              rotate: [0, 90, 180],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
            className="absolute w-8 h-8 bg-cyan-400/10 rounded-lg"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          ></motion.div>
        ))}
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-6xl mx-auto relative z-10"
      >
        {/* Heading */}
        <motion.h1
          variants={childVariants}
          className="text-4xl md:text-5xl font-extrabold text-cyan-500 mb-6 tracking-wide"
        >
          About SafePay
        </motion.h1>

        {/* Description */}
        <motion.p
          variants={childVariants}
          className={`text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-14 
            ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
        >
          SafePay is an AI-driven platform that ensures secure and fraud-free
          digital transactions. We combine artificial intelligence, advanced
          encryption, and real-time monitoring to make your payments truly safe.
        </motion.p>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          className="grid sm:grid-cols-1 md:grid-cols-3 gap-10"
        >
          {aboutCards.map((card, i) => (
            <motion.div
              key={i}
              variants={childVariants}
              className={`rounded-2xl p-8 text-left border border-gray-800/50 
              shadow-lg transition-all duration-300 group 
              hover:border-cyan-400 hover:shadow-cyan-500/20 hover:-translate-y-2
              ${theme === "dark" ? "bg-gray-900/70" : "bg-white/70"}`}
            >
              <div className="flex items-center justify-center mb-6">
                {card.icon}
              </div>
              <h3
                className={`text-2xl font-semibold mb-3 
                ${theme === "dark" ? "text-white" : "text-gray-900"}`}
              >
                {card.title}
              </h3>
              <p
                className={`leading-relaxed 
                ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
              >
                {card.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
