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
  Legend,
} from "recharts";

export default function TransactionVelocity() {
  const [data, setData] = useState([]);
  const [userIds, setUserIds] = useState([]);

  useEffect(() => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    fetch(`/api/transactions/velocity?window=minute&tz=${timezone}`)
      .then((res) => res.json())
      .then((raw) => {
        const pivot = {};
        const users = new Set();

        raw.forEach(({ date, user_id, count }) => {
          users.add(user_id);
          if (!pivot[date]) pivot[date] = { date };
          pivot[date][user_id] = count;
        });

        setData(Object.values(pivot));
        setUserIds(Array.from(users));
      });
  }, []);

  console.log(data);

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4 mt-20">
        Transaction Velocity per User (Last 24h)
      </h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{ fontSize: 10 }} />
          <YAxis />
          <Tooltip />
          <Legend />
          {userIds.map((uid, index) => (
            <Bar
              key={uid}
              dataKey={uid}
              stackId="a"
              fill={`hsl(${(index * 60) % 360}, 70%, 50%)`}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
