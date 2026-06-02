import Link from 'next/link';
import BlogCard from '@/components/BlogCard';
import CourseCard from '@/components/CourseCard';
import { getAllPosts, getAllCourses, formatDateThai } from '@/lib/content';

export default function Home() {
  const allPosts = getAllPosts();
  const latestPosts = allPosts.slice(0, 3); // Get top 3 latest posts
  const courses = getAllCourses().slice(0, 2); // Get top 2 courses

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <span className="hero-badge">ยินดีต้อนรับ</span>
            <h1 className="hero-title">สวัสดี, ผมครูทีกิด</h1>
            <p className="hero-subtitle">
              เขียนเกี่ยวกับ Technology, Coding &amp; Education
              <br />
              แบ่งปันความรู้และประสบการณ์ผ่านบทความและหลักสูตร
            </p>
            <div className="hero-buttons">
              <Link href="/blog" className="btn-primary">
                อ่านบทความ →
              </Link>
              <Link href="/courses" className="btn-outline">
                ดูหลักสูตร
              </Link>
            </div>
          </div>
          <div className="hero-avatar-wrapper">
            <img 
              src="/images/Profile02.jpg" 
              alt="Kru Tee Profile" 
              className="hero-avatar" 
              style={{ objectFit: 'cover' }} 
            />
          </div>
        </div>
      </section>

      {/* Latest Posts Section */}
      <section className="section section-alt">
        <div className="section-header">
          <h2 className="section-title">บทความล่าสุด</h2>
        </div>
        {latestPosts.length > 0 ? (
          <div className="posts-grid">
            {latestPosts.map((post) => (
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
            <p>กำลังเตรียมบทความ — รอติดตามนะครับ 📝</p>
          </div>
        )}
        <div className="section-more">
          <Link href="/blog" className="btn-outline">
            ดูบทความทั้งหมด →
          </Link>
        </div>
      </section>

      {/* Courses Section */}
      <section className="section">
        <div className="section-header">
          <h2 className="section-title">หลักสูตร</h2>
        </div>
        {courses.length > 0 ? (
          <div className="courses-grid">
            {courses.map((course) => (
              <CourseCard
                key={course.slug}
                title={course.title}
                description={course.description}
                slug={course.slug}
              />
            ))}
          </div>
        ) : (
          <div className="blog-page-empty">
            <p>กำลังเตรียมหลักสูตร — รอติดตามนะครับ 📚</p>
          </div>
        )}
      </section>
    </>
  );
}

