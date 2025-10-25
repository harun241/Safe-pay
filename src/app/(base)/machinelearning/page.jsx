"use client";

import React, { useState, useEffect, useTransition } from "react";
import { usePathname } from "next/navigation";
import { Info } from "lucide-react";
import Image from "next/image";
import Spinner from "../Components/Spinner";
import { useTheme } from "../Components/ThemeProvider";

export default function FraudDetectionPage() {
  const [showDetails, setShowDetails] = useState(false);
  const { theme } = useTheme();
  const pathname = usePathname();

  const [isPending, startTransition] = useTransition();
  const [loading, setLoading] = useState(false);

  // Show spinner when route changes
  useEffect(() => {
    setLoading(true);
    startTransition(() => setLoading(false));
  }, [pathname]);

  // Theme classes


  return (
    <div className={`min-h-screen p-6 transition-colors duration-500`}>
      {loading && <Spinner />}

      <div className="max-w-4xl mx-auto text-center mt-24">
        <h1 className={`text-4xl font-bold mb-4 `}>
          AI & ML Based Fraud Detection
        </h1>
        <p className={`mb-10 `}>
          Learn how AI and Machine Learning can detect fraudulent activities in
          financial transactions, online payments, and other sensitive systems.
        </p>

        <div
          className={`rounded-xl p-6 text-left  shadow-lg transition-colors duration-500`}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className={`text-2xl font-semibold `}>
              How Fraud Detection Works
            </h2>
            <Info
              className={`w-6 h-6 cursor-pointer `}
              onClick={() => setShowDetails(!showDetails)}
            />
          </div>

          <ul className={`list-disc list-inside space-y-2 `}>
            <li>Data Collection: Transaction data, user behavior, device info.</li>
            <li>Data Preprocessing: Clean and normalize the data for ML model.</li>
            <li>Feature Extraction: Identify key indicators of fraud.</li>
            <li>ML Model Training: Use supervised/unsupervised algorithms.</li>
            <li>Prediction & Alert: Flag suspicious transactions in real-time.</li>
          </ul>

          {showDetails && (
            <div
              className={`mt-4 p-4 rounded-lg  transition-colors duration-500`}
            >
              <p>
                Common algorithms include Random Forest, Logistic Regression,
                Neural Networks, and clustering techniques. The model
                continuously learns from new transactions to improve accuracy.
              </p>
            </div>
          )}

          {/* ✅ Next.js Optimized Image */}
          <div className="mt-6 relative w-full max-w-4xl mx-auto aspect-[16/9]">
            <Image
              src="/images/machine.jpg"
              alt="Fraud Detection Workflow"
              fill
              className="rounded-lg shadow-md object-cover transition-shadow duration-500 hover:shadow-lg"
              priority={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
