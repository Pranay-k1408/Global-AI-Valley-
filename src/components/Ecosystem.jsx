import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, Sparkles, Terminal, Users, Globe, Cpu } from 'lucide-react';

/* =========================================================================
   Procedural Canvas 01: INNOVATION
   Evolving particle lattice: structured grid at rest -> organic pathways on hover
   ========================================================================= */
function InnovationCanvas({ isActive, mousePos }) {
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
    let time = 0;
    let isVisible = true;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    let width = canvas.parentElement.clientWidth;
    let height = canvas.parentElement.clientHeight || 240;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);

    // Initialize 7x7 grid of particles
    const cols = 7;
    const rows = 7;
    const particles = [];

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        particles.push({
          baseX: (c + 0.5) / cols,
          baseY: (r + 0.5) / rows,
          phase: (r * cols + c) * 0.25,
          speed: 0.8 + Math.random() * 0.4
        });
      }
    }

    const render = () => {
      if (!isVisible) return;
      time += 0.02; // Runs continuously without interruption
      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      const targetX = mouseRef.current?.x ? mouseRef.current.x / width : 0.5;
      const targetY = mouseRef.current?.y ? mouseRef.current.y / height : 0.5;

      const renderedPoints = [];

      // Calculate particle positions
      particles.forEach((p) => {
        let x = p.baseX * width;
        let y = p.baseY * height;

        if (isActive) {
          // Reorganize into organic fluid algorithmic currents
          const wave = Math.sin(time * p.speed + p.phase) * 14;
          const wave2 = Math.cos(time * 0.7 + p.phase) * 12;
          const dx = targetX * width - x;
          const dy = targetY * height - y;
          const dist = Math.hypot(dx, dy);
          const pull = Math.max(1 - dist / (width * 0.7), 0) * 22;

          x += wave + (dx / (dist || 1)) * pull;
          y += wave2 + (dy / (dist || 1)) * pull;
        } else {
          // Calm structured lattice breathing
          x += Math.sin(time * 0.5 + p.phase) * 2.5;
          y += Math.cos(time * 0.5 + p.phase) * 2.5;
        }

        renderedPoints.push({ x, y });
      });

      // Draw connective lines between close neighbors
      ctx.lineWidth = isActive ? 0.85 : 0.4;
      for (let i = 0; i < renderedPoints.length; i++) {
        for (let j = i + 1; j < renderedPoints.length; j++) {
          const p1 = renderedPoints[i];
          const p2 = renderedPoints[j];
          const d = Math.hypot(p2.x - p1.x, p2.y - p1.y);
          const maxDist = isActive ? width * 0.28 : width * 0.18;

          if (d < maxDist) {
            const alpha = (1 - d / maxDist) * (isActive ? 0.45 : 0.18);
            ctx.strokeStyle = `rgba(95, 141, 170, ${alpha.toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // Draw particle nodes
      renderedPoints.forEach((pt, idx) => {
        const isAccent = idx % 5 === 0;
        ctx.beginPath();
        const r = isActive ? (isAccent ? 3.5 : 2.2) : 1.8;
        ctx.arc(pt.x, pt.y, r, 0, Math.PI * 2);
        ctx.fillStyle = isActive
          ? (isAccent ? '#C8E2EF' : '#9BBED2')
          : 'rgba(95, 141, 170, 0.55)';
        ctx.fill();

        if (isActive && isAccent) {
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, r + 4, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(200, 226, 239, 0.3)';
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      });

      ctx.restore();
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

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.parentElement.clientWidth;
      height = canvas.parentElement.clientHeight || 240;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isActive]); // mousePos removed from dependencies so animation NEVER stops

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '100%',
        height: '100%',
        display: 'block'
      }}
    />
  );
}

/* =========================================================================
   Procedural Canvas 02: RESEARCH
   Flowing knowledge waveforms: calm contour lines -> converging multi-frequency synthesis
   ========================================================================= */
function ResearchCanvas({ isActive, mousePos }) {
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
    let time = 0;
    let isVisible = true;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    let width = canvas.parentElement.clientWidth;
    let height = canvas.parentElement.clientHeight || 240;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);

    const lineCount = 7;

    const render = () => {
      if (!isVisible) return;
      time += 0.018; // Runs continuously
      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      const targetY = mouseRef.current?.y ? mouseRef.current.y / height : 0.5;
      const freq1 = isActive ? 3.2 : 1.8;
      const freq2 = isActive ? 5.5 : 2.5;

      for (let i = 0; i < lineCount; i++) {
        const norm = i / (lineCount - 1);
        const baseY = height * (0.2 + norm * 0.6);

        ctx.beginPath();
        const steps = 40;
        for (let s = 0; s <= steps; s++) {
          const x = (s / steps) * width;
          const nx = s / steps;

          // Waveform calculation
          const amp1 = isActive ? 22 * Math.sin(nx * Math.PI) : 8;
          const amp2 = isActive ? 12 * Math.sin(nx * Math.PI * 2) : 4;

          // Convergence towards focal research core when active
          const focusPull = isActive ? Math.exp(-Math.pow((nx - 0.5) * 3.5, 2)) * (targetY * height - baseY) * 0.45 : 0;

          const y = baseY +
            Math.sin(nx * freq1 + time + i * 0.4) * amp1 +
            Math.cos(nx * freq2 - time * 0.8 + i * 0.6) * amp2 +
            focusPull;

          if (s === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        const isCenterLine = i === Math.floor(lineCount / 2);
        ctx.strokeStyle = isActive
          ? (isCenterLine ? 'rgba(200, 226, 239, 0.85)' : `rgba(109, 157, 186, ${(0.3 + norm * 0.35).toFixed(2)})`)
          : `rgba(95, 141, 170, ${(0.15 + norm * 0.2).toFixed(2)})`;
        ctx.lineWidth = isActive ? (isCenterLine ? 1.8 : 1.1) : 0.75;
        ctx.stroke();

        // Traveling focal packet along center discovery line
        if (isActive && isCenterLine) {
          const packetT = (time * 0.4) % 1;
          const px = packetT * width;
          const pAmp1 = 22 * Math.sin(packetT * Math.PI);
          const py = baseY + Math.sin(packetT * freq1 + time + i * 0.4) * pAmp1;

          ctx.beginPath();
          ctx.arc(px, py, 3.5, 0, Math.PI * 2);
          ctx.fillStyle = '#C8E2EF';
          ctx.shadowColor = '#5F8DAA';
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      ctx.restore();
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

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.parentElement.clientWidth;
      height = canvas.parentElement.clientHeight || 240;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isActive]); // mousePos removed from dependencies so animation NEVER stops

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '100%',
        height: '100%',
        display: 'block'
      }}
    />
  );
}

/* =========================================================================
   Procedural Canvas 03: TALENT
   Interactive human intelligence constellation:
   Elastic gravitational nodes, dynamic cursor filaments, and continuous zero-gravity breathing
   ========================================================================= */
function TalentCanvas({ isActive, mousePos }) {
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
    let time = 0;
    let isVisible = true;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    let width = canvas.parentElement.clientWidth;
    let height = canvas.parentElement.clientHeight || 240;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);

    // Human intelligence nodes
    const baseNodes = [
      { x: 0.50, y: 0.50, r: 5.0, isHub: true },
      { x: 0.30, y: 0.35, r: 3.4, isHub: false },
      { x: 0.70, y: 0.32, r: 3.8, isHub: false },
      { x: 0.25, y: 0.65, r: 3.2, isHub: false },
      { x: 0.72, y: 0.68, r: 3.6, isHub: false },
      { x: 0.48, y: 0.22, r: 3.0, isHub: false },
      { x: 0.52, y: 0.78, r: 3.2, isHub: false },
      { x: 0.16, y: 0.48, r: 2.6, isHub: false },
      { x: 0.84, y: 0.50, r: 2.8, isHub: false }
    ];

    let smoothMouseX = width * 0.5;
    let smoothMouseY = height * 0.5;

    const render = () => {
      if (!isVisible) return;
      time += 0.022; // Continues smoothly on hover, NEVER stops!
      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      const targetMouseX = mouseRef.current?.x != null ? mouseRef.current.x : width * 0.5;
      const targetMouseY = mouseRef.current?.y != null ? mouseRef.current.y : height * 0.5;
      smoothMouseX += (targetMouseX - smoothMouseX) * 0.10;
      smoothMouseY += (targetMouseY - smoothMouseY) * 0.10;

      const expansion = isActive ? 1.25 : 0.95;
      const cx = width / 2;
      const cy = height / 2;

      // Calculate organic dynamic coordinates for all nodes
      const currentPoints = baseNodes.map((n, idx) => {
        const floatAngle = time * 0.85 + idx * 0.95;
        const floatX = Math.sin(floatAngle) * (isActive ? 9 : 4);
        const floatY = Math.cos(floatAngle * 0.9) * (isActive ? 7 : 3);

        const radialX = (n.x - 0.5) * width * expansion;
        const radialY = (n.y - 0.5) * height * expansion;

        let px = cx + radialX + floatX;
        let py = cy + radialY + floatY;

        // Interactive elastic attraction to cursor
        let cursorInfluence = 0;
        if (isActive && mouseRef.current?.x != null) {
          const dx = smoothMouseX - px;
          const dy = smoothMouseY - py;
          const dist = Math.hypot(dx, dy);
          const maxInfluence = width * 0.55;
          if (dist < maxInfluence && dist > 1) {
            cursorInfluence = Math.max(0, 1 - dist / maxInfluence);
            const pull = Math.sin(cursorInfluence * Math.PI * 0.5) * 22;
            px += (dx / dist) * pull;
            py += (dy / dist) * pull;
          }
        }

        return {
          ...n,
          px,
          py,
          cursorInfluence
        };
      });

      // 1. Draw Connective Mesh Filaments
      for (let i = 0; i < currentPoints.length; i++) {
        for (let j = i + 1; j < currentPoints.length; j++) {
          const p1 = currentPoints[i];
          const p2 = currentPoints[j];
          const dist = Math.hypot(p2.px - p1.px, p2.py - p1.py);
          const maxDist = width * (isActive ? 0.56 : 0.42);

          if (dist < maxDist) {
            const baseAlpha = (1 - dist / maxDist);
            const boost = (p1.cursorInfluence + p2.cursorInfluence) * 0.35;
            const alpha = Math.min(1, baseAlpha * (isActive ? 0.52 : 0.18) + boost);

            ctx.strokeStyle = isActive
              ? `rgba(140, 200, 255, ${alpha.toFixed(3)})`
              : `rgba(95, 141, 170, ${alpha.toFixed(3)})`;
            ctx.lineWidth = isActive ? (1.0 + boost) : 0.6;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();

            // Traveling photon dot along active connections
            if (isActive && (i + j) % 3 === 0) {
              const photonT = (time * 0.45 + (i * 7 + j) * 0.15) % 1;
              const photonX = p1.px + (p2.px - p1.px) * photonT;
              const photonY = p1.py + (p2.py - p1.py) * photonT;
              ctx.beginPath();
              ctx.arc(photonX, photonY, 1.4, 0, Math.PI * 2);
              ctx.fillStyle = 'rgba(200, 226, 239, 0.75)';
              ctx.fill();
            }
          }
        }
      }

      // 2. Interactive Cursor Filaments (Links cursor dynamically to closest nodes)
      if (isActive && mouseRef.current?.x != null) {
        const sorted = [...currentPoints].sort((a, b) => {
          return Math.hypot(a.px - smoothMouseX, a.py - smoothMouseY) -
                 Math.hypot(b.px - smoothMouseX, b.py - smoothMouseY);
        });

        // Connect top 3 closest nodes to the cursor position
        for (let k = 0; k < Math.min(3, sorted.length); k++) {
          const targetNode = sorted[k];
          const cDist = Math.hypot(targetNode.px - smoothMouseX, targetNode.py - smoothMouseY);
          if (cDist < width * 0.65) {
            const filamentAlpha = Math.max(0, 1 - cDist / (width * 0.65)) * 0.55;
            ctx.beginPath();
            ctx.moveTo(smoothMouseX, smoothMouseY);
            ctx.lineTo(targetNode.px, targetNode.py);
            ctx.strokeStyle = `rgba(200, 226, 239, ${filamentAlpha.toFixed(3)})`;
            ctx.lineWidth = 1.2;
            ctx.stroke();

            // Traveling energy packet towards the cursor
            const pulseT = (time * 0.9 + k * 0.33) % 1;
            const px = targetNode.px + (smoothMouseX - targetNode.px) * pulseT;
            const py = targetNode.py + (smoothMouseY - targetNode.py) * pulseT;
            ctx.beginPath();
            ctx.arc(px, py, 2.2, 0, Math.PI * 2);
            ctx.fillStyle = '#FFFFFF';
            ctx.shadowColor = '#8CC8FF';
            ctx.shadowBlur = 8;
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        }

        // Glowing cursor particle beacon
        ctx.beginPath();
        ctx.arc(smoothMouseX, smoothMouseY, 3.2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(200, 226, 239, 0.90)';
        ctx.shadowColor = '#8CC8FF';
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Expanding pulse wave from cursor
        const cursorPulse = (time * 1.2) % 1;
        ctx.beginPath();
        ctx.arc(smoothMouseX, smoothMouseY, 4 + cursorPulse * 24, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(140, 200, 255, ${(1 - cursorPulse) * 0.45})`;
        ctx.lineWidth = 0.9;
        ctx.stroke();
      }

      // 3. Draw Nodes with Dynamic Radiant Halos
      currentPoints.forEach((pt) => {
        const radius = pt.r + (pt.cursorInfluence || 0) * 1.8;
        ctx.beginPath();
        ctx.arc(pt.px, pt.py, radius, 0, Math.PI * 2);
        ctx.fillStyle = isActive
          ? (pt.isHub ? '#FFFFFF' : pt.cursorInfluence > 0.3 ? '#E0F0F8' : '#C8E2EF')
          : 'rgba(155, 190, 210, 0.65)';
        if (isActive && (pt.isHub || pt.cursorInfluence > 0.2)) {
          ctx.shadowColor = '#5F8DAA';
          ctx.shadowBlur = 10;
        }
        ctx.fill();
        ctx.shadowBlur = 0;

        // Radiant expansion pulse rings
        if (isActive) {
          const pulse = (time * 1.4 + pt.px * 0.04) % 1;
          ctx.beginPath();
          ctx.arc(pt.px, pt.py, radius + pulse * 16, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(140, 200, 255, ${(1 - pulse) * 0.55})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      });

      ctx.restore();
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

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.parentElement.clientWidth;
      height = canvas.parentElement.clientHeight || 240;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isActive]); // mousePos removed from dependencies so animation NEVER stops

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '100%',
        height: '100%',
        display: 'block'
      }}
    />
  );
}

/* =========================================================================
   Procedural Canvas 04: ECOSYSTEM
   Interactive orbital resonance topology:
   Continuous satellite revolutions, 3D gyroscopic tilt to cursor, magnetic core corona, and stardust drift
   ========================================================================= */
function EcosystemCanvas({ isActive, mousePos }) {
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
    let time = 0;
    let isVisible = true;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    let width = canvas.parentElement.clientWidth;
    let height = canvas.parentElement.clientHeight || 240;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);

    const maxRadius = Math.min(width, height) * 0.44;
    const rings = [
      { r: maxRadius * 0.32, speed: 0.85, tilt: 0.28, nodeCount: 2 },
      { r: maxRadius * 0.62, speed: -0.62, tilt: -0.22, nodeCount: 3 },
      { r: maxRadius * 0.94, speed: 0.48, tilt: 0.16, nodeCount: 4 }
    ];

    // Background stardust particles that gently drift
    const dustParticles = [];
    for (let i = 0; i < 28; i++) {
      dustParticles.push({
        angle: Math.random() * Math.PI * 2,
        dist: (0.2 + Math.random() * 0.8) * maxRadius,
        speed: (0.2 + Math.random() * 0.4) * (Math.random() > 0.5 ? 1 : -1),
        size: 0.8 + Math.random() * 1.4,
        alpha: 0.2 + Math.random() * 0.5
      });
    }

    let smoothTiltX = 0;
    let smoothTiltY = 0;

    const render = () => {
      if (!isVisible) return;
      time += 0.018; // Continues smoothly on hover, NEVER stops!
      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      // Interactive 3D gyroscopic tilt from mouse position
      const mx = mouseRef.current?.x != null ? mouseRef.current.x : cx;
      const my = mouseRef.current?.y != null ? mouseRef.current.y : cy;
      const targetTiltX = isActive ? ((mx - cx) / width) * 0.6 : 0;
      const targetTiltY = isActive ? ((my - cy) / height) * 0.45 : 0;
      smoothTiltX += (targetTiltX - smoothTiltX) * 0.08;
      smoothTiltY += (targetTiltY - smoothTiltY) * 0.08;

      // 1. Draw Stardust Particles
      dustParticles.forEach((dp) => {
        dp.angle += dp.speed * 0.008;
        const dx = cx + Math.cos(dp.angle + smoothTiltX) * dp.dist;
        const dy = cy + Math.sin(dp.angle + smoothTiltY) * dp.dist * 0.65;
        ctx.beginPath();
        ctx.arc(dx, dy, dp.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(155, 190, 210, ${(dp.alpha * (isActive ? 0.6 : 0.25)).toFixed(3)})`;
        ctx.fill();
      });

      // 2. Central Sovereign Core
      const corePulse = Math.sin(time * 2.5) * 1.5;
      const coreRadius = (isActive ? 6.5 : 4.5) + corePulse * 0.5;
      ctx.beginPath();
      ctx.arc(cx, cy, coreRadius, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.shadowColor = '#8CC8FF';
      ctx.shadowBlur = isActive ? 18 : 8;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Central core magnetic halo
      if (isActive) {
        const coreHalo = (time * 1.0) % 1;
        ctx.beginPath();
        ctx.arc(cx, cy, coreRadius + coreHalo * 22, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(140, 200, 255, ${(1 - coreHalo) * 0.4})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      // 3. Draw Orbit Rings & Satellites
      rings.forEach((ring, rIdx) => {
        ctx.save();
        ctx.translate(cx, cy);
        // Tilt responds to mouse position in real-time
        ctx.rotate(ring.tilt + smoothTiltX);

        const currentR = ring.r * (isActive ? 1.05 : 0.95);
        const yFlatten = 0.65 + smoothTiltY * 0.2;

        // Elliptical Ring Path
        ctx.beginPath();
        ctx.ellipse(0, 0, currentR, currentR * yFlatten, 0, 0, Math.PI * 2);
        ctx.strokeStyle = isActive
          ? `rgba(140, 200, 255, ${(0.32 + rIdx * 0.18).toFixed(2)})`
          : 'rgba(60, 72, 83, 0.25)';
        ctx.lineWidth = isActive ? 1.1 : 0.6;
        if (rIdx === 1) ctx.setLineDash([5, 4]);
        ctx.stroke();
        ctx.setLineDash([]);

        // Satellites along orbit
        for (let s = 0; s < ring.nodeCount; s++) {
          const theta = time * ring.speed + (s * (Math.PI * 2)) / ring.nodeCount;
          const sx = Math.cos(theta) * currentR;
          const sy = Math.sin(theta) * currentR * yFlatten;

          // Convert sx, sy back to canvas space to measure distance to mouse
          const cosT = Math.cos(ring.tilt + smoothTiltX);
          const sinT = Math.sin(ring.tilt + smoothTiltX);
          const worldSx = cx + (sx * cosT - sy * sinT);
          const worldSy = cy + (sx * sinT + sy * cosT);

          const distToMouse = Math.hypot(worldSx - mx, worldSy - my);
          const isNearMouse = isActive && distToMouse < 90;

          ctx.beginPath();
          const satRadius = isActive ? (isNearMouse ? 4.2 : 3.0) : 2.0;
          ctx.arc(sx, sy, satRadius, 0, Math.PI * 2);
          ctx.fillStyle = isActive ? (isNearMouse ? '#FFFFFF' : '#C8E2EF') : '#596773';
          if (isNearMouse) {
            ctx.shadowColor = '#8CC8FF';
            ctx.shadowBlur = 12;
          }
          ctx.fill();
          ctx.shadowBlur = 0;

          // If active and near mouse, shoot an interactive energy beam to the cursor
          if (isNearMouse) {
            ctx.restore();
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(worldSx, worldSy);
            ctx.lineTo(mx, my);
            const beamAlpha = (1 - distToMouse / 90) * 0.6;
            ctx.strokeStyle = `rgba(200, 226, 239, ${beamAlpha.toFixed(3)})`;
            ctx.lineWidth = 1.0;
            ctx.stroke();

            // Energy spark along the beam
            const sparkT = (time * 2.0 + s) % 1;
            const spX = worldSx + (mx - worldSx) * sparkT;
            const spY = worldSy + (my - worldSy) * sparkT;
            ctx.beginPath();
            ctx.arc(spX, spY, 1.8, 0, Math.PI * 2);
            ctx.fillStyle = '#FFFFFF';
            ctx.fill();
            ctx.restore();
            ctx.save();
            ctx.translate(cx, cy);
            ctx.rotate(ring.tilt + smoothTiltX);
          }

          // Outward radiation vector on outermost ring
          if (isActive && rIdx === 2) {
            ctx.beginPath();
            ctx.moveTo(sx, sy);
            ctx.lineTo(sx * 1.25, sy * 1.25);
            ctx.strokeStyle = 'rgba(155, 190, 210, 0.35)';
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        ctx.restore();
      });

      ctx.restore();
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

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.parentElement.clientWidth;
      height = canvas.parentElement.clientHeight || 240;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isActive]); // mousePos removed from dependencies so animation NEVER stops

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '100%',
        height: '100%',
        display: 'block'
      }}
    />
  );
}

/* =========================================================================
   Main Ecosystem Section Component
   Four-Panel Editorial Interaction System
   ========================================================================= */
const FOUR_PANELS = [
  {
    id: 'innovation',
    index: '01 / 04',
    title: 'FOUNDATION',
    lead: 'Ideas transforming into possibilities.',
    desc: 'Cutting-edge foundational research, automated reasoning sandboxes, and breakthrough infrastructure accelerating frontier venture creation.',
    tag: 'FOUNDRY SANDBOX',
    icon: Sparkles,
    bgRest: '#0A0E13',
    bgActive: '#0F161E',
    borderColor: 'rgba(95, 141, 170, 0.55)',
    CanvasComp: InnovationCanvas
  },
  {
    id: 'research',
    index: '02 / 04',
    title: 'RESEARCH',
    lead: 'Knowledge becoming discovery.',
    desc: 'Open-access safety protocols, mechanistic model interpretability frameworks, and decentralized training topologies across institutes.',
    tag: 'DEEP THEORY',
    icon: Terminal,
    bgRest: '#0E1318',
    bgActive: '#131C24',
    borderColor: 'rgba(109, 157, 186, 0.55)',
    CanvasComp: ResearchCanvas
  },
  {
    id: 'talent',
    index: '03 / 04',
    title: 'TALENT',
    lead: 'People becoming connections.',
    desc: 'Connecting sovereign fellows, doctoral residents, and world-class founders with unrestricted supercluster compute and mentorship.',
    tag: 'HUMAN FELLOWSHIP',
    icon: Users,
    bgRest: '#11171D',
    bgActive: '#16212B',
    borderColor: 'rgba(155, 190, 210, 0.55)',
    CanvasComp: TalentCanvas
  },
  {
    id: 'ecosystem',
    index: '04 / 04',
    title: 'ECOSYSTEM',
    lead: 'Connections becoming global impact.',
    desc: 'Harmonizing institutional capital, national research laboratories, and sovereign enterprises into one coherent global expansion corridor.',
    tag: 'GLOBAL CORRIDOR',
    icon: Globe,
    bgRest: '#0D151C',
    bgActive: '#12202A',
    borderColor: 'rgba(200, 226, 239, 0.65)',
    CanvasComp: EcosystemCanvas
  }
];

function Ecosystem({ onOpenContact }) {
  const [activePanel, setActivePanel] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHoveredByUser, setIsHoveredByUser] = useState(false);
  const sectionRef = useRef(null);

  // Scroll progression chapter trigger if user is not actively hovering
  useEffect(() => {
    const handleScroll = () => {
      if (isHoveredByUser || !sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;
      if (rect.top < windowH && rect.bottom > 0) {
        const progress = Math.min(Math.max((windowH - rect.top) / (windowH + rect.height), 0), 1);
        let nextPanel = 0;
        if (progress < 0.35) nextPanel = 0;
        else if (progress < 0.55) nextPanel = 1;
        else if (progress < 0.75) nextPanel = 2;
        else nextPanel = 3;
        setActivePanel((prev) => (prev === nextPanel ? prev : nextPanel));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHoveredByUser]);

  return (
    <section
      id="ecosystem"
      ref={sectionRef}
      style={{
        paddingTop: 'calc(var(--section-spacing) * 0.95)',
        paddingBottom: 'calc(var(--section-spacing) * 1.05)',
        position: 'relative',
        background: 'linear-gradient(180deg, #090D11 0%, #0A0E12 35%, #0C1116 70%, #080B0F 100%)',
        overflow: 'hidden'
      }}
    >
      {/* Background Soft Atmospheric Graphite Field */}
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
        {/* Editorial Section Top Indicator */}
        <div className="editorial-section-header">
          <span className="editorial-index-num">02</span>
          <span className="editorial-divider-line" />
          <span>THE PILLARS // INNOVATION ARCHITECTURE</span>
        </div>

        {/* Section Headline */}
        <div style={{ maxWidth: '780px', marginBottom: '3.2rem' }}>
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
            Four foundations.<br />
            One unified intelligence ecosystem.
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.96rem',
              lineHeight: 1.7,
              color: 'var(--text-secondary)',
              fontWeight: 300,
              maxWidth: '680px'
            }}
          >
            From foundational model discovery to global sovereign deployment — our interconnected pillars empower every dimension of the artificial intelligence continuum.
          </p>
        </div>

        {/* Four-Panel Monolithic Stage */}
        <div className="four-panel-stage">
          {FOUR_PANELS.map((panel, idx) => {
            const isActive = activePanel === idx;
            const Canvas = panel.CanvasComp;
            const Icon = panel.icon;

            return (
              <div
                key={panel.id}
                className="four-panel-col"
                style={{
                  flex: isActive ? 1.18 : 0.94,
                  zIndex: isActive ? 5 : 1,
                  backgroundColor: isActive ? panel.bgActive : panel.bgRest,
                  borderRight: idx < 3 ? '1px solid rgba(60, 72, 83, 0.35)' : 'none',
                  outline: isActive ? '1px solid rgba(140, 200, 255, 0.45)' : '1px solid transparent',
                  outlineOffset: '-1px',
                  boxShadow: isActive
                    ? '0 14px 40px rgba(0, 0, 0, 0.70), 0 0 24px rgba(140, 200, 255, 0.12), inset 0 0 45px rgba(95, 141, 170, 0.12)'
                    : 'none',
                  transition: 'flex 0.55s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.45s ease, box-shadow 0.45s ease, border-color 0.45s ease, outline 0.35s ease'
                }}
                onMouseEnter={(e) => {
                  setIsHoveredByUser(true);
                  setActivePanel(idx);
                }}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  setMousePos({
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top
                  });
                }}
                onMouseLeave={() => {
                  setIsHoveredByUser(false);
                }}
                onClick={() => {
                  setActivePanel(idx);
                }}
              >
                {/* Active Top Accent Glow Line */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: isActive ? 'linear-gradient(90deg, transparent, #8CC8FF, transparent)' : 'transparent',
                    boxShadow: isActive ? '0 0 10px rgba(140, 200, 255, 0.8)' : 'none',
                    opacity: isActive ? 1 : 0,
                    transition: 'opacity 0.35s ease',
                    pointerEvents: 'none',
                    zIndex: 4
                  }}
                />

                {/* Panel Top: Chapter Index and Pill Tag */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 3 }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.70rem',
                      fontWeight: 600,
                      letterSpacing: '0.14em',
                      color: isActive ? '#C8E2EF' : '#596773',
                      transition: 'color 0.3s ease'
                    }}
                  >
                    {panel.index}
                  </span>

                  <span
                    className="editorial-pill-tag"
                    style={{
                      opacity: isActive ? 1 : 0.65,
                      borderColor: isActive ? 'rgba(155, 190, 210, 0.55)' : 'rgba(95, 141, 170, 0.2)',
                      background: isActive ? 'rgba(140, 200, 255, 0.08)' : 'transparent',
                      color: isActive ? '#E7F3FF' : 'inherit',
                      transition: 'all 0.35s ease'
                    }}
                  >
                    <Icon size={10} />
                    {panel.tag}
                  </span>
                </div>

                {/* Panel Center: Procedural Canvas Installation */}
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '240px',
                    margin: '1.4rem 0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 2
                  }}
                >
                  <Canvas isActive={isActive} mousePos={mousePos} />
                </div>

                {/* Panel Bottom: Editorial Title, Lead & Description */}
                <div style={{ zIndex: 3 }}>
                  <h3
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '1.22rem',
                      fontWeight: 700,
                      letterSpacing: '0.06em',
                      color: isActive ? '#FFFFFF' : '#AEB7C0',
                      textShadow: isActive ? '0 0 14px rgba(140, 200, 255, 0.3)' : 'none',
                      marginBottom: '0.45rem',
                      transition: 'color 0.35s ease, text-shadow 0.35s ease'
                    }}
                  >
                    {panel.title}
                  </h3>

                  <div
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.82rem',
                      fontWeight: 500,
                      color: isActive ? '#9BBED2' : '#6F7D89',
                      marginBottom: '0.75rem',
                      letterSpacing: '0.02em',
                      lineHeight: 1.4,
                      transition: 'color 0.35s ease'
                    }}
                  >
                    {panel.lead}
                  </div>

                  <p
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.78rem',
                      lineHeight: 1.6,
                      color: isActive ? 'var(--text-secondary)' : '#596773',
                      margin: 0,
                      fontWeight: 300,
                      opacity: isActive ? 1 : 0.75,
                      transition: 'all 0.35s ease'
                    }}
                  >
                    {panel.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Section Bottom Transition Bridge toward Global Network */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            marginTop: '2.4rem',
            paddingTop: '1.4rem',
            borderTop: '1px solid rgba(60, 72, 83, 0.25)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#5F8DAA',
                boxShadow: '0 0 6px #9BBED2'
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.68rem',
                letterSpacing: '0.12em',
                color: '#84929D',
                textTransform: 'uppercase'
              }}
            >
              FOUR PILLARS // CONTINUOUS FOUNDRY PROGRESSION
            </span>
          </div>

          <button
            onClick={onOpenContact}
            className="btn-ghost"
            style={{
              color: 'var(--text-primary)',
              fontSize: '0.84rem',
              fontWeight: 500,
              padding: 0
            }}
          >
            <span>Partner with the ecosystem</span>
            <ArrowRight size={14} className="arrow-icon" />
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #ecosystem h2 {
            font-size: clamp(1.9rem, 6.5vw, 2.8rem) !important;
          }
        }
        @media (max-width: 480px) {
          #ecosystem .editorial-section-header span:last-child {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}

export default React.memo(Ecosystem);
