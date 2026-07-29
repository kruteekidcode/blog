# 🤖 Agent Playbook — สร้างเว็บบล็อก/คอร์สสไตล์ KruTeeKidCode

> เอกสารนี้เขียนให้ **AI agent** ตัวถัดไป ใช้ "โคลน" วิธีทำงานและสถาปัตยกรรมของเว็บ
> `kruteekidcode-blog` ไปสร้างเว็บใหม่ได้เร็วและสม่ำเสมอ — ครอบคลุมตั้งแต่ tech stack,
> โครงสร้าง, design system, ระบบเขียนเนื้อหา, SEO, ฟอร์มรับข่าว, จนถึง deploy pipeline
> และข้อควรระวัง (gotchas) ที่เจอจริง
>
> **เว็บอ้างอิง (reference implementation):** repo นี้ — https://github.com/kruteekidcode/blog
> เว็บจริง: https://www.kruteekidcode.com

---

## 0. ปรัชญาการทำงาน (อ่านก่อนเริ่ม)

1. **ถามก่อนถ้าโจทย์กำกวม** ใช้เครื่องมือถามแบบตัวเลือก (AskUserQuestion) เรื่องที่กระทบทิศทาง เช่น
   hosting, วิธี deploy, พฤติกรรมฟอร์ม — อย่าเดาเรื่องใหญ่
2. **ไม่แตะ routing / data model เดิมโดยไม่จำเป็น** เวลารับดีไซน์ใหม่มา "port สไตล์"
   ไม่ใช่รื้อสถาปัตยกรรม
3. **มี verification step เสมอ** (type-check, ตรวจ deploy READY, ดึงหน้าเว็บจริงมาเช็ค)
4. **เก็บ repo ให้สะอาด** ไฟล์ต้นฉบับดีไซน์/zip/สคริปต์ช่วย ใส่ `.gitignore`
5. **ข้อความไทยที่ผู้ใช้ให้มาถือเป็น final** — คงสตริงเป๊ะ ไม่แก้คำเอง

---

## 1. Tech Stack (เวอร์ชันที่ใช้จริง)

| ส่วน | เทคโนโลยี | หมายเหตุ |
| :--- | :--- | :--- |
| Framework | **Next.js 16** (App Router) + React 19 | ⚠️ Next 16 มี breaking changes จาก 13–15 — อ่าน docs ใน `node_modules/next/dist/docs/` ก่อนเขียนโค้ดที่ไม่แน่ใจ |
| ภาษา | TypeScript 5 | `strict` |
| เนื้อหา | **MDX** ผ่าน `next-mdx-remote/rsc` | render ฝั่ง server (RSC) |
| Frontmatter | `gray-matter` | |
| เวลาอ่าน | `reading-time` | |
| Markdown plugins | `remark-gfm`, `rehype-slug`, `rehype-highlight` | |
| ฟอนต์ | `next/font/google` — Inter (latin) + **Noto Sans Thai Looped** (thai) | อย่าใช้ `@import` ใน CSS (render-blocking) |
| สไตล์ | **CSS ธรรมดา** ใน `app/globals.css` (design tokens เป็น CSS variables) | ไม่มี Tailwind |
| Analytics | Umami (ผ่าน env `NEXT_PUBLIC_UMAMI_*`) | ดู `ANALYTICS.md` |
| Newsletter | **MailerLite** ผ่าน API route ฝั่ง server | ดูหัวข้อ 7 |
| Hosting/Deploy | **Vercel** (auto-deploy จาก GitHub) | framework preset = Next.js |

> **หลักการเลือก stack:** เว็บเนื้อหา (blog/course/landing) ของครู/ธุรกิจเล็ก เน้น SEO + แก้ง่าย
> → static-ish Next.js + ไฟล์ MDX เป็น "ฐานข้อมูล" (ไม่ต้องมี DB/CMS) คือ sweet spot

---

## 2. โครงสร้างโปรเจกต์

```text
<project>/
├── app/
│   ├── layout.tsx              # ฟอนต์ (Inter+Noto Thai), metadata, Navbar/Footer, RSS alt, Umami
│   ├── globals.css             # 🎨 design system ทั้งหมด (CSS variables + คลาส)
│   ├── page.tsx                # 🏠 Home (hero, บทความล่าสุด, คอร์ส, newsletter)
│   ├── opengraph-image.tsx     # รูป OG อัตโนมัติ (ImageResponse)
│   ├── not-found.tsx           # 404 ภาษาไทย
│   ├── robots.ts, sitemap.ts   # SEO
│   ├── feed.xml/route.ts       # RSS
│   ├── api/subscribe/route.ts  # 📮 newsletter → MailerLite (server-side)
│   ├── articles/
│   │   ├── page.tsx            # รายการบทความ (server) → ส่งข้อมูลให้ BlogList
│   │   └── [slug]/page.tsx     # อ่านบทความ (MDX + JSON-LD + related)
│   └── courses/
│       ├── page.tsx
│       └── [slug]/page.tsx
├── components/
│   ├── Navbar.tsx  Footer.tsx  # 'use client' เฉพาะ Navbar (hamburger)
│   ├── BlogCard.tsx  CourseCard.tsx
│   ├── BlogList.tsx            # 'use client' — ค้นหา + กรองแท็ก (useMemo)
│   └── NewsletterForm.tsx      # 'use client' — ฟอร์มรับข่าว
├── content/
│   ├── articles/*.mdx  courses/*.mdx  about.mdx     # เนื้อหาจริง
├── lib/
│   ├── content.ts              # อ่าน MDX, draft, related-by-tag, วันที่ไทย พ.ศ.
│   └── emoji.ts                # แม็พแท็ก → อิโมจิ (การ์ดที่ไม่มีรูปปก)
├── scripts/new-post.mjs        # `npm run new:post <slug> "ชื่อ"`
├── public/images/              # รูปภาพ
└── docs/                       # 📚 เอกสาร (CHANGELOG, playbook นี้)
```

---

## 2b. 🔗 กติกา URL (ใช้ร่วมกันทุกเว็บในตระกูลนี้)

| ประเภท | รูปแบบ |
| :--- | :--- |
| หน้ารวมบทความ | `/articles` |
| บทความ | `/articles/<slug>` |
| หน้ารวมคอร์ส | `/courses` |
| คอร์ส | `/courses/<slug>` |

**ห้ามใช้ `/blog`** — repo นี้เคยใช้แล้วย้ายมา `/articles` เมื่อ ก.ค. 2026
เพื่อให้ตรงกับ `teedba.com` (ดูรายละเอียดใน `docs/CHANGELOG.md`)

`next.config.ts` มี redirect 308 ถาวรจาก `/blog/*` ไว้แล้ว — **ห้ามลบออก**

---

## 3. Design System (Pink & Blue v3)

ทั้งหมดอยู่ใน `app/globals.css` บล็อก `:root` — เปลี่ยนธีมทั้งเว็บได้จากที่เดียว

### สี (CSS variables)
```
--brand-pink: #e16c9e;  --brand-pink-dark: #b83d75;  --brand-pink-darker: #9c2f60;
--brand-blue: #6c9ee1;  --brand-blue-dark: #4a7bc4;
--bg-primary: #fdfbfc;          /* พื้นหลักโซนอ่าน (สว่าง) */
--bg-section-alt: #fdf7fa;      /* tint ชมพูอ่อน */
--bg-section-blue: #f4f8fd;     /* tint ฟ้าอ่อน */
--text-primary: #2b2f3a;  --text-secondary: #5f6470;  --text-muted: #8a8f9a;
--text-heading: #1e293b;  --nav-link: #475569;
--border-color: #f0e4ea;        /* การ์ดชมพู */  --border-blue: #dee9f7;  /* การ์ดฟ้า */
--tag-bg: #fbeaf0;  --tag-text: #993556;         /* ป้ายชมพู */
--blue-tint-bg: #e6effb;  --blue-text: #34588f;  /* ป้ายฟ้า */
```

### Gradients
```
--hero-gradient:  linear-gradient(120deg, #e16c9e 0%, #d24f88 74%, #6c9ee1 112%);  /* คงชมพู ไม่มีม่วงตรงกลาง */
--panel-gradient: linear-gradient(135deg, #6c9ee1, #4a7bc4);   /* footer + แผง newsletter */
--card-image-gradient: linear-gradient(135deg, #fbeaf0, #eaf1fc);  /* placeholder การ์ด */
```

### Radius / ฟอนต์ / อนิเมชัน
- radius: การ์ด **18px** (`--radius-card`), แผงใหญ่ **26px** (`--radius-panel`), ปุ่ม/ป้าย **999px** (`--radius-pill`)
- ฟอนต์: หัวข้อ weight 800, letter-spacing -0.01/-0.02em; body line-height 1.7
- keyframes: `floaty` (รูปโปรไฟล์ลอย), `fadeUp` (hero เข้า)

### หลักความ responsive (สำคัญ)
- **ไม่พึ่ง media query** — ใช้ `clamp(min, vw, max)` กับ spacing/typography
- การ์ดกริด: `grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))`
- nav ใช้ `flex-wrap`; มี media query แค่จุดเดียว (`max-width: 768px`) เพื่อสลับเมนู hamburger

### ลูกเล่นเฉพาะ
- **Wave divider:** SVG path `M0,32 C360,64 1080,0 1440,32 L1440,60 L0,60 Z` fill = `--bg-primary` วางท้าย hero band
- **Hero blobs:** วงกลม radial-gradient ขาวโปร่ง 2 วง (`.hero-blob-1/2`)
- การ์ดคอร์สมีแถบ accent ฟ้าซ้าย (`::before` width 5px)

---

## 4. ระบบเขียนเนื้อหา (Content workflow)

เนื้อหาเป็นไฟล์ `.mdx` ใน `content/` — ไม่มี DB/CMS

**Frontmatter บทความ:**
```mdx
---
title: "ชื่อบทความ"
description: "คำอธิบายสั้น (การ์ด + SEO)"
date: "2026-06-02"          # YYYY-MM-DD เท่านั้น (มี validation)
tags: ["Python", "Beginner"]
coverImage: "/images/blog/x.jpg"   # ถ้าไม่มี → ใช้อิโมจิจาก lib/emoji.ts
draft: true                 # true = ซ่อนจาก production, เห็นตอน `npm run dev`
---
```

**คำสั่ง:**
- `npm run new:post <slug> "ชื่อ"` — สร้างไฟล์พร้อม frontmatter (สถานะ draft)
- `npm run dev` — เห็น draft ด้วย  |  `npm run build` — ซ่อน draft

**ตรรกะสำคัญใน `lib/content.ts`:** อ่าน/sort ตามวันที่, กรอง draft ตอน production,
related posts จัดอันดับตาม **จำนวนแท็กที่ตรงกัน**, `formatDateThai()` → วันที่ พ.ศ. (เช่น `28 พ.ค. 2569`)

**ค้นหา + กรองแท็ก** (`components/BlogList.tsx`, `'use client'`): filter ด้วย `useMemo`
match `title | description | tags` (substring, lower-case) + แท็กที่เลือก ("ทั้งหมด" = แสดงหมด)

---

## 5. SEO (ครบชุด — คงไว้ทุกเว็บ)

- `app/layout.tsx`: `metadata` (title template, description, `metadataBase`, openGraph, twitter, robots) + `alternates.types['application/rss+xml']`
- `app/opengraph-image.tsx`: สร้างรูป OG 1200×630 ด้วย `next/og` `ImageResponse` (แบรนด์ gradient) — โซเชียลไทยแชร์ผ่าน Facebook/Line ต้องมีรูป
- บทความ: `generateMetadata` (OG/twitter รายโพสต์) + **JSON-LD** `BlogPosting` ใน `<script type="application/ld+json">`
- `sitemap.ts`, `robots.ts`, `feed.xml/route.ts`, `public/llms.txt`

---

## 6. รูปภาพ

ใช้ `next/image` เสมอ (ไม่ใช้ `<img>`) — hero รูปวงกลม `width/height` + `priority`;
การ์ดใช้ `fill` + `sizes` ในกล่อง `position: relative`

---

## 7. Newsletter — recipe ต่อบริการอีเมลอย่างปลอดภัย

**หลักการ:** อย่าเก็บอีเมลในเว็บเราเอง ใช้บริการภายนอก (MailerLite/Buttondown/Mailchimp)
และ **อย่าวาง API key ในโค้ดฝั่ง client** → ต้องผ่าน server route

**สถาปัตยกรรมที่ใช้ (แนะนำ):**
```
NewsletterForm.tsx (client)  --POST {email}-->  /api/subscribe (server route)
                                                    │ อ่าน MAILERLITE_API_KEY (secret)
                                                    └--> MailerLite API
```
ข้อดี: key เป็นความลับ, ไม่มีปัญหา CORS, อ่านผลลัพธ์จริงเพื่อแสดงข้อความถูกต้อง

**Environment variables (ตั้งบน Vercel, ไม่ commit):**
- `MAILERLITE_API_KEY` (จำเป็น) — MailerLite › Integrations › API
- `MAILERLITE_GROUP_ID` (ถ้ามี)

**ต้องมีเสมอ:** ข้อความ consent ตาม **PDPA** (ไทย) ใต้ฟอร์ม + ปุ่มยกเลิกรับข่าว (บริการจัดการให้)
+ แนะนำเปิด **double opt-in** โค้ดอ้างอิง: `app/api/subscribe/route.ts` + `components/NewsletterForm.tsx`

> เปลี่ยนไปใช้บริการอื่น: แก้แค่ปลายทางใน route (endpoint + field names) โครง client เหมือนเดิม

---

## 8. Deploy pipeline (สำคัญมากสำหรับ Cowork)

**สภาพแวดล้อม:** โค้ดอยู่บนเครื่อง Windows ของผู้ใช้; **git credentials อยู่บนเครื่องผู้ใช้เท่านั้น**
— agent/sandbox push เองไม่ได้ (ไม่มีสิทธิ์เขียน `.git` และไม่มี cred)

**วิธี deploy ที่ใช้จริง (GitHub → Vercel auto-deploy):**
1. แก้โค้ดในโฟลเดอร์ที่ mount ไว้
2. **type-check** ในสำเนา `/tmp` (ดู gotchas ข้อ B) ให้ผ่านก่อน
3. สร้างไฟล์ `.bat` (CRLF, `chcp 65001`) ที่รัน `git add -A && git commit -m "..." && git push origin main`
   — ตั้งชื่อสื่อความ เช่น `deploy-<feature>.bat`
4. เปิด **File Explorer** (computer-use, ขอ `request_access`) → ไปโฟลเดอร์โปรเจกต์ → **double-click ไฟล์ .bat**
   (พิมพ์ใน terminal ตรงๆ ไม่ได้เพราะ terminal เป็น tier "click") → ตรวจ output ว่า push สำเร็จ
5. Vercel build อัตโนมัติ (Linux + SWC ถูกต้อง)

**ยืนยันผล (ห้ามข้าม):**
- ใช้ Vercel MCP: `list_teams` → `list_projects` → `list_deployments` → `get_deployment`
  จนสถานะ **READY** (commit SHA ตรง)
- `web_fetch` หน้าเว็บจริง เช็คว่าข้อความ/โครงตรงดีไซน์

**เก็บ repo สะอาด — ใส่ `.gitignore`:** `redesign/` (ไฟล์ดีไซน์ต้นฉบับ), `*.zip`, `*.bat`, `.env*`

---

## 9. Gotchas (ปัญหาจริงที่เจอ + วิธีแก้)

**A. รัน `next build` ในแซนด์บ็อกซ์ Linux ไม่ได้**
SWC binary ของ Linux ไม่ได้ติดตั้ง และแซนด์บ็อกซ์เข้า `registry.npmjs.org` ไม่ได้ →
`next build` ล้มที่ขั้นโหลด SWC (ไม่ได้ถึงโค้ดจริง) ⇒ **ใช้ `tsc --noEmit` เป็น gate**
แล้วเชื่อ Vercel (Linux) เป็นตัว build จริง ยืนยันด้วยสถานะ READY

**B. ไฟล์ที่เพิ่งเขียนบน mount อาจอ่านเป็น NUL bytes**
ทำให้ `tsc` ที่รันตรงบน mount แจ้ง error แปลกๆ ⇒ **คัดลอกไป `/tmp` แล้ว strip NUL** ก่อน type-check:
```bash
rm -rf /tmp/tc && mkdir -p /tmp/tc && \
tar --exclude=node_modules --exclude=.next --exclude=.git --exclude=redesign -cf - . | (cd /tmp/tc && tar xf -) && \
cd /tmp/tc && find . -name "*.ts*" -exec sed -i 's/\x00//g' {} \; && \
ln -s <MOUNT>/node_modules node_modules && npx tsc --noEmit
```

**C. push เองจากแซนด์บ็อกซ์ไม่ได้** (สิทธิ์ `.git` + ไม่มี cred) ⇒ ใช้ `.bat` + File Explorer (ข้อ 8)

**D. `git commit` ผ่าน .bat แล้วเจอ `index.lock`** ⇒ ใส่บรรทัด `if exist ".git\index.lock" del /f ".git\index.lock"` ต้นสคริปต์

**E. Next 16 ต่างจากที่โมเดลจำ** ⇒ อ่าน `node_modules/next/dist/docs/` ก่อนใช้ API ที่ไม่ชัวร์
(เช่น `params` เป็น `Promise` ใน dynamic route: `params: Promise<{ slug: string }>` แล้ว `await`)

**F. ฟอนต์ไทย** ต้องโหลดผ่าน `next/font` ด้วย `subsets: ['thai', 'latin']` ไม่งั้นภาษาไทย (เนื้อหาหลัก) จะเป็นฟอนต์ระบบสุ่มตามเครื่องผู้อ่าน

---

## 10. Checklist สร้างเว็บใหม่

- [ ] ถามผู้ใช้: จุดประสงค์เว็บ, hosting, วิธี deploy, พฤติกรรมฟอร์ม (ถ้ามี)
- [ ] `create-next-app` (App Router + TS) หรือ copy โครงจาก repo นี้
- [ ] ตั้งฟอนต์ Inter + Noto Sans Thai Looped ผ่าน `next/font`
- [ ] วาง design tokens ใน `globals.css` (`:root`) — ปรับสี/แบรนด์ตามเว็บใหม่
- [ ] `lib/content.ts` + โครง `content/*.mdx` + `npm run new:post`
- [ ] SEO ครบ: metadata, opengraph-image, JSON-LD, sitemap, robots, feed.xml
- [ ] ฟอร์ม/ฟีเจอร์ที่ต้องต่อบริการภายนอก → server route + env secret + consent
- [ ] `.gitignore`: `redesign/ *.zip *.bat .env*`
- [ ] type-check ผ่าน (วิธี /tmp) → push ผ่าน .bat → Vercel READY → web_fetch ยืนยัน
- [ ] เขียน/อัปเดต `docs/CHANGELOG.md`

---

_อัปเดตล่าสุด: กรกฎาคม 2026 — อ้างอิงจาก kruteekidcode-blog. ถ้ามีการเปลี่ยนแปลงใหญ่ ให้แก้เอกสารนี้ด้วย_
