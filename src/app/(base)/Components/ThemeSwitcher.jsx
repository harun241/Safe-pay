'use client';
import { Sun, Moon, Star } from 'lucide-react';
import { useTheme } from './ThemeProvider';

export default function ThemeSwitcher() {
  const { theme, toggleTheme, mounted } = useTheme();

  // Prevent rendering before hydration
  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-2xl bg-gray-300 dark:bg-gray-700 animate-pulse" />
    );
  }

  return (
    <button
      aria-label="Toggle Dark Mode"
      onClick={toggleTheme}
      className="relative w-10 h-10 rounded-2xl bg-gradient-to-br from-yellow-400 via-orange-500 to-pink-500
                 dark:from-indigo-500 dark:via-purple-600 dark:to-pink-500 p-0.5 transition-all duration-500 hover:scale-110 hover:rotate-12"
    >
      <div className="relative w-full h-full rounded-2xl bg-white dark:bg-gray-900 flex items-center justify-center overflow-hidden transition-all duration-500">
        <Sun
          className={`absolute w-6 h-6 text-yellow-500 transition-all duration-500 transform ${theme === 'dark' ? 'scale-0 opacity-0 rotate-90' : 'scale-100 opacity-100 rotate-0'
            }`}
        />
        <Moon
          className={`absolute w-6 h-6 text-indigo-400 transition-all duration-500 transform ${theme === 'dark' ? 'scale-100 opacity-100 rotate-0' : 'scale-0 opacity-0 -rotate-90'
            }`}
        />
        <Star
          className={`absolute w-3 h-3 text-pink-400 transition-all duration-700 transform ${theme === 'dark'
              ? 'top-1 right-1 scale-100 opacity-100 rotate-12'
              : 'top-1 right-1 scale-0 opacity-0 rotate-0'
            }`}
        />
      </div>
    </button>
  );
}
