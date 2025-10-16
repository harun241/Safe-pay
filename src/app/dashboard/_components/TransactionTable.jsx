"use client";

import { useEffect, useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function TransactionTable({ theme }) {
  const { user,loading } = useAuth();
  const [search, setSearch] = useState("");


   const [transactions, setTransaction] = useState([]);
   const [page, setPage] = useState(1);
   const [totalPages, setTotalPages] = useState(1);
 
  


  if(loading){
    return <h1>loading</h1>
  }

useEffect(() => {
  if (!user?.uid) return;

  const fetchUsers = async () => {
    const res = await fetch(`/api/transactions/user-all-transactions?uid=${user.uid}&page=${page}&limit=10`);
    const data = await res.json();
    setTransaction(data?.tran || []);
    setTotalPages(data?.totalPages || 1);
  };

  fetchUsers();
}, [user?.uid, page]);









  const filtered = transactions?.filter((t) =>
  t?.transaction_id?.toLowerCase().includes(search.toLowerCase()) ||
  t?.user_id?.toLowerCase().includes(search.toLowerCase()) ||
  t?.status?.toLowerCase().includes(search.toLowerCase())
);

  return (
    <div className={`overflow-x-auto rounded-lg shadow-md ${theme === "dark" ? "bg-gray-900" : "bg-white"}`}>
      {/* Search */}
      <div className="p-4">
        <input
          type="text"
          placeholder="Search by ID, user or status..."
          className={`w-full p-2 border rounded focus:outline-none focus:ring-2 ${
            theme === "dark"
              ? "border-gray-700 focus:ring-cyan-400 bg-gray-800 text-white placeholder-gray-400"
              : "border-gray-300 focus:ring-green-500 bg-white text-slate-900 placeholder-gray-500"
          }`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <table className="min-w-full divide-y divide-gray-200">
        <thead className={theme === "dark" ? "bg-gray-800" : "bg-gray-50"}>
          <tr>
            {["ID", "User", "Amount", "Date", "Status"].map((head) => (
              <th
                key={head}
                className={`px-4 py-2 text-left text-sm font-medium ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={`divide-y ${theme === "dark" ? "divide-gray-700" : "divide-gray-200"}`}>
          {filtered.length > 0 ? (
            filtered.map((tx) => (
              <tr
                key={tx.id}
                className={`hover:${theme === "dark" ? "bg-gray-800" : "bg-gray-50"}`}
              >
                <td className="px-4 py-2 text-sm">{tx.transaction_id}</td>
                <td className="px-4 py-2 text-sm">{tx.user_id|| "N/A"}</td>
                <td className="px-4 py-2 text-sm">${tx.amount}</td>
                <td className="px-4 py-2 text-sm">{new Date(tx.timestamp).toLocaleString()}</td>
                <td className="px-4 py-2 text-sm">
                  {tx.status === "success" ? (
                    <span className="flex items-center gap-1 text-green-400 font-semibold">
                      <CheckCircle className="w-4 h-4" /> Success
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-red-400 font-semibold">
                      <XCircle className="w-4 h-4" /> Failed
                    </span>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="px-4 py-6 text-center text-gray-400">
                No transactions found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="flex justify-center mt-4 space-x-2 p-4">
  <button
    disabled={page === 1}
    onClick={() => setPage(page - 1)}
    className="px-3 py-1 text-black bg-gray-200 rounded disabled:opacity-50"
  >
    Prev
  </button>
  <span className="px-3 py-1">{page} / {totalPages}</span>
  <button
    disabled={page === totalPages}
    onClick={() => setPage(page + 1)}
    className="px-3 py-1 text-black bg-gray-200 rounded disabled:opacity-50"
  >
    Next
  </button>
</div>
    </div>
  );
}
