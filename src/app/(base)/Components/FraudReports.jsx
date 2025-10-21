"use client";

export default function FraudReports({ filter }) {
  const reports = [
    { id: 1, country: "USA", type: "Phishing", date: "2025-10-21" },
    { id: 2, country: "UK", type: "Card Fraud", date: "2025-10-20" },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto border-collapse border border-gray-300 dark:border-gray-700">
        <thead className="bg-gray-200 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
          <tr>
            <th className="border p-2 text-left">ID</th>
            <th className="border p-2 text-left">Country</th>
            <th className="border p-2 text-left">Type</th>
            <th className="border p-2 text-left">Date</th>
          </tr>
        </thead>
        <tbody className="text-gray-900 dark:text-gray-200">
          {reports.map((r) => (
            <tr
              key={r.id}
              className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <td className="border p-2">{r.id}</td>
              <td className="border p-2">{r.country}</td>
              <td className="border p-2">{r.type}</td>
              <td className="border p-2">{r.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
