
"use client";

import React, { useState, useEffect, useTransition } from "react";
import { usePathname } from "next/navigation";
import { Info } from "lucide-react";
import Image from "next/image";
import Spinner from "../Components/Spinner";
import { useTheme } from "../Components/ThemeProvider";

export default function RiskDecisioningPage() {
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


  return (
    <div className={`min-h-screen p-6  transition-colors duration-500`}>
      {loading && <Spinner />}

      <div className="max-w-4xl mx-auto text-center mt-24">
        <h1 className={`text-4xl font-bold mb-4 `}>
          Intelligent Risk Decisioning
        </h1>
        <p className={`mb-10 `}>
          AI & Machine Learning help organizations make smarter, data-driven risk
          decisions by analyzing historical data, patterns, and anomalies in real time.
        </p>

        <div
          className={`rounded-xl p-6 text-left  shadow-lg transition-colors duration-500`}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className={`text-2xl font-semibold `}>
              How Intelligent Risk Decisioning Works
            </h2>
            <Info
              className={`w-6 h-6 cursor-pointer `}
              onClick={() => setShowDetails(!showDetails)}
            />
          </div>

          <ul className={`list-disc list-inside space-y-2 `}>
            <li>Data Collection: Financial, operational, market, and behavioral data.</li>
            <li>Data Preprocessing: Clean, normalize, and enrich the data for analysis.</li>
            <li>Feature Engineering: Identify indicators of risk and vulnerability.</li>
            <li>ML Model Training: Use classification, regression, or anomaly detection models.</li>
            <li>Decision Output: Generate risk scores, alerts, or recommendations.</li>
          </ul>

          {showDetails && (
            <div
              className={`mt-4 p-4 rounded-lg transition-colors duration-500`}
            >
              <p>
                Algorithms used may include Random Forest, Gradient Boosting,
                Neural Networks, or ensemble methods. The system continuously learns
                from new data to improve decision accuracy. Risk scores help businesses
                proactively mitigate potential losses.
              </p>
            </div>
          )}

          {/* ✅ Optimized Next.js Image Section (same as previous page) */}
          <div className="mt-6 relative w-full max-w-4xl mx-auto aspect-[16/9]">
            <Image
              src="/images/risk.jpg"
              alt="Intelligent Risk Decisioning Workflow"
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
