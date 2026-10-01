import React, { useRef, useEffect, useState } from 'react';

/* =========================================================================
   GLOBAL AI VALLEY — 8 CORE AI DISCIPLINES
   Concentric Typographic Stack (Exact WorldQuant Foundry Structure)
   - Exactly 8 curated technologies
   - All 8 simultaneously visible on screen without page scrolling
   - Active / Hovered discipline commands 100% opacity in crisp white
   - Non-active disciplines follow smooth opacity falloff
   - Radiating concentric dot-matrix canvas background
   - Bottom detail strip dynamically previews the active/hovered discipline
   ========================================================================= */

const AI_TECHNOLOGIES = [
  {
    id: 'ai',
    number: '01',
    title: 'ARTIFICIAL INTELLIGENCE',
    category: 'FOUNDATIONAL SYSTEMS',
    subtitle: 'REASONING FABRICS // NETWORKED COGNITION',
    lead: 'Unified reasoning fabrics bridging distributed cognitive architectures and emergent multi-agent intelligence.',
    techStack: ['Python', 'PyTorch', 'Model Reasoning', 'Neural Fabrics', 'Cognitive Agents']
  },
  {
    id: 'ml',
    number: '02',
    title: 'MACHINE LEARNING',
    category: 'STATISTICAL LEARNING',
    subtitle: 'STOCHASTIC MODELING // PREDICTIVE CERTAINTY',
    lead: 'High-dimensional data manifolds condensing into deterministic regression vectors and robust predictive models.',
    techStack: ['scikit-learn', 'PyTorch', 'Feature Manifolds', 'Stochastic Gradient', 'MLflow']
  },
  {
    id: 'dl',
    number: '03',
    title: 'DEEP LEARNING',
    category: 'NEURAL ARCHITECTURES',
    subtitle: 'HIERARCHICAL TENSORS // MULTI-LAYER LATENTS',
    lead: 'High-dimensional tensor transformations learning hierarchical latent representations across non-linear deep layers.',
    techStack: ['PyTorch', 'TensorFlow', 'CUDA', 'Backpropagation', 'Tensor Cores']
  },
  {
    id: 'genai',
    number: '04',
    title: 'GENERATIVE AI',
    category: 'SYNTHETIC SYSTEMS',
    subtitle: 'SYNTHETIC CREATION // LATENT MANIFOLDS',
    lead: 'Multimodal generative synthesis mapping continuous probability distributions into structured code, language, and physical media.',
    techStack: ['Diffusion Models', 'Transformers', 'Latent Manifolds', 'Flow Matching', 'RAG']
  },
  {
    id: 'llm',
    number: '05',
    title: 'LARGE LANGUAGE MODELS',
    category: 'FOUNDATION SCALE',
    subtitle: 'SEMANTIC SYNTHESIS // TOKEN ATTENTION',
    lead: 'Trillions of vector parameters orchestrating contextual knowledge synthesis and autoregressive token reasoning at planetary scale.',
    techStack: ['Transformers', 'Multi-Head Attention', 'Tokenization', 'Vector DBs', 'LoRA']
  },
  {
    id: 'cv',
    number: '06',
    title: 'COMPUTER VISION',
    category: 'SPATIAL INTELLIGENCE',
    subtitle: 'SPATIAL RECONSTRUCTION // SCENE UNDERSTANDING',
    lead: 'Translating unstructured photon streams into physical 3D spatial coordinate models, depth fields, and real-time semantic segmentation.',
    techStack: ['PyTorch', 'OpenCV', 'CUDA', 'Point Clouds', 'Depth Estimation', 'ONNX']
  },
  {
    id: 'robotics',
    number: '07',
    title: 'ROBOTICS',
    category: 'PHYSICAL EMBODIMENT',
    subtitle: 'PHYSICAL EMBODIMENT // KINEMATIC CONTROL',
    lead: 'Translating cognitive models into deterministic physical kinematics, multi-joint trajectories, and millisecond actuator loops.',
    techStack: ['ROS2', 'Inverse Kinematics', 'Trajectory Planning', 'Sensor Fusion', 'Actuator Control']
  },
  {
    id: 'quantum',
    number: '08',
    title: 'QUANTUM COMPUTING',
    category: 'FUTURE COMPUTATION',
    subtitle: 'SUPERPOSITION PARADIGMS // QUBIT SIMULATION',
    lead: 'Superposition and entanglement topologies unlocking exponential compute frontiers in molecular simulation and cryptographic lattice systems.',
    techStack: ['Qubits', 'Bloch Spheres', 'Superposition Circuits', 'Hamiltonian Simulation', 'Qiskit']
  }
];

// ── Unified Ice Blue & Steel Blue Palette ──
const ICE_BLUE = '#8CC8FF';
const ICE_LIGHT = '#C8E2EF';
const STEEL_BLUE = '#4682B4';
const STEEL_DIM = 'rgba(140, 200, 255, 0.35)';

function TechGraphic({ id }) {
  switch (id) {
    case 'ai':
      return (
        <svg width="100%" height="100%" viewBox="0 0 520 80" fill="none" style={{ maxWidth: '520px', overflow: 'visible' }}>
          {/* Synaptic Network Web with pulsing nodes */}
          <line x1="50" y1="40" x2="140" y2="18" stroke={STEEL_DIM} strokeWidth="1.2" strokeDasharray="4 3" />
          <line x1="50" y1="40" x2="140" y2="62" stroke={STEEL_DIM} strokeWidth="1.2" strokeDasharray="4 3" />
          <line x1="140" y1="18" x2="260" y2="40" stroke={ICE_BLUE} strokeWidth="1.8" />
          <line x1="140" y1="62" x2="260" y2="40" stroke={ICE_BLUE} strokeWidth="1.8" />
          <line x1="140" y1="18" x2="140" y2="62" stroke="rgba(140, 200, 255, 0.25)" strokeWidth="1" />
          <line x1="260" y1="40" x2="380" y2="18" stroke={ICE_BLUE} strokeWidth="1.8" />
          <line x1="260" y1="40" x2="380" y2="62" stroke={ICE_BLUE} strokeWidth="1.8" />
          <line x1="380" y1="18" x2="380" y2="62" stroke="rgba(140, 200, 255, 0.25)" strokeWidth="1" />
          <line x1="380" y1="18" x2="470" y2="40" stroke={STEEL_DIM} strokeWidth="1.2" strokeDasharray="4 3" />
          <line x1="380" y1="62" x2="470" y2="40" stroke={STEEL_DIM} strokeWidth="1.2" strokeDasharray="4 3" />
          {/* Active Synapse Nodes */}
          <circle cx="50" cy="40" r="4" fill={ICE_BLUE} className="anim-synapse" />
          <circle cx="140" cy="18" r="5" fill={ICE_LIGHT} className="anim-synapse-delay-1" />
          <circle cx="140" cy="62" r="5" fill={ICE_LIGHT} className="anim-synapse-delay-2" />
          <circle cx="260" cy="40" r="8" fill="#FFFFFF" stroke={ICE_BLUE} strokeWidth="3" className="anim-synapse-core" style={{ filter: 'drop-shadow(0 0 8px rgba(140, 200, 255, 0.9))' }} />
          <circle cx="380" cy="18" r="5" fill={ICE_LIGHT} className="anim-synapse-delay-1" />
          <circle cx="380" cy="62" r="5" fill={ICE_LIGHT} className="anim-synapse-delay-2" />
          <circle cx="470" cy="40" r="4" fill={ICE_BLUE} className="anim-synapse" />
        </svg>
      );

    case 'ml':
      return (
        <svg width="100%" height="100%" viewBox="0 0 520 80" fill="none" style={{ maxWidth: '520px', overflow: 'visible' }}>
          {/* Coordinate axes */}
          <line x1="40" y1="68" x2="480" y2="68" stroke={STEEL_DIM} strokeWidth="1" />
          <line x1="40" y1="12" x2="40" y2="68" stroke={STEEL_DIM} strokeWidth="1" />
          {[120, 200, 280, 360, 440].map(gx => (
            <line key={gx} x1={gx} y1="12" x2={gx} y2="68" stroke="rgba(140, 200, 255, 0.08)" strokeWidth="0.8" strokeDasharray="2 2" />
          ))}
          {/* Scatter Data Clusters */}
          {[
            { x: 90, y: 60, r: 3 }, { x: 130, y: 55, r: 3.5 }, { x: 170, y: 48, r: 3 },
            { x: 210, y: 42, r: 4 }, { x: 260, y: 34, r: 4.5, active: true }, { x: 310, y: 26, r: 4 },
            { x: 360, y: 20, r: 3.5 }, { x: 410, y: 16, r: 3 }, { x: 450, y: 14, r: 3 }
          ].map((pt, pi) => (
            <circle
              key={pi}
              cx={pt.x}
              cy={pt.y}
              r={pt.r}
              fill={pt.active ? '#FFFFFF' : pt.r > 3.5 ? ICE_LIGHT : ICE_BLUE}
              style={{ filter: pt.active ? 'drop-shadow(0 0 6px #8CC8FF)' : 'none' }}
              className={`anim-bar-${pi % 5}`}
            />
          ))}
          {/* Polynomial Regression Line */}
          <path
            d="M 45 66 Q 160 62 260 34 T 475 12"
            stroke={ICE_BLUE}
            strokeWidth="2.5"
            fill="none"
            className="anim-curve-flow"
          />
          {/* Gradient Descent Step Vector */}
          <line x1="230" y1="44" x2="290" y2="24" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="4 2" />
        </svg>
      );

    case 'dl':
      return (
        <svg width="100%" height="100%" viewBox="0 0 520 80" fill="none" style={{ maxWidth: '520px', overflow: 'visible' }}>
          {/* Deep Neural Matrix Columns */}
          {[60, 140, 220, 300, 380, 460].map((colX, cIdx) => (
            <g key={cIdx}>
              {[12, 28, 44, 60, 72].slice(0, cIdx === 0 || cIdx === 5 ? 3 : 5).map((nodeY, rIdx) => (
                <React.Fragment key={rIdx}>
                  {cIdx < 5 && (
                    <line
                      x1={colX}
                      y1={nodeY}
                      x2={colX + 80}
                      y2={nodeY + (rIdx % 2 === 0 ? 8 : -8)}
                      stroke="rgba(140, 200, 255, 0.16)"
                      strokeWidth="0.9"
                    />
                  )}
                  <circle
                    cx={colX}
                    cy={nodeY}
                    r={cIdx === 2 || cIdx === 3 ? 3.5 : 2.5}
                    fill={cIdx === 3 ? '#FFFFFF' : ICE_BLUE}
                    opacity={cIdx === 3 ? 1 : 0.65}
                    className={`anim-bar-${cIdx % 5}`}
                  />
                </React.Fragment>
              ))}
            </g>
          ))}
        </svg>
      );

    case 'genai':
      return (
        <svg width="100%" height="100%" viewBox="0 0 520 80" fill="none" style={{ maxWidth: '520px', overflow: 'visible' }}>
          {/* Frequency Waveform Equalizer Bars (Matching user's reference image) */}
          {[
            12, 22, 38, 48, 26, 68, 80, 52, 28, 64, 44, 18, 56, 72, 36, 60, 78, 48, 22, 54, 76, 32, 16, 42, 66, 74, 50, 28, 14
          ].map((barH, bIdx) => {
            const barX = 35 + bIdx * 16;
            const isBright = bIdx === 6 || bIdx === 13 || bIdx === 16 || bIdx === 20;
            return (
              <line
                key={bIdx}
                x1={barX}
                y1={40 - barH / 2}
                x2={barX}
                y2={40 + barH / 2}
                stroke={isBright ? '#FFFFFF' : bIdx % 2 === 0 ? ICE_BLUE : 'rgba(140, 200, 255, 0.45)'}
                strokeWidth={isBright ? '3.0' : '2.0'}
                strokeLinecap="round"
                className={`anim-bar-${bIdx % 5}`}
                style={{
                  transformOrigin: `${barX}px 40px`,
                  filter: isBright ? 'drop-shadow(0 0 5px rgba(255, 255, 255, 0.8))' : 'none'
                }}
              />
            );
          })}
        </svg>
      );

    case 'llm':
      return (
        <svg width="100%" height="100%" viewBox="0 0 520 80" fill="none" style={{ maxWidth: '520px', overflow: 'visible' }}>
          {/* Accent outer anchor dots */}
          <circle cx="20" cy="54" r="2.5" fill="rgba(140, 200, 255, 0.4)" />
          <circle cx="500" cy="54" r="2.5" fill="rgba(140, 200, 255, 0.4)" />

          {/* 6 Token Blocks matching user screenshot */}
          {[
            { id: 0, x: 42, y: 38, w: 58, h: 30 },
            { id: 1, x: 120, y: 38, w: 58, h: 30 },
            { id: 2, x: 198, y: 38, w: 58, h: 30 },
            { id: 3, x: 276, y: 38, w: 58, h: 30 },
            { id: 4, x: 354, y: 38, w: 58, h: 30 },
            { id: 5, x: 432, y: 38, w: 58, h: 30 }
          ].map((tok, i) => {
            const isAttn = i === 2 || i === 3;
            return (
              <g key={i}>
                <rect
                  x={tok.x}
                  y={tok.y}
                  width={tok.w}
                  height={tok.h}
                  rx="6"
                  fill={isAttn ? 'rgba(140, 200, 255, 0.22)' : 'rgba(18, 28, 40, 0.85)'}
                  stroke={isAttn ? '#FFFFFF' : 'rgba(140, 200, 255, 0.55)'}
                  strokeWidth={isAttn ? '1.8' : '1.2'}
                  className={isAttn ? 'token-active-pulse' : ''}
                />
              </g>
            );
          })}

          {/* Curved Attention Arcs matching user screenshot */}
          {/* Arc 0-1 */}
          <path
            d="M 71 38 Q 110 12 145 36"
            stroke="rgba(140, 200, 255, 0.7)"
            strokeWidth="1.5"
            strokeDasharray="4 3"
            fill="none"
            className="arc-stream"
          />
          <path d="M 141 30 L 146 36 L 138 37" fill="none" stroke="rgba(140, 200, 255, 0.7)" strokeWidth="1.5" />

          {/* Arc 1-2 */}
          <path
            d="M 149 38 Q 188 12 223 36"
            stroke="rgba(140, 200, 255, 0.7)"
            strokeWidth="1.5"
            strokeDasharray="4 3"
            fill="none"
          />
          <path d="M 219 30 L 224 36 L 216 37" fill="none" stroke="rgba(140, 200, 255, 0.7)" strokeWidth="1.5" />

          {/* Arc 2-3: SOLID GLOWING ACTIVE ATTENTION ARC */}
          <path
            d="M 227 38 Q 266 8 305 38"
            stroke="#FFFFFF"
            strokeWidth="2.2"
            fill="none"
            style={{ filter: 'drop-shadow(0 0 6px rgba(140, 200, 255, 0.9))' }}
            className="arc-active-glow"
          />

          {/* Arc 3-4 */}
          <path
            d="M 305 38 Q 344 12 379 36"
            stroke="rgba(140, 200, 255, 0.7)"
            strokeWidth="1.5"
            strokeDasharray="4 3"
            fill="none"
          />
          <path d="M 375 30 L 380 36 L 372 37" fill="none" stroke="rgba(140, 200, 255, 0.7)" strokeWidth="1.5" />

          {/* Arc 4-5 */}
          <path
            d="M 383 38 Q 422 12 457 36"
            stroke="rgba(140, 200, 255, 0.7)"
            strokeWidth="1.5"
            strokeDasharray="4 3"
            fill="none"
          />
          <path d="M 453 30 L 458 36 L 450 37" fill="none" stroke="rgba(140, 200, 255, 0.7)" strokeWidth="1.5" />
        </svg>
      );

    case 'cv':
      return (
        <svg width="100%" height="100%" viewBox="0 0 520 80" fill="none" style={{ maxWidth: '520px', overflow: 'visible' }}>
          {/* Precision Viewfinder Reticle Corners */}
          <path d="M 60 18 L 40 18 L 40 38" stroke={ICE_BLUE} strokeWidth="2.5" />
          <path d="M 60 62 L 40 62 L 40 42" stroke={ICE_BLUE} strokeWidth="2.5" />
          <path d="M 460 18 L 480 18 L 480 38" stroke={ICE_BLUE} strokeWidth="2.5" />
          <path d="M 460 62 L 480 62 L 480 42" stroke={ICE_BLUE} strokeWidth="2.5" />

          {/* 3D Perspective Bounding Box */}
          <rect x="180" y="16" width="160" height="48" stroke="rgba(140, 200, 255, 0.45)" strokeWidth="1.5" fill="rgba(140, 200, 255, 0.04)" rx="2" />
          <line x1="180" y1="16" x2="205" y2="6" stroke="rgba(140, 200, 255, 0.45)" strokeWidth="1.2" />
          <line x1="340" y1="16" x2="365" y2="6" stroke="rgba(140, 200, 255, 0.45)" strokeWidth="1.2" />
          <line x1="205" y1="6" x2="365" y2="6" stroke="rgba(140, 200, 255, 0.45)" strokeWidth="1.2" />
          <line x1="340" y1="64" x2="365" y2="54" stroke="rgba(140, 200, 255, 0.45)" strokeWidth="1.2" />
          <line x1="365" y1="6" x2="365" y2="54" stroke="rgba(140, 200, 255, 0.45)" strokeWidth="1.2" />

          {/* Point cloud points */}
          <circle cx="210" cy="30" r="1.8" fill={ICE_BLUE} />
          <circle cx="250" cy="24" r="2.2" fill={ICE_LIGHT} />
          <circle cx="290" cy="45" r="2" fill={ICE_BLUE} />
          <circle cx="320" cy="32" r="2.2" fill="#FFFFFF" />

          {/* Sweeping laser scanning beam */}
          <line x1="160" y1="40" x2="360" y2="40" stroke="#FFFFFF" strokeWidth="2" className="anim-laser-sweep" style={{ filter: 'drop-shadow(0 0 6px rgba(140, 200, 255, 0.9))' }} />
        </svg>
      );

    case 'robotics':
      return (
        <svg width="100%" height="100%" viewBox="0 0 520 80" fill="none" style={{ maxWidth: '520px', overflow: 'visible' }}>
          {/* Base Mount */}
          <rect x="50" y="58" width="40" height="12" fill={STEEL_DIM} rx="2" stroke="rgba(140, 200, 255, 0.5)" strokeWidth="1" />
          <circle cx="70" cy="58" r="6" fill={ICE_BLUE} stroke="#FFFFFF" strokeWidth="2" />
          {/* Segment 1 */}
          <line x1="70" y1="58" x2="190" y2="28" stroke={ICE_BLUE} strokeWidth="4.5" strokeLinecap="round" />
          {/* Joint 2 (Elbow) */}
          <circle cx="190" cy="28" r="8" fill={ICE_LIGHT} stroke={ICE_BLUE} strokeWidth="2.5" />
          {/* Articulated Forearm Segment flexing */}
          <g className="anim-robot-flex">
            <line x1="190" y1="28" x2="340" y2="44" stroke={ICE_BLUE} strokeWidth="3.5" strokeLinecap="round" />
            <circle cx="340" cy="44" r="6" fill={ICE_BLUE} stroke="#FFFFFF" strokeWidth="1.8" />
            {/* End Effector Gripper Claws */}
            <path d="M 340 44 L 385 32 M 340 44 L 385 56" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="385" cy="32" r="3" fill={ICE_BLUE} />
            <circle cx="385" cy="56" r="3" fill={ICE_BLUE} />
          </g>
          {/* Trajectory Guide Arcs */}
          <path d="M 340 22 C 370 28, 410 44, 440 44" stroke="rgba(140, 200, 255, 0.35)" strokeWidth="1.2" strokeDasharray="4 3" fill="none" />
        </svg>
      );

    case 'quantum':
      return (
        <svg width="100%" height="100%" viewBox="0 0 520 80" fill="none" style={{ maxWidth: '520px', overflow: 'visible' }}>
          {/* Main sphere wireframe */}
          <circle cx="260" cy="40" r="32" stroke="rgba(140, 200, 255, 0.45)" strokeWidth="1.2" />
          <ellipse cx="260" cy="40" rx="32" ry="11" stroke="rgba(140, 200, 255, 0.35)" strokeWidth="1.2" strokeDasharray="4 3" />
          <ellipse cx="260" cy="40" rx="11" ry="32" stroke="rgba(140, 200, 255, 0.25)" strokeWidth="1" strokeDasharray="3 3" />
          {/* North and South Pole states */}
          <line x1="260" y1="4" x2="260" y2="76" stroke={STEEL_BLUE} strokeWidth="1.5" />
          <text x="260" y="5" fill="#FFFFFF" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">|0⟩</text>
          <text x="260" y="80" fill="#FFFFFF" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">|1⟩</text>
          {/* Rotating Precessing State Vector Psi */}
          <g className="anim-psi-precess">
            <line x1="260" y1="40" x2="282" y2="20" stroke="#FFFFFF" strokeWidth="2.5" style={{ filter: 'drop-shadow(0 0 5px rgba(255, 255, 255, 0.9))' }} />
            <circle cx="282" cy="20" r="3.5" fill={ICE_BLUE} />
          </g>
          {/* Interference Wave Harmonics flanking the sphere */}
          <path d="M 60 40 Q 110 20 160 40 T 210 40" stroke="rgba(140, 200, 255, 0.35)" strokeWidth="1.5" fill="none" />
          <path d="M 310 40 Q 360 60 410 40 T 460 40" stroke="rgba(140, 200, 255, 0.35)" strokeWidth="1.5" fill="none" />
        </svg>
      );

    default:
      return null;
  }
}

function Vision() {
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const currentItem = hoveredIdx !== null ? AI_TECHNOLOGIES[hoveredIdx] : null;

  return (
    <section
      id="vision"
      style={{
        position: 'relative',
        background: 'linear-gradient(180deg, #070A0E 0%, #090D12 45%, #0B1015 100%)',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '5.2rem 0 2rem 0',
        overflow: 'hidden',
        zIndex: 2
      }}
    >
      {/* Soft atmospheric graphite depth field — supports technology visuals without competing */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '980px',
          height: '560px',
          background: 'radial-gradient(ellipse at center, rgba(14, 20, 27, 0.45) 0%, rgba(9, 13, 18, 0.18) 55%, transparent 75%)',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />

      {/* ── STAGE TOP: Architectural Header ── */}
      <div className="container" style={{ position: 'relative', zIndex: 5, width: '100%' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            paddingBottom: '0.85rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '0.66rem', fontFamily: 'monospace', color: ICE_BLUE, letterSpacing: '0.16em', fontWeight: 600 }}>
              01
            </span>
            <span style={{ width: '1px', height: '10px', backgroundColor: 'rgba(255, 255, 255, 0.15)' }} />
            <span style={{ fontSize: '0.66rem', fontFamily: 'monospace', color: '#84929D', letterSpacing: '0.14em' }}>
              OUR VISION // 8 CORE AI ENGINEERING DISCIPLINES
            </span>
          </div>
        </div>
      </div>

      {/* ── STAGE CENTER: Concentric Technology Stack with Silky-Smooth Grid Accordion ── */}
      <div
        style={{
          position: 'relative',
          zIndex: 5,
          width: '100%',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0.15rem 0'
        }}
      >
        <div
          onMouseLeave={() => setHoveredIdx(null)}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            maxWidth: '1360px',
            gap: hoveredIdx === null ? 'clamp(6px, 1.2vh, 14px)' : 'clamp(2px, 0.6vh, 6px)',
            transition: 'gap 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          {AI_TECHNOLOGIES.map((item, idx) => {
            const isHero = hoveredIdx === idx;

            // When nothing is hovered: all items are crisp, balanced, and normal
            // When an item is hovered: that item highlights and expands, while others smoothly fade
            let opacity = 0.78;
            let scale = 1.0;

            if (hoveredIdx !== null) {
              if (isHero) {
                opacity = 1.0;
                scale = 1.03;
              } else {
                const diff = Math.abs(idx - hoveredIdx);
                if (diff === 1) {
                  opacity = 0.46;
                  scale = 0.99;
                } else if (diff === 2) {
                  opacity = 0.32;
                  scale = 0.98;
                } else {
                  opacity = 0.20;
                  scale = 0.97;
                }
              }
            }

            return (
              <div
                key={item.id}
                data-idx={idx}
                onClick={() => setHoveredIdx(idx)}
                onMouseEnter={() => setHoveredIdx(idx)}
                style={{
                  position: 'relative',
                  cursor: 'pointer',
                  textAlign: 'center',
                  width: '100%',
                  padding: hoveredIdx === null ? 'clamp(4px, 0.8vh, 8px) 1.5rem' : 'clamp(3px, 0.6vh, 6px) 1.5rem',
                  opacity,
                  transform: `scale(${scale}) translateZ(0)`,
                  willChange: 'transform, opacity, padding',
                  transition: 'opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1), transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), padding 0.3s ease'
                }}
              >
                {/* 1. Specialized Visual Graphic (Only expands when hovered) */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateRows: isHero ? '1fr' : '0fr',
                    opacity: isHero ? 1 : 0,
                    transition: 'grid-template-rows 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    pointerEvents: isHero ? 'auto' : 'none'
                  }}
                >
                  <div style={{ overflow: 'hidden' }}>
                    <div
                      style={{
                        height: 'clamp(62px, 10vh, 80px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        marginBottom: '4px'
                      }}
                    >
                      <TechGraphic id={item.id} />
                    </div>
                  </div>
                </div>

                {/* 2. Focused Technology Title (Numbers removed as requested) */}
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <h2
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: isHero
                        ? 'clamp(1.4rem, 3.3vw, 2.9rem)'
                        : 'clamp(1.15rem, 2.7vw, 2.45rem)',
                      fontWeight: isHero ? 800 : 700,
                      letterSpacing: isHero ? '-0.025em' : '-0.015em',
                      textTransform: 'uppercase',
                      lineHeight: 1.1,
                      color: isHero
                        ? '#FFFFFF'
                        : hoveredIdx === null
                        ? 'rgba(235, 242, 250, 0.88)'
                        : 'rgba(215, 225, 235, 0.65)',
                      textShadow: isHero
                        ? '0 0 24px rgba(140, 200, 255, 0.55), 0 0 50px rgba(70, 130, 180, 0.28)'
                        : 'none',
                      margin: 0,
                      userSelect: 'none',
                      whiteSpace: 'nowrap',
                      transition: 'color 0.25s ease, text-shadow 0.3s ease, font-size 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                  >
                    {item.title}
                  </h2>
                </div>

                {/* 3. Editorial Lead Description + Tech Stack Badges (Only expands when hovered) */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateRows: isHero ? '1fr' : '0fr',
                    opacity: isHero ? 1 : 0,
                    transition: 'grid-template-rows 0.32s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
                    pointerEvents: isHero ? 'auto' : 'none'
                  }}
                >
                  <div style={{ overflow: 'hidden' }}>
                    <div style={{ paddingTop: '6px' }}>
                      <p
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: 'clamp(0.82rem, 1.25vw, 0.94rem)',
                          color: 'rgba(215, 232, 248, 0.88)',
                          fontWeight: 300,
                          lineHeight: 1.45,
                          maxWidth: '680px',
                          margin: '0 auto',
                          letterSpacing: '0.015em'
                        }}
                      >
                        {item.lead}
                      </p>

                      {/* Clear Technical Tags for instant understanding */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexWrap: 'wrap',
                          gap: '6px',
                          marginTop: '8px'
                        }}
                      >
                        {item.techStack.map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              padding: '2px 9px',
                              fontSize: '0.64rem',
                              fontFamily: 'monospace',
                              letterSpacing: '0.08em',
                              color: ICE_LIGHT,
                              backgroundColor: 'rgba(140, 200, 255, 0.08)',
                              border: '1px solid rgba(140, 200, 255, 0.22)',
                              borderRadius: '999px',
                              textTransform: 'uppercase'
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .hidden-mobile {
            display: none !important;
          }
        }

        /* Vision section mobile responsive */
        @media (max-width: 768px) {
          #vision {
            padding: 4rem 0 1.5rem 0 !important;
          }
        }

        @media (max-width: 480px) {
          #vision {
            padding: 3.5rem 0 1rem 0 !important;
          }
          /* Allow titles to wrap on very small phones */
          #vision h2 {
            white-space: normal !important;
            font-size: clamp(1.1rem, 5.5vw, 1.9rem) !important;
          }
        }

        /* Continuous CSS GPU Keyframe Animations */
        @keyframes arcStream {
          0% { stroke-dashoffset: 40; }
          100% { stroke-dashoffset: -40; }
        }
        .arc-stream {
          animation: arcStream 4s linear infinite;
        }

        @keyframes activeArcGlow {
          0%, 100% { stroke: #FFFFFF; filter: drop-shadow(0 0 6px rgba(140, 200, 255, 0.9)); }
          50% { stroke: #8CC8FF; filter: drop-shadow(0 0 14px rgba(200, 226, 239, 1)); }
        }
        .arc-active-glow {
          animation: activeArcGlow 2.5s ease-in-out infinite;
        }

        @keyframes tokenActivePulse {
          0%, 100% { stroke: #FFFFFF; filter: drop-shadow(0 0 4px rgba(140, 200, 255, 0.6)); }
          50% { stroke: #8CC8FF; filter: drop-shadow(0 0 10px rgba(140, 200, 255, 0.9)); }
        }
        .token-active-pulse {
          animation: tokenActivePulse 2s ease-in-out infinite;
        }

        @keyframes barBounce0 { 0%, 100% { transform: scaleY(0.4); } 50% { transform: scaleY(1.15); } }
        @keyframes barBounce1 { 0%, 100% { transform: scaleY(1.1); } 50% { transform: scaleY(0.3); } }
        @keyframes barBounce2 { 0%, 100% { transform: scaleY(0.5); } 50% { transform: scaleY(1.2); } }
        @keyframes barBounce3 { 0%, 100% { transform: scaleY(0.9); } 50% { transform: scaleY(0.4); } }
        @keyframes barBounce4 { 0%, 100% { transform: scaleY(0.3); } 50% { transform: scaleY(1.05); } }
        .anim-bar-0 { animation: barBounce0 1.2s ease-in-out infinite; }
        .anim-bar-1 { animation: barBounce1 1.4s ease-in-out infinite; }
        .anim-bar-2 { animation: barBounce2 1.1s ease-in-out infinite; }
        .anim-bar-3 { animation: barBounce3 1.5s ease-in-out infinite; }
        .anim-bar-4 { animation: barBounce4 1.3s ease-in-out infinite; }

        @keyframes laserSweep {
          0%, 100% { transform: translateY(-16px); opacity: 0.6; }
          50% { transform: translateY(16px); opacity: 1; }
        }
        .anim-laser-sweep {
          animation: laserSweep 2.2s ease-in-out infinite;
        }

        @keyframes synPulse {
          0%, 100% { opacity: 0.5; transform: scale(0.9); }
          50% { opacity: 1; transform: scale(1.15); filter: drop-shadow(0 0 6px #8CC8FF); }
        }
        .anim-synapse {
          animation: synPulse 2s ease-in-out infinite;
        }
        .anim-synapse-delay-1 {
          animation: synPulse 2s ease-in-out 0.4s infinite;
        }
        .anim-synapse-delay-2 {
          animation: synPulse 2s ease-in-out 0.8s infinite;
        }
        .anim-synapse-core {
          animation: synPulse 1.8s ease-in-out infinite;
        }

        @keyframes robotFlex {
          0%, 100% { transform: rotate(-5deg); transform-origin: 190px 28px; }
          50% { transform: rotate(7deg); transform-origin: 190px 28px; }
        }
        .anim-robot-flex {
          animation: robotFlex 3s ease-in-out infinite;
        }

        @keyframes psiPrecess {
          0%, 100% { transform: rotate(-14deg); transform-origin: 260px 40px; }
          50% { transform: rotate(18deg); transform-origin: 260px 40px; }
        }
        .anim-psi-precess {
          animation: psiPrecess 2.8s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}

export default React.memo(Vision);
