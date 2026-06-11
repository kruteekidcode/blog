import { ImageResponse } from 'next/og';

export const alt = 'KruTeekidCode — Blog, Courses & More';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #e16c9e 0%, #6c9ee1 100%)',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            background: 'rgba(255, 255, 255, 0.12)',
            border: '2px solid rgba(255, 255, 255, 0.4)',
            borderRadius: 24,
            padding: '60px 90px',
          }}
        >
          <div style={{ fontSize: 84, fontWeight: 700, color: '#ffffff' }}>
            KruTeekidCode
          </div>
          <div
            style={{
              fontSize: 34,
              color: 'rgba(255, 255, 255, 0.95)',
              marginTop: 18,
            }}
          >
            Technology · Coding · Education
          </div>
        </div>
        <div
          style={{
            fontSize: 26,
            color: 'rgba(255, 255, 255, 0.9)',
            marginTop: 40,
          }}
        >
          kruteekidcode.com
        </div>
      </div>
    ),
    { ...size }
  );
}
