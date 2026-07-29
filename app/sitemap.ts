import { MetadataRoute } from 'next';
import { getAllPosts, getAllCourses } from '@/lib/content';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://kruteekidcode.com';

  // Static routes
  const staticRoutes = [
    '',
    '/articles',
    '/courses',
    '/about',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Dynamic article posts
  const posts = getAllPosts();
  const articleRoutes = posts.map((post) => ({
    url: `${baseUrl}/articles/${post.slug}`,
    lastModified: new Date(post.date || new Date()),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  // Dynamic courses
  const courses = getAllCourses();
  const courseRoutes = courses.map((course) => ({
    url: `${baseUrl}/courses/${course.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...articleRoutes, ...courseRoutes];
}
