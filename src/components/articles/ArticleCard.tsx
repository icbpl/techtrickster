
import { Link } from 'react-router-dom';
import { CalendarDays, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ArticleCardProps {
  article: {
    id?: number; // Make id optional
    title: string;
    excerpt: string;
    cover: string;
    slug: string;
    date: string;
    readTime: string;
    category: string;
  };
  variant?: 'default' | 'featured' | 'compact';
  className?: string;
}

export default function ArticleCard({ article, variant = 'default', className }: ArticleCardProps) {
  return (
    <article 
      className={cn(
        "article-card rounded-lg overflow-hidden border border-border bg-card",
        variant === 'featured' ? "grid md:grid-cols-2 gap-4" : "flex flex-col",
        variant === 'compact' ? "flex-row items-center gap-4" : "",
        className
      )}
    >
      {/* Article Image */}
      <Link 
        to={`/article/${article.slug}`} 
        className={cn(
          "article-image block overflow-hidden", 
          variant === 'featured' ? "h-full" : (variant === 'compact' ? "flex-shrink-0 w-24 h-24" : "aspect-video"),
          variant === 'compact' ? "rounded-md" : ""
        )}
        aria-label={article.title}
      >
        <img 
          src={article.cover} 
          alt={article.title} 
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </Link>
      
      {/* Article Content */}
      <div className={cn(
        "flex flex-col", 
        variant === 'featured' ? "p-6" : (variant === 'compact' ? "p-0" : "p-4"),
        variant === 'featured' ? "justify-center" : ""
      )}>
        {/* Category Badge */}
        <Link 
          to={`/category/${article.category.toLowerCase().replace(/\s+/g, '-')}`}
          className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-secondary text-secondary-foreground inline-block w-fit mb-2"
        >
          {article.category}
        </Link>
        
        {/* Title */}
        <h3 className={cn(
          "font-semibold line-clamp-2 text-balance", 
          variant === 'featured' ? "text-2xl mb-3" : (variant === 'compact' ? "text-base mb-1" : "text-lg mb-2")
        )}>
          <Link 
            to={`/article/${article.slug}`} 
            className="hover:text-primary/90 transition-colors"
          >
            {article.title}
          </Link>
        </h3>
        
        {/* Excerpt - Hide in compact variant */}
        {variant !== 'compact' && (
          <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
            {article.excerpt}
          </p>
        )}
        
        {/* Metadata */}
        <div className="flex items-center gap-3 text-xs text-muted-foreground mt-auto">
          <span className="flex items-center gap-1">
            <CalendarDays className="size-3" />
            {article.date}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="size-3" />
            {article.readTime}
          </span>
        </div>
      </div>
    </article>
  );
}
