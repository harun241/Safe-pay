"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import AiBot from "./Components/Ai";
import ChatBot from "./Components/ChatBot";
import FloatingChat from "./Components/FloatingChat";
import Hero from "./Components/Hero";
import ImpactSection from "./Components/ImpactSection";
import PricingSection from "./Components/PricingSection";
import Testimonials from "./Components/Testimonial";
import FaqSection from "./Components/FAQ";
import AdditionalResources from "../Components/AditionalResources";

export default function HomePage() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <div className="pb-20">
        <Hero />
      </div>

      {/* Why SafePay Section */}
      <div className="px-6 sm:px-10 lg:px-20 py-20 text-center">
        {mounted && (
          <>
            <h2
              className={`text-3xl sm:text-4xl font-bold mb-6 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              Why SafePay?
            </h2>
            <p
              className={`max-w-3xl mx-auto text-lg sm:text-xl leading-relaxed ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
            >
              SafePay monitors all transactions using AI & ML models in
              real-time, sending instant alerts and blocking suspicious
              activities automatically.
            </p>
          </>
        )}
      </div>

      {/* Testimonials Section */}
      <div className="px-6 sm:px-10 lg:px-20">
        <Testimonials />
      </div>

      {/* Floating Chat and Other Sections */}
      <div className="pb-20">
        <FloatingChat />
        <ImpactSection />
       <AdditionalResources></AdditionalResources>
        <AiBot />
        <PricingSection />
        <FaqSection/>
      </div>
    </div>
  );
}
