
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface Category {
  title: string;
  subcategories: string[];
}

interface MegaMenuProps {
  isOpen: boolean;
  categories: Category[];
  onClose: () => void;
  megaMenuRef: React.RefObject<HTMLDivElement>;
}

export default function MegaMenu({ isOpen, categories, onClose, megaMenuRef }: MegaMenuProps) {
  return (
    <div
      id="mega-menu"
      ref={megaMenuRef}
      className={cn("mega-menu py-6", isOpen ? "open" : "")}
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
                    onClick={onClose}
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
  );
}
