export default function FeaturesPage() {
  const features = [
    {
      title: "Real-time Monitoring",
      description:
        "Monitor all transactions in real-time to detect any suspicious activity instantly.",
      icon: "🕒",
    },
    {
      title: "AI-based Fraud Detection",
      description:
        "Our AI models analyze transaction patterns to prevent fraud before it happens.",
      icon: "🤖",
    },
    {
      title: "Instant Alerts",
      description:
        "Get immediate notifications for any unusual transaction on your account.",
      icon: "📩",
    },
    {
      title: "Automatic Card Blocking",
      description:
        "Suspected fraudulent transactions trigger automatic card blocking for security.",
      icon: "🔒",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-10">
      <h1 className="text-4xl md:text-5xl font-bold text-green-500 text-center mb-12">
        Features
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition duration-300"
          >
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h2 className="text-2xl font-semibold mb-2 text-gray-800">
              {feature.title}
            </h2>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
