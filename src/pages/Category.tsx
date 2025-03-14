
import { useParams } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import ArticleCard from '../components/articles/ArticleCard';
import AdPlaceholder from '../components/ui/AdPlaceholder';
import Sidebar from '../components/home/Sidebar';
import { mockRecentArticles } from '../components/home/data/mockData';

export default function Category() {
  const { slug } = useParams<{ slug: string }>();
  const categoryName = slug ? slug.replace(/-/g, ' ') : '';
  const formattedCategoryName = categoryName.split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
    
  // Filter articles by category (case insensitive)
  const categoryArticles = mockRecentArticles.filter(
    article => article.category.toLowerCase() === categoryName.toLowerCase()
  );

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Above the fold - Top Ad Banner */}
        <div className="mb-8">
          <AdPlaceholder size="728x90" className="mx-auto" />
        </div>
        
        {/* Category Title */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold">{formattedCategoryName}</h1>
          <p className="text-muted-foreground mt-2">
            Browsing all articles in {formattedCategoryName} category
          </p>
        </div>
        
        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Main Articles Column */}
          <div className="lg:col-span-8">
            {categoryArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {categoryArticles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 border border-border rounded-lg">
                <h3 className="text-xl font-medium mb-2">No articles found</h3>
                <p className="text-muted-foreground">
                  There are no articles in this category yet.
                </p>
              </div>
            )}
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-4">
            <Sidebar articles={mockRecentArticles} />
          </div>
        </div>
      </div>
    </Layout>
  );
}
