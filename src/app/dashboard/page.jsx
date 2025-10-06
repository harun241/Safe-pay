"use client";

import { useAuth } from "@/context/AuthContext";
import { useTheme } from "next-themes";
import DashboardHeader from "./_components/DashboardHeader";
import Sidebar from "./_components/Sidebar";
import UserDashboard from "./_components/UserDashboard";
import AdminDashboard from "./_components/AdminDashboard";
import ModeratorDashboard from "./_components/ModeratorDashboard";
import { useState, useEffect } from "react";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const { theme } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [userRole, setUserRole] = useState('user');
  const [fetchLoading, setFetchLoading] = useState(true);


  

 useEffect(() => {
  setMounted(true);
}, []);

const handleGetUserRole = async () => {
  try {
    const res = await fetch(`/api/users?uid=${user?.uid}`);
    const data = await res.json();
    setUserRole(data.user?.role || "user");
    setFetchLoading(false)
  } catch (err) {
    console.error("Failed to fetch user role:", err);
    setUserRole("user");
  }
};


useEffect(() => {
  if (user?.uid) {
    handleGetUserRole();
  }
}, [user?.uid]);

if (loading || !mounted || fetchLoading) {
  return (
    <div className="flex items-center justify-center h-screen">
      <div
        className={`w-12 h-12 rounded-full animate-spin ${
          theme === "dark"
            ? "border-t-4 border-cyan-400"
            : "border-t-4 border-green-500"
        }`}
      />
    </div>
  );
}

 




  // user's role
  // const userRole = user?.role || "user"; 

 

  
  const renderDashboard = () => {
    switch (userRole) {
      case "admin":
        return <AdminDashboard />;
      case "moderator":
        return <ModeratorDashboard />;
      case "user":
      default:
        return <UserDashboard />;
    }
  };

  return (
    <div
      className={`flex flex-col h-screen ${
        mounted && theme === "dark"
          ? "bg-gray-950 text-gray-200"
          : "bg-white text-gray-800"
      }`}
    >
      <DashboardHeader userRole={userRole} setIsSidebarOpen={setIsSidebarOpen} />
      <div className="flex flex-1 pt-16 lg:pt-0 overflow-hidden">
        <Sidebar
          userRole={userRole}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <div className="flex-1 flex flex-col overflow-y-auto pt-16">
          {renderDashboard()}
        </div>
      </div>
    </div>
  );
}
