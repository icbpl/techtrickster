
import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check if user preference is set
    const userTheme = localStorage.getItem('theme');
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Initial theme setup
    if (userTheme === 'dark' || (!userTheme && systemTheme)) {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-secondary transition-colors duration-300"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <div className="absolute transition-all duration-500 ease-in-out">
        {isDark ? (
          <Moon className={cn("size-5 theme-toggle-icon dark", isDark ? "opacity-100" : "opacity-0")} />
        ) : (
          <Sun className={cn("size-5 theme-toggle-icon", !isDark ? "opacity-100" : "opacity-0")} />
        )}
      </div>
    </button>
  );
}
