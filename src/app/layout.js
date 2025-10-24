import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
// redux provider ================
import ReduxProvider from '../Redux/ReduxProvider'
import { ThemeProvider } from "./(base)/Components/ThemeProvider";
// Theme Toggle Provider ===============


// Metadata
export const metadata = {
  title: "SafePay - AI Fraud Detection",
  description: "AI powered fraud transaction detection system",
};

// Root Layout
export default function RootLayout({ children }) {
  return (
    <html lang="en"
      suppressHydrationWarning>
      <body
        data-new-gr-c-s-check-loaded="14.1254.0"
        data-gr-ext-installed="">
        <ThemeProvider>
          <ReduxProvider>
            <AuthProvider>
              <main className="flex-1 ">{children}</main>
            </AuthProvider>
          </ReduxProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
