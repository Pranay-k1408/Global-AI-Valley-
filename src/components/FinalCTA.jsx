import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, Mail, Check, Copy } from 'lucide-react';

/* =========================================================================
   Full-Banner Kinetic Canvas: Continuous Fiber-Optic Streams & Photon Pulses
   Traversing seamlessly through the entire contact section
   ========================================================================= */
function FullBannerNexusCanvas({ mousePos, isHovered }) {
  const canvasRef = useRef(null);
  const mouseRef = useRef(mousePos);

  useEffect(() => {
    mouseRef.current = mousePos;
  }, [mousePos]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let isVisible = true;
    let time = 0;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    let width = canvas.parentElement.clientWidth;
    let height = canvas.parentElement.clientHeight || 450;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);

    // 5 multi-frequency streamlines traversing the entire banner
    const streamLines = [
      { baseRatio: 0.28, freq: 0.0022, speed: 1.1, amp: 26, color: 'rgba(140, 200, 255, 0.28)' },
      { baseRatio: 0.44, freq: 0.0018, speed: 0.85, amp: 32, color: 'rgba(103, 183, 240, 0.24)' },
      { baseRatio: 0.58, freq: 0.0026, speed: 1.3, amp: 22, color: 'rgba(155, 190, 210, 0.26)' },
      { baseRatio: 0.72, freq: 0.0019, speed: 0.95, amp: 28, color: 'rgba(95, 141, 170, 0.22)' },
      { baseRatio: 0.86, freq: 0.0024, speed: 1.15, amp: 20, color: 'rgba(140, 200, 255, 0.18)' }
    ];

    // High-velocity traveling photon pulses that glide through the streamlines
    const photons = [
      { lineIdx: 0, progress: 0.1, speed: 0.0035, size: 2.8 },
      { lineIdx: 0, progress: 0.65, speed: 0.0038, size: 2.2 },
      { lineIdx: 1, progress: 0.35, speed: 0.0028, size: 3.2 },
      { lineIdx: 1, progress: 0.85, speed: 0.0032, size: 2.5 },
      { lineIdx: 2, progress: 0.05, speed: 0.0042, size: 2.6 },
      { lineIdx: 2, progress: 0.55, speed: 0.0036, size: 3.0 },
      { lineIdx: 3, progress: 0.25, speed: 0.0030, size: 2.4 },
      { lineIdx: 3, progress: 0.75, speed: 0.0034, size: 2.8 },
      { lineIdx: 4, progress: 0.45, speed: 0.0039, size: 2.2 }
    ];

    const getLineY = (x, line, t) => {
      const baseY = height * line.baseRatio;
      const wave1 = Math.sin(x * line.freq + t * line.speed) * line.amp;
      const wave2 = Math.cos(x * (line.freq * 1.6) - t * 0.7) * (line.amp * 0.45);

      // Interactive mouse attraction bend
      let mousePull = 0;
      if (mouseRef.current?.active && typeof mouseRef.current.x === 'number') {
        const dx = mouseRef.current.x - x;
        const dy = mouseRef.current.y - baseY;
        const dist = Math.hypot(dx, dy);
        const radius = width * 0.22;
        if (dist < radius && radius > 0) {
          const factor = Math.cos((dist / radius) * (Math.PI / 2));
          mousePull = dy * factor * 0.35;
        }
      }

      return baseY + wave1 + wave2 + mousePull;
    };

    const render = () => {
      if (!isVisible) return;
      time += 0.016;
      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      // 1. Draw traversing streamlines
      streamLines.forEach((line) => {
        ctx.beginPath();
        const steps = 70;
        for (let s = 0; s <= steps; s++) {
          const x = (s / steps) * width;
          const y = getLineY(x, line, time);
          if (s === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = line.color;
        ctx.lineWidth = 1.0;
        ctx.stroke();
      });

      // 2. Draw high-speed traveling photon pulses with gradient light tails
      photons.forEach((p) => {
        p.progress = (p.progress + p.speed) % 1;
        const line = streamLines[p.lineIdx];
        const px = p.progress * width;
        const py = getLineY(px, line, time);

        // Trailing light tail
        const tailLen = 45;
        const tailGrad = ctx.createLinearGradient(px - tailLen, py, px, py);
        tailGrad.addColorStop(0, 'transparent');
        tailGrad.addColorStop(0.7, 'rgba(140, 200, 255, 0.25)');
        tailGrad.addColorStop(1, '#C8E2EF');

        ctx.beginPath();
        ctx.moveTo(Math.max(px - tailLen, 0), getLineY(Math.max(px - tailLen, 0), line, time));
        ctx.lineTo(px, py);
        ctx.strokeStyle = tailGrad;
        ctx.lineWidth = 1.8;
        ctx.stroke();

        // Photon bead core & glow
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.shadowColor = '#8CC8FF';
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // 3. Interactive Cursor Ambient Halo
      if (mouseRef.current?.active && typeof mouseRef.current.x === 'number') {
        try {
          const rad = ctx.createRadialGradient(
            mouseRef.current.x, mouseRef.current.y, 0,
            mouseRef.current.x, mouseRef.current.y, 160
          );
          rad.addColorStop(0, 'rgba(140, 200, 255, 0.08)');
          rad.addColorStop(1, 'transparent');
          ctx.fillStyle = rad;
          ctx.beginPath();
          ctx.arc(mouseRef.current.x, mouseRef.current.y, 160, 0, Math.PI * 2);
          ctx.fill();
        } catch (e) {}
      }

      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    render();

    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting;
        if (inView && !isVisible) {
          isVisible = true;
          cancelAnimationFrame(animId);
          animId = requestAnimationFrame(render);
        } else if (!inView && isVisible) {
          isVisible = false;
          cancelAnimationFrame(animId);
        }
      },
      { rootMargin: '200px' }
    );
    observer.observe(canvas);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.parentElement.clientWidth;
      height = canvas.parentElement.clientHeight || 450;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 2
      }}
    />
  );
}

/* =========================================================================
   FinalCTA — Monolithic, Card-Free Masterpiece with Fluid Light Streams
   ========================================================================= */
function FinalCTA({ onOpenContact }) {
  const [copied, setCopied] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, active: false });
  const isHovered = mousePos.active;
  const containerRef = useRef(null);
  const email = 'contact@globalaivalley.com';

  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true
    });
  };

  const handleMouseLeave = () => {
    setMousePos((prev) => ({ ...prev, active: false }));
  };

  return (
    <section
      id="contact"
      style={{
        paddingTop: 'calc(var(--section-spacing) * 0.75)',
        paddingBottom: 'calc(var(--section-spacing) * 0.95)',
        position: 'relative',
        background: 'linear-gradient(180deg, #07090C 0%, #080B0F 50%, #05070A 100%)',
        overflow: 'hidden'
      }}
    >
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Monolithic Master Showcase (NO CARDS — Fluid Light Streams Passing Through) */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="contact-panoramic-stage"
          style={{
            position: 'relative',
            borderRadius: '8px',
            border: '1px solid rgba(150, 170, 185, 0.18)',
            backgroundColor: '#080B0F',
            overflow: 'hidden',
            display: 'grid',
            gridTemplateColumns: '1.2fr 0.8fr',
            minHeight: '440px',
            boxShadow: '0 28px 70px rgba(0, 0, 0, 0.75), 0 0 50px rgba(140, 200, 255, 0.05)',
            transition: 'border-color 0.45s ease, box-shadow 0.45s ease'
          }}
        >
          {/* Animated Traveling Light Beam Sweeping Horizontally Through the Entire Section */}
          <div
            className="horizontal-ambient-beam"
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              zIndex: 1
            }}
          />

          {/* Full-Banner Kinetic Canvas: Flowing Streams, Traveling Photons & Interactive Ripple */}
          <FullBannerNexusCanvas mousePos={mousePos} isHovered={isHovered} />

          {/* Top Filament Accent Line */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '2px',
              background: 'linear-gradient(90deg, transparent 0%, #8CC8FF 30%, #67B7F0 60%, transparent 100%)',
              boxShadow: '0 0 14px rgba(140, 200, 255, 0.8)',
              zIndex: 4
            }}
          />

          {/* Left Column: Living Typography & Direct Invitation */}
          <div
            style={{
              padding: 'clamp(2.5rem, 4.5vw, 3.8rem)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              zIndex: 3,
              position: 'relative'
            }}
          >
            <div>
              {/* Indicator Bar & Active Corridor Tag */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.8rem' }}>
                <div
                  style={{
                    width: '32px',
                    height: '2px',
                    backgroundColor: '#8CC8FF',
                    boxShadow: '0 0 10px rgba(140, 200, 255, 0.9)'
                  }}
                />
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.68rem',
                    fontWeight: 600,
                    letterSpacing: '0.20em',
                    color: '#8A99A8',
                    textTransform: 'uppercase'
                  }}
                >
                  04 // GLOBAL AI VALLEY CAMPUS · HEADQUARTERS & COLLABORATION
                </span>
              </div>

              {/* Main Headline with Living Liquid Metal Sheen Passing Through */}
              <h2
                className="serif-title living-headline"
                style={{
                  fontSize: 'clamp(2.2rem, 3.6vw, 3.1rem)',
                  lineHeight: 1.12,
                  marginBottom: '0.8rem',
                  fontWeight: 400,
                  letterSpacing: '-0.01em'
                }}
              >
                Be part of the AI ecosystem.
              </h2>

              {/* Subtitle & Mission Statement */}
              <div
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.94rem',
                  fontWeight: 500,
                  color: 'var(--accent-ice)',
                  letterSpacing: '0.04em',
                  marginBottom: '0.85rem'
                }}
              >
                Collaborate. Build. Grow.
              </div>

              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.88rem',
                  lineHeight: 1.65,
                  color: 'var(--text-secondary)',
                  fontWeight: 300,
                  maxWidth: '520px',
                  marginBottom: '2.4rem'
                }}
              >
                Connecting research laboratories, foundational enterprises, and sovereign computing infrastructure across our unified global corridor.
              </p>
            </div>

            {/* Bottom Actions Row: CTA Button + 1-Click Copy Email + Real-Time Nodes */}
            <div>
              <div
                className="contact-cta-row"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '1.25rem',
                  marginBottom: '1.8rem'
                }}
              >
                {/* Primary Pill CTA with Magnetic Hover */}
                <button
                  type="button"
                  onClick={() => onOpenContact && onOpenContact()}
                  className="btn-pill-primary contact-cta-btn"
                  style={{
                    padding: '0.92rem 2.5rem',
                    fontSize: '0.88rem'
                  }}
                >
                  <span>Contact Us</span>
                  <ArrowRight size={15} className="arrow-icon" />
                </button>

                {/* Email with 1-Click Copy & Visual Feedback */}
                <button
                  onClick={handleCopy}
                  title="Click to copy email address"
                  className="contact-email-btn"
                  style={{
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(150, 170, 185, 0.18)',
                    borderRadius: '999px',
                    padding: '0.78rem 1.35rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '9px',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.82rem',
                    transition: 'all 0.25s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(140, 200, 255, 0.45)';
                    e.currentTarget.style.backgroundColor = 'rgba(140, 200, 255, 0.08)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(150, 170, 185, 0.18)';
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.04)';
                  }}
                >
                  <Mail size={13} style={{ color: '#8CC8FF' }} />
                  <span>{email}</span>
                  {copied ? (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '3px', color: '#8CC8FF', fontSize: '0.72rem', fontWeight: 600 }}>
                      <Check size={11} /> Copied
                    </span>
                  ) : (
                    <Copy size={11} style={{ color: '#6F7D89' }} />
                  )}
                </button>
              </div>


            </div>
          </div>

          {/* Right Column: Panoramic Nocturnal Campus Visual */}
          <div
            className="contact-artwork-viewport"
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              minHeight: '380px',
              overflow: 'hidden',
              borderLeft: '1px solid rgba(150, 170, 185, 0.14)'
            }}
          >
            {/* High-Resolution Nocturnal Valley Architectural Visual */}
            <img
              src="/assets/contact-valley.jpg"
              alt="Global AI Valley Nocturnal Intelligence Hub"
              loading="lazy"
              decoding="async"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center 40%',
                filter: 'brightness(0.92) contrast(1.06)',
                transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                transition: 'transform 1.4s cubic-bezier(0.16, 1, 0.3, 1), filter 0.6s ease'
              }}
            />

            {/* Seamless Dark Vignette Blending into Canvas & Layout */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(90deg, #080B0F 0%, rgba(8, 11, 15, 0.60) 25%, rgba(8, 11, 15, 0.15) 60%, rgba(8, 11, 15, 0.75) 100%), linear-gradient(180deg, rgba(8, 11, 15, 0.45) 0%, transparent 40%, rgba(8, 11, 15, 0.8) 100%)',
                pointerEvents: 'none',
                zIndex: 1
              }}
            />

            {/* Atmospheric Skyward Light Beam Accents */}
            <div
              className="skyward-beam-overlay"
              style={{
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
                zIndex: 2
              }}
            />

          </div>
        </div>
      </div>

      {/* Cinematic Animation Keyframes & Styling */}
      <style>{`
        /* Living Liquid Metal Headline Sheen */
        .living-headline {
          background: linear-gradient(90deg, #D9DEE3 0%, #FFFFFF 35%, #8CC8FF 50%, #FFFFFF 65%, #D9DEE3 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: textSheenSweep 6s ease-in-out infinite;
        }

        @keyframes textSheenSweep {
          0% {
            background-position: -120% 0;
          }
          50% {
            background-position: 120% 0;
          }
          100% {
            background-position: -120% 0;
          }
        }

        /* Continuous Ambient Light Beam Traversing Through the Banner */
        .horizontal-ambient-beam {
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(140, 200, 255, 0.03) 30%,
            rgba(200, 226, 239, 0.09) 50%,
            rgba(140, 200, 255, 0.03) 70%,
            transparent 100%
          );
          background-size: 200% 100%;
          animation: beamPassThrough 7s ease-in-out infinite;
        }

        @keyframes beamPassThrough {
          0% {
            background-position: -150% 0;
          }
          50% {
            background-position: 150% 0;
          }
          100% {
            background-position: -150% 0;
          }
        }



        .contact-panoramic-stage:hover {
          border-color: rgba(140, 200, 255, 0.38) !important;
          box-shadow: 0 32px 80px rgba(0, 0, 0, 0.8), 0 0 60px rgba(140, 200, 255, 0.08) !important;
        }

        @media (max-width: 960px) {
          .contact-panoramic-stage {
            grid-template-columns: 1fr !important;
          }
          .contact-artwork-viewport {
            height: 280px !important;
            border-left: none !important;
            border-top: 1px solid rgba(150, 170, 185, 0.14) !important;
            min-height: unset !important;
          }
        }

        @media (max-width: 640px) {
          .contact-panoramic-stage {
            border-radius: 6px !important;
          }
          /* Email button: allow text to shrink */
          .contact-email-btn span {
            font-size: 0.72rem !important;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            max-width: 180px;
          }
          .contact-artwork-viewport {
            height: 220px !important;
          }
        }

        @media (max-width: 480px) {
          /* Stack CTA buttons vertically */
          .contact-cta-row {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
          .contact-cta-btn {
            width: 100% !important;
            justify-content: center !important;
          }
        }
      `}</style>
    </section>
  );
}

export default React.memo(FinalCTA);
