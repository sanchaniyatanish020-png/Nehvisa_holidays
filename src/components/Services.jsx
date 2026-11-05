import { useEffect, useRef } from 'react';
import services from '../data/services';
import './Services.css';

const ServiceIcon = ({ type }) => {
  const icons = {
    international: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
      </svg>
    ),
    flight: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M21 16v-2l-8-5V3.5A1.5 1.5 0 0011.5 2h-1A1.5 1.5 0 009 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L12 19v-5.5z"/>
      </svg>
    ),
    hotel: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M3 22V8l9-6 9 6v14"/>
        <path d="M9 22v-9h6v9"/>
        <rect x="11" y="10" width="2" height="2"/>
      </svg>
    ),
    group: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87"/>
        <path d="M16 3.13a4 4 0 010 7.75"/>
      </svg>
    ),
    visa: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <rect x="3" y="4" width="18" height="16" rx="2"/>
        <line x1="7" y1="8" x2="17" y2="8"/>
        <line x1="7" y1="12" x2="13" y2="12"/>
        <circle cx="16" cy="14" r="2"/>
      </svg>
    ),
    food: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M18 8h1a4 4 0 010 8h-1"/>
        <path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"/>
        <line x1="6" y1="1" x2="6" y2="4"/>
        <line x1="10" y1="1" x2="10" y2="4"/>
        <line x1="14" y1="1" x2="14" y2="4"/>
      </svg>
    ),
  };
  return icons[type] || icons.international;
};

export default function Services() {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.1 }
    );
    ref.current?.querySelectorAll('.fade-up').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" className="services section" ref={ref} aria-labelledby="services-heading">
      <div className="container">
        <header className="section-header">
          <p className="section-label fade-up">What We Offer</p>
          <h2 id="services-heading" className="section-title fade-up">Our Travel Services in Surat</h2>
          <p className="section-subtitle fade-up">
            Customized international tour packages, flight booking, visa assistance, and Gujarati &amp; Jain food friendly travel arrangements.
          </p>
        </header>

        <div className="services__grid">
          {services.map((service, i) => (
            <article
              key={service.id}
              className="service-card fade-up"
              style={{ transitionDelay: `${i * 0.08}s` }}
              aria-label={`Service: ${service.title}`}
            >
              <div className="service-card__icon" aria-hidden="true">
                <ServiceIcon type={service.svgIcon} />
              </div>
              <h3 className="service-card__title">{service.title}</h3>
              <p className="service-card__desc">{service.description}</p>
              <a
                href="#contact"
                className="service-card__cta"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                aria-label={`Enquire about ${service.title}`}
              >
                <span>Enquire Now</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>
              <div className="service-card__accent" aria-hidden="true"></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
