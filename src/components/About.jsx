import { useEffect, useRef } from 'react';
import businessInfo from '../data/businessInfo';
import './About.css';

export default function About() {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15 }
    );
    const els = ref.current?.querySelectorAll('.fade-up');
    els?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);


  return (
    <section id="about" className="about section" ref={ref} aria-labelledby="about-heading">
      <div className="container about__inner">
        {/* Left - Text */}
        <div className="about__text">
          <p className="section-label fade-up">About Us</p>
          <h2 id="about-heading" className="section-title fade-up">About Nehvisa Holidays</h2>
          <p className="about__desc fade-up">
            {businessInfo.about}
          </p>

          <div className="about__features fade-up">
            <div className="about__feature">
              <div className="about__feature-icon" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              </div>
              <div>
                <h3 className="about__feature-title">Domestic &amp; International</h3>
                <p className="about__feature-desc">India and destinations worldwide</p>
              </div>
            </div>
            <div className="about__feature">
              <div className="about__feature-icon" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <div>
                <h3 className="about__feature-title">Personalized Planning</h3>
                <p className="about__feature-desc">Packages designed for your requirements</p>
              </div>
            </div>
            <div className="about__feature">
              <div className="about__feature-icon" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.66A2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92"/>
                </svg>
              </div>
              <div>
                <h3 className="about__feature-title">Always Available</h3>
                <p className="about__feature-desc">Mon–Sun, 10:00 AM – 7:00 PM</p>
              </div>
            </div>
          </div>

          <div className="about__ctas fade-up">
            <a
              href="#contact"
              className="btn btn-navy"
              id="about-contact-btn"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
              </svg>
              Plan Your Vacation
            </a>
            <a href={`tel:${businessInfo.phone.replace(/\s/g, '')}`} className="btn btn-outline" id="about-call-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.66A2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92"/>
              </svg>
              {businessInfo.phone}
            </a>
          </div>
        </div>

        {/* Right - Visual */}
        <div className="about__visual fade-up">
          <div className="about__image-wrap">
            <picture>
              <source
                type="image/webp"
                srcSet="/dubai-800.webp 800w, /dubai-1400.webp 1400w"
                sizes="(max-width: 960px) 100vw, 480px"
              />
              <source
                type="image/jpeg"
                srcSet="/dubai-800.jpg 800w, /dubai-1400.jpg 1400w"
                sizes="(max-width: 960px) 100vw, 480px"
              />
              <img
                src="/dubai-800.jpg"
                alt="Travel destinations offered by Nehvisa Holidays"
                className="about__image"
                width="800"
                height="446"
                loading="lazy"
                decoding="async"
              />
            </picture>
            <div className="about__image-badge">
              <div className="about__badge-icon" aria-hidden="true">✈️</div>
              <div>
                <p className="about__badge-title">Plan Your Journey</p>
                <p className="about__badge-sub">Domestic &amp; International</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
