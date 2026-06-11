import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="blog-page" style={{ textAlign: 'center' }}>
      <div className="blog-page-header">
        <h1 className="blog-page-title">404</h1>
      </div>
      <div className="blog-page-empty">
        <p>ไม่พบหน้าที่คุณกำลังมองหา — อาจถูกย้ายหรือลบไปแล้วครับ</p>
        <div style={{ marginTop: 'var(--space-lg)', display: 'flex', gap: 'var(--space-md)', justifyContent: 'center' }}>
          <Link href="/" className="btn-primary">
            กลับหน้าแรก
          </Link>
          <Link href="/blog" className="btn-outline">
            ดูบทความทั้งหมด
          </Link>
        </div>
      </div>
    </div>
  );
}
