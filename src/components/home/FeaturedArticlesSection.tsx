
import ArticleCard from '../articles/ArticleCard';
import { PostMetadata } from '@/utils/markdown';

interface FeaturedArticlesSectionProps {
  isLoading: boolean;
  posts: PostMetadata[];
}

export default function FeaturedArticlesSection({ isLoading, posts }: FeaturedArticlesSectionProps) {
  return (
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
  );
}
