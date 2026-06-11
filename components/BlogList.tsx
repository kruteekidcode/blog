'use client';

import { useMemo, useState } from 'react';
import Fuse from 'fuse.js';
import BlogCard from '@/components/BlogCard';

export interface BlogListItem {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingTime: string;
  tags: string[];
  coverImage?: string;
}

interface BlogListProps {
  posts: BlogListItem[];
  tags: string[];
}

export default function BlogList({ posts, tags }: BlogListProps) {
  const [query, setQuery] = useState('');
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const fuse = useMemo(
    () =>
      new Fuse(posts, {
        keys: ['title', 'description', 'tags'],
        threshold: 0.35,
        ignoreLocation: true,
      }),
    [posts]
  );

  const filteredPosts = useMemo(() => {
    let result = query.trim()
      ? fuse.search(query).map((r) => r.item)
      : posts;

    if (activeTag) {
      result = result.filter((post) => post.tags.includes(activeTag));
    }

    return result;
  }, [query, activeTag, fuse, posts]);

  return (
    <>
      <div className="blog-toolbar">
        <input
          type="search"
          className="blog-search-input"
          placeholder="ค้นหาบทความ..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="ค้นหาบทความ"
        />
        {tags.length > 0 && (
          <div className="blog-tag-filter">
            <button
              className={`tag-filter-btn ${activeTag === null ? 'active' : ''}`}
              onClick={() => setActiveTag(null)}
            >
              ทั้งหมด
            </button>
            {tags.map((tag) => (
              <button
                key={tag}
                className={`tag-filter-btn ${activeTag === tag ? 'active' : ''}`}
                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        )}
      </div>

      {filteredPosts.length > 0 ? (
        <div className="blog-page-grid">
          {filteredPosts.map((post) => (
            <BlogCard
              key={post.slug}
              title={post.title}
              description={post.description}
              date={post.date}
              readingTime={post.readingTime}
              tags={post.tags}
              slug={post.slug}
              coverImage={post.coverImage}
            />
          ))}
        </div>
      ) : (
        <div className="blog-page-empty">
          <p>ไม่พบบทความที่ตรงกับการค้นหา ลองคำอื่นดูนะครับ 🔍</p>
        </div>
      )}
    </>
  );
}
