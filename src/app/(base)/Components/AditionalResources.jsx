"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";

// Import VideoChat only on client side (no SSR)
const VideoChat = dynamic(() => import("./VideoChat"), { ssr: false });

const resources = [
  {
    type: "Webinar",
    title:
      "Beyond Transaction Monitoring - The Strategic Shift to Entity Intelligence Fraud Prevention",
    description:
      "Join fraud leaders from Planet & Brains Capital to learn why entity intelligence is giving forward-thinking companies a competitive edge.",
    image: "/images/webinar1.jpg",
  },
  {
    type: "eBook",
    title: "Real-Time Payments - The Definitive Guide for Payments Leaders",
    description:
      "Explore how payments leaders are tackling real-time fraud risks with AI, analytics, and modern RTP strategies.",
    image: "/images/ebook1.jpg",
    link: "https://docs.google.com/document/d/1610jstDTIKAsK0dUSdPUd12BvKLAU10Btcpnem7lvSM/edit?usp=drive_link",
  },
  {
    type: "eBook",
    title:
      "Transforming Fraud Management - The Case for AI in Fraud Prevention",
    description:
      "Discover how AI-powered fraud prevention transforms reactive security into proactive protection. Learn implementation strategies, cost benefits, and future trends.",
    image: "/images/ebook2.jpg",
    link: "https://docs.google.com/document/d/1610jstDTIKAsK0dUSdPUd12BvKLAU10Btcpnem7lvSM/edit?usp=drive_link",
  },
];

export default function AdditionalResources() {
  const { theme } = useTheme();
  const [activeRoom, setActiveRoom] = useState(null);
  const [copiedRoom, setCopiedRoom] = useState(null);

  // Copy link function with fallback
  const handleCopyLink = (roomId) => {
    const link = `${window.location.origin}/video-call?room=${roomId}`;

    try {
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(link);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = link;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setCopiedRoom(roomId);
      setTimeout(() => setCopiedRoom(null), 2000);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  return (
    <section
      className={`relative w-full py-24 px-12 overflow-hidden transition-colors duration-500 ${
        theme === "dark"
          ? "bg-gradient-to-br from-gray-800 via-gray-800 to-gray-900 text-white"
          : "bg-gradient-to-br from-slate-100 via-white to-slate-100 text-slate-900"
      }`}
    >
      <div className="relative z-10 max-w-7xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={`text-5xl font-extrabold mb-4 ${
            theme === "dark" ? "text-green-400" : "text-cyan-600"
          }`}
        >
          Additional Resources
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className={`text-lg md:text-xl mb-16 max-w-4xl mx-auto ${
            theme === "dark" ? "text-gray-300" : "text-slate-600"
          }`}
        >
          Support your business and bottom line with our expert resources.
        </motion.p>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {resources.map((res, idx) => {
            const roomId = `room-${idx}`; // simple room ID for demo
            const isActive = activeRoom === roomId;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                viewport={{ once: true }}
                className={`rounded-3xl shadow-2xl p-6 flex flex-col justify-between hover:-translate-y-3 transition-all duration-300 h-full ${
                  theme === "dark"
                    ? "bg-gray-800/70 backdrop-blur-md hover:shadow-green-400/40"
                    : "bg-white border border-slate-200 hover:shadow-cyan-400/30"
                }`}
              >
                {res.image && (
                  <img
                    src={res.image}
                    alt={res.title}
                    className="w-full aspect-[4/3] object-cover rounded-2xl mb-4"
                  />
                )}

                <div className="text-left flex-1">
                  <span
                    className={`text-sm font-semibold ${
                      theme === "dark" ? "text-green-400" : "text-cyan-600"
                    }`}
                  >
                    {res.type}
                  </span>
                  <h3
                    className={`text-xl font-bold mt-1 mb-2 ${
                      theme === "dark" ? "text-green-400" : "text-cyan-700"
                    }`}
                  >
                    {res.title}
                  </h3>
                  <p
                    className={`text-sm ${
                      theme === "dark" ? "text-gray-300" : "text-slate-600"
                    }`}
                  >
                    {res.description}
                  </p>

                  {res.type === "Webinar" ? (
                    <>
                      {isActive ? (
                        <div className="mt-4">
                          <VideoChat roomId={roomId} />
                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() => setActiveRoom(null)}
                              className="px-4 py-2 bg-red-500 text-white rounded"
                            >
                              End Demo
                            </button>
                            <button
                              onClick={() => handleCopyLink(roomId)}
                              className="px-4 py-2 bg-blue-500 text-white rounded"
                            >
                              Copy Invite Link
                            </button>
                            {copiedRoom === roomId && (
                              <span className="text-green-600 text-sm font-medium">
                                ✅ Copied!
                              </span>
                            )}
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => setActiveRoom(roomId)}
                          className="mt-4 px-6 py-2 font-semibold rounded-lg shadow bg-green-400 text-gray-800 hover:bg-green-500 transition"
                        >
                          Request a Demo
                        </button>
                      )}
                    </>
                  ) : (
                    <button
                      onClick={() => window.open(res.link, "_blank")}
                      className="mt-4 px-6 py-2 font-semibold rounded-lg shadow transition bg-cyan-600 text-white hover:bg-cyan-700"
                    >
                      Get eBook
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
