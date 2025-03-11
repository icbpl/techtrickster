
import ArticleCard from '../articles/ArticleCard';
import AdPlaceholder from '../ui/AdPlaceholder';
import { PostMetadata } from '@/utils/markdown';

interface SidebarProps {
  articles: PostMetadata[];
}

export default function Sidebar({ articles }: SidebarProps) {
  // Add safety check to handle empty articles array
  const hasArticles = Array.isArray(articles) && articles.length > 0;
  
  return (
    <div className="sticky top-20">
      <div className="mb-8">
        <AdPlaceholder size="300x600" />
      </div>
      
      {/* Popular Articles */}
      <div className="border border-border rounded-lg overflow-hidden">
        <h3 className="text-lg font-semibold p-4 border-b border-border bg-card">
          Popular Articles
        </h3>
        {hasArticles ? (
          <div className="divide-y divide-border">
            {articles.slice(0, 4).map((article) => (
              <div key={article.slug} className="p-4">
                <ArticleCard article={article} variant="compact" className="border-0 bg-transparent" />
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 text-center text-muted-foreground">
            No articles available
          </div>
        )}
      </div>
    </div>
  );
}
