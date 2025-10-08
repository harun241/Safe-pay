"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { v4 as uuidv4 } from "uuid";

const VideoChat = dynamic(() => import("@/app/(base)/Components/VideoChat"), { ssr: false });

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
  const [activeRoom, setActiveRoom] = useState(null);
  const [copiedRoom, setCopiedRoom] = useState(null);

  const handleCopyLink = (roomId) => {
    const link = `${window.location.origin}/video-call?room=${roomId}`;
    if (navigator.clipboard?.writeText) {
      navigator.clipboard
        .writeText(link)
        .then(() => {
          setCopiedRoom(roomId);
          setTimeout(() => setCopiedRoom(null), 2000);
        })
        .catch(() => fallbackCopy(link, roomId));
    } else {
      fallbackCopy(link, roomId);
    }
  };

  const fallbackCopy = (link, roomId) => {
    const ta = document.createElement("textarea");
    ta.value = link;
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand("copy");
      setCopiedRoom(roomId);
      setTimeout(() => setCopiedRoom(null), 2000);
    } catch {
      alert("Copy failed — please copy this link manually:\n\n" + link);
    } finally {
      document.body.removeChild(ta);
    }
  };

  return (
    <section className="bg-gray-100 dark:bg-gray-900 py-16 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Additional Resources</h2>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((res, idx) => {
            const roomId = `room-${res.id}`;
            const isActive = activeRoom === roomId;

            return (
              <div key={res.id} className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md transition hover:-translate-y-1">
                {res.image && <img src={res.image} alt={res.title} className="w-full aspect-[4/3] object-cover rounded-xl mb-3" />}
                <div className="text-left flex-1">
                  <span className="text-sm font-semibold text-green-500">{res.type}</span>
                  <h3 className="text-lg font-bold mt-1 mb-1">{res.title}</h3>
                  <p className="text-sm text-gray-600">{res.desc}</p>
                </div>

                {res.type === "Webinar" ? (
                  isActive ? (
                    <div className="mt-4">
                      <VideoChat roomId={roomId} />
                      <div className="flex items-center gap-2 mt-2">
                        <button onClick={() => setActiveRoom(null)} className="px-4 py-2 bg-red-500 text-white rounded">End Demo</button>
                        <button onClick={() => handleCopyLink(roomId)} className="px-4 py-2 bg-blue-500 text-white rounded">Copy Invite Link</button>
                        {copiedRoom === roomId && <span className="text-green-600 text-sm">✅ Copied!</span>}
                      </div>
                    </div>
                  ) : (
                    <button onClick={() => setActiveRoom(roomId)} className="mt-4 px-4 py-2 bg-green-600 text-white rounded">Request a Demo</button>
                  )
                ) : (
                  <button onClick={() => window.open(res.link || "#", "_blank")} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">{res.type === "eBook" ? "Get eBook" : "Learn More"}</button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
