import type { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getAboutContent } from '@/lib/content';
import remarkGfm from 'remark-gfm';

export const metadata: Metadata = {
  title: 'เกี่ยวกับฉัน',
  description: 'เกี่ยวกับครูทีกิด — นักพัฒนาซอฟต์แวร์และผู้สอน',
};

export default function AboutPage() {
  const about = getAboutContent();

  return (
    <div className="about-page">
      <h1 className="about-page-title">เกี่ยวกับฉัน</h1>
      <div className="about-content">
        {about ? (
          <MDXRemote
            source={about.content}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
              },
            }}
          />
        ) : (
          <p>กำลังเตรียมข้อมูล...</p>
        )}
      </div>
    </div>
  );
}
