import React, { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const NAV_ITEMS = [
  { id: 'about', label: 'About', href: '#hero' },
  { id: 'vision', label: 'Vision', href: '#vision' },
  { id: 'ecosystem', label: 'Innovation', href: '#ecosystem' },
  { id: 'impact', label: 'Impact', href: '#impact' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

export default function Navbar({ onOpenContact, onNavigate, activeSection = 'about' }) {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState(null);
  const isNavigatingRef = useRef(false);
  const navTimeoutRef = useRef(null);

  // High-performance scroll listener with requestAnimationFrame for buttery smooth transition
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const deltaY = currentScrollY - lastScrollY;

          // Hero section (Home page) height
          const heroEl = document.querySelector('#hero');
          const heroHeight = heroEl ? heroEl.offsetHeight : window.innerHeight;
          const hideThreshold = heroHeight * 0.75; // 75% of home page

          // 1. Shorten navbar into compact pill dock when scrolling down
          if (currentScrollY > 24) {
            setScrolled(true);
          } else if (currentScrollY < 12) {
            setScrolled(false);
            setVisible(true); // Always full header and visible at the very top
          }

          // 2. Hide / Show dynamics
          if (!isNavigatingRef.current) {
            if (currentScrollY > hideThreshold) {
              if (deltaY > 1.5) {
                // Scrolling down past 75% of home page -> smoothly go out of screen
                setVisible(false);
              } else if (deltaY < -1) {
                // Scrolling up from anywhere -> immediately come back into view
                setVisible(true);
              }
            } else {
              // Within the first 75% of the home page -> stay visible & layered over the home page
              setVisible(true);
            }
          }

          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    if (window.__lenis) {
      window.__lenis.on('scroll', handleScroll);
    }
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (window.__lenis) {
        window.__lenis.off('scroll', handleScroll);
      }
      if (navTimeoutRef.current) clearTimeout(navTimeoutRef.current);
    };
  }, []);

  const handleLinkClick = (e, targetId) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setVisible(true);
    isNavigatingRef.current = true;
    if (navTimeoutRef.current) clearTimeout(navTimeoutRef.current);
    navTimeoutRef.current = setTimeout(() => {
      isNavigatingRef.current = false;
    }, 1600);

    if (onNavigate) {
      onNavigate(targetId);
    } else {
      const el = document.querySelector(targetId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      style={{
        position: 'fixed',
        top: scrolled ? '16px' : '0px',
        left: 0,
        right: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
        transform: visible ? 'translateY(0)' : 'translateY(-180%)',
        opacity: visible ? 1 : 0,
        transition: visible
          ? 'transform 0.32s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease, top 0.40s cubic-bezier(0.16, 1, 0.3, 1)'
          : 'transform 0.38s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.30s ease, top 0.40s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      <div
        className="navbar-inner"
        style={{
          pointerEvents: visible ? 'auto' : 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          maxWidth: scrolled ? '468px' : '1380px',
          height: scrolled ? '46px' : '72px',
          padding: scrolled ? '3px 10px' : '0 2.5rem',
          margin: '0 auto',
          borderRadius: scrolled ? '9999px' : '0px',
          background: scrolled ? 'rgba(8, 11, 15, 0.90)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          border: scrolled ? '1px solid rgba(150, 170, 185, 0.18)' : '1px solid transparent',
          borderBottom: !scrolled ? '1px solid rgba(150, 170, 185, 0.08)' : '1px solid rgba(150, 170, 185, 0.18)',
          boxShadow: scrolled ? '0 16px 36px rgba(0, 0, 0, 0.65), 0 0 16px rgba(140, 200, 255, 0.06)' : 'none',
          transition: 'max-width 0.45s cubic-bezier(0.16, 1, 0.3, 1), height 0.45s cubic-bezier(0.16, 1, 0.3, 1), padding 0.45s cubic-bezier(0.16, 1, 0.3, 1), border-radius 0.45s cubic-bezier(0.16, 1, 0.3, 1), background 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease'
        }}
      >
        {/* Left: Brand Logo & Title (Smoothly slides and fades out into pill dock without DOM snapping) */}
        <div
          className="brand-container-wrapper"
          style={{
            width: scrolled ? '0px' : '250px',
            maxWidth: scrolled ? '0px' : '250px',
            opacity: scrolled ? 0 : 1,
            transform: scrolled ? 'translateX(-20px) scale(0.88)' : 'translateX(0) scale(1)',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            flexShrink: 0,
            whiteSpace: 'nowrap',
            pointerEvents: scrolled ? 'none' : 'auto',
            transition: 'width 0.65s cubic-bezier(0.16, 1, 0.3, 1), max-width 0.65s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1), transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          <a
            href="#hero"
            onClick={(e) => handleLinkClick(e, '#hero')}
            className="brand-container"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              textDecoration: 'none',
              color: 'inherit',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            {/* Official Project Logo — Crisp Black & White */}
            <img
              src="/assets/logo.png"
              alt="Global AI Valley"
              style={{
                width: '26px',
                height: '26px',
                borderRadius: '6px',
                objectFit: 'contain',
                flexShrink: 0,
                transition: 'transform 0.25s ease, opacity 0.25s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            />

            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.82rem',
                fontWeight: 600,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'var(--text-primary)'
              }}
            >
              GLOBAL AI VALLEY
            </span>
          </a>
        </div>

        {/* Center/Docked Navigation:
            In compact mode, contains the Logo directly before About, followed by all nav buttons.
            Continuous spring/ease animations guarantee zero jitter when scrolling down or up.
        */}
        <div
          className="desktop-nav"
          onMouseLeave={() => setHoveredNav(null)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: scrolled ? '0 auto' : '0 0 0 auto',
            gap: scrolled ? '4px' : '14px',
            position: 'relative',
            padding: scrolled ? '2px 4px' : '4px 6px',
            borderRadius: '999px',
            background: 'transparent',
            flexShrink: 0,
            transition: 'gap 0.65s cubic-bezier(0.16, 1, 0.3, 1), padding 0.65s cubic-bezier(0.16, 1, 0.3, 1), margin 0.65s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          {/* Logo ONLY directly before the About button when navbar gets shorter in compact dock */}
          <AnimatePresence initial={false}>
            {scrolled && (
              <motion.a
                key="dock-logo-button"
                href="#hero"
                onClick={(e) => handleLinkClick(e, '#hero')}
                initial={{ opacity: 0, scale: 0.4, width: 0, marginRight: 0 }}
                animate={{ opacity: 1, scale: 1, width: 'auto', marginRight: 6 }}
                exit={{ opacity: 0, scale: 0.4, width: 0, marginRight: 0 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                title="Global AI Valley — Return to top"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  padding: '3px 4px',
                  borderRadius: '999px',
                  flexShrink: 0,
                  overflow: 'hidden'
                }}
              >
                <img
                  src="/assets/logo.png"
                  alt="Global AI Valley"
                  style={{
                    width: '22px',
                    height: '22px',
                    borderRadius: '5px',
                    objectFit: 'contain',
                    transition: 'transform 0.25s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.12) rotate(4deg)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                  }}
                />
              </motion.a>
            )}
          </AnimatePresence>

          {/* Navigation Items (About, Vision, Innovation, Impact, Contact) */}
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            const isHovered = hoveredNav === item.id;

            return (
              <div
                key={item.id}
                onMouseEnter={() => setHoveredNav(item.id)}
                style={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: scrolled ? '5px 11px' : '7px 16px',
                  borderRadius: '999px',
                  transition: 'padding 0.65s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                {/* Floating Glassmorphic Pill on Hover */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      layoutId="navbar-hover-pill"
                      initial={{ opacity: 0, scale: 0.92 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.92 }}
                      transition={{
                        type: "spring",
                        stiffness: 420,
                        damping: 30
                      }}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: '999px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(140, 200, 255, 0.22)',
                        boxShadow: '0 0 12px rgba(140, 200, 255, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
                        backdropFilter: 'blur(12px)',
                        WebkitBackdropFilter: 'blur(12px)',
                        pointerEvents: 'none',
                        zIndex: 0
                      }}
                    />
                  )}
                </AnimatePresence>

                {item.isAction ? (
                  <button
                    onClick={onOpenContact}
                    className={`nav-link ${isActive ? 'nav-link-active' : ''}`}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: 0,
                      font: 'inherit',
                      position: 'relative',
                      zIndex: 1,
                      fontSize: scrolled ? '0.76rem' : '0.82rem',
                      color: isHovered || isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.58)',
                      textShadow: isHovered ? '0 0 14px rgba(255, 255, 255, 0.4)' : 'none',
                      transform: isHovered ? 'translateY(-1px)' : 'none',
                      transition: 'color 0.22s ease, text-shadow 0.22s ease, transform 0.22s ease, font-size 0.65s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                  >
                    {item.label}
                  </button>
                ) : (
                  <a
                    href={item.href}
                    onClick={(e) => handleLinkClick(e, item.href)}
                    className={`nav-link ${isActive ? 'nav-link-active' : ''}`}
                    style={{
                      position: 'relative',
                      zIndex: 1,
                      fontSize: scrolled ? '0.76rem' : '0.82rem',
                      color: isHovered || isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.58)',
                      textShadow: isHovered ? '0 0 14px rgba(255, 255, 255, 0.4)' : 'none',
                      transform: isHovered ? 'translateY(-1px)' : 'none',
                      transition: 'color 0.22s ease, text-shadow 0.22s ease, transform 0.22s ease, font-size 0.65s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                  >
                    {item.label}
                  </a>
                )}

                {/* Subtle Hover Shimmer Line */}
                {isHovered && !isActive && (
                  <motion.span
                    layoutId="navbar-hover-line"
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    exit={{ opacity: 0, scaleX: 0 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    style={{
                      position: 'absolute',
                      bottom: '-3px',
                      left: '20%',
                      right: '20%',
                      height: '1.2px',
                      borderRadius: '999px',
                      background: 'linear-gradient(90deg, transparent, var(--accent-ice), transparent)',
                      boxShadow: '0 0 6px var(--accent-ice)',
                      pointerEvents: 'none',
                      zIndex: 2
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile Toggle Button */}
        <button
          className="mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            color: 'var(--text-primary)',
            cursor: 'pointer',
            padding: '6px'
          }}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            top: scrolled ? '66px' : '72px',
            left: 0,
            right: 0,
            background: 'rgba(8, 11, 15, 0.96)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(150, 170, 185, 0.12)',
            padding: '2rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            zIndex: 999,
            pointerEvents: 'auto'
          }}
        >
          <a
            href="#hero"
            className="nav-link"
            style={{ fontSize: '1.1rem' }}
            onClick={(e) => handleLinkClick(e, '#hero')}
          >
            About
          </a>
          <a
            href="#vision"
            className="nav-link"
            style={{ fontSize: '1.1rem' }}
            onClick={(e) => handleLinkClick(e, '#vision')}
          >
            Vision
          </a>
          <a
            href="#ecosystem"
            className="nav-link"
            style={{ fontSize: '1.1rem' }}
            onClick={(e) => handleLinkClick(e, '#ecosystem')}
          >
            Innovation
          </a>
          <a
            href="#impact"
            className="nav-link"
            style={{ fontSize: '1.1rem' }}
            onClick={(e) => handleLinkClick(e, '#impact')}
          >
            Impact
          </a>
          <a
            href="#contact"
            className="nav-link"
            style={{ fontSize: '1.1rem' }}
            onClick={(e) => handleLinkClick(e, '#contact')}
          >
            Contact
          </a>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenContact();
            }}
            className="btn-pill-primary"
            style={{ alignSelf: 'flex-start', marginTop: '0.5rem' }}
          >
            Contact Us →
          </button>
        </div>
      )}

      {/* Responsive Styles */}
      <style>{`
        .nav-link {
          font-family: var(--font-sans);
          letter-spacing: 0.04em;
          text-decoration: none;
          position: relative;
        }
        .nav-link:hover {
          color: #ffffff;
        }
        .nav-link-active {
          color: #ffffff !important;
          font-weight: 500;
        }
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-toggle {
            display: block !important;
            flex-shrink: 0;
          }
          .navbar-inner {
            padding: 0 1.25rem !important;
            width: 100% !important;
            max-width: 100% !important;
            border-radius: 0 !important;
          }
          .brand-container-wrapper {
            width: auto !important;
            max-width: 240px !important;
            opacity: 1 !important;
            transform: none !important;
            pointer-events: auto !important;
          }
        }
        @media (max-width: 480px) {
          .navbar-inner {
            padding: 0 1rem !important;
          }
          .brand-container-wrapper {
            max-width: 190px !important;
          }
        }
      `}</style>
    </nav>
  );
}
