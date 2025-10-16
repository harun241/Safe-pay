"use client";

import { useTheme } from "next-themes";
import { useState } from "react";
import { Download, Search } from "lucide-react";

export default function DataHubPage() {
  const { theme } = useTheme();
  const [search, setSearch] = useState("");

  // Example datasets
  const datasets = [
    {
      id: 1,
      name: "Transaction Data",
      description: "5000 sample transactions for fraud detection",
      rows: 5000,
      updated: "2025-10-17",
      link: "/datasets/transactions.csv",
    },
    {
      id: 2,
      name: "User Data",
      description: "Information about users in the system",
      rows: 2000,
      updated: "2025-10-15",
      link: "/datasets/users.csv",
    },
    {
      id: 3,
      name: "Merchant Data",
      description: "Details about merchants",
      rows: 500,
      updated: "2025-10-16",
      link: "/datasets/merchants.csv",
    },
  ];

  const filteredDatasets = datasets.filter(
    (d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={`min-h-screen py-16 px-6 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">Data Hub</h1>
        <p className="text-center mb-8 opacity-80">
          Access all datasets, view details, and download them for analysis.
        </p>

        {/* Search bar */}
        <div className="flex justify-center mb-8">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 opacity-60" />
            <input
              type="text"
              placeholder="Search datasets..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                theme === "dark"
                  ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
              }`}
            />
          </div>
        </div>

        {/* Datasets table */}
        <div className="overflow-x-auto">
          <table className="min-w-full rounded-lg overflow-hidden">
            <thead
              className={`${theme === "dark" ? "bg-gray-800 text-gray-300" : "bg-gray-200 text-gray-700"}`}
            >
              <tr>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Description</th>
                <th className="py-3 px-4 text-center">Rows</th>
                <th className="py-3 px-4 text-center">Last Updated</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredDatasets.map((dataset) => (
                <tr
                  key={dataset.id}
                  className={`border-b ${
                    theme === "dark" ? "border-gray-700" : "border-gray-300"
                  } hover:bg-green-50 dark:hover:bg-gray-800 transition`}
                >
                  <td className="py-3 px-4 font-semibold">{dataset.name}</td>
                  <td className="py-3 px-4">{dataset.description}</td>
                  <td className="py-3 px-4 text-center">{dataset.rows.toLocaleString()}</td>
                  <td className="py-3 px-4 text-center">{dataset.updated}</td>
                  <td className="py-3 px-4 text-center">
                    <a
                      href={dataset.link}
                      download
                      className={`inline-flex items-center gap-1 px-4 py-2 rounded-lg font-semibold border ${
                        theme === "dark"
                          ? "border-green-400 text-green-400 hover:bg-green-400 hover:text-gray-900"
                          : "border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
                      } transition`}
                    >
                      <Download className="w-4 h-4" /> Download
                    </a>
                  </td>
                </tr>
              ))}
              {filteredDatasets.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-6 opacity-70">
                    No datasets found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
