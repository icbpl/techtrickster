
// Theme functionality
document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.querySelector('.theme-toggle');
  const htmlElement = document.documentElement;
  
  // Check user preference from localStorage
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    htmlElement.classList.toggle('dark', savedTheme === 'dark');
    if (themeToggle) {
      themeToggle.setAttribute('aria-pressed', savedTheme === 'dark' ? 'true' : 'false');
      const themeIcon = themeToggle.querySelector('.theme-toggle-icon');
      if (themeIcon) {
        themeIcon.classList.toggle('dark', savedTheme === 'dark');
      }
    }
  }
  
  // Toggle theme
  themeToggle?.addEventListener('click', () => {
    const isDark = htmlElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    themeToggle.setAttribute('aria-pressed', isDark ? 'true' : 'false');
    
    const themeIcon = themeToggle.querySelector('.theme-toggle-icon');
    if (themeIcon) {
      themeIcon.classList.toggle('dark', isDark);
    }
  });
});
