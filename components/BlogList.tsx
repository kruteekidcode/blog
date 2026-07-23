'use client';

import { useMemo, useState } from 'react';
import BlogCard from '@/components/BlogCard';

export interface BlogListItem {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingTime: string;
  tags: string[];
  coverImage?: string;
  emoji?: string;
}

interface BlogListProps {
  posts: BlogListItem[];
  tags: string[];
}

const ALL = 'ทั้งหมด';

export default function BlogList({ posts, tags }: BlogListProps) {
  const [query, setQuery] = useState('');
  const [activeTag, setActiveTag] = useState<string>(ALL);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      const matchTag = activeTag === ALL || p.tags.includes(activeTag);
      const matchQ =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q));
      return matchTag && matchQ;
    });
  }, [query, activeTag, posts]);

  const chips = [ALL, ...tags];

  return (
    <div className="blog-toolbar">
      {/* Search + result count */}
      <div className="blog-search-row">
        <div className="blog-search-field">
          <svg
            className="blog-search-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            width="18"
            height="18"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="text"
            className="blog-search-input"
            placeholder="ค้นหาบทความ..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="ค้นหาบทความ"
          />
        </div>
        <div className="blog-result-label">{filtered.length} บทความ</div>
      </div>

      {/* Tag filter chips */}
      <div className="blog-tag-filter">
        {chips.map((tag) => (
          <button
            key={tag}
            className={`tag-filter-btn ${activeTag === tag ? 'active' : ''}`}
            onClick={() => setActiveTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Results */}
      {filtered.length > 0 ? (
        <div className="blog-page-grid">
          {filtered.map((post) => (
            <BlogCard
              key={post.slug}
              title={post.title}
              description={post.description}
              date={post.date}
              readingTime={post.readingTime}
              tags={post.tags}
              slug={post.slug}
              coverImage={post.coverImage}
              emoji={post.emoji}
            />
          ))}
        </div>
      ) : (
        <div className="blog-page-empty">
          <div className="blog-empty-emoji">🔍</div>
          <p className="blog-empty-title">ไม่พบบทความที่ตรงกับการค้นหา</p>
          <p>ลองใช้คำค้นหาอื่น หรือเลือกแท็กอื่น</p>
        </div>
      )}
    </div>
  );
}
