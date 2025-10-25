"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";

const experts = [
  {
    name: "Rajaul islam",
    role: "Frontend Developer",
    image: "/experts/ayesha.jpg",
  },
  {
    name: "Mr.Muksitul Islam",
    role: "Machine Learning Engineer",
    image: "/experts/muksitul.jpg",
  },
  {
    name: "Mr.Harun Or Rashid",
    role: "Frontend Developer",
    image: "/experts/harun.jpg",
  },
   {
    name: "Mr.Jakaria islam",
    role: "Backend Developer",
    image: "/experts/jakaria.jpg",
  },
];

export default function OurExpertsSection() {
  const { theme } = useTheme();

  const sectionBg = theme === "dark" ? "" : "";
  const subtitleColor = theme === "dark" ? "text-gray-300" : "text-gray-700";
  const cardBg = theme === "dark" ? "bg-gray-800/70" : "bg-white/80";
  const cardShadow = theme === "dark" ? "shadow-2xl hover:shadow-cyan-400/30" : "shadow-md hover:shadow-cyan-200/40";

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <section className={`py-20 px-6 md:px-12 relative overflow-hidden ${sectionBg}`}>
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-500 via-transparent to-transparent"></div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="max-w-7xl mx-auto text-center relative z-10"
      >
        <motion.h2
          variants={cardVariants}
          className="text-4xl md:text-5xl font-extrabold mb-6 text-cyan-500"
        >
          Our Experts
        </motion.h2>
        <motion.p
          variants={cardVariants}
          className={`text-lg md:text-xl mb-16 max-w-3xl mx-auto ${subtitleColor}`}
        >
          Meet the talented team behind SafePay, dedicated to securing online transactions with AI and cybersecurity expertise.
        </motion.p>

        <motion.div
          variants={containerVariants}
          className="grid sm:grid-cols-1 md:grid-cols-3 gap-8"
        >
          {experts.map((expert, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              className={`rounded-2xl p-6 ${cardBg} ${cardShadow} transition-all duration-300 cursor-pointer`}
            >
              <img
                src={expert.image}
                alt={expert.name}
                className="w-32 h-32 rounded-full mx-auto mb-5 object-cover shadow-lg"
              />
              <h3 className="text-xl font-semibold text-cyan-500 mb-1">{expert.name}</h3>
              <p className={subtitleColor}>{expert.role}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
