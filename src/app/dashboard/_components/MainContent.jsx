"use client";

import { useAuth } from "@/context/AuthContext";
import { useTheme } from "next-themes";
import {
  CreditCard,
  Scan,
  Download,
  Settings,
  AlertTriangle,
  TrendingUp,
  
  ShieldCheck,
  Lock,
  UserCheck,
  ChevronLeft,
  ChevronRight,
  Plus,
  Upload,
} from "lucide-react";


import { LineChart,BarChart,Bar, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { useEffect, useState } from "react";


export default function UserDashboard() {
  const { user } = useAuth();
  const { theme } = useTheme();
  const [transactions ,setTransactions ]=useState([]);
  const [lastTransactionInfo ,setLastTransactionInfo ]=useState(null);

  
const localTime = new Date(lastTransactionInfo?.lastTransactionTime).toLocaleString("en-US", {
  timeZone: "Asia/Kuwait", // or your preferred timezone
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: true
});





  useEffect(() => {
    const fetchStats = async () => {
      const res = await fetch(`/api/transactions/user?uid=${user?.uid}`);
      const data = await res.json();
      setTransactions(data?.recentTransactions)
      setLastTransactionInfo(data?.lastTransactionInfo)
      
    };
  
    fetchStats();
   
  }, [user?.uid]);

  

  const dailyTotals = {};

  transactions?.forEach(txn => {
    const date = new Date(txn.timestamp).toLocaleDateString();
    dailyTotals[date] = (dailyTotals[date] || 0) + txn.amount;
  });

  const data = Object.entries(dailyTotals)
    .map(([date, amount]) => ({ date, amount }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));


  return (
    <div className="flex-1 overflow-x-hidden overflow-y-auto">
      <main className="p-4 md:p-8 space-y-8">
        {/* ================= HEADER ================= */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
            <p className="mt-1 text-gray-500 dark:text-gray-400">
              Welcome back, {user?.displayName || "John"}. Here's your account overview.
            </p>
          </div>
          <div className="flex gap-3">
            <button
  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium shadow hover:shadow-md transition
    bg-gray-100 hover:bg-gray-200 text-gray-800
    dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-100"
>
  <Plus size={16} /> Add Card
</button>

<button
  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium shadow hover:shadow-md transition
    bg-gray-100 hover:bg-gray-200 text-gray-800
    dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-100"
>
  <Upload size={16} /> Export
</button>

          </div>
        </div>

        {/* ================= INFO CARDS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div
            className={`p-6 rounded-2xl shadow-lg border hover:shadow-xl transition-all ${
              theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
            }`}
          >
            <div className="flex items-center gap-4 mb-2">
              <div className="p-3 rounded-full bg-green-500/20 text-green-500">
                <CreditCard size={20} />
              </div>
              <h2 className="text-lg font-semibold">Account Balance</h2>
            </div>
            <p className="text-3xl font-bold">$12,847.32</p>
            <p className="text-sm text-gray-500 mt-1">+2.4% from last month</p>
          </div>

          {/* Risk Score */}
          <div
            className={`p-6 rounded-2xl shadow-lg border hover:shadow-xl transition-all ${
              theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
            }`}
          >
            <div className="flex items-center gap-4 mb-2">
              <div className="p-3 rounded-full bg-cyan-500/20 text-cyan-500">
                <TrendingUp size={20} />
              </div>
              <h2 className="text-lg font-semibold">Risk Score</h2>
            </div>
            <p className="text-3xl font-bold">8.2/10</p>
            <p className="text-sm text-gray-500 mt-1">Low Risk</p>
          </div>

          {/* Last Transaction */}
          <div
            className={`p-6 rounded-2xl shadow-lg border hover:shadow-xl transition-all ${
              theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
            }`}
          >
            <div className="flex items-center gap-4 mb-2">
              <div className="p-3 rounded-full bg-purple-500/20 text-purple-500">
                <CreditCard size={20} />
              </div>
              <h2 className="text-lg font-semibold">Last Transaction</h2>
            </div>
            <p className="text-3xl font-bold">tk {lastTransactionInfo?.lastTransactionAmount}</p>
            <p className="text-sm text-gray-500 mt-1">Amazon - {localTime}</p>
          </div>

          {/* Active Alerts */}
          <div
            className={`p-6 rounded-2xl shadow-lg border hover:shadow-xl transition-all ${
              theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
            }`}
          >
            <div className="flex items-center gap-4 mb-2">
              <div className="p-3 rounded-full bg-red-500/20 text-red-500">
                <AlertTriangle size={20} />
              </div>
              <h2 className="text-lg font-semibold">Active Alerts</h2>
            </div>
            <p className="text-3xl font-bold">3</p>
            <p className="text-sm text-gray-500 mt-1">Requires attention</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ================= LEFT COLUMN ================= */}
          <div className="lg:col-span-2 space-y-6">
            {/* Transaction Activity */}
            <div
              className={`p-6 rounded-2xl shadow-lg border hover:shadow-xl ${
                theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
              }`}
            >
              <div className="flex flex-col items-center justify-between mb-4">
               <h2 className="text-xl mb-4">Transaction Trend (Last 30 Days)</h2>
     <ResponsiveContainer width="100%" height={300}>
  <BarChart data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="date" />
    <YAxis />
    <Tooltip />
    <Bar dataKey="amount" fill="#4ade80" barSize={40} />
  </BarChart>
</ResponsiveContainer>


              </div>
              
            </div>
          </div>

          {/* ================= RIGHT COLUMN ================= */}
          <div className="space-y-6">
  {/* Quick Actions */}
  <div
    className={`p-6 rounded-2xl shadow-lg border ${
      theme === "dark" ? "bg-gray-800 border-gray-700 text-gray-100" : "bg-white border-gray-200 text-gray-800"
    }`}
  >
    <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
    <div className="space-y-3">
      <button className="flex items-center gap-3 w-full px-4 py-2 rounded-lg transition-colors duration-200 
                         hover:bg-gray-100 hover:text-gray-900 
                         dark:hover:bg-gray-700 dark:hover:text-gray-100">
        <CreditCard size={18} /> Add New Card
      </button>
      <button className="flex items-center gap-3 w-full px-4 py-2 rounded-lg transition-colors duration-200 
                         hover:bg-gray-100 hover:text-gray-900 
                         dark:hover:bg-gray-700 dark:hover:text-gray-100">
        <Scan size={18} /> Run Security Check
      </button>
      <button className="flex items-center gap-3 w-full px-4 py-2 rounded-lg transition-colors duration-200 
                         hover:bg-gray-100 hover:text-gray-900 
                         dark:hover:bg-gray-700 dark:hover:text-gray-100">
        <Download size={18} /> Download Report
      </button>
      <button className="flex items-center gap-3 w-full px-4 py-2 rounded-lg transition-colors duration-200 
                         hover:bg-gray-100 hover:text-gray-900 
                         dark:hover:bg-gray-700 dark:hover:text-gray-100">
        <Settings size={18} /> Account Settings
      </button>
    </div>
  </div>

  {/* Security Overview */}
  <div
    className={`p-6 rounded-2xl shadow-lg border ${
      theme === "dark" ? "bg-gray-800 border-gray-700 text-gray-100" : "bg-white border-gray-200 text-gray-800"
    }`}
  >
    <h2 className="text-lg font-semibold mb-4">Security Overview</h2>
    <ul className="space-y-3 text-sm">
      <li className="flex justify-between">
        <span>Two-Factor Authentication</span> <span>Active</span>
      </li>
      <li className="flex justify-between">
        <span>Fraud Monitoring</span> <span>Active</span>
      </li>
      <li className="flex justify-between">
        <span>Data Encryption</span> <span>256-bit SSL</span>
      </li>
      <li className="flex justify-between">
        <span>Last Security Scan</span> <span>2 days ago</span>
      </li>
    </ul>
  </div>
</div>

        </div>

        {/* ================= NOTIFICATIONS ================= */}
        <div
  className={`p-6 rounded-2xl shadow-lg border ${
    theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
  }`}
>
  <h2 className={`text-lg font-semibold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
    Recent Notifications & Alerts
  </h2>

  <div className={`flex items-center justify-between p-4 rounded-lg ${
    theme === "dark" ? "bg-gray-700" : "bg-gray-50"
  }`}>
    <div className="flex items-start gap-3">
      <AlertTriangle className="text-red-500 mt-1" size={20} />
      <div>
        <p className={`font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
          Suspicious Transaction Detected
        </p>
        <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
          Unusual spending pattern detected for transaction at "Tech Store NYC" – $1,247.89
        </p>
        <div className="flex gap-4 mt-2 text-sm">
          <button className={`transition-colors ${theme === "dark" ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-500"}`}>
            Review Transaction
          </button>
          <button className={`transition-colors ${theme === "dark" ? "text-gray-400 hover:text-gray-300" : "text-gray-500 hover:text-gray-600"}`}>
            Dismiss
          </button>
        </div>
      </div>
    </div>
    <span className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-400"}`}>
      2 minutes ago
    </span>
  </div>

  {/* Pagination */}
  <div className="flex justify-center items-center gap-4 mt-4">
    <button className={`p-2 rounded-lg transition-colors ${
      theme === "dark" ? "hover:bg-gray-600" : "hover:bg-gray-100"
    }`}>
      <ChevronLeft size={18} />
    </button>
    <span className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>2 / 6</span>
    <button className={`p-2 rounded-lg transition-colors ${
      theme === "dark" ? "hover:bg-gray-600" : "hover:bg-gray-100"
    }`}>
      <ChevronRight size={18} />
    </button>
  </div>
</div>

      </main>
    </div>
  );
}
