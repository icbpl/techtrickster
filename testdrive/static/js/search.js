
// Search functionality
document.addEventListener('DOMContentLoaded', () => {
  const searchButton = document.querySelector('.search-button');
  const searchBar = document.querySelector('.search-bar');
  const searchInput = document.querySelector('.search-input');
  const clearButton = document.querySelector('.search-clear');
  
  let isExpanded = false;
  
  // Toggle search bar
  searchButton?.addEventListener('click', () => {
    isExpanded = !isExpanded;
    
    if (isExpanded) {
      searchBar.classList.remove('collapsed');
      searchBar.classList.add('expanded');
      setTimeout(() => {
        searchInput?.focus();
      }, 300);
    } else {
      searchBar.classList.remove('expanded');
      searchBar.classList.add('collapsed');
      searchInput.value = '';
    }
    
    searchButton.setAttribute('aria-label', isExpanded ? 'Close search' : 'Open search');
  });
  
  // Clear search input
  clearButton?.addEventListener('click', () => {
    searchInput.value = '';
    searchInput?.focus();
  });
  
  // Close search on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isExpanded) {
      isExpanded = false;
      searchBar.classList.remove('expanded');
      searchBar.classList.add('collapsed');
      searchInput.value = '';
      searchButton.setAttribute('aria-label', 'Open search');
    }
  });
});
