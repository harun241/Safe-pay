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
  Home,
  Cpu,
  FileText,
  Building2,
  User,
  LogOut,
  Settings,
  LayoutDashboard,
  LogIn,
  UserPlus,
  UserPlus2,
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
      <button
        className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
          theme === "dark"
            ? "text-gray-300 hover:text-white hover:bg-white/10"
            : "text-gray-700 hover:text-white hover:bg-green-500/20"
        }`}
      >
        <item.icon className={`w-4 h-4 mr-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`} />
        {item.name}
        <ChevronDown
          size={16}
          className={`ml-2 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={`absolute top-full mt-2 w-64 rounded-xl shadow-xl border z-50 overflow-hidden backdrop-blur-md ${
              theme === "dark"
                ? "bg-gray-950/90 border-gray-700/50"
                : "bg-white/90 border-gray-300/50"
            }`}
          >
            <div className="py-2">
              {item.dropdownItems.map((subItem) => (
                <Link
                  key={`desktop-sub-${subItem.href}`}
                  href={subItem.href}
                  onClick={subItem.onClick}
                  className={`flex items-center w-full text-left px-4 py-2.5 text-sm transition-colors ${
                    theme === "dark"
                      ? "text-gray-300 hover:bg-cyan-500/10 hover:text-cyan-400"
                      : "text-gray-700 hover:bg-green-500/20 hover:text-white"
                  }`}
                >
                  {subItem.label}
                </Link>
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
  const userDropdownItems = [
    { label: "Dashboard", href: "/dashboard", key: "mobile-dashboard" },
    { label: "Account Settings", href: "/settings", key: "mobile-settings" },
    { label: "Logout", href: "#", onClick: logout, key: "mobile-logout" },
  ];

  if (!isOpen) return null;

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
            <div key="mobile-user-logged-in" className="border-b border-gray-800 pb-4">
              <div className="px-3 py-2 mb-2">
                <p className="text-sm font-semibold truncate">{user.displayName || "User"}</p>
                <p className="text-xs truncate text-gray-400">{user.email}</p>
              </div>
              <hr className="border-gray-700 my-1" />
              {userDropdownItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  onClick={() => {
                    setIsOpen(false);
                    if (item.onClick) item.onClick();
                  }}
                  className={`flex items-center w-full rounded-md px-3 py-2 text-sm transition-colors ${
                    item.label === "Logout"
                      ? "text-red-400 hover:bg-red-500/10"
                      : theme === "dark"
                      ? "text-gray-300 hover:bg-white/10 hover:text-white"
                      : "text-gray-700 hover:bg-green-500/20 hover:text-white"
                  }`}
                >
                  {item.label === "Dashboard" && <LayoutDashboard size={16} className="mr-2" />}
                  {item.label === "Account Settings" && <Settings size={16} className="mr-2" />}
                  {item.label === "Logout" && <LogOut size={16} className="mr-2" />}
                  {item.label}
                </Link>
              ))}
            </div>
          ) : (
            <div key="mobile-user-logged-out">
              <Link
                key="mobile-login-link"
                href="/login"
                onClick={() => setIsOpen(false)}
                className="block py-4 text-lg border-b border-gray-800"
              >
                Login
              </Link>
              <Link
                key="mobile-register-link"
                href="/register"
                onClick={() => setIsOpen(false)}
                className="block py-4 text-lg border-b border-gray-800"
              >
                Register
              </Link>
            </div>
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
                  {openSubmenus[item.name] && (
                    <div className="pl-4 pb-2 space-y-2">
                      {item.dropdownItems.map((subItem) => (
                        <Link
                          key={`mobile-sub-${subItem.href}`}
                          href={subItem.href}
                          onClick={() => setIsOpen(false)}
                          className={`block py-2 transition-colors ${
                            theme === "dark"
                              ? "text-gray-400 hover:text-cyan-400"
                              : "text-gray-700 hover:text-cyan-600"
                          }`}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  key={`mobile-nav-link-${item.href}`}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`block py-4 text-lg ${
                    theme === "dark" ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-green-600"
                  }`}
                >
                  {item.name}
                </Link>
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

  if (!mounted) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur-lg border-b border-gray-700/50 h-16">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="h-7 w-7 bg-cyan-400 rounded"></div>
          <div className="hidden lg:flex space-x-2">
            <div className="h-6 w-16 bg-gray-700 rounded"></div>
            <div className="h-6 w-20 bg-gray-700 rounded"></div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-6 w-16 bg-gray-700 rounded lg:hidden"></div>
            <div className="h-6 w-6 bg-gray-600 rounded lg:hidden"></div>
          </div>
        </div>
      </header>
    );
  }

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
                  <Link
                    key={`desktop-link-${item.href}`}
                    href={item.href}
                    className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      theme === "dark"
                        ? "text-gray-300 hover:text-white hover:bg-white/10"
                        : "text-gray-700 hover:text-white hover:bg-green-500/20"
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
                <h1>Doc</h1>
                <ThemeSwitcher />
                {user ? (
                  <div
                    key="desktop-user-menu"
                    onMouseEnter={() => setActiveDropdown("user-menu")}
                    onMouseLeave={() => setActiveDropdown(null)}
                    className="relative"
                  >
                    <button className="flex items-center p-2 rounded-full hover:bg-white/10">
                      <img
                        src={
                          user.photoURL ||
                          `https://ui-avatars.com/api/?name=${
                            encodeURIComponent(user.displayName || user.email)
                          }&background=0ea5e9&color=fff`
                        }
                        alt="User Avatar"
                        className="w-8 h-8 rounded-full"
                        onError={(e) => {
                          e.target.src =
                            "https://ui-avatars.com/api/?name=User&background=0ea5e9&color=fff";
                        }}
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
                              <p className="text-sm font-semibold truncate">
                                {user.displayName || "User"}
                              </p>
                              <p className="text-xs text-gray-400 truncate">{user.email}</p>
                            </div>
                            <hr className="border-gray-700 my-1" />
                            {[
                              { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
                              { label: "Account Settings", href: "/settings", icon: Settings },
                              { label: "Logout", href: "#", onClick: logout, icon: LogOut },
                            ].map((item) => (
                              <Link
                                key={`user-menu-${item.label}`}
                                href={item.href}
                                onClick={item.onClick}
                                className={`flex items-center w-full rounded-md px-3 py-2 text-sm transition-colors ${
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
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="px-4 py-2 rounded-md text-sm font-medium transition-colors hover:bg-green-500/20 hover:text-white"
                    >
                      Login
                    </Link>
                    <Link
                      href="/register"
                      className="px-4 py-2 rounded-md text-sm font-medium transition-colors bg-green-500 text-white hover:bg-green-600"
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-md"
              >
                <Menu size={24} />
              </button>

              {/* Mobile User Button */}
              {user && (
                <button
                  onClick={() => setIsMobileUserMenuOpen(true)}
                  className="lg:hidden p-2 rounded-md"
                >
                  <img
                    src={
                      user.photoURL ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        user.displayName || user.email
                      )}&background=0ea5e9&color=fff`
                    }
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full"
                  />
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Panels */}
      <MobileNav
        isOpen={isMobileMenuOpen}
        setIsOpen={setIsMobileMenuOpen}
        navItems={navItems}
        theme={theme}
      />
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
