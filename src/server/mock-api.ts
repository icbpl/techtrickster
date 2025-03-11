
// This file simulates API endpoints that would serve markdown files
// In a real application, you would use a server-side solution

import { Post, PostMetadata } from '../utils/markdown';

const BASE_URL = '/blogposts';

// Function to generate a slug from a filename
function generateSlug(filename: string): string {
  return filename.replace(/\.md$/, '');
}

// Function to read and parse a markdown file
async function readMarkdownFile(path: string): Promise<{ metadata: any, content: string } | null> {
  try {
    console.log(`Attempting to fetch markdown file at: ${path}`);
    const response = await fetch(path);
    if (!response.ok) {
      console.error(`Failed to fetch markdown file: ${path}, status: ${response.status}`);
      throw new Error(`Failed to fetch markdown file: ${path}`);
    }
    const text = await response.text();
    
    // Extract front matter and content with improved regex pattern
    // This regex accounts for Windows line endings and other edge cases
    const pattern = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/;
    const match = text.match(pattern);
    
    if (!match) {
      console.error(`No front matter found in: ${path}, checking file content...`);
      console.log(`File content preview: ${text.substring(0, 150)}...`);
      return null;
    }
    
    const frontMatter = match[1];
    const content = match[2];
    
    // Parse front matter
    const metadata: Record<string, string> = {};
    const lines = frontMatter.split(/\r?\n/);
    
    for (const line of lines) {
      if (!line.trim()) continue; // Skip empty lines
      
      const colonIndex = line.indexOf(':');
      if (colonIndex > 0) {
        const key = line.substring(0, colonIndex).trim();
        let value = line.substring(colonIndex + 1).trim();
        
        // Remove quotes if present
        if (value.startsWith('"') && value.endsWith('"')) {
          value = value.substring(1, value.length - 1);
        }
        
        metadata[key] = value;
      }
    }
    
    console.log(`Successfully parsed markdown file: ${path}`, { metadata });
    return { metadata, content };
  } catch (error) {
    console.error('Error reading markdown file:', error);
    return null;
  }
}

// Get all blog posts
export async function fetchAllPosts(): Promise<PostMetadata[]> {
  try {
    console.log('fetchAllPosts called');
    // We need to access the files directly in the public directory
    const files = [
      { filename: 'react-best-practices.md' }
    ];
    
    const posts: PostMetadata[] = [];
    
    // Add index to generate unique IDs for posts
    let index = 1;
    
    for (const file of files) {
      const path = `${BASE_URL}/${file.filename}`;
      console.log(`Trying to fetch: ${path}`);
      const result = await readMarkdownFile(path);
      
      if (result) {
        const slug = generateSlug(file.filename);
        posts.push({
          ...result.metadata,
          id: index++, // Add an ID for each post
          slug,
          category: result.metadata.category || 'Uncategorized'
        } as PostMetadata);
      } else {
        console.warn(`Failed to parse markdown file: ${file.filename}`);
      }
    }
    
    console.log(`Found ${posts.length} posts:`, posts);
    
    // Sort by date (newest first)
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error('Error fetching all posts:', error);
    return [];
  }
}

// Get a specific post by slug
export async function fetchPostBySlug(slug: string): Promise<Post | null> {
  try {
    console.log(`fetchPostBySlug called for slug: ${slug}`);
    // For simplicity, we'll map slugs directly to filenames
    const path = `${BASE_URL}/${slug}.md`;
    
    const result = await readMarkdownFile(path);
    if (!result) {
      return null;
    }
    
    // Generate a consistent ID for the post
    const postId = 1; // In a real app, this would be more sophisticated
    
    return {
      ...result.metadata,
      id: postId,
      slug,
      category: result.metadata.category || 'Uncategorized',
      content: result.content
    } as Post;
  } catch (error) {
    console.error(`Error fetching post with slug ${slug}:`, error);
    return null;
  }
}

// Get posts by category
export async function fetchPostsByCategory(category: string): Promise<PostMetadata[]> {
  try {
    console.log(`fetchPostsByCategory called for category: ${category}`);
    const allPosts = await fetchAllPosts();
    // Normalize category names for comparison (convert to lowercase, replace hyphens with spaces)
    const normalizedCategory = category.toLowerCase().replace(/-/g, ' ');
    
    const filteredPosts = allPosts.filter(post => {
      const postCategory = post.category.toLowerCase();
      return postCategory === normalizedCategory;
    });
    
    console.log(`Found ${filteredPosts.length} posts in category '${category}'`);
    return filteredPosts;
  } catch (error) {
    console.error(`Error fetching posts for category ${category}:`, error);
    return [];
  }
}
