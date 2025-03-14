
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DesktopNavigationProps {
  isMegaMenuOpen: boolean;
  toggleMegaMenu: () => void;
  megaMenuTriggerRef: React.RefObject<HTMLButtonElement>;
}

export default function DesktopNavigation({ 
  isMegaMenuOpen, 
  toggleMegaMenu, 
  megaMenuTriggerRef 
}: DesktopNavigationProps) {
  return (
    <nav className="hidden md:flex items-center gap-2">
      <button
        ref={megaMenuTriggerRef}
        className="flex items-center px-3 py-2 rounded-md hover:bg-secondary transition-colors"
        onClick={toggleMegaMenu}
        aria-expanded={isMegaMenuOpen}
        aria-controls="mega-menu"
      >
        Kategori
        <ChevronDown className={cn("ml-1 h-4 w-4 transition-transform", isMegaMenuOpen ? "rotate-180" : "")} />
      </button>
      
      <Link to="/tutorials" className="px-3 py-2 rounded-md hover:bg-secondary transition-colors">
        Tutorials
      </Link>
      
      <Link to="/tips-tricks" className="px-3 py-2 rounded-md hover:bg-secondary transition-colors">
        Tips & Tricks
      </Link>
    </nav>
  );
}
