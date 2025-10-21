"use client"

import { useState } from "react";
import ASidebar from "./_Component/ASideBar";
import ProfileHeader from "./_Component/ProfileHeader";

const Profile_layout = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    return (
        <div className="flex">
            <div>
                <ASidebar isSidebarOpen={isSidebarOpen} ></ASidebar>
            </div>
            <div>
                <ProfileHeader setIsSidebarOpen={setIsSidebarOpen}></ProfileHeader>
                {children}
            </div>
        </div>
    );
};

export default Profile_layout;