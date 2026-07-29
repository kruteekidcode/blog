import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * URL ของบทความเปลี่ยนจาก /blog เป็น /articles (ก.ค. 2026)
   * เพื่อให้ตรงกับเว็บพี่น้อง teedba.com
   *
   * redirect ถาวร (308) เพื่อไม่ให้ลิงก์เก่าที่คนแชร์ไว้หรือ Google เก็บไว้กลายเป็น 404
   * ⚠️ อย่าลบออก แม้จะผ่านไปนานแล้ว — ลิงก์เก่าอยู่ในโลกอินเทอร์เน็ตตลอดไป
   */
  async redirects() {
    return [
      { source: "/blog", destination: "/articles", permanent: true },
      { source: "/blog/:slug", destination: "/articles/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
