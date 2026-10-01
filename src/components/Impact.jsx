import React, { useRef, useEffect, useState, useCallback } from 'react';
import { 
  Sparkles, 
  Users, 
  Activity, 
  ShieldCheck, 
  Globe2, 
  Award
} from 'lucide-react';

/* =========================================================================
   GLOBAL AI VALLEY — 03 // GLOBAL IMPACT
   Architectural Harmonization with Project Design System:
   - Palette: Deep Graphite (#080B0F / #0A0E12 / #0C1116), Steel Blue (#5F8DAA / #9BBED2),
     Restrained Ice Blue (#8CC8FF ≤ 5%), and Soft Silver (#D9DEE3 / #AEB7C0 / #87929D)
   - Layout: Standard editorial chapter header, serif headline, and .editorial-panel-card styling
   - Structure: Exactly 5 impact cards, each mounted on its personal rotatory ring pedestal
   - Milky Way Stream: Smooth celestial filament & cosmic dust connecting the 5 ring pedestals
   - Motion: Continuous unstoppable slow-motion rotation with horizontal drag & stepper controls
   ========================================================================= */

const FIVE_IMPACT_CARDS = [
  {
    id: 'research',
    tag: 'OPEN-ACCESS CONSORTIUM',
    chapter: '01',
    shortTitle: 'Frontier Research',
    title: 'Frontier Research & Discovery',
    tagline: 'Shrinking multi-year molecular & climate trials down to days',
    icon: Sparkles,
    statNum: '94+',
    statLabel: 'Architectures Released',
    impactHighlight: '12x faster discovery cycles across 42 global laboratories.',
    description: 'Uniting CERN, ETH, and Stanford researchers to develop autonomous theorem provers, molecular folding engines, and planetary climate models without commercial enclosure.',
    metrics: [
      { val: '12x', label: 'Cycle Speed' },
      { val: '14', label: 'Superclusters' },
      { val: '100%', label: 'Open Weights' }
    ]
  },
  {
    id: 'talent',
    tag: 'SOVEREIGN TALENT PIPELINE',
    chapter: '02',
    shortTitle: 'Sovereign Talent',
    title: 'Sovereign Talent & Inclusion',
    tagline: 'Direct supercluster compute for emerging global researchers',
    icon: Users,
    statNum: '1,200+',
    statLabel: 'Resident Fellows',
    impactHighlight: 'Democratizing frontier AI compute across 38 emerging nations.',
    description: 'Empowering resident fellows across Latin America, Africa, and Southeast Asia with uncapped H100/B200 GPU compute grants and guaranteed 100% retention of local intellectual property.',
    metrics: [
      { val: '38', label: 'Nations' },
      { val: '$120M+', label: 'Compute Grant' },
      { val: '100%', label: 'Local IP' }
    ]
  },
  {
    id: 'healthcare',
    tag: 'EDGE CLINICAL INTELLIGENCE',
    chapter: '03',
    shortTitle: 'Precision Health',
    title: 'Precision Healthcare Access',
    tagline: 'Edge diagnostic intelligence in underserved regional clinics',
    icon: Activity,
    statNum: '14.2M',
    statLabel: 'Screenings Verified',
    impactHighlight: '99.4% diagnostic concordance in low-latency oncology detection.',
    description: 'Deploying compressed multimodal clinical models to remote community clinics, providing early-stage detection for rare genomics and oncological diagnostics where specialist care is unavailable.',
    metrics: [
      { val: '99.4%', label: 'Concordance' },
      { val: '180+', label: 'Hospitals' },
      { val: '<15ms', label: 'Edge Latency' }
    ]
  },
  {
    id: 'policy',
    tag: 'MULTILATERAL GOVERNANCE',
    chapter: '04',
    shortTitle: 'Sovereign Treaties',
    title: 'Sovereign Treaties & Ethics',
    tagline: 'Harmonized safety benchmarks and multilateral accords',
    icon: ShieldCheck,
    statNum: '18',
    statLabel: 'Accords Drafted',
    impactHighlight: 'Harmonized international AI safety frameworks with zero vendor lock-in.',
    description: 'Architecting neutral, treaty-level safety auditing rails and transparent open-weight benchmarks adopted by national governments to preserve technological sovereignty while enabling global cooperation.',
    metrics: [
      { val: 'OECD', label: 'Compliance' },
      { val: '0%', label: 'Vendor Lock' },
      { val: '18', label: 'Treaties' }
    ]
  },
  {
    id: 'sustainability',
    tag: 'PLANETARY INTEGRITY',
    chapter: '05',
    shortTitle: 'Climate Superclusters',
    title: 'Climate & Green Superclusters',
    tagline: 'Zero-emission compute and real-time biosphere carbon flux telemetry',
    icon: Globe2,
    statNum: '4.2M',
    statLabel: 'Tons CO₂ Monitored',
    impactHighlight: '68% energy efficiency gains via thermal heat recapture grids.',
    description: 'Operating net-zero geothermal superclusters while running satellite-guided carbon sequestration models across tropical rainforests and municipal power grids to optimize real-time energy dispatch.',
    metrics: [
      { val: '68%', label: 'Efficiency' },
      { val: '100%', label: 'Clean Grid' },
      { val: '24/7', label: 'Telemetry' }
    ]
  }
];

/* =========================================================================
   Milky Way Galaxy Stream Canvas
   - Smooth Catmull-Rom closed loop connecting all 5 pedestal stations
   - Palette strictly conforms to:
     - Cosmic nebula dust: rgba(95, 141, 170, 0.06)
     - Stellar ribbon: rgba(174, 183, 192, 0.16)
     - Core spine: rgba(217, 222, 227, 0.45)
     - Stardust particles: rgba(217, 222, 227, alpha) & rgba(140, 200, 255, alpha)
   ========================================================================= */
function MilkyWayGalaxyCanvas({ stations, width, height }) {
  const canvasRef = useRef(null);
  const starsRef = useRef([]);

  useEffect(() => {
    const stars = [];
    for (let i = 0; i < 65; i++) {
      stars.push({
        t: Math.random(),
        speed: 0.0005 + Math.random() * 0.0009,
        offset: (Math.random() - 0.5) * 26,
        size: 0.6 + Math.random() * 1.5,
        baseAlpha: 0.2 + Math.random() * 0.5,
        twinkleSpeed: 0.8 + Math.random() * 2.2,
        isIceTint: Math.random() > 0.65
      });
    }
    starsRef.current = stars;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let time = 0;
    let isVisible = true;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const render = () => {
      if (!isVisible) return;
      time += 0.016;
      ctx.clearRect(0, 0, width, height);

      if (!stations || stations.length < 5) {
        animId = requestAnimationFrame(render);
        return;
      }

      const cx = width / 2;
      const cy = height / 2 + 130;
      const pts = stations.map(s => ({
        x: s.x + cx,
        y: s.y + cy
      }));

      const n = pts.length;
      const getPointOnLoop = (progress) => {
        const p = (progress % 1 + 1) % 1;
        const totalSegments = n;
        const segProgress = p * totalSegments;
        const idx = Math.floor(segProgress);
        const u = segProgress - idx;

        const p0 = pts[(idx - 1 + n) % n];
        const p1 = pts[idx % n];
        const p2 = pts[(idx + 1) % n];
        const p3 = pts[(idx + 2) % n];

        const u2 = u * u;
        const u3 = u2 * u;

        const x = 0.5 * (
          (2 * p1.x) +
          (-p0.x + p2.x) * u +
          (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * u2 +
          (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * u3
        );

        const y = 0.5 * (
          (2 * p1.y) +
          (-p0.y + p2.y) * u +
          (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * u2 +
          (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * u3
        );

        const tx = 0.5 * (
          (-p0.x + p2.x) +
          (4 * p0.x - 10 * p1.x + 8 * p2.x - 2 * p3.x) * u +
          (-3 * p0.x + 9 * p1.x - 9 * p2.x + 3 * p3.x) * u2
        );
        const ty = 0.5 * (
          (-p0.y + p2.y) +
          (4 * p0.y - 10 * p1.y + 8 * p2.y - 2 * p3.y) * u +
          (-3 * p0.y + 9 * p1.y - 9 * p2.y + 3 * p3.y) * u2
        );
        const len = Math.hypot(tx, ty) || 1;
        const nx = -ty / len;
        const ny = tx / len;

        return { x, y, nx, ny };
      };

      // ── 1. Soft Cosmic Dust Haze (Restrained Steel-Blue / Graphite) ──
      ctx.save();
      ctx.beginPath();
      const samples = 120;
      for (let i = 0; i <= samples; i++) {
        const pt = getPointOnLoop(i / samples);
        if (i === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      }
      ctx.closePath();
      ctx.strokeStyle = 'rgba(95, 141, 170, 0.07)';
      ctx.lineWidth = 22;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.shadowColor = 'rgba(95, 141, 170, 0.25)';
      ctx.shadowBlur = 14;
      ctx.stroke();

      // ── 2. Mid Stellar Stream (Metallic Graphite-Silver Ribbon) ──
      ctx.beginPath();
      for (let i = 0; i <= samples; i++) {
        const pt = getPointOnLoop(i / samples);
        if (i === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      }
      ctx.closePath();
      ctx.strokeStyle = 'rgba(174, 183, 192, 0.16)';
      ctx.lineWidth = 4;
      ctx.shadowBlur = 0;
      ctx.stroke();

      // ── 3. Luminous Filament Thread (Silver Primary & Gentle Ice Core) ──
      ctx.beginPath();
      for (let i = 0; i <= samples; i++) {
        const pt = getPointOnLoop(i / samples);
        if (i === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      }
      ctx.closePath();
      ctx.strokeStyle = 'rgba(217, 222, 227, 0.45)';
      ctx.lineWidth = 1.0;
      ctx.shadowColor = 'rgba(140, 200, 255, 0.5)';
      ctx.shadowBlur = 5;
      ctx.stroke();
      ctx.restore();

      // ── 4. Floating Cosmic Stardust Particles in Silver & Soft Steel ──
      starsRef.current.forEach((star) => {
        star.t = (star.t + star.speed) % 1;
        const pos = getPointOnLoop(star.t);
        const px = pos.x + pos.nx * star.offset;
        const py = pos.y + pos.ny * star.offset;

        const twinkle = Math.sin(time * star.twinkleSpeed + star.t * 6) * 0.3 + 0.7;
        const alpha = star.baseAlpha * twinkle;

        ctx.beginPath();
        ctx.arc(px, py, star.size, 0, Math.PI * 2);
        ctx.fillStyle = star.isIceTint 
          ? `rgba(140, 200, 255, ${alpha * 0.85})` 
          : `rgba(217, 222, 227, ${alpha})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    const observer = new IntersectionObserver(([entry]) => {
      const visible = entry.isIntersecting;
      if (visible && !isVisible) {
        isVisible = true;
        animId = requestAnimationFrame(render);
      } else {
        isVisible = visible;
      }
    }, { rootMargin: '200px' });
    observer.observe(canvas);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animId);
    };
  }, [stations, width, height]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1
      }}
    />
  );
}

/* =========================================================================
   Natural Glowing Ring Stand (Recreating the User Reference Image)
   - Harmonized in Project Tones: Deep Graphite (#080B0F / #0A0E12),
     Steel Blue (#5F8DAA / #9BBED2), Soft Silver (#D9DEE3), and subtle Ice Blue (#8CC8FF)
   - Silky concentric orbital tracks with varying opacity & natural rotational streaks
   - Diamond starlight focal nodes with delicate diffraction rays
   - Smooth floor ambient pool blending seamlessly into the section background
   ========================================================================= */
function NaturalGlowingRingStand({ isFocal, isMobile }) {
  const ringWidth = isMobile ? 290 : 360;
  const ringHeight = isMobile ? 95 : 120;

  return (
    <div
      style={{
        position: 'relative',
        width: `${ringWidth}px`,
        height: `${ringHeight}px`,
        margin: '0 auto',
        marginTop: '-24px',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1
      }}
    >
      {/* 1. Deep Graphite & Soft Steel-Blue Ambient Floor Pool */}
      <div
        style={{
          position: 'absolute',
          top: '52%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '88%',
          height: '58%',
          borderRadius: '50%',
          background: isFocal 
            ? 'radial-gradient(ellipse at center, rgba(95, 141, 170, 0.18) 0%, rgba(10, 14, 18, 0.45) 55%, transparent 75%)' 
            : 'radial-gradient(ellipse at center, rgba(60, 72, 83, 0.12) 0%, rgba(8, 11, 15, 0.35) 55%, transparent 70%)',
          filter: 'blur(18px)',
          zIndex: 0
        }}
      />

      {/* 2. Concentric Luminous SVG Rings in Project Palette */}
      <svg
        viewBox="0 0 440 160"
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          overflow: 'visible',
          zIndex: 1
        }}
      >
        <defs>
          {/* Natural Photon Stream Gradient (Steel Blue & Muted Ice) */}
          <linearGradient id={`streamGrad_${isFocal ? 'f' : 'n'}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3F4650" stopOpacity={isFocal ? 0.6 : 0.35} />
            <stop offset="25%" stopColor="#5F8DAA" stopOpacity={isFocal ? 0.85 : 0.55} />
            <stop offset="50%" stopColor="#8CC8FF" stopOpacity={isFocal ? 0.95 : 0.65} />
            <stop offset="75%" stopColor="#9BBED2" stopOpacity={isFocal ? 0.8 : 0.5} />
            <stop offset="100%" stopColor="#46515D" stopOpacity={isFocal ? 0.6 : 0.35} />
          </linearGradient>

          {/* Inner Vortex Ripple Gradient */}
          <linearGradient id="innerRippleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5F8DAA" stopOpacity="0.45" />
            <stop offset="50%" stopColor="#2E3742" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#8CC8FF" stopOpacity="0.4" />
          </linearGradient>

          {/* Restrained Architectural Glow Filter */}
          <filter id={`ringGlowFilter_${isFocal ? 'f' : 'n'}`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation={isFocal ? "4" : "2"} result="blur1" />
            <feGaussianBlur in="SourceGraphic" stdDeviation={isFocal ? "10" : "5"} result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer Aura Halo Band */}
        <ellipse
          cx="220"
          cy="80"
          rx="202"
          ry="64"
          fill="none"
          stroke={`url(#streamGrad_${isFocal ? 'f' : 'n'})`}
          strokeWidth={isFocal ? "3" : "2"}
          filter={`url(#ringGlowFilter_${isFocal ? 'f' : 'n'})`}
          opacity={isFocal ? 0.55 : 0.28}
        />

        {/* Primary Photonic Rim (Crisp Metallic Silver & Steel) */}
        <ellipse
          cx="220"
          cy="80"
          rx="198"
          ry="62"
          fill="none"
          stroke={isFocal ? "#D9DEE3" : "#AEB7C0"}
          strokeWidth={isFocal ? "1.4" : "1.0"}
          opacity={isFocal ? 0.85 : 0.45}
        />

        {/* Concentric Dashed Data Orbit Track */}
        <ellipse
          cx="220"
          cy="80"
          rx="155"
          ry="48"
          fill="none"
          stroke="url(#innerRippleGrad)"
          strokeWidth="1.2"
          strokeDasharray="8 6 2 6"
          opacity={isFocal ? 0.7 : 0.35}
        />

        {/* Mid Ripple Track */}
        <ellipse
          cx="220"
          cy="80"
          rx="105"
          ry="33"
          fill="none"
          stroke={isFocal ? "rgba(95, 141, 170, 0.65)" : "rgba(60, 72, 83, 0.4)"}
          strokeWidth="1.2"
        />

        {/* Inner Center Vortex Ripple */}
        <ellipse
          cx="220"
          cy="80"
          rx="60"
          ry="19"
          fill="none"
          stroke={isFocal ? "#8CC8FF" : "#5F8DAA"}
          strokeWidth="1.4"
          opacity={isFocal ? 0.75 : 0.35}
          filter={`url(#ringGlowFilter_${isFocal ? 'f' : 'n'})`}
        />
      </svg>

      {/* 3. Celestial Diamond Starlight Glints on Pedestal Rim */}
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 3
        }}
      >
        {/* Front-Center Luminous Diamond Glint */}
        <div
          style={{
            position: 'absolute',
            bottom: '12px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: isFocal ? '8px' : '6px',
            height: isFocal ? '8px' : '6px',
            backgroundColor: '#FFFFFF',
            borderRadius: '50%',
            boxShadow: isFocal 
              ? '0 0 10px #8CC8FF, 0 0 20px rgba(95, 141, 170, 0.6)' 
              : '0 0 6px rgba(140, 200, 255, 0.4)'
          }}
        >
          {isFocal && (
            <>
              {/* Horizontal ray */}
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '-16px',
                right: '-16px',
                height: '1px',
                background: 'linear-gradient(90deg, transparent 0%, rgba(140, 200, 255, 0.3) 25%, #FFFFFF 50%, rgba(140, 200, 255, 0.3) 75%, transparent 100%)',
                transform: 'translateY(-50%)'
              }} />
              {/* Vertical ray */}
              <div style={{
                position: 'absolute',
                left: '50%',
                top: '-16px',
                bottom: '-16px',
                width: '1px',
                background: 'linear-gradient(180deg, transparent 0%, rgba(140, 200, 255, 0.3) 25%, #FFFFFF 50%, rgba(140, 200, 255, 0.3) 75%, transparent 100%)',
                transform: 'translateX(-50%)'
              }} />
            </>
          )}
        </div>

        {/* Right Rim Glint */}
        <div
          style={{
            position: 'absolute',
            top: '48%',
            right: '12px',
            transform: 'translateY(-50%)',
            width: isFocal ? '6px' : '5px',
            height: isFocal ? '6px' : '5px',
            backgroundColor: '#FFFFFF',
            borderRadius: '50%',
            boxShadow: '0 0 8px rgba(95, 141, 170, 0.5)'
          }}
        >
          <div style={{ position: 'absolute', top: '50%', left: '-10px', right: '-10px', height: '1px', background: 'linear-gradient(90deg, transparent, #FFFFFF, transparent)', transform: 'translateY(-50%)' }} />
        </div>

        {/* Left Rim Glint */}
        <div
          style={{
            position: 'absolute',
            top: '48%',
            left: '12px',
            transform: 'translateY(-50%)',
            width: isFocal ? '6px' : '5px',
            height: isFocal ? '6px' : '5px',
            backgroundColor: '#FFFFFF',
            borderRadius: '50%',
            boxShadow: '0 0 8px rgba(95, 141, 170, 0.5)'
          }}
        >
          <div style={{ position: 'absolute', top: '50%', left: '-10px', right: '-10px', height: '1px', background: 'linear-gradient(90deg, transparent, #FFFFFF, transparent)', transform: 'translateY(-50%)' }} />
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   Main Impact Section (Harmonized with Project Architecture & Color System)
   ========================================================================= */
function Impact() {
  const [rotationAngle, setRotationAngle] = useState(0);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [targetAngle, setTargetAngle] = useState(null);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  // Drag interaction states
  const [isDragging, setIsDragging] = useState(false);
  const dragStartXRef = useRef(0);
  const dragStartAngleRef = useRef(0);

  const requestRef = useRef(null);
  const lastTimeRef = useRef(performance.now());
  const stageRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 680;
  const isTablet = windowWidth >= 680 && windowWidth < 1024;
  
  const radiusX = isMobile ? 150 : (isTablet ? 275 : 395);
  const radiusY = isMobile ? 75 : (isTablet ? 100 : 135);

  // Unstoppable slow-motion orbit (virtualized to pause when offscreen)
  useEffect(() => {
    let isVisible = true;
    const sectionEl = sectionRef.current;

    const animate = (now) => {
      if (!isVisible) {
        requestRef.current = null;
        return;
      }
      const delta = (now - lastTimeRef.current) / 1000;
      lastTimeRef.current = now;

      if (!isDragging) {
        if (targetAngle !== null) {
          setRotationAngle((prev) => {
            const diff = targetAngle - prev;
            if (Math.abs(diff) < 0.005) {
              setTargetAngle(null);
              return targetAngle;
            }
            return prev + diff * 0.085;
          });
        } else {
          // Slow-motion natural orbit (~54s per revolution)
          const speed = 0.116;
          setRotationAngle((prev) => (prev + speed * delta) % (Math.PI * 2));
        }
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    let observer;
    if (sectionEl) {
      observer = new IntersectionObserver(([entry]) => {
        const visible = entry.isIntersecting;
        if (visible && !isVisible) {
          isVisible = true;
          lastTimeRef.current = performance.now();
          if (!requestRef.current) {
            requestRef.current = requestAnimationFrame(animate);
          }
        } else {
          isVisible = visible;
        }
      }, { rootMargin: '250px' });
      observer.observe(sectionEl);
    }

    lastTimeRef.current = performance.now();
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (observer) observer.disconnect();
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isDragging, targetAngle]);

  const focusCard = useCallback((cardIndex) => {
    setActiveCardIndex(cardIndex);
    const targetCardAngle = (Math.PI / 2) - cardIndex * (2 * Math.PI / 5);
    
    let normTarget = targetCardAngle;
    while (normTarget - rotationAngle > Math.PI) normTarget -= Math.PI * 2;
    while (normTarget - rotationAngle < -Math.PI) normTarget += Math.PI * 2;
    
    setTargetAngle(normTarget);
  }, [rotationAngle]);

  // Drag handlers
  const handlePointerDown = (e) => {
    if (e.target.closest('button')) return;
    setIsDragging(true);
    dragStartXRef.current = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    dragStartAngleRef.current = rotationAngle;
    setTargetAngle(null);
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const deltaX = clientX - dragStartXRef.current;
    const angleOffset = deltaX * 0.0042;
    setRotationAngle(dragStartAngleRef.current + angleOffset);
  };

  const handlePointerUp = () => {
    if (isDragging) {
      setIsDragging(false);
      lastTimeRef.current = performance.now();
    }
  };

  const cardStations = FIVE_IMPACT_CARDS.map((_, idx) => {
    const alpha = rotationAngle + (idx * (2 * Math.PI / 5));
    const x = Math.cos(alpha) * radiusX;
    const y = Math.sin(alpha) * radiusY;
    const depthFactor = (Math.sin(alpha) + 1) / 2;
    return { x, y, depthFactor };
  });

  const stageWidth = Math.min(windowWidth - 48, 1380);
  const stageHeight = isMobile ? 620 : 720;

  return (
    <section
      id="impact"
      ref={sectionRef}
      style={{
        position: 'relative',
        background: 'linear-gradient(180deg, #090D11 0%, #0A0E12 35%, #0C1116 70%, #080B0F 100%)',
        paddingTop: 'calc(var(--section-spacing) * 0.95)',
        paddingBottom: 'calc(var(--section-spacing) * 1.05)',
        overflow: 'hidden'
      }}
    >
      {/* Background Soft Atmospheric Graphite Field (matching Ecosystem.jsx) */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '1200px',
          height: '600px',
          background: 'radial-gradient(ellipse at center, rgba(16, 23, 30, 0.45) 0%, rgba(10, 14, 18, 0.15) 50%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        
        {/* ── Editorial Section Top Indicator (Standard Project Structure) ── */}
        <div className="editorial-section-header">
          <span className="editorial-index-num">03</span>
          <span className="editorial-divider-line" />
          <span>GLOBAL IMPACT // FIVE PLANETARY DOMAINS</span>
        </div>

        {/* Section Headline & Lead */}
        <div style={{ maxWidth: '780px', marginBottom: '2.8rem' }}>
          <h2
            className="serif-title"
            style={{
              fontSize: 'clamp(2.4rem, 4.2vw, 3.6rem)',
              lineHeight: 1.1,
              color: 'var(--text-primary)',
              marginBottom: '1rem',
              fontWeight: 400
            }}
          >
            A network that spans the world.<br />
            Measured across five global domains.
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.96rem',
              lineHeight: 1.7,
              color: 'var(--text-secondary)',
              fontWeight: 300,
              maxWidth: '680px',
              margin: 0
            }}
          >
            Connecting superclusters, research laboratories, and sovereign institutions worldwide. 
            Each domain is grounded on its personal rotatory orbital pedestal, united across a continuous celestial stream.
          </p>
        </div>

        {/* ── 3D ORBITAL STAGE ── */}
        <div
          ref={stageRef}
          onMouseDown={handlePointerDown}
          onMouseMove={handlePointerMove}
          onMouseUp={handlePointerUp}
          onTouchStart={handlePointerDown}
          onTouchMove={handlePointerMove}
          onTouchEnd={handlePointerUp}
          style={{
            position: 'relative',
            width: '100%',
            height: `${stageHeight}px`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            perspective: '1200px',
            overflow: 'visible',
            cursor: isDragging ? 'grabbing' : 'grab',
            userSelect: 'none'
          }}
        >
          {/* ── 1. MILKY WAY GALAXY STREAM ── */}
          <MilkyWayGalaxyCanvas
            stations={cardStations}
            width={stageWidth}
            height={stageHeight}
          />

          {/* ── 2. 5 STATIONS: EDITORIAL CARD ON TOP + ROTATORY RING PEDESTAL BENEATH ── */}
          {FIVE_IMPACT_CARDS.map((card, idx) => {
            const station = cardStations[idx];
            const { x, y, depthFactor } = station;
            const isFocal = depthFactor > 0.88;
            
            const scale = 0.80 + depthFactor * 0.24;
            const opacity = 0.55 + depthFactor * 0.45;
            const zIndex = Math.round(depthFactor * 100) + 10;

            const Icon = card.icon;

            return (
              <div
                key={card.id}
                onClick={() => focusCard(idx)}
                style={{
                  position: 'absolute',
                  width: isMobile ? '255px' : '285px',
                  transform: `translate(${x}px, ${y}px) scale(${scale})`,
                  opacity,
                  zIndex,
                  transformOrigin: 'center center',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
                {/* 1. SOLID GRAPHITE EDITORIAL CARD (.editorial-panel-card Structure) */}
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    borderRadius: '4px',
                    padding: isMobile ? '1.2rem' : '1.4rem 1.35rem',
                    backgroundColor: isFocal ? 'rgba(14, 20, 27, 0.96)' : 'rgba(11, 16, 21, 0.88)',
                    border: `1px solid ${isFocal ? 'rgba(95, 141, 170, 0.65)' : 'rgba(60, 72, 83, 0.35)'}`,
                    boxShadow: isFocal 
                      ? '0 24px 60px rgba(0, 0, 0, 0.85), 0 0 20px rgba(95, 141, 170, 0.15)' 
                      : '0 16px 36px rgba(0, 0, 0, 0.65)',
                    backdropFilter: 'blur(14px)',
                    WebkitBackdropFilter: 'blur(14px)',
                    transition: 'border-color 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                    zIndex: 4
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(95, 141, 170, 0.8)';
                    e.currentTarget.style.boxShadow = '0 24px 60px rgba(0, 0, 0, 0.9), 0 0 24px rgba(95, 141, 170, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    if (!isFocal) {
                      e.currentTarget.style.borderColor = 'rgba(60, 72, 83, 0.35)';
                      e.currentTarget.style.boxShadow = '0 16px 36px rgba(0, 0, 0, 0.65)';
                    }
                  }}
                >
                  {/* Top Specular Accent Line in Soft Steel/Ice */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '1.5px',
                      background: isFocal 
                        ? 'linear-gradient(90deg, transparent 0%, rgba(140, 200, 255, 0.7) 50%, transparent 100%)' 
                        : 'linear-gradient(90deg, transparent 0%, rgba(95, 141, 170, 0.3) 50%, transparent 100%)'
                    }}
                  />

                  {/* Header Row: Category Tag (.editorial-pill-tag) + Monospace Index */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
                    <span className="editorial-pill-tag">
                      <Icon size={10} style={{ marginRight: '2px' }} />
                      {card.tag}
                    </span>

                    <span style={{
                      fontFamily: 'monospace',
                      fontSize: '0.58rem',
                      letterSpacing: '0.12em',
                      color: isFocal ? '#9BBED2' : '#596773',
                      fontWeight: 600
                    }}>
                      0{idx + 1} / 05
                    </span>
                  </div>

                  {/* Hero Stat Number (.editorial-large-stat) */}
                  <div style={{
                    margin: '0.4rem 0 0.5rem 0',
                    paddingBottom: '0.65rem',
                    borderBottom: '1px solid rgba(60, 72, 83, 0.3)'
                  }}>
                    <div
                      className="editorial-large-stat"
                      style={{
                        fontSize: isMobile ? '1.95rem' : '2.35rem',
                        color: 'var(--text-primary)',
                        marginBottom: '0.2rem'
                      }}
                    >
                      {card.statNum}
                    </div>

                    <div style={{
                      fontFamily: 'monospace',
                      fontSize: '0.58rem',
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: '#5F8DAA',
                      fontWeight: 600
                    }}>
                      {card.statLabel}
                    </div>
                  </div>

                  {/* Domain Title & Subtitle */}
                  <h3 style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: isMobile ? '0.98rem' : '1.05rem',
                    fontWeight: 600,
                    letterSpacing: '-0.01em',
                    color: 'var(--text-primary)',
                    margin: '0 0 0.25rem 0'
                  }}>
                    {card.title}
                  </h3>

                  <div style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.72rem',
                    color: 'var(--text-secondary)',
                    marginBottom: '0.75rem',
                    lineHeight: 1.45,
                    fontWeight: 300
                  }}>
                    {card.tagline}
                  </div>

                  {/* Editorial Highlight Quote Box */}
                  <div style={{
                    padding: '0.5rem 0.7rem',
                    borderRadius: '2px',
                    backgroundColor: 'rgba(95, 141, 170, 0.08)',
                    borderLeft: '2px solid rgba(95, 141, 170, 0.5)',
                    marginBottom: '0.75rem',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '6px'
                  }}>
                    <Award size={13} color="#9BBED2" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.70rem',
                      lineHeight: 1.45,
                      color: 'var(--silver-primary)'
                    }}>
                      {card.impactHighlight}
                    </span>
                  </div>

                  {/* Micro-Metrics Bar */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${card.metrics.length}, 1fr)`,
                    gap: '0.35rem',
                    paddingTop: '0.65rem',
                    borderTop: '1px solid rgba(60, 72, 83, 0.25)'
                  }}>
                    {card.metrics.map((m, mIdx) => (
                      <div key={mIdx} style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{
                          fontFamily: 'var(--font-serif-display)',
                          fontSize: '0.96rem',
                          fontWeight: 400,
                          color: 'var(--text-primary)',
                          lineHeight: 1.1
                        }}>
                          {m.val}
                        </span>
                        <span style={{
                          fontFamily: 'monospace',
                          fontSize: '0.48rem',
                          letterSpacing: '0.06em',
                          textTransform: 'uppercase',
                          color: '#84929D',
                          marginTop: '2px'
                        }}>
                          {m.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. PEDESTAL CONNECTOR FIBER STEM */}
                <div
                  style={{
                    width: '1.5px',
                    height: '14px',
                    background: isFocal 
                      ? 'linear-gradient(180deg, rgba(95, 141, 170, 0.8) 0%, rgba(95, 141, 170, 0.2) 100%)' 
                      : 'linear-gradient(180deg, rgba(60, 72, 83, 0.5) 0%, rgba(60, 72, 83, 0.1) 100%)',
                    zIndex: 3
                  }}
                />

                {/* 3. NATURAL GLOWING RING STAND IN PROJECT PALETTE */}
                <NaturalGlowingRingStand isFocal={isFocal} isMobile={isMobile} />
              </div>
            );
          })}
        </div>

        {/* ── Mobile Card Stepper Controls ── */}
        {isMobile && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.85rem',
            marginTop: '1.5rem',
            paddingBottom: '0.5rem',
            flexWrap: 'wrap'
          }}>
            {FIVE_IMPACT_CARDS.map((card, idx) => (
              <button
                key={card.id}
                onClick={() => focusCard(idx)}
                aria-label={`Focus ${card.shortTitle}`}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px 8px'
                }}
              >
                <span style={{
                  display: 'block',
                  width: activeCardIndex === idx ? '24px' : '6px',
                  height: '6px',
                  borderRadius: '3px',
                  backgroundColor: activeCardIndex === idx
                    ? 'var(--accent-ice)'
                    : 'rgba(150, 170, 185, 0.3)',
                  boxShadow: activeCardIndex === idx ? '0 0 8px var(--accent-ice)' : 'none',
                  transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
                }} />
                <span style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.55rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: activeCardIndex === idx ? 'var(--accent-ice)' : 'var(--text-subtle)',
                  transition: 'color 0.25s ease'
                }}>{card.shortTitle}</span>
              </button>
            ))}
          </div>
        )}

      </div>

      <style>{`
        @media (max-width: 680px) {
          #impact h2 {
            font-size: clamp(1.8rem, 6vw, 2.6rem) !important;
          }
        }
      `}</style>
    </section>
  );
}

export default React.memo(Impact);
