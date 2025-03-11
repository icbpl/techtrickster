
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

// These functions are kept for compatibility but will be deprecated
// in favor of direct server imports

export async function getAllPosts(): Promise<PostMetadata[]> {
  try {
    console.log('Fetching all posts...');
    const response = await fetch('/api/posts');
    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Fetched posts data:', data);
    return data.posts || [];
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    console.log(`Fetching post with slug: ${slug}`);
    const response = await fetch(`/api/posts/${slug}`);
    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
      throw new Error(`Post not found: ${slug}`);
    }
    const post = await response.json();
    console.log('Fetched post data:', post);
    return post;
  } catch (error) {
    console.error(`Failed to fetch post with slug ${slug}:`, error);
    return null;
  }
}

export async function getPostsByCategory(category: string): Promise<PostMetadata[]> {
  try {
    console.log(`Fetching posts for category: ${category}`);
    const response = await fetch(`/api/categories/${category}`);
    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Fetched category posts data:', data);
    return data.posts || [];
  } catch (error) {
    console.error(`Failed to fetch posts for category ${category}:`, error);
    return [];
  }
}
