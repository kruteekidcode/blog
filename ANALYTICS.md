# Analytics — KruTeeKidCode
อัปเดต 2026-09-16 · [กติกาหลัก](AGENTS.md)

app/layout.tsx รองรับ Umami เมื่อมี NEXT_PUBLIC_UMAMI_WEBSITE_ID
NEXT_PUBLIC_UMAMI_SCRIPT_URL กำหนด URL สคริปต์; ค่าเริ่มต้นคือ https://cloud.umami.is/script.js
ตรวจค่าที่ deployment และ dashboard จริงก่อนบอกว่ามีการเก็บสถิติแล้ว
ดู visitors, pageviews, referrers, pages และอุปกรณ์ตามช่วงเวลา เพื่อประเมินเนื้อหาที่ผู้ปกครองสนใจ
จำนวนการเปิดหน้าไม่ใช่หลักฐานว่าอ่านจบหรือเรียนรู้สำเร็จ ห้ามแต่งสถิติหรือรับรองความเข้าใจจากตัวเลขนี้
การใช้ analytics ไม่ทำให้รับรองการปฏิบัติตาม PDPA/GDPR โดยอัตโนมัติ ต้องพิจารณาการตั้งค่าและข้อมูลที่เก็บจริง
การตั้งค่าและเผยแพร่ดู [SETUP.md](docs/SETUP.md)
