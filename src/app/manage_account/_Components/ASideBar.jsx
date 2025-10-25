"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CreditCard,
  BarChart,
  LifeBuoy,
  Settings,
  ArrowBigLeft,
} from "lucide-react";
import { useTheme } from "@/app/(base)/Components/ThemeProvider";

export default function ASidebar({ isSidebarOpen, setIsSidebarOpen }) {
  const { theme } = useTheme();
  const pathname = usePathname();

  // ✅ Base navigation items only
  const navItems = [
    { name: "Profile", href: "/manage_account", icon: LayoutDashboard },
    { name: "Manage Account", href: "/manage_account/manage_account", icon: BarChart },
    { name: "Help Center", href: "/manage_account/help_center", icon: CreditCard },
    { name: "Security", href: "/manage_account/security", icon: LifeBuoy },
    { name: "Back to home", href: "/", icon: ArrowBigLeft },
  ];

  // ✅ Dashboard always first
  navItems.sort((a, b) => {
    if (a.name === "Profile") return -1;
    if (b.name === "Profile") return 1;
    return 0;
  });

  return (
    <>
      {/* Overlay for mobile */}
           <div 
        className={`fixed inset-0 z-30 bg-black/50 transition-opacity duration-300 lg:hidden ${
          isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsSidebarOpen(false)}
      ></div>
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen lg:top-16 z-40 flex flex-col w-64 border-r overflow-y-auto transform transition-transform duration-300 lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } ${
          theme === "dark"
            ? "bg-gray-900 border-gray-800"
            : "bg-gradient-to-b from-black via-gray-900 to-gray-800 border-gray-700"
        }`}
      >
        {/* Sidebar Navigation */}
        <div className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => {
            const active = pathname.includes(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center p-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  active
                    ? "bg-gradient-to-r from-cyan-500/20 to-green-500/20 text-cyan-400 shadow-lg"
                    : "text-gray-300 hover:text-white hover:bg-white/10"
                }`}
              >
                <item.icon size={20} className={`mr-3 ${active ? "text-cyan-400" : "text-gray-400"}`} />
                {item.name}
              </Link>
            );
          })}
        </div>
      </aside>
    </>
  );
}
