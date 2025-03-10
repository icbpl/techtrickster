
import { Link } from 'react-router-dom';
import ArticleCard from '../articles/ArticleCard';

interface FeaturedArticlesProps {
  articles: any[];
  isLoading: boolean;
}

export default function FeaturedArticles({ articles, isLoading }: FeaturedArticlesProps) {
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
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} variant="featured" />
          ))}
        </div>
      )}
    </section>
  );
}
