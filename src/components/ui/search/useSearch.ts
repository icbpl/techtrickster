
import { useState, useRef, useEffect } from 'react';

export function useSearch() {
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
  
  return {
    isExpanded,
    searchQuery,
    inputRef,
    toggleSearch,
    clearSearch,
    handleSubmit,
    setSearchQuery
  };
}
