
import { Post, PostMetadata } from '../utils/markdown';
import matter from 'gray-matter';

// Use Vite's import.meta.glob to dynamically import all markdown files
const markdownFiles = import.meta.glob('/public/blogposts/**/*.md', { as: 'raw', eager: true });

// Function to generate a slug from a filepath
function generateSlug(filepath: string): string {
  // Extract the filename without extension from the path
  // Remove '/public/blogposts/' prefix and '.md' suffix
  return filepath
    .replace('/public/blogposts/', '')
    .replace('.md', '');
}

// Function to parse a markdown file
function parseMarkdownFile(filepath: string, content: string): { metadata: PostMetadata, content: string } | null {
  try {
    console.log(`Parsing markdown file: ${filepath}`);
    
    // Use gray-matter to parse frontmatter
    const { data, content: markdownContent } = matter(content);
    
    if (!data.title) {
      console.error(`Missing required frontmatter in: ${filepath}`);
      return null;
    }
    
    const slug = generateSlug(filepath);
    
    const metadata: PostMetadata = {
      ...data,
      title: data.title,
      date: data.date,
      excerpt: data.excerpt || '',
      cover: data.cover || '',
      category: data.category || 'Uncategorized',
      readTime: data.readTime || '5 min read',
      author: data.author || 'Anonymous',
      slug
    };
    
    console.log(`Successfully parsed markdown file: ${filepath}`, { metadata });
    return { metadata, content: markdownContent };
  } catch (error) {
    console.error(`Error parsing markdown file: ${filepath}`, error);
    return null;
  }
}

// Get all blog posts
export async function fetchAllPosts(): Promise<PostMetadata[]> {
  try {
    console.log('fetchAllPosts called');
    const posts: PostMetadata[] = [];
    
    // Add index to generate unique IDs for posts
    let index = 1;
    
    // Parse all markdown files
    for (const [filepath, content] of Object.entries(markdownFiles)) {
      console.log(`Processing file: ${filepath}`);
      const result = parseMarkdownFile(filepath, content);
      
      if (result) {
        posts.push({
          ...result.metadata,
          id: index++
        });
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
    
    // Look for a matching file
    for (const [filepath, content] of Object.entries(markdownFiles)) {
      const fileSlug = generateSlug(filepath);
      
      if (fileSlug === slug) {
        console.log(`Found matching file for slug ${slug}: ${filepath}`);
        const result = parseMarkdownFile(filepath, content);
        
        if (result) {
          return {
            ...result.metadata,
            id: 1, // Simple ID assignment
            content: result.content
          };
        }
      }
    }
    
    console.error(`No matching file found for slug: ${slug}`);
    return null;
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
