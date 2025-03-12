
export interface PostMetadata {
  id?: number;
  title: string;
  date: string;
  excerpt: string;
  cover: string;
  category: string;
  readTime: string;
  author: string;
  slug: string;
}

export interface Post extends PostMetadata {
  content: string;
}

// Re-export the server functions for API compatibility
import { fetchAllPosts, fetchPostBySlug, fetchPostsByCategory } from '../server/mock-api';

// These functions are kept for compatibility but now just forward to the server functions
export async function getAllPosts(): Promise<PostMetadata[]> {
  try {
    console.log('Using direct server import for getAllPosts');
    return await fetchAllPosts();
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    console.log(`Using direct server import for getPostBySlug: ${slug}`);
    return await fetchPostBySlug(slug);
  } catch (error) {
    console.error(`Failed to fetch post with slug ${slug}:`, error);
    return null;
  }
}

export async function getPostsByCategory(category: string): Promise<PostMetadata[]> {
  try {
    console.log(`Using direct server import for getPostsByCategory: ${category}`);
    return await fetchPostsByCategory(category);
  } catch (error) {
    console.error(`Failed to fetch posts for category ${category}:`, error);
    return [];
  }
}
