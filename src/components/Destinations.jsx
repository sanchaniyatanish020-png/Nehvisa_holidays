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

// Seamless 3x looping array: ensures Dubai starts centered with Cruise on the left and Vietnam on the right!
const loopingDestinations = [
  ...destinations.map((d) => ({ ...d, loopKey: `prev-${d.id}` })),
  ...destinations.map((d) => ({ ...d, loopKey: `curr-${d.id}` })),
  ...destinations.map((d) => ({ ...d, loopKey: `next-${d.id}` })),
];

const INITIAL_INDEX = destinations.length; // Index 9: Dubai centered with left & right peeks!

export default function Destinations() {
  const scrollTrackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(INITIAL_INDEX);
  const isAdjustingRef = useRef(false);

  const scrollToIndex = (index) => {
    const track = scrollTrackRef.current;
    if (!track) return;
    const items = track.querySelectorAll('.dest-capsule');
    if (items[index]) {
      const targetItem = items[index];
      const targetScroll =
        targetItem.offsetLeft - (track.clientWidth - targetItem.offsetWidth) / 2;
      track.scrollTo({ left: targetScroll, behavior: 'smooth' });
      setActiveIndex(index);
    }
  };

  const handleScroll = useCallback(() => {
    if (isAdjustingRef.current) return;
    const track = scrollTrackRef.current;
    if (!track) return;

    const { scrollLeft, clientWidth } = track;
    const centerPos = scrollLeft + clientWidth / 2;
    const items = track.querySelectorAll('.dest-capsule');
    if (!items.length) return;

    let closestIndex = INITIAL_INDEX;
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

    // Infinite loop jump when reaching near outer thirds of the list
    const setSize = destinations.length;
    const itemStride = items[1] ? items[1].offsetLeft - items[0].offsetLeft : 186;
    const loopDistance = setSize * itemStride;

    if (closestIndex < 3) {
      isAdjustingRef.current = true;
      track.scrollLeft += loopDistance;
      setActiveIndex(closestIndex + setSize);
      setTimeout(() => {
        isAdjustingRef.current = false;
      }, 60);
    } else if (closestIndex >= loopingDestinations.length - 3) {
      isAdjustingRef.current = true;
      track.scrollLeft -= loopDistance;
      setActiveIndex(closestIndex - setSize);
      setTimeout(() => {
        isAdjustingRef.current = false;
      }, 60);
    }
  }, []);

  // Initial center alignment so Dubai starts in center with previous & next cards visible
  useEffect(() => {
    const track = scrollTrackRef.current;
    if (!track) return;

    const centerInitial = () => {
      const items = track.querySelectorAll('.dest-capsule');
      if (items[INITIAL_INDEX]) {
        const targetItem = items[INITIAL_INDEX];
        const targetScroll =
          targetItem.offsetLeft - (track.clientWidth - targetItem.offsetWidth) / 2;
        track.scrollLeft = targetScroll;
        setActiveIndex(INITIAL_INDEX);
      }
    };

    centerInitial();
    const raf = requestAnimationFrame(centerInitial);
    const timer = setTimeout(centerInitial, 80);

    track.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
      track.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [handleScroll]);

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
              className="destinations__arrow-btn destinations__arrow-btn--active"
              onClick={() => scrollToIndex(activeIndex - 1)}
              aria-label="Previous destination"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              type="button"
              className="destinations__arrow-btn destinations__arrow-btn--active"
              onClick={() => scrollToIndex(activeIndex + 1)}
              aria-label="Next destination"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Capsule Carousel Track with Infinite Center Coverflow */}
        <div className="destinations__carousel-wrapper">
          <div
            ref={scrollTrackRef}
            className="destinations__pills-track"
            role="region"
            aria-label="Trending Holiday Destination Capsules"
          >
            {loopingDestinations.map((dest, i) => {
              const theme = destinationThemeMap[dest.id] || {
                skyGradient: 'linear-gradient(180deg, #38bdf8 0%, #0369a1 45%, #0f172a 100%)',
                textColor: '#ffffff',
                fontFamily: 'var(--font-heading)',
                shortName: dest.name,
              };

              const isActive = i === activeIndex;

              return (
                <article
                  key={dest.loopKey}
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
