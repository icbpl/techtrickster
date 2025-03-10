
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import RelatedPosts from '../components/articles/RelatedPosts';
import AdPlaceholder from '../components/ui/AdPlaceholder';
import { CalendarDays, Clock, Share2, Bookmark, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock article data
const mockArticle = {
  id: 1,
  title: "How to Build a Modern Website with React and Tailwind CSS",
  content: `
    <p>
      Creating a modern, responsive website has never been easier with the powerful combination of React and Tailwind CSS. This tutorial will guide you through the process of building a website that is not only visually appealing but also performant and maintainable.
    </p>
    
    <h2>Getting Started with React</h2>
    <p>
      React is a popular JavaScript library for building user interfaces. It allows you to create reusable UI components that can be composed to build complex applications. Let's start by setting up a new React project using Vite.
    </p>
    <p>
      First, make sure you have Node.js installed on your machine. Then, run the following command to create a new React project:
    </p>
    
    <pre><code>npm create vite@latest my-website -- --template react-ts</code></pre>
    
    <p>
      This will create a new React project with TypeScript support. Navigate to the project directory and install the dependencies:
    </p>
    
    <pre><code>cd my-website
npm install</code></pre>
    
    <h2>Adding Tailwind CSS</h2>
    <p>
      Tailwind CSS is a utility-first CSS framework that allows you to build custom designs without writing CSS. Let's add Tailwind CSS to our project:
    </p>
    
    <pre><code>npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p</code></pre>
    
    <p>
      Now, we need to configure Tailwind CSS. Open the <code>tailwind.config.js</code> file and add the following configuration:
    </p>
    
    <pre><code>/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}</code></pre>
    
    <p>
      Next, let's add the Tailwind directives to our CSS file. Open <code>src/index.css</code> and add the following:
    </p>
    
    <pre><code>@tailwind base;
@tailwind components;
@tailwind utilities;</code></pre>
    
    <h2>Creating Components</h2>
    <p>
      Now that we have our project set up, let's create some reusable components. We'll start with a Header component:
    </p>
    
    <pre><code>// src/components/Header.tsx
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto py-4 px-6 flex justify-between items-center">
        <div className="font-bold text-xl">My Website</div>
        
        <nav className="hidden md:flex space-x-8">
          <a href="#" className="text-gray-600 hover:text-gray-900">Home</a>
          <a href="#" className="text-gray-600 hover:text-gray-900">About</a>
          <a href="#" className="text-gray-600 hover:text-gray-900">Services</a>
          <a href="#" className="text-gray-600 hover:text-gray-900">Contact</a>
        </nav>
        
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        
        {isMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-white shadow-md md:hidden">
            <div className="flex flex-col space-y-4 py-4 px-6">
              <a href="#" className="text-gray-600 hover:text-gray-900">Home</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">About</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Services</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Contact</a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}</code></pre>
    
    <h2>Building the Layout</h2>
    <p>
      Next, let's create a layout component that will wrap all our pages:
    </p>
    
    <pre><code>// src/components/Layout.tsx
import { ReactNode } from 'react';
import Header from './Header';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-6">
          <p>&copy; {new Date().getFullYear()} My Website. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}</code></pre>
    
    <h2>Creating Pages</h2>
    <p>
      Now, let's create a simple home page:
    </p>
    
    <pre><code>// src/pages/Home.tsx
import Layout from '../components/Layout';

export default function Home() {
  return (
    <Layout>
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-6">Welcome to My Website</h1>
        <p className="text-lg text-gray-700 mb-8">
          This is a modern website built with React and Tailwind CSS.
        </p>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
          Get Started
        </button>
      </div>
    </Layout>
  );
}</code></pre>
    
    <h2>Adding Routing</h2>
    <p>
      To navigate between pages, we'll use React Router. First, let's install it:
    </p>
    
    <pre><code>npm install react-router-dom</code></pre>
    
    <p>
      Now, let's set up our routes in the main App component:
    </p>
    
    <pre><code>// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;</code></pre>
    
    <h2>Optimizing for Performance</h2>
    <p>
      To optimize our website for performance, we can implement lazy loading for our routes:
    </p>
    
    <pre><code>// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="p-4">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;</code></pre>
    
    <h2>Conclusion</h2>
    <p>
      In this tutorial, we've learned how to build a modern website using React and Tailwind CSS. We covered setting up a new project, creating components, implementing a responsive layout, adding routing, and optimizing for performance.
    </p>
    <p>
      By combining the power of React's component-based architecture with Tailwind's utility-first approach to CSS, we can build beautiful, responsive websites with minimal effort.
    </p>
    <p>
      For more advanced features, you might want to explore state management libraries like Redux or context API, animation libraries like Framer Motion, and server-side rendering solutions like Next.js.
    </p>
  `,
  cover: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
  slug: "modern-website-react-tailwind",
  date: "June 12, 2023",
  readTime: "10 min read",
  category: "Web Development",
  author: {
    name: "John Doe",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    bio: "Full Stack Developer & Technical Writer"
  }
};

export default function Article() {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState(mockArticle);
  const [isLoading, setIsLoading] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState(false);
  
  // Simulate fetching article data
  useEffect(() => {
    // In a real app, you would fetch the article based on the slug
    console.log(`Fetching article with slug: ${slug}`);
    
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [slug]);
  
  // Show back to top button when scrolled down
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Back to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  // Mobile ad scroll detection
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let scrollInterval = 0;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      scrollInterval += Math.abs(currentScrollY - lastScrollY);
      
      // Show mobile ad every 250px of scrolling
      if (scrollInterval > 250) {
        scrollInterval = 0;
        console.log('Mobile ad triggered at scroll position:', currentScrollY);
        // In a real app, you would display an ad here
      }
      
      lastScrollY = currentScrollY;
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto animate-pulse">
            <div className="h-8 w-3/4 bg-muted rounded mb-4"></div>
            <div className="flex gap-4 mb-6">
              <div className="h-4 w-24 bg-muted rounded"></div>
              <div className="h-4 w-24 bg-muted rounded"></div>
            </div>
            <div className="aspect-video bg-muted rounded-lg mb-8"></div>
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="mb-4">
                <div className="h-4 w-full bg-muted rounded mb-2"></div>
                <div className="h-4 w-5/6 bg-muted rounded mb-2"></div>
                <div className="h-4 w-4/6 bg-muted rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <article className="max-w-4xl mx-auto">
          {/* Article Header */}
          <header className="mb-8">
            {/* Category */}
            <div className="mb-4">
              <a
                href={`/category/${article.category.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-sm font-medium px-3 py-1 rounded-full bg-secondary text-secondary-foreground inline-block"
              >
                {article.category}
              </a>
            </div>
            
            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-balance">
              {article.title}
            </h1>
            
            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
              <span className="flex items-center gap-1">
                <CalendarDays className="size-4" />
                {article.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="size-4" />
                {article.readTime}
              </span>
            </div>
            
            {/* Author */}
            <div className="flex items-center gap-3 mb-6">
              <img 
                src={article.author.avatar} 
                alt={article.author.name} 
                className="w-10 h-10 rounded-full"
              />
              <div>
                <div className="font-medium">{article.author.name}</div>
                <div className="text-sm text-muted-foreground">{article.author.bio}</div>
              </div>
            </div>
            
            {/* Top Ad Banner */}
            <div className="mb-8">
              <AdPlaceholder size="728x90" className="mx-auto" />
            </div>
            
            {/* Cover Image */}
            <div className="rounded-lg overflow-hidden mb-8">
              <img 
                src={article.cover} 
                alt={article.title} 
                className="w-full h-auto object-cover"
              />
            </div>
          </header>
          
          {/* Article Content */}
          <div className="relative grid grid-cols-12 gap-8">
            {/* Sharing Sidebar (Desktop) */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="sticky top-20 flex flex-col gap-3">
                <button 
                  className="p-2 rounded-full bg-background border border-border hover:bg-secondary transition-colors"
                  aria-label="Share article"
                >
                  <Share2 className="size-5" />
                </button>
                <button 
                  className="p-2 rounded-full bg-background border border-border hover:bg-secondary transition-colors"
                  aria-label="Bookmark article"
                >
                  <Bookmark className="size-5" />
                </button>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="col-span-12 lg:col-span-8">
              <div 
                className="prose prose-lg max-w-none dark:prose-invert prose-headings:mb-4 prose-p:mb-4 prose-pre:rounded-lg prose-pre:bg-muted prose-pre:border prose-pre:border-border"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
              
              {/* Sharing (Mobile) */}
              <div className="flex gap-3 mt-8 lg:hidden">
                <button 
                  className="flex-1 py-2 flex items-center justify-center gap-2 rounded-md bg-background border border-border hover:bg-secondary transition-colors"
                >
                  <Share2 className="size-5" />
                  <span>Share</span>
                </button>
                <button 
                  className="flex-1 py-2 flex items-center justify-center gap-2 rounded-md bg-background border border-border hover:bg-secondary transition-colors"
                >
                  <Bookmark className="size-5" />
                  <span>Save</span>
                </button>
              </div>
            </div>
            
            {/* Right Sidebar Ad (Desktop) */}
            <div className="hidden lg:block lg:col-span-3">
              <div className="sticky top-20">
                <AdPlaceholder size="300x600" />
              </div>
            </div>
          </div>
        </article>
        
        {/* Related Posts */}
        <div className="max-w-4xl mx-auto">
          <RelatedPosts currentArticleId={article.id} currentCategory={article.category} />
        </div>
        
        {/* Back to top button */}
        <button
          className={cn(
            "fixed bottom-8 right-8 p-3 rounded-full bg-primary text-primary-foreground shadow-lg z-30 transition-all",
            showBackToTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
          onClick={scrollToTop}
          aria-label="Back to top"
        >
          <ChevronUp className="size-5" />
        </button>
      </div>
    </Layout>
  );
}
