


"use client";
import { useState } from "react";
import VideoChat from "./VideoChat";
import { v4 as uuidv4 } from "uuid";

const resources = [
  {
    id: uuidv4(),
    type: "Webinar",
    title: "Beyond Transaction Monitoring - The Strategic Shift to Entity Intelligence Fraud Prevention",
    desc: "Join fraud leaders from Planet & Brains Capital to learn why entity intelligence is giving forward-thinking companies a competitive edge.",
    image: "/images/webinar1.jpg",
  },
  {
    id: uuidv4(),
    type: "eBook",
    title: "Real-Time Payments - The Definitive Guide for Payments Leaders",
    desc: "Explore how payments leaders are tackling real-time fraud risks with AI, analytics, and modern RTP strategies.",
    image: "/images/ebook1.jpg",
  },
  {
    id: uuidv4(),
    type: "eBook",
    title: "Transforming Fraud Management - The Case for AI in Fraud Prevention",
    desc: "Discover how AI-powered fraud prevention transforms reactive security into proactive protection. Learn implementation strategies, cost benefits, and future trends.",
    image: "/images/ebook2.jpg",
  },
];

export default function AdditionalResources() {
  const [activeRoom, setActiveRoom] = useState(null);
  const [copiedRoom, setCopiedRoom] = useState(null);

  const handleCopy = (roomId) => {
    const link = `${window.location.origin}/video?room=${roomId}`;
    navigator.clipboard.writeText(link).then(() => {
      setCopiedRoom(roomId);
      setTimeout(() => setCopiedRoom(null), 2000); // hide after 2 sec
    });
  };

  return (
    <section className="bg-gray-100 dark:bg-gray-900 py-16 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
          Additional Resources
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-12">
          Support your business and bottom line with our expert resources
        </p>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((res) => {
            const roomId = `room-${res.id}`;
            const isActive = activeRoom === roomId;

            return (
              <div
                key={res.id}
                className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md hover:shadow-xl transition hover:-translate-y-1 flex flex-col justify-between h-full"
              >
                {/* Image */}
                {res.image && (
                  <img
                    src={res.image}
                    alt={res.title}
                    className="w-full aspect-[4/3] object-cover rounded-xl mb-3"
                  />
                )}

                <div>
                  <span className="text-sm font-semibold text-green-500">
                    {res.type}
                  </span>
                  <h3 className="text-lg font-bold mt-1 mb-1 text-gray-900 dark:text-white">
                    {res.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {res.desc}
                  </p>
                </div>

                {/* Webinar Buttons */}
                {res.type === "Webinar" ? (
                  isActive ? (
                    <div className="w-full mt-4">
                      <VideoChat roomId={roomId} />
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => setActiveRoom(null)}
                          className="px-4 py-2 bg-red-500 text-white rounded"
                        >
                          End Demo
                        </button>
                        <button
                          onClick={() => handleCopy(roomId)}
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
                      className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
                    >
                      Request a Demo
                    </button>
                  )
                ) : (
                  <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
                    {res.type === "eBook" ? "Get eBook" : "Learn More"}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

