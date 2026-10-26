import { useState, useEffect, useRef } from 'react';
import businessInfo from '../data/businessInfo';
import './WhyUs.css';

const reasons = [
  {
    id: 1,
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
      </svg>
    ),
    title: 'Personalized Travel Planning',
    desc: 'Travel plans designed according to your requirements.',
  },
  {
    id: 2,
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
      </svg>
    ),
    title: 'Domestic & International Travel',
    desc: 'Travel assistance across India and international destinations.',
  },
  {
    id: 3,
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: 'Professional Vacation Planning',
    desc: 'Thoughtful planning to help make your vacation smooth and enjoyable.',
  },
  {
    id: 4,
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M21 16v-2l-8-5V3.5A1.5 1.5 0 0011.5 2h-1A1.5 1.5 0 009 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L12 19v-5.5z"/>
      </svg>
    ),
    title: 'Flight & Hotel Assistance',
    desc: 'Convenient assistance with flights and accommodation.',
  },
  {
    id: 5,
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87"/>
        <path d="M16 3.13a4 4 0 010 7.75"/>
      </svg>
    ),
    title: 'Group Travel',
    desc: 'Travel arrangements for memorable group journeys.',
  },
  {
    id: 6,
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.66A2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92"/>
      </svg>
    ),
    title: 'Customer-Focused Service',
    desc: 'Personal attention focused on understanding your travel requirements.',
  },
];

export default function WhyUs() {
  const ref = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);
  const timerRef = useRef(null);

  const totalSlides = reasons.length;

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (idx) => {
    setActiveSlide(idx);
    resetAutoPlay();
  };

  const resetAutoPlay = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % reasons.length);
    }, 4500);
  };

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % reasons.length);
    }, 4500);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 40) {
      nextSlide();
      resetAutoPlay();
    } else if (diff < -40) {
      prevSlide();
      resetAutoPlay();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    );
    ref.current?.querySelectorAll('.fade-up').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="whyus" className="whyus section" ref={ref} aria-labelledby="whyus-heading">
      <div className="whyus__bg-pattern" aria-hidden="true"></div>
      <div className="container whyus__inner">
        <header className="section-header">
          <p className="section-label fade-up">Our Strengths</p>
          <h2 id="whyus-heading" className="section-title fade-up">
            Why Choose Nehvisa Holidays?
          </h2>
          <p className="section-subtitle fade-up">
            We are committed to making your travel experience smooth, comfortable and memorable.
          </p>

          {/* Trust Stats Bar */}
          <div className="whyus__stats fade-up">
            {businessInfo.stats.map((stat) => (
              <div key={stat.id} className="whyus__stat">
                <span className="whyus__stat-number">{stat.number}</span>
                <span className="whyus__stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </header>

        {/* Desktop Grid Layout */}
        <div className="whyus__grid">
          {reasons.map((r, i) => (
            <div
              key={r.id}
              className="whyus-card fade-up"
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <div className="whyus-card__icon" aria-hidden="true">{r.icon}</div>
              <h3 className="whyus-card__title">{r.title}</h3>
              <p className="whyus-card__desc">{r.desc}</p>
            </div>
          ))}
        </div>

        {/* Mobile Compact Slide Carousel */}
        <div
          className="whyus__slider"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          aria-label="Why Choose Us Slideshow"
        >
          <div
            className="whyus__slider-track"
            style={{ transform: `translateX(-${activeSlide * 100}%)` }}
          >
            {reasons.map((r, i) => (
              <div key={r.id} className="whyus__slide" aria-hidden={i !== activeSlide}>
                <div className="whyus-card whyus-card--slide">
                  <div className="whyus-card__slide-top">
                    <div className="whyus-card__icon" aria-hidden="true">{r.icon}</div>
                    <span className="whyus-card__badge">0{i + 1} / 0{totalSlides}</span>
                  </div>
                  <h3 className="whyus-card__title">{r.title}</h3>
                  <p className="whyus-card__desc">{r.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Slider Controls */}
          <div className="whyus__slider-controls">
            <button
              className="whyus__slider-btn whyus__slider-btn--prev"
              onClick={() => { prevSlide(); resetAutoPlay(); }}
              aria-label="Previous reason"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
            </button>

            <div className="whyus__slider-dots" role="tablist" aria-label="Slide indicators">
              {reasons.map((r, i) => (
                <button
                  key={r.id}
                  className={`whyus__slider-dot${i === activeSlide ? ' whyus__slider-dot--active' : ''}`}
                  onClick={() => goToSlide(i)}
                  aria-label={`Slide ${i + 1}: ${r.title}`}
                  role="tab"
                  aria-selected={i === activeSlide}
                />
              ))}
            </div>

            <button
              className="whyus__slider-btn whyus__slider-btn--next"
              onClick={() => { nextSlide(); resetAutoPlay(); }}
              aria-label="Next reason"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
