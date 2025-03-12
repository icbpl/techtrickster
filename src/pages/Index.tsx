
import { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import ErrorMessage from '../components/ui/ErrorMessage';
import AdBanner from '../components/home/AdBanner';
import FeaturedArticlesSection from '../components/home/FeaturedArticlesSection';
import MainContent from '../components/home/MainContent';
import CategorySections from '../components/home/CategorySections';
import { PostMetadata } from '@/utils/markdown';
import { fetchAllPosts } from '@/server/mock-api';

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState<PostMetadata[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch blog posts
  useEffect(() => {
    async function loadPosts() {
      setIsLoading(true);
      setError(null);
      try {
        console.log("Loading posts directly from fetchAllPosts");
        const allPosts = await fetchAllPosts();
        console.log("Loaded posts:", allPosts);
        
        if (allPosts.length === 0) {
          console.warn("No posts were loaded");
          setError("No posts found. Please check if the blog post files exist in the public directory.");
        }
        
        setPosts(allPosts);
      } catch (err) {
        console.error('Error loading posts:', err);
        setError("Failed to load posts. Please check the console for more details.");
      } finally {
        setIsLoading(false);
      }
    }
    
    loadPosts();
  }, []);
  
  // Group posts by category
  const postsByCategory = posts.reduce((acc: Record<string, PostMetadata[]>, post) => {
    const category = post.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(post);
    return acc;
  }, {});
  
  console.log("Posts by category:", postsByCategory);
  console.log("Rendering Index page with", posts.length, "posts");
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Above the fold - Top Ad Banner */}
        <AdBanner size="728x90" position="top" />
        
        {/* Error message */}
        <ErrorMessage error={error} />
        
        {/* Featured Articles Section */}
        <FeaturedArticlesSection isLoading={isLoading} posts={posts} />
        
        {/* Ad Banner */}
        <AdBanner size="responsive" className="mx-auto h-24 md:h-28" />
        
        {/* Main Content Area */}
        <MainContent isLoading={isLoading} posts={posts} />

        {/* Category Sections */}
        <CategorySections isLoading={isLoading} postsByCategory={postsByCategory} />
      </div>
    </Layout>
  );
}
