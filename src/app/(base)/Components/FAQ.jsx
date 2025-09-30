"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "How does Darwinium help Fintechs prevent fraud?",
    a: "Darwinium provides real-time, AI-driven fraud detection across the entire customer journey. It continuously analyzes user behavior, device intelligence, and transaction context to block fraudulent activity while keeping genuine customers safe.",
  },
  {
    q: "Can Darwinium detect subtle automation or scripted attacks on our platform?",
    a: "Yes. Darwinium uses advanced behavioral biometrics, velocity checks, and bot-detection models to identify even the most subtle scripted or automated attacks, including credential stuffing, account takeover attempts, and fake account creation.",
  },
  {
    q: "How does Darwinium support regulatory compliance and data privacy in financial services?",
    a: "Darwinium is designed with compliance in mind. It helps Fintechs meet regulatory obligations such as PSD2, PCI DSS, and GDPR by offering strong authentication, secure data handling, and privacy-preserving risk assessments.",
  },
  {
    q: "What types of financial fraud can Darwinium detect and mitigate?",
    a: (
      <ul className="list-disc list-inside mt-2 space-y-1">
        <li>Account takeover (ATO)</li>
        <li>Identity theft and synthetic identities</li>
        <li>Payment fraud and transaction laundering</li>
        <li>Loan and credit application fraud</li>
        <li>Bot-driven fraud schemes</li>
      </ul>
    ),
  },
  {
    q: "How quickly can we integrate Darwinium into our existing Fintech stack?",
    a: "Darwinium offers flexible deployment options, including API and SDK integrations, that allow Fintechs to get up and running in days—not months—without disrupting existing workflows.",
  },
  {
    q: "Does Darwinium slow down transaction processing or impact customer experience?",
    a: "No. Darwinium operates in real time with minimal latency. It silently analyzes risk signals in the background, ensuring that genuine users experience seamless and frictionless transactions.",
  },
  {
    q: "How does Darwinium differentiate between risky and legitimate users?",
    a: "By combining behavioral analytics, device fingerprinting, geolocation intelligence, and machine learning models, Darwinium builds a holistic risk profile for every user session. This enables accurate separation of fraudsters from genuine customers.",
  },
  {
    q: "Can Darwinium trigger custom actions for flagged transactions?",
    a: "Yes. Fintechs can configure custom workflows for flagged activities—such as step-up authentication, transaction holds, or alerting fraud teams—ensuring flexibility in how fraud risks are managed.",
  },
  {
    q: "What insights does Darwinium provide for fraud investigation and reporting?",
    a: "Darwinium delivers detailed case reports, risk scores, and forensic-level insights into user sessions. These help fraud teams investigate incidents efficiently, create compliance-ready reports, and continuously refine fraud strategies.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="max-w-4xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-8 ">
        Frequently Asked Questions (FAQs)
      </h2>

      <div className="space-y-4">
        {faqs.map((item, index) => (
          <div
            key={index}
            className="rounded-2xl border shadow-sm bg-white dark:bg-gray-900 dark:border-gray-700 transition-colors"
          >
            <button
              onClick={() => toggle(index)}
              className="w-full px-4 py-3 text-left text-lg font-medium text-gray-900 dark:text-white"
            >
              {item.q}
            </button>

            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="px-4 pb-4 text-gray-700 dark:text-gray-300"
                >
                  {item.a}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

  
    </section>
  );
}
