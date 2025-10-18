"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";

import { useAuth } from "@/context/AuthContext";
import { ThemeSwitcher } from "./ThemeSwitcher";

import {
  Shield,
  Menu,
  X,
  ChevronDown,
  Cpu,
  FileText,
  Building2,
  LayoutDashboard,
  Settings,
  LogOut,
  Dock,
} from "lucide-react";

// --- Desktop Dropdown ---
const DesktopDropdown = ({ item, isOpen, onMouseEnter, onMouseLeave, theme }) => {
  if (!item.dropdownItems) return null;

  return (
    <div
      key={`desktop-dropdown-${item.name}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="relative"
    >
      <motion.button
        whileHover={{ scale: 1.05 }}
        className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-transform duration-200 ${
          theme === "dark"
            ? "text-gray-300 hover:text-white hover:bg-white/10"
            : "text-gray-700 hover:text-black hover:bg-green-500/20"
        }`}
      >
        <item.icon
          className={`w-4 h-4 mr-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
        />
        {item.name}
        <ChevronDown
          size={16}
          className={`ml-2 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={`absolute top-full mt-2 w-64 rounded-xl shadow-xl border z-50 overflow-hidden backdrop-blur-md ${
              theme === "dark" ? "bg-gray-950/90 border-gray-700/50" : "bg-white/90 border-gray-300/50"
            }`}
          >
            <div className="py-2">
              {item.dropdownItems.map((subItem) => (
                <motion.div key={`desktop-sub-${subItem.href}`} whileHover={{ scale: 1.05 }}>
                  <Link
                    href={subItem.href}
                    onClick={subItem.onClick}
                    className={`flex items-center w-full text-left px-4 py-2.5 text-sm transition-transform duration-200 ${
                      theme === "dark"
                        ? "text-gray-300 hover:bg-cyan-500/10 hover:text-cyan-400"
                        : "text-gray-700 hover:bg-green-500/20 hover:text-black"
                    }`}
                  >
                    {subItem.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Mobile User Menu ---
const MobileUserMenu = ({ isOpen, setIsOpen, user, logout, theme }) => {
  if (!isOpen) return null;

  const userDropdownItems = [
    { label: "Dashboard", href: "/dashboard", key: "mobile-dashboard", icon: LayoutDashboard },
    { label: "Account Settings", href: "/settings", key: "mobile-settings", icon: Settings },
    { label: "Logout", href: "#", key: "mobile-logout", icon: LogOut, onClick: logout },
  ];

  return (
    <>
      <motion.div
        key="mobile-user-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="lg:hidden fixed inset-0 z-30 bg-black/50"
        onClick={() => setIsOpen(false)}
      />
      <motion.div
        key="mobile-user-panel"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`lg:hidden fixed top-0 right-0 w-full max-w-sm h-screen z-40 overflow-y-auto shadow-2xl ${
          theme === "dark" ? "bg-gray-950 text-gray-300" : "bg-white text-gray-800"
        }`}
      >
        <div className="p-5 pt-20">
          {user ? (
            <div className="border-b border-gray-800 pb-4">
              <div className="px-3 py-2 mb-2">
                <p className="text-sm font-semibold truncate">{user.displayName || "User"}</p>
                <p className="text-xs truncate text-gray-400">{user.email}</p>
              </div>
              <hr className="border-gray-700 my-1" />
              {userDropdownItems.map((item) => (
                <motion.div key={item.key} whileHover={{ scale: 1.05 }}>
                  <Link
                    href={item.href}
                    onClick={() => {
                      setIsOpen(false);
                      if (item.onClick) item.onClick();
                    }}
                    className={`flex items-center w-full rounded-md px-3 py-2 text-sm transition-transform duration-200 ${
                      item.label === "Logout"
                        ? "text-red-400 hover:bg-red-500/10"
                        : theme === "dark"
                        ? "text-gray-300 hover:bg-white/10 hover:text-white"
                        : "text-gray-700 hover:bg-green-500/20 hover:text-white"
                    }`}
                  >
                    {item.icon && <item.icon className="mr-2" size={16} />}
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <>
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="block py-4 text-lg transition-transform duration-200 hover:scale-105"
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={() => setIsOpen(false)}
                className="block py-4 text-lg transition-transform duration-200 hover:scale-105"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </motion.div>
    </>
  );
};

// --- Mobile Navigation ---
const MobileNav = ({ isOpen, setIsOpen, navItems, theme }) => {
  const [openSubmenus, setOpenSubmenus] = useState({});

  const handleSubMenuToggle = (e, itemName) => {
    e.preventDefault();
    setOpenSubmenus((prev) => ({ ...prev, [itemName]: !prev[itemName] }));
  };

  if (!isOpen) return null;

  return (
    <>
      <motion.div
        key="mobile-nav-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="lg:hidden fixed inset-0 z-30 bg-black/50"
        onClick={() => setIsOpen(false)}
      />
      <motion.div
        key="mobile-nav-panel"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`lg:hidden fixed top-0 right-0 w-full max-w-sm h-screen z-40 overflow-y-auto shadow-2xl ${
          theme === "dark" ? "bg-gray-950 text-gray-300" : "bg-white text-gray-800"
        }`}
      >
        <div className="p-5 pt-20">
          {navItems.map((item) => (
            <div key={`mobile-nav-item-${item.name}`} className="border-b border-gray-800">
              {item.dropdownItems ? (
                <>
                  <button
                    onClick={(e) => handleSubMenuToggle(e, item.name)}
                    className="w-full flex items-center justify-between py-4 text-lg"
                  >
                    <span>{item.name}</span>
                    <ChevronDown
                      size={20}
                      className={`transition-transform duration-300 ${
                        openSubmenus[item.name] ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {openSubmenus[item.name] && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="pl-4 pb-2 space-y-2 overflow-hidden"
                      >
                        {item.dropdownItems.map((subItem) => (
                          <motion.div key={`mobile-sub-${subItem.href}`} whileHover={{ scale: 1.05 }}>
                            <Link
                              href={subItem.href}
                              onClick={() => setIsOpen(false)}
                              className={`block py-2 transition-transform duration-200 ${
                                theme === "dark"
                                  ? "text-gray-400 hover:text-cyan-400"
                                  : "text-gray-700 hover:text-cyan-600"
                              }`}
                            >
                              {subItem.label}
                            </Link>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <motion.div whileHover={{ scale: 1.05 }} key={`mobile-link-${item.href}`}>
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`block py-4 text-lg transition-transform duration-200 ${
                      theme === "dark" ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-green-600"
                    }`}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </>
  );
};

// --- Main Navbar ---
export default function Navbar() {
  const { theme } = useTheme();
  const { user, logout } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileUserMenuOpen, setIsMobileUserMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow =
      isMobileMenuOpen || isMobileUserMenuOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [isMobileMenuOpen, isMobileUserMenuOpen]);

  const navItems = [
    {
      name: "Technology",
      href: "/features",
      icon: Cpu,
      dropdownItems: [
        { label: "AI & Machine Learning", href: "/machinelearning" },
        { label: "Intelligent Risk Decisioning", href: "/risk" },
        { label: "Global Anti-Fraud Network", href: "/features/fraud-network" },
        { label: "Data Hub", href: "/features/data-hub" },
      ],
    },
    {
      name: "Resources",
      href: "/resources",
      icon: FileText,
      dropdownItems: [
        { label: "Fraud Prevention", href: "/resources/fraud" },
        { label: "Entity Risk Solutions", href: "/resources/entity-risk" },
        { label: "Compliance Guides", href: "/resources/compliance" },
      ],
    },
    {
      name: "Company",
      href: "/company",
      icon: Building2,
      dropdownItems: [
        { label: "About Us", href: "/about" },
        { label: "Careers", href: "/careers" },
        { label: "Contact Us", href: "/contact" },
      ],
    },
    {
      name: "Document",
      href: "/documentation",
      icon: Dock,
    },
  ];

  if (!mounted) return null;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || isMobileMenuOpen || isMobileUserMenuOpen
            ? theme === "dark"
              ? "bg-gray-950/80 backdrop-blur-lg border-b border-gray-700/50 shadow-lg"
              : "bg-white/80 backdrop-blur-lg border-b border-gray-300 shadow-md"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <Shield
                className={`h-7 w-7 transition-colors ${
                  theme === "dark" ? "text-cyan-400" : "text-green-500"
                }`}
              />
              <span
                className={`font-bold text-xl transition-colors ${
                  theme === "dark" ? "text-cyan-400" : "text-green-500"
                }`}
              >
                SafePay
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center space-x-2">
              {navItems.map((item) =>
                item.dropdownItems ? (
                  <DesktopDropdown
                    key={`desktop-item-${item.name}`}
                    item={item}
                    isOpen={activeDropdown === item.name}
                    onMouseEnter={() => setActiveDropdown(item.name)}
                    onMouseLeave={() => setActiveDropdown(null)}
                    theme={theme}
                  />
                ) : (
                  <motion.div whileHover={{ scale: 1.05 }} key={`desktop-link-${item.href}`}>
                    <Link
                      href={item.href}
                      className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-transform duration-200 ${
                        theme === "dark"
                          ? "text-gray-300 hover:text-white hover:bg-white/10"
                          : "text-gray-700 hover:text-black hover:bg-green-500/20"
                      }`}
                    >
                      <item.icon
                        className={`w-4 h-4 mr-2 ${
                          theme === "dark" ? "text-gray-300" : "text-gray-700"
                        }`}
                      />
                      {item.name}
                    </Link>
                  </motion.div>
                )
              )}
            </nav>

            {/* Right Section */}
            <div className="flex items-center space-x-2">
              <div className="hidden lg:flex items-center space-x-2">
                <ThemeSwitcher />
                {user ? (
                  <div
                    key="desktop-user-menu"
                    onMouseEnter={() => setActiveDropdown("user-menu")}
                    onMouseLeave={() => setActiveDropdown(null)}
                    className="relative flex items-center justify-center"
                  >
                    {/* Rotating Dashed Border */}
                    <motion.div
                      className="absolute -inset-1 rounded-full border-2 border-dashed border-green-500 dark:border-cyan-400"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    />
                    {/* Profile Image */}
                    <button className="relative z-10 flex items-center justify-center w-10 h-10 rounded-full overflow-hidden hover:scale-105 transition-transform">
                      <img
                        src={
                          user.photoURL ||
                          `https://ui-avatars.com/api/?name=${encodeURIComponent(
                            user.displayName || user.email
                          )}&background=0ea5e9&color=fff`
                        }
                        alt="User Avatar"
                        className="w-full h-full rounded-full object-cover"
                      />
                    </button>

                    <AnimatePresence>
                      {activeDropdown === "user-menu" && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className={`absolute top-full right-0 mt-2 w-56 rounded-xl shadow-xl border z-50 overflow-hidden backdrop-blur-md ${
                            theme === "dark"
                              ? "bg-gray-950/90 border-gray-700/50"
                              : "bg-white/90 border-gray-300/50"
                          }`}
                        >
                          <div className="p-2">
                            <div className="px-3 py-2">
                              <p className="text-sm font-semibold truncate">{user.displayName || "User"}</p>
                              <p className="text-xs text-gray-400 truncate">{user.email}</p>
                            </div>
                            <hr className="border-gray-700 my-1" />
                            <Link
                              href="/dashboard"
                              className={`flex items-center w-full rounded-md px-3 py-2 text-sm transition-transform duration-200 hover:scale-105 ${
                                theme === "dark"
                                  ? "text-gray-300 hover:bg-white/10 hover:text-white"
                                  : "text-gray-700 hover:bg-green-500/20 hover:text-white"
                              }`}
                            >
                              <LayoutDashboard className="mr-2" size={16} /> Dashboard
                            </Link>
                            <Link
                              href="/settings"
                              className={`flex items-center w-full rounded-md px-3 py-2 text-sm transition-transform duration-200 hover:scale-105 ${
                                theme === "dark"
                                  ? "text-gray-300 hover:bg-white/10 hover:text-white"
                                  : "text-gray-700 hover:bg-green-500/20 hover:text-white"
                              }`}
                            >
                              <Settings className="mr-2" size={16} /> Account Settings
                            </Link>
                            <button
                              onClick={logout}
                              className={`flex items-center w-full rounded-md px-3 py-2 text-sm text-red-400 transition-transform duration-200 hover:scale-105 hover:bg-red-500/10`}
                            >
                              <LogOut className="mr-2" size={16} /> Logout
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    href="/login"
                    className="px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:scale-105 bg-green-500 text-black hover:bg-green-600"
                  >
                    Login
                  </Link>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                className="lg:hidden p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Nav */}
      <MobileNav
        isOpen={isMobileMenuOpen}
        setIsOpen={setIsMobileMenuOpen}
        navItems={navItems}
        theme={theme}
      />

      {/* Mobile User Menu */}
      <MobileUserMenu
        isOpen={isMobileUserMenuOpen}
        setIsOpen={setIsMobileUserMenuOpen}
        user={user}
        logout={logout}
        theme={theme}
      />
    </>
  );
}
