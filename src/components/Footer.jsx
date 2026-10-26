import businessInfo from '../data/businessInfo';
import './Footer.css';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Destinations', href: '#destinations' },
  { label: 'Why Us', href: '#whyus' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  const handleNavClick = (e, href) => {
    e.preventDefault();
    const target = document.getElementById(href.replace('#', ''));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const { address } = businessInfo;

  return (
    <footer className="footer" role="contentinfo">
      <div className="container footer__inner">
        {/* Brand Column */}
        <div className="footer__brand">
          <img src="/logo-white.png" alt="Nehvisa Holidays" className="footer__logo" />
          <div className="footer__socials">
            <a
              href={businessInfo.instagram.link}
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-link"
              aria-label="Follow Nehvisa Holidays on Instagram"
              id="footer-instagram-link"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
              Instagram
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer__col">
          <h3 className="footer__col-title">Quick Links</h3>
          <ul role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="footer__link"
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer__col">
          <h3 className="footer__col-title">Contact</h3>
          <ul className="footer__contact-list" role="list">
            <li>
              <a href={businessInfo.phoneLink} className="footer__contact-link" id="footer-phone-link">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.66A2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92"/>
                </svg>
                {businessInfo.phone}
              </a>
            </li>
            <li>
              <a href={businessInfo.emailLink} className="footer__contact-link" id="footer-email-link">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                {businessInfo.email}
              </a>
            </li>
            <li>
              <a href={businessInfo.mapsLink} target="_blank" rel="noopener noreferrer" className="footer__contact-link" id="footer-address-link">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <address style={{ fontStyle: 'normal' }}>
                  {address.line1} {address.line2}<br/>{address.line3} {address.line4}
                </address>
              </a>
            </li>
          </ul>
        </div>

        {/* Vacation Planning CTA */}
        <div className="footer__col footer__cta-col">
          <h3 className="footer__col-title">Start Your Journey</h3>
          <p className="footer__cta-text">
            Ready to plan your next vacation? Get in touch with our expert travel planners.
          </p>
          <a
            href="#contact"
            className="btn btn-primary footer__wa-btn"
            id="footer-contact-btn"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
            </svg>
            Plan Your Vacation
          </a>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p className="footer__copyright">{businessInfo.copyright}</p>
          <p className="footer__bottom-right">
            Nehvisa Holidays &mdash; {businessInfo.hours.days}, {businessInfo.hours.time}
          </p>
        </div>
      </div>
    </footer>
  );
}
