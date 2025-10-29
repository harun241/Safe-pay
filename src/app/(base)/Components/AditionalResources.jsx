

"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { v4 as uuidv4 } from "uuid";
import { motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";

const VideoChat = dynamic(() => import("./VideoChat"), { ssr: false });

const resources = [
  {
    id: uuidv4(),
    type: "Webinar",
    title:
      "Beyond Transaction Monitoring - The Strategic Shift to Entity Intelligence Fraud Prevention",
    desc:
      "Join fraud leaders from Planet & Brains Capital to learn why entity intelligence is giving forward-thinking companies a competitive edge.",
    image: "/images/webinar1.jpg",
  },
  {
    id: uuidv4(),
    type: "eBook",
    title: "Real-Time Payments - The Definitive Guide for Payments Leaders",
    desc:
      "Explore how payments leaders are tackling real-time fraud risks with AI, analytics, and modern RTP strategies.",
    image: "/images/ebook1.jpg",
  },
  {
    id: uuidv4(),
    type: "eBook",
    title:
      "Transforming Fraud Management - The Case for AI in Fraud Prevention",
    desc:
      "Discover how AI-powered fraud prevention transforms reactive security into proactive protection. Learn implementation strategies, cost benefits, and future trends.",
    image: "/images/ebook2.jpg",
  },
];

export default function AdditionalResources() {
  const [showModal, setShowModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [copiedRoom, setCopiedRoom] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [waiting, setWaiting] = useState(true);

  const { theme } = useTheme();

  // Lock scroll when modal is open
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showModal]);

  const handleCopyLink = (roomId) => {
    const link = `${window.location.origin}/video-call?room=${roomId}`;
    navigator.clipboard.writeText(link);
    setCopiedRoom(roomId);
    setTimeout(() => setCopiedRoom(null), 2000);
  };

  const toggleFullScreen = () => setIsFullScreen((prev) => !prev);

  return (
    <section className="py-16 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-5xl font-bold mb-10 text-cyan-500">
          Additional Resources
        </h2>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
          {resources.map((res, i) => {
            const roomId = `room-${res.id}`;
            return (
              <motion.div
                key={res.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                whileHover={{ scale: 1.03 }}
                className={`${theme === "dark" ? "bg-gray-700/30" : "bg-gray-100"
                  } p-4 rounded-xl shadow-md flex flex-col h-full transition-all border-y-10 border-cyan-500/30
                  `}
              >
                {res.image && (
                  <img
                    src={res.image}
                    alt={res.title}
                    className="w-full h-56 object-cover rounded-xl mb-4"
                  />
                )}
                <div className="flex flex-col flex-grow justify-between items-end text-left">
                  <div>
                    <span className="text-sm font-semibold text-green-500">
                      {res.type}
                    </span>
                    <h3
                      className={`text-lg font-bold mt-1 mb-2 line-clamp-2 transition-colors duration-300 ${theme === "dark" ? "text-white" : "text-gray-900"
                        }`}
                    >
                      {res.title}
                    </h3>

                    <p
                      className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"
                        } text-sm line-clamp-3`}
                    >
                      {res.desc}
                    </p>
                  </div>

                  <div className="mt-5">
                    {res.type === "Webinar" ? (
                      <button
                        type="button"
                        onClick={() => {
                          const roomId = `room-${res.id}`;
                          window.open(`/video-call/${roomId}`, "_blank"); // opens full-page video chat
                        }}
                        className="w-fit px-4 py-2 primary-button text-white font-semibold rounded-lg"
                      >
                        Request a Demo
                      </button>



                    ) : (
                      <button
                        onClick={() => window.open(res.link || "#", "_blank")}
                        className="w-fit px-4 py-2 primary-button rounded-lg text-white font-semibold "
                      >
                        {res.type === "eBook" ? "Get eBook" : "Learn More"}
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>


      {/* Video Chat Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-[999] bg-black/60 backdrop-blur-sm overflow-auto"
        >
          <div
            className="relative min-h-screen flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.25 }}
              className="relative bg-white dark:bg-gray-900 rounded-xl shadow-2xl
                   w-full max-w-3xl max-h-[90vh] overflow-auto p-5"
            >
              {/* Waiting Screen */}
              {waiting && (
                <div className="text-center py-6 text-gray-400">
                  <p className="text-lg">⏳ Waiting for other participant...</p>
                  <p className="text-sm mt-2">Share the invite link to start the call.</p>
                </div>
              )}

              {/* Video Chat */}
              {selectedRoom && (
                <VideoChat
                  roomId={selectedRoom}
                  onConnected={() => setWaiting(false)}
                  onEnd={() => setShowModal(false)}
                />
              )}

              {/* Modal Controls */}
              <div className="flex justify-between items-center pt-4">
                <div className="flex gap-3">
                  <button
                    onClick={() => handleCopyLink(selectedRoom)}
                    className="px-3 py-2 bg-blue-500 text-white rounded"
                  >
                    Copy Invite Link
                  </button>
                  {copiedRoom === selectedRoom && (
                    <span className="text-green-600 text-sm">✅ Copied!</span>
                  )}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => toggleFullScreen()}
                    className="px-3 py-2 bg-gray-600 text-white rounded"
                  >
                    {isFullScreen ? "Exit Full Screen" : "Full Screen"}
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-3 py-2 bg-red-500 text-white rounded"
                  >
                    End Call
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}





    </section>
  );
}
