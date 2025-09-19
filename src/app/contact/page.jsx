// ContactSection.jsx
"use client";

import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

const contactMethods = [
  {
    title: "Email",
    value: "support@safepay.com",
    icon: "📧",
    href: "mailto:support@safepay.com"
  },
  {
    title: "Phone",
    value: "+880 1234 567890",
    icon: "📞",
    href: "tel:+8801234567890"
  }
];

const socialLinks = [
  { icon: <FaFacebookF size={20} />, href: "https://facebook.com", bg: "bg-blue-600", hover: "hover:bg-blue-700" },
  { icon: <FaTwitter size={20} />, href: "https://twitter.com", bg: "bg-blue-400", hover: "hover:bg-blue-500" },
  { icon: <FaLinkedinIn size={20} />, href: "https://linkedin.com", bg: "bg-blue-700", hover: "hover:bg-blue-800" },
  { icon: <FaInstagram size={20} />, href: "https://instagram.com", bg: "bg-pink-500", hover: "hover:bg-pink-600" }
];

const ContactSection = () => {
  return (
    <section className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-16 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-green-500 mb-12">Contact Us</h1>

        {/* Contact Cards */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {contactMethods.map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              className="flex items-center gap-4 bg-gray-800 p-6 rounded-xl hover:bg-gray-700 transition justify-center"
            >
              <span className="text-4xl">{item.icon}</span>
              <div className="text-left">
                <h4 className="font-semibold text-xl mb-1">{item.title}</h4>
                <p className="text-gray-300">{item.value}</p>
              </div>
            </a>
          ))}
        </div>

        {/* Social Links */}
        <h2 className="text-2xl font-semibold mb-6">Follow Us</h2>
        <div className="flex justify-center gap-6">
          {socialLinks.map((social, idx) => (
            <a
              key={idx}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-white ${social.bg} p-3 rounded-full ${social.hover} transition`}
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
