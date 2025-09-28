"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useTheme } from "next-themes";
import Navbar from "../(base)/Components/Navbar";

const jobs = [
  {
    slug: "ml-engineer",
    title: "Machine Learning Engineer",
    department: "AI & Fraud Detection",
    location: "Remote / Dhaka HQ",
    type: "Full-time",
    description:
      "Design and deploy fraud detection ML models to protect global transactions.",
    responsibilities: [
      "Develop real-time fraud detection algorithms",
      "Work with large-scale transaction datasets",
      "Deploy models to production systems",
      "Collaborate with data scientists & security engineers",
    ],
    qualifications: [
      "BSc/MSc in CSE, EEE, or related field",
      "Strong Python & ML libraries (TensorFlow/PyTorch)",
      "Experience with anomaly detection",
      "Good problem-solving & teamwork skills",
    ],
  },
  {
    slug: "fraud-analyst",
    title: "Fraud Analyst",
    department: "Risk & Compliance",
    location: "Remote / Dhaka HQ",
    type: "Full-time",
    description:
      "Monitor suspicious transactions and fine-tune fraud detection strategies.",
    responsibilities: [
      "Analyze flagged transactions in real-time",
      "Investigate fraud patterns & behaviors",
      "Report fraudulent activity & trends",
      "Work closely with ML and risk teams",
    ],
    qualifications: [
      "Bachelor’s degree in Business, Finance, or CSE",
      "Strong analytical & critical thinking skills",
      "Understanding of fraud detection systems",
      "Good communication & reporting skills",
    ],
  },
  {
    slug: "security-engineer",
    title: "Security Engineer",
    department: "Cybersecurity",
    location: "Remote / Dhaka HQ",
    type: "Full-time",
    description:
      "Protect infrastructure and user data from threats and vulnerabilities.",
    responsibilities: [
      "Monitor systems for breaches",
      "Implement security best practices",
      "Conduct penetration testing",
      "Collaborate with fraud & dev teams",
    ],
    qualifications: [
      "Degree in CSE, Cybersecurity, or related",
      "Experience with cloud security",
      "Knowledge of encryption & secure APIs",
      "Familiarity with compliance standards",
    ],
  },
];

export default function CareersPage() {
  const [selectedJob, setSelectedJob] = useState(null);
  const { theme } = useTheme();

  // Dynamic classes based on theme
  const sectionBg =
    theme === "dark"
      ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white"
      : "bg-gray-50 text-gray-900";
  const subtitleColor = theme === "dark" ? "text-gray-300" : "text-gray-700";
  const cardBg = theme === "dark" ? "bg-gray-800/70" : "bg-white/80";
  const cardText = theme === "dark" ? "text-gray-300" : "text-gray-700";
  const cardShadow =
    theme === "dark"
      ? "shadow-2xl hover:shadow-green-400/40"
      : "shadow-md hover:shadow-green-200/40";
  const buttonBg = theme === "dark" ? "bg-green-400 text-gray-900" : "bg-green-500 text-white";
  const buttonHover = theme === "dark" ? "hover:bg-green-500" : "hover:bg-green-600";

  return (
    <section className={`relative w-full min-h-screen py-24 px-12 overflow-hidden ${sectionBg}`}>
      {/* Background Accent */}
      <Navbar></Navbar>
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-green-400 via-transparent to-transparent"></div>

      {!selectedJob ? (
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-extrabold text-green-400 mb-8 tracking-wide"
          >
            Careers at SafePay
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className={`text-lg md:text-xl leading-relaxed max-w-4xl mx-auto mb-20 ${subtitleColor}`}
          >
            Join us in building AI-powered fraud detection systems to secure the
            future of online transactions. Explore our open positions below.
          </motion.p>

          <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-12">
            {jobs.map((job, i) => (
              <motion.div
                key={job.slug}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className={`p-10 min-h-[300px] ${cardBg} backdrop-blur-md rounded-3xl ${cardShadow} cursor-pointer hover:-translate-y-3 transition-all`}
                onClick={() => setSelectedJob(job)}
              >
                <h3 className="text-2xl font-semibold mb-3 text-green-400">
                  {job.title}
                </h3>
                <p className={cardText + " mb-5"}>{job.department}</p>
                <p className={`${cardText} mb-1`}>📍 {job.location}</p>
                <p className={cardText}>⏱ {job.type}</p>
              </motion.div>
            ))}
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-4xl mx-auto"
        >
          <button
            onClick={() => setSelectedJob(null)}
            className="flex items-center gap-2 text-green-400 hover:underline mb-6"
          >
            <ArrowLeft size={18} /> Back to Careers
          </button>
          <h2 className="text-4xl font-bold mb-4 text-green-400">
            {selectedJob.title}
          </h2>
          <p className={cardText + " mb-6"}>{selectedJob.description}</p>

          <h3 className="text-2xl font-semibold mb-2 text-green-400">Responsibilities:</h3>
          <ul className={`list-disc list-inside mb-6 ${cardText}`}>
            {selectedJob.responsibilities.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>

          <h3 className="text-2xl font-semibold mb-2 text-green-400">Qualifications:</h3>
          <ul className={`list-disc list-inside mb-6 ${cardText}`}>
            {selectedJob.qualifications.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>

          <button className={`px-6 py-3 font-semibold rounded-lg shadow-lg ${buttonBg} ${buttonHover} transition`}>
            Apply Now
          </button>
        </motion.div>
      )}
    </section>
  );
}
