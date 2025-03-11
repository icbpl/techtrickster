
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import ArticleCard from '../components/articles/ArticleCard';
import Sidebar from '../components/home/Sidebar';
import AdPlaceholder from '../components/ui/AdPlaceholder';
import { PostMetadata } from '@/utils/markdown';
import { fetchPostsByCategory } from '@/server/mock-api';

export default function Category() {
  const { category } = useParams<{ category: string }>();
  const [posts, setPosts] = useState<PostMetadata[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    async function loadPosts() {
      if (!category) return;
      
      setIsLoading(true);
      try {
        const postsData = await fetchPostsByCategory(category);
        setPosts(postsData);
      } catch (error) {
        console.error('Error loading category posts:', error);
      } finally {
        setIsLoading(false);
      }
    }
    
    loadPosts();
  }, [category]);
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Category Title */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold capitalize">
            {category?.replace(/-/g, ' ')}
          </h1>
          <p className="text-muted-foreground mt-2">
            Showing {posts.length} articles in this category
          </p>
        </div>
        
        {/* Top Ad Banner */}
        <div className="mb-8">
          <AdPlaceholder size="728x90" className="mx-auto" />
        </div>
        
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Posts */}
          <div className="lg:col-span-8">
            {isLoading ? (
              <div className="grid grid-cols-1 gap-6">
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
              <>
                {posts.length > 0 ? (
                  <div className="grid grid-cols-1 gap-6">
                    {posts.map((post) => (
                      <ArticleCard key={post.slug} article={post} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <h2 className="text-xl font-semibold mb-4">No articles found</h2>
                    <p className="text-muted-foreground mb-6">
                      There are no articles in this category yet.
                    </p>
                    <Link 
                      to="/"
                      className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
                    >
                      Back to Home
                    </Link>
                  </div>
                )}
              </>
            )}
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-4">
            <Sidebar articles={posts} />
          </div>
        </div>
      </div>
    </Layout>
  );
}
