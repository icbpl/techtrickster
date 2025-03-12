
export default function PostNotFound() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
        <p className="mb-6">The post you're looking for doesn't exist or has been removed.</p>
        <a href="/" className="px-4 py-2 bg-primary text-primary-foreground rounded-md">
          Back to Home
        </a>
      </div>
    </div>
  );
}
