import { useState, useRef, useEffect, useCallback } from 'react';
import destinations from '../data/destinations';
import businessInfo from '../data/businessInfo';
import './Destinations.css';

// Styling themes for each destination to match the colorful capsule look from the design reference
const destinationThemeMap = {
  2: {
    // Dubai
    skyGradient: 'linear-gradient(180deg, #1e293b 0%, #334155 45%, #0f172a 100%)',
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
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const handleScroll = useCallback(() => {
    const track = scrollTrackRef.current;
    if (!track) return;

    const { scrollLeft, scrollWidth, clientWidth } = track;
    setCanScrollLeft(scrollLeft > 15);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 15);

    // Identify which capsule is closest to the screen center on mobile/tablet
    const centerPos = scrollLeft + clientWidth / 2;
    const items = track.querySelectorAll('.dest-capsule');
    let closestIndex = 0;
    let closestDist = Infinity;

    items.forEach((item, index) => {
      const itemCenter = item.offsetLeft + item.offsetWidth / 2;
      const dist = Math.abs(centerPos - itemCenter);
      if (dist < closestDist) {
        closestDist = dist;
        closestIndex = index;
      }
    });

    setActiveIndex(closestIndex);
  }, []);

  useEffect(() => {
    handleScroll();
    const track = scrollTrackRef.current;
    if (track) {
      track.addEventListener('scroll', handleScroll, { passive: true });
      window.addEventListener('resize', handleScroll);
    }
    return () => {
      if (track) track.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [handleScroll]);

  const scrollToIndex = (index) => {
    const track = scrollTrackRef.current;
    if (!track) return;
    const items = track.querySelectorAll('.dest-capsule');
    const clampedIndex = Math.max(0, Math.min(items.length - 1, index));
    const targetItem = items[clampedIndex];
    if (targetItem) {
      const targetScroll =
        targetItem.offsetLeft - (track.clientWidth - targetItem.offsetWidth) / 2;
      track.scrollTo({ left: targetScroll, behavior: 'smooth' });
      setActiveIndex(clampedIndex);
    }
  };

  const handleEnquire = (dest) => {
    window.dispatchEvent(
      new CustomEvent('select-destination', {
        detail: { destinationName: dest.name },
      })
    );
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="destinations" className="destinations section" aria-labelledby="destinations-heading">
      <div className="container">
        {/* Header Row with Title and Carousel Arrows */}
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
              onClick={() => scrollToIndex(activeIndex - 1)}
              disabled={!canScrollLeft}
              aria-label="Previous destination"
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
              onClick={() => scrollToIndex(activeIndex + 1)}
              disabled={!canScrollRight}
              aria-label="Next destination"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Capsule Carousel Track with Center Coverflow Snap */}
        <div className="destinations__carousel-wrapper">
          <div
            ref={scrollTrackRef}
            className="destinations__pills-track"
            role="region"
            aria-label="Trending Holiday Destination Capsules"
          >
            {destinations.map((dest, i) => {
              const theme = destinationThemeMap[dest.id] || {
                skyGradient: 'linear-gradient(180deg, #38bdf8 0%, #0369a1 45%, #0f172a 100%)',
                textColor: '#ffffff',
                fontFamily: 'var(--font-heading)',
                shortName: dest.name,
              };

              const isActive = i === activeIndex;

              return (
                <article
                  key={dest.id}
                  className={`dest-capsule${isActive ? ' dest-capsule--active' : ''}`}
                  style={{ background: theme.skyGradient }}
                  onClick={() => {
                    if (isActive) {
                      handleEnquire(dest);
                    } else {
                      scrollToIndex(i);
                    }
                  }}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleEnquire(dest);
                    }
                  }}
                  aria-label={`${dest.name} - ${dest.region}`}
                  aria-current={isActive ? 'true' : 'false'}
                >
                  {/* Top Destination Typography */}
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

                  {/* Monument / Landmark Image */}
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

                  {/* Bottom Action Area with "Enquire Now" & Yellow Arrow Circle */}
                  <div className="dest-capsule__bottom-action">
                    <span className="dest-capsule__enquire-label">
                      Enquire Now
                    </span>
                    <button
                      type="button"
                      className="dest-capsule__yellow-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEnquire(dest);
                      }}
                      aria-label={`Enquire now about ${dest.name}`}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" aria-hidden="true">
                        <line x1="7" y1="17" x2="17" y2="7"></line>
                        <polyline points="7 7 17 7 17 17"></polyline>
                      </svg>
                    </button>
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
