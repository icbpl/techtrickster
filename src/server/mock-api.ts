
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
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`Failed to fetch markdown file: ${path}`);
    }
    const text = await response.text();
    
    // Extract front matter and content
    const pattern = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
    const match = text.match(pattern);
    
    if (!match) {
      return null;
    }
    
    const frontMatter = match[1];
    const content = match[2];
    
    // Parse front matter
    const metadata: Record<string, string> = {};
    const lines = frontMatter.split('\n');
    
    for (const line of lines) {
      const [key, ...valueParts] = line.split(':');
      if (key && valueParts.length) {
        const value = valueParts.join(':').trim();
        // Remove quotes if present
        metadata[key.trim()] = value.replace(/^"(.*)"$/, '$1');
      }
    }
    
    return { metadata, content };
  } catch (error) {
    console.error('Error reading markdown file:', error);
    return null;
  }
}

// Get all blog posts
export async function fetchAllPosts(): Promise<PostMetadata[]> {
  try {
    // This would normally be a server-side operation to scan directories
    // For this example, we'll hardcode the structure we created
    const categories = ['web-development', 'javascript'];
    const files = [
      { category: 'web-development', filename: 'react-best-practices.md' },
      { category: 'javascript', filename: 'async-await-tutorial.md' }
    ];
    
    const posts: PostMetadata[] = [];
    
    for (const file of files) {
      const path = `${BASE_URL}/${file.category}/${file.filename}`;
      const result = await readMarkdownFile(path);
      
      if (result) {
        const slug = generateSlug(file.filename);
        posts.push({
          ...result.metadata,
          slug,
        } as PostMetadata);
      }
    }
    
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
    // This mapping would normally be done on the server
    const slugToPath: Record<string, string> = {
      'react-best-practices': `${BASE_URL}/web-development/react-best-practices.md`,
      'async-await-tutorial': `${BASE_URL}/javascript/async-await-tutorial.md`
    };
    
    const path = slugToPath[slug];
    if (!path) {
      return null;
    }
    
    const result = await readMarkdownFile(path);
    if (!result) {
      return null;
    }
    
    return {
      ...result.metadata,
      slug,
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
    const allPosts = await fetchAllPosts();
    return allPosts.filter(post => 
      post.category.toLowerCase().replace(/\s+/g, '-') === category.toLowerCase()
    );
  } catch (error) {
    console.error(`Error fetching posts for category ${category}:`, error);
    return [];
  }
}
