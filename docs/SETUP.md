# Setup — KruTeeKidCode
อัปเดต 2026-09-16 · กติกาหลัก: [AGENTS.md](../AGENTS.md)

## เตรียมเครื่องและตรวจงาน

1. เปิด terminal ในราก repository ที่ต้องการ ตรวจ git status และ git diff ก่อนเปลี่ยนไฟล์
2. ใช้ Node.js/npm ที่เข้ากับ package.json และ Next.js ที่ติดตั้ง ตรวจ node --version และ npm --version
3. เมื่อต้องติดตั้ง ใช้ npm ci ถ้ามี lockfile ที่ตกลงใช้และตรงกับ package.json; หากต้องสร้าง/เปลี่ยน lockfile ให้ตรวจ diff แยก อย่ารวมไฟล์ค้างเข้ากับงานอื่น
4. เปิดตัวอย่างด้วย npm run dev หากเปิดสองเว็บพร้อมกัน ใช้ npm run dev -- --port 3001 กับเว็บที่สอง
5. งานโค้ดตรวจ npx tsc --noEmit, npm run lint และ npm run build ตามส่วนที่แก้ หากสิ่งแวดล้อมบล็อกให้รายงานเหตุผลจริง ห้ามสรุปว่า build ผ่านจากผลเก่า
6. งานเอกสารอย่างเดียวตรวจรายการไฟล์ diff ลิงก์และความสอดคล้อง ไม่ต้องเชื่อมต่อบริการรับเงินจริงเพื่อพิสูจน์เอกสาร

## GitHub และเผยแพร่

- ตรวจ git remote และ HEAD ของ main บน GitHub ก่อนอัปเดต ไม่ force push และไม่รวมการแก้ไขค้างนอกงาน
- stage เฉพาะชื่อไฟล์ ตรวจ staged diff หรือสร้าง commit ผ่าน connector บน base ที่ตรวจแล้ว
- เผยแพร่เมื่อมีคำอนุญาตสำหรับงานนั้นแล้วตาม AGENTS.md ไม่ต้องขอซ้ำ
- ก่อนอัปเดต main ตรวจว่าไม่มีการเปลี่ยนโค้ด/บทความปนกับงานเอกสาร; main อาจเรียก Vercel auto-deploy
- รายงาน commit จริง แยก GitHub updated ออกจาก deployment READY และจากการทดสอบหน้าเว็บ
- ไม่จำเป็นต้องใช้ .bat หากเครื่องมือ GitHub/Git ที่ได้รับอนุญาตทำได้

## ตั้งค่าบริการประกอบ

- MAILERLITE_API_KEY: ค่าลับฝั่ง server สำหรับ POST /api/subscribe
- MAILERLITE_GROUP_ID: กลุ่มรับข่าวถ้าใช้งาน
- NEXT_PUBLIC_UMAMI_WEBSITE_ID: เปิดสคริปต์ analytics เมื่อมีค่า
- NEXT_PUBLIC_UMAMI_SCRIPT_URL: URL สคริปต์; default ในโค้ดคือ https://cloud.umami.is/script.js
- เก็บค่าลับใน .env.local หรือ Vercel เท่านั้น
- หาก MailerLite ไม่มี key route ตอบ 503; ข้อความสำเร็จหน้าเว็บบอกให้ยืนยันอีเมล จึงต้องตรวจว่าเปิด double opt-in จริงก่อนรับรอง workflow
- โดเมนถูกกำหนดในหลายไฟล์ เช่น layout, sitemap, RSS, share URL และ public/llms.txt ยังไม่มี lib/site.ts แบบเว็บ Oracle

## Workflow บทความและหลักสูตร

บทความ MDX → lib/content.ts → รายการ/หน้าอ่าน → หน้าแรก, RSS, sitemap
ค้นชื่อ/คำอธิบาย/แท็กด้วย includes(); related posts จัดตามแท็ก
สร้างบทความด้วย npm run new:post <slug> "ชื่อ"; ตรวจตัวอย่างก่อนเผยแพร่
draft ซ่อนจากรายการ production แต่การเปิด slug ตรงยังเป็นงานค้าง ห้ามเก็บความลับใน draft หรือถือเป็นระบบ private
หลักสูตร MDX → /courses → /courses/[slug] → ช่องทางติดต่อ ไม่มีระบบชำระเงินหรือบัญชีผู้เรียน

อ่าน [WRITING_GUIDE.md](../WRITING_GUIDE.md) สำหรับรูปแบบ MDX และ [PROJECT_STATE.md](PROJECT_STATE.md) สำหรับรายการปรับปรุง
