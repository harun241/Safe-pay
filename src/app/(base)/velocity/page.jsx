"use client";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function TransactionVelocity() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone; // auto-detect user's timezone
    fetch(`/api/transactions/velocity?window=minute&tz=${timezone}`)
      .then((res) => res.json())
      .then((res) => {
        console.log("Raw response:", res);
        const formatted = res.map((item) => ({
          date: item.date, // full timestamp like "2025-09-28 08:45"
          count: item.count,
          user_id: item.user_id,
        }));
        setData(formatted);
      });
  }, []);

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">
        Transaction Velocity (Last 24h)
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{ fontSize: 10 }} />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
