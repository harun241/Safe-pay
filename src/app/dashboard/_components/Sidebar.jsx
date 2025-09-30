"use client";

import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CreditCard,
  AlertTriangle,
  BarChart,
  LifeBuoy,
  Users,
  Shield,
  FileText,
  Settings,
  ClipboardList,
  ArrowBigLeft,
} from "lucide-react";


export default function Sidebar({ userRole, isSidebarOpen, setIsSidebarOpen }) {
  const { theme } = useTheme();
  const pathname = usePathname();

  // Define navigation items for different roles
  const baseNavItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Transactions", href: "/dashboard/transactions", icon: BarChart },
    { name: "Card Management", href: "/dashboard/cards", icon: CreditCard },
    { name: "Support", href: "/dashboard/support", icon: LifeBuoy },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
    { name: "Back to home", href: "/", icon: ArrowBigLeft }
  ];

  const adminNavItems = [
    { name: "User Management", href: "/dashboard/users", icon: Users },
    { name: "Model Monitoring", href: "/dashboard/monitoring", icon: BarChart },
    { name: "Audit Logs", href: "/dashboard/logs", icon: FileText },
  ];

  const moderatorNavItems = [
    { name: "Alerts", href: "/dashboard/alerts", icon: AlertTriangle, count: 5 },
    { name: "Review Queue", href: "/dashboard/review", icon: ClipboardList },
  ];

  // Combine nav items based on user role
  let navItems;
  switch (userRole) {
    case "admin":
      navItems = [...baseNavItems, ...adminNavItems];
      break;
    case "moderator":
      navItems = [...baseNavItems, ...moderatorNavItems];
      break;
    case "user":
    default:
      navItems = baseNavItems;
      break;
  }
  
  
  navItems.sort((a, b) => {
    if (a.name === "Dashboard") return -1;
    if (b.name === "Dashboard") return 1;
    return 0;
  });

  return (
    <>
      <div 
        className={`fixed inset-0 z-30 bg-black/50 transition-opacity duration-300 lg:hidden ${
          isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsSidebarOpen(false)}
      ></div>
      <aside
        className={`fixed top-0 left-0 h-screen lg:top-16 z-40 flex flex-col w-64 border-r overflow-y-auto transform transition-transform duration-300 lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } ${
          theme === "dark" ? "bg-gray-900 border-gray-800" : "bg-black border-gray-800"
        } lg:relative lg:flex`}
      >
        
        <div className="flex-1 px-4 py-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsSidebarOpen(false)}
              className={`flex items-center p-2 rounded-lg text-sm font-medium transition-colors ${
                pathname.includes(item.href)
                  ? theme === "dark"
                    ? "bg-cyan-500/10 text-cyan-400"
                    : "bg-green-500/20 text-white"
                  : theme === "dark"
                  ? "text-white hover:bg-gray-800"
                  : "text-white hover:bg-gray-800"
              }`}
            >
              <item.icon size={20} className="mr-3" />
              {item.name}
              {item.count && (
                <span
                  className={`ml-auto px-2 py-0.5 text-xs font-semibold rounded-full ${
                    theme === "dark" ? "bg-red-600 text-white" : "bg-red-500 text-white"
                  }`}
                >
                  {item.count}
                </span>
              )}
            </Link>
          ))}
        </div>
      </aside>
    </>
  );
}