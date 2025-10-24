"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";

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
import ThemeSwitcher from "./ThemeSwitcher";
import { useTheme } from "./ThemeProvider";

// --- Desktop Dropdown ---
const DesktopDropdown = ({ item, isOpen, onMouseEnter, onMouseLeave, theme }) => {
  if (!item.dropdownItems) return null;

  return (
    <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className="relative">
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
                <motion.div key={subItem.href} whileHover={{ scale: 1.05 }}>
                  <Link
                    href={subItem.href}
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

// --- Mobile Menu ---
const MobileMenu = ({ isOpen, setIsOpen, navItems, user, logout, theme }) => {
  const [openSubmenus, setOpenSubmenus] = useState({});

  const toggleSubmenu = (name) => {
    setOpenSubmenus((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 bg-black/50"
            onClick={() => setIsOpen(false)}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`fixed top-0 right-0 w-full max-w-sm h-screen z-40 overflow-y-auto shadow-2xl ${
              theme === "dark" ? "bg-gray-950 text-gray-300" : "bg-white text-gray-800"
            }`}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
            >
              <X size={24} />
            </button>

            <div className="p-5 pt-20 space-y-4">
              {/* Nav Items */}
              {navItems.map((item) => (
                <div key={item.name} className="border-b border-gray-800">
                  {item.dropdownItems ? (
                    <>
                      <button
                        onClick={() => toggleSubmenu(item.name)}
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
                              <Link
                                key={subItem.href}
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
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`block py-4 text-lg transition-transform duration-200 ${
                        theme === "dark" ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-green-600"
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}

              {/* User Section */}
              <div className="pt-4 border-t border-gray-800">
                {user ? (
                  <>
                    <p className="text-sm font-semibold">{user.displayName || "User"}</p>
                    <p className="text-xs text-gray-400">{user.email}</p>
                    <Link
                      href="/dashboard"
                      onClick={() => setIsOpen(false)}
                      className="block py-2 text-sm hover:text-green-500"
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/dashboard/profile"
                      onClick={() => setIsOpen(false)}
                      className="block py-2 text-sm hover:text-green-500"
                    >
                      Account Settings
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setIsOpen(false);
                      }}
                      className="block py-2 text-sm text-red-500 hover:text-red-600"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      onClick={() => setIsOpen(false)}
                      className="block py-2 text-lg hover:text-green-500"
                    >
                      Login
                    </Link>
                    <Link
                      href="/register"
                      onClick={() => setIsOpen(false)}
                      className="block py-2 text-lg hover:text-green-500"
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// --- Main Navbar ---
export default function Navbar() {
  const { theme } = useTheme();
  const { user, logout } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [isMobileMenuOpen]);

  const navItems = [
    {
      name: "Technology",
      href: "/features",
      icon: Cpu,
      dropdownItems: [
        { label: "AI & Machine Learning", href: "/machinelearning" },
        { label: "Intelligent Risk Decisioning", href: "/risk" },
        { label: "Global Anti-Fraud Network", href: "/globalfraud" },
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
          isScrolled || isMobileMenuOpen
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
                    key={item.name}
                    item={item}
                    isOpen={activeDropdown === item.name}
                    onMouseEnter={() => setActiveDropdown(item.name)}
                    onMouseLeave={() => setActiveDropdown(null)}
                    theme={theme}
                  />
                ) : (
                  <Link
                    key={item.name}
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
                )
              )}
            </nav>

            {/* Right Section */}
            <div className="flex items-center space-x-2">
              <div className="hidden lg:flex items-center space-x-2">
                <ThemeSwitcher />
                {user ? (
                  <div className="relative">
                    {/* Profile Image */}
                    <button
                      onClick={() =>
                        setActiveDropdown((prev) =>
                          prev === "user-menu" ? null : "user-menu"
                        )
                      }
                      className="relative flex items-center justify-center w-10 h-10 rounded-full overflow-hidden hover:scale-105 transition-transform"
                    >
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
                              className="flex items-center w-full rounded-md px-3 py-2 text-sm hover:scale-105 transition-transform"
                            >
                              <LayoutDashboard className="mr-2" size={16} /> Dashboard
                            </Link>
                            <Link
                              href="/manage_account"
                              className="flex items-center w-full rounded-md px-3 py-2 text-sm hover:scale-105 transition-transform"
                            >
                              <Settings className="mr-2" size={16} /> Account Manager
                            </Link>
                            <button
                              onClick={logout}
                              className="flex items-center w-full rounded-md px-3 py-2 text-sm text-red-400 hover:scale-105 transition-transform hover:bg-red-500/10"
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

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        setIsOpen={setIsMobileMenuOpen}
        navItems={navItems}
        user={user}
        logout={logout}
        theme={theme}
      />
    </>
  );
}
