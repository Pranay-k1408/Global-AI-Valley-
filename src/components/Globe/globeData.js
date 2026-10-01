// Global AI Hubs coordinates and metadata
export const HUBS = [
  {
    id: 'sf',
    city: 'SAN FRANCISCO',
    region: 'NORTH AMERICA',
    role: 'AI / FRONTIER LABS',
    lat: 37.7749,
    lng: -122.4194,
    color: '#e5a950',
    primary: true
  },
  {
    id: 'nyc',
    city: 'NEW YORK',
    region: 'NORTH AMERICA',
    role: 'AI / VENTURES & CAPITAL',
    lat: 40.7128,
    lng: -74.0060,
    color: '#e5a950',
    primary: true
  },
  {
    id: 'london',
    city: 'LONDON',
    region: 'EUROPE',
    role: 'AI / ENTERPRISE & POLICY',
    lat: 51.5074,
    lng: -0.1278,
    color: '#e5a950',
    primary: true
  },
  {
    id: 'paris',
    city: 'PARIS',
    region: 'EUROPE',
    role: 'AI / OPEN FOUNDATIONS',
    lat: 48.8566,
    lng: 2.3522,
    color: '#e5a950',
    primary: false
  },
  {
    id: 'zurich',
    city: 'ZURICH',
    region: 'EUROPE',
    role: 'AI / ROBOTICS & SYSTEMS',
    lat: 47.3769,
    lng: 8.5417,
    color: '#e5a950',
    primary: false
  },
  {
    id: 'dubai',
    city: 'DUBAI',
    region: 'MIDDLE EAST',
    role: 'AI / SOVEREIGN GOVERNANCE',
    lat: 25.2048,
    lng: 55.2708,
    color: '#e5a950',
    primary: false
  },
  {
    id: 'bangalore',
    city: 'BANGALORE',
    region: 'ASIA PACIFIC',
    role: 'AI / ENGINEERING & INNOVATION',
    lat: 12.9716,
    lng: 77.5946,
    color: '#e5a950',
    primary: true
  },
  {
    id: 'singapore',
    city: 'SINGAPORE',
    region: 'ASIA PACIFIC',
    role: 'AI / REGIONAL ECOSYSTEMS',
    lat: 1.3521,
    lng: 103.8198,
    color: '#e5a950',
    primary: true
  },
  {
    id: 'tokyo',
    city: 'TOKYO',
    region: 'ASIA PACIFIC',
    role: 'AI / HARDWARE & AGENTS',
    lat: 35.6762,
    lng: 139.6503,
    color: '#e5a950',
    primary: true
  },
  {
    id: 'sydney',
    city: 'SYDNEY',
    region: 'OCEANIA',
    role: 'AI / QUANTUM & BIO-AI',
    lat: -33.8688,
    lng: 151.2093,
    color: '#e5a950',
    primary: false
  }
];

// Corridors connecting the hubs
export const CONNECTIONS = [
  { from: 'sf', to: 'nyc' },
  { from: 'sf', to: 'london' },
  { from: 'sf', to: 'tokyo' },
  { from: 'nyc', to: 'london' },
  { from: 'london', to: 'paris' },
  { from: 'london', to: 'zurich' },
  { from: 'london', to: 'dubai' },
  { from: 'london', to: 'bangalore' },
  { from: 'dubai', to: 'bangalore' },
  { from: 'bangalore', to: 'singapore' },
  { from: 'singapore', to: 'tokyo' },
  { from: 'tokyo', to: 'sydney' }
];

export function latLngToVector3(lat, lng, radius, THREE) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  
  return new THREE.Vector3(x, y, z);
}
