
import FloatingChat from "./Components/FloatingChat";
import Hero from "./Components/Hero";
import Testimonials from "./Components/Testimonial";


export default function HomePage() {
  return (
    <div>
      <Hero />
      <div className="p-10 text-center">
        <h2 className="text-3xl font-bold mt-10 mb-4">
          Why SafePay?
        </h2>
        <p className="max-w-2xl mx-auto">
          SafePay monitors all transactions using AI & ML models in real-time,
          sending instant alerts and blocking suspicious activities automatically.
        </p>
      </div>
      <Testimonials></Testimonials>
     <FloatingChat></FloatingChat>
    </div>
  );
}
