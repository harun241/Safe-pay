// "use client";

// import React, { useState, useEffect, useTransition } from "react";
// import { useTheme } from "next-themes";
// import { usePathname } from "next/navigation";
// import { Info } from "lucide-react";
// import Navbar from "../(base)/Components/Navbar";
// import Spinner from "../(base)/Components/Spinner";

// export default function RiskDecisioningPage() {
//   const [showDetails, setShowDetails] = useState(false);
//   const { theme } = useTheme();
//   const pathname = usePathname();

//   const [isPending, startTransition] = useTransition();
//   const [loading, setLoading] = useState(false);

//   // Show spinner when route changes
//   useEffect(() => {
//     setLoading(true);
//     startTransition(() => setLoading(false));
//   }, [pathname]);

//   // Theme classes
//   const pageBg = theme === "dark" ? "bg-gray-950 text-gray-100" : "bg-gray-50 text-gray-900";
//   const cardBg = theme === "dark" ? "bg-gray-800 shadow-gray-700/40" : "bg-white shadow-gray-200/50";
//   const cardText = theme === "dark" ? "text-gray-200" : "text-gray-700";
//   const cardHeaderText = theme === "dark" ? "text-white" : "text-gray-900";
//   const detailBg = theme === "dark" ? "bg-gray-700" : "bg-gray-100";
//   const detailText = theme === "dark" ? "text-gray-200" : "text-gray-800";
//   const iconColor = theme === "dark" ? "text-gray-300" : "text-gray-500";

//   return (
//     <div className={`min-h-screen p-6 ${pageBg} transition-colors duration-500`}>
//       <Navbar />
//       {loading && <Spinner />} {/* Spinner shows when page is loading */}

//       <div className="max-w-4xl mx-auto text-center mt-24">
//         <h1 className={`text-4xl font-bold mb-4 ${cardHeaderText}`}>
//           Intelligent Risk Decisioning
//         </h1>
//         <p className={`mb-10 ${cardText}`}>
//           AI & Machine Learning help organizations make smarter, data-driven risk decisions 
//           by analyzing historical data, patterns, and anomalies in real-time.
//         </p>

//         <div className={`rounded-xl p-6 text-left ${cardBg} shadow-lg transition-colors duration-500`}>
//           <div className="flex justify-between items-center mb-4">
//             <h2 className={`text-2xl font-semibold ${cardHeaderText}`}>
//               How Intelligent Risk Decisioning Works
//             </h2>
//             <Info
//               className={`w-6 h-6 cursor-pointer ${iconColor}`}
//               onClick={() => setShowDetails(!showDetails)}
//             />
//           </div>

//           <ul className={`list-disc list-inside space-y-2 ${cardText}`}>
//             <li>Data Collection: Financial, operational, market, and behavioral data.</li>
//             <li>Data Preprocessing: Clean, normalize, and enrich the data for analysis.</li>
//             <li>Feature Engineering: Identify indicators of risk and vulnerability.</li>
//             <li>ML Model Training: Use classification, regression, or anomaly detection models.</li>
//             <li>Decision Output: Generate risk scores, alerts, or recommendations.</li>
//           </ul>

//           {showDetails && (
//             <div className={`mt-4 p-4 rounded-lg ${detailBg} ${detailText} transition-colors duration-500`}>
//               <p>
//                 Algorithms used may include Random Forest, Gradient Boosting, Neural Networks, 
//                 or ensemble methods. The system continuously learns from new data to improve 
//                 decision accuracy. Risk scores help businesses proactively mitigate potential losses.
//               </p>
//             </div>
//           )}

//           <div className="mt-6">
//             <img
//               src="/images/risk.JPG" 
//               alt="Intelligent Risk Decisioning Workflow"
//               className="mx-auto rounded-lg shadow-md transition-shadow duration-500"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useState, useEffect, useTransition } from "react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { Info } from "lucide-react";
import Image from "next/image";
import Navbar from "../(base)/Components/Navbar";
import Spinner from "../(base)/Components/Spinner";

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

  // Theme classes
  const pageBg =
    theme === "dark" ? "bg-gray-950 text-gray-100" : "bg-gray-50 text-gray-900";
  const cardBg =
    theme === "dark"
      ? "bg-gray-800 shadow-gray-700/40"
      : "bg-white shadow-gray-200/50";
  const cardText = theme === "dark" ? "text-gray-200" : "text-gray-700";
  const cardHeaderText = theme === "dark" ? "text-white" : "text-gray-900";
  const detailBg = theme === "dark" ? "bg-gray-700" : "bg-gray-100";
  const detailText = theme === "dark" ? "text-gray-200" : "text-gray-800";
  const iconColor = theme === "dark" ? "text-gray-300" : "text-gray-500";

  return (
    <div className={`min-h-screen p-6 ${pageBg} transition-colors duration-500`}>
      <Navbar />
      {loading && <Spinner />}

      <div className="max-w-4xl mx-auto text-center mt-24">
        <h1 className={`text-4xl font-bold mb-4 ${cardHeaderText}`}>
          Intelligent Risk Decisioning
        </h1>
        <p className={`mb-10 ${cardText}`}>
          AI & Machine Learning help organizations make smarter, data-driven risk
          decisions by analyzing historical data, patterns, and anomalies in real time.
        </p>

        <div
          className={`rounded-xl p-6 text-left ${cardBg} shadow-lg transition-colors duration-500`}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className={`text-2xl font-semibold ${cardHeaderText}`}>
              How Intelligent Risk Decisioning Works
            </h2>
            <Info
              className={`w-6 h-6 cursor-pointer ${iconColor}`}
              onClick={() => setShowDetails(!showDetails)}
            />
          </div>

          <ul className={`list-disc list-inside space-y-2 ${cardText}`}>
            <li>Data Collection: Financial, operational, market, and behavioral data.</li>
            <li>Data Preprocessing: Clean, normalize, and enrich the data for analysis.</li>
            <li>Feature Engineering: Identify indicators of risk and vulnerability.</li>
            <li>ML Model Training: Use classification, regression, or anomaly detection models.</li>
            <li>Decision Output: Generate risk scores, alerts, or recommendations.</li>
          </ul>

          {showDetails && (
            <div
              className={`mt-4 p-4 rounded-lg ${detailBg} ${detailText} transition-colors duration-500`}
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
              src="/images/risk.JPG"
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
