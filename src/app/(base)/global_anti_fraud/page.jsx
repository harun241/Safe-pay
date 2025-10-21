"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import FraudMap from "../components/FraudMap";
import FraudStats from "../components/FraudStats";
import FraudReports from "../components/FraudReports";
import FraudFilters from "../components/FraudFilters";
import ScrollReveal from "../components/ScrollReveal";

export default function GlobalAntiFraudPage() {
  const { theme } = useTheme();
  const [filter, setFilter] = useState({ country: "all", timeframe: "week" });

  const bgColor = theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900";

  return (
    <div className={`${bgColor} min-h-screen mt-10 p-6`}>
      <h1 className="text-3xl font-bold mb-6">Global Anti-Fraud Network</h1>

      <ScrollReveal>
        <FraudFilters filter={filter} setFilter={setFilter} />
      </ScrollReveal>

      <div className="my-6">
        <ScrollReveal>
          <FraudStats filter={filter} />
        </ScrollReveal>
      </div>

      <div className="my-6 h-[500px]">
        <ScrollReveal>
          <FraudMap filter={filter} />
        </ScrollReveal>
      </div>

      <div className="my-6">
        <ScrollReveal>
          <FraudReports filter={filter} />
        </ScrollReveal>
      </div>
    </div>
  );
}
