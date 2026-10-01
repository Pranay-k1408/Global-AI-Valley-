import React, { useState, useEffect, useRef } from 'react';

/**
 * LoadingScreen — 100% Synchronized Video & Progress Counter Preloader
 *
 * Direct Lockstep Architecture:
 * - Progress counter is driven directly by video.currentTime / video.duration
 * - Video playback rate is calculated so the 10.0s video completes in ~5.8s (matching 5-7s window)
 * - 0% to 100% matches the visual drawing speed of the logo in exact real-time
 * - When the video concludes its drawing stroke, progress hits 100% and initiates the smooth reveal transition
 */
export default function LoadingScreen({ onComplete, onRevealStart }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('loading'); // 'loading' | 'settling' | 'revealing'
  const videoRef = useRef(null);
  const completedRef = useRef(false);

  const startReveal = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    setProgress(100);
    setPhase('settling');

    // Notify home page to start its focus ingress
    if (onRevealStart) onRevealStart();

    // Brief settling beat (180ms) then initiate full dissolve
    setTimeout(() => {
      setPhase('revealing');
    }, 180);

    // Complete transition after veil dissolves (1150ms)
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 1150);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let animId;
    let fallbackTimer;

    // Target duration for the video animation: 5.8 seconds total
    const TARGET_DURATION = 5.8;

    const syncProgress = () => {
      if (!video) return;

      const dur = video.duration || 10;
      const cur = video.currentTime || 0;
      const ratio = Math.min(Math.max(cur / dur, 0), 1);

      const currentPct = Math.min(Math.round(ratio * 100), 100);
      setProgress(currentPct);

      if (ratio >= 0.99 || video.ended) {
        setProgress(100);
        startReveal();
        return;
      }

      animId = requestAnimationFrame(syncProgress);
    };

    const handlePlaying = () => {
      if (fallbackTimer) clearTimeout(fallbackTimer);
      cancelAnimationFrame(animId);
      animId = requestAnimationFrame(syncProgress);
    };

    const applySpeed = () => {
      const dur = video.duration || 10;
      video.playbackRate = dur / TARGET_DURATION;
    };

    video.addEventListener('loadedmetadata', applySpeed);
    video.addEventListener('canplay', applySpeed);
    video.addEventListener('playing', handlePlaying);
    video.addEventListener('ended', () => {
      setProgress(100);
      startReveal();
    });

    // Attempt autoplay immediately
    try {
      applySpeed();
      const p = video.play();
      if (p !== undefined) {
        p.then(() => {
          cancelAnimationFrame(animId);
          animId = requestAnimationFrame(syncProgress);
        }).catch(() => {});
      }
    } catch (e) {}

    // Fallback: If video decoding is delayed > 1.0s, begin smooth autonomous progression
    fallbackTimer = setTimeout(() => {
      if (!completedRef.current && progress === 0) {
        const fbStart = performance.now();
        const fbDur = TARGET_DURATION * 1000;
        const fbInterval = setInterval(() => {
          if (completedRef.current) {
            clearInterval(fbInterval);
            return;
          }
          const elapsed = performance.now() - fbStart;
          const pct = Math.min(Math.round((elapsed / fbDur) * 100), 100);
          setProgress(pct);
          if (pct >= 100) {
            clearInterval(fbInterval);
            startReveal();
          }
        }, 25);
      }
    }, 1000);

    // Hard failsafe timeout at 7.0s maximum
    const hardTimeout = setTimeout(() => {
      startReveal();
    }, 7000);

    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(fallbackTimer);
      clearTimeout(hardTimeout);
      video.removeEventListener('loadedmetadata', applySpeed);
      video.removeEventListener('canplay', applySpeed);
      video.removeEventListener('playing', handlePlaying);
    };
  }, []);

  const isRevealing = phase === 'revealing';
  const isSettling = phase === 'settling';
  const isLeaving = isSettling || isRevealing;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 999999,
        background: '#000000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: isLeaving ? 'none' : 'auto',
        opacity: isRevealing ? 0 : 1,
        transform: isRevealing ? 'scale(1.025)' : 'scale(1)',
        backdropFilter: isRevealing ? 'blur(0px)' : 'blur(20px)',
        transition: 'opacity 0.92s cubic-bezier(0.22, 1, 0.36, 1), transform 0.95s cubic-bezier(0.22, 1, 0.36, 1)'
      }}
    >
      {/* Soft Anamorphic Horizon Light Burst during Reveal */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: `translate(-50%, -50%) scaleX(${isRevealing ? 2.2 : 0.4}) scaleY(${isRevealing ? 1.4 : 0.6})`,
          width: '100%',
          maxWidth: '900px',
          height: '2px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(140, 200, 255, 0.4) 35%, #FFFFFF 50%, rgba(140, 200, 255, 0.4) 65%, transparent 100%)',
          boxShadow: '0 0 45px 12px rgba(140, 200, 255, 0.35)',
          opacity: isRevealing ? 0 : isSettling ? 0.8 : 0,
          transition: 'all 0.85s cubic-bezier(0.16, 1, 0.3, 1)',
          pointerEvents: 'none',
          zIndex: 2
        }}
      />

      {/* Motion Graphics Video Container */}
      <div
        style={{
          width: '100%',
          maxWidth: '820px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          transform: isRevealing ? 'scale(1.08) translateY(-6px)' : 'scale(1) translateY(0)',
          filter: isRevealing ? 'blur(10px)' : 'blur(0px)',
          opacity: isRevealing ? 0 : 1,
          transition: 'transform 0.85s cubic-bezier(0.16, 1, 0.3, 1), filter 0.8s ease, opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1)',
          zIndex: 1
        }}
      >
        <video
          ref={videoRef}
          src="/assets/loading-intro.mp4"
          muted
          playsInline
          autoPlay
          preload="auto"
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            outline: 'none',
            border: 'none',
            background: 'transparent',
            mixBlendMode: 'screen',
            filter: 'contrast(1.8) brightness(0.88)',
            opacity: 1
          }}
        />
      </div>

      {/* Understated Minimalist 0-100% Counter */}
      <div
        style={{
          position: 'absolute',
          bottom: '3.2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 3,
          opacity: isLeaving ? 0 : 1,
          transform: isLeaving ? 'translateY(8px)' : 'translateY(0)',
          transition: 'opacity 0.4s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.80rem',
            fontWeight: 400,
            letterSpacing: '0.22em',
            color: 'rgba(255, 255, 255, 0.45)',
            fontVariantNumeric: 'tabular-nums',
            userSelect: 'none'
          }}
        >
          {progress}%
        </span>
      </div>
    </div>
  );
}
