/**
 * เลือกอิโมจิสำหรับการ์ดบทความที่ไม่มีรูปปก (cover image)
 * โดยดูจากแท็กของบทความ ถ้าไม่ตรงกับแท็กใดเลยจะใช้ 📝 เป็นค่าเริ่มต้น
 */
const TAG_EMOJI: Record<string, string> = {
  ai: '🤖',
  python: '🐍',
  'next.js': '⚛️',
  nextjs: '⚛️',
  react: '⚛️',
  css: '🎨',
  html: '🎨',
  scratch: '🧩',
  kids: '🧩',
  education: '💡',
  technology: '💻',
  javascript: '📜',
  beginner: '🌱',
};

export function emojiForPost(tags: string[] = []): string {
  for (const tag of tags) {
    const hit = TAG_EMOJI[tag.toLowerCase().trim()];
    if (hit) return hit;
  }
  return '📝';
}
