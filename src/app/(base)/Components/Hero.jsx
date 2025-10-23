"use client";
import Link from "next/link";
import PaymentCardSlider from "./PaymentCardSlider";
import { motion } from "framer-motion";
import Navbar from "./Navbar";

export default function Hero() {
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: "easeOut" } },
  };

  return (
    <section className="relative h-screen place-content-center overflow-hidden text-white text-center md:py-18 px-6 md:px-20"
      style={{
        background: "linear-gradient(135deg, #1F2937 0%, #4B5563 50%, #111827 100%)", // dark gradient
      }}
    >
      {/* Background video */}
      {/* <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/banner-bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video> */}
      <div className="absolute inset-0 w-full h-full object-cover">
      </div>

      {/* Overlay for readability */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.6))"
        }}
        initial={{ opacity: 0.6 }}
        animate={{ opacity: [0.6, 0.55, 0.6] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      ></motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 space-y-25"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="flex flex-col gap-2">
          {/* Title */}
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-4 flex flex-wrap justify-center overflow-hidden"
          >
            {"Protect Your Transactions with AI".split("").map((char, index) => (
              <motion.span
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
                }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h1>

          {/* Subheading */}
          <motion.p variants={childVariants} className="text-lg md:text-xl mb-6 md:mb-8">
            SafePay is an AI-powered fraud detection platform that keeps your
            online transactions safe in real-time.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={childVariants} className="flex justify-center gap-4 flex-wrap">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/features"
                className="border-2 border-white text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-300 hover:bg-white hover:text-green-600"
              >
                Explore Features
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/contact"
                className="border-2 border-white text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-300 hover:bg-white hover:text-green-600"
              >
                Contact Us
              </Link>
            </motion.div>
          </motion.div>

          {/* Trusted message */}
          <motion.p variants={childVariants} className="mt-6 md:mt-8 text-sm md:text-base text-white/80">
            Trusted by thousands of users worldwide.
          </motion.p>
        </div>

        <PaymentCardSlider />
      </motion.div>
    </section>
  );
}
