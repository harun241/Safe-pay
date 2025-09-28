import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
// redux provider ================
import ReduxProvider from '../Redux/ReduxProvider'
// Theme Toggle Provider ===============
import { ThemeProvider } from "./(base)/Components/ThemeProvider";
import QueryClientProvider from "@/Hooks/QueryClientProvider";



// Metadata
export const metadata = {
  title: "SafePay - AI Fraud Detection",
  description: "AI powered fraud transaction detection system",
};

// Root Layout
export default function RootLayout({ children }) {


  return (
    <html lang="en" suppressHydrationWarning>
      <body
        data-new-gr-c-s-check-loaded="14.1255.0"
        data-gr-ext-installed=""
      >

        <ThemeProvider
          attribute="class" J
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <ReduxProvider>
            <QueryClientProvider>
              <AuthProvider>
                <main className="flex-1 bg-gray-900">{children}</main>
              </AuthProvider>
            </QueryClientProvider>
          </ReduxProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
