
import { Link } from 'react-router-dom';
import { Tag } from 'lucide-react';

// Dummy data for categories with post counts
const categories = [
  { name: 'JavaScript', count: 8, slug: 'javascript' },
  { name: 'React', count: 12, slug: 'react' },
  { name: 'CSS', count: 5, slug: 'css' },
  { name: 'TypeScript', count: 7, slug: 'typescript' },
  { name: 'Node.js', count: 6, slug: 'node-js' },
  { name: 'Database', count: 4, slug: 'database' },
  { name: 'AI', count: 3, slug: 'ai' },
];

export default function SidebarCategories() {
  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <h3 className="text-lg font-semibold p-4 border-b border-border bg-card">
        Categories
      </h3>
      <div className="divide-y divide-border">
        {categories.map((category) => (
          <Link 
            key={category.slug}
            to={`/category/${category.slug}`}
            className="flex items-center justify-between p-4 hover:bg-accent/50 transition-colors"
          >
            <span className="flex items-center gap-2">
              <Tag className="size-4 text-primary" />
              {category.name}
            </span>
            <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full">
              {category.count}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
