"use client";

import { useState } from "react";
import ProfileHeader from "./_Components/ProfileHeader";
import ASidebar from "./_Components/ASideBar";

const Profile_layout = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div className="flex flex-col h-screen  overflow-hidden">
            <div>
                {/* Header (fixed within main area) */}
                <ProfileHeader setIsSidebarOpen={setIsSidebarOpen} />
            </div>

            {/* ===== Main Content ===== */}
            <div className="flex-1 flex flex-col">
            {/* ===== Sidebar ===== */}
                <ASidebar isSidebarOpen={isSidebarOpen} />
                {/* Scrollable content area */}
                <main className="flex-1 overflow-auto p-6 mt-16">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Profile_layout;
