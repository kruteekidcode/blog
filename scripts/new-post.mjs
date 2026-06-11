#!/usr/bin/env node
/**
 * สคริปต์สร้างบทความใหม่พร้อม frontmatter
 *
 * วิธีใช้:
 *   npm run new:post my-article-slug
 *   npm run new:post my-article-slug "ชื่อบทความภาษาไทย"
 */
import fs from 'node:fs';
import path from 'node:path';

const [slugArg, titleArg] = process.argv.slice(2);

if (!slugArg) {
  console.log('วิธีใช้: npm run new:post <slug> ["ชื่อบทความ"]');
  console.log('ตัวอย่าง: npm run new:post intro-to-javascript "JavaScript เบื้องต้น"');
  process.exit(1);
}

const slug = slugArg
  .toLowerCase()
  .replace(/\s+/g, '-')
  .replace(/[^a-z0-9-]/g, '');

if (!slug) {
  console.error('❌ slug ต้องเป็นภาษาอังกฤษ เช่น intro-to-javascript');
  process.exit(1);
}

const filePath = path.join(process.cwd(), 'content', 'blog', `${slug}.mdx`);

if (fs.existsSync(filePath)) {
  console.error(`❌ มีไฟล์ ${slug}.mdx อยู่แล้ว`);
  process.exit(1);
}

const today = new Date().toISOString().slice(0, 10);
const title = titleArg || 'ชื่อบทความของคุณ';

const template = `---
title: "${title}"
description: "คำอธิบายสั้นๆ ของบทความ (แสดงบนการ์ดและ SEO)"
date: "${today}"
tags: ["Technology"]
draft: true
# coverImage: "/images/blog/${slug}.jpg"
---

เขียนบทนำของบทความที่นี่...

## หัวข้อแรก

เนื้อหา...

## สรุป

สรุปบทความ...
`;

fs.mkdirSync(path.dirname(filePath), { recursive: true });
fs.writeFileSync(filePath, template, 'utf-8');

console.log(`✅ สร้างบทความใหม่แล้ว: content/blog/${slug}.mdx`);
console.log(`📝 สถานะ: draft (จะไม่แสดงบนเว็บจริงจนกว่าจะลบบรรทัด draft: true)`);
console.log(`👀 ดูตัวอย่างได้ที่ http://localhost:3000/blog/${slug} (npm run dev)`);
