
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import ArticleCard from '../articles/ArticleCard';

interface CategorySectionProps {
  category: string;
  articles: any[];
}

export default function CategorySection({ category, articles }: CategorySectionProps) {
  return (
    <section className="category-section">
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
  );
}
