import { ImageResponse } from 'next/og';

// ImageResponse requires the edge runtime in Next.js 16
// The deprecation warning in build output is cosmetic — edge is still functional
export const runtime = 'edge';
export const contentType = 'image/png';
export const size = { width: 1200, height: 630 };

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#171717',
          fontFamily: 'sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background glow */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '60%',
            width: '600px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(240,120,43,0.15) 0%, transparent 70%)',
            transform: 'translate(-50%, -50%)',
          }}
        />

        {/* Logo */}
        <div
          style={{
            fontSize: '64px',
            fontWeight: '800',
            color: '#F7F5F0',
            letterSpacing: '-1px',
            marginBottom: '24px',
          }}
        >
          Next<span style={{ color: '#F0782B' }}>Gen</span>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: '28px',
            color: '#A1A1AA',
            fontWeight: '400',
            textAlign: 'center',
            maxWidth: '700px',
          }}
        >
          Modern Software Engineering × Practical AI
        </div>

        {/* Badge */}
        <div
          style={{
            marginTop: '40px',
            padding: '10px 24px',
            background: 'rgba(240,120,43,0.1)',
            border: '1px solid rgba(240,120,43,0.3)',
            borderRadius: '100px',
            color: '#F0782B',
            fontSize: '18px',
            fontWeight: '600',
          }}
        >
          nextgenagency.dev
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
