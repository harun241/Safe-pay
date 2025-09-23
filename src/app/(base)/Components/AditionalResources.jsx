"use client";

import React from "react";

const resources = [
  {
    type: "Webinar",
    title: "Beyond Transaction Monitoring - The Strategic Shift to Entity Intelligence Fraud Prevention",
    description: "Join fraud leaders from Planet & Brains Capital to learn why entity intelligence is giving forward-thinking companies a competitive edge.",
    image: "/images/webinar1.jpg",
  },
  {
    type: "eBook",
    title: "Real-Time Payments - The Definitive Guide for Payments Leaders",
    description: "Explore how payments leaders are tackling real-time fraud risks with AI, analytics, and modern RTP strategies.",
    image: "/images/ebook1.jpg",
  },
  {
    type: "eBook",
    title: "Transforming Fraud Management - The Case for AI in Fraud Prevention",
    description: "Discover how AI-powered fraud prevention transforms reactive security into proactive protection. Learn implementation strategies, cost benefits, and future trends.",
    image: "/images/ebook2.jpg",
  },
];

export default function AdditionalResources() {
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
          {resources.map((res, idx) => (
            <div
              key={idx}
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
                <span className="text-sm font-semibold text-green-500">{res.type}</span>
                <h3 className="text-lg font-bold mt-1 mb-1 text-gray-900 dark:text-white">
                  {res.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {res.description}
                </p>
              </div>
              <button className="mt-4 text-green-500 font-semibold hover:underline self-start">
                Request a Demo
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
