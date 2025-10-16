'use client'
import { useTheme } from "next-themes";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import ChatSupport from "./Components/ChatBot";

export default function BaseLayout({ children }) {
  const { theme } = useTheme()
  return (
    <>
      <div>
        <Navbar />
        <div className={`md:px-3 lg:px-0 ${theme === "dark"
            ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white"
            : "bg-gradient-to-br from-slate-100 via-white to-slate-100 text-slate-900"
          }`}>
          {children}
        </div>

        <Footer />
      </div>

      {/* ChatSupport should be outside of footer & main content to float properly */}
      <ChatSupport />
    </>
  ); 
}
