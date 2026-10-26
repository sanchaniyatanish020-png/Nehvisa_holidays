import { useEffect, useRef } from 'react';
import services from '../data/services';
import './Services.css';

const ServiceIcon = ({ type }) => {
  const icons = {
    domestic: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
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
  };
  return icons[type] || null;
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
          <h2 id="services-heading" className="section-title fade-up">Our Services</h2>
          <p className="section-subtitle fade-up">
            Travel planning made simple, comfortable and personalized.
          </p>
        </header>

        <div className="services__grid">
          {services.map((service, i) => (
            <article
                key={service.id}
                className="service-card fade-up"
                style={{ transitionDelay: `${i * 0.1}s` }}
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
