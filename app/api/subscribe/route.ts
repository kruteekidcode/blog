import { NextResponse } from 'next/server';

/**
 * รับสมัครรับข่าวผ่าน MailerLite API (ฝั่งเซิร์ฟเวอร์)
 *
 * ตั้งค่า Environment Variables บน Vercel:
 *   MAILERLITE_API_KEY   (จำเป็น) — API token จาก MailerLite › Integrations › API
 *   MAILERLITE_GROUP_ID  (ถ้ามี)  — ใส่ผู้สมัครลงกลุ่มที่กำหนด
 *
 * หมายเหตุ: ถ้าเปิด double opt-in ใน MailerLite ผู้สมัครจะได้อีเมลยืนยันก่อน (แนะนำ)
 */
export async function POST(request: Request) {
  let email = '';
  try {
    const body = await request.json();
    email = typeof body?.email === 'string' ? body.email.trim() : '';
  } catch {
    return NextResponse.json({ ok: false, error: 'bad_request' }, { status: 400 });
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: 'invalid_email' }, { status: 422 });
  }

  const apiKey = process.env.MAILERLITE_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ ok: false, error: 'not_configured' }, { status: 503 });
  }

  const groupId = process.env.MAILERLITE_GROUP_ID;

  try {
    const res = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        email,
        ...(groupId ? { groups: [groupId] } : {}),
      }),
    });

    // MailerLite ตอบ 200 (มีอยู่แล้ว) หรือ 201 (เพิ่มใหม่) เมื่อสำเร็จ
    if (res.ok) {
      return NextResponse.json({ ok: true });
    }

    if (res.status === 422) {
      return NextResponse.json({ ok: false, error: 'invalid_email' }, { status: 422 });
    }

    return NextResponse.json({ ok: false, error: 'provider_error' }, { status: 502 });
  } catch {
    return NextResponse.json({ ok: false, error: 'network_error' }, { status: 502 });
  }
}
