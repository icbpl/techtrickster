
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
    
    // Extract front matter and content
    const pattern = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
    const match = text.match(pattern);
    
    if (!match) {
      console.error(`No front matter found in: ${path}`);
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
    // This would normally be a server-side operation to scan directories
    // For this example, we'll hardcode the structure we created
    const files = [
      { category: 'web-development', filename: 'react-best-practices.md' },
      { category: 'javascript', filename: 'async-await-tutorial.md' }
    ];
    
    const posts: PostMetadata[] = [];
    
    // Add index to generate unique IDs for posts
    let index = 1;
    
    for (const file of files) {
      const path = `${BASE_URL}/${file.category}/${file.filename}`;
      const result = await readMarkdownFile(path);
      
      if (result) {
        const slug = generateSlug(file.filename);
        posts.push({
          ...result.metadata,
          id: index++, // Add an ID for each post
          slug,
          category: file.category // Ensure category is set correctly
        } as PostMetadata);
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
    // This mapping would normally be done on the server
    const slugToPath: Record<string, { path: string, category: string }> = {
      'react-best-practices': { 
        path: `${BASE_URL}/web-development/react-best-practices.md`,
        category: 'web-development' 
      },
      'async-await-tutorial': { 
        path: `${BASE_URL}/javascript/async-await-tutorial.md`,
        category: 'javascript'
      }
    };
    
    const fileInfo = slugToPath[slug];
    if (!fileInfo) {
      console.error(`No path mapping found for slug: ${slug}`);
      return null;
    }
    
    const result = await readMarkdownFile(fileInfo.path);
    if (!result) {
      return null;
    }
    
    // Generate a consistent ID for the post
    const postId = Object.keys(slugToPath).indexOf(slug) + 1;
    
    return {
      ...result.metadata,
      id: postId,
      slug,
      category: fileInfo.category, // Ensure category is set correctly
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
    const filteredPosts = allPosts.filter(post => 
      post.category.toLowerCase() === category.toLowerCase()
    );
    
    console.log(`Found ${filteredPosts.length} posts in category '${category}'`);
    return filteredPosts;
  } catch (error) {
    console.error(`Error fetching posts for category ${category}:`, error);
    return [];
  }
}
