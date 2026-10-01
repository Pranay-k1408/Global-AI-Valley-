import React from 'react';

const PARTNERS = [
  {
    name: 'Microsoft',
    svg: (
      <svg height="18" viewBox="0 0 100 21" fill="currentColor">
        <rect x="0" y="0" width="9.8" height="9.8" />
        <rect x="11.2" y="0" width="9.8" height="9.8" />
        <rect x="0" y="11.2" width="9.8" height="9.8" />
        <rect x="11.2" y="11.2" width="9.8" height="9.8" />
        <text x="27" y="16.5" fontFamily="var(--font-sans)" fontSize="15" fontWeight="500" letterSpacing="-0.02em">Microsoft</text>
      </svg>
    )
  },
  {
    name: 'Google',
    svg: (
      <svg height="18" viewBox="0 0 80 22" fill="currentColor">
        <text x="0" y="17" fontFamily="var(--font-sans)" fontSize="18" fontWeight="500" letterSpacing="-0.02em">Google</text>
      </svg>
    )
  },
  {
    name: 'Amazon',
    svg: (
      <svg height="18" viewBox="0 0 85 24" fill="currentColor">
        <text x="0" y="16" fontFamily="var(--font-sans)" fontSize="17" fontWeight="600" letterSpacing="-0.04em">amazon</text>
        <path d="M5 21C22 26 48 24 64 18" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      </svg>
    )
  },
  {
    name: 'Meta',
    svg: (
      <svg height="18" viewBox="0 0 75 22" fill="currentColor">
        <path d="M4 11C4 7 7 4 10 4C14 4 17 9 20 13C23 9 26 4 30 4C33 4 36 7 36 11C36 15 33 18 30 18C26 18 23 13 20 9C17 13 14 18 10 18C7 18 4 15 4 11Z" fill="none" stroke="currentColor" strokeWidth="2" />
        <text x="44" y="16.5" fontFamily="var(--font-sans)" fontSize="16" fontWeight="600" letterSpacing="-0.01em">Meta</text>
      </svg>
    )
  },
  {
    name: 'NVIDIA',
    svg: (
      <svg height="16" viewBox="0 0 80 20" fill="currentColor">
        <text x="0" y="15" fontFamily="var(--font-sans)" fontSize="15" fontWeight="800" letterSpacing="0.08em">NVIDIA</text>
      </svg>
    )
  },
  {
    name: 'IBM',
    svg: (
      <svg height="16" viewBox="0 0 50 20" fill="currentColor">
        <text x="0" y="15" fontFamily="var(--font-sans)" fontSize="17" fontWeight="900" letterSpacing="0.12em">IBM</text>
      </svg>
    )
  },
  {
    name: 'Accenture',
    svg: (
      <svg height="17" viewBox="0 0 95 22" fill="currentColor">
        <text x="0" y="16" fontFamily="var(--font-sans)" fontSize="15" fontWeight="600" letterSpacing="-0.02em">accenture</text>
        <path d="M72 7L76 4L77 5.5L74 8L77 10.5L76 12L72 9Z" fill="var(--accent-ice)" />
      </svg>
    )
  },
  {
    name: 'Bosch',
    svg: (
      <svg height="18" viewBox="0 0 85 22" fill="currentColor">
        <circle cx="10" cy="11" r="8" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <rect x="7" y="6" width="6" height="10" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <text x="24" y="16.5" fontFamily="var(--font-sans)" fontSize="15" fontWeight="700" letterSpacing="0.08em">BOSCH</text>
      </svg>
    )
  }
];

export default function TrustedStrip({ style = {} }) {
  return (
    <div
      className="trusted-strip-container"
      style={{
        width: '100%',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
        backgroundColor: 'rgba(8, 11, 15, 0.75)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        padding: '1.25rem 0',
        overflow: 'hidden',
        position: 'relative',
        zIndex: 15,
        ...style
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '2.5rem',
          position: 'relative'
        }}
      >
        {/* Label with pulsating ice dot */}
        <div
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.64rem',
            fontWeight: 600,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
            whiteSpace: 'nowrap',
            display: 'flex',
            alignItems: 'center',
            gap: '9px',
            zIndex: 2,
            background: 'linear-gradient(90deg, #080B0F 80%, rgba(8, 11, 15, 0) 100%)',
            paddingRight: '1.25rem',
            flexShrink: 0
          }}
        >
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: 'var(--accent-ice)',
              boxShadow: '0 0 6px var(--accent-ice)',
              animation: 'iceDotPulse 2s infinite ease-in-out'
            }}
          />
          TRUSTED BY INNOVATORS WORLDWIDE
        </div>

        {/* Continuous Infinite Auto-Animating Marquee Track */}
        <div
          style={{
            overflow: 'hidden',
            width: '100%',
            maskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
            position: 'relative'
          }}
        >
          <div className="trusted-marquee-track">
            {/* Group 1 */}
            <div className="trusted-marquee-group">
              {PARTNERS.map((partner, idx) => (
                <div
                  key={`p1-${partner.name}-${idx}`}
                  className="partner-logo"
                  title={partner.name}
                >
                  {partner.svg}
                </div>
              ))}
            </div>
            {/* Group 2 (identical duplicate for seamless infinite loop) */}
            <div className="trusted-marquee-group" aria-hidden="true">
              {PARTNERS.map((partner, idx) => (
                <div
                  key={`p2-${partner.name}-${idx}`}
                  className="partner-logo"
                  title={partner.name}
                >
                  {partner.svg}
                </div>
              ))}
            </div>
            {/* Group 3 (ensures ultra-wide viewports never show gaps) */}
            <div className="trusted-marquee-group" aria-hidden="true">
              {PARTNERS.map((partner, idx) => (
                <div
                  key={`p3-${partner.name}-${idx}`}
                  className="partner-logo"
                  title={partner.name}
                >
                  {partner.svg}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .trusted-marquee-track {
          display: flex;
          width: max-content;
          animation: infiniteMarqueeScroll 26s linear infinite;
          will-change: transform;
        }

        .trusted-marquee-track:hover {
          animation-play-state: paused;
        }

        .trusted-marquee-group {
          display: flex;
          align-items: center;
          gap: 3.5rem;
          padding-right: 3.5rem;
          flex-shrink: 0;
        }

        .partner-logo {
          color: rgba(255, 255, 255, 0.42);
          transition: color 0.3s ease, opacity 0.3s ease, transform 0.3s ease, filter 0.3s ease;
          display: flex;
          align-items: center;
          cursor: pointer;
          flex-shrink: 0;
        }

        .partner-logo:hover {
          color: var(--accent-ice);
          transform: translateY(-2px) scale(1.06);
          filter: drop-shadow(0 0 10px rgba(140, 200, 255, 0.35));
        }

        @keyframes infiniteMarqueeScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-100% / 3));
          }
        }

        @keyframes iceDotPulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.3);
            opacity: 1;
            box-shadow: 0 0 10px var(--accent-ice);
          }
        }

        @media (max-width: 768px) {
          .trusted-strip-container .container {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
          .trusted-marquee-group {
            gap: 2.2rem;
            padding-right: 2.2rem;
          }
        }
      `}</style>
    </div>
  );
}
