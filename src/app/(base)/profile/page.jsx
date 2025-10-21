"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-hot-toast";

export default function SettingsPage() {
  const { user, updateUserProfile, updateUserPassword } = useAuth();
  const { theme, setTheme } = useTheme();

  const [displayName, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [themePref, setThemePref] = useState("system");
  const [language, setLanguage] = useState("en");
  const [notifications, setNotifications] = useState(true);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || "");
      setPhotoURL(user.photoURL || "");
      setThemePref(localStorage.getItem("theme") || "system");
      setLanguage(localStorage.getItem("language") || "en");
      setNotifications(JSON.parse(localStorage.getItem("notifications")) ?? true);
    }
  }, [user]);

  const handleSave = async (e) => {
    e.preventDefault();

    if (newPassword && newPassword !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      await updateUserProfile({ displayName, photoURL });
      if (newPassword) await updateUserPassword(newPassword);

      localStorage.setItem("theme", themePref);
      localStorage.setItem("language", language);
      localStorage.setItem("notifications", notifications);
      setTheme(themePref); // Apply theme globally

      toast.success("Profile & settings updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile/settings.");
    }
  };

  const handleReset = () => {
    setDisplayName(user.displayName || "");
    setPhotoURL(user.photoURL || "");
    setThemePref("system");
    setLanguage("en");
    setNotifications(true);
    setNewPassword("");
    setConfirmPassword("");
  };

  if (!user) return <p className="p-4">Please login to access your settings.</p>;

  // Conditional text and background color
  const textColor = theme === "dark" ? "text-white" : "text-gray-900";
  const bgColor = theme === "dark" ? "bg-gray-900" : "bg-white";
  const borderColor = theme === "dark" ? "border-gray-700" : "border-gray-300";

  const inputClass = `w-full px-3 py-2 border rounded-md ${borderColor} ${textColor} bg-transparent`;

  return (
    <div className={`max-w-2xl  mx-auto p-6  min-h-screen rounded-xl shadow-md ${bgColor}`}>
      <h1 className={`text-2xl font-bold mb-6 ${textColor}`}>Profile Settings</h1>
      <form onSubmit={handleSave} className="space-y-4">

        {/* Display Name */}
        <div>
          <label className={`block text-sm font-medium mb-1 ${textColor}`}>Display Name</label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className={inputClass}
          />
        </div>

        {/* Profile Picture */}
        <div>
          <label className={`block text-sm font-medium mb-1 ${textColor}`}>Profile Picture URL</label>
          <input
            type="text"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
            className={inputClass}
          />
        </div>

        {/* Email (readonly) */}
        <div>
          <label className={`block text-sm font-medium mb-1 ${textColor}`}>Email</label>
          <input type="email" value={user.email} readOnly className={`${inputClass} bg-gray-100`} />
        </div>

        {/* Password */}
        <div>
          <label className={`block text-sm font-medium mb-1 ${textColor}`}>New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label className={`block text-sm font-medium mb-1 ${textColor}`}>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={inputClass}
          />
        </div>

        {/* Theme */}
        <div>
          <label className={`block text-sm font-medium mb-1 ${textColor}`}>Theme</label>
          <select
            value={themePref}
            onChange={(e) => setThemePref(e.target.value)}
            className={inputClass}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="system">System</option>
          </select>
        </div>

        {/* Language */}
        <div>
          <label className={`block text-sm font-medium mb-1 ${textColor}`}>Language</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className={inputClass}
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
          </select>
        </div>

        {/* Notifications */}
        <div className={`flex items-center space-x-2 ${textColor}`}>
          <input
            type="checkbox"
            checked={notifications}
            onChange={(e) => setNotifications(e.target.checked)}
            className="accent-green-500"
          />
          <span>Enable Notifications</span>
        </div>

        {/* Buttons */}
        <div className="flex space-x-4 mt-4">
          <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 flex-1">
            Save Settings
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 flex-1"
          >
            Reset Defaults
          </button>
        </div>
      </form>
    </div>
  );
}
