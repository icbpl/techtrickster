
import { useEffect } from 'react';
import { Moon } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ThemeToggle() {
  useEffect(() => {
    // Force dark mode by default
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  }, []);

  return (
    <button
      className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-secondary transition-colors duration-300"
      aria-label="Dark mode is enabled"
      disabled
    >
      <div className="absolute transition-all duration-500 ease-in-out">
        <Moon className={cn("size-5 theme-toggle-icon dark opacity-100")} />
      </div>
    </button>
  );
}
