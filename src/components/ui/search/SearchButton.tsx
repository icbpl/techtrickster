
import { Search } from 'lucide-react';

interface SearchButtonProps {
  onClick: () => void;
  isExpanded: boolean;
}

export default function SearchButton({ onClick, isExpanded }: SearchButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="absolute left-0 top-0 h-10 w-10 flex items-center justify-center"
      aria-label={isExpanded ? "Close search" : "Open search"}
    >
      <Search className="size-5" />
    </button>
  );
}
