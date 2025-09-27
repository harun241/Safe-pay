"use client";

import React from "react";
import { motion } from "framer-motion";

const resources = [
  {
    type: "Webinar",
    title: "Beyond Transaction Monitoring - The Strategic Shift to Entity Intelligence Fraud Prevention",
    description:
      "Join fraud leaders from Planet & Brains Capital to learn why entity intelligence is giving forward-thinking companies a competitive edge.",
    image: "/images/webinar1.jpg",
    link: "https://meet.google.com/session1", // live session link
  },
  {
    type: "eBook",
    title: "Real-Time Payments - The Definitive Guide for Payments Leaders",
    description:
      "Explore how payments leaders are tackling real-time fraud risks with AI, analytics, and modern RTP strategies.",
    image: "/images/ebook1.jpg",
    link: "https://meet.google.com/session2",
  },
  {
    type: "eBook",
    title: "Transforming Fraud Management - The Case for AI in Fraud Prevention",
    description:
      "Discover how AI-powered fraud prevention transforms reactive security into proactive protection. Learn implementation strategies, cost benefits, and future trends.",
    image: "/images/ebook2.jpg",
    link: "https://meet.google.com/session3",
  },
];

export default function AdditionalResources() {
  return (
    <section className="relative w-full py-24 px-12 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      {/* Background Accent */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-green-400 via-transparent to-transparent"></div>

      <div className="relative z-10 max-w-7xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-extrabold mb-4 text-green-400"
        >
          Additional Resources
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-gray-300 text-lg md:text-xl mb-16 max-w-4xl mx-auto"
        >
          Support your business and bottom line with our expert resources.
        </motion.p>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {resources.map((res, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              viewport={{ once: true }}
              className="bg-gray-800/70 backdrop-blur-md rounded-3xl shadow-2xl p-6 flex flex-col justify-between hover:shadow-green-400/40 hover:-translate-y-3 transition-all duration-300 h-full"
            >
              {/* Image */}
              {res.image && (
                <img
                  src={res.image}
                  alt={res.title}
                  className="w-full aspect-[4/3] object-cover rounded-2xl mb-4"
                />
              )}

              <div className="text-left flex-1">
                <span className="text-sm font-semibold text-green-400">{res.type}</span>
                <h3 className="text-xl font-bold mt-1 mb-2 text-green-400">{res.title}</h3>
                <p className="text-gray-300 text-sm">{res.description}</p>

                {/* Live session / external link button */}
                <button
                  onClick={() => window.open(res.link, "_blank")}
                  className="mt-4 px-6 py-2 bg-green-400 text-gray-900 font-semibold rounded-lg shadow hover:bg-green-500 transition self-start"
                >
                  Request a Demo
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
