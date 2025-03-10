
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import ThemeToggle from '../ui/ThemeToggle';
import SearchBar from '../ui/SearchBar';
import ScrollProgress from '../ui/ScrollProgress';

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
  
  return (
    <>
      <header className={cn("sticky-header", isScrolled ? "scrolled" : "")}>
        <div className="container mx-auto h-full flex items-center justify-between px-4">
          {/* Logo */}
          <Link to="/" className="flex items-center font-semibold text-xl flex-shrink-0">
            OKTRIK
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            <button
              ref={megaMenuTriggerRef}
              className="flex items-center px-3 py-2 rounded-md hover:bg-secondary transition-colors"
              onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
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
          
          {/* Right Side Actions */}
          <div className="flex items-center gap-1">
            <SearchBar />
            <ThemeToggle />
            
            {/* Mobile Menu Toggle */}
            <button
              className={cn("md:hidden p-2 rounded-md hover:bg-secondary transition-colors hamburger", isMobileMenuOpen ? "active" : "")}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
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
        
        {/* Mobile Menu */}
        <div
          id="mobile-menu"
          className={cn(
            "md:hidden fixed inset-0 pt-14 bg-background z-40 transition-transform duration-300 ease-in-out",
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="container mx-auto p-4 flex flex-col gap-4">
            <Link 
              to="/" 
              className="flex items-center px-4 py-3 rounded-md hover:bg-secondary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/categories" 
              className="flex items-center px-4 py-3 rounded-md hover:bg-secondary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Categories
            </Link>
            <Link 
              to="/tutorials" 
              className="flex items-center px-4 py-3 rounded-md hover:bg-secondary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Tutorials
            </Link>
            <Link 
              to="/tips-tricks" 
              className="flex items-center px-4 py-3 rounded-md hover:bg-secondary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Tips & Tricks
            </Link>
            <Link 
              to="/about" 
              className="flex items-center px-4 py-3 rounded-md hover:bg-secondary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
          </div>
        </div>
        
        {/* Mega Menu */}
        <div
          id="mega-menu"
          ref={megaMenuRef}
          className={cn("mega-menu py-6", isMegaMenuOpen ? "open" : "")}
        >
          <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <div key={index} className="flex flex-col gap-2 animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                <h3 className="font-semibold text-lg mb-2">{category.title}</h3>
                <ul className="flex flex-col gap-1">
                  {category.subcategories.map((subcategory, subIndex) => (
                    <li key={subIndex}>
                      <Link 
                        to={`/category/${subcategory.toLowerCase().replace(/\s+/g, '-')}`}
                        className="block px-2 py-1.5 rounded-md hover:bg-secondary transition-colors"
                        onClick={() => setIsMegaMenuOpen(false)}
                      >
                        {subcategory}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        
        <ScrollProgress />
      </header>
      
      {/* Page overlay when mobile menu is open */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
