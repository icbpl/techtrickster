
// Scroll functionality
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.sticky-header');
  const scrollProgress = document.querySelector('.scroll-progress');
  
  // Handle scroll detection
  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    // Update scroll progress bar
    if (scrollProgress) {
      scrollProgress.style.width = `${scrollPercent}%`;
    }
    
    // Add scrolled class to header
    if (scrollTop > 10) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  };
  
  window.addEventListener('scroll', handleScroll);
  
  // Initial check
  handleScroll();
});
