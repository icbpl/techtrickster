
import { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import ScrollProgress from '../ui/ScrollProgress';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <ScrollProgress />
      <main className="flex-grow pt-16">
        {children}
      </main>
      <Footer />
    </div>
  );
}
