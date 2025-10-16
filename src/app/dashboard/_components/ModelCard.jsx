"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
} from "recharts";

export default function ModelCard({ model, theme }) {
  // Sample historical data for chart (replace with API data)
  const accuracyData = model.history || [
    { time: "1h", accuracy: 72 },
    { time: "2h", accuracy: 75 },
    { time: "3h", accuracy: 78 },
    { time: "4h", accuracy: 77 },
    { time: "5h", accuracy: 80 },
  ];

  const predictionData = model.predictions || [
    { label: "Fraud", count: 32 },
    { label: "Legit", count: 120 },
  ];

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

      {/* Accuracy Chart */}
      <div className="my-4">
        <p className={`text-sm font-medium mb-1 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
          Accuracy Over Time
        </p>
        <ResponsiveContainer width="100%" height={80}>
          <LineChart data={accuracyData}>
            <XAxis dataKey="time" hide />
            <YAxis domain={[0, 100]} hide />
            <Tooltip
              contentStyle={{
                backgroundColor: theme === "dark" ? "#1f2937" : "#ffffff",
                borderRadius: "8px",
                border: "none",
              }}
            />
            <Line
              type="monotone"
              dataKey="accuracy"
              stroke={theme === "dark" ? "#06b6d4" : "#10b981"}
              strokeWidth={3}
              dot={{ r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Prediction Distribution Chart */}
      <div>
        <p className={`text-sm font-medium mb-1 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
          Prediction Distribution
        </p>
        <ResponsiveContainer width="100%" height={80}>
          <BarChart data={predictionData}>
            <CartesianGrid strokeDasharray="3 3" stroke={theme === "dark" ? "#374151" : "#e5e7eb"} />
            <XAxis dataKey="label" hide />
            <YAxis hide />
            <Tooltip
              contentStyle={{
                backgroundColor: theme === "dark" ? "#1f2937" : "#ffffff",
                borderRadius: "8px",
                border: "none",
              }}
            />
            <Bar
              dataKey="count"
              fill={theme === "dark" ? "#06b6d4" : "#10b981"}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
