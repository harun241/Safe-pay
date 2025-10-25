// components/FraudFilters.jsx
"use client";

import { useTheme } from "./ThemeProvider";

export default function FraudFilters({ filter, setFilter }) {
  // Example options
  const severityOptions = ["All", "High", "Medium", "Low"];
  const countryOptions = ["All", "USA", "UK", "Canada", "Germany"];

  const { theme } = useTheme()

  return (
    <div className={`p-4 border rounded-xl shadow-md ${theme === 'dark'? "text-white": ""}`}  >
      <h2 className="font-bold text-lg mb-4">Fraud Filters</h2>

      <div className="flex flex-wrap gap-4">
        {/* Severity Filter */}
        <div>
          <label className="block font-medium mb-1">Severity</label>
          <select
            className="border rounded p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            value={filter.severity}
            onChange={(e) =>
              setFilter((prev) => ({ ...prev, severity: e.target.value }))
            }
          >
            {severityOptions.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* Country Filter */}
        <div>
          <label className="block font-medium mb-1">Country</label>
          <select
            className="border rounded p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            value={filter.country}
            onChange={(e) =>
              setFilter((prev) => ({ ...prev, country: e.target.value }))
            }
          >
            {countryOptions.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
