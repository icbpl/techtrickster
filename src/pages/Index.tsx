
import { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import AdPlaceholder from '../components/ui/AdPlaceholder';
import FeaturedArticles from '../components/home/FeaturedArticles';
import RecentArticles from '../components/home/RecentArticles';
import Sidebar from '../components/home/Sidebar';
import CategorySection from '../components/home/CategorySection';
import { 
  mockFeaturedArticles, 
  mockRecentArticles, 
  categoryArticles 
} from '../components/home/data/mockData';

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Above the fold - Top Ad Banner */}
        <div className="mb-8">
          <AdPlaceholder size="728x90" className="mx-auto" />
        </div>
        
        {/* Featured Articles Section */}
        <FeaturedArticles 
          articles={mockFeaturedArticles} 
          isLoading={isLoading} 
        />
        
        {/* Ad Placeholder instead of Trending Categories */}
        <section className="mb-12">
          <AdPlaceholder size="responsive" className="mx-auto h-24 md:h-28" />
        </section>
        
        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Main Articles Column */}
          <div className="lg:col-span-8">
            <RecentArticles 
              articles={mockRecentArticles} 
              isLoading={isLoading} 
            />
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-4">
            <Sidebar articles={mockRecentArticles} />
          </div>
        </div>

        {/* Category Sections */}
        {!isLoading && Object.entries(categoryArticles).map(([category, articles]) => (
          <CategorySection 
            key={category}
            category={category}
            articles={articles}
          />
        ))}
      </div>
    </Layout>
  );
}
