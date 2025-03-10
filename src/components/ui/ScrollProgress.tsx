
import { useState, useEffect } from 'react';

export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);
  
  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollPosition = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollPosition / maxScroll, 1);
      setScrollProgress(progress);
    };
    
    window.addEventListener('scroll', updateScrollProgress);
    
    // Initial calculation
    updateScrollProgress();
    
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);
  
  return (
    <div 
      className="scroll-progress" 
      style={{ width: `${scrollProgress * 100}%`, opacity: scrollProgress > 0 ? 1 : 0 }}
      role="progressbar"
      aria-valuenow={scrollProgress * 100}
      aria-valuemin={0}
      aria-valuemax={100}
    />
  );
}
