
import { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function SearchBar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  
  const toggleSearch = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      // Focus input after expansion animation completes
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  };
  
  const clearSearch = () => {
    setSearchQuery('');
    inputRef.current?.focus();
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
      // Implement search functionality here
    }
  };
  
  // Close search on escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isExpanded) {
        setIsExpanded(false);
        setSearchQuery('');
      }
    };
    
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isExpanded]);
  
  return (
    <div className={cn("search-bar", isExpanded ? "expanded" : "collapsed")}>
      <form onSubmit={handleSubmit} className="relative flex items-center">
        <button
          type="button"
          onClick={toggleSearch}
          className="absolute left-0 top-0 h-10 w-10 flex items-center justify-center"
          aria-label={isExpanded ? "Close search" : "Open search"}
        >
          <Search className="size-5" />
        </button>
        
        <input
          ref={inputRef}
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={cn(
            "h-10 w-full pl-10 pr-10 rounded-full bg-background border border-input",
            "focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300",
            "placeholder:text-muted-foreground",
            isExpanded ? "opacity-100" : "opacity-0"
          )}
        />
        
        {isExpanded && searchQuery && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-0 top-0 h-10 w-10 flex items-center justify-center"
            aria-label="Clear search"
          >
            <X className="size-4" />
          </button>
        )}
      </form>
    </div>
  );
}
