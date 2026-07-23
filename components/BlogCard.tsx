import Link from 'next/link';
import Image from 'next/image';

interface BlogCardProps {
  title: string;
  description: string;
  date: string;
  readingTime: string;
  tags: string[];
  slug: string;
  coverImage?: string;
  emoji?: string;
}

export default function BlogCard({
  title,
  description,
  date,
  readingTime,
  tags,
  slug,
  coverImage,
  emoji = '📝',
}: BlogCardProps) {
  return (
    <article className="blog-card">
      <Link href={`/blog/${slug}`} className="blog-card-image" aria-hidden="true" tabIndex={-1}>
        {coverImage ? (
          <Image
            src={coverImage}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            style={{ objectFit: 'cover' }}
          />
        ) : (
          <span>{emoji}</span>
        )}
      </Link>
      <div className="blog-card-content">
        <div className="blog-card-tags">
          {tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
        <h3 className="blog-card-title">
          <Link href={`/blog/${slug}`}>{title}</Link>
        </h3>
        <p className="blog-card-desc">{description}</p>
        <div className="blog-card-meta">
          <span>{date}</span>
          <span className="dot">•</span>
          <span>{readingTime}</span>
        </div>
      </div>
    </article>
  );
}
