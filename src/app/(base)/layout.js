'use client'
// import "./globals.css";
import { useTheme } from "next-themes";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import Script from "next/script";

export default function BaseLayout({ children }) {
  const { theme } = useTheme()
  return (
    <>
      <div >
        <Navbar></Navbar>
        <div className={`md:px-3 lg:px-0 ${theme === "dark"
            ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white"
            : "bg-gradient-to-br from-slate-100 via-white to-slate-100 text-slate-900"
          }`}>
          {children}
        </div>
        <div className={`transition-colors duration-500 ${theme === "dark"
            ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white"
            : "bg-gradient-to-br from-slate-100 via-white to-slate-100 text-slate-900"
          }`}>
          <Footer></Footer> 
            <Script id="tawkto" strategy="afterInteractive">
          {`
            var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
            (function(){
              var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
              s1.async=true;
              s1.src='https://embed.tawk.to/68e33b93385fee1952fe5d70/1j6rq1eao';
              s1.charset='UTF-8';
              s1.setAttribute('crossorigin','*');
              s0.parentNode.insertBefore(s1,s0);
            })();
          `}
        </Script>
        </div>
      </div>
    </>
  ); 
}