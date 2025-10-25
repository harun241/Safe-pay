// import "./globals.css";
// import { AuthProvider } from "@/context/AuthContext";
// import ReduxProvider from "../Redux/ReduxProvider";
// import { ThemeProvider } from "./(base)/Components/ThemeProvider";

// export const metadata = {
//   title: "SafePay - AI Fraud Detection",
//   description: "AI powered fraud transaction detection system",
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <body>
//         <ThemeProvider
//           attribute="class"
//           defaultTheme="dark"      // ✅ Default dark mode
//           enableSystem={false}     // ✅ Ignore OS theme
//           disableTransitionOnChange={false}
//         >
//           <ReduxProvider>
//             <AuthProvider>
//               <main className="flex-1">{children}</main>
//             </AuthProvider>
//           </ReduxProvider>
//         </ThemeProvider>
//       </body>
//     </html>
//   );
// }

import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
// redux provider ================
import ReduxProvider from '../Redux/ReduxProvider'
import { ThemeProvider } from "./(base)/Components/ThemeProvider";

// ✅ Import Google Fonts (Next.js Optimized)
import { Inter, Montserrat } from "next/font/google";

const inter =  Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
});

export const metadata = {
  title: "SafePay - AI Fraud Detection",
  description: "AI powered fraud transaction detection system",
};

// Root Layout
export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${montserrat.variable}`}
      suppressHydrationWarning
    >
      <body className="font-inter">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
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
