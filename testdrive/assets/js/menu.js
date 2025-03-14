
// Menu functionality
document.addEventListener('DOMContentLoaded', () => {
  const megaMenuTrigger = document.querySelector('.mega-menu-trigger');
  const megaMenu = document.getElementById('mega-menu');
  const mobileMenuTrigger = document.querySelector('.mobile-menu-trigger');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
  
  // Mega menu toggle
  megaMenuTrigger?.addEventListener('click', () => {
    const isOpen = megaMenu?.classList.toggle('open');
    megaMenuTrigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    
    // Toggle chevron rotation
    const chevron = megaMenuTrigger.querySelector('.chevron');
    if (isOpen) {
      chevron?.classList.add('rotate-180');
    } else {
      chevron?.classList.remove('rotate-180');
    }
  });
  
  // Close mega menu when clicking outside
  document.addEventListener('mousedown', (event) => {
    if (
      megaMenu &&
      !megaMenu.contains(event.target) &&
      megaMenuTrigger &&
      !megaMenuTrigger.contains(event.target)
    ) {
      megaMenu.classList.remove('open');
      megaMenuTrigger.setAttribute('aria-expanded', 'false');
      megaMenuTrigger.querySelector('.chevron')?.classList.remove('rotate-180');
    }
  });
  
  // Mobile menu toggle
  mobileMenuTrigger?.addEventListener('click', () => {
    const isOpen = mobileMenuTrigger.classList.toggle('active');
    mobileMenuTrigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    
    if (isOpen) {
      mobileMenu?.classList.remove('translate-x-full');
      mobileMenu?.classList.add('translate-x-0');
      mobileMenuOverlay?.classList.remove('hidden');
    } else {
      mobileMenu?.classList.remove('translate-x-0');
      mobileMenu?.classList.add('translate-x-full');
      mobileMenuOverlay?.classList.add('hidden');
    }
  });
  
  // Close mobile menu when overlay is clicked
  mobileMenuOverlay?.addEventListener('click', () => {
    mobileMenuTrigger?.classList.remove('active');
    mobileMenuTrigger?.setAttribute('aria-expanded', 'false');
    mobileMenu?.classList.remove('translate-x-0');
    mobileMenu?.classList.add('translate-x-full');
    mobileMenuOverlay?.classList.add('hidden');
  });
});
