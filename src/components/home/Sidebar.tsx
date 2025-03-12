
import AdPlaceholder from '../ui/AdPlaceholder';
import PopularArticles from './PopularArticles';
import { PostMetadata } from '@/utils/markdown';

interface SidebarProps {
  articles: PostMetadata[];
}

export default function Sidebar({ articles }: SidebarProps) {
  return (
    <div className="sticky top-20">
      <div className="mb-8">
        <AdPlaceholder size="300x600" />
      </div>
      
      {/* Popular Articles */}
      <PopularArticles articles={articles} />
    </div>
  );
}
