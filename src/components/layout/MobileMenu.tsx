
import { Link } from 'react-router-dom';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  return (
    <>
      <div
        id="mobile-menu"
        className={`md:hidden fixed inset-0 pt-14 bg-background z-40 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="container mx-auto p-4 flex flex-col gap-4">
          <Link 
            to="/" 
            className="flex items-center px-4 py-3 rounded-md hover:bg-secondary transition-colors"
            onClick={onClose}
          >
            Home
          </Link>
          <Link 
            to="/categories" 
            className="flex items-center px-4 py-3 rounded-md hover:bg-secondary transition-colors"
            onClick={onClose}
          >
            Categories
          </Link>
          <Link 
            to="/tutorials" 
            className="flex items-center px-4 py-3 rounded-md hover:bg-secondary transition-colors"
            onClick={onClose}
          >
            Tutorials
          </Link>
          <Link 
            to="/tips-tricks" 
            className="flex items-center px-4 py-3 rounded-md hover:bg-secondary transition-colors"
            onClick={onClose}
          >
            Tips & Tricks
          </Link>
          <Link 
            to="/about" 
            className="flex items-center px-4 py-3 rounded-md hover:bg-secondary transition-colors"
            onClick={onClose}
          >
            About
          </Link>
        </div>
      </div>
      
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 md:hidden"
          onClick={onClose}
        />
      )}
    </>
  );
}
