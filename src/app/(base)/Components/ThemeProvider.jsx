'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';

export function ThemeProvider({ children, ...props }) {
  return (
    <NextThemesProvider
      attribute="class"
<<<<<<< HEAD
      defaultTheme="dark"       
      enableSystem={true}      
=======
      defaultTheme="dark"
      enableSystem
>>>>>>> 0bbccc81bc77cb333eb46689c53299634e2992b9
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
