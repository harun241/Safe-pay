"use client";

import { useTheme } from "next-themes";

import AdditionalResources from "./Components/AditionalResources";
import AiBot from "./Components/Ai";
import ChatBot from "./Components/ChatBot";
import FloatingChat from "./Components/FloatingChat";
import Hero from "./Components/Hero";
import ImpactSection from "./Components/ImpactSection";
import PricingSection from "./Components/PricingSection";
import Testimonials from "./Components/Testimonial";

export default function HomePage() {
  const { theme } = useTheme(); // <-- add this

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <div className="pb-20">
        <Hero />
      </div>

      {/* Why SafePay Section */}
      <div className="px-6 sm:px-10 lg:px-20 py-20 text-center">
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
          SafePay monitors all transactions using AI & ML models in real-time,
          sending instant alerts and blocking suspicious activities automatically.
        </p>
      </div>

      {/* Testimonials Section */}
      <div className="px-6 sm:px-10 lg:px-20">
        <Testimonials />
      </div>

      {/* Floating Chat and Other Sections */}
      <div className="pb-20">
        <FloatingChat />
        <ImpactSection />
        <AdditionalResources />
        <AiBot />
        <PricingSection />
      </div>
    </div>
  );
}
