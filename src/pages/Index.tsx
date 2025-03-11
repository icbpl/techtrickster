
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import AdPlaceholder from '../components/ui/AdPlaceholder';
import ArticleCard from '../components/articles/ArticleCard';
import Sidebar from '../components/home/Sidebar';
import { PostMetadata } from '@/utils/markdown';
import { fetchAllPosts } from '@/server/mock-api';

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState<PostMetadata[]>([]);
  
  // Fetch blog posts
  useEffect(() => {
    async function loadPosts() {
      setIsLoading(true);
      try {
        console.log("Loading posts from fetchAllPosts");
        const allPosts = await fetchAllPosts();
        console.log("Loaded posts:", allPosts);
        setPosts(allPosts);
      } catch (error) {
        console.error('Error loading posts:', error);
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
          ) : posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {posts.slice(0, 2).map((post) => (
                <ArticleCard key={post.slug} article={post} variant="featured" />
              ))}
            </div>
          ) : (
            <div className="text-center py-6 border border-border rounded-lg">
              <p className="text-muted-foreground">No articles found</p>
            </div>
          )}
        </section>
        
        {/* Ad Placeholder */}
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
              ) : posts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* First 2 articles */}
                  {posts.slice(0, 2).map((post) => (
                    <ArticleCard key={post.slug} article={post} />
                  ))}
                  
                  {/* Inline Ad */}
                  <div className="md:col-span-2 my-4">
                    <AdPlaceholder size="728x90" className="mx-auto" />
                  </div>
                  
                  {/* Load More Button */}
                  {posts.length > 0 && (
                    <div className="md:col-span-2 flex justify-center mt-6">
                      <button className="px-6 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                        Load More Articles
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-6 border border-border rounded-lg">
                  <p className="text-muted-foreground">No articles found</p>
                </div>
              )}
            </section>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-4">
            <Sidebar articles={posts} />
          </div>
        </div>

        {/* Category Sections */}
        {!isLoading && Object.entries(postsByCategory).length > 0 ? (
          Object.entries(postsByCategory).map(([category, categoryPosts]) => (
            <section key={category} className="category-section mb-12">
              <h2 className="category-title mb-6">
                <Link to={`/category/${category.toLowerCase().replace(/\s+/g, '-')}`} className="text-2xl md:text-3xl font-semibold flex items-center gap-2">
                  {category}
                </Link>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                {categoryPosts.slice(0, 4).map((post) => (
                  <ArticleCard key={post.slug} article={post} />
                ))}
              </div>
              <div className="mt-8 flex justify-center">
                <Link 
                  to={`/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
                  className="px-4 py-2 text-sm font-medium rounded-full bg-secondary hover:bg-secondary/80 text-secondary-foreground transition-colors"
                >
                  View All {category} Articles
                </Link>
              </div>
            </section>
          ))
        ) : !isLoading && (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium mb-4">No categories found</h3>
            <p className="text-muted-foreground">Check back later for more content</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
