'use client'
// import "./globals.css";
import { useTheme } from "next-themes";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";

export default function BaseLayout({ children }) {
  const { theme } = useTheme()
  return (
    <>
      <div >
        <Navbar></Navbar>
        <div className="md:px-3 lg:max-w-[1600px] mx-auto">
          {children}
        </div>
        
        <div className={`transition-colors duration-500 ${theme === "dark"
          ? "bg-slate-900 text-slate-300"
          : "bg-white text-slate-600"
          }`}>
          <Footer></Footer>
        </div>
      </div>
    </>
  );
}