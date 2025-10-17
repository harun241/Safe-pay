"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Shield, ArrowRight, Loader2, CheckCircle } from "lucide-react";
import { FaLinkedin, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useTheme } from "next-themes";
import emailjs from "@emailjs/browser";
import { motion, AnimatePresence } from "framer-motion";

const footerLinks = {
  Solutions: ["Fraud", "Entity Risk", "Compliance"],
  Products: [
    "Enterprise Risk Management Platform",
    "Entity Screening",
    "Entity Monitoring",
    "Transaction Monitoring",
  ],
  Technology: [
    "AI & Machine Learning",
    "Intelligent Risk Decisioning",
    "Global Anti-Fraud Network",
    "Data Hub",
  ],
  Company: ["About Us", "Partnerships", "Careers", "Contact Us"],
  Industries: ["Payments", "Financial Services", "Fintechs", "Commerce"],
};

const socialLinks = [
   { icon: <FaXTwitter className="h-5 w-5" />, href: "https://x.com", name: "Twitter" },
  { icon: <FaLinkedin className="h-5 w-5" />, href: "https://www.linkedin.com", name: "LinkedIn" },
  { icon: <FaYoutube className="h-5 w-5" />, href: "https://www.youtube.com", name: "YouTube" },
];

export default function Footer() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscribeStatus, setSubscribeStatus] = useState(null); 

  
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setIsSubscribing(true);
    setSubscribeStatus(null);

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId =
      process.env.NEXT_PUBLIC_EMAILJS_NEWSLETTER_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    const templateParams = {
      subscriber_email: email,
    };

    try {
      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      setSubscribeStatus("success");
      setEmail("");
    } catch (error) {
      console.error("Failed to subscribe:", error);
      setSubscribeStatus("error");
    } finally {
      setIsSubscribing(false);
      setTimeout(() => setSubscribeStatus(null), 5000);
    }
  };

  const statusMessageVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  
  if (!mounted) {
    return (
      <footer className="transition-colors duration-500 bg-white text-slate-600">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <p className="text-center text-sm">Loading footer...</p>
        </div>
      </footer>
    );
  }

  return (
    <footer  
    >
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-16">
          {/* Logo & Social */}
          <div className="lg:col-span-3">
           <Link href="/" className="flex items-center space-x-2">
              <Shield
                className={`h-7 w-7 transition-colors ${
                  theme === "dark" ? "text-cyan-400" : "text-green-500"
                }`}
              />
              <span
                className={`font-bold text-xl transition-colors ${
                  theme === "dark" ? "text-cyan-400" : "text-green-500"
                }`}
              >
                SafePay
              </span>
            </Link>

            <p className="text-sm max-w-sm mb-6">
              Empowering businesses with AI-driven fraud detection to secure
              every transaction and build digital trust.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  aria-label={social.name}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-full transition-colors ${
                    theme === "dark"
                      ? "bg-slate-800 hover:bg-emerald-500/20 hover:text-emerald-400"
                      : "bg-slate-100 hover:bg-cyan-500/10 hover:text-cyan-600"
                  }`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="lg:col-span-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
            {Object.entries(footerLinks).map(([section, links]) => (
              <div key={section}>
                <h4
                  className={`text-sm font-semibold tracking-wider uppercase mb-4 ${
                    theme === "dark" ? "text-slate-100" : "text-slate-800"
                  }`}
                >
                  {section}
                </h4>
                <ul className="space-y-3 text-sm">
                  {links.map((link) => (
                    <li key={link}>
                      <Link
                        href="#"
                        className={`transition hover:opacity-80 ${
                          theme === "dark"
                            ? "hover:text-emerald-400"
                            : "hover:text-cyan-600"
                        }`}
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-3">
            <h4
              className={`text-sm font-semibold tracking-wider uppercase mb-4 ${
                theme === "dark" ? "text-slate-100" : "text-slate-800"
              }`}
            >
              Stay Ahead of Fraud
            </h4>
            <p className="text-sm mb-4">
              Get the latest insights, reports, and news from the world of fraud
              prevention, delivered to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your business email"
                  required
                  className={`w-full py-3 pl-4 pr-12 rounded-xl transition-all duration-300 focus:ring-2 focus:outline-none 
                    ${
                      theme === "dark"
                        ? "bg-slate-800/70 border border-slate-700 placeholder-slate-500 focus:ring-cyan-400 focus:border-cyan-400"
                        : "bg-slate-100 border border-slate-200 placeholder-slate-500 focus:ring-cyan-500 focus:border-cyan-500"
                    }`}
                />
                <button
                  type="submit"
                  disabled={isSubscribing}
                  aria-label="Subscribe to newsletter"
                  className={`absolute top-1/2 right-2 -translate-y-1/2 p-2 rounded-lg transition-colors
                  ${
                    isSubscribing
                      ? "cursor-not-allowed"
                      : theme === "dark"
                      ? "text-slate-400 hover:bg-cyan-500/20 hover:text-cyan-400"
                      : "text-slate-500 hover:bg-cyan-500/10 hover:text-cyan-600"
                  }`}
                >
                  {isSubscribing ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <ArrowRight className="h-5 w-5" />
                  )}
                </button>
              </div>
              <AnimatePresence>
                {subscribeStatus && (
                  <motion.div
                    key={subscribeStatus}
                    variants={statusMessageVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className={`text-sm font-medium flex items-center mt-2 ${
                      subscribeStatus === "success"
                        ? "text-emerald-500"
                        : "text-red-500"
                    }`}
                  >
                    <CheckCircle
                      className={`h-4 w-4 mr-2 ${
                        subscribeStatus === "success" ? "inline" : "hidden"
                      }`}
                    />
                    {subscribeStatus === "success"
                      ? "Thank you for subscribing!"
                      : "Something went wrong. Please try again."}
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div
          className={`mt-16 pt-8 border-t ${
            theme === "dark" ? "border-slate-800" : "border-slate-200"
          } flex flex-col sm:flex-row justify-between items-center text-sm`}
        >
          <p className="mb-4 sm:mb-0">
            © {new Date().getFullYear()} SafePay. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link href="#" className="hover:opacity-80 transition">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:opacity-80 transition">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
