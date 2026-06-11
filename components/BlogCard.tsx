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
}

export default function BlogCard({
  title,
  description,
  date,
  readingTime,
  tags,
  slug,
  coverImage,
}: BlogCardProps) {
  return (
    <article className="blog-card">
      <div className="blog-card-image" style={{ position: 'relative' }}>
        {coverImage ? (
          <Image
            src={coverImage}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            style={{ objectFit: 'cover' }}
          />
        ) : (
          <span>📝</span>
        )}
      </div>
      <div className="blog-card-content">
        <h3 className="blog-card-title">
          <Link href={`/blog/${slug}`}>{title}</Link>
        </h3>
        <div className="blog-card-meta">
          <span>{date}</span>
          <span>·</span>
          <span>{readingTime}</span>
        </div>
        <div className="blog-card-tags">
          {tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
