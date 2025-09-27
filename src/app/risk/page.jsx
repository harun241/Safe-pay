"use client";

import { useState } from "react";
import { Info } from "lucide-react"; // Correct icon import

export default function RiskDecisioningPage() {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto text-center">
        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Intelligent Risk Decisioning
        </h1>
        <p className="text-gray-600 mb-10">
          AI & Machine Learning help organizations make smarter, data-driven risk decisions 
          by analyzing historical data, patterns, and anomalies in real-time.
        </p>

        {/* Card */}
        <div className="bg-white shadow-lg rounded-xl p-6 text-left">
          {/* Card Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              How Intelligent Risk Decisioning Works
            </h2>
            <Info
              className="w-6 h-6 text-gray-500 cursor-pointer"
              onClick={() => setShowDetails(!showDetails)}
            />
          </div>

          {/* Workflow Steps */}
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Data Collection: Financial, operational, market, and behavioral data.</li>
            <li>Data Preprocessing: Clean, normalize, and enrich the data for analysis.</li>
            <li>Feature Engineering: Identify indicators of risk and vulnerability.</li>
            <li>ML Model Training: Use classification, regression, or anomaly detection models.</li>
            <li>Decision Output: Generate risk scores, alerts, or recommendations.</li>
          </ul>

          {/* Expandable Details */}
          {showDetails && (
            <div className="mt-4 p-4 bg-gray-100 rounded-lg text-gray-700">
              <p>
                Algorithms used may include Random Forest, Gradient Boosting, Neural Networks, 
                or ensemble methods. The system can continuously learn from new data to improve 
                decision accuracy. Risk scores help businesses proactively mitigate potential losses.
              </p>
            </div>
          )}

          {/* Diagram / illustration */}
          <div className="mt-6">
            <img
              src="/images/risk.JPG" // Replace with your diagram in public folder
              alt="Intelligent Risk Decisioning Workflow"
              className="mx-auto rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
