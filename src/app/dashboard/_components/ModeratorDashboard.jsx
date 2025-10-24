// src/app/dashboard/_components/ModeratorDashboard.jsx
import { useTheme } from "@/app/(base)/Components/ThemeProvider";
import { useAuth } from "@/context/AuthContext";
import {
  AlertTriangle,
  ClipboardCheck,
  ClipboardList,
} from "lucide-react";

export default function ModeratorDashboard() {
  const { user } = useAuth();
  const { theme } = useTheme();

  return (
    <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-8">
      <div className={`p-8 rounded-2xl ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
        <h1 className="text-3xl font-bold mb-4">Moderator Panel</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Welcome, {user?.displayName || "Moderator"}. Here you can review and manage alerts.
        </p>

        
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className={`p-6 rounded-xl ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`}>
            <h2 className="text-xl font-semibold mb-2">Review Alerts</h2>
            <p className="text-sm text-gray-500">
              <AlertTriangle size={16} className="inline mr-1" />
              View and handle all fraud and suspicious activity alerts.
            </p>
          </div>
          <div className={`p-6 rounded-xl ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`}>
            <h2 className="text-xl font-semibold mb-2">Transaction Review</h2>
            <p className="text-sm text-gray-500">
              <ClipboardList size={16} className="inline mr-1" />
              Manually review flagged transactions for approval or rejection.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}