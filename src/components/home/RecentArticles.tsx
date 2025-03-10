
import { Link } from 'react-router-dom';
import ArticleCard from '../articles/ArticleCard';
import AdPlaceholder from '../ui/AdPlaceholder';

interface RecentArticlesProps {
  articles: any[];
  isLoading: boolean;
}

export default function RecentArticles({ articles, isLoading }: RecentArticlesProps) {
  return (
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
          {articles.slice(0, 2).map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
          
          {/* Inline Ad */}
          <div className="md:col-span-2 my-4">
            <AdPlaceholder size="728x90" className="mx-auto" />
          </div>
          
          {/* Next 2 articles */}
          {articles.slice(2, 4).map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
          
          {/* Inline Ad */}
          <div className="md:col-span-2 my-4">
            <AdPlaceholder size="728x90" className="mx-auto" />
          </div>
          
          {/* Last 2 articles */}
          {articles.slice(4, 6).map((article) => (
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
  );
}
