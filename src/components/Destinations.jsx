import { useState, useRef, useEffect } from 'react';
import destinations from '../data/destinations';
import businessInfo from '../data/businessInfo';
import './Destinations.css';

// Styling themes for each destination to match the colorful capsule look from the design reference
const destinationThemeMap = {
  2: {
    // Dubai
    skyGradient: 'linear-gradient(180deg, #dbeafe 0%, #bfdbfe 40%, #1e293b 100%)',
    textColor: '#ffffff',
    fontFamily: 'var(--font-heading)',
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    shortName: 'DUBAI',
  },
  3: {
    // Vietnam
    skyGradient: 'linear-gradient(180deg, #0284c7 0%, #0369a1 45%, #0f172a 100%)',
    textColor: '#ffffff',
    fontFamily: 'Georgia, serif',
    textTransform: 'capitalize',
    letterSpacing: '0.04em',
    shortName: 'Vietnam',
  },
  4: {
    // Bali
    skyGradient: 'linear-gradient(180deg, #dcfce7 0%, #86efac 40%, #14532d 100%)',
    textColor: '#047857',
    fontFamily: 'Georgia, serif',
    fontStyle: 'italic',
    textTransform: 'capitalize',
    letterSpacing: '0.02em',
    shortName: 'Bali',
  },
  5: {
    // Singapore
    skyGradient: 'linear-gradient(180deg, #e0f2fe 0%, #7dd3fc 45%, #0369a1 100%)',
    textColor: '#0284c7',
    fontFamily: 'Georgia, serif',
    fontStyle: 'italic',
    textTransform: 'capitalize',
    letterSpacing: '0.02em',
    shortName: 'Singapore',
  },
  6: {
    // Malaysia
    skyGradient: 'linear-gradient(180deg, #1e293b 0%, #334155 45%, #020617 100%)',
    textColor: '#ffffff',
    fontFamily: 'var(--font-heading)',
    fontStyle: 'italic',
    textTransform: 'uppercase',
    letterSpacing: '0.14em',
    shortName: 'MALAYSIA',
  },
  7: {
    // Thailand
    skyGradient: 'linear-gradient(180deg, #38bdf8 0%, #0284c7 45%, #0f172a 100%)',
    textColor: '#ffffff',
    fontFamily: 'Georgia, serif',
    textTransform: 'capitalize',
    letterSpacing: '0.05em',
    shortName: 'Thailand',
  },
  8: {
    // Europe
    skyGradient: 'linear-gradient(180deg, #93c5fd 0%, #60a5fa 45%, #1e3a8a 100%)',
    textColor: '#1e3a8a',
    fontFamily: 'var(--font-heading)',
    textTransform: 'uppercase',
    letterSpacing: '0.14em',
    shortName: 'EUROPE',
  },
  9: {
    // Africa
    skyGradient: 'linear-gradient(180deg, #ffedd5 0%, #fdba74 45%, #7c2d12 100%)',
    textColor: '#7c2d12',
    fontFamily: 'var(--font-heading)',
    textTransform: 'uppercase',
    letterSpacing: '0.16em',
    shortName: 'AFRICA',
  },
  10: {
    // Cruise
    skyGradient: 'linear-gradient(180deg, #0e7490 0%, #0891b2 45%, #083344 100%)',
    textColor: '#ffffff',
    fontFamily: 'var(--font-heading)',
    textTransform: 'uppercase',
    letterSpacing: '0.15em',
    shortName: 'CRUISE',
  },
};

export default function Destinations() {
  const scrollTrackRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollTrackRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollTrackRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll, { passive: true });
      window.addEventListener('resize', checkScroll);
    }
    return () => {
      if (el) el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  const handleScroll = (direction) => {
    const el = scrollTrackRef.current;
    if (!el) return;
    const scrollAmount = direction === 'left' ? -260 : 260;
    el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  const handleEnquire = (dest) => {
    window.dispatchEvent(
      new CustomEvent('select-destination', {
        detail: { destinationName: dest.name },
      })
    );
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleWhatsApp = (e, dest) => {
    e.stopPropagation();
    const waUrl = `${businessInfo.whatsappLink}?text=${encodeURIComponent(
      `Hello Nehvisa Holidays, I would like to enquire about ${dest.name} tour package.`
    )}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="destinations" className="destinations section" aria-labelledby="destinations-heading">
      <div className="container">
        {/* Section Header with Carousel Arrows */}
        <div className="destinations__header-row">
          <div>
            <p className="section-label">Where We Travel</p>
            <h2 id="destinations-heading" className="section-title">
              Trending Holidays Destinations
            </h2>
          </div>

          <div className="destinations__nav-arrows" aria-label="Destination carousel controls">
            <button
              type="button"
              className={`destinations__arrow-btn destinations__arrow-btn--prev${
                canScrollLeft ? ' destinations__arrow-btn--active' : ''
              }`}
              onClick={() => handleScroll('left')}
              disabled={!canScrollLeft}
              aria-label="Previous destinations"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              type="button"
              className={`destinations__arrow-btn destinations__arrow-btn--next${
                canScrollRight ? ' destinations__arrow-btn--active' : ''
              }`}
              onClick={() => handleScroll('right')}
              disabled={!canScrollRight}
              aria-label="Next destinations"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Capsule / Stadium Carousel Track */}
        <div className="destinations__carousel-wrapper">
          <div
            ref={scrollTrackRef}
            className="destinations__pills-track"
            role="region"
            aria-label="Trending Holiday Destination Capsules"
          >
            {destinations.map((dest) => {
              const theme = destinationThemeMap[dest.id] || {
                skyGradient: 'linear-gradient(180deg, #38bdf8 0%, #0369a1 45%, #0f172a 100%)',
                textColor: '#ffffff',
                fontFamily: 'var(--font-heading)',
                shortName: dest.name,
              };

              return (
                <article
                  key={dest.id}
                  className="dest-capsule"
                  style={{ background: theme.skyGradient }}
                  onClick={() => handleEnquire(dest)}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleEnquire(dest);
                    }
                  }}
                  aria-label={`${dest.name} - ${dest.region}`}
                >
                  {/* Top Stylized Destination Name */}
                  <div className="dest-capsule__header">
                    <span
                      className="dest-capsule__name"
                      style={{
                        color: theme.textColor,
                        fontFamily: theme.fontFamily || 'var(--font-heading)',
                        fontStyle: theme.fontStyle || 'normal',
                        textTransform: theme.textTransform || 'none',
                        letterSpacing: theme.letterSpacing || 'normal',
                      }}
                    >
                      {theme.shortName || dest.name}
                    </span>
                  </div>

                  {/* Monument / Landmark Image aligned at bottom */}
                  <div className="dest-capsule__img-wrap">
                    <picture>
                      <source
                        type="image/webp"
                        srcSet={`${import.meta.env.BASE_URL}${dest.baseImage}-800.webp`}
                      />
                      <source
                        type="image/jpeg"
                        srcSet={`${import.meta.env.BASE_URL}${dest.baseImage}-800.jpg`}
                      />
                      <img
                        src={`${import.meta.env.BASE_URL}${dest.baseImage}-800.webp`}
                        alt={`Travel to ${dest.name}`}
                        className="dest-capsule__img"
                        width="400"
                        height="600"
                        loading="lazy"
                        decoding="async"
                      />
                    </picture>
                  </div>

                  {/* Hover Overlay with "Enquire Now" Button */}
                  <div className="dest-capsule__hover-overlay">
                    <div className="dest-capsule__hover-card">
                      {dest.duration ? (
                        <span className="dest-capsule__duration-tag">
                          {dest.duration}
                        </span>
                      ) : null}

                      <button
                        type="button"
                        className="dest-capsule__enquire-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEnquire(dest);
                        }}
                        aria-label={`Enquire now about ${dest.name}`}
                      >
                        <span className="dest-capsule__enquire-text">Enquire Now</span>
                        <span className="dest-capsule__arrow-circle" aria-hidden="true">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8">
                            <line x1="7" y1="17" x2="17" y2="7"></line>
                            <polyline points="7 7 17 7 17 17"></polyline>
                          </svg>
                        </span>
                      </button>

                      <button
                        type="button"
                        className="dest-capsule__wa-mini-btn"
                        onClick={(e) => handleWhatsApp(e, dest)}
                        aria-label={`WhatsApp enquiry for ${dest.name}`}
                        title="Chat on WhatsApp"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.558 4.119 1.532 5.849L.057 23.7a.5.5 0 0 0 .623.624l5.85-1.474A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.796 9.796 0 0 1-5.126-1.447l-.368-.218-3.822.963.981-3.72-.239-.384A9.792 9.792 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182c5.43 0 9.818 4.388 9.818 9.818 0 5.43-4.388 9.818-9.818 9.818z"/>
                        </svg>
                        WhatsApp
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
