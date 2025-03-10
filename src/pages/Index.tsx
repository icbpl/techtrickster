import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import ArticleCard from '../components/articles/ArticleCard';
import AdPlaceholder from '../components/ui/AdPlaceholder';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';

// Mock featured and recent articles data
const mockFeaturedArticles = [
  {
    id: 1,
    title: "How to Build a Modern Website with React and Tailwind CSS",
    excerpt: "Learn how to combine the power of React with the utility-first CSS framework Tailwind to create stunning websites that are both performant and maintainable.",
    cover: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
    slug: "modern-website-react-tailwind",
    date: "June 12, 2023",
    readTime: "10 min read",
    category: "Web Development"
  },
  {
    id: 2,
    title: "10 Must-Know JavaScript Tricks to Improve Your Code",
    excerpt: "Discover advanced JavaScript techniques that will make your code more efficient, readable, and maintainable. Perfect for developers of all levels.",
    cover: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
    slug: "javascript-tricks",
    date: "June 8, 2023",
    readTime: "8 min read",
    category: "JavaScript"
  }
];

const mockRecentArticles = [
  {
    id: 3,
    title: "Setting Up a Perfect Development Environment in 2023",
    excerpt: "A comprehensive guide to configuring your development environment for maximum productivity, including tools, extensions, and best practices.",
    cover: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    slug: "perfect-dev-environment",
    date: "June 5, 2023",
    readTime: "12 min read",
    category: "Development Tools"
  },
  {
    id: 4,
    title: "The Complete Guide to CSS Grid Layout",
    excerpt: "Master CSS Grid Layout with this comprehensive tutorial covering everything from basic grid concepts to advanced layout techniques.",
    cover: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    slug: "css-grid-guide",
    date: "May 30, 2023",
    readTime: "15 min read",
    category: "CSS"
  },
  {
    id: 5,
    title: "Optimizing React Performance: A Deep Dive",
    excerpt: "Learn advanced techniques to optimize your React applications for maximum performance and improved user experience.",
    cover: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    slug: "react-performance-optimization",
    date: "May 25, 2023",
    readTime: "10 min read",
    category: "React"
  },
  {
    id: 6,
    title: "Introduction to TypeScript for JavaScript Developers",
    excerpt: "A beginner-friendly introduction to TypeScript, showing how it can improve your JavaScript development workflow with static typing.",
    cover: "https://images.unsplash.com/photo-1610986603166-f78428624e76?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    slug: "typescript-for-js-developers",
    date: "May 20, 2023",
    readTime: "8 min read",
    category: "TypeScript"
  },
  {
    id: 7,
    title: "Building a REST API with Node.js and Express",
    excerpt: "Learn how to build a robust RESTful API using Node.js and Express, complete with authentication, validation, and error handling.",
    cover: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    slug: "rest-api-nodejs-express",
    date: "May 15, 2023",
    readTime: "12 min read",
    category: "Node.js"
  },
  {
    id: 8,
    title: "Git and GitHub for Beginners: A Comprehensive Guide",
    excerpt: "A step-by-step guide to version control with Git and GitHub, perfect for beginners looking to improve their development workflow.",
    cover: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    slug: "git-github-beginners",
    date: "May 10, 2023",
    readTime: "10 min read",
    category: "Version Control"
  }
];

// Category articles mapping
const categoryArticles = {
  "JavaScript": [
    {
      id: 9,
      title: "Understanding JavaScript Promises in Depth",
      excerpt: "Master asynchronous programming with this comprehensive guide to JavaScript Promises, async/await, and error handling strategies.",
      cover: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      slug: "javascript-promises",
      date: "May 5, 2023",
      readTime: "11 min read",
      category: "JavaScript"
    },
    {
      id: 10,
      title: "Functional Programming in JavaScript",
      excerpt: "Learn how to apply functional programming principles to write cleaner, more maintainable JavaScript code with higher-order functions and immutability.",
      cover: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      slug: "functional-programming-javascript",
      date: "April 28, 2023",
      readTime: "9 min read",
      category: "JavaScript"
    },
    {
      id: 11,
      title: "JavaScript Design Patterns for Modern Applications",
      excerpt: "Explore essential design patterns in JavaScript and learn how to implement them to solve common programming challenges in your applications.",
      cover: "https://images.unsplash.com/photo-1581276879432-15e50529f34b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      slug: "javascript-design-patterns",
      date: "April 20, 2023",
      readTime: "13 min read",
      category: "JavaScript"
    },
    {
      id: 12,
      title: "Advanced Array Methods in JavaScript",
      excerpt: "Take your JavaScript skills to the next level by mastering advanced array methods like map, reduce, filter, and more for effective data manipulation.",
      cover: "https://images.unsplash.com/photo-1553481187-be93c21490a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      slug: "advanced-array-methods",
      date: "April 15, 2023",
      readTime: "8 min read",
      category: "JavaScript"
    }
  ],
  "React": [
    {
      id: 13,
      title: "Building Custom Hooks in React",
      excerpt: "Learn how to create and use custom hooks to share logic between components and keep your React codebase DRY and maintainable.",
      cover: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      slug: "react-custom-hooks",
      date: "April 10, 2023",
      readTime: "9 min read",
      category: "React"
    },
    {
      id: 14,
      title: "State Management Patterns in React",
      excerpt: "Compare different state management solutions in React including Context API, Redux, Zustand, and Jotai to find the best fit for your project.",
      cover: "https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      slug: "react-state-management",
      date: "April 5, 2023",
      readTime: "12 min read",
      category: "React"
    },
    {
      id: 15,
      title: "React Server Components Explained",
      excerpt: "Dive into React Server Components and understand how they revolutionize data fetching and rendering for modern web applications.",
      cover: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      slug: "react-server-components",
      date: "March 28, 2023",
      readTime: "11 min read",
      category: "React"
    },
    {
      id: 16,
      title: "Testing React Applications with Testing Library",
      excerpt: "Learn best practices for testing React components using Testing Library to ensure your application is reliable and bug-free.",
      cover: "https://images.unsplash.com/photo-1591439657848-9f6138d33dba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      slug: "testing-react-applications",
      date: "March 22, 2023",
      readTime: "10 min read",
      category: "React"
    }
  ],
  "CSS": [
    {
      id: 17,
      title: "Mastering CSS Grid Layout",
      excerpt: "A comprehensive guide to CSS Grid Layout, covering everything from basic concepts to advanced techniques for complex layouts.",
      cover: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      slug: "mastering-css-grid",
      date: "March 15, 2023",
      readTime: "14 min read",
      category: "CSS"
    },
    {
      id: 18,
      title: "Creating Animations with CSS",
      excerpt: "Learn how to create stunning animations using CSS keyframes, transitions, and transforms to bring your websites to life.",
      cover: "https://images.unsplash.com/photo-1550063873-ab792950096b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      slug: "css-animations",
      date: "March 10, 2023",
      readTime: "9 min read",
      category: "CSS"
    },
    {
      id: 19,
      title: "Modern CSS Techniques Every Developer Should Know",
      excerpt: "Discover modern CSS features like custom properties, logical properties, container queries, and more to enhance your web development skills.",
      cover: "https://images.unsplash.com/photo-1523437113738-bbd3cc89fb19?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      slug: "modern-css-techniques",
      date: "March 5, 2023",
      readTime: "11 min read",
      category: "CSS"
    },
    {
      id: 20,
      title: "Responsive Design Best Practices",
      excerpt: "Learn the essential principles of responsive web design to create websites that work flawlessly across all devices and screen sizes.",
      cover: "https://images.unsplash.com/photo-1508921340878-ba53e1f016ec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      slug: "responsive-design-best-practices",
      date: "February 28, 2023",
      readTime: "10 min read",
      category: "CSS"
    }
  ]
};

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
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-semibold">Featured Articles</h2>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2].map((item) => (
                <div key={item} className="rounded-lg overflow-hidden border border-border animate-pulse">
                  <div className="bg-muted aspect-video"></div>
                  <div className="p-4">
                    <div className="h-2 w-1/4 bg-muted rounded mb-4"></div>
                    <div className="h-4 w-3/4 bg-muted rounded mb-3"></div>
                    <div className="h-3 w-full bg-muted rounded mb-2"></div>
                    <div className="h-3 w-5/6 bg-muted rounded mb-4"></div>
                    <div className="flex gap-2">
                      <div className="h-2 w-16 bg-muted rounded"></div>
                      <div className="h-2 w-16 bg-muted rounded"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockFeaturedArticles.map((article) => (
                <ArticleCard key={article.id} article={article} variant="featured" />
              ))}
            </div>
          )}
        </section>
        
        {/* Ad Placeholder instead of Trending Categories */}
        <section className="mb-12">
          <AdPlaceholder size="responsive" className="mx-auto h-24 md:h-28" />
        </section>
        
        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Main Articles Column */}
          <div className="lg:col-span-8">
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl md:text-3xl font-semibold">Recent Articles</h2>
              </div>
              
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="rounded-lg overflow-hidden border border-border animate-pulse">
                      <div className="bg-muted aspect-video"></div>
                      <div className="p-4">
                        <div className="h-2 w-1/4 bg-muted rounded mb-4"></div>
                        <div className="h-4 w-3/4 bg-muted rounded mb-3"></div>
                        <div className="h-3 w-full bg-muted rounded mb-2"></div>
                        <div className="h-3 w-5/6 bg-muted rounded mb-4"></div>
                        <div className="flex gap-2">
                          <div className="h-2 w-16 bg-muted rounded"></div>
                          <div className="h-2 w-16 bg-muted rounded"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* First 2 articles */}
                  {mockRecentArticles.slice(0, 2).map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                  
                  {/* Inline Ad */}
                  <div className="md:col-span-2 my-4">
                    <AdPlaceholder size="728x90" className="mx-auto" />
                  </div>
                  
                  {/* Next 2 articles */}
                  {mockRecentArticles.slice(2, 4).map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                  
                  {/* Inline Ad */}
                  <div className="md:col-span-2 my-4">
                    <AdPlaceholder size="728x90" className="mx-auto" />
                  </div>
                  
                  {/* Last 2 articles */}
                  {mockRecentArticles.slice(4, 6).map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                  
                  {/* Load More Button */}
                  <div className="md:col-span-2 flex justify-center mt-6">
                    <button className="px-6 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                      Load More Articles
                    </button>
                  </div>
                </div>
              )}
            </section>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-4">
            {/* Sticky Right Rail Ad */}
            <div className="sticky top-20">
              <div className="mb-8">
                <AdPlaceholder size="300x600" />
              </div>
              
              {/* Popular Articles */}
              <div className="border border-border rounded-lg overflow-hidden">
                <h3 className="text-lg font-semibold p-4 border-b border-border bg-card">
                  Popular Articles
                </h3>
                <div className="divide-y divide-border">
                  {mockRecentArticles.slice(0, 4).map((article) => (
                    <div key={article.id} className="p-4">
                      <ArticleCard article={article} variant="compact" className="border-0 bg-transparent" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Category Sections */}
        {!isLoading && Object.entries(categoryArticles).map(([category, articles]) => (
          <section key={category} className="category-section">
            <h2 className="category-title">
              <Link to={`/category/${category.toLowerCase()}`} className="category-title-link">
                {category} <ChevronRight className="size-5" />
              </Link>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
            <div className="mt-8 flex justify-center">
              <Link 
                to={`/category/${category.toLowerCase()}`}
                className="px-4 py-2 text-sm font-medium rounded-full bg-secondary hover:bg-secondary/80 text-secondary-foreground transition-colors"
              >
                View All {category} Articles
              </Link>
            </div>
          </section>
        ))}
      </div>
    </Layout>
  );
}
