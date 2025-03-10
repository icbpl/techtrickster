
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import AdPlaceholder from '../ui/AdPlaceholder';

// Mock trending articles
const trendingArticles = [
  { id: 1, title: "10 Tips to Master JavaScript in 2023", slug: "master-javascript-2023" },
  { id: 2, title: "Setting Up Your Development Environment", slug: "development-environment-setup" },
  { id: 3, title: "Building Responsive Websites with Tailwind CSS", slug: "responsive-tailwind-websites" },
  { id: 4, title: "React Performance Optimization Guide", slug: "react-performance-guide" },
  { id: 5, title: "Introduction to Web3 and Blockchain Development", slug: "web3-blockchain-intro" },
];

export default function Footer() {
  const [isLegalExpanded, setIsLegalExpanded] = useState(false);
  const [isTrendingExpanded, setIsTrendingExpanded] = useState(false);
  
  return (
    <footer className="bg-background border-t border-border py-8 md:py-10">
      <div className="container mx-auto px-4">
        {/* Desktop Layout */}
        <div className="hidden md:grid grid-cols-3 gap-8">
          {/* Legal Column */}
          <div className="flex flex-col gap-3">
            <h3 className="font-semibold text-lg mb-1">Legal</h3>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link to="/privacy-policy" className="hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="hover:text-foreground transition-colors">
                Terms of Service
              </Link>
              <Link to="/contact" className="hover:text-foreground transition-colors">
                Contact Us
              </Link>
            </div>
          </div>
          
          {/* Trending Column */}
          <div className="flex flex-col gap-3">
            <h3 className="font-semibold text-lg mb-1">Trending Topics</h3>
            <ul className="flex flex-col gap-2">
              {trendingArticles.map((article) => (
                <li key={article.id} className="text-sm text-muted-foreground">
                  <Link 
                    to={`/article/${article.slug}`} 
                    className="hover:text-foreground transition-colors"
                  >
                    {article.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Ad Column */}
          <div className="flex flex-col items-center">
            <AdPlaceholder size="300x250" className="mx-auto" />
          </div>
        </div>
        
        {/* Mobile Layout (Accordion) */}
        <div className="md:hidden flex flex-col gap-4">
          {/* Legal Accordion */}
          <div className="border-b border-border pb-2">
            <button 
              className="w-full flex items-center justify-between py-2"
              onClick={() => setIsLegalExpanded(!isLegalExpanded)}
              aria-expanded={isLegalExpanded}
            >
              <h3 className="font-semibold">Legal</h3>
              <ChevronDown className={cn("h-5 w-5 transition-transform", isLegalExpanded ? "rotate-180" : "")} />
            </button>
            <div 
              className={cn(
                "grid overflow-hidden transition-all duration-300 ease-in-out", 
                isLegalExpanded ? "grid-rows-[1fr] pt-2" : "grid-rows-[0fr]"
              )}
            >
              <div className="overflow-hidden flex flex-col gap-2">
                <Link to="/privacy-policy" className="text-sm text-muted-foreground py-1">
                  Privacy Policy
                </Link>
                <Link to="/terms-of-service" className="text-sm text-muted-foreground py-1">
                  Terms of Service
                </Link>
                <Link to="/contact" className="text-sm text-muted-foreground py-1">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
          
          {/* Trending Accordion */}
          <div className="border-b border-border pb-2">
            <button 
              className="w-full flex items-center justify-between py-2"
              onClick={() => setIsTrendingExpanded(!isTrendingExpanded)}
              aria-expanded={isTrendingExpanded}
            >
              <h3 className="font-semibold">Trending Topics</h3>
              <ChevronDown className={cn("h-5 w-5 transition-transform", isTrendingExpanded ? "rotate-180" : "")} />
            </button>
            <div 
              className={cn(
                "grid overflow-hidden transition-all duration-300 ease-in-out", 
                isTrendingExpanded ? "grid-rows-[1fr] pt-2" : "grid-rows-[0fr]"
              )}
            >
              <div className="overflow-hidden flex flex-col gap-2">
                {trendingArticles.map((article) => (
                  <Link 
                    key={article.id}
                    to={`/article/${article.slug}`} 
                    className="text-sm text-muted-foreground py-1"
                  >
                    {article.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          
          {/* Mobile Ad */}
          <div className="pt-4">
            <AdPlaceholder size="300x250" className="mx-auto" />
          </div>
        </div>
        
        {/* Copyright */}
        <div className="text-center text-xs text-muted-foreground mt-8 pt-4 border-t border-border">
          &copy; {new Date().getFullYear()} OKTRIK. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
