"use client";

// Import your components


import { useState } from "react";
import FraudMap from "../Components/FraudMap";
import FraudStats from "../Components/FraudStats";
import FraudReports from "../Components/FraudReports";
import ScrollReveal from "../Components/ScrollReveal";
import FraudFilters from "../Components/FraudFilters";

export default function GlobalAntiFraud() {
  const [filter, setFilter] = useState({
    severity: "All",
    country: "All",
  });

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold">Global Anti-Fraud Dashboard</h1>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-md">
        <FraudFilters
         filter={filter} setFilter={setFilter} />
      </div>

      {/* Map */}
      <div className="bg-white rounded-xl shadow-md h-[500px]">
        <FraudMap filter={filter} />
      </div>

      {/* Stats */}
      <div className="bg-white p-4 rounded-xl shadow-md">
        <FraudStats filter={filter} />
      </div>

      {/* Reports */}
      <div className="bg-white p-4 rounded-xl shadow-md">
        <ScrollReveal>
          <FraudReports filter={filter} />
        </ScrollReveal>
      </div>
    </div>
  );
}
