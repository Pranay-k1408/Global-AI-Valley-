import React from 'react';

function Footer({ onOpenContact, onNavigate }) {
  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(targetId);
    } else {
      const el = document.querySelector(targetId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      style={{
        borderTop: '1px solid rgba(150, 170, 185, 0.08)',
        background: 'linear-gradient(180deg, #07090C 0%, #05070A 100%)',
        paddingTop: '4.5rem',
        paddingBottom: '3.5rem',
        position: 'relative'
      }}
    >
      <div className="container">
        {/* Main Footer Content */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.6fr 1fr 1fr',
            gap: '3rem',
            paddingBottom: '3.5rem',
            borderBottom: '1px solid var(--border-subtle)'
          }}
          className="footer-top"
        >
          {/* Left: Brand & Statement */}
          <div style={{ maxWidth: '340px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '1.25rem'
              }}
            >
              <img
                src="/assets/logo.png"
                alt="Global AI Valley"
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '5px',
                  objectFit: 'contain',
                  flexShrink: 0
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
            </div>

            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.86rem',
                lineHeight: 1.65,
                color: 'var(--text-secondary)',
                fontWeight: 300
              }}
            >
              A global innovation network connecting AI, people, businesses and ideas.
            </p>
          </div>

          {/* Center Column: Explore */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.68rem',
                fontWeight: 600,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                marginBottom: '1.4rem'
              }}
            >
              Explore
            </div>
            <ul
              style={{
                listStyle: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.85rem'
              }}
            >
              <li><a href="#hero" onClick={(e) => handleNavClick(e, '#hero')} className="footer-link">About</a></li>
              <li><a href="#vision" onClick={(e) => handleNavClick(e, '#vision')} className="footer-link">Vision</a></li>
              <li><a href="#ecosystem" onClick={(e) => handleNavClick(e, '#ecosystem')} className="footer-link">Innovation</a></li>
            </ul>
          </div>

          {/* Right Column: Connect */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.68rem',
                fontWeight: 600,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                marginBottom: '1.4rem'
              }}
            >
              Connect
            </div>
            <ul
              style={{
                listStyle: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.85rem'
              }}
            >
              <li>
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@globalaivalley.org"
                  className="footer-link"
                >
                  Email
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenContact}
                  className="footer-link"
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Strip: Copyright & Legal */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.5rem',
            paddingTop: '2.5rem'
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.78rem',
              color: 'var(--text-muted)',
              fontWeight: 300
            }}
          >
            © Global AI Valley. All rights reserved.
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2rem'
            }}
          >
            <a href="#privacy" className="footer-legal-link">Privacy</a>
            <a href="#terms" className="footer-legal-link">Terms</a>
          </div>
        </div>
      </div>

      <style>{`
        .footer-link {
          font-family: var(--font-sans);
          font-size: 0.84rem;
          color: var(--text-secondary);
          text-decoration: none;
          transition: color 0.25s ease;
        }
        .footer-link:hover {
          color: var(--accent-ice);
        }
        .footer-legal-link {
          font-family: var(--font-sans);
          font-size: 0.78rem;
          color: var(--text-muted);
          text-decoration: none;
          transition: color 0.25s ease;
        }
        .footer-legal-link:hover {
          color: var(--text-secondary);
        }
        @media (max-width: 768px) {
          .footer-top {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </footer>
  );
}

export default React.memo(Footer);
