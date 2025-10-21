"use client";

export default function FraudStats({ filter }) {
  // Example static stats
  const stats = { total: 1200, new: 45, resolved: 1020 };

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="bg-green-500 p-4 rounded shadow text-white">
        <h2>Total Cases</h2>
        <p className="text-2xl font-bold">{stats.total}</p>
      </div>
      <div className="bg-red-500 p-4 rounded shadow text-white">
        <h2>New Alerts</h2>
        <p className="text-2xl font-bold">{stats.new}</p>
      </div>
      <div className="bg-blue-500 p-4 rounded shadow text-white">
        <h2>Resolved Cases</h2>
        <p className="text-2xl font-bold">{stats.resolved}</p>
      </div>
    </div>
  );
}
