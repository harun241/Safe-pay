// FraudNetSection.jsx
"use client";

import React from "react";

const expertiseCards = [
  {
    icon: "💡",
    title: "AI & Machine Learning",
    description: "Custom models for your protection and threat detection."
  },
  {
    icon: "⚖️",
    title: "Intelligent Risk Decisioning",
    description: "Robust rules and transparent scoring for smarter decisions."
  },
  {
    icon: "🌐",
    title: "Global Anti-Fraud Network",
    description: "Collaborative insights across industries worldwide."
  },
  {
    icon: "💾",
    title: "Data Hub",
    description: "Seamless integrations with limitless options."
  }
];

const resourceCards = [
  {
    icon: "📋",
    title: "Case Management",
    description: "Manage and track all your fraud cases efficiently."
  },
  {
    icon: "🔄",
    title: "Data Orchestration",
    description: "Streamline and integrate data flows with ease."
  },
  {
    icon: "📊",
    title: "Advanced Analytics",
    description: "Gain insights from intelligent analytics dashboards."
  }
];

const Features = () => {
  return (
    <section className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-16 px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-12">
        {/* Left Column */}
        <div className="relative">
          <div className="absolute -top-10 -left-10 opacity-10 text-6xl select-none pointer-events-none">🛡️</div>
          <h2 className="text-3xl font-bold mb-4">Why safepay</h2>
          <p className="mb-6">
            Discover why businesses choose Fraud.net for cutting-edge fraud prevention, AI-driven insights, and reliable, real-time protection.
          </p>
          <a href="#" className="inline-block bg-indigo-600 hover:bg-indigo-500 px-5 py-2 rounded-md font-semibold mb-4">
            Learn More
          </a>
          <br />
          <a href="#" className="text-indigo-400 hover:underline">
            Benefits for AWS Customers →
          </a>
        </div>

        {/* Middle Column */}
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold mb-4">Our Expertise</h3>
          <div className="grid gap-4">
            {expertiseCards.map((card, idx) => (
              <div key={idx} className="flex items-start gap-4 bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition">
                <span className="text-3xl">{card.icon}</span>
                <div>
                  <h4 className="font-semibold text-lg">{card.title}</h4>
                  <p className="text-gray-300 text-sm">{card.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold mb-4">User Resources</h3>
          <div className="grid gap-4">
            {resourceCards.map((card, idx) => (
              <div key={idx} className="flex items-start gap-4 bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition">
                <span className="text-3xl">{card.icon}</span>
                <div>
                  <h4 className="font-semibold text-lg">{card.title}</h4>
                  <p className="text-gray-300 text-sm">{card.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
