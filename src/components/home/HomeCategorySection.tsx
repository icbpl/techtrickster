
import { Link } from 'react-router-dom';
import ArticleCard from '../articles/ArticleCard';
import { PostMetadata } from '@/utils/markdown';

interface HomeCategorySectionProps {
  category: string;
  posts: PostMetadata[];
}

export default function HomeCategorySection({ category, posts }: HomeCategorySectionProps) {
  if (!posts || posts.length === 0) return null;
  
  return (
    <section className="category-section mb-12">
      <h2 className="category-title mb-6">
        <Link 
          to={`/category/${category.toLowerCase().replace(/\s+/g, '-')}`} 
          className="text-2xl md:text-3xl font-semibold flex items-center gap-2"
        >
          {category}
        </Link>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {posts.slice(0, 4).map((post) => (
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
  );
}
