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
            ? "dark-bg-theme "
            : " light-bg-theme"
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
