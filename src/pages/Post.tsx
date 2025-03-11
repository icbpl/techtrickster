
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import MarkdownContent from '../components/blog/MarkdownContent';
import AdPlaceholder from '../components/ui/AdPlaceholder';
import { CalendarDays, Clock, Share2, Bookmark, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Post } from '@/utils/markdown';
import { fetchPostBySlug } from '@/server/mock-api';

export default function PostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState(false);
  
  // Fetch post data
  useEffect(() => {
    async function loadPost() {
      if (!slug) return;
      
      setIsLoading(true);
      try {
        const postData = await fetchPostBySlug(slug);
        setPost(postData);
      } catch (error) {
        console.error('Error loading post:', error);
      } finally {
        setIsLoading(false);
      }
    }
    
    loadPost();
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
  
  if (!post) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
            <p className="mb-6">The post you're looking for doesn't exist or has been removed.</p>
            <a href="/" className="px-4 py-2 bg-primary text-primary-foreground rounded-md">
              Back to Home
            </a>
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
                href={`/category/${post.category.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-sm font-medium px-3 py-1 rounded-full bg-secondary text-secondary-foreground inline-block"
              >
                {post.category}
              </a>
            </div>
            
            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-balance">
              {post.title}
            </h1>
            
            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
              <span className="flex items-center gap-1">
                <CalendarDays className="size-4" />
                {post.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="size-4" />
                {post.readTime}
              </span>
              <span className="flex items-center gap-1">
                <span>By: {post.author}</span>
              </span>
            </div>
            
            {/* Top Ad Banner */}
            <div className="mb-8">
              <AdPlaceholder size="728x90" className="mx-auto" />
            </div>
            
            {/* Cover Image */}
            <div className="rounded-lg overflow-hidden mb-8">
              <img 
                src={post.cover} 
                alt={post.title} 
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
              <MarkdownContent content={post.content} />
              
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
