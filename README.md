# KruTeeKidCode — ครูตี๋คิดโค้ด

เอกสารหลักชุดใหม่ที่เจ้าของยืนยัน 2026-09-16 · Codex ดูแลทั้ง teeDBA.com และ KruTeeKidCode.com

เว็บความรู้เรื่องการสอนเด็กคิดเป็นระบบและ Coding สำหรับผู้ปกครอง มีบทความ หน้าแนะนำหลักสูตร และรับข่าวผ่าน MailerLite

## เริ่มอ่าน
- [กติกาของ Codex และผู้ร่วมพัฒนา](AGENTS.md)
- [Setup และ workflow](docs/SETUP.md)
- [สถานะระบบและงานค้าง](docs/PROJECT_STATE.md)
- [คู่มือเขียนเนื้อหา](WRITING_GUIDE.md)
- [ประวัติการเปลี่ยนแปลง](docs/CHANGELOG.md)

## โครงสร้าง
- app/: หน้าเว็บและ API
- components/: UI ที่ใช้ซ้ำ
- content/: บทความ MDX หลักสูตรและประวัติ
- lib/: อ่านเนื้อหาและตรรกะ
- public/: รูปและไฟล์สาธารณะ
- scripts/: ตัวช่วยสร้างบทความ

## คำสั่ง
รันในราก repo: npm run dev, npm run build, npm run start, npm run lint, npx tsc --noEmit
สร้างบทความ: npm run new:post <slug> "ชื่อบทความ"

ธีม Pink & Blue v3; ค้นหาด้วย includes(); หน้าคอร์สยังเป็นหน้าแนะนำ ไม่ใช่ LMS และ draft guard ที่หน้า slug ยังต้องแก้

การมีโค้ดไม่ได้ยืนยันสถานะ production อ่านข้อจำกัดใน PROJECT_STATE ก่อนรายงาน
