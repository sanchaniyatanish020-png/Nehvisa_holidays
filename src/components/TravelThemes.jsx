import { useState } from 'react';
import travelThemes from '../data/travelThemes';
import './TravelThemes.css';

export default function TravelThemes() {
  // Default to Honeymoon (index 1) or Cruise (index 0)
  const [activeIndex, setActiveIndex] = useState(1);

  const handleInquireTheme = (theme, e) => {
    e.stopPropagation();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    // Also dispatch event to customize itinerary form
    window.dispatchEvent(
      new CustomEvent('select-destination', {
        detail: { destinationName: theme.destinationNote || theme.title },
      })
    );
  };

  return (
    <section id="travel-themes" className="themes-section" aria-labelledby="themes-heading">
      <div className="container themes-section__container">
        <header className="themes-section__header">
          <h2 id="themes-heading" className="themes-section__title">
            Explore Themes that Inspire Travel
          </h2>
        </header>

        <div className="themes-accordion" role="region" aria-label="Travel themes gallery">
          {travelThemes.map((theme, index) => {
            const isActive = activeIndex === index;
            return (
              <div
                key={theme.id}
                className={`theme-card ${isActive ? 'theme-card--active' : ''}`}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => setActiveIndex(index)}
                role="button"
                tabIndex={0}
                aria-expanded={isActive}
                aria-label={`${theme.title} theme: ${theme.subtitle}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveIndex(index);
                  }
                }}
              >
                <img
                  src={theme.image}
                  alt={theme.title}
                  className="theme-card__bg"
                  loading="lazy"
                  decoding="async"
                />
                <div className="theme-card__overlay" />

                {/* Collapsed Vertical Title (hidden when active) */}
                <div className="theme-card__vertical-wrap" aria-hidden={isActive}>
                  <span className="theme-card__vertical-title">{theme.title}</span>
                </div>

                {/* Expanded Card Content (visible when active) */}
                <div className="theme-card__expanded-content" aria-hidden={!isActive}>
                  {/* Top Tags/Pills */}
                  <div className="theme-card__tags">
                    {theme.tags.map((tag) => (
                      <span key={tag} className="theme-card__tag">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Top-Right Yellow Arrow Button */}
                  <button
                    type="button"
                    className="theme-card__arrow-btn"
                    onClick={(e) => handleInquireTheme(theme, e)}
                    aria-label={`Book or inquire about ${theme.title} theme`}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="2.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <line x1="7" y1="17" x2="17" y2="7"></line>
                      <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                  </button>

                  {/* Bottom Text Area */}
                  <div className="theme-card__info">
                    <h3 className="theme-card__title">{theme.title}</h3>
                    <p className="theme-card__subtitle">{theme.subtitle}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
