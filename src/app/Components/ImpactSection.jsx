// ImpactSection.jsx
"use client";

import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const stats = [
  { value: 185, suffix: "+", label: "Countries", description: "Solutions designed to adapt to global complexities." },
  { value: 1100000, suffix: "+", label: "Merchants Protected", description: "Proven success across industries." },
  { value: 1000000000, suffix: "+", label: "Identities Tracked", description: "Global Digital Identity insights, at scale." },
  { value: 600, suffix: "+", label: "Fraud Methodologies", description: "Comprehensive threat coverage." },
];

const ImpactSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <section className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-20 px-6" ref={ref}>
      <div className="max-w-7xl mx-auto text-center">
        {/* Title */}
        <h2 className="text-4xl font-bold mb-4">Impact</h2>

        {/* Mission */}
        <p className="text-lg sm:text-xl max-w-3xl mx-auto mb-12 leading-relaxed text-gray-300">
          "To ensure the integrity of payments worldwide by delivering real-time fraud, risk, and compliance solutions that reduce friction, build trust, and empower sustainable growth."
        </p>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((item, idx) => (
            <div key={idx} className="bg-gray-800 p-6 rounded-xl hover:bg-gray-700 transition">
              <h3 className="text-3xl font-bold text-green-500 mb-2">
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
              <h4 className="text-xl font-semibold mb-2">{item.label}</h4>
              <p className="text-gray-300 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
