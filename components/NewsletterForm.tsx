'use client';

import { useState, FormEvent } from 'react';

type Status = 'idle' | 'loading' | 'success' | 'error';

/**
 * ฟอร์มสมัครรับข่าว — ส่งไปที่ /api/subscribe ซึ่งต่อกับ MailerLite ฝั่งเซิร์ฟเวอร์
 * (API key เก็บเป็นความลับใน Environment Variable บน Vercel ไม่โผล่ในหน้าเว็บ)
 */
export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error');
      setMessage('กรุณากรอกอีเมลให้ถูกต้อง');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus('success');
        setMessage('ขอบคุณครับ! โปรดยืนยันการสมัครในอีเมลของคุณ');
        setEmail('');
        return;
      }

      const data = await res.json().catch(() => ({}));
      if (data?.error === 'invalid_email') {
        setStatus('error');
        setMessage('อีเมลไม่ถูกต้อง ลองใหม่อีกครั้งนะครับ');
      } else if (data?.error === 'not_configured') {
        setStatus('error');
        setMessage('ระบบรับข่าวยังไม่พร้อม (ผู้ดูแลกำลังตั้งค่า)');
      } else {
        setStatus('error');
        setMessage('สมัครไม่สำเร็จ ลองใหม่อีกครั้งนะครับ');
      }
    } catch {
      setStatus('error');
      setMessage('เชื่อมต่อไม่ได้ ลองใหม่อีกครั้งนะครับ');
    }
  }

  return (
    <form className="newsletter-form" onSubmit={handleSubmit} noValidate>
      <input
        type="email"
        className="newsletter-input"
        placeholder="อีเมลของคุณ"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        aria-label="อีเมลของคุณ"
        required
      />
      <button type="submit" className="newsletter-btn" disabled={status === 'loading'}>
        {status === 'loading' ? 'กำลังสมัคร…' : 'สมัครรับข่าว'}
      </button>
      {message ? (
        <p className={`newsletter-note ${status === 'error' ? 'error' : ''}`} role="status">
          {message}
        </p>
      ) : (
        <p className="newsletter-consent">
          กรอกอีเมลเพื่อรับข่าวสารความรู้เท่านั้น ยกเลิกได้ทุกเมื่อ
        </p>
      )}
    </form>
  );
}
