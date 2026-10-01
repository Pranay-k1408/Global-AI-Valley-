import React, { useState, useEffect, useRef } from 'react';
import { X, ArrowRight, CheckCircle, Building2, FlaskConical, Rocket, GraduationCap, DollarSign } from 'lucide-react';

const PATHS = [
  { id: 'partner',   icon: Building2,    label: 'Partner With Us',    sub: 'Enterprise, government & institution partnerships' },
  { id: 'research',  icon: FlaskConical, label: 'Research Inquiry',   sub: 'Academic collaboration & joint research' },
  { id: 'startup',   icon: Rocket,       label: 'Startup Program',    sub: 'Incubation, acceleration & scaling support' },
  { id: 'talent',    icon: GraduationCap,label: 'Join the Network',   sub: 'Researcher, engineer & innovator placement' },
  { id: 'invest',    icon: DollarSign,   label: 'Investment & Capital',sub: 'Venture, impact investing & ecosystem funding' },
];

const INP = {
  width:'100%', backgroundColor:'rgba(11,15,20,0.85)',
  border:'1px solid rgba(150,170,185,0.13)', borderRadius:'3px',
  padding:'0.7rem 0.9rem', color:'#fff', fontSize:'0.875rem',
  fontFamily:'var(--font-sans)', outline:'none',
  transition:'border-color 0.25s ease',
};
const LBL = {
  display:'block', fontFamily:'var(--font-sans)', fontSize:'0.62rem',
  fontWeight:600, letterSpacing:'0.14em', textTransform:'uppercase',
  color:'var(--text-muted)', marginBottom:'0.4rem',
};

export default function ContactModal({ isOpen, onClose, initialPath = null }) {
  const [step, setStep] = useState(initialPath ? 'form' : 'paths'); // 'paths' | 'form' | 'done'
  const [selectedPath, setSelectedPath] = useState(initialPath || null);
  const [form, setForm] = useState({ name:'', email:'', org:'', message:'' });
  const overlayRef = useRef(null);
  const panelRef = useRef(null);

  // Sync initialPath when opening
  useEffect(() => {
    if (isOpen && initialPath) {
      setSelectedPath(initialPath);
      setStep('form');
    }
  }, [isOpen, initialPath]);

  // Lock body scroll
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) {
      window.addEventListener('keydown', onKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  // Reset on close
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => { setStep('paths'); setSelectedPath(null); setForm({ name:'',email:'',org:'',message:'' }); }, 420);
    }
  }, [isOpen]);

  const handleSelectPath = (pathId) => {
    setSelectedPath(pathId);
    setStep('form');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStep('done');
  };

  if (!isOpen) return null;

  const path = PATHS.find(p => p.id === selectedPath);

  return (
    <>
      {/* Backdrop */}
      <div
        ref={overlayRef}
        onClick={onClose}
        style={{
          position:'fixed', inset:0, zIndex:9998,
          backgroundColor:'rgba(5,7,10,0.78)',
          backdropFilter:'blur(14px)', WebkitBackdropFilter:'blur(14px)',
          animation:'fadeInBD 0.35s ease forwards',
        }}
      />

      {/* Page-Turn Panel — slides in from the left */}
      <div
        ref={panelRef}
        className="contact-panel"
        onClick={e => e.stopPropagation()}
        style={{
          position:'fixed', top:0, left:0, bottom:0,
          width:'clamp(320px,42vw,580px)',
          zIndex:9999,
          backgroundColor:'#080C11',
          borderRight:'1px solid rgba(150,170,185,0.1)',
          boxShadow:'8px 0 60px rgba(0,0,0,0.75), 0 0 40px rgba(140,200,255,0.04)',
          display:'flex', flexDirection:'column',
          animation:'slideInLeft 0.55s cubic-bezier(0.16,1,0.3,1) forwards',
          overflowY:'auto',
        }}
      >
        {/* Header bar */}
        <div style={{
          display:'flex', alignItems:'center', justifyContent:'space-between',
          padding:'1.6rem 2rem 1.4rem',
          borderBottom:'1px solid rgba(150,170,185,0.08)',
          flexShrink:0,
        }}>
          <div style={{ display:'flex', alignItems:'center', gap:'0.6rem' }}>
            <span style={{
              fontFamily:'var(--font-sans)', fontSize:'0.62rem',
              letterSpacing:'0.22em', textTransform:'uppercase',
              color:'var(--accent-ice)', fontWeight:600,
            }}>Global AI Valley</span>
            <span style={{ width:'18px', height:'1px', backgroundColor:'rgba(140,200,255,0.25)', display:'inline-block' }}/>
            <span style={{
              fontFamily:'var(--font-sans)', fontSize:'0.62rem',
              letterSpacing:'0.18em', textTransform:'uppercase',
              color:'var(--text-subtle)',
            }}>Connect</span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{ background:'none', border:'none', color:'var(--text-muted)', cursor:'pointer', padding:'4px', transition:'color 0.2s ease', lineHeight:1 }}
            onMouseEnter={e => e.currentTarget.style.color='#fff'}
            onMouseLeave={e => e.currentTarget.style.color='var(--text-muted)'}
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div style={{ flex:1, padding:'2.2rem 2rem', position:'relative' }}>

          {/* ── Step 1: Path Selection ── */}
          {step === 'paths' && (
            <div style={{ animation:'fadeUp 0.4s ease forwards' }}>
              <h2 className="serif-title" style={{ fontSize:'clamp(1.6rem,3vw,2.1rem)', marginBottom:'0.6rem' }}>
                How can we help?
              </h2>
              <p style={{ fontFamily:'var(--font-sans)', fontSize:'0.84rem', color:'var(--text-secondary)', lineHeight:1.7, marginBottom:'2rem', fontWeight:300 }}>
                Select the path that best describes your interest.
              </p>

              <div style={{ display:'flex', flexDirection:'column', gap:'0.6rem' }}>
                {PATHS.map((p, i) => {
                  const Icon = p.icon;
                  return (
                    <button
                      key={p.id}
                      onClick={() => handleSelectPath(p.id)}
                      style={{
                        display:'flex', alignItems:'center', gap:'1.1rem',
                        padding:'1.05rem 1.2rem',
                        background:'rgba(12,17,22,0.6)',
                        border:'1px solid rgba(150,170,185,0.1)',
                        borderRadius:'4px', cursor:'pointer', textAlign:'left',
                        color:'var(--text-primary)',
                        transition:'all 0.3s cubic-bezier(0.16,1,0.3,1)',
                        animation:`fadeUp 0.45s ${i * 0.06}s ease both`,
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.borderColor='rgba(140,200,255,0.35)';
                        e.currentTarget.style.background='rgba(16,22,30,0.88)';
                        e.currentTarget.style.transform='translateX(4px)';
                        e.currentTarget.style.boxShadow='0 8px 28px rgba(0,0,0,0.55), 0 0 18px rgba(140,200,255,0.06)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.borderColor='rgba(150,170,185,0.1)';
                        e.currentTarget.style.background='rgba(12,17,22,0.6)';
                        e.currentTarget.style.transform='translateX(0)';
                        e.currentTarget.style.boxShadow='none';
                      }}
                    >
                      <div style={{
                        width:'36px', height:'36px', borderRadius:'3px',
                        backgroundColor:'rgba(140,200,255,0.07)',
                        border:'1px solid rgba(140,200,255,0.14)',
                        display:'flex', alignItems:'center', justifyContent:'center',
                        flexShrink:0,
                      }}>
                        <Icon size={15} color="var(--accent-ice)" />
                      </div>
                      <div style={{ flex:1 }}>
                        <div style={{ fontFamily:'var(--font-sans)', fontSize:'0.86rem', fontWeight:500, marginBottom:'0.18rem' }}>{p.label}</div>
                        <div style={{ fontFamily:'var(--font-sans)', fontSize:'0.73rem', color:'var(--text-muted)', letterSpacing:'0.02em' }}>{p.sub}</div>
                      </div>
                      <ArrowRight size={14} color="var(--text-subtle)" />
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── Step 2: Form ── */}
          {step === 'form' && path && (
            <div style={{ animation:'fadeUp 0.38s ease forwards' }}>
              <button
                onClick={() => setStep('paths')}
                style={{ background:'none', border:'none', cursor:'pointer', color:'var(--text-muted)', fontFamily:'var(--font-sans)', fontSize:'0.72rem', letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:'1.6rem', padding:0, display:'flex', alignItems:'center', gap:'6px', transition:'color 0.2s ease' }}
                onMouseEnter={e => e.currentTarget.style.color='var(--accent-ice)'}
                onMouseLeave={e => e.currentTarget.style.color='var(--text-muted)'}
              >
                ← Back
              </button>

              <div style={{ display:'flex', alignItems:'center', gap:'0.8rem', marginBottom:'1rem' }}>
                <div style={{
                  width:'32px', height:'32px', borderRadius:'3px',
                  backgroundColor:'rgba(140,200,255,0.08)',
                  border:'1px solid rgba(140,200,255,0.18)',
                  display:'flex', alignItems:'center', justifyContent:'center',
                }}>
                  {React.createElement(path.icon, { size:14, color:'var(--accent-ice)' })}
                </div>
                <span style={{ fontFamily:'var(--font-sans)', fontSize:'0.7rem', letterSpacing:'0.16em', textTransform:'uppercase', color:'var(--accent-ice)', fontWeight:600 }}>{path.label}</span>
              </div>

              <h2 className="serif-title" style={{ fontSize:'clamp(1.5rem,2.8vw,1.95rem)', marginBottom:'0.5rem' }}>
                Tell us about yourself.
              </h2>
              <p style={{ fontFamily:'var(--font-sans)', fontSize:'0.82rem', color:'var(--text-secondary)', lineHeight:1.7, marginBottom:'2rem', fontWeight:300 }}>
                Our team reviews every inquiry personally and responds within 72 hours.
              </p>

              <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:'1.1rem' }}>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.85rem' }}>
                  <div>
                    <label style={LBL}>Full Name</label>
                    <input type="text" required placeholder="Jane Doe" value={form.name}
                      onChange={e => setForm({...form, name:e.target.value})} style={INP}
                      onFocus={e => e.target.style.borderColor='rgba(140,200,255,0.4)'}
                      onBlur={e => e.target.style.borderColor='rgba(150,170,185,0.13)'}
                    />
                  </div>
                  <div>
                    <label style={LBL}>Work Email</label>
                    <input type="email" required placeholder="jane@org.com" value={form.email}
                      onChange={e => setForm({...form, email:e.target.value})} style={INP}
                      onFocus={e => e.target.style.borderColor='rgba(140,200,255,0.4)'}
                      onBlur={e => e.target.style.borderColor='rgba(150,170,185,0.13)'}
                    />
                  </div>
                </div>
                <div>
                  <label style={LBL}>Organization / Institution</label>
                  <input type="text" placeholder="DeepTech Labs / Stanford AI / ..." value={form.org}
                    onChange={e => setForm({...form, org:e.target.value})} style={INP}
                    onFocus={e => e.target.style.borderColor='rgba(140,200,255,0.4)'}
                    onBlur={e => e.target.style.borderColor='rgba(150,170,185,0.13)'}
                  />
                </div>
                <div>
                  <label style={LBL}>Brief Message</label>
                  <textarea rows={4} placeholder="Tell us about your project, initiative or idea..." value={form.message}
                    onChange={e => setForm({...form, message:e.target.value})}
                    style={{ ...INP, resize:'none' }}
                    onFocus={e => e.target.style.borderColor='rgba(140,200,255,0.4)'}
                    onBlur={e => e.target.style.borderColor='rgba(150,170,185,0.13)'}
                  />
                </div>
                <button type="submit" className="btn-pill-primary" style={{ marginTop:'0.5rem', padding:'0.85rem' }}>
                  <span>Send Inquiry</span>
                  <ArrowRight size={14} className="arrow-icon" />
                </button>
              </form>
            </div>
          )}

          {/* ── Step 3: Done ── */}
          {step === 'done' && (
            <div style={{ animation:'fadeUp 0.4s ease forwards', textAlign:'center', paddingTop:'2rem' }}>
              <div style={{ display:'inline-flex', alignItems:'center', justifyContent:'center', width:'60px', height:'60px', borderRadius:'50%', border:'1px solid rgba(140,200,255,0.22)', backgroundColor:'rgba(140,200,255,0.06)', marginBottom:'1.5rem' }}>
                <CheckCircle size={26} color="var(--accent-ice)" />
              </div>
              <h2 className="serif-title" style={{ fontSize:'clamp(1.5rem,2.8vw,1.95rem)', marginBottom:'0.6rem' }}>
                Inquiry Received
              </h2>
              <p style={{ fontFamily:'var(--font-sans)', fontSize:'0.86rem', color:'var(--text-secondary)', lineHeight:1.72, maxWidth:'340px', margin:'0 auto 2.2rem', fontWeight:300 }}>
                Thank you for reaching out to Global AI Valley. Our partnerships team will review your details and respond within 72 hours.
              </p>
              <button onClick={onClose} className="btn-pill-primary" style={{ padding:'0.8rem 2rem' }}>
                Close Window
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ padding:'1.2rem 2rem', borderTop:'1px solid rgba(150,170,185,0.07)', flexShrink:0 }}>
          <p style={{ fontFamily:'var(--font-sans)', fontSize:'0.65rem', letterSpacing:'0.08em', color:'var(--text-subtle)', lineHeight:1.6 }}>
            Your information is handled with strict confidentiality and never shared with third parties.
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fadeInBD {
          from { opacity:0; }
          to   { opacity:1; }
        }
        @keyframes slideInLeft {
          from { transform:translateX(-100%); opacity:0; }
          to   { transform:translateX(0);     opacity:1; }
        }
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(14px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .contact-panel { transition: box-shadow 0.3s ease; }
        @media (max-width: 600px) {
          .contact-panel { width: 100vw !important; border-right: none !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          .contact-panel, .contact-panel * {
            animation: none !important;
            transition-duration: 0.01ms !important;
          }
        }
        .contact-panel input:focus,
        .contact-panel textarea:focus {
          outline: none;
          border-color: rgba(140,200,255,0.4) !important;
          box-shadow: 0 0 0 3px rgba(140,200,255,0.06);
        }
        @media (max-width: 480px) {
          .contact-panel {
            padding-left: 0 !important;
          }
        }
      `}</style>
    </>
  );
}
