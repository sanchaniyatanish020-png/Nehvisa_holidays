import { useState, useRef } from 'react';
import destinations from '../data/destinations';
import businessInfo from '../data/businessInfo';
import './Destinations.css';

function DestinationCard({ dest, index, isSlide = false }) {
  const waUrl = `${businessInfo.whatsappLink}?text=${encodeURIComponent(dest.whatsappMessage)}`;

  const handleEnquire = (e) => {
    e.preventDefault();
    window.dispatchEvent(
      new CustomEvent('select-destination', {
        detail: { destinationName: dest.name },
      })
    );
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <article
      className={`dest-card${isSlide ? ' dest-card--slide' : ''}`}
      aria-label={`Destination: ${dest.name}`}
    >
      <div className="dest-card__img-wrap">
        <picture>
          <source
            type="image/webp"
            srcSet={`${import.meta.env.BASE_URL}${dest.baseImage}-800.webp 800w, ${import.meta.env.BASE_URL}${dest.baseImage}-1400.webp 1400w`}
            sizes="(max-width: 768px) 100vw, 380px"
          />
          <source
            type="image/jpeg"
            srcSet={`${import.meta.env.BASE_URL}${dest.baseImage}-800.jpg 800w, ${import.meta.env.BASE_URL}${dest.baseImage}-1400.jpg 1400w`}
            sizes="(max-width: 768px) 100vw, 380px"
          />
          <img
            src={`${import.meta.env.BASE_URL}${dest.baseImage}-800.webp`}
            alt={`Travel to ${dest.name} - ${dest.region}`}
            className="dest-card__img"
            width="800"
            height="446"
            loading="lazy"
            decoding="async"
          />
        </picture>
        <div className="dest-card__overlay" aria-hidden="true" />
        <div className="dest-card__name-overlay">
          <h3 className="dest-card__overlay-name">{dest.name}</h3>
          <div className="dest-card__overlay-region">{dest.region}</div>
        </div>
        <span className={`dest-card__badge dest-card__badge--${dest.category || dest.type}`}>
          {dest.label}
        </span>
        {dest.duration ? (
          <span className="dest-card__duration-badge">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            {dest.duration}
          </span>
        ) : null}
      </div>

      <div className="dest-card__body">
        <p className="dest-card__desc">{dest.description}</p>

        {dest.startingPrice ? (
          <div className="dest-card__price-tag">
            {dest.startingPrice}
          </div>
        ) : null}

        {dest.inclusions && dest.inclusions.length > 0 ? (
          <ul className="dest-card__inclusions" aria-label="Package inclusions">
            {dest.inclusions.map((item, idx) => (
              <li key={idx} className="dest-card__inclusion">
                ✓ {item}
              </li>
            ))}
          </ul>
        ) : null}

        <div className="dest-card__actions">
          <a
            href="#contact"
            className="dest-card__cta"
            id={`dest-enquire-${dest.id}-${index}${isSlide ? '-slide' : ''}`}
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
            id={`dest-wa-${dest.id}-${index}${isSlide ? '-slide' : ''}`}
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
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const filtered = destinations.filter((dest) => {
    if (activeTab === 'all') return true;
    return dest.category === activeTab;
  });

  const categoryTabs = [
    { id: 'all', label: `All Destinations (${destinations.length})` },
    { id: 'asia', label: 'Asia' },
    { id: 'europe', label: 'Europe' },
    { id: 'africa', label: 'Africa' },
    { id: 'cruise', label: 'Cruise' },
  ];

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setActiveSlide(0);
  };

  const prevSlide = () => {
    setActiveSlide((curr) => (curr === 0 ? filtered.length - 1 : curr - 1));
  };

  const nextSlide = () => {
    setActiveSlide((curr) => (curr === filtered.length - 1 ? 0 : curr + 1));
  };

  const goToSlide = (index) => {
    setActiveSlide(index);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 45) {
      nextSlide();
    } else if (diff < -45) {
      prevSlide();
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  return (
    <section id="destinations" className="destinations section" aria-labelledby="destinations-heading">
      <div className="container">
        <header className="section-header">
          <p className="section-label">Where We Travel</p>
          <h2 id="destinations-heading" className="section-title">Explore Our Destinations</h2>
          <p className="section-subtitle">
            Explore our thoughtfully planned international holiday escapes.
          </p>

          <div className="destinations__filters" role="tablist" aria-label="Destination Categories">
            {categoryTabs.map((tab) => (
              <button
                key={tab.id}
                className={`destinations__filter-btn${activeTab === tab.id ? ' destinations__filter-btn--active' : ''}`}
                onClick={() => handleTabChange(tab.id)}
                role="tab"
                aria-selected={activeTab === tab.id}
                type="button"
              >
                {tab.label}
              </button>
            ))}
          </div>
        </header>

        {/* Mobile Swipe Slider (Hidden on Desktop) */}
        <div
          className="destinations__slider"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          aria-roledescription="carousel"
          aria-label="Destination packages carousel"
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

            <div className="destinations__slider-counter" aria-live="polite">
              <span>{activeSlide + 1}</span>
              <span className="destinations__counter-divider">/</span>
              <span>{filtered.length}</span>
            </div>

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

        {/* Desktop Grid Layout (Hidden on Mobile) */}
        <div className="destinations__grid">
          {filtered.map((dest, i) => (
            <DestinationCard key={dest.id} dest={dest} index={i} isSlide={false} />
          ))}
        </div>
      </div>
    </section>
  );
}
