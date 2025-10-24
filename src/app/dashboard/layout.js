// app/dashboard/layout.js
"use client";

import { useEffect, useState } from "react";
import DashboardHeader from "./_components/DashboardHeader";
import Sidebar from "./_components/Sidebar";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "../(base)/Components/ThemeProvider";

const DashboardLayout = ({ children }) => {
    const { user, loading } = useAuth();
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [userRole, setUserRole] = useState("user");
    const [fetchLoading, setFetchLoading] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    useEffect(() => setMounted(true), []);

    const handleGetUserRole = async () => {
        try {
            const res = await fetch(`/api/users?uid=${user?.uid}`);
            const data = await res.json();
            setUserRole(data.user?.role || "user");
            setFetchLoading(false);
        } catch (err) {
            console.error("Failed to fetch user role:", err);
            setUserRole("user");
        }
    };

    useEffect(() => {
        if (user?.uid) handleGetUserRole();
    }, [user?.uid]);

    if (loading || !mounted || fetchLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div
                    className={`w-12 h-12 rounded-full animate-spin ${theme === "dark" ? "border-t-4 border-cyan-400" : "border-t-4 border-green-500"
                        }`}
                />
            </div>
        );
    }

    return (
        <div className="flex h-screen">
            {/* Sidebar fixed */}
            <div>
                <Sidebar userRole={userRole} isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
            </div>

            <div className="flex-1 flex flex-col">
                {/* Header fixed */}
                <DashboardHeader userRole={userRole} setIsSidebarOpen={setIsSidebarOpen} />
                {/* Main content scrollable */}
                <main className="flex-1 overflow-auto p-6 mt-16">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
