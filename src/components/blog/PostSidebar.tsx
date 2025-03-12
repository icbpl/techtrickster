
import { Share2, Bookmark } from 'lucide-react';

export default function PostSidebar() {
  return (
    <div className="hidden lg:block lg:col-span-1">
      <div className="sticky top-20 flex flex-col gap-3">
        <button 
          className="p-2 rounded-full bg-background border border-border hover:bg-secondary transition-colors"
          aria-label="Share article"
        >
          <Share2 className="size-5" />
        </button>
        <button 
          className="p-2 rounded-full bg-background border border-border hover:bg-secondary transition-colors"
          aria-label="Bookmark article"
        >
          <Bookmark className="size-5" />
        </button>
      </div>
    </div>
  );
}
