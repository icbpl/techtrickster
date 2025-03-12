
export default function PostSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto animate-pulse">
        <div className="h-8 w-3/4 bg-muted rounded mb-4"></div>
        <div className="flex gap-4 mb-6">
          <div className="h-4 w-24 bg-muted rounded"></div>
          <div className="h-4 w-24 bg-muted rounded"></div>
        </div>
        <div className="aspect-video bg-muted rounded-lg mb-8"></div>
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="mb-4">
            <div className="h-4 w-full bg-muted rounded mb-2"></div>
            <div className="h-4 w-5/6 bg-muted rounded mb-2"></div>
            <div className="h-4 w-4/6 bg-muted rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
