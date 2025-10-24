'use client'
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import ChatSupport from "./Components/ChatBot";
import { useTheme } from "./Components/ThemeProvider";

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

        <div className={`${theme==='dark'? "dark-bg-theme" : "light-bg-theme"}`}>
          <Footer />
        </div>
      </div>

      {/* ChatSupport should be outside of footer & main content to float properly */}
      <ChatSupport />
    </>
  );
}
