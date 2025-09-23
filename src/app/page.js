import AdditionalResources from "./Components/AditionalResources";
import AiBot from "./Components/Ai";
import ChatBot from "./Components/ChatBot";
import FloatingChat from "./Components/FloatingChat";
import Hero from "./Components/Hero";
import ImpactSection from "./Components/ImpactSection";
import PricingSection from "./Components/PricingSection";
import Testimonials from "./Components/Testimonial";

export default function HomePage() {
  return (
    <div className="bg-gray-900 text-white">
      {/* Hero Section */}
      <div className="pb-20"> {/* niche space added */}
        <Hero />
      </div>

      {/* Why SafePay Section */}
      <div className="px-6 sm:px-10 lg:px-20 py-20 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6">
          Why SafePay?
        </h2>
        <p className="max-w-3xl mx-auto text-lg sm:text-xl leading-relaxed">
          SafePay monitors all transactions using AI & ML models in real-time,
          sending instant alerts and blocking suspicious activities automatically.
        </p>
      </div>

      {/* Testimonials Section */}
      <div className=" px-6 sm:px-10 lg:px-20">
        <Testimonials />
      </div>

      {/* Floating Chat */}
      <div className="pb-20">
        <FloatingChat />
        <ImpactSection />
        <AdditionalResources />
        <AiBot></AiBot>
        <PricingSection></PricingSection>
      </div>
    </div>
  );
}
