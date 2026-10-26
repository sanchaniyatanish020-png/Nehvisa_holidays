import { useState, useEffect } from 'react';
import businessInfo from '../data/businessInfo';
import './Navbar.css';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Destinations', href: '#destinations' },
  { label: 'Why Us', href: '#whyus' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);

      // Determine active section
      const sections = navLinks.map((l) => l.href.replace('#', ''));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const target = document.getElementById(href.replace('#', ''));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMenuOpen(false);
  };

  return (
    <>
      <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}${menuOpen ? ' navbar--open' : ''}`} role="banner">
        <div className="navbar__inner container">
          {/* Logo */}
          <a
            href="#home"
            className="navbar__logo"
            onClick={(e) => handleNavClick(e, '#home')}
            aria-label="Nehvisa Holidays - Go to top"
          >
            <img
              src={scrolled || menuOpen ? '/logo.png' : '/logo-white.png'}
              alt="Nehvisa Holidays"
              className="navbar__logo-img"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="navbar__nav" aria-label="Main navigation">
            <ul role="list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`navbar__link${activeSection === link.href.replace('#', '') ? ' navbar__link--active' : ''}`}
                    onClick={(e) => handleNavClick(e, link.href)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Hamburger Button */}
          <button
            className={`navbar__hamburger${menuOpen ? ' navbar__hamburger--open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        {/* Mobile Menu Drawer */}
        <div
          id="mobile-menu"
          className={`navbar__mobile${menuOpen ? ' navbar__mobile--open' : ''}`}
          aria-hidden={!menuOpen}
        >
          <nav aria-label="Mobile navigation" className="navbar__mobile-nav">
            <ul role="list" className="navbar__mobile-list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`navbar__mobile-link${activeSection === link.href.replace('#', '') ? ' navbar__mobile-link--active' : ''}`}
                    onClick={(e) => handleNavClick(e, link.href)}
                  >
                    <span>{link.label}</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <polyline points="9 18 15 12 9 6"/>
                    </svg>
                  </a>
                </li>
              ))}
            </ul>

            {/* Mobile Menu Quick Actions */}
            <div className="navbar__mobile-contact">
              <p className="navbar__mobile-contact-title">Quick Booking &amp; Support</p>
              <div className="navbar__mobile-btns">
                <a
                  href="#contact"
                  className="btn btn-primary navbar__mobile-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    setMenuOpen(false);
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                  </svg>
                  <span>Plan Vacation</span>
                </a>
                <a
                  href={businessInfo.phoneLink}
                  className="btn btn-outline navbar__mobile-btn"
                  onClick={() => setMenuOpen(false)}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
                  </svg>
                  <span>Call {businessInfo.phone}</span>
                </a>
              </div>
              <p className="navbar__mobile-hours">
                🕒 {businessInfo.hours.days}: {businessInfo.hours.time}
              </p>
            </div>
          </nav>
        </div>
      </header>

      {/* Backdrop for mobile drawer */}
      {menuOpen && (
        <div
          className="navbar__backdrop"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
