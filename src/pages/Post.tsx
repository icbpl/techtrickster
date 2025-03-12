
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { Post } from '@/utils/markdown';
import { fetchPostBySlug } from '@/server/mock-api';
import PostHeader from '@/components/blog/PostHeader';
import PostSidebar from '@/components/blog/PostSidebar';
import PostContent from '@/components/blog/PostContent';
import RightSidebarAd from '@/components/blog/RightSidebarAd';
import BackToTopButton from '@/components/blog/BackToTopButton';
import PostSkeleton from '@/components/blog/PostSkeleton';
import PostNotFound from '@/components/blog/PostNotFound';

export default function PostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Fetch post data
  useEffect(() => {
    async function loadPost() {
      if (!slug) return;
      
      setIsLoading(true);
      try {
        const postData = await fetchPostBySlug(slug);
        setPost(postData);
      } catch (error) {
        console.error('Error loading post:', error);
      } finally {
        setIsLoading(false);
      }
    }
    
    loadPost();
  }, [slug]);
  
  if (isLoading) {
    return (
      <Layout>
        <PostSkeleton />
      </Layout>
    );
  }
  
  if (!post) {
    return (
      <Layout>
        <PostNotFound />
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <article className="max-w-4xl mx-auto">
          <PostHeader post={post} />
          
          {/* Article Content */}
          <div className="relative grid grid-cols-12 gap-8">
            <PostSidebar />
            <PostContent content={post.content} />
            <RightSidebarAd />
          </div>
        </article>
        
        <BackToTopButton />
      </div>
    </Layout>
  );
}
