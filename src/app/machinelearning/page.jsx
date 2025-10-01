"use client";

import { useState } from "react";
import { Info } from "lucide-react";
import { useTheme } from "next-themes";
import Navbar from "../(base)/Components/Navbar";

export default function FraudDetectionPage() {
  const [showDetails, setShowDetails] = useState(false);
  const { theme } = useTheme();

  // Theme-based colors
  const pageBg = theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-800";
  const cardBg = theme === "dark" ? "bg-gray-800" : "bg-white";
  const cardText = theme === "dark" ? "text-gray-200" : "text-gray-700";
  const cardHeaderText = theme === "dark" ? "text-white" : "text-gray-800";
  const detailBg = theme === "dark" ? "bg-gray-700" : "bg-gray-100";
  const detailText = theme === "dark" ? "text-gray-200" : "text-gray-700";
  const iconColor = theme === "dark" ? "text-gray-300" : "text-gray-500";

  return (
    <div className={`min-h-screen p-6 ${pageBg}`}>
      <Navbar />

      <div className="max-w-4xl mx-auto text-center mt-10">
        <h1 className={`text-4xl font-bold mb-4 ${cardHeaderText}`}>
          AI & ML Based Fraud Detection
        </h1>
        <p className={`mb-10 ${cardText}`}>
          Learn how AI and Machine Learning can detect fraudulent activities in 
          financial transactions, online payments, and other sensitive systems.
        </p>

        <div className={`shadow-lg rounded-xl p-6 text-left ${cardBg}`}>
          <div className="flex justify-between items-center mb-4">
            <h2 className={`text-2xl font-semibold ${cardHeaderText}`}>
              How Fraud Detection Works
            </h2>
            <Info
              className={`w-6 h-6 cursor-pointer ${iconColor}`}
              onClick={() => setShowDetails(!showDetails)}
            />
          </div>

          <ul className={`list-disc list-inside space-y-2 ${cardText}`}>
            <li>Data Collection: Transaction data, user behavior, device info.</li>
            <li>Data Preprocessing: Clean and normalize the data for ML model.</li>
            <li>Feature Extraction: Identify key indicators of fraud.</li>
            <li>ML Model Training: Use supervised/unsupervised algorithms.</li>
            <li>Prediction & Alert: Flag suspicious transactions in real-time.</li>
          </ul>

          {showDetails && (
            <div className={`mt-4 p-4 rounded-lg ${detailBg} ${detailText}`}>
              <p>
                Common algorithms include Random Forest, Logistic Regression, Neural Networks, 
                and clustering techniques. The model continuously learns from new transactions 
                to improve accuracy.
              </p>
            </div>
          )}

          <div className="mt-6">
            <img
              src="/images/machine.png" 
              alt="Fraud Detection Workflow"
              className="mx-auto rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
