// ImpactSection.jsx
"use client";

import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

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
    <section
      className="relative w-full py-24 px-12 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden"
      ref={ref}
    >
      {/* Background radial accent */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-green-400 via-transparent to-transparent"></div>

      <div className="relative z-10 max-w-7xl mx-auto text-center">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-extrabold mb-4 text-green-400"
        >
          Impact
        </motion.h2>

        {/* Mission */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-lg sm:text-xl max-w-4xl mx-auto mb-16 leading-relaxed text-gray-300"
        >
          "To ensure the integrity of payments worldwide by delivering real-time fraud, risk, and compliance solutions that reduce friction, build trust, and empower sustainable growth."
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
              className="bg-gray-800/70 backdrop-blur-md p-8 rounded-3xl shadow-2xl hover:shadow-green-400/40 hover:-translate-y-3 transition-all"
            >
              <h3 className="text-4xl md:text-5xl font-bold text-green-400 mb-2">
                {inView ? (
                  <CountUp start={0} end={item.value} duration={4} separator="," suffix={item.suffix} />
                ) : (
                  0
                )}
              </h3>
              <h4 className="text-2xl font-semibold mb-2">{item.label}</h4>
              <p className="text-gray-300 text-sm">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
