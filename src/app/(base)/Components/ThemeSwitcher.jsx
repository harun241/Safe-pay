'use client';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Sun, Moon, Star } from 'lucide-react'; 

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 animate-pulse" />
    );
  }

  return (
    <button
      aria-label="Toggle Dark Mode"
      type="button"
      className="group relative w-10 h-10 rounded-2xl bg-gradient-to-br from-yellow-400 via-orange-500 to-pink-500 dark:from-indigo-500 dark:via-purple-600 dark:to-pink-500 p-0.5 transition-all duration-700 hover:scale-110 hover:rotate-12 hover:shadow-2xl hover:shadow-yellow-500/25 dark:hover:shadow-purple-500/25"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      <div className="relative w-full h-full rounded-2xl bg-white dark:bg-gray-900 flex items-center justify-center transition-all duration-500 overflow-hidden">
        {/* Light mode icon */}
        <Sun
          className={`absolute w-6 h-6 text-yellow-500 transition-all duration-500 transform ${
            theme === 'dark' ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
          }`}
        />

        {/* Dark mode icon (crescent) */}
        <Moon
          className={`absolute w-6 h-6 text-indigo-400 transition-all duration-500 transform ${
            theme === 'dark' ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'
          }`}
        />

        {/* Sparkle effect */}
        <Star
          className={`absolute w-3 h-3 text-pink-400 transition-all duration-700 transform ${
            theme === 'dark' ? 'top-1 right-1 rotate-12 scale-100 opacity-100' : 'top-1 right-1 rotate-0 scale-0 opacity-0'
          }`}
        />

        {/* Glow effect */}
        <div
          className={`absolute inset-0 rounded-2xl transition-all duration-700 ${
            theme === 'dark'
              ? 'bg-gradient-to-br from-purple-500/20 to-pink-500/20'
              : 'bg-gradient-to-br from-yellow-400/20 to-orange-500/20'
          }`}
        />
      </div>
    </button>
  );
}
