
import AdPlaceholder from '../ui/AdPlaceholder';

interface AdBannerProps {
  size: '728x90' | '300x600' | '336x280' | '300x250' | '320x50' | 'responsive';
  className?: string;
  position?: 'top' | 'middle' | 'bottom';
}

export default function AdBanner({ size, className, position = 'middle' }: AdBannerProps) {
  return (
    <section className={position === 'top' ? 'mb-8' : 'mb-12'}>
      <AdPlaceholder size={size} className={className || 'mx-auto'} />
    </section>
  );
}
