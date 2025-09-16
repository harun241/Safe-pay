'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  if (!mounted) {
    return (
      <div className="w-20 h-10 rounded-2xl bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 animate-pulse backdrop-blur-xl" />
    );
  }

  const isDark = theme === 'dark';

  return (
    <div className="relative">
      {/* glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl blur-xl opacity-30"
        animate={{
          background: isDark
            ? 'radial-gradient(circle, #6366f1 0%, #8b5cf6 100%)'
            : 'radial-gradient(circle, #fbbf24 0%, #f59e0b 100%)',
        }}
        transition={{ duration: 0.8 }}
      />
      
      <motion.button
        aria-label="Toggle theme"
        type="button"
        onClick={toggleTheme}
        className="relative flex items-center w-20 h-10 rounded-2xl cursor-pointer overflow-hidden border border-white/20 backdrop-blur-xl"
        style={{
          boxShadow: isDark
            ? '0 8px 32px rgba(99, 102, 241, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
            : '0 8px 32px rgba(251, 191, 36, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          background: isDark
            ? 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)'
            : 'linear-gradient(135deg, #0ea5e9 0%, #38bdf8 100%)',
        }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        
        <AnimatePresence>
          {isDark ? (
            <motion.div
              key="night-bg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0"
            >
              
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={`star-${i}`}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: [0.3, 1, 0.3], 
                    scale: [0.5, 1, 0.5] 
                  }}
                  transition={{ 
                    duration: 2 + Math.random() * 2,
                    delay: Math.random() * 2,
                    repeat: Infinity
                  }}
                  className="absolute w-1 h-1 bg-white rounded-full"
                  style={{
                    top: `${15 + Math.random() * 70}%`,
                    left: `${20 + Math.random() * 60}%`,
                  }}
                />
              ))}
              
              
              <motion.svg
                className="absolute inset-0 w-full h-full opacity-20"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.2 }}
                transition={{ duration: 1.5, delay: 0.5 }}
              >
                <path
                  d="M15 15 L25 8 L35 12 L45 6"
                  stroke="white"
                  strokeWidth="0.5"
                  fill="none"
                />
              </motion.svg>
            </motion.div>
          ) : (
            <motion.div
              key="day-bg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0"
            >
              
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={`cloud-${i}`}
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ 
                    x: [0, 5, 0], 
                    opacity: [0.2, 0.4, 0.2] 
                  }}
                  transition={{ 
                    duration: 3 + i,
                    delay: i * 0.5,
                    repeat: Infinity
                  }}
                  className="absolute bg-white/30 rounded-full"
                  style={{
                    width: `${8 + Math.random() * 6}px`,
                    height: `${4 + Math.random() * 3}px`,
                    top: `${20 + Math.random() * 60}%`,
                    left: `${30 + i * 15}%`,
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toggle */}
        <motion.div
          layout
          transition={{ 
            type: 'spring', 
            stiffness: 400, 
            damping: 35,
            mass: 0.8
          }}
          className="absolute w-8 h-8 rounded-xl flex items-center justify-center backdrop-blur-sm"
          style={{
            left: isDark ? 'auto' : '4px',
            right: isDark ? '4px' : 'auto',
            background: isDark
              ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
              : 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
            boxShadow: isDark
              ? '0 4px 20px rgba(99, 102, 241, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
              : '0 4px 20px rgba(251, 191, 36, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
          }}
          whileHover={{ 
            scale: 1.1,
            boxShadow: isDark
              ? '0 6px 25px rgba(99, 102, 241, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
              : '0 6px 25px rgba(251, 191, 36, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.4)',
          }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={isDark ? 'moon' : 'sun'}
              initial={{ 
                y: 10, 
                opacity: 0, 
                rotate: isDark ? -180 : 180,
                scale: 0.5
              }}
              animate={{ 
                y: 0, 
                opacity: 1, 
                rotate: 0,
                scale: 1
              }}
              exit={{ 
                y: -10, 
                opacity: 0, 
                rotate: isDark ? 180 : -180,
                scale: 0.5
              }}
              transition={{ 
                duration: 0.4,
                ease: "easeInOut"
              }}
              className="relative"
            >
              {isDark ? (
                <div className="relative">
                  <Moon className="w-4 h-4 text-white drop-shadow-lg" />
                  {/* Moon */}
                  <motion.div
                    className="absolute inset-0 w-4 h-4"
                    animate={{ 
                      boxShadow: [
                        '0 0 10px rgba(255, 255, 255, 0.3)',
                        '0 0 20px rgba(255, 255, 255, 0.5)',
                        '0 0 10px rgba(255, 255, 255, 0.3)'
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
              ) : (
                <div className="relative">
                  <Sun className="w-4 h-4 text-white drop-shadow-lg" />
                  {/* Sun */}
                  <motion.div
                    className="absolute inset-0"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  >
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-0.5 h-1 bg-white/60 rounded-full"
                        style={{
                          top: '50%',
                          left: '50%',
                          transformOrigin: '50% 10px',
                          transform: `translate(-50%, -50%) rotate(${i * 45}deg)`,
                        }}
                        animate={{
                          opacity: [0.3, 0.8, 0.3],
                          scale: [0.8, 1.2, 0.8]
                        }}
                        transition={{
                          duration: 1.5,
                          delay: i * 0.1,
                          repeat: Infinity
                        }}
                      />
                    ))}
                  </motion.div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        
        <motion.div
          key={isDark ? 'dark-ripple' : 'light-ripple'}
          className="absolute inset-0 rounded-2xl"
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{ scale: 1, opacity: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            background: isDark
              ? 'radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(251, 191, 36, 0.3) 0%, transparent 70%)',
          }}
        />
      </motion.button>
    </div>
  );
}