import Link from 'next/link';
import Image from 'next/image';
import BlogCard from '@/components/BlogCard';
import CourseCard from '@/components/CourseCard';
import NewsletterForm from '@/components/NewsletterForm';
import { getAllPosts, getAllCourses, formatDateThai } from '@/lib/content';
import { emojiForPost } from '@/lib/emoji';

export default function Home() {
  const allPosts = getAllPosts();
  const latestPosts = allPosts.slice(0, 3);
  const allCourses = getAllCourses();
  const courses = allCourses.slice(0, 2);

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="hero-blob-1" aria-hidden="true" />
        <div className="hero-blob-2" aria-hidden="true" />
        <div className="hero-container">
          <div className="hero-content">
            <span className="hero-badge">ยินดีต้อนรับ</span>
            <h1 className="hero-title">ครูตี๋คิดโค้ด</h1>
            <p className="hero-subtitle">
              ครูตี๋สอนเด็กๆให้ คิดเป็นระบบ แก้ปัญหาเป็นขั้นตอน เขียนโค้ดสำหรับอนาคต
            </p>
            <div className="hero-buttons">
              <Link href="/blog" className="btn-primary">
                อ่านบทความ →
              </Link>
              <Link href="/courses" className="btn-outline">
                ดูหลักสูตร
              </Link>
            </div>
            <div className="hero-stats">
              <div>
                <div className="hero-stat-value">{allPosts.length}+</div>
                <div className="hero-stat-label">บทความ</div>
              </div>
              <div>
                <div className="hero-stat-value">{allCourses.length}</div>
                <div className="hero-stat-label">หลักสูตร</div>
              </div>
              <div>
                <div className="hero-stat-value">100%</div>
                <div className="hero-stat-label">มือใหม่เข้าใจได้</div>
              </div>
            </div>
          </div>
          <div className="hero-media">
            <div className="hero-avatar-float">
              <Image
                src="/images/Profile03.png"
                alt="ครูตี๋"
                className="hero-avatar"
                width={330}
                height={330}
                priority
              />
            </div>
          </div>
        </div>
        <svg
          viewBox="0 0 1440 60"
          preserveAspectRatio="none"
          className="hero-wave"
          aria-hidden="true"
        >
          <path d="M0,32 C360,64 1080,0 1440,32 L1440,60 L0,60 Z" fill="#fdfbfc" />
        </svg>
      </section>

      {/* Latest articles */}
      <section id="blog" className="section">
        <div className="section-head">
          <div>
            <div className="section-eyebrow">Latest</div>
            <h2 className="section-title">บทความล่าสุด</h2>
          </div>
          <Link href="/blog" className="section-link">
            ดูบทความทั้งหมด →
          </Link>
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
                emoji={emojiForPost(post.tags)}
              />
            ))}
          </div>
        ) : (
          <div className="section-inner">
            <p>กำลังเตรียมบทความ — รอติดตามนะครับ 📝</p>
          </div>
        )}
      </section>

      {/* Courses */}
      {courses.length > 0 && (
        <section id="courses" className="section section-courses">
          <div className="section-head">
            <div>
              <div className="section-eyebrow blue">Learn</div>
              <h2 className="section-title">หลักสูตร</h2>
            </div>
          </div>
          <div className="section-inner">
            <div className="courses-grid">
              {courses.map((course) => (
                <CourseCard
                  key={course.slug}
                  title={course.title}
                  description={course.description}
                  slug={course.slug}
                  level={course.level}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter */}
      <section id="newsletter" className="newsletter">
        <div className="newsletter-panel">
          <div className="newsletter-copy">
            <h2 className="newsletter-title">อยากติดตามความรู้ใหม่ ๆ ?</h2>
            <p className="newsletter-sub">
              ความรู้เรื่องสอนเด็กเขียนโค้ด ส่งตรงถึงคุณพ่อคุณแม่
            </p>
          </div>
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}
