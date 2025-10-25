"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import FraudStats from "../Components/FraudStats";
import FraudReports from "../Components/FraudReports";
import ScrollReveal from "../Components/ScrollReveal";
import FraudFilters from "../Components/FraudFilters";

// Dynamically import the map to prevent SSR issues
const FraudMap = dynamic(() => import("../Components/FraudMap"), { ssr: false });

export default function GlobalAntiFraud() {
  const [filter, setFilter] = useState({
    severity: "All",
    country: "All",
  });

  return (
    <div className="p-6 lg:px-20 space-y-8 py-26  max-w-[1400px] mx-auto">
      <h1 className="text-3xl font-bold">Global Anti-Fraud Dashboard</h1>

      <div className="rounded-xl shadow-md">
        <FraudFilters filter={filter} setFilter={setFilter} />
      </div>

      <div className=" rounded-xl shadow-md h-[500px] z-20">
        <FraudMap filter={filter} />
      </div>

      <div className=" rounded-xl shadow-md">
        <FraudStats filter={filter} />
      </div>

      <div className="rounded-xl shadow-md">
        <ScrollReveal>
          <FraudReports filter={filter} />
        </ScrollReveal>
      </div>
    </div>
  );
}
