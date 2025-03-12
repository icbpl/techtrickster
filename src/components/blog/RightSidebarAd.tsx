
import AdPlaceholder from '../ui/AdPlaceholder';

export default function RightSidebarAd() {
  return (
    <div className="hidden lg:block lg:col-span-3">
      <div className="sticky top-20">
        <AdPlaceholder size="300x600" />
      </div>
    </div>
  );
}
