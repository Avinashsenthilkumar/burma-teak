import { ImageResponse } from 'next/og';
import { companyConfig } from '@/config/company';

export const runtime = 'edge';

const WIDTH = 1200;
const HEIGHT = 630;

/**
 * Open Graph image, generated at the edge.
 *
 * Drawn rather than photographed, so it never depends on a client photo being
 * in place — once real plantation photography exists, swap the background for
 * an <img> pointing at it and the layout still holds.
 *
 * Styles here are inline by necessity: Satori (which renders this) supports
 * only a subset of CSS and has no access to the Tailwind build.
 */
export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background: 'linear-gradient(135deg, #0B1A12 0%, #12261A 45%, #1D3B29 100%)',
          color: '#F3EDE3',
          fontFamily: 'serif',
          position: 'relative',
        }}
      >
        {/* Canopy suggestion */}
        <div
          style={{
            position: 'absolute',
            right: -140,
            top: -120,
            width: 720,
            height: 720,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(201,162,39,0.20) 0%, rgba(201,162,39,0) 68%)',
            display: 'flex',
          }}
        />

        {/* Top row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <svg width="52" height="52" viewBox="0 0 40 40" fill="none">
            <path d="M20 37V15" stroke="#C9A227" strokeWidth="1.8" strokeLinecap="round" />
            <path
              d="M20 15c0-7.2 5-12.2 12.2-13C33.3 9.2 28.8 15.8 20 15Z"
              stroke="#C9A227"
              strokeWidth="1.7"
            />
            <path
              d="M20 23c0-6-4.2-10.2-10.2-11C8.9 18.2 12.6 23.7 20 23Z"
              stroke="#C9A227"
              strokeWidth="1.7"
            />
          </svg>
          <div
            style={{
              fontSize: 22,
              letterSpacing: 8,
              textTransform: 'uppercase',
              color: 'rgba(232,223,209,0.75)',
              fontFamily: 'sans-serif',
              display: 'flex',
            }}
          >
            Burma Teak Plant
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 86, lineHeight: 1.02, display: 'flex' }}>Rooted in nature.</div>
          <div style={{ fontSize: 86, lineHeight: 1.02, display: 'flex', color: '#E3C76A' }}>
            Built for generations.
          </div>
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            borderTop: '1px solid rgba(243,237,227,0.18)',
            paddingTop: 28,
            fontFamily: 'sans-serif',
          }}
        >
          <div style={{ fontSize: 26, color: 'rgba(232,223,209,0.8)', display: 'flex' }}>
            Premium teak cultivation · {companyConfig.address.city}, {companyConfig.address.state}
          </div>
          <div style={{ fontSize: 22, color: 'rgba(232,223,209,0.5)', display: 'flex' }}>
            burmateakplant.com
          </div>
        </div>
      </div>
    ),
    { width: WIDTH, height: HEIGHT },
  );
}
