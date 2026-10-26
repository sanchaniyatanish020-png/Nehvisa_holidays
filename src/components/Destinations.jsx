import { useState, useEffect, useRef } from 'react';
import destinations from '../data/destinations';
import businessInfo from '../data/businessInfo';
import './Destinations.css';

function DestinationCard({ dest, index, isSlide = false }) {
  const waUrl = `${businessInfo.whatsappLink}?text=${encodeURIComponent(dest.whatsappMessage)}`;

  const handleEnquire = (e) => {
    e.preventDefault();
    // Dispatch custom event to preselect destination in Contact form
    window.dispatchEvent(
      new CustomEvent('select-destination', {
        detail: { destinationName: dest.name },
      })
    );
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <article
      className={`dest-card${isSlide ? ' dest-card--slide' : ' fade-up'}`}
      style={!isSlide ? { transitionDelay: `${(index % 3) * 0.08}s` } : undefined}
      aria-label={`Destination: ${dest.name}`}
    >
      <div className="dest-card__img-wrap">
        <picture>
          <source
            type="image/webp"
            srcSet={`/${dest.baseImage}-800.webp 800w, /${dest.baseImage}-1400.webp 1400w`}
            sizes="(max-width: 768px) 100vw, 380px"
          />
          <source
            type="image/jpeg"
            srcSet={`/${dest.baseImage}-800.jpg 800w, /${dest.baseImage}-1400.jpg 1400w`}
            sizes="(max-width: 768px) 100vw, 380px"
          />
          <img
            src={`/${dest.baseImage}-800.jpg`}
            alt={`Travel to ${dest.name} - ${dest.region}`}
            className="dest-card__img"
            width="800"
            height="446"
            loading="lazy"
            decoding="async"
          />
        </picture>
        <div className="dest-card__overlay" aria-hidden="true" />
        <span className={`dest-card__badge dest-card__badge--${dest.type}`}>
          {dest.label}
        </span>
        {dest.duration ? (
          <span className="dest-card__duration-badge">
            {dest.duration}
          </span>
        ) : null}
      </div>

      <div className="dest-card__body">
        <div className="dest-card__meta">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          {dest.region}
        </div>

        <h3 className="dest-card__name">{dest.name}</h3>
        <p className="dest-card__desc">{dest.description}</p>

        {/* Optional starting price if filled */}
        {dest.startingPrice ? (
          <div className="dest-card__price-tag">
            {dest.startingPrice}
          </div>
        ) : null}

        {/* Optional inclusions if filled */}
        {dest.inclusions && dest.inclusions.length > 0 ? (
          <ul className="dest-card__inclusions" aria-label="Package inclusions">
            {dest.inclusions.map((item, idx) => (
              <li key={idx} className="dest-card__inclusion">
                ✓ {item}
              </li>
            ))}
          </ul>
        ) : null}

        {/* Actions: Primary Enquire & Secondary WhatsApp */}
        <div className="dest-card__actions">
          <a
            href="#contact"
            className="dest-card__cta"
            id={`dest-enquire-${dest.id}${isSlide ? '-slide' : ''}`}
            onClick={handleEnquire}
            aria-label={`Enquire about ${dest.name}`}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            Enquire Now
          </a>

          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="dest-card__cta-wa"
            id={`dest-wa-${dest.id}${isSlide ? '-slide' : ''}`}
            aria-label={`Chat on WhatsApp about ${dest.name}`}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.558 4.119 1.532 5.849L.057 23.7a.5.5 0 0 0 .623.624l5.85-1.474A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.796 9.796 0 0 1-5.126-1.447l-.368-.218-3.822.963.981-3.72-.239-.384A9.792 9.792 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182c5.43 0 9.818 4.388 9.818 9.818 0 5.43-4.388 9.818-9.818 9.818z"/>
            </svg>
            WhatsApp
          </a>
        </div>
      </div>
    </article>
  );
}

export default function Destinations() {
  const [activeTab, setActiveTab] = useState('all');
  const [activeSlide, setActiveSlide] = useState(0);
  const ref = useRef(null);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);
  const timerRef = useRef(null);

  const filtered = destinations.filter((dest) => {
    if (activeTab === 'all') return true;
    return dest.type === activeTab;
  });

  const totalSlides = filtered.length;

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
    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    timerRef.current = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % filtered.length);
    }, 4500);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setActiveSlide(0);
  };

  useEffect(() => {
    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    timerRef.current = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % filtered.length);
    }, 4500);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [filtered.length]);

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
      { threshold: 0.08 }
    );
    ref.current?.querySelectorAll('.fade-up').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [activeTab]);

  return (
    <section id="destinations" className="destinations section" ref={ref} aria-labelledby="destinations-heading">
      <div className="container">
        <header className="section-header">
          <p className="section-label fade-up">Where We Travel</p>
          <h2 id="destinations-heading" className="section-title fade-up">Explore Our Destinations</h2>
          <p className="section-subtitle fade-up">
            From spiritual journeys in India to unforgettable international escapes.
          </p>

          {/* Filter Tabs (44px min touch target) */}
          <div className="destinations__filters fade-up" role="tablist" aria-label="Destination Categories">
            <button
              className={`destinations__filter-btn${activeTab === 'all' ? ' destinations__filter-btn--active' : ''}`}
              onClick={() => handleTabChange('all')}
              role="tab"
              aria-selected={activeTab === 'all'}
              type="button"
            >
              All Destinations ({destinations.length})
            </button>
            <button
              className={`destinations__filter-btn${activeTab === 'international' ? ' destinations__filter-btn--active' : ''}`}
              onClick={() => handleTabChange('international')}
              role="tab"
              aria-selected={activeTab === 'international'}
              type="button"
            >
              International
            </button>
            <button
              className={`destinations__filter-btn${activeTab === 'india' ? ' destinations__filter-btn--active' : ''}`}
              onClick={() => handleTabChange('india')}
              role="tab"
              aria-selected={activeTab === 'india'}
              type="button"
            >
              Domestic / India
            </button>
          </div>
        </header>

        {/* Mobile Swipe Slider */}
        <div
          className="destinations__slider"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          aria-roledescription="carousel"
          aria-label="Destination card carousel"
        >
          <div
            className="destinations__slider-track"
            style={{ transform: `translateX(-${activeSlide * 100}%)` }}
          >
            {filtered.map((dest, i) => (
              <div key={dest.id} className="destinations__slide" aria-hidden={i !== activeSlide}>
                <DestinationCard dest={dest} index={i} isSlide={true} />
              </div>
            ))}
          </div>

          {/* Slider Controls with 44px tap targets */}
          <div className="destinations__slider-controls">
            <button
              className="destinations__slider-btn"
              onClick={prevSlide}
              aria-label="Previous destination"
              type="button"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            <div className="destinations__slider-dots" role="tablist" aria-label="Destination slides">
              {filtered.map((dest, i) => (
                <button
                  key={dest.id}
                  className={`destinations__slider-dot${i === activeSlide ? ' destinations__slider-dot--active' : ''}`}
                  onClick={() => goToSlide(i)}
                  aria-label={`Slide ${i + 1}: ${dest.name}`}
                  aria-selected={i === activeSlide}
                  role="tab"
                  type="button"
                />
              ))}
            </div>

            <button
              className="destinations__slider-btn"
              onClick={nextSlide}
              aria-label="Next destination"
              type="button"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Desktop Grid Layout */}
        <div className="destinations__grid">
          {filtered.map((dest, i) => (
            <DestinationCard key={dest.id} dest={dest} index={i} isSlide={false} />
          ))}
        </div>
      </div>
    </section>
  );
}
