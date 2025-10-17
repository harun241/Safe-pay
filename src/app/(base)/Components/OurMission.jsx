"use client";

import { motion } from "framer-motion";

export default function OurMission() {
  return (
    <section
      className="py-24 px-6 lg:px-20 text-center transition-colors duration-500
       dark:from-gray-900 dark:via-gray-950 dark:to-gray-900"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto"
      >
        <h2
          className="text-4xl md:text-5xl font-extrabold mb-8 
           bg-clip-text text-cyan-500"
        >
          Our Mission
        </h2>

        <p className="text-lg md:text-xl  dark:text-white leading-relaxed">
          At{" "}
          <span className="font-semibold text-cyan-500 dark:text-white">
            SafePay
          </span>
          , our goal is to make every online transaction{" "}
          <span className="font-semibold  dark:text-white">
            secure
          </span>
          ,{" "}
          <span className="font-semibold  dark:text-white">
            transparent
          </span>
          , and{" "}
          <span className="font-semibold dark:text-white">
            fraud-free
          </span>
          . We combine advanced machine learning, behavioral analytics, and
          risk scoring to detect suspicious activities before they cause damage.
        </p>

        <p className="mt-8 text-lg md:text-xl  dark:text-slate-300 leading-relaxed">
          Our mission is simple —{" "}
          <span className="italic text-indigo-600 dark:text-indigo-400">
            to build trust in digital payments
          </span>
          . Whether you’re a business or a customer, SafePay protects every
          transaction in real time, ensuring safety without compromising
          convenience.
        </p>

       
      </motion.div>
    </section>
  );
}
