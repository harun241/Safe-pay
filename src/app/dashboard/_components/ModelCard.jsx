"use client";

export default function ModelCard({ model, theme }) {
  return (
    <div
      className={`p-6 rounded-xl shadow-md transition ${
        theme === "dark" ? "bg-gray-800 shadow-cyan-400/20" : "bg-white shadow-green-200"
      }`}
    >
      <h3 className={`text-xl font-bold mb-2 ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
        {model.name} ({model.version})
      </h3>
      <p className={`mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
        Status:{" "}
        <span className={`font-semibold ${model.status === "active" ? "text-green-400" : "text-yellow-400"}`}>
          {model.status}
        </span>
      </p>
      <p className={`mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
        Accuracy: <span className="font-semibold">{model.accuracy}%</span>
      </p>
      <p className={`mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
        Last Updated: {new Date(model.lastUpdated).toLocaleString()}
      </p>
    </div>
  );
}
