"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useTranslation } from "next-i18next";

export default function WebsiteSettingsPage() {
  const { theme, setTheme } = useTheme();
  const { t, i18n } = useTranslation("common");

  const defaultSettings = {
    notifications: true,
    language: "en",
    emailMarketing: false,
    emailAlerts: true,
    profileVisibility: "public",
    fontSize: "medium",
    dateFormat: "DD/MM/YYYY",
    timeZone: "UTC",
    defaultHomepage: "dashboard",
    darkModeSchedule: false,
  };

  const [settings, setSettings] = useState(defaultSettings);

  useEffect(() => {
    const saved = localStorage.getItem("Settings");
    if (saved) setSettings(JSON.parse(saved));
  }, []);

  const handleSave = () => {
    localStorage.setItem("Settings", JSON.stringify(settings));
    alert(t("settingsSaved"));
    i18n.changeLanguage(settings.language);
  };

  const handleReset = () => setSettings(defaultSettings);

  const textColor = theme === "dark" ? "text-white" : "text-gray-900";
  const bgColor = theme === "dark" ? "bg-gray-900" : "bg-white";
  const borderColor = theme === "dark" ? "border-gray-700" : "border-gray-300";

  const selectOptionClass = "text-gray-900 dark:text-white";

  return (
    <div className={`max-w-2xl mx-auto p-6 rounded-xl shadow-md ${bgColor}`}>
      <h1 className={`text-3xl font-bold mb-6 ${textColor}`}>{t("websiteSettings")}</h1>

      <div className="space-y-6">
        {/* Theme */}
        <div>
          <label className={`block text-sm font-medium mb-2 ${textColor}`}>{t("theme")}</label>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className={`w-full border rounded px-3 py-2 ${borderColor} ${textColor} bg-transparent appearance-none`}
          >
            <option className={selectOptionClass} value="light">{t("light")}</option>
            <option className={selectOptionClass} value="dark">{t("dark")}</option>
            <option className={selectOptionClass} value="system">{t("system")}</option>
          </select>
        </div>

        {/* Language */}
        <div>
          <label className={`block text-sm font-medium mb-2 ${textColor}`}>{t("language")}</label>
          <select
            value={settings.language}
            onChange={(e) => setSettings({ ...settings, language: e.target.value })}
            className={`w-full border rounded px-3 py-2 ${borderColor} ${textColor} bg-transparent`}
          >
            <option className={selectOptionClass} value="en">{t("english")}</option>
            <option className={selectOptionClass} value="es">{t("spanish")}</option>
            <option className={selectOptionClass} value="fr">{t("french")}</option>
            <option className={selectOptionClass} value="de">{t("german")}</option>
          </select>
        </div>

        {/* Notifications */}
        <div className="flex flex-col space-y-2">
          <label className={`flex items-center space-x-2 ${textColor}`}>
            <input
              type="checkbox"
              checked={settings.notifications}
              onChange={(e) => setSettings({ ...settings, notifications: e.target.checked })}
              className="accent-green-500"
            />
            <span>{t("enableNotifications")}</span>
          </label>

          <label className={`flex items-center space-x-2 ${textColor}`}>
            <input
              type="checkbox"
              checked={settings.emailMarketing}
              onChange={(e) => setSettings({ ...settings, emailMarketing: e.target.checked })}
              className="accent-green-500"
            />
            <span>{t("receiveMarketingEmails")}</span>
          </label>

          <label className={`flex items-center space-x-2 ${textColor}`}>
            <input
              type="checkbox"
              checked={settings.emailAlerts}
              onChange={(e) => setSettings({ ...settings, emailAlerts: e.target.checked })}
              className="accent-green-500"
            />
            <span>{t("receiveSystemAlerts")}</span>
          </label>
        </div>

        {/* Profile Visibility */}
        <div>
          <label className={`block text-sm font-medium mb-2 ${textColor}`}>{t("profileVisibility")}</label>
          <select
            value={settings.profileVisibility}
            onChange={(e) => setSettings({ ...settings, profileVisibility: e.target.value })}
            className={`w-full border rounded px-3 py-2 ${borderColor} ${textColor} bg-transparent`}
          >
            <option className={selectOptionClass} value="public">{t("public")}</option>
            <option className={selectOptionClass} value="private">{t("private")}</option>
          </select>
        </div>

        {/* Font Size */}
        <div>
          <label className={`block text-sm font-medium mb-2 ${textColor}`}>{t("fontSize")}</label>
          <select
            value={settings.fontSize}
            onChange={(e) => setSettings({ ...settings, fontSize: e.target.value })}
            className={`w-full border rounded px-3 py-2 ${borderColor} ${textColor} bg-transparent`}
          >
            <option className={selectOptionClass} value="small">{t("small")}</option>
            <option className={selectOptionClass} value="medium">{t("medium")}</option>
            <option className={selectOptionClass} value="large">{t("large")}</option>
          </select>
        </div>

        {/* Date Format */}
        <div>
          <label className={`block text-sm font-medium mb-2 ${textColor}`}>{t("dateFormat")}</label>
          <select
            value={settings.dateFormat}
            onChange={(e) => setSettings({ ...settings, dateFormat: e.target.value })}
            className={`w-full border rounded px-3 py-2 ${borderColor} ${textColor} bg-transparent`}
          >
            <option className={selectOptionClass} value="DD/MM/YYYY">DD/MM/YYYY</option>
            <option className={selectOptionClass} value="MM/DD/YYYY">MM/DD/YYYY</option>
            <option className={selectOptionClass} value="YYYY-MM-DD">YYYY-MM-DD</option>
          </select>
        </div>

        {/* Time Zone */}
        <div>
          <label className={`block text-sm font-medium mb-2 ${textColor}`}>{t("timeZone")}</label>
          <select
            value={settings.timeZone}
            onChange={(e) => setSettings({ ...settings, timeZone: e.target.value })}
            className={`w-full border rounded px-3 py-2 ${borderColor} ${textColor} bg-transparent`}
          >
            <option className={selectOptionClass} value="UTC">UTC</option>
            <option className={selectOptionClass} value="GMT">GMT</option>
            <option className={selectOptionClass} value="EST">EST</option>
            <option className={selectOptionClass} value="PST">PST</option>
          </select>
        </div>

        {/* Default Homepage */}
        <div>
          <label className={`block text-sm font-medium mb-2 ${textColor}`}>{t("defaultHomepage")}</label>
          <select
            value={settings.defaultHomepage}
            onChange={(e) => setSettings({ ...settings, defaultHomepage: e.target.value })}
            className={`w-full border rounded px-3 py-2 ${borderColor} ${textColor} bg-transparent`}
          >
            <option className={selectOptionClass} value="dashboard">{t("dashboard")}</option>
            <option className={selectOptionClass} value="profile">{t("profile")}</option>
            <option className={selectOptionClass} value="feed">{t("feed")}</option>
          </select>
        </div>

        {/* Dark Mode Schedule */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={settings.darkModeSchedule}
            onChange={(e) => setSettings({ ...settings, darkModeSchedule: e.target.checked })}
            className="accent-green-500"
          />
          <span className={`${textColor}`}>{t("enableDarkModeSchedule")}</span>
        </div>

        {/* Buttons */}
        <div className="flex space-x-4 mt-4">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex-1"
          >
            {t("save")}
          </button>
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors flex-1"
          >
            {t("reset")}
          </button>
        </div>
      </div>
    </div>
  );
}
