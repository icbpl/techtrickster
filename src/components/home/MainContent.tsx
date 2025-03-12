
import Sidebar from './Sidebar';
import RecentArticlesSection from './RecentArticlesSection';
import { PostMetadata } from '@/utils/markdown';

interface MainContentProps {
  isLoading: boolean;
  posts: PostMetadata[];
}

export default function MainContent({ isLoading, posts }: MainContentProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
      {/* Main Articles Column */}
      <div className="lg:col-span-8">
        <RecentArticlesSection isLoading={isLoading} posts={posts} />
      </div>
      
      {/* Sidebar */}
      <div className="lg:col-span-4">
        <Sidebar articles={posts} />
      </div>
    </div>
  );
}
