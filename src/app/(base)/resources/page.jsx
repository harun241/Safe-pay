// ResourcesSection.jsx
"use client";

import React from "react";

const resources = [
  {
    icon: "📄",
    title: "Case Studies",
    description: "Explore real-world examples of fraud prevention success."
  },
  {
    icon: "🧩",
    title: "Integration Guides",
    description: "Step-by-step tutorials to integrate FraudNet with your systems."
  },
  {
    icon: "🎓",
    title: "Training & Tutorials",
    description: "Learn from video tutorials and hands-on exercises."
  },
  {
    icon: "📚",
    title: "Documentation",
    description: "Detailed reference manuals for all FraudNet APIs."
  },
  {
    icon: "🛠️",
    title: "Developer Tools",
    description: "Utilities and SDKs to streamline development and testing."
  },
  {
    icon: "💬",
    title: "Community Forum",
    description: "Ask questions, share ideas, and collaborate with peers."
  }
];

const Resources = () => {
  return (
    <section className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">User Resources</h2>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resources.map((res, idx) => (
            <div key={idx} className="flex items-start gap-4 bg-gray-800 p-6 rounded-xl hover:bg-gray-700 transition">
              <span className="text-4xl">{res.icon}</span>
              <div>
                <h4 className="font-semibold text-xl mb-2">{res.title}</h4>
                <p className="text-gray-300 text-sm">{res.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Resources;
