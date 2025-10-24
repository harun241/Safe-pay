"use client";

import { motion } from "framer-motion";

export default function OurMission() {
  // Parent container animation for stagger
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  // Child animation for fade + slide-up
  const childVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (

    <section
      className="py-14 px-6 lg:px-20 text-center transition-colors duration-500"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-4xl mx-auto"
      >
        {/* Heading */}
        <motion.h2
          variants={childVariants}
          className="text-4xl md:text-5xl font-extrabold mb-8 
           bg-clip-text text-cyan-500"
        >
          Our Mission
        </motion.h2>

        {/* First paragraph */}
        <motion.p
          variants={childVariants}
          className="text-lg md:text-xl  leading-relaxed"
        >
          At{" "}
          <span className="font-semibold text-cyan-500">
            SafePay
          </span>
          , our goal is to make every online transaction{" "}
          <span className="font-semibold  text-cyan-500">secure</span>,{" "}
          <span className="font-semibold  text-cyan-500">transparent</span>, and{" "}
          <span className="font-semibold  text-cyan-500">fraud-free</span>. We
          combine advanced machine learning, behavioral analytics, and risk
          scoring to detect suspicious activities before they cause damage.
        </motion.p>

        {/* Second paragraph */}
        <motion.p
          variants={childVariants}
          className="mt-8 text-lg md:text-xl  leading-relaxed"
        >
          Our mission is simple —{" "}
          <span className="italic text-cyan-500 ">
            to build trust in digital payments
          </span>
          . Whether you’re a business or a customer, SafePay protects every
          transaction in real time, ensuring safety without compromising
          convenience.
        </motion.p>
      </motion.div>
    </section>
  );
}
