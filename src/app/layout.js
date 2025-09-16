import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import { AuthProvider } from "@/context/AuthContext";
// redux provider ================
import ReduxProvider from '../Redux/ReduxProvider'


// Google Fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

// Metadata
export const metadata = {
  title: "SafePay - AI Fraud Detection",
  description: "AI powered fraud transaction detection system",
};

// Root Layout
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <ReduxProvider>
          <AuthProvider>
            <Navbar /> {/* Navbar handles dark toggle */}
            <main className="flex-1 pt-16">{children}</main>
           
            <Footer />
          </AuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
