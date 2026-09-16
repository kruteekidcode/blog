# สถานะโปรเจ็กต์ — KruTeeKidCode
ตรวจจากไฟล์ในเครื่อง 2026-09-16; ไม่ใช่ผลตรวจ production
กติกา: [AGENTS.md](../AGENTS.md) · ขั้นตอน: [SETUP.md](SETUP.md)

## เป้าหมายที่ยืนยัน
ครูตี๋คิดโค้ด: สอนเด็กคิดเป็นระบบ แก้ปัญหาเป็นขั้นตอน และเขียนโค้ด โดยสื่อสารกับผู้ปกครอง

## สิ่งที่มีแล้ว
- Next.js 16.2.6, React 19.2.4, TypeScript; MDX ไม่มี CMS/ฐานข้อมูลเนื้อหา
- หน้าแรก: บทความล่าสุด 3 เรื่อง หลักสูตร 2 รายการ และรับข่าว
- /articles, /articles/[slug], /courses, /courses/[slug], /about
- Pink & Blue v3, Inter/Noto Sans Thai Looped, responsive navigation
- ค้นหาข้อความด้วย includes(), กรองแท็ก, related posts, syntax highlighting และแชร์
- metadata, BlogPosting JSON-LD, RSS, sitemap, robots และ public/llms.txt
- POST /api/subscribe ต่อ MailerLite; layout โหลด Umami เมื่อมี environment variable
- /blog และ /blog/:slug redirect 308 ไป /articles ต้องรักษาไว้
- 3 บทความ: Python สำหรับมือใหม่, AI กับการศึกษา, สร้างเว็บด้วย Next.js (ไม่ตั้ง draft)
- 2 หน้าแนะนำหลักสูตร: Python สำหรับผู้เริ่มต้น และ HTML/CSS; ยังไม่มี LMS, checkout หรือ membership

## งานลำดับถัดไป (ยังไม่ได้แก้ในงานเอกสาร)
1. แทนข้อมูลตัวอย่าง content/about.mdx ด้วยประวัติ/ช่องทางติดต่อที่เจ้าของยืนยัน
2. ทำชื่อแบรนด์และชื่อผู้สอนให้สอดคล้องกันในหน้าเว็บ metadata และ llms.txt
3. ทบทวนบทความ/หลักสูตรให้สอดคล้องกับเด็กและผู้ปกครอง ไม่ถือว่าตัวอย่างราคา ระยะเวลา หรือผลลัพธ์เป็นข้อมูลยืนยัน
4. แก้ draft guard ที่หน้า slug และ metadata พร้อมทดสอบ production; ปัจจุบันกรองเฉพาะรายการ
5. ทบทวนข้อความ 100% มือใหม่เข้าใจได้: เป็นข้อความ hardcode ไม่ใช่ผลสถิติ
6. ตรวจ MailerLite/double opt-in และ Umami บน deployment จริงเมื่อทำงานส่วนนี้
7. ทดสอบ UI/SEO/build ตามการแก้ไขครั้งถัดไป

งานชุด 2026-09-16 นี้ปรับเอกสารเท่านั้น ไม่ได้แก้รายการ backlog หรือรับรองว่าบริการภายนอกพร้อม
