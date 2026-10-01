import React, { useState, useEffect } from 'react';
import GlobeCanvas from './Globe/GlobeCanvas';
import TrustedStrip from './TrustedStrip';
import { ArrowRight, ChevronDown } from 'lucide-react';

/**
 * Hero — Cinematic Scroll Container
 *
 * The hero section is 200vh tall. The inner "sticky" pane stays fixed
 * in the viewport as the user scrolls, giving the globe all the scroll
 * room it needs to run through Phases 1-4 before the hero exits.
 *
 * Phase scroll boundaries (mirrors GlobeCanvas.jsx + useScrollAnimations.js):
 *   Phase 0  AMBIENT:     0   → 120px
 *   Phase 1  APPROACH:    120 → 300px
 *   Phase 2  ACTIVATION:  300 → 500px
 *   Phase 3  DECONSTRUCT: 500 → 800px
 *   Phase 4  DISTRIBUTED: 800 → 1100px
 *   [hero exits viewport ~1700px — 200vh at most viewport heights]
 */

const clamp = (v, lo, hi) => Math.min(Math.max(v, lo), hi);
const mapRange = (v, lo, hi, outLo = 0, outHi = 1) =>
  clamp((v - lo) / (hi - lo), 0, 1) * (outHi - outLo) + outLo;

function Hero({ onOpenContact, onNavigate }) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let wasOut = false;
    const handleScroll = () => {
      const y = window.scrollY;
      if (y < 1600) {
        wasOut = false;
        setScrollY(y);
      } else if (!wasOut) {
        wasOut = true;
        setScrollY(1600);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleExploreClick = (e) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate('#vision');
    } else {
      const el = document.querySelector('#vision');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Typography remains crisp and legible as the user scrolls naturally
  const textOpacity = 1;

  // Micro parallax per element — very subtle, purely depth-implying
  const heroParallaxY  = scrollY * -0.04;
  const subParallaxY   = scrollY * -0.025;
  const taglineParallaxY = scrollY * -0.06;

  // Scroll cue fades out after the user starts scrolling
  const scrollCueOpacity = clamp(1 - scrollY / 80, 0, 1);

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingTop: '80px',
        paddingBottom: 0,
        overflow: 'hidden',
        background: 'radial-gradient(ellipse 75% 65% at 72% 48%, #0C1116 0%, #0A0E12 35%, #080B0F 70%, #07090C 100%)'
      }}
    >
      {/* Very soft atmospheric graphite density behind globe */}
        <div
          style={{
            position: 'absolute',
            top: '12%',
            right: '4%',
            width: '680px',
            height: '680px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(16, 23, 30, 0.40) 0%, rgba(10, 14, 18, 0.15) 50%, transparent 75%)',
            filter: 'blur(75px)',
            pointerEvents: 'none',
            zIndex: 0
          }}
        />

        {/* FULL-VIEWPORT 3D CANVAS — Globe + all visual phases */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            zIndex: 1,
            overflow: 'hidden'
          }}
        >
          <GlobeCanvas />
        </div>

        {/* Foreground Typography */}
        <div
          className="container"
          style={{
            position: 'relative',
            zIndex: 5,
            display: 'grid',
            gridTemplateColumns: '1.05fr 1.15fr',
            alignItems: 'center',
            gap: '3rem',
            flex: 1,
            minHeight: 'calc(100vh - 190px)',
            pointerEvents: 'none',
            paddingTop: '1.5rem',
            paddingBottom: '2.5rem'
          }}
        >
          {/* Left content — fades gently during deconstruction */}
          <div
            className="hero-left"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              paddingRight: '1rem',
              pointerEvents: 'auto',
              // Phase-aware opacity: stable until Phase 3, then gently recedes
              opacity: textOpacity,
              // Subtle upward drift — not aggressive
              transform: `translateY(${heroParallaxY}px)`,
              transition: 'opacity 0.15s ease-out'
            }}
          >
            {/* Micro tagline */}
            <div
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.68rem',
                fontWeight: 500,
                letterSpacing: '0.24em',
                textTransform: 'uppercase',
                color: 'var(--text-secondary)',
                marginBottom: '1.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                transform: `translateY(${taglineParallaxY}px)`
              }}
            >
              <span>IDEAS</span>
              <span style={{ color: 'var(--border-subtle)' }}>/</span>
              <span>PEOPLE</span>
              <span style={{ color: 'var(--border-subtle)' }}>/</span>
              <span>TECHNOLOGY</span>
              <span style={{ color: 'var(--border-subtle)' }}>/</span>
              <span style={{ color: 'var(--accent-ice)' }}>IMPACT</span>
            </div>

            {/* H1 — minimal movement, solid anchor */}
            <h1
              style={{
                fontFamily: 'var(--font-serif-display)',
                fontSize: 'clamp(2.8rem, 5.2vw, 4.4rem)',
                fontWeight: 400,
                lineHeight: 1.04,
                letterSpacing: '0.015em',
                color: 'var(--text-primary)',
                textTransform: 'uppercase',
                marginBottom: '1.75rem',
                textShadow: '0 4px 24px rgba(7, 7, 9, 0.8)',
                transform: `translateY(${subParallaxY * 1.2}px)`
              }}
            >
              GLOBAL AI VALLEY
            </h1>

            {/* Supporting headline */}
            <h2
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(1.15rem, 1.8vw, 1.35rem)',
                fontWeight: 300,
                lineHeight: 1.45,
                letterSpacing: '-0.01em',
                color: '#d4d4dc',
                marginBottom: '1.5rem',
                maxWidth: '520px',
                textShadow: '0 2px 16px rgba(7, 7, 9, 0.8)',
                transform: `translateY(${subParallaxY}px)`
              }}
            >
              Connecting AI innovation, businesses, research and talent — globally.
            </h2>

            {/* Body copy */}
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.94rem',
                fontWeight: 300,
                lineHeight: 1.7,
                color: 'var(--text-secondary)',
                maxWidth: '480px',
                marginBottom: '2.5rem',
                textShadow: '0 2px 12px rgba(7, 7, 9, 0.8)',
                transform: `translateY(${subParallaxY * 0.6}px)`
              }}
            >
              We bring together the world's brightest minds, forward-thinking companies and cutting-edge research to build a smarter, more connected tomorrow.
            </p>

            {/* CTAs */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1.5rem'
              }}
            >
              <a
                href="#vision"
                onClick={handleExploreClick}
                className="btn-pill-primary"
              >
                <span>Explore the Valley</span>
                <ArrowRight size={15} className="arrow-icon" />
              </a>

              <button
                onClick={onOpenContact}
                className="btn-ghost"
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.88rem',
                  color: 'var(--text-secondary)',
                  letterSpacing: '0.04em'
                }}
              >
                Partner With Us
              </button>
            </div>
          </div>

          {/* Right Column — empty, globe fills it via absolute canvas */}
          <div
            className="hero-right"
            style={{
              position: 'relative',
              height: '100%',
              minHeight: '400px',
              pointerEvents: 'none'
            }}
          />
        </div>

        {/* Scroll cue — fades immediately when user starts scrolling */}
        <div
          onClick={handleExploreClick}
          style={{
            position: 'absolute',
            bottom: '76px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            opacity: scrollCueOpacity,
            transition: 'opacity 0.3s ease',
            pointerEvents: 'auto',
            cursor: 'pointer',
            zIndex: 12
          }}
          className="hero-scroll-cue"
        >
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.58rem',
              fontWeight: 600,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)'
            }}
          >
            EXPLORE ECOSYSTEM
          </span>
          <ChevronDown size={14} color="var(--accent-ice)" style={{ animation: 'floatSubtle 2s infinite ease-in-out' }} />
        </div>

        {/* Trusted strip anchored to bottom of sticky pane */}
        <TrustedStrip />

        {/* Responsive styles */}
        <style>{`
          @media (max-width: 1024px) {
            #hero .container {
              grid-template-columns: 1fr !important;
              padding-top: 2rem;
              min-height: calc(100vh - 140px) !important;
            }
            .hero-right {
              min-height: 80px !important;
            }
            .hero-left {
              padding-right: 0 !important;
            }
          }

          @media (max-width: 768px) {
            #hero {
              padding-top: 70px !important;
            }
            #hero .container {
              grid-template-columns: 1fr !important;
              gap: 1.5rem !important;
              min-height: calc(100svh - 120px) !important;
              padding-top: 1.5rem !important;
              padding-bottom: 1.5rem !important;
            }
            .hero-right {
              display: none !important;
            }
            .hero-scroll-cue {
              bottom: 40px !important;
            }
          }

          @media (max-width: 480px) {
            #hero {
              padding-top: 64px !important;
            }
            #hero .container {
              padding-top: 1rem !important;
            }
          }
        `}</style>
    </section>
  );
}

export default React.memo(Hero);
