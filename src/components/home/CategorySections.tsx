
import HomeCategorySection from './HomeCategorySection';
import NoCategoriesMessage from './NoCategoriesMessage';
import { PostMetadata } from '@/utils/markdown';

interface CategorySectionsProps {
  isLoading: boolean;
  postsByCategory: Record<string, PostMetadata[]>;
}

export default function CategorySections({ isLoading, postsByCategory }: CategorySectionsProps) {
  if (isLoading) return null;
  
  const hasCategories = Object.entries(postsByCategory).length > 0;
  
  if (!hasCategories) {
    return <NoCategoriesMessage />;
  }
  
  return (
    <>
      {Object.entries(postsByCategory).map(([category, categoryPosts]) => (
        <HomeCategorySection 
          key={category} 
          category={category} 
          posts={categoryPosts} 
        />
      ))}
    </>
  );
}
