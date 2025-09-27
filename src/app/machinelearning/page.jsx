"use client";

import { useState } from "react";
import { Info } from "lucide-react"; // Correct icon

export default function FraudDetectionPage() {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          AI & ML Based Fraud Detection
        </h1>
        <p className="text-gray-600 mb-10">
          Learn how AI and Machine Learning can detect fraudulent activities in 
          financial transactions, online payments, and other sensitive systems.
        </p>

        <div className="bg-white shadow-lg rounded-xl p-6 text-left">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              How Fraud Detection Works
            </h2>
            <Info
              className="w-6 h-6 text-gray-500 cursor-pointer"
              onClick={() => setShowDetails(!showDetails)}
            />
          </div>

          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Data Collection: Transaction data, user behavior, device info.</li>
            <li>Data Preprocessing: Clean and normalize the data for ML model.</li>
            <li>Feature Extraction: Identify key indicators of fraud.</li>
            <li>ML Model Training: Use supervised/unsupervised algorithms.</li>
            <li>Prediction & Alert: Flag suspicious transactions in real-time.</li>
          </ul>

          {showDetails && (
            <div className="mt-4 p-4 bg-gray-100 rounded-lg text-gray-700">
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
