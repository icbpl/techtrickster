
import { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function BackToTopButton() {
  const [showButton, setShowButton] = useState(false);
  
  // Show back to top button when scrolled down
  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 500);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Back to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  return (
    <button
      className={cn(
        "fixed bottom-8 right-8 p-3 rounded-full bg-primary text-primary-foreground shadow-lg z-30 transition-all",
        showButton ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}
      onClick={scrollToTop}
      aria-label="Back to top"
    >
      <ChevronUp className="size-5" />
    </button>
  );
}
