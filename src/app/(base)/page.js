"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Hero from "./Components/Hero";
import ImpactSection from "./Components/ImpactSection";
import PricingSection from "./Components/PricingSection";

import FaqSection from "./Components/FAQ";
import AdditionalResources from "./Components/AditionalResources";
import OurMission from "./Components/OurMission";
import ScrollReveal from "./Components/ScrollReveal";


export default function HomePage() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <div className="">
        <ScrollReveal>
          <Hero />
        </ScrollReveal>
      </div>

      {/* Testimonials Section */}
      <div className="px-6 sm:px-10 lg:px-20 max-w-[1400px] mx-auto">

      </div>
      <div>
        <div className={`relative w-full py-24 px-12 overflow-hidden transition-colors duration-500
        ${theme === "dark"
            ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white"
            : "bg-gradient-to-br from-slate-100 via-white to-slate-100 text-slate-900"
          }`}>
          <ScrollReveal>
            <OurMission></OurMission>
          </ScrollReveal>
          <ScrollReveal>
            <ImpactSection />
          </ScrollReveal>
        </div>
        <div>
          <ScrollReveal>
            <AdditionalResources />
          </ScrollReveal>
        </div>
        <div>
          <ScrollReveal>
            <PricingSection />
          </ScrollReveal>
        </div>
        <div>
          <ScrollReveal>
            <FaqSection />
          </ScrollReveal>
        </div>
        <div>

        </div>
      </div>
    </div>
  );
}
