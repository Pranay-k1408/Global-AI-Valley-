import React, { useState, useEffect, useRef, useCallback, Suspense, lazy } from 'react';
import Lenis from 'lenis';
import { ArrowUp } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Ecosystem from './components/Ecosystem';
import Vision from './components/Vision';
import Impact from './components/Impact';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import { useScrollAnimations } from './utils/useScrollAnimations';

const ContactModal = lazy(() => import('./components/ContactModal'));

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isHomeRevealed, setIsHomeRevealed] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [initialContactPath, setInitialContactPath] = useState(null);
  const [activeSection, setActiveSection] = useState('about');
  const { scrollProgress, scrollY, scrollVelocity, scrollDirection } = useScrollAnimations();
  const lenisRef = useRef(null);

  const handleOpenContact = useCallback((pathId = null) => {
    setInitialContactPath(typeof pathId === 'string' ? pathId : null);
    setIsContactOpen(true);
  }, []);

  const handleCloseContact = useCallback(() => {
    setIsContactOpen(false);
  }, []);

  // Initialize Lenis smooth kinetic scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.05
    });

    lenisRef.current = lenis;
    window.__lenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  // Section Scroll Spy to track active navigation section
  useEffect(() => {
    const sections = [
      { id: 'about', el: document.querySelector('#hero') },
      { id: 'vision', el: document.querySelector('#vision') },
      { id: 'ecosystem', el: document.querySelector('#ecosystem') },
      { id: 'impact', el: document.querySelector('#impact') },
      { id: 'contact', el: document.querySelector('#contact') }
    ];

    const handleScrollSpy = () => {
      const scrollPos = window.scrollY + 250;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec.el && sec.el.offsetTop <= scrollPos) {
          setActiveSection(sec.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScrollSpy, { passive: true });
    handleScrollSpy();

    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, []);

  // Smooth scroll handler
  const handleNavigate = useCallback((targetSelector) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(targetSelector, {
        offset: -65,
        duration: 1.35
      });
    } else {
      const el = document.querySelector(targetSelector);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleScrollToTop = useCallback(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { duration: 1.4 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  return (
    <>
      {/* Cinematic Introductory Loading Screen — True Viewport Overlay */}
      {isLoading && (
        <LoadingScreen
          onRevealStart={() => setIsHomeRevealed(true)}
          onComplete={() => {
            setIsHomeRevealed(true);
            setIsLoading(false);
          }}
        />
      )}

      {/* Top Liquid Gold Scroll Progress Indicator — Fixed Viewport Layer */}
      <div
        className="scroll-progress-bar"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Sticky Navigation Dock — True Fixed Viewport Layer */}
      <Navbar
        onOpenContact={handleOpenContact}
        onNavigate={handleNavigate}
        activeSection={activeSection}
      />

      <div
        className="app-root"
        style={{
          minHeight: '100vh',
          position: 'relative',
          transform: isHomeRevealed ? 'none' : 'scale(0.985) translateY(12px)',
          filter: isHomeRevealed ? 'none' : 'blur(4px)',
          opacity: isHomeRevealed ? 1 : 0.85,
          transition: 'transform 1.3s cubic-bezier(0.16, 1, 0.3, 1), filter 1.05s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.95s ease'
        }}
      >
        {/* Floating Ambient Graphite Depth Drifting with Scroll */}
        <div
          className="ambient-glow-orb"
          style={{
            top: '18%',
            right: '4%',
            width: '560px',
            height: '560px',
            background: 'radial-gradient(circle, rgba(14, 19, 25, 0.50) 0%, rgba(10, 14, 18, 0.18) 50%, transparent 72%)',
            transform: `translateY(${scrollY * -0.15}px) scale(${1 + scrollVelocity * 0.015})`
          }}
        />
        <div
          className="ambient-glow-orb"
          style={{
            top: '52%',
            left: '2%',
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(12, 17, 22, 0.45) 0%, rgba(8, 11, 15, 0.15) 50%, transparent 72%)',
            transform: `translateY(${scrollY * 0.1}px) scale(${1 + scrollVelocity * 0.015})`
          }}
        />

        <main>
          {/* Cinematic Hero with Deconstructable 3D Globe, Scroll Cue & Trusted Strip */}
          <Hero
            onOpenContact={handleOpenContact}
            onNavigate={handleNavigate}
          />

          {/* Our Vision Section with Kinetic Typography */}
          <Vision />

          {/* Four-Panel Innovation & Ecosystem Section */}
          <Ecosystem onOpenContact={handleOpenContact} />

          {/* Impact — Global Network Section */}
          <Impact />

          {/* Final CTA Bar */}
          <FinalCTA onOpenContact={handleOpenContact} />
        </main>

        {/* Editorial Footer */}
        <Footer
          onOpenContact={handleOpenContact}
          onNavigate={handleNavigate}
        />
      </div>

      {/* Floating "Back to Top" Button — Fixed Viewport Layer */}
      <button
        onClick={handleScrollToTop}
        aria-label="Scroll back to top"
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 999,
          width: '42px',
          height: '42px',
          borderRadius: '50%',
          backgroundColor: 'rgba(10, 12, 15, 0.88)',
          border: '1px solid rgba(70, 81, 93, 0.6)',
          backdropFilter: 'blur(12px)',
          color: 'var(--silver-mid)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          opacity: scrollY > 400 ? 1 : 0,
          transform: scrollY > 400 ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.8)',
          pointerEvents: scrollY > 400 ? 'auto' : 'none',
          transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.6), 0 0 12px rgba(140, 200, 255, 0.08)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'rgba(140, 200, 255, 0.55)';
          e.currentTarget.style.boxShadow = '0 8px 28px rgba(0,0,0,0.8), 0 0 20px rgba(140, 200, 255, 0.2)';
          e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)';
          e.currentTarget.style.color = 'var(--accent-ice)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'rgba(70, 81, 93, 0.6)';
          e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.6), 0 0 12px rgba(140, 200, 255, 0.08)';
          e.currentTarget.style.transform = 'translateY(0) scale(1)';
          e.currentTarget.style.color = 'var(--silver-mid)';
        }}
      >
        <ArrowUp size={16} />
      </button>

      {/* Inquiry Contact Modal — Code-Split Root Viewport Layer */}
      {isContactOpen && (
        <Suspense fallback={null}>
          <ContactModal
            isOpen={isContactOpen}
            onClose={handleCloseContact}
            initialPath={initialContactPath}
          />
        </Suspense>
      )}
    </>
  );
}
