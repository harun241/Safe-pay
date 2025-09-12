export default function AboutPage() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16 md:py-24 text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-green-500 mb-6">
        About SafePay
      </h1>

      <p className="text-gray-700 text-lg md:text-xl leading-relaxed mb-8">
        SafePay is an AI-powered platform dedicated to securing online transactions.
        Our mission is to protect users from fraud using cutting-edge technology, 
        real-time monitoring, and intelligent AI algorithms.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 text-left">
        <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition">
          <h2 className="text-2xl font-semibold text-green-500 mb-2">Mission</h2>
          <p className="text-gray-600">
            To provide a secure transaction environment for all users using AI-driven solutions.
          </p>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition">
          <h2 className="text-2xl font-semibold text-green-500 mb-2">Vision</h2>
          <p className="text-gray-600">
            To become the most trusted AI-powered platform for fraud detection worldwide.
          </p>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition">
          <h2 className="text-2xl font-semibold text-green-500 mb-2">Values</h2>
          <p className="text-gray-600">
            Trust, Security, Innovation, and Customer-first approach in all services.
          </p>
        </div>
      </div>
    </section>
  );
}
