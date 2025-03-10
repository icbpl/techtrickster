
import { useState, useEffect } from 'react';
import ArticleCard from './ArticleCard';
import AdPlaceholder from '../ui/AdPlaceholder';
import { cn } from '@/lib/utils';

// Mock related posts data
const mockRelatedPosts = [
  {
    id: 1,
    title: "10 Essential CSS Tricks Every Developer Should Know",
    excerpt: "Discover hidden CSS techniques that will revolutionize your web development workflow and improve your efficiency.",
    cover: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    slug: "essential-css-tricks",
    date: "May 15, 2023",
    readTime: "8 min read",
    category: "CSS"
  },
  {
    id: 2,
    title: "Setting Up a Modern React Project from Scratch",
    excerpt: "Learn how to configure a React project with all the modern tools and best practices without relying on create-react-app.",
    cover: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    slug: "modern-react-setup",
    date: "June 2, 2023",
    readTime: "12 min read",
    category: "React"
  },
  {
    id: 3,
    title: "Advanced TypeScript Patterns for Enterprise Applications",
    excerpt: "Explore advanced TypeScript patterns that will help you build more robust and maintainable enterprise-grade applications.",
    cover: "https://images.unsplash.com/photo-1610986603166-f78428624e76?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    slug: "typescript-enterprise-patterns",
    date: "May 28, 2023",
    readTime: "15 min read",
    category: "TypeScript"
  },
  {
    id: 4,
    title: "Node.js Performance Optimization: A Practical Guide",
    excerpt: "Learn practical techniques to boost the performance of your Node.js applications and handle high loads efficiently.",
    cover: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    slug: "nodejs-performance-guide",
    date: "June 10, 2023",
    readTime: "10 min read",
    category: "Node.js"
  }
];

interface RelatedPostsProps {
  currentArticleId?: number;
  currentCategory?: string;
  className?: string;
}

export default function RelatedPosts({ currentArticleId, currentCategory, className }: RelatedPostsProps) {
  const [relatedPosts, setRelatedPosts] = useState(mockRelatedPosts);
  
  // Filter out current article
  useEffect(() => {
    if (currentArticleId) {
      setRelatedPosts(mockRelatedPosts.filter(post => post.id !== currentArticleId));
    }
  }, [currentArticleId]);
  
  return (
    <section className={cn("py-8", className)}>
      <h2 className="text-2xl font-semibold mb-6">Related Articles</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* First two articles */}
        {relatedPosts.slice(0, 2).map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
        
        {/* Native Ad (first position) */}
        <div className="md:col-span-2">
          <AdPlaceholder size="728x90" className="mx-auto my-4" />
        </div>
        
        {/* Next two articles */}
        {relatedPosts.slice(2, 4).map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
        
        {/* Native Ad (second position) */}
        <div className="md:col-span-2">
          <AdPlaceholder size="728x90" className="mx-auto my-4" />
        </div>
      </div>
    </section>
  );
}
