"use client";

export default function FraudStats({ filter }) {
  // Example static stats
  const stats = { total: 1200, new: 45, resolved: 1020 };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-green-500 dark:bg-green-700 p-4 rounded-xl shadow text-white">
        <h2 className="text-lg font-medium">Total Cases</h2>
        <p className="text-2xl font-bold">{stats.total}</p>
      </div>
      <div className="bg-red-500 dark:bg-red-700 p-4 rounded-xl shadow text-white">
        <h2 className="text-lg font-medium">New Alerts</h2>
        <p className="text-2xl font-bold">{stats.new}</p>
      </div>
      <div className="bg-blue-500 dark:bg-blue-700 p-4 rounded-xl shadow text-white">
        <h2 className="text-lg font-medium">Resolved Cases</h2>
        <p className="text-2xl font-bold">{stats.resolved}</p>
      </div>
    </div>
  );
}
