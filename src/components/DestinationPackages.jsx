import { useState, useEffect } from 'react';
import destinationPackages from '../data/destinationPackages';
import businessInfo from '../data/businessInfo';
import './DestinationPackages.css';

export default function DestinationPackages({ slug, onBack, onSelectForInquiry }) {
  const destData = destinationPackages[slug] || destinationPackages.dubai;
  const [expandedItineraries, setExpandedItineraries] = useState({});

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  const toggleItinerary = (pkgId) => {
    setExpandedItineraries((prev) => ({
      ...prev,
      [pkgId]: !prev[pkgId],
    }));
  };

  const handleWhatsAppPackage = (pkg) => {
    const text = `Hello Nehvisa Holidays, I am interested in booking the *${pkg.title}* (${pkg.duration}) for *${destData.name}*.\n\nRoute: ${pkg.route}\nPlease send me the complete day-wise itinerary and custom quotation for my family.`;
    const url = `https://wa.me/${businessInfo.phoneRaw}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCustomizePackage = (pkg) => {
    if (onSelectForInquiry) {
      onSelectForInquiry(destData.name, pkg.title);
    } else {
      window.dispatchEvent(
        new CustomEvent('select-destination', {
          detail: { destinationName: destData.name },
        })
      );
      if (onBack) onBack();
      setTimeout(() => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <div className="dest-pkg-page" role="main" aria-label={`${destData.fullName}`}>
      {/* Clean Breadcrumb Navigation below Fixed Navbar */}
      <nav className="dest-pkg__nav-bar" aria-label="Breadcrumb">
        <div className="container dest-pkg__nav-inner">
          <div className="dest-pkg__breadcrumbs">
            <button type="button" className="dest-pkg__crumb-link" onClick={onBack}>
              Home
            </button>
            <span className="dest-pkg__crumb-sep">›</span>
            <button type="button" className="dest-pkg__crumb-link" onClick={onBack}>
              Destinations
            </button>
            <span className="dest-pkg__crumb-sep">›</span>
            <span className="dest-pkg__crumb-current">{destData.name} Packages</span>
          </div>

          <button
            type="button"
            className="dest-pkg__back-btn"
            onClick={onBack}
            aria-label="Back to home page"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            <span>Back to All Destinations</span>
          </button>
        </div>
      </nav>

      {/* Hero Header with Destination Panoramic Photo */}
      <header className="dest-pkg__hero">
        <img
          src={destData.heroImage}
          alt={destData.fullName}
          className="dest-pkg__hero-bg"
          loading="eager"
        />
        <div className="dest-pkg__hero-overlay" />

        <div className="container dest-pkg__hero-content">
          <div className="dest-pkg__hero-badges">
            <span className="dest-pkg__badge-region">{destData.region}</span>
            <span className="dest-pkg__badge-custom">100% Customized Tour Itineraries</span>
          </div>

          <h1 className="dest-pkg__hero-title">{destData.fullName}</h1>
          <p className="dest-pkg__hero-tagline">{destData.tagline}</p>
        </div>
      </header>

      {/* Main Packages List */}
      <section className="dest-pkg__content section">
        <div className="container">
          <div className="dest-pkg__section-header">
            <span className="section-label">Curated Holiday Packages</span>
            <h2 className="section-title">Trending {destData.name} Packages</h2>
            <p className="section-subtitle">
              Choose from our best-selling itineraries below. Each package can be customized with your dates, hotel category, and meal preferences.
            </p>
          </div>

          {/* Package Cards List */}
          <div className="dest-pkg__list">
            {destData.packages.map((pkg, idx) => {
              const isItineraryOpen = !!expandedItineraries[pkg.id || idx];

              return (
                <article key={pkg.id || idx} className="dest-pkg__card">
                  {/* Top Split: Image + Core Details */}
                  <div className="dest-pkg__card-main">
                    {/* Package Cover Image with Badges */}
                    <div className="dest-pkg__card-img-wrap">
                      <img
                        src={pkg.image}
                        alt={pkg.title}
                        className="dest-pkg__card-img"
                        loading="lazy"
                        decoding="async"
                      />
                      <span className="dest-pkg__card-duration-badge">⏱️ {pkg.duration}</span>
                      <span className="dest-pkg__card-category-badge">{pkg.category}</span>
                    </div>

                    {/* Package Content Column */}
                    <div className="dest-pkg__card-info">
                      <h3 className="dest-pkg__card-title">{pkg.title}</h3>

                      {/* Route Path */}
                      <div className="dest-pkg__route-pill">
                        <span className="dest-pkg__route-icon">🗺️</span>
                        <span className="dest-pkg__route-text">{pkg.route}</span>
                      </div>

                      {/* Key Features Badges */}
                      <div className="dest-pkg__specs-grid">
                        <div className="dest-pkg__spec-item">
                          <span className="dest-pkg__spec-icon">🏨</span>
                          <span className="dest-pkg__spec-text">{pkg.hotels}</span>
                        </div>
                        <div className="dest-pkg__spec-item">
                          <span className="dest-pkg__spec-icon">🍲</span>
                          <span className="dest-pkg__spec-text">{pkg.meals}</span>
                        </div>
                      </div>

                      {/* Inclusions Checkmarks List */}
                      <div className="dest-pkg__inclusions-wrap">
                        <h4 className="dest-pkg__inclusions-heading">Key Package Inclusions:</h4>
                        <ul className="dest-pkg__inclusions-list">
                          {pkg.inclusions.map((item, i) => (
                            <li key={i}>
                              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <polyline points="20 6 9 17 4 12"></polyline>
                              </svg>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Actions & Price Note */}
                      <div className="dest-pkg__card-footer">
                        <div className="dest-pkg__quote-indicator">
                          <span className="dest-pkg__quote-badge">Custom Quotation</span>
                          <span className="dest-pkg__quote-sub">No fixed prices · Tailored to your dates</span>
                        </div>

                        <div className="dest-pkg__actions-row">
                          <button
                            type="button"
                            className="btn btn-navy dest-pkg__btn-wa"
                            onClick={() => handleWhatsAppPackage(pkg)}
                          >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.06-2.125-.536-1.722-.716-2.834-2.463-2.92-2.576-.086-.115-.694-.925-.694-1.764s.436-1.25.592-1.422c.156-.172.341-.215.455-.215.114 0 .229.002.328.007.106.005.248-.04.388.297.144.346.491 1.2.534 1.288.043.088.072.19.014.305-.058.115-.087.187-.173.287-.086.1-.182.224-.26.3-.086.085-.176.178-.076.35.1.172.446.736.958 1.192.658.586 1.213.768 1.385.854.172.086.273.072.373-.043.1-.115.43-.502.545-.674.115-.172.23-.144.388-.086.158.058 1.002.473 1.174.56.172.086.287.129.33.201.043.072.043.418-.101.823z" />
                            </svg>
                            <span>Get Itinerary on WhatsApp</span>
                          </button>

                          <button
                            type="button"
                            className="btn btn-outline dest-pkg__btn-customize"
                            onClick={() => handleCustomizePackage(pkg)}
                          >
                            <span>Customize in Planner</span>
                          </button>

                          {pkg.itinerary && (
                            <button
                              type="button"
                              className="dest-pkg__btn-toggle-itinerary"
                              onClick={() => toggleItinerary(pkg.id || idx)}
                              aria-expanded={isItineraryOpen}
                            >
                              <span>{isItineraryOpen ? 'Hide Day-Wise Plan' : '📅 View Day-Wise Plan'}</span>
                              <svg
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                style={{
                                  transform: isItineraryOpen ? 'rotate(180deg)' : 'none',
                                  transition: 'transform 0.2s',
                                }}
                              >
                                <polyline points="6 9 12 15 18 9"></polyline>
                              </svg>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Expandable Day-by-Day Timeline */}
                  {pkg.itinerary && isItineraryOpen && (
                    <div className="dest-pkg__day-plan-box" role="region" aria-label="Day-by-Day Itinerary">
                      <div className="dest-pkg__day-plan-header">
                        <h4>Day-by-Day Detailed Itinerary · {pkg.title}</h4>
                        <span className="dest-pkg__day-plan-note">100% Flexible &amp; Tailored to You</span>
                      </div>

                      <div className="dest-pkg__timeline">
                        {pkg.itinerary.map((dayItem, dIndex) => (
                          <div key={dIndex} className="dest-pkg__timeline-item">
                            <div className="dest-pkg__timeline-marker">
                              <span className="dest-pkg__timeline-badge">{dayItem.day}</span>
                            </div>
                            <div className="dest-pkg__timeline-content">
                              <h5 className="dest-pkg__timeline-title">{dayItem.title}</h5>
                              <p className="dest-pkg__timeline-desc">{dayItem.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
          </div>

          {/* Top Sights & Attractions Section */}
          <div className="dest-pkg__sights-section">
            <div className="dest-pkg__section-header">
              <span className="section-label">Must-Visit Places</span>
              <h3 className="section-title">Top Sights &amp; Experiences in {destData.name}</h3>
            </div>

            <div className="dest-pkg__sights-grid">
              {destData.topSights.map((sight, sIdx) => (
                <div key={sIdx} className="dest-pkg__sight-card">
                  <div className="dest-pkg__sight-number">0{sIdx + 1}</div>
                  <h4 className="dest-pkg__sight-title">{sight.name}</h4>
                  <p className="dest-pkg__sight-desc">{sight.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Essential Travel Guide for Indians */}
          <div className="dest-pkg__guide-box">
            <h3 className="dest-pkg__guide-heading">Important Travel Information for {destData.name}</h3>
            <div className="dest-pkg__guide-grid">
              <div className="dest-pkg__guide-item">
                <span className="dest-pkg__guide-icon">📅</span>
                <div>
                  <h4>Best Time to Visit</h4>
                  <p>{destData.bestTime}</p>
                </div>
              </div>
              <div className="dest-pkg__guide-item">
                <span className="dest-pkg__guide-icon">🛂</span>
                <div>
                  <h4>Visa Process for Indians</h4>
                  <p>{destData.visaInfo}</p>
                </div>
              </div>
              <div className="dest-pkg__guide-item">
                <span className="dest-pkg__guide-icon">💵</span>
                <div>
                  <h4>Currency</h4>
                  <p>{destData.currency}</p>
                </div>
              </div>
              <div className="dest-pkg__guide-item">
                <span className="dest-pkg__guide-icon">🍲</span>
                <div>
                  <h4>Indian &amp; Jain Dining</h4>
                  <p>{destData.foodInfo}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Consultation Banner */}
          <div className="dest-pkg__cta-banner">
            <div className="dest-pkg__cta-content">
              <h3>Looking for a Custom {destData.name} Itinerary?</h3>
              <p>
                Tell our holiday experts in Surat your dates, group size, and preferences. We will design your personalized day-by-day vacation with flights, visas, 4★/5★ hotels, and Indian dining.
              </p>
            </div>
            <div className="dest-pkg__cta-actions">
              <button
                type="button"
                className="btn btn-navy dest-pkg__cta-btn-main"
                onClick={() => handleCustomizePackage({ title: `${destData.name} Customized Package` })}
              >
                Customize My {destData.name} Trip
              </button>
              <button
                type="button"
                className="btn dest-pkg__cta-btn-back"
                onClick={onBack}
              >
                ← Back to Destinations
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
