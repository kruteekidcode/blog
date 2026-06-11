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
  draft: boolean;
}

export interface Course {
  slug: string;
  title: string;
  description: string;
  content: string;
  level?: string;
  lessons?: number;
  duration?: string;
  order?: number;
}

/**
 * Validate date string — warn at build time if invalid
 */
function parseDate(dateString: string, slug: string): number {
  if (!dateString) return 0;
  const time = new Date(dateString).getTime();
  if (Number.isNaN(time)) {
    console.warn(`[content] Invalid date "${dateString}" in post "${slug}" — expected YYYY-MM-DD`);
    return 0;
  }
  return time;
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
      draft: data.draft === true,
    } as BlogPost;
  });

  // Hide drafts in production build (still visible during `next dev`)
  const visiblePosts =
    process.env.NODE_ENV === 'production'
      ? posts.filter((post) => !post.draft)
      : posts;

  // Sort by date descending
  return visiblePosts.sort((a, b) => {
    return parseDate(b.date, b.slug) - parseDate(a.date, a.slug);
  });
}

/**
 * Get related posts ranked by number of shared tags (fallback: latest posts)
 */
export function getRelatedPosts(slug: string, limit: number = 2): BlogPost[] {
  const current = getPostBySlug(slug);
  const others = getAllPosts().filter((p) => p.slug !== slug);

  if (!current || current.tags.length === 0) {
    return others.slice(0, limit);
  }

  const currentTags = new Set(current.tags);

  return others
    .map((post) => ({
      post,
      score: post.tags.filter((tag) => currentTags.has(tag)).length,
    }))
    .sort((a, b) => b.score - a.score || parseDate(b.post.date, b.post.slug) - parseDate(a.post.date, a.post.slug))
    .slice(0, limit)
    .map(({ post }) => post);
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
    draft: data.draft === true,
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

  const courses = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, '');
    const filePath = path.join(coursesDir, filename);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);

    return {
      slug,
      title: data.title || 'Untitled',
      description: data.description || '',
      content,
      level: data.level || undefined,
      lessons: data.lessons || undefined,
      duration: data.duration || undefined,
      order: data.order ?? undefined,
    } as Course;
  });

  // Sort by `order` field (courses without order go last)
  return courses.sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
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
    level: data.level || undefined,
    lessons: data.lessons || undefined,
    duration: data.duration || undefined,
    order: data.order ?? undefined,
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
  if (!dateString || Number.isNaN(date.getTime())) {
    return dateString || '';
  }
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear() + 543; // Thai Buddhist year

  return `${day} ${month} ${year}`;
}
