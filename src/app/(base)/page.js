"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import AiBot from "./Components/Ai";
import FloatingChat from "./Components/FloatingChat";
import Hero from "./Components/Hero";
import ImpactSection from "./Components/ImpactSection";
import PricingSection from "./Components/PricingSection";
import Testimonials from "./Components/Testimonial";
import FaqSection from "./Components/FAQ";
import AdditionalResources from "./Components/AditionalResources";


export default function HomePage() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <div className="max-w-[1400px] mx-auto">
        <Hero />
      </div>

      {/* Why SafePay Section */}
      <div className="px-6 sm:px-10 lg:px-20 py-20 text-center max-w-[1400px] mx-auto">
        {mounted && (
          <>
            <h2
              className={`text-3xl sm:text-4xl font-bold mb-6 ${theme === "dark" ? "text-white" : "text-gray-900"
                }`}
            >
              Why SafePay?
            </h2>
            <p
              className={`max-w-3xl mx-auto text-lg sm:text-xl leading-relaxed ${theme === "dark" ? "text-gray-300" : "text-gray-700"
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
      <div className="px-6 sm:px-10 lg:px-20 max-w-[1400px] mx-auto">
        <Testimonials />
      </div>

      {/* Floating Chat and Other Sections */}
      <div>
        <div>
          <FloatingChat />
        </div>
        <div className={`relative w-full py-24 px-12 overflow-hidden transition-colors duration-500
        ${theme === "dark"
            ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white"
            : "bg-gradient-to-br from-slate-100 via-white to-slate-100 text-slate-900"
          }`}>
          <ImpactSection />
        </div>
        <div>
          <AdditionalResources />
        </div>
        <div>
          <PricingSection />
        </div>
        <div>
          <FaqSection />
        </div>
        <div>
          <AiBot />
        </div>
      </div>
    </div>
  );
}
