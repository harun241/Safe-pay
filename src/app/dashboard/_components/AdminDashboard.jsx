"use client";

import { useAuth } from "@/context/AuthContext";
import { useTheme } from "next-themes";
import {
  Users,
  Shield,
  FileText,
  Plus,
  ArrowDown,
  ArrowUp,
  X,
} from "lucide-react";

export default function AdminDashboard() {
  const { user } = useAuth();
  const { theme } = useTheme();

  return (
    <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">User Management</h1>
        <div className="flex space-x-4">
          <button className="flex items-center px-4 py-2 text-sm font-semibold rounded-md bg-white border dark:bg-gray-800 dark:border-gray-700">
            <FileText size={16} className="mr-2" />
            Export Users
          </button>
          <button className="flex items-center px-4 py-2 text-sm font-semibold text-white rounded-md bg-blue-600 hover:bg-blue-700">
            <Plus size={16} className="mr-2" />
            Add New User
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* User Stats Cards */}
        {renderStatCard("Total Users", "12,847", "+5.2%", <Users />)}
        {renderStatCard("Active Users", "11,203", "+2.8%", <Users />)}
        {renderStatCard("Blocked Users", "1,644", "+12.3%", <Users />)}
        {renderStatCard("Admin Users", "23", "No change", <Shield />)}
      </div>

      <div
        className={`p-6 rounded-2xl shadow-lg border ${
          theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        }`}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">User List</h2>
        </div>
        {/* User Table (Placeholder) */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {/* Dummy data for now*/}
              {renderTableRow(
                "Sarah Johnson",
                "sarah.johnson@email.com",
                "User",
                "Active"
              )}
              {renderTableRow(
                "Michael Chen",
                "michael.chen@email.com",
                "Admin",
                "Active"
              )}
              {/* More rows if needed */}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

const renderStatCard = (title, value, change, icon) => (
  <div className="p-6 rounded-2xl shadow-md border bg-white dark:bg-gray-800 dark:border-gray-700">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
        {title}
      </h3>
      <div className="p-2 rounded-full bg-gray-100 dark:bg-gray-700">{icon}</div>
    </div>
    <div className="flex items-end">
      <div className="text-3xl font-bold">{value}</div>
      <div
        className={`ml-2 text-sm font-medium ${
          change.startsWith("+")
            ? "text-green-500"
            : change.startsWith("-")
            ? "text-red-500"
            : "text-gray-500"
        }`}
      >
        {change}
      </div>
    </div>
  </div>
);

const renderTableRow = (name, email, role, status) => (
  <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 rounded-full bg-gray-300"></div>
        <div>
          <div className="text-sm font-medium">{name}</div>
          <div className="text-xs text-gray-500">ID: USR-001847</div>
        </div>
      </div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
      {email}
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <span
        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
          role === "Admin"
            ? "bg-blue-100 text-blue-800"
            : role === "User"
            ? "bg-green-100 text-green-800"
            : "bg-yellow-100 text-yellow-800"
        }`}
      >
        {role}
      </span>
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
      <span
        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
          status === "Active"
            ? "bg-green-100 text-green-800"
            : "bg-red-100 text-red-800"
        }`}
      >
        {status}
      </span>
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
      {/* Actions */}
    </td>
  </tr>
);