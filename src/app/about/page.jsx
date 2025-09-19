// AboutSection.jsx
"use client";

import React from "react";

const aboutCards = [
  {
    title: "Mission",
    description: "To provide a secure transaction environment for all users using AI-driven solutions.",
    icon: "🎯"
  },
  {
    title: "Vision",
    description: "To become the most trusted AI-powered platform for fraud detection worldwide.",
    icon: "🔮"
  },
  {
    title: "Values",
    description: "Trust, Security, Innovation, and Customer-first approach in all services.",
    icon: "💎"
  }
];

const AboutSection = () => {
  return (
    <section className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-16 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-green-500 mb-6">About SafePay</h1>
        <p className=" dark:text-gray-300 text-lg md:text-xl leading-relaxed mb-12">
          SafePay is an AI-powered platform dedicated to securing online transactions.
          Our mission is to protect users from fraud using cutting-edge technology, 
          real-time monitoring, and intelligent AI algorithms.
        </p>

        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-8">
          {aboutCards.map((card, idx) => (
            <div key={idx} className="bg-gray-900 dark:bg-gray-800 shadow-md rounded-xl p-6 hover:shadow-xl transition">
              <span className="text-4xl mb-4 block">{card.icon}</span>
              <h2 className="text-2xl font-semibold text-green-500 mb-2">{card.title}</h2>
              <p className="text-gray-600 dark:text-gray-300">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
