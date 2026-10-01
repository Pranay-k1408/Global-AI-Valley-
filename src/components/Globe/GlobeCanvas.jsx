import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { HUBS, CONNECTIONS, latLngToVector3 } from './globeData';

export default function GlobeCanvas() {
  const mountRef = useRef(null);
  const [hoveredHub, setHoveredHub] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Full viewport dimensions
    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // Scene & Perspective Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 1000);
    camera.position.set(0, 0, 15.5);

    // High performance WebGL renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Responsive globe center offset (positioned toward the right of the hero)
    const getGlobeCenterX = () => (width > 1100 ? 3.6 : width > 768 ? 2.2 : 0.0);
    let globeBaseX = getGlobeCenterX();

    // Master Globe Group
    const globeGroup = new THREE.Group();
    globeGroup.position.set(globeBaseX, 0.1, 0);
    globeGroup.rotation.y = 1.35;
    globeGroup.rotation.x = 0.22;
    scene.add(globeGroup);

    const GLOBE_RADIUS = 4.15;

    // Controlled, cinematic lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xD6DEE5, 1.05);
    mainLight.position.set(12, 16, 14);
    scene.add(mainLight);

    const rimLight = new THREE.DirectionalLight(0x4F7891, 0.32);
    rimLight.position.set(-14, -6, -8);
    scene.add(rimLight);

    // 1. Abstract Intelligent Core (Revealed at center of deconstructed network)
    const coreGroup = new THREE.Group();
    globeGroup.add(coreGroup);

    // Dark titanium core sphere
    const coreSphereGeo = new THREE.SphereGeometry(1.9, 32, 32);
    const coreSphereMat = new THREE.MeshStandardMaterial({
      color: 0x0B1015,
      metalness: 0.9,
      roughness: 0.25,
      emissive: 0x11171D,
      emissiveIntensity: 0.3
    });
    const coreSphere = new THREE.Mesh(coreSphereGeo, coreSphereMat);
    coreGroup.add(coreSphere);

    // Inner glowing energy beacon
    const innerBeaconGeo = new THREE.SphereGeometry(1.2, 24, 24);
    const innerBeaconMat = new THREE.MeshBasicMaterial({
      color: 0x4F7891,
      transparent: true,
      opacity: 0.18
    });
    const innerBeacon = new THREE.Mesh(innerBeaconGeo, innerBeaconMat);
    coreGroup.add(innerBeacon);

    // Abstract Constellation Icosahedron Lattice
    const latticeGeo = new THREE.IcosahedronGeometry(2.05, 1);
    const latticeMat = new THREE.MeshBasicMaterial({
      color: 0x596773,
      wireframe: true,
      transparent: true,
      opacity: 0.28
    });
    const coreLattice = new THREE.Mesh(latticeGeo, latticeMat);
    coreGroup.add(coreLattice);

    // Concentric Gyro Rings
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x5F8DAA,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.24
    });
    const ring1 = new THREE.Mesh(new THREE.RingGeometry(2.4, 2.44, 48), ringMat);
    const ring2 = new THREE.Mesh(new THREE.RingGeometry(2.75, 2.79, 48), ringMat);
    ring2.rotation.x = Math.PI / 2.4;
    ring2.rotation.y = Math.PI / 6;
    const ring3 = new THREE.Mesh(new THREE.RingGeometry(3.1, 3.14, 48), ringMat);
    ring3.rotation.y = Math.PI / 2.8;

    coreGroup.add(ring1);
    coreGroup.add(ring2);
    coreGroup.add(ring3);

    // 2. Tectonic & Geographic Shards System (Full-Frustum Scatter)
    let earthShaderMat = null;
    let earthMesh = null;
    const textureLoader = new THREE.TextureLoader();

    textureLoader.load(
      '/assets/earth-night.jpg',
      (texture) => {
        texture.generateMipmaps = true;
        texture.minFilter = THREE.LinearMipmapLinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.colorSpace = THREE.SRGBColorSpace;

        // Base non-indexed sphere geometry for discrete curved surface shards
        const baseGeo = new THREE.SphereGeometry(GLOBE_RADIUS, 84, 84).toNonIndexed();
        const posAttr = baseGeo.attributes.position;
        const count = posAttr.count;

        const shardCenterArr = new Float32Array(count * 3);
        const shardDestArr = new Float32Array(count * 3);
        const shardAxisArr = new Float32Array(count * 3);
        const shardSeedArr = new Float32Array(count);
        const shardDelayArr = new Float32Array(count);
        const shardRotSpeedArr = new Float32Array(count);

        // Group into ~220 distinct organic geographic shards
        for (let i = 0; i < count; i += 3) {
          const ax = posAttr.getX(i), ay = posAttr.getY(i), az = posAttr.getZ(i);
          const bx = posAttr.getX(i + 1), by = posAttr.getY(i + 1), bz = posAttr.getZ(i + 1);
          const cx = posAttr.getX(i + 2), cy = posAttr.getY(i + 2), cz = posAttr.getZ(i + 2);

          const midX = (ax + bx + cx) / 3;
          const midY = (ay + by + cy) / 3;
          const midZ = (az + bz + cz) / 3;

          // Clustered tectonic key
          const keyX = Math.round(midX * 0.48);
          const keyY = Math.round(midY * 0.48);
          const keyZ = Math.round(midZ * 0.48);

          // Deterministic seed per cluster
          const seed = Math.abs(
            Math.sin(keyX * 12.9898 + keyY * 78.233 + keyZ * 45.164) * 43758.5453
          ) % 1;
          const seed2 = Math.abs(
            Math.sin(keyX * 39.346 + keyY * 11.135 + keyZ * 83.221) * 23421.631
          ) % 1;
          const seed3 = Math.abs(
            Math.sin(keyX * 71.189 + keyY * 93.412 + keyZ * 29.543) * 31415.926
          ) % 1;

          // Full-Viewport Organic Zero-Gravity Destination Vector:
          // Shards disperse across the entire camera frustum:
          // Notice: Globe center is at +3.6. We want many shards to travel far to the left
          // (dx: -3.5 to -10.5) to pass behind typography, some upward, downward, and depth!
          let dx = 0;
          let dy = 0;
          let dz = 0;

          const norm = new THREE.Vector3(midX, midY, midZ).normalize();

          // Left-leaning dispersal to fill hero space behind headline
          if (norm.x < 0.2) {
            dx = -3.5 - seed * 7.5; // reaches x = -0 to -7 in scene space!
          } else {
            dx = 1.5 + seed * 5.0; // rightwards expansion
          }

          // Vertical dispersal
          dy = (seed2 - 0.48) * 9.5; // y ∈ [-4.8, +4.8]

          // Depth dispersal: z reaches behind typography (negative z) or slightly forward
          dz = -6.5 + seed3 * 8.5; // z ∈ [-6.5, +2.0]

          // Add normal push
          dx += norm.x * 1.5;
          dy += norm.y * 1.2;
          dz += norm.z * 1.5;

          // Individual rotation axis & speed
          const axis = new THREE.Vector3(
            Math.sin(seed * 18.0),
            Math.cos(seed2 * 24.0),
            Math.sin(seed3 * 30.0)
          ).normalize();

          const rotSpeed = (0.6 + seed * 1.4) * (seed2 > 0.5 ? 1 : -1);
          const delay = seed * 0.10; // Immediate staggered start on initial scroll

          for (let j = 0; j < 3; j++) {
            const idx = i + j;
            shardCenterArr[idx * 3] = midX;
            shardCenterArr[idx * 3 + 1] = midY;
            shardCenterArr[idx * 3 + 2] = midZ;

            shardDestArr[idx * 3] = dx;
            shardDestArr[idx * 3 + 1] = dy;
            shardDestArr[idx * 3 + 2] = dz;

            shardAxisArr[idx * 3] = axis.x;
            shardAxisArr[idx * 3 + 1] = axis.y;
            shardAxisArr[idx * 3 + 2] = axis.z;

            shardSeedArr[idx] = seed;
            shardDelayArr[idx] = delay;
            shardRotSpeedArr[idx] = rotSpeed;
          }
        }

        baseGeo.setAttribute('aShardCenter', new THREE.BufferAttribute(shardCenterArr, 3));
        baseGeo.setAttribute('aShardDest', new THREE.BufferAttribute(shardDestArr, 3));
        baseGeo.setAttribute('aShardAxis', new THREE.BufferAttribute(shardAxisArr, 3));
        baseGeo.setAttribute('aShardSeed', new THREE.BufferAttribute(shardSeedArr, 1));
        baseGeo.setAttribute('aShardDelay', new THREE.BufferAttribute(shardDelayArr, 1));
        baseGeo.setAttribute('aShardRotSpeed', new THREE.BufferAttribute(shardRotSpeedArr, 1));

        // Full-Viewport Deconstruction Shader
        const vertexShader = `
          attribute vec3 aShardCenter;
          attribute vec3 aShardDest;
          attribute vec3 aShardAxis;
          attribute float aShardSeed;
          attribute float aShardDelay;
          attribute float aShardRotSpeed;

          uniform float uDeconstruct;
          uniform float uTime;

          varying vec2 vUv;
          varying vec3 vNormal;
          varying float vShardSeed;
          varying float vDeconstruct;
          varying vec3 vWorldPos;

          vec3 rotateOnAxis(vec3 v, vec3 axis, float angle) {
            return v * cos(angle) + cross(axis, v) * sin(angle) + axis * dot(axis, v) * (1.0 - cos(angle));
          }

          void main() {
            vUv = uv;
            vShardSeed = aShardSeed;
            vDeconstruct = uDeconstruct;

            // Individual staggered timing with immediate responsiveness
            float p = clamp((uDeconstruct - aShardDelay * 0.35) / (1.0 - aShardDelay * 0.35), 0.0, 1.0);
            // Smooth cubic easing
            float easeP = p < 0.5 ? 4.0 * p * p * p : 1.0 - pow(-2.0 * p + 2.0, 3.0) * 0.5;

            vec3 localPos = position - aShardCenter;

            // Individual zero-gravity tumble
            float rotAngle = easeP * aShardRotSpeed * 1.8 + sin(uTime * 0.8 + aShardSeed * 6.28) * 0.12 * easeP;
            vec3 rotatedLocal = rotateOnAxis(localPos, normalize(aShardAxis), rotAngle);

            // Travel to full-viewport destination
            vec3 currentCenter = aShardCenter + aShardDest * easeP;

            // Organic zero-gravity floating drift
            vec3 zeroGravityDrift = vec3(
              sin(uTime * 0.5 + aShardSeed * 10.0),
              cos(uTime * 0.6 + aShardSeed * 12.0),
              sin(uTime * 0.4 + aShardSeed * 8.0)
            ) * 0.38 * easeP;

            vec3 finalWorldPos = currentCenter + zeroGravityDrift + rotatedLocal;

            vec3 transformedNormal = rotateOnAxis(normal, normalize(aShardAxis), rotAngle);
            vNormal = normalize(normalMatrix * transformedNormal);

            vec4 worldPos = modelMatrix * vec4(finalWorldPos, 1.0);
            vWorldPos = worldPos.xyz;

            gl_Position = projectionMatrix * viewMatrix * worldPos;
          }
        `;

        const fragmentShader = `
          uniform sampler2D uTexture;
          uniform float uDeconstruct;
          uniform float uTime;
          uniform vec3 uLightPos;

          varying vec2 vUv;
          varying vec3 vNormal;
          varying float vShardSeed;
          varying float vDeconstruct;
          varying vec3 vWorldPos;

          void main() {
            vec4 tex = texture2D(uTexture, vUv);

            // ── Comprehensive Graphite + Steel Blue Remapping ───────────
            // 1. Calculate luminance across the texture
            float lum = dot(tex.rgb, vec3(0.299, 0.587, 0.114));

            // 2. Palette Definitions
            // Base Globe: Deep graphite / near-black (#0B1015 / #11171D)
            vec3 baseOceans = vec3(0.043, 0.063, 0.082);     // #0B1015
            vec3 baseGraphite = vec3(0.067, 0.090, 0.114);   // #11171D

            // Borders / Coastlines: Restrained steel-gray (#3C4853 / #4D5B67)
            vec3 borderLow = vec3(0.235, 0.282, 0.325);      // #3C4853
            vec3 borderMid = vec3(0.302, 0.357, 0.404);      // #4D5B67

            // Continents / Geographic Surface: Cool graphite/steel-gray (#596773, #6F7D89, #84929D)
            vec3 continentBase = vec3(0.349, 0.404, 0.451);  // #596773
            vec3 continentMid = vec3(0.435, 0.490, 0.537);   // #6F7D89
            vec3 continentHigh = vec3(0.518, 0.573, 0.616);  // #84929D

            // Network Connections / City Light Clusters: Steel blue (#5F8DAA / #6D9DBA)
            vec3 steelBlue = vec3(0.373, 0.553, 0.667);      // #5F8DAA
            vec3 steelBlueLight = vec3(0.427, 0.616, 0.729); // #6D9DBA

            // Nodes / Active Highlights: Light steel blue (#9BBED2 / #C8E2EF)
            vec3 nodeBlue = vec3(0.608, 0.745, 0.824);       // #9BBED2
            vec3 nodeActive = vec3(0.784, 0.886, 0.937);     // #C8E2EF

            // 3. Layer Separation & Blending
            // Base sphere / Ocean gradient (lum 0.0 -> 0.03)
            float oceanBlend = clamp(lum * 33.3, 0.0, 1.0);
            vec3 oceanColor = mix(baseOceans, baseGraphite, oceanBlend);

            // Continent / Landmass detection (subtle and integrated into the globe)
            float continentBlend = smoothstep(0.02, 0.14, lum);
            // Landmass internal topography in cool steel-gray
            float landElev = clamp((lum - 0.03) / 0.12, 0.0, 1.0);
            vec3 landColor = mix(borderLow, continentBase, landElev);
            landColor = mix(landColor, continentMid, smoothstep(0.5, 1.0, landElev));

            // Geographic sphere surface: predominantly dark graphite (70%) + subtle dark steel gray continents (20%)
            vec3 globeSurface = mix(oceanColor, landColor, continentBlend * 0.70);

            // City lights / urban nodes: Steel blue accents (8%) + Light highlights (2%)
            float cityBlend = smoothstep(0.12, 0.45, lum);
            float activeBlend = smoothstep(0.45, 0.85, lum);
            vec3 cityColor = mix(steelBlue, steelBlueLight, cityBlend);
            cityColor = mix(cityColor, nodeBlue, activeBlend);
            cityColor = mix(cityColor, nodeActive, smoothstep(0.75, 1.0, lum));

            // Composite final remapped surface (100% warm tones removed)
            vec3 remapped = mix(globeSurface, cityColor, cityBlend);

            // 4. Shading & Lighting
            vec3 lightDir = normalize(uLightPos - vWorldPos);
            float diff = max(dot(vNormal, lightDir), 0.22);
            // Land receives directional shading; city lights remain illuminated
            vec3 col = mix(globeSurface * (diff * 0.85 + 0.35), cityColor * (diff * 0.35 + 0.85), cityBlend);

            // 5. Deconstruction Glowing Fault Lines & Data Pulse
            if (vDeconstruct > 0.01) {
              vec3 steelGlow = vec3(0.373, 0.553, 0.667); // #5F8DAA steel blue

              // Shard contour rim glow
              float rim = 1.0 - max(dot(vNormal, vec3(0.0, 0.0, 1.0)), 0.0);
              float rimGlow = pow(rim, 3.0) * vDeconstruct * (0.75 + sin(uTime * 2.5 + vShardSeed * 7.0) * 0.2);
              col += steelGlow * rimGlow * 0.65;

              // City light reinforcement during deconstruction
              if (lum > 0.15) {
                col += steelGlow * (vDeconstruct * 0.22);
              }
            }

            // Alpha transparency: shards in the deep background (behind text) have subtle soft alpha
            float alpha = 1.0;
            if (vWorldPos.z < -2.0) {
              alpha = mix(1.0, 0.72, vDeconstruct);
            }

            gl_FragColor = vec4(col, alpha);
          }
        `;

        earthShaderMat = new THREE.ShaderMaterial({
          uniforms: {
            uTexture: { value: texture },
            uDeconstruct: { value: 0.0 },
            uTime: { value: 0.0 },
            uLightPos: { value: new THREE.Vector3(12, 16, 14) }
          },
          vertexShader,
          fragmentShader,
          side: THREE.DoubleSide,
          transparent: true
        });

        earthMesh = new THREE.Mesh(baseGeo, earthShaderMat);
        globeGroup.add(earthMesh);
        setIsLoaded(true);
      }
    );

    // Atmospheric Glow
    const atmosphereVertexShader = `
      varying vec3 vNormal;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const atmosphereFragmentShader = `
      varying vec3 vNormal;
      uniform float uDeconstruct;
      void main() {
        float intensity = pow(0.70 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.8);
        vec3 steelGlow = vec3(0.310, 0.471, 0.569); // #4F7891 restrained steel-blue glow
        // Atmosphere dissipates as globe dissolves into distributed field
        float alpha = intensity * (0.38 * (1.0 - uDeconstruct * 0.9));
        gl_FragColor = vec4(steelGlow, 1.0) * alpha;
      }
    `;

    const atmosphereGeo = new THREE.SphereGeometry(GLOBE_RADIUS * 1.04, 48, 48);
    const atmosphereMat = new THREE.ShaderMaterial({
      uniforms: {
        uDeconstruct: { value: 0.0 }
      },
      vertexShader: atmosphereVertexShader,
      fragmentShader: atmosphereFragmentShader,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true
    });
    const atmosphereMesh = new THREE.Mesh(atmosphereGeo, atmosphereMat);
    globeGroup.add(atmosphereMesh);

    // 3. Hub Nodes & Connective Network Filaments
    const hubMap = {};
    const hitTargets = [];
    const pulsingRings = [];
    const hubNodes = [];

    HUBS.forEach((hub, idx) => {
      const pos = latLngToVector3(hub.lat, hub.lng, GLOBE_RADIUS, THREE);
      hubMap[hub.id] = pos;

      const hubNodeGroup = new THREE.Group();
      hubNodeGroup.position.copy(pos);

      // Procedural drift destination for each node when deconstructed
      const norm = pos.clone().normalize();
      const nodeDest = new THREE.Vector3(
        norm.x < 0 ? -3.0 - (idx % 5) * 1.4 : 1.5 + (idx % 4) * 1.2,
        (idx % 6 - 2.5) * 1.3,
        -4.0 + (idx % 7) * 1.1
      );

      hubNodeGroup.userData = {
        originalPos: pos.clone(),
        destPos: nodeDest,
        hub
      };

      hubNodeGroup.quaternion.setFromUnitVectors(
        new THREE.Vector3(0, 0, 1),
        norm
      );

      // Core Marker — steel blue / active highlight
      const coreGeo = new THREE.SphereGeometry(hub.primary ? 0.09 : 0.06, 16, 16);
      const coreMat = new THREE.MeshBasicMaterial({
        color: hub.primary ? 0xC8E2EF : 0x9BBED2,
        transparent: true,
        opacity: 0.92
      });
      const coreMesh = new THREE.Mesh(coreGeo, coreMat);
      hubNodeGroup.add(coreMesh);

      // Outer Halo Ring — subtle steel blue
      const ringGeo = new THREE.RingGeometry(0.12, 0.16, 24);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x6D9DBA,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.50
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      hubNodeGroup.add(ringMesh);

      // Pulsing Wave Ring — steel blue
      const pulseGeo = new THREE.RingGeometry(0.14, 0.18, 24);
      const pulseMat = new THREE.MeshBasicMaterial({
        color: 0x5F8DAA,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.38
      });
      const pulseMesh = new THREE.Mesh(pulseGeo, pulseMat);
      hubNodeGroup.add(pulseMesh);

      pulsingRings.push({
        mesh: pulseMesh,
        speed: 0.02 + Math.random() * 0.015,
        offset: Math.random() * Math.PI
      });

      // Hit target for hover inspection
      const hitGeo = new THREE.SphereGeometry(0.55, 8, 8);
      const hitMat = new THREE.MeshBasicMaterial({ visible: false });
      const hitMesh = new THREE.Mesh(hitGeo, hitMat);
      hitMesh.userData = { hub };
      hubNodeGroup.add(hitMesh);
      hitTargets.push(hitMesh);

      globeGroup.add(hubNodeGroup);
      hubNodes.push(hubNodeGroup);
    });

    // Dynamic Network Filament Lines
    const maxLinePairs = CONNECTIONS.length;
    const linePositions = new Float32Array(maxLinePairs * 2 * 3);
    const networkLineGeo = new THREE.BufferGeometry();
    networkLineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));

    const networkLineMat = new THREE.LineBasicMaterial({
      color: 0x5F8DAA,
      transparent: true,
      opacity: 0.30,
      blending: THREE.AdditiveBlending
    });
    const networkLinesMesh = new THREE.LineSegments(networkLineGeo, networkLineMat);
    globeGroup.add(networkLinesMesh);

    // Initial Connection Arcs
    const travelers = [];
    const staticArcLines = [];

    CONNECTIONS.forEach((conn, index) => {
      const p1 = hubMap[conn.from];
      const p2 = hubMap[conn.to];
      if (!p1 || !p2) return;

      const dist = p1.distanceTo(p2);
      const mid = p1.clone().add(p2).multiplyScalar(0.5);
      const arcAltitude = GLOBE_RADIUS + dist * 0.28 + 0.3;
      mid.normalize().multiplyScalar(arcAltitude);

      const curve = new THREE.QuadraticBezierCurve3(p1, mid, p2);
      const points = curve.getPoints(40);
      const curveGeo = new THREE.BufferGeometry().setFromPoints(points);
      const curveMat = new THREE.LineBasicMaterial({
        color: 0x6D9DBA,
        transparent: true,
        opacity: 0.28,
        blending: THREE.AdditiveBlending
      });
      const arcLine = new THREE.Line(curveGeo, curveMat);
      globeGroup.add(arcLine);
      staticArcLines.push(arcLine);

      // Energy Pulse Traveler
      const travelerGeo = new THREE.SphereGeometry(0.065, 12, 12);
      const travelerMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.95
      });
      const travelerMesh = new THREE.Mesh(travelerGeo, travelerMat);
      globeGroup.add(travelerMesh);

      const glowGeo = new THREE.SphereGeometry(0.13, 12, 12);
      const glowMat = new THREE.MeshBasicMaterial({
        color: 0x4F7891,
        transparent: true,
        opacity: 0.35,
        blending: THREE.AdditiveBlending
      });
      travelerMesh.add(new THREE.Mesh(glowGeo, glowMat));

      travelers.push({
        mesh: travelerMesh,
        curve,
        progress: (index * 0.18) % 1,
        speed: 0.0022 + Math.random() * 0.0015
      });
    });

    // 4. Distributed Data Spark Cloud (600 micro points)
    const sparkCount = 550;
    const sparkGeo = new THREE.BufferGeometry();
    const sparkOrigPositions = new Float32Array(sparkCount * 3);
    const sparkCurrentPositions = new Float32Array(sparkCount * 3);
    const sparkDestOffsets = new Float32Array(sparkCount * 3);

    for (let i = 0; i < sparkCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = GLOBE_RADIUS * (0.95 + Math.random() * 0.15);

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      sparkOrigPositions[i * 3] = x;
      sparkOrigPositions[i * 3 + 1] = y;
      sparkOrigPositions[i * 3 + 2] = z;

      sparkCurrentPositions[i * 3] = x;
      sparkCurrentPositions[i * 3 + 1] = y;
      sparkCurrentPositions[i * 3 + 2] = z;

      // Disperse across entire hero
      sparkDestOffsets[i * 3] = (x < 0 ? -4.0 : 1.0) + (Math.random() - 0.7) * 8.0;
      sparkDestOffsets[i * 3 + 1] = (Math.random() - 0.5) * 9.0;
      sparkDestOffsets[i * 3 + 2] = -5.0 + Math.random() * 7.0;
    }

    sparkGeo.setAttribute('position', new THREE.BufferAttribute(sparkCurrentPositions, 3));
    const sparkMat = new THREE.PointsMaterial({
      color: 0x6F7D89,
      size: 0.045,
      transparent: true,
      opacity: 0.30,
      blending: THREE.AdditiveBlending
    });
    const sparkPoints = new THREE.Points(sparkGeo, sparkMat);
    globeGroup.add(sparkPoints);

    // 5. Interactive Deconstruction State & Physics
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0.22;
    let targetRotationY = 1.35;
    let isInteracting = false;
    let deconstructProgress = 0.0; // 0.0 (intact) -> 1.0 (fully distributed)

    const raycaster = new THREE.Raycaster();
    const mouseNorm = new THREE.Vector2(-999, -999);

    // The hero canvas listens to mouse events across the hero section
    const handleMouseMove = (event) => {
      // 1. Strict guard against navbar hover: Never trigger globe hover when cursor is in or over the navbar
      const elUnderCursor = typeof document !== 'undefined' ? document.elementFromPoint(event.clientX, event.clientY) : null;
      const isOverNavbar = event.clientY <= 85 ||
        Boolean(elUnderCursor && elUnderCursor.closest && elUnderCursor.closest('nav')) ||
        Boolean(event.target && event.target.closest && event.target.closest('nav'));

      if (isOverNavbar) {
        isInteracting = false;
        setHoveredHub(null);
        return;
      }

      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      mouseNorm.x = (x / rect.width) * 2 - 1;
      mouseNorm.y = -(y / rect.height) * 2 + 1;

      mouseX = (x / rect.width - 0.5) * 2;
      mouseY = (y / rect.height - 0.5) * 2;

      // 2. Strict 3D sphere raycasting: Only trigger when cursor is actually over the 3D globe
      raycaster.setFromCamera(mouseNorm, camera);

      // Sphere bounds around globe center (only triggers when cursor is directly over globe geometry)
      const testRadius = GLOBE_RADIUS * (isInteracting ? 1.15 : 1.02);
      const globeSphere = new THREE.Sphere(globeGroup.position, testRadius);
      const isDirectlyOverGlobe = raycaster.ray.intersectsSphere(globeSphere);

      if (isDirectlyOverGlobe) {
        isInteracting = true;

        // Raycast for Hub tooltips only when properly over the globe
        const intersects = raycaster.intersectObjects(hitTargets, true);
        if (intersects.length > 0) {
          const target = intersects[0].object;
          if (target.userData && target.userData.hub) {
            setHoveredHub(target.userData.hub);
            setTooltipPos({ x: event.clientX, y: event.clientY });
            return;
          }
        }
      } else {
        isInteracting = false;
      }

      setHoveredHub(null);
    };

    const handleMouseLeave = () => {
      isInteracting = false;
      mouseX = 0;
      mouseY = 0;
      setHoveredHub(null);
    };

    let lastScrollY = typeof window !== 'undefined' ? window.scrollY : 0;
    let scrollVelocity = 0;

    // ─── Smooth lerp targets (all driven from inside rAF, zero React re-renders) ───
    let globeScaleTarget = 1.0;
    let globeScaleCurrent = 1.0;
    let arcBrightnessTarget = 0.3;
    let arcBrightnessCurrent = 0.3;
    let activationTarget = 0.0;
    let activationCurrent = 0.0;
    let atmospherePulsePhase = 0.0;

    const handleScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY;
      lastScrollY = currentY;
      scrollVelocity = Math.min(Math.abs(delta) * 0.15, 2.5);
      targetRotationY += delta * 0.0035;
      targetRotationX += delta * 0.001;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });
    container.addEventListener('mouseleave', handleMouseLeave);

    // ─── Helper: smooth clamp ───────────────────────────────────────────────────
    const mapRange = (v, lo, hi) => Math.min(Math.max((v - lo) / (hi - lo), 0), 1);
    // Smooth cubic ease
    const ease3 = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) * 0.5;
    // Smooth quadratic ease-out
    const easeOut2 = (t) => 1 - (1 - t) * (1 - t);

    // ─── Animation Loop ─────────────────────────────────────────────────────────
    let animationFrameId;
    let isVisible = true;
    let time = 0;

    const animate = () => {
      if (!isVisible) return;
      animationFrameId = requestAnimationFrame(animate);
      time += 0.016;

      scrollVelocity *= 0.94;
      atmospherePulsePhase += 0.018;

      const scrollYPos = typeof window !== 'undefined' ? window.scrollY : 0;

      // ── PHASE BOUNDARIES (px) ──────────────────────────────────────────────
      // 1. Initial scroll initiates dramatic 3D revolving spin immediately
      const revolveP     = ease3(mapRange(scrollYPos, 0, 150));
      const approachP    = ease3(mapRange(scrollYPos, 0, 100));
      const activationP  = easeOut2(mapRange(scrollYPos, 10, 180));
      // 2. Breaking phase: shards fracture and scatter into zero gravity right on scroll start
      const deconstructP = ease3(mapRange(scrollYPos, 10, 280));
      const distributedP = mapRange(scrollYPos, 280, 500);

      // ── PHASE 1 — APPROACH ─────────────────────────────────────────────────
      globeScaleTarget = 1.0 + approachP * 0.10;
      arcBrightnessTarget = 0.18 + approachP * 0.22;

      // ── PHASE 2 — ACTIVATION ───────────────────────────────────────────────
      activationTarget = activationP;
      const atmoBaseBrightness = 0.55 + activationP * 0.2;
      const atmoPulse = Math.sin(atmospherePulsePhase) * 0.08 * activationP;

      // ── PHASE 3 — DECONSTRUCTION & ZERO-GRAVITY SHARD SCATTER ───────────────
      const targetDeconstructProgress = Math.max(isInteracting ? 1.0 : 0.0, deconstructP);
      const lerpSpeed = isInteracting ? 0.05 : 0.085;
      deconstructProgress += (targetDeconstructProgress - deconstructProgress) * lerpSpeed;

      // ── PHASE 4 — DISTRIBUTED ──────────────────────────────────────────────
      const distributedBoost = distributedP;

      // ── LERP all smooth targets ────────────────────────────────────────────
      globeScaleCurrent    += (globeScaleTarget    - globeScaleCurrent)    * 0.04;
      arcBrightnessCurrent += (arcBrightnessTarget - arcBrightnessCurrent) * 0.05;
      activationCurrent    += (activationTarget    - activationCurrent)    * 0.05;

      // ── Globe scale (Phase 1 approach) ─────────────────────────────────────
      globeGroup.scale.setScalar(globeScaleCurrent);

      // ── 1. Revolving Phase: initial scroll accelerates 3D rotation dramatically ──
      const revolveSpeed = 0.0025 + revolveP * 0.024 + scrollVelocity * 0.012;
      targetRotationY += revolveSpeed * (1.0 - deconstructProgress * 0.35);

      // ── Camera + Globe parallax ─────────────────────────────────────────────
      // Subtle camera drift upward as we scroll — creates depth
      camera.position.y = -scrollYPos * 0.0018;
      // Globe drifts gently upward and slightly left on deconstruction
      globeGroup.position.x = globeBaseX - deconstructProgress * 0.4;
      globeGroup.position.y = 0.1 - scrollYPos * 0.0015 + Math.sin(time * 0.3) * 0.04 * (1 - deconstructProgress);

      globeGroup.rotation.y += (targetRotationY + mouseX * 0.18 - globeGroup.rotation.y) * 0.04;
      globeGroup.rotation.x += (targetRotationX - mouseY * 0.14 - globeGroup.rotation.x) * 0.04;

      // ── Shader uniforms ────────────────────────────────────────────────────
      if (earthShaderMat) {
        earthShaderMat.uniforms.uDeconstruct.value = deconstructProgress;
        earthShaderMat.uniforms.uTime.value = time;
      }
      // Atmosphere: pulses on activation, fades on deconstruction
      atmosphereMat.uniforms.uDeconstruct.value = deconstructProgress;
      // Modulate atmosphere intensity through ambient light
      ambientLight.intensity = 0.8 + atmoBaseBrightness * 0.22 + atmoPulse;

      // ── Core — revealed as globe dissolves ─────────────────────────────────
      const coreScale = 0.4 + deconstructProgress * 0.65;
      coreGroup.scale.setScalar(coreScale);
      coreGroup.visible = deconstructProgress > 0.02;
      const coreSpeedMult = 1.0 + scrollVelocity * 1.5 + activationCurrent * 0.6;
      coreLattice.rotation.y += (0.008 + deconstructProgress * 0.015) * coreSpeedMult;
      coreLattice.rotation.x += 0.005 * coreSpeedMult;
      ring1.rotation.z += 0.012 * coreSpeedMult;
      ring2.rotation.y -= 0.010 * coreSpeedMult;
      ring3.rotation.x += 0.015 * coreSpeedMult;

      // ── Hub nodes ──────────────────────────────────────────────────────────
      const positions = networkLinesMesh.geometry.attributes.position.array;
      let lineIdx = 0;

      hubNodes.forEach((node) => {
        const orig = node.userData.originalPos;
        const dest = node.userData.destPos;
        const p = deconstructProgress;
        const easeP = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) * 0.5;

        node.position.copy(orig).addScaledVector(dest, easeP);

        if (deconstructProgress > 0.05) {
          // Zero-gravity drift — stronger in distributed phase
          const driftAmp = 0.15 + distributedBoost * 0.12;
          node.position.x += Math.sin(time * 0.8 + orig.x) * driftAmp * easeP;
          node.position.y += Math.cos(time * 0.7 + orig.y) * driftAmp * easeP;
        }
      });

      // ── Network filament lines ─────────────────────────────────────────────
      CONNECTIONS.forEach((conn) => {
        const n1 = hubNodes.find((n) => n.userData.hub.id === conn.from);
        const n2 = hubNodes.find((n) => n.userData.hub.id === conn.to);
        if (n1 && n2 && lineIdx < maxLinePairs * 6) {
          positions[lineIdx++] = n1.position.x;
          positions[lineIdx++] = n1.position.y;
          positions[lineIdx++] = n1.position.z;
          positions[lineIdx++] = n2.position.x;
          positions[lineIdx++] = n2.position.y;
          positions[lineIdx++] = n2.position.z;
        }
      });
      networkLinesMesh.geometry.attributes.position.needsUpdate = true;
      // Lines grow from invisible → visible during deconstruct, then strengthen at distributed
      networkLineMat.opacity = deconstructProgress * 0.38 + distributedBoost * 0.12;

      // ── Static arc curves ──────────────────────────────────────────────────
      staticArcLines.forEach((line) => {
        // Arcs brighten on approach (Phase 1), fade on deconstruction
        const arcApproach = arcBrightnessCurrent;
        const arcDecay = Math.max(0, 1.0 - deconstructProgress * 1.1);
        // Subtle activation pulse
        const pulse = Math.sin(time * 1.2 + line.uuid.charCodeAt(0) * 0.1) * 0.04 * activationCurrent;
        line.material.opacity = Math.max(0, arcApproach * arcDecay + pulse);
      });

      // ── Energy travelers ───────────────────────────────────────────────────
      travelers.forEach((t) => {
        // Speed up during activation phase
        const travelSpeed = t.speed * (1.0 + activationCurrent * 1.8 + deconstructProgress * 1.2);
        t.progress += travelSpeed;
        if (t.progress >= 1) t.progress = 0;
        const currentPos = t.curve.getPoint(t.progress);
        t.mesh.position.copy(currentPos);
        t.mesh.visible = deconstructProgress < 0.7;
        // Travelers glow brighter during activation
        t.mesh.material.opacity = 0.7 + activationCurrent * 0.25;
      });

      // ── Pulsing hub rings ──────────────────────────────────────────────────
      pulsingRings.forEach((ring) => {
        // Activation phase speeds up ring pulsing
        const ringSpeed = ring.speed * (1.0 + activationCurrent * 2.5);
        const scale = 1 + (Math.sin(time * ringSpeed * 40 + ring.offset) + 1) * (0.55 + activationCurrent * 0.3);
        ring.mesh.scale.set(scale, scale, 1);
        const ringAlpha = Math.max(0, (0.55 + activationCurrent * 0.2) - (scale - 1) * 0.45);
        ring.mesh.material.opacity = ringAlpha;
      });

      // ── Spark cloud ────────────────────────────────────────────────────────
      const sparkPos = sparkPoints.geometry.attributes.position.array;
      for (let i = 0; i < sparkCount; i++) {
        const ox = sparkOrigPositions[i * 3];
        const oy = sparkOrigPositions[i * 3 + 1];
        const oz = sparkOrigPositions[i * 3 + 2];
        const dx = sparkDestOffsets[i * 3];
        const dy = sparkDestOffsets[i * 3 + 1];
        const dz = sparkDestOffsets[i * 3 + 2];

        // During approach/activation: sparks get very subtle extra motion
        const ambientStir = activationCurrent * 0.06;
        sparkPos[i * 3]     = ox + dx * deconstructProgress + Math.sin(time * 0.6 + i) * (0.18 + ambientStir) * deconstructProgress;
        sparkPos[i * 3 + 1] = oy + dy * deconstructProgress + Math.cos(time * 0.5 + i) * (0.18 + ambientStir) * deconstructProgress;
        sparkPos[i * 3 + 2] = oz + dz * deconstructProgress;
      }
      sparkPoints.geometry.attributes.position.needsUpdate = true;
      // Sparks are barely visible pre-deconstruct, brighten through scatter
      sparkMat.opacity = 0.08 + activationCurrent * 0.06 + deconstructProgress * 0.5 + distributedBoost * 0.12;

      renderer.render(scene, camera);
    };

    animate();

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting;
        if (inView && !isVisible) {
          isVisible = true;
          cancelAnimationFrame(animationFrameId);
          animationFrameId = requestAnimationFrame(animate);
        } else if (!inView && isVisible) {
          isVisible = false;
          cancelAnimationFrame(animationFrameId);
        }
      },
      { rootMargin: '250px' }
    );
    visibilityObserver.observe(container);

    // Responsive Resize Handler
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);

      globeBaseX = getGlobeCenterX();
      globeGroup.position.x = globeBaseX;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      visibilityObserver.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      container.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);

      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'auto'
      }}
    >
      {/* Loading telemetry label */}
      {!isLoaded && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            right: '25%',
            transform: 'translate(50%, -50%)',
            color: 'var(--text-muted)',
            fontSize: '0.75rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase'
          }}
        >
          Synthesizing Global Telemetry...
        </div>
      )}



      {/* Node Tooltip on Hover */}
      {hoveredHub && (
        <div
          style={{
            position: 'fixed',
            left: `${tooltipPos.x + 14}px`,
            top: `${tooltipPos.y + 14}px`,
            background: 'rgba(8, 10, 14, 0.96)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(95, 141, 170, 0.40)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.7), 0 0 16px rgba(79, 120, 145, 0.15)',
            padding: '8px 14px',
            borderRadius: '4px',
            pointerEvents: 'none',
            zIndex: 9999
          }}
        >
          <div
            style={{
              fontSize: '0.68rem',
              fontWeight: 700,
              letterSpacing: '0.18em',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span
              style={{
                width: '5px',
                height: '5px',
                borderRadius: '50%',
                background: '#9BBED2',
                display: 'inline-block',
                boxShadow: '0 0 6px #9BBED2'
              }}
            />
            {hoveredHub.city}
          </div>
          <div
            style={{
              fontSize: '0.62rem',
              letterSpacing: '0.12em',
              color: '#6D9DBA',
              marginTop: '2px',
              fontFamily: 'var(--font-sans)',
              textTransform: 'uppercase'
            }}
          >
            {hoveredHub.role}
          </div>
        </div>
      )}
    </div>
  );
}
