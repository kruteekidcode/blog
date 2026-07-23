import type { Metadata } from 'next';
import { getAllPosts, getAllTags, formatDateThai } from '@/lib/content';
import { emojiForPost } from '@/lib/emoji';
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
    emoji: emojiForPost(post.tags),
  }));

  return (
    <div className="blog-page">
      {/* Pink gradient hero band */}
      <header className="blog-hero">
        <div className="blog-hero-inner">
          <div className="blog-hero-eyebrow">Blog</div>
          <h1 className="blog-hero-title">บทความทั้งหมด</h1>
          <p className="blog-hero-sub">
            ความรู้เรื่องการสอนเด็กเขียนโค้ด เทคโนโลยี และการศึกษายุคดิจิทัล
          </p>
        </div>
        <svg
          viewBox="0 0 1440 60"
          preserveAspectRatio="none"
          className="blog-hero-wave"
          aria-hidden="true"
        >
          <path d="M0,32 C360,64 1080,0 1440,32 L1440,60 L0,60 Z" fill="#fdfbfc" />
        </svg>
      </header>

      <div className="blog-page-body">
        {posts.length > 0 ? (
          <BlogList posts={listItems} tags={tags} />
        ) : (
          <div className="blog-page-empty">
            <div className="blog-empty-emoji">📝</div>
            <p className="blog-empty-title">ยังไม่มีบทความ</p>
            <p>กำลังเขียนอยู่ รอติดตามนะครับ</p>
          </div>
        )}
      </div>
    </div>
  );
}
