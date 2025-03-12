
import { CalendarDays, Clock } from 'lucide-react';
import AdPlaceholder from '../ui/AdPlaceholder';
import { Post } from '@/utils/markdown';

interface PostHeaderProps {
  post: Post;
}

export default function PostHeader({ post }: PostHeaderProps) {
  return (
    <header className="mb-8">
      {/* Category */}
      <div className="mb-4">
        <a
          href={`/category/${post.category.toLowerCase().replace(/\s+/g, '-')}`}
          className="text-sm font-medium px-3 py-1 rounded-full bg-secondary text-secondary-foreground inline-block"
        >
          {post.category}
        </a>
      </div>
      
      {/* Title */}
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-balance">
        {post.title}
      </h1>
      
      {/* Metadata */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
        <span className="flex items-center gap-1">
          <CalendarDays className="size-4" />
          {post.date}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="size-4" />
          {post.readTime}
        </span>
        <span className="flex items-center gap-1">
          <span>By: {post.author}</span>
        </span>
      </div>
      
      {/* Top Ad Banner */}
      <div className="mb-8">
        <AdPlaceholder size="728x90" className="mx-auto" />
      </div>
      
      {/* Cover Image */}
      <div className="rounded-lg overflow-hidden mb-8">
        <img 
          src={post.cover} 
          alt={post.title} 
          className="w-full h-auto object-cover"
        />
      </div>
    </header>
  );
}
