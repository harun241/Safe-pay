// app/dashboard/page.jsx
"use client";

import { useAuth } from "@/context/AuthContext";
import UserDashboard from "./_components/UserDashboard";
import AdminDashboard from "./_components/AdminDashboard";
import ModeratorDashboard from "./_components/ModeratorDashboard";
import { useEffect, useState } from "react";
import { set } from "mongoose";

export default function DashboardHome() {
  const { user  } = useAuth();
  const [userRole, setUserRole] = useState("user");
  const [userLoading, setUserLoading] = useState(true);


  useEffect(() => {
    const fetchRole = async () => {
      if (!user?.uid) return;
      setUserLoading(true);
      const res = await fetch(`/api/users?uid=${user?.uid}`);
      const data = await res.json();
      setUserRole(data.user?.role || "user");
      setUserLoading(false);
    };
    fetchRole();
  }, [user?.uid]);

  if(userLoading){
    return <h1>loading</h1>
  }


  switch (userRole) {
    case "admin":
      return <AdminDashboard />;
    case "moderator":
      return <ModeratorDashboard />;
    default:
      return <UserDashboard />;
  }
}
