import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const contentDirectory = path.join(process.cwd(), 'content');

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  coverImage?: string;
  readingTime: string;
  content: string;
  lang: string;
}

export interface Course {
  slug: string;
  title: string;
  description: string;
  content: string;
}

export function getAllPosts(): BlogPost[] {
  const blogDir = path.join(contentDirectory, 'blog');

  if (!fs.existsSync(blogDir)) {
    return [];
  }

  const files = fs.readdirSync(blogDir).filter((f) => f.endsWith('.mdx'));

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, '');
    const filePath = path.join(blogDir, filename);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);
    const stats = readingTime(content);

    return {
      slug,
      title: data.title || 'Untitled',
      description: data.description || '',
      date: data.date || '',
      tags: data.tags || [],
      coverImage: data.coverImage || undefined,
      readingTime: `${Math.ceil(stats.minutes)} min`,
      content,
      lang: data.lang || 'th',
    } as BlogPost;
  });

  // Sort by date descending
  return posts.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(contentDirectory, 'blog', `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);
  const stats = readingTime(content);

  return {
    slug,
    title: data.title || 'Untitled',
    description: data.description || '',
    date: data.date || '',
    tags: data.tags || [],
    coverImage: data.coverImage || undefined,
    readingTime: `${Math.ceil(stats.minutes)} min`,
    content,
    lang: data.lang || 'th',
  };
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tagSet = new Set<string>();
  posts.forEach((post) => {
    post.tags.forEach((tag) => tagSet.add(tag));
  });
  return Array.from(tagSet).sort();
}

export function getAllCourses(): Course[] {
  const coursesDir = path.join(contentDirectory, 'courses');

  if (!fs.existsSync(coursesDir)) {
    return [];
  }

  const files = fs.readdirSync(coursesDir).filter((f) => f.endsWith('.mdx'));

  return files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, '');
    const filePath = path.join(coursesDir, filename);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);

    return {
      slug,
      title: data.title || 'Untitled',
      description: data.description || '',
      content,
    };
  });
}

export function getCourseBySlug(slug: string): Course | null {
  const filePath = path.join(contentDirectory, 'courses', `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  return {
    slug,
    title: data.title || 'Untitled',
    description: data.description || '',
    content,
  };
}

export function getAboutContent(): { content: string } | null {
  const filePath = path.join(contentDirectory, 'about.mdx');

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { content } = matter(fileContent);

  return { content };
}

/**
 * Format date string to Thai format
 */
export function formatDateThai(dateString: string): string {
  const months = [
    'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.',
    'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.',
  ];

  const date = new Date(dateString);
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear() + 543; // Thai Buddhist year

  return `${day} ${month} ${year}`;
}
