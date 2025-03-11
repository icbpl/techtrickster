
import matter from 'gray-matter';

export interface PostMetadata {
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

export async function getAllPosts(): Promise<PostMetadata[]> {
  try {
    const response = await fetch('/api/posts');
    const data = await response.json();
    return data.posts;
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const response = await fetch(`/api/posts/${slug}`);
    if (!response.ok) {
      throw new Error(`Post not found: ${slug}`);
    }
    const post = await response.json();
    return post;
  } catch (error) {
    console.error(`Failed to fetch post with slug ${slug}:`, error);
    return null;
  }
}

export async function getPostsByCategory(category: string): Promise<PostMetadata[]> {
  try {
    const response = await fetch(`/api/categories/${category}`);
    const data = await response.json();
    return data.posts;
  } catch (error) {
    console.error(`Failed to fetch posts for category ${category}:`, error);
    return [];
  }
}
