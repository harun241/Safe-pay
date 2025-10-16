// app/dashboard/page.jsx
"use client";

import { useAuth } from "@/context/AuthContext";
import UserDashboard from "./_components/UserDashboard";
import AdminDashboard from "./_components/AdminDashboard";
import ModeratorDashboard from "./_components/ModeratorDashboard";
import { useEffect, useState } from "react";

export default function DashboardHome() {
  const { user } = useAuth();
  const [userRole, setUserRole] = useState("user");

  useEffect(() => {
    const fetchRole = async () => {
      if (!user?.uid) return;
      const res = await fetch(`/api/users?uid=${user?.uid}`);
      const data = await res.json();
      setUserRole(data.user?.role || "user");
    };
    fetchRole();
  }, [user?.uid]);

  switch (userRole) {
    case "admin":
      return <AdminDashboard />;
    case "moderator":
      return <ModeratorDashboard />;
    default:
      return <UserDashboard />;
  }
}
