
import { cn } from '@/lib/utils';

type AdSize = '728x90' | '300x600' | '336x280' | '300x250' | '320x50' | 'responsive';

interface AdPlaceholderProps {
  size: AdSize;
  className?: string;
  label?: boolean;
}

export default function AdPlaceholder({ size, className, label = true }: AdPlaceholderProps) {
  // Get dimensions
  const getDimensions = () => {
    switch (size) {
      case '728x90':
        return { width: 728, height: 90, class: 'w-full max-w-[728px] h-[90px]' };
      case '300x600':
        return { width: 300, height: 600, class: 'w-full max-w-[300px] h-[600px]' };
      case '336x280':
        return { width: 336, height: 280, class: 'w-full max-w-[336px] h-[280px]' };
      case '300x250':
        return { width: 300, height: 250, class: 'w-full max-w-[300px] h-[250px]' };
      case '320x50':
        return { width: 320, height: 50, class: 'w-full max-w-[320px] h-[50px]' };
      case 'responsive':
        return { width: '100%', height: 'auto', class: 'w-full aspect-[4/1] md:aspect-[6/1]' };
      default:
        return { width: '100%', height: 'auto', class: 'w-full aspect-[2/1]' };
    }
  };
  
  const dimensions = getDimensions();
  
  return (
    <div 
      className={cn(
        'relative flex items-center justify-center border rounded-md overflow-hidden animate-ad-glow bg-gradient-to-r from-background/80 to-card/90 backdrop-blur-sm',
        dimensions.class, 
        className
      )}
    >
      {label && (
        <span className="absolute top-2 left-2 text-xs font-medium text-muted-foreground bg-background/70 dark:bg-background/40 backdrop-blur-sm px-2 py-0.5 rounded-sm">
          Iklan
        </span>
      )}
      <div className="text-center text-muted-foreground text-sm">
        Ad {typeof dimensions.width === 'number' ? `${dimensions.width}×${dimensions.height}` : 'Space'}
      </div>
    </div>
  );
}
