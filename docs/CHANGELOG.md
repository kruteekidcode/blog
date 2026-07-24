# 📋 บันทึกการเปลี่ยนแปลง (Changelog) — KruTeeKidCode Blog

บันทึกงานพัฒนา/ปรับปรุงเว็บไซต์ตามลำดับเวลา (ใหม่อยู่บนสุด)

---

## 2026-07 — Newsletter รับข่าวผ่าน MailerLite (`3cd1ed0`)

เพิ่มระบบสมัครรับข่าวจริง เชื่อมกับ **MailerLite** ผ่าน API route ฝั่งเซิร์ฟเวอร์

- `app/api/subscribe/route.ts` — Route Handler (POST) เรียก MailerLite API
  โดยเก็บ `MAILERLITE_API_KEY` เป็น **secret ฝั่งเซิร์ฟเวอร์** (ไม่ใช่ `NEXT_PUBLIC_*`)
  จึงไม่รั่วออกหน้าเว็บ และไม่มีปัญหา CORS
- `components/NewsletterForm.tsx` — client component ส่ง `{ email }` เป็น JSON ไปที่ `/api/subscribe`
  มีสถานะ loading / success / error เป็นภาษาไทย
- เพิ่มข้อความ **consent ตาม PDPA** ใต้ฟอร์ม ("กรอกอีเมลเพื่อรับข่าวสารความรู้เท่านั้น ยกเลิกได้ทุกเมื่อ")

**Environment Variables ที่ต้องตั้งบน Vercel:**

| ตัวแปร | จำเป็น | ความหมาย |
| :--- | :--- | :--- |
| `MAILERLITE_API_KEY` | ✅ | API token จาก MailerLite › Integrations › API |
| `MAILERLITE_GROUP_ID` | ไม่ | ใส่ผู้สมัครลงกลุ่มที่กำหนด |

> แนะนำเปิด **double opt-in** ใน MailerLite เพื่อให้มีอีเมลยืนยัน (ตรงกับข้อความ "โปรดยืนยันการสมัคร" ที่ฟอร์มแสดง)

---

## 2026-07 — Redesign หน้า Home + Blog จาก Claude Design (`18970dc`)

นำดีไซน์จาก Claude Design (ไฟล์ `.dc.html`) มา implement ลง Next.js เดิม โดยไม่แตะ routing/data model

- **Design system ใหม่ (Pink & Blue v3):** ดูรายละเอียดใน `docs/AGENT_PLAYBOOK.md`
  - Hero gradient ชมพู→ฟ้า, wave divider (SVG), profile รูปวงกลม + float animation
  - การ์ดบทความ radius 18px + emoji placeholder (`lib/emoji.ts`), แผงใหญ่ radius 26px, ปุ่ม/ป้าย pill 999px
  - Responsive แบบ fluid: ใช้ `clamp()` + `grid-template-columns: repeat(auto-fit, minmax(...))` (แทบไม่มี media query)
- **หน้า Home (`app/page.tsx`):** hero + stats + บทความล่าสุด + หลักสูตร (ธีมฟ้า) + แผง newsletter
- **หน้า Blog list (`app/blog/page.tsx` + `components/BlogList.tsx`):** hero band + ค้นหา (title/desc/tags) + ตัวกรองแท็ก (chip) แบบ live ใช้ข้อมูลโพสต์จริง
- **Navbar/Footer:** nav sticky + blur + CTA pill "อ่านบทความ" + ลิงก์ Contact, footer gradient
- ไฟล์ต้นฉบับดีไซน์ (`redesign/`, `*.zip`) และสคริปต์ช่วย (`*.bat`) ใส่ `.gitignore` ไม่ขึ้น repo

---

## 2026-06 — Pink & Blue theme v2 + ฟีเจอร์พื้นฐาน (`c299f56`)

- ฟอนต์ไทย **Noto Sans Thai Looped** ผ่าน `next/font` (ลบ `@import` ที่ render-blocking)
- **Syntax highlighting** ในบทความ (`rehype-highlight`) + ชุดสี
- **SEO:** JSON-LD Article schema, `opengraph-image.tsx` (รูป OG แบรนด์), OG รายโพสต์
- แทน `<img>` ด้วย `next/image` ทั้งเว็บ
- **RSS feed** ที่ `/feed.xml`, ระบบ **draft** (`draft: true`), ค้นหา + กรองแท็กหน้า `/blog`
- บทความที่เกี่ยวข้องจัดอันดับตามแท็กที่ตรงกัน, ป้ายข้อมูลหลักสูตร, หน้า 404 ภาษาไทย
- ตรวจสอบรูปแบบวันที่, สคริปต์ `npm run new:post`

---

## 2026-05 — เวอร์ชันแรก (`bd7a1b8`)

- Next.js 16 App Router + TypeScript, ระบบบล็อกแบบ MDX, หน้าหลักสูตร/เกี่ยวกับ
- Sitemap, robots.txt, llms.txt, วันที่แบบพุทธศักราช
- สร้าง/ออกแบบ/deploy โดย Antigravity 2.0
