
import { Share2, Bookmark } from 'lucide-react';

export default function MobileShareButtons() {
  return (
    <div className="flex gap-3 mt-8 lg:hidden">
      <button 
        className="flex-1 py-2 flex items-center justify-center gap-2 rounded-md bg-background border border-border hover:bg-secondary transition-colors"
      >
        <Share2 className="size-5" />
        <span>Share</span>
      </button>
      <button 
        className="flex-1 py-2 flex items-center justify-center gap-2 rounded-md bg-background border border-border hover:bg-secondary transition-colors"
      >
        <Bookmark className="size-5" />
        <span>Save</span>
      </button>
    </div>
  );
}
