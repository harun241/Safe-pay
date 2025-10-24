"use client";

import { useEffect, useState } from "react";
import TransactionTable from "../_components/TransactionTable";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/app/(base)/Components/ThemeProvider";

export default function TransactionsPage() {
  const { user } = useAuth();
  const { theme } = useTheme();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch(`/api/transactions?uid=${user?.uid}`);
        const data = await res.json();
        setTransactions(data.transactions || []);
      } catch (err) {
        console.error("Failed to fetch transactions:", err);
      } finally {
        setLoading(false);
      }
    };
    if (user?.uid) fetchTransactions();
  }, [user?.uid]);

  return (
    <div className={`flex flex-col gap-6 ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
      <h1 className="text-3xl font-bold">Transactions</h1>
      <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
        View all your transactions in detail.
      </p>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div
            className={`w-12 h-12 border-4 rounded-full animate-spin ${
              theme === "dark" ? "border-t-cyan-400 border-gray-700" : "border-t-green-500 border-gray-300"
            }`}
          />
        </div>
      ) : (
        <TransactionTable transactions={transactions} theme={theme} />
      )}
    </div>
  );
}
