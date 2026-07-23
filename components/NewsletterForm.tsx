'use client';

import { useState, FormEvent } from 'react';

type Status = 'idle' | 'loading' | 'success' | 'error';

/**
 * Newsletter subscribe form.
 *
 * ตั้งค่า endpoint ของบริการอีเมลผ่าน env `NEXT_PUBLIC_NEWSLETTER_ENDPOINT`
 * (เช่น URL ฟอร์มของ Buttondown / Mailchimp / Google Form).
 * ฟอร์มจะ POST ค่า `email` ไปยัง endpoint นั้นด้วย fetch.
 * ถ้ายังไม่ตั้งค่า จะแสดงข้อความว่ายังไม่ได้เชื่อมต่อบริการ (กันไม่ให้เก็บ email ลอยๆ)
 */
export default function NewsletterForm() {
  const endpoint = process.env.NEXT_PUBLIC_NEWSLETTER_ENDPOINT;

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

    if (!endpoint) {
      setStatus('error');
      setMessage('ยังไม่ได้เชื่อมต่อบริการรับข่าว (ผู้ดูแลตั้งค่า NEXT_PUBLIC_NEWSLETTER_ENDPOINT)');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      const body = new FormData();
      body.append('email', email);

      const res = await fetch(endpoint, {
        method: 'POST',
        body,
        headers: { Accept: 'application/json' },
      });

      if (res.ok) {
        setStatus('success');
        setMessage('ขอบคุณครับ! ยืนยันการสมัครในอีเมลของคุณได้เลย');
        setEmail('');
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
      {message && (
        <p className={`newsletter-note ${status === 'error' ? 'error' : ''}`} role="status">
          {message}
        </p>
      )}
    </form>
  );
}
