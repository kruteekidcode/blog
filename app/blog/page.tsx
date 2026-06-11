import type { Metadata } from 'next';
import { getAllPosts, getAllTags, formatDateThai } from '@/lib/content';
import BlogList from '@/components/BlogList';

export const metadata: Metadata = {
  title: 'บทความ',
  description: 'รวมบทความเกี่ยวกับ Technology, Coding และ Education',
};

export default function BlogPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  // Pass only serializable display fields to the client component
  const listItems = posts.map((post) => ({
    slug: post.slug,
    title: post.title,
    description: post.description,
    date: formatDateThai(post.date),
    readingTime: post.readingTime,
    tags: post.tags,
    coverImage: post.coverImage,
  }));

  return (
    <div className="blog-page">
      <div className="blog-page-header">
        <h1 className="blog-page-title">บทความทั้งหมด</h1>
      </div>

      {posts.length > 0 ? (
        <BlogList posts={listItems} tags={tags} />
      ) : (
        <div className="blog-page-empty">
          <p>ยังไม่มีบทความ — กำลังเขียนอยู่ รอติดตามนะครับ 📝</p>
        </div>
      )}
    </div>
  );
}
