"use client";

import React from "react";
import Link from "next/link";
import { Shield } from "lucide-react";

const footerLinks = {
  Solutions: ["Fraud", "Entity Risk", "Compliance"],
  Products: ["Enterprise Risk Management Platform", "Entity Screening", "Entity Monitoring", "Transaction Monitoring"],
  Technology: ["AI & Machine Learning", "Intelligent Risk Decisioning", "Global Anti-Fraud Network", "Data Hub", "Case Management & Reporting", "Data Orchestration", "Advanced Analytics"],
  Company: ["About Us", "Partnerships", "Newsroom", "Awards", "Careers", "Follow Us", "Contact Us"],
  Industries: ["Payments", "Financial Services", "Fintechs", "Commerce"],
};

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Logo */}
        <div className="flex flex-col items-start space-y-6 md:col-span-1">
          <Link href="/" className="flex items-center space-x-2">
            <Shield className="h-7 w-7 text-green-500" />
            <span className="font-bold text-xl">SafePay</span>
          </Link>

          <p className="text-gray-400 text-sm max-w-xs">
            Protecting your online transactions with AI-powered fraud detection.
          </p>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:col-span-2">
          {Object.entries(footerLinks).map(([section, links], idx) => (
            <div key={idx}>
              <h4 className="text-lg font-semibold mb-4">{section}</h4>
              <ul className="space-y-2 text-gray-300 text-sm">
                {links.map((link, i) => (
                  <li key={i} className="hover:text-green-500 transition cursor-pointer">{link}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter / Contact Box (Right) */}
        <div className="md:col-span-2 flex flex-col justify-start mt-8 md:mt-0">
          <h4 className="text-lg font-semibold mb-4">Subscribe to our newsletter</h4>
          <form className="space-y-4">
            <input
              type="email"
              placeholder="Corporate Email*"
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="First name*"
                className="w-1/2 p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="text"
                placeholder="Last name*"
                className="w-1/2 p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <select className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500">
              <option value="">Industry*</option>
              <option value="Payments">Payments</option>
              <option value="Financial Services">Financial Services</option>
              <option value="Fintechs">Fintechs</option>
              <option value="Commerce">Commerce</option>
            </select>
            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="mt-12 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} SafePay. All rights reserved.
      </div>
    </footer>
  );
}
