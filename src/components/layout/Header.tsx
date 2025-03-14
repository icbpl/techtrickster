
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import ThemeToggle from '../ui/ThemeToggle';
import SearchBar from '../ui/search/SearchBar';
import ScrollProgress from '../ui/ScrollProgress';
import MobileMenu from './MobileMenu';
import MegaMenu from './MegaMenu';
import DesktopNavigation from './DesktopNavigation';

// Mock categories data
const categories = [
  {
    title: 'Programming',
    subcategories: ['JavaScript', 'React', 'Node.js', 'Python', 'Java', 'PHP', 'Ruby', 'C#', 'Go']
  },
  {
    title: 'Hardware',
    subcategories: ['Laptops', 'Desktops', 'Smartphones', 'Tablets', 'Components', 'Peripherals', 'Accessories']
  },
  {
    title: 'Software',
    subcategories: ['Operating Systems', 'Productivity', 'Security', 'Graphics', 'Video Editing', 'Audio', 'Gaming']
  }
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const megaMenuRef = useRef<HTMLDivElement>(null);
  const megaMenuTriggerRef = useRef<HTMLButtonElement>(null);
  
  // Handle scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Initial check
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close mega menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        megaMenuRef.current && 
        !megaMenuRef.current.contains(event.target as Node) && 
        megaMenuTriggerRef.current && 
        !megaMenuTriggerRef.current.contains(event.target as Node)
      ) {
        setIsMegaMenuOpen(false);
      }
    };
    
    if (isMegaMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMegaMenuOpen]);

  const toggleMegaMenu = () => setIsMegaMenuOpen(!isMegaMenuOpen);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  const closeMegaMenu = () => setIsMegaMenuOpen(false);
  
  return (
    <>
      <header className={cn("sticky-header", isScrolled ? "scrolled" : "")}>
        <div className="container mx-auto h-full flex items-center justify-between px-4">
          {/* Logo */}
          <Link to="/" className="flex items-center font-semibold text-xl flex-shrink-0">
            OKTRIK
          </Link>
          
          {/* Desktop Navigation */}
          <DesktopNavigation 
            isMegaMenuOpen={isMegaMenuOpen} 
            toggleMegaMenu={toggleMegaMenu}
            megaMenuTriggerRef={megaMenuTriggerRef}
          />
          
          {/* Right Side Actions */}
          <div className="flex items-center gap-1">
            <SearchBar />
            <ThemeToggle />
            
            {/* Mobile Menu Toggle */}
            <button
              className={cn("md:hidden p-2 rounded-md hover:bg-secondary transition-colors hamburger", isMobileMenuOpen ? "active" : "")}
              onClick={toggleMobileMenu}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <span className="hamburger-line mb-1"></span>
              <span className="hamburger-line mb-1"></span>
              <span className="hamburger-line"></span>
            </button>
          </div>
        </div>
        
        {/* Mobile Menu - Now using the component */}
        <MobileMenu isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />
        
        {/* Mega Menu - Now using the component */}
        <MegaMenu 
          isOpen={isMegaMenuOpen} 
          categories={categories} 
          onClose={closeMegaMenu}
          megaMenuRef={megaMenuRef}
        />
        
        <ScrollProgress />
      </header>
    </>
  );
}
