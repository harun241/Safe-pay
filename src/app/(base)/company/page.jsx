// OurCompanySection.jsx
"use client";

import React from "react";
import Link from "next/link"; // Next.js route এর জন্য

const companySections = [
  {
    title: "About Us",
    description: "Our vision and mission",
    icon: "🏢",
    href: "/about"  // route add
  },
  {
    title: "Awards",
    description: "Achievements & Recognition",
    icon: "🏆"
  },
  {
    title: "Partnerships",
    description: "Collaborations to drive innovation",
    icon: "🤝"
  },
  {
    title: "Careers",
    description: "Join our world-class team",
    icon: "💼"
    href: "/careers"
  },
  {
    title: "Newsroom",
    description: "Our latest news and coverage",
    icon: "📰"
  },
  {
    title: "Contact Us",
    description: "We’re here, connect with us anytime",
    icon: "✉️",
    href: "/contact"  // route add
  }
];

const OurCompanySection = () => {
  return (
    <section className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">Our -Company</h2>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {companySections.map((item, idx) => (
            item.href ? (
              <Link key={idx} href={item.href} className="flex items-start gap-4 bg-gray-800 p-6 rounded-xl hover:bg-gray-700 transition">
                <span className="text-4xl">{item.icon}</span>
                <div>
                  <h4 className="font-semibold text-xl mb-2">{item.title}</h4>
                  <p className="text-gray-300 text-sm">{item.description}</p>
                </div>
              </Link>
            ) : (
              <div key={idx} className="flex items-start gap-4 bg-gray-800 p-6 rounded-xl hover:bg-gray-700 transition">
                <span className="text-4xl">{item.icon}</span>
                <div>
                  <h4 className="font-semibold text-xl mb-2">{item.title}</h4>
                  <p className="text-gray-300 text-sm">{item.description}</p>
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurCompanySection;
