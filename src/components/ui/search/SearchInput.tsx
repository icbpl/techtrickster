
import { useRef } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchInputProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isExpanded: boolean;
  onClear: () => void;
  inputRef: React.RefObject<HTMLInputElement>;
}

export default function SearchInput({
  searchQuery,
  setSearchQuery,
  isExpanded,
  onClear,
  inputRef
}: SearchInputProps) {
  return (
    <>
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
          onClick={onClear}
          className="absolute right-0 top-0 h-10 w-10 flex items-center justify-center"
          aria-label="Clear search"
        >
          <X className="size-4" />
        </button>
      )}
    </>
  );
}
