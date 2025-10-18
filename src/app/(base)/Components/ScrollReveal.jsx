"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 1.2, // longer for smoother effect
  staggerChildren = 0,
}) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  const offset = 80; // distance to start from
  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? offset : direction === "down" ? -offset : 0,
      x: direction === "left" ? offset : direction === "right" ? -offset : 0,
      scale: 0.98,
      filter: "blur(5px)",
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1], // smooth cubic-bezier
        type: "spring",
        stiffness: 70,
        damping: 18,
        staggerChildren,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="will-change-transform will-change-opacity"
    >
      {children}
    </motion.div>
  );
}
