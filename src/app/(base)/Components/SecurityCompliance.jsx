"use client";

import { motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import { ShieldCheck, Lock, FileCheck, Key, Eye, Server } from "lucide-react";

export default function SecurityCompliance() {
  const { theme } = useTheme(); // 🌙 use the global theme

  const items = [
    {
      icon: <ShieldCheck className="w-10 h-10 text-cyan-500" />,
      title: "End-to-End Encryption",
      desc: "All sensitive data is encrypted in transit and at rest using AES-256 and TLS 1.3 standards, ensuring your transactions remain fully protected.",
    },
    {
      icon: <Lock className="w-10 h-10 text-cyan-400" />,
      title: "Zero-Trust Architecture",
      desc: "Access to our infrastructure follows the Zero-Trust principle — no one is trusted by default, minimizing risks of internal or external breaches.",
    },
    {
      icon: <FileCheck className="w-10 h-10 text-cyan-400" />,
      title: "Regulatory Compliance",
      desc: "We strictly adhere to global standards including PCI DSS, GDPR, and ISO/IEC 27001 to maintain compliance and operational excellence.",
    },
    {
      icon: <Key className="w-10 h-10 text-cyan-400" />,
      title: "AI-Driven Threat Detection",
      desc: "Our ML models continuously monitor transaction patterns to detect and prevent fraudulent activity in real time.",
    },
    {
      icon: <Eye className="w-10 h-10 text-cyan-400" />,
      title: "Continuous Monitoring",
      desc: "We maintain 24/7 monitoring with automated alerts to instantly respond to suspicious activities or vulnerabilities.",
    },
    {
      icon: <Server className="w-10 h-10 text-cyan-400" />,
      title: "Secure Infrastructure",
      desc: "Our servers are hosted in compliant, globally distributed data centers with multi-layered defense systems and advanced firewalls.",
    },
  ];

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
      className={`py-20 px-6 lg:px-20 text-center transition-colors duration-500`}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto "
      >
        {/* Heading */}
        <motion.h2
          variants={childVariants}
          className="text-4xl md:text-5xl font-extrabold mb-8 text-cyan-500"
        >
          Security & Compliance
        </motion.h2>

        {/* Description */}
        <motion.p
          variants={childVariants}
          className="text-lg md:text-xl max-w-3xl mx-auto mb-16 leading-relaxed"
        >
          At <span className="font-semibold text-cyan-400">SafePay</span>, security isn’t just a feature — it’s our
          foundation. Every transaction is protected by enterprise-grade encryption, AI-based fraud detection, and
          strict compliance standards.
        </motion.p>

        {/* Cards Grid */}
        <motion.div variants={containerVariants} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {items.map((item, i) => (
            <motion.div
              key={i}
              variants={childVariants}
              className={`relative border rounded-2xl p-8 text-left shadow-lg transition-all duration-300 group
                ${theme === "dark" ? " border-cyan-500 hover:shadow-cyan-500/30" : " border-cyan-500 hover:shadow-cyan-500/20 hover:-translate-y-2"}`}
            >

              <div className="flex items-center justify-center mb-6">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-3 leading-relaxed">{item.title}</h3>
              <p className="text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.div variants={childVariants} className="text-center mt-16">
          <p className="leading-relaxed text-sm">
            Certified for <span className="text-cyan-400 font-medium">PCI DSS</span>,{" "}
            <span className="text-cyan-400 font-medium">GDPR</span>, and{" "}
            <span className="text-cyan-400 font-medium">ISO/IEC 27001</span> standards.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
