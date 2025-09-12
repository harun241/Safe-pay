import Hero from "./Components/Hero";


export default function HomePage() {
  return (
    <div>
      <Hero />
      <div className="p-10 text-center">
        <h2 className="text-3xl font-bold mt-10 mb-4 text-gray-800">
          Why SafePay?
        </h2>
        <p className="text-gray-700 max-w-2xl mx-auto">
          SafePay monitors all transactions using AI & ML models in real-time,
          sending instant alerts and blocking suspicious activities automatically.
        </p>
      </div>
    </div>
  );
}
