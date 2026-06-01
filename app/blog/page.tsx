import type { Metadata } from 'next';
import { getAllPosts, formatDateThai } from '@/lib/content';
import BlogCard from '@/components/BlogCard';

export const metadata: Metadata = {
  title: 'บทความ',
  description: 'รวมบทความเกี่ยวกับ Technology, Coding และ Education',
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="blog-page">
      <div className="blog-page-header">
        <h1 className="blog-page-title">บทความทั้งหมด</h1>
      </div>

      {posts.length > 0 ? (
        <div className="blog-page-grid">
          {posts.map((post) => (
            <BlogCard
              key={post.slug}
              title={post.title}
              description={post.description}
              date={formatDateThai(post.date)}
              readingTime={post.readingTime}
              tags={post.tags}
              slug={post.slug}
              coverImage={post.coverImage}
            />
          ))}
        </div>
      ) : (
        <div className="blog-page-empty">
          <p>ยังไม่มีบทความ — กำลังเขียนอยู่ รอติดตามนะครับ 📝</p>
        </div>
      )}
    </div>
  );
}
