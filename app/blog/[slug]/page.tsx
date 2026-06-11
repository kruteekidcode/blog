import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getAllPosts, getPostBySlug, getRelatedPosts, formatDateThai } from '@/lib/content';
import BlogCard from '@/components/BlogCard';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeHighlight from 'rehype-highlight';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) return { title: 'ไม่พบบทความ' };

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      tags: post.tags,
      ...(post.coverImage && { images: [post.coverImage] }),
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      ...(post.coverImage && { images: [post.coverImage] }),
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Get related posts ranked by shared tags
  const relatedPosts = getRelatedPosts(slug, 2);

  const shareUrl = `https://kruteekidcode.com/blog/${slug}`;
  const shareTitle = encodeURIComponent(post.title);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    inLanguage: post.lang,
    keywords: post.tags.join(', '),
    url: shareUrl,
    ...(post.coverImage && {
      image: `https://kruteekidcode.com${post.coverImage}`,
    }),
    author: {
      '@type': 'Person',
      name: 'KruTeekid',
      url: 'https://kruteekidcode.com/about',
    },
    publisher: {
      '@type': 'Organization',
      name: 'KruTeekidCode',
      url: 'https://kruteekidcode.com',
    },
  };

  return (
    <article className="article-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Header */}
      <header className="article-header">
        {post.tags.length > 0 && (
          <span className="article-tag tag">{post.tags[0]}</span>
        )}
        <h1 className="article-title">{post.title}</h1>
        <div className="article-meta">
          <span className="article-meta-avatar">KT</span>
          <span>KruTeekid</span>
          <span className="article-meta-divider">·</span>
          <span>{formatDateThai(post.date)}</span>
          <span className="article-meta-divider">·</span>
          <span>{post.readingTime}</span>
        </div>
      </header>

      {/* Cover Image */}
      {post.coverImage && (
        <div className="article-cover">
          <Image
            src={post.coverImage}
            alt={post.title}
            width={1200}
            height={630}
            priority
            style={{ width: '100%', height: 'auto' }}
          />
        </div>
      )}

      {/* Content */}
      <div className="article-content">
        <MDXRemote
          source={post.content}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [rehypeSlug, rehypeHighlight],
            },
          }}
        />
      </div>

      {/* Footer */}
      <footer className="article-footer">
        {/* Tags */}
        <div className="article-tags">
          {post.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>

        {/* Share Buttons */}
        <div className="share-buttons">
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="share-btn"
          >
            Facebook
          </a>
          <a
            href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`}
            target="_blank"
            rel="noopener noreferrer"
            className="share-btn"
          >
            X / Twitter
          </a>
          <a
            href={`https://social-plugins.line.me/lineit/share?url=${shareUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="share-btn"
          >
            Line
          </a>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="related-posts">
            <h2 className="related-posts-title">บทความที่เกี่ยวข้อง</h2>
            <div className="related-posts-grid">
              {relatedPosts.map((rp) => (
                <BlogCard
                  key={rp.slug}
                  title={rp.title}
                  description={rp.description}
                  date={formatDateThai(rp.date)}
                  readingTime={rp.readingTime}
                  tags={rp.tags}
                  slug={rp.slug}
                  coverImage={rp.coverImage}
                />
              ))}
            </div>
          </div>
        )}
      </footer>
    </article>
  );
}
