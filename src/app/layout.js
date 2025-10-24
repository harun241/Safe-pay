import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import ReduxProvider from "../Redux/ReduxProvider";
import { ThemeProvider } from "./(base)/Components/ThemeProvider";

export const metadata = {
  title: "SafePay - AI Fraud Detection",
  description: "AI powered fraud transaction detection system",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"      // ✅ Default dark mode
          enableSystem={false}     // ✅ Ignore OS theme
          disableTransitionOnChange={false}
        >
          <ReduxProvider>
            <AuthProvider>
              <main className="flex-1">{children}</main>
            </AuthProvider>
          </ReduxProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
