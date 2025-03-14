
import { cn } from '@/lib/utils';
import SearchButton from './SearchButton';
import SearchInput from './SearchInput';
import { useSearch } from './useSearch';

export default function SearchBar() {
  const {
    isExpanded,
    searchQuery,
    inputRef,
    toggleSearch,
    clearSearch,
    handleSubmit,
    setSearchQuery
  } = useSearch();
  
  return (
    <div className={cn("search-bar", isExpanded ? "expanded" : "collapsed")}>
      <form onSubmit={handleSubmit} className="relative flex items-center">
        <SearchButton 
          onClick={toggleSearch} 
          isExpanded={isExpanded} 
        />
        
        <SearchInput
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          isExpanded={isExpanded}
          onClear={clearSearch}
          inputRef={inputRef}
        />
      </form>
    </div>
  );
}
