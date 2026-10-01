import { useState, useEffect, useRef } from 'react';

/**
 * Scroll phase boundaries (in px of scrollY within the hero)
 * The hero is 200vh tall; these are absolute scrollY values.
 */
export const SCROLL_PHASES = {
  AMBIENT:     { start: 0,   end: 15  }, // Phase 0 — globe idle
  APPROACH:    { start: 0,   end: 100 }, // Phase 1 — camera approach
  ACTIVATION:  { start: 10,  end: 180 }, // Phase 2 — network activates
  DECONSTRUCT: { start: 10,  end: 280 }, // Phase 3 — globe shatters immediately on scroll
  DISTRIBUTED: { start: 280, end: 500 }, // Phase 4 — distributed network
};

/** Map a value from one range to another, clamped. */
function mapRange(value, inMin, inMax, outMin = 0, outMax = 1) {
  const clamped = Math.min(Math.max(value, inMin), inMax);
  return outMin + ((clamped - inMin) / (inMax - inMin)) * (outMax - outMin);
}

export function useScrollAnimations() {
  const [scrollState, setScrollState] = useState({
    scrollProgress: 0,
    scrollY: 0,
    scrollVelocity: 0,
    scrollDirection: 'down',
    // Hero-phase data
    heroPhase: 0,         // 0–5 integer phase
    phaseProgress: 0,     // 0–1 progress within current phase
    approachP: 0,         // 0–1 phase-1 progress
    activationP: 0,       // 0–1 phase-2 progress
    deconstructP: 0,      // 0–1 phase-3 progress
    distributedP: 0,      // 0–1 phase-4 progress
  });

  const velocityTimerRef = useRef(null);
  const currentVelocityRef = useRef(0);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let lastTime = performance.now();
    let ticking = false;

    const computePhases = (sy) => {
      const P = SCROLL_PHASES;
      const approachP   = mapRange(sy, P.APPROACH.start,    P.APPROACH.end);
      const activationP = mapRange(sy, P.ACTIVATION.start,  P.ACTIVATION.end);
      const deconstructP= mapRange(sy, P.DECONSTRUCT.start, P.DECONSTRUCT.end);
      const distributedP= mapRange(sy, P.DISTRIBUTED.start, P.DISTRIBUTED.end);

      let heroPhase = 0;
      let phaseProgress = 0;
      if (sy < P.APPROACH.start) {
        heroPhase = 0; phaseProgress = 0;
      } else if (sy < P.APPROACH.end) {
        heroPhase = 1; phaseProgress = approachP;
      } else if (sy < P.ACTIVATION.end) {
        heroPhase = 2; phaseProgress = activationP;
      } else if (sy < P.DECONSTRUCT.end) {
        heroPhase = 3; phaseProgress = deconstructP;
      } else {
        heroPhase = 4; phaseProgress = distributedP;
      }

      return { heroPhase, phaseProgress, approachP, activationP, deconstructP, distributedP };
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScroll = window.scrollY;
          const now = performance.now();
          const dt = Math.max(now - lastTime, 16);
          const dy = currentScroll - lastScrollY;

          const instantVelocity = (Math.abs(dy) / dt) * 16;
          currentVelocityRef.current = currentVelocityRef.current * 0.7 + instantVelocity * 0.3;

          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          const progress = totalHeight > 0
            ? Math.min(Math.max((currentScroll / totalHeight) * 100, 0), 100)
            : 0;

          const phases = computePhases(currentScroll);

          setScrollState({
            scrollY: currentScroll,
            scrollProgress: progress,
            scrollVelocity: currentVelocityRef.current,
            scrollDirection: dy >= 0 ? 'down' : 'up',
            ...phases,
          });

          lastScrollY = currentScroll;
          lastTime = now;
          ticking = false;

          clearTimeout(velocityTimerRef.current);
          velocityTimerRef.current = setTimeout(() => {
            currentVelocityRef.current = 0;
            setScrollState((prev) => ({ ...prev, scrollVelocity: 0 }));
          }, 100);
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // initialise

    // IntersectionObserver for scroll-reveal elements
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -80px 0px'
      }
    );

    // Observe after a short delay so elements exist
    const observeTimer = setTimeout(() => {
      document.querySelectorAll('.scroll-reveal').forEach((el) => observer.observe(el));
    }, 200);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(velocityTimerRef.current);
      clearTimeout(observeTimer);
      observer.disconnect();
    };
  }, []);

  return scrollState;
}
