import { useEffect } from 'react';
import destinationPackages from '../data/destinationPackages';
import businessInfo from '../data/businessInfo';
import './DestinationPackages.css';

export default function DestinationPackages({ slug, onBack, onSelectForInquiry }) {
  const destData = destinationPackages[slug] || destinationPackages.dubai;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  const handleWhatsAppPackage = (pkg) => {
    const text = `Hello Nehvisa Holidays, I am interested in the *${pkg.title}* (${pkg.duration}) for *${destData.name}*. Please send me the complete custom quotation and itinerary details.`;
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
    <div className="dest-pkg-page" role="main" aria-label={`${destData.name} Holiday Packages`}>
      {/* Sticky Sub-Header with Back Button & Quick Contact */}
      <div className="dest-pkg__top-bar">
        <div className="container dest-pkg__top-bar-inner">
          <button
            type="button"
            className="dest-pkg__back-btn"
            onClick={onBack}
            aria-label="Back to home page"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            <span>Back to All Destinations</span>
          </button>

          <div className="dest-pkg__top-contact">
            <span className="dest-pkg__top-tag">Surat Office Support</span>
            <a href={`tel:${businessInfo.phoneRaw}`} className="dest-pkg__top-phone">
              📞 {businessInfo.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Hero Header */}
      <header className="dest-pkg__hero">
        <img
          src={destData.heroImage}
          alt={destData.fullName}
          className="dest-pkg__hero-bg"
          loading="eager"
        />
        <div className="dest-pkg__hero-overlay" />

        <div className="container dest-pkg__hero-content">
          <div className="dest-pkg__badges">
            <span className="dest-pkg__badge-region">{destData.region}</span>
            <span className="dest-pkg__badge-custom">100% Customisable Packages</span>
          </div>

          <h1 className="dest-pkg__hero-title">{destData.fullName} Tour Packages</h1>
          <p className="dest-pkg__hero-tagline">{destData.tagline}</p>

          <div className="dest-pkg__hero-perks">
            <span>✨ Pure Veg &amp; Jain Food Options</span>
            <span>✈️ Flight Booking &amp; Visa Assistance</span>
            <span>⭐ Best Custom Itineraries from Surat</span>
          </div>
        </div>
      </header>

      {/* Main Packages Section */}
      <section className="dest-pkg__content section">
        <div className="container">
          <div className="dest-pkg__section-header">
            <span className="section-label">Tailored Itineraries</span>
            <h2 className="section-title">Popular {destData.name} Holiday Packages</h2>
            <p className="section-subtitle">
              Every package is fully customizable according to your travel dates, family size, hotel preferences, and budget.
            </p>
          </div>

          {/* Package Cards Grid */}
          <div className="dest-pkg__grid">
            {destData.packages.map((pkg, idx) => (
              <div key={pkg.id || idx} className="dest-pkg__card">
                <div className="dest-pkg__card-top">
                  <span className="dest-pkg__card-category">{pkg.category}</span>
                  <span className="dest-pkg__card-duration">⏱️ {pkg.duration}</span>
                </div>

                <h3 className="dest-pkg__card-title">{pkg.title}</h3>
                <p className="dest-pkg__card-dest">Destination: <strong>{destData.name}</strong></p>

                <div className="dest-pkg__card-inclusions">
                  <h4 className="dest-pkg__inclusions-title">Package Inclusions:</h4>
                  <ul className="dest-pkg__inclusions-list">
                    {pkg.inclusions.map((item, i) => (
                      <li key={i}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="dest-pkg__card-pricing-note">
                  <span className="dest-pkg__custom-quote-badge">Custom Quotation</span>
                  <span className="dest-pkg__custom-quote-text">Exact price based on your travel dates &amp; group</span>
                </div>

                {/* Actions */}
                <div className="dest-pkg__card-actions">
                  <button
                    type="button"
                    className="btn btn-navy dest-pkg__btn-wa"
                    onClick={() => handleWhatsAppPackage(pkg)}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.06-2.125-.536-1.722-.716-2.834-2.463-2.92-2.576-.086-.115-.694-.925-.694-1.764s.436-1.25.592-1.422c.156-.172.341-.215.455-.215.114 0 .229.002.328.007.106.005.248-.04.388.297.144.346.491 1.2.534 1.288.043.088.072.19.014.305-.058.115-.087.187-.173.287-.086.1-.182.224-.26.3-.086.085-.176.178-.076.35.1.172.446.736.958 1.192.658.586 1.213.768 1.385.854.172.086.273.072.373-.043.1-.115.43-.502.545-.674.115-.172.23-.144.388-.086.158.058 1.002.473 1.174.56.172.086.287.129.33.201.043.072.043.418-.101.823z" />
                    </svg>
                    <span>Get Quote on WhatsApp</span>
                  </button>

                  <button
                    type="button"
                    className="btn btn-outline dest-pkg__btn-customize"
                    onClick={() => handleCustomizePackage(pkg)}
                  >
                    <span>Customize in Planner</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Destination Highlights & Overview */}
          <div className="dest-pkg__overview-box">
            <div className="dest-pkg__overview-text">
              <h3 className="dest-pkg__overview-title">Why Travel to {destData.name} with Nehvisa Holidays?</h3>
              <p className="dest-pkg__overview-desc">{destData.overview}</p>

              <div className="dest-pkg__perks-grid">
                <div className="dest-pkg__perk-item">
                  <span className="dest-pkg__perk-icon">🏨</span>
                  <div>
                    <h4>Handpicked Hotels</h4>
                    <p>Centrally located 4-Star &amp; 5-Star properties with top guest ratings.</p>
                  </div>
                </div>
                <div className="dest-pkg__perk-item">
                  <span className="dest-pkg__perk-icon">🍲</span>
                  <div>
                    <h4>Jain &amp; Vegetarian Meals</h4>
                    <p>Specially curated Indian restaurant recommendations and catering options.</p>
                  </div>
                </div>
                <div className="dest-pkg__perk-item">
                  <span className="dest-pkg__perk-icon">🛂</span>
                  <div>
                    <h4>Full Visa Support</h4>
                    <p>Documentation, application, and appointment assistance from Surat.</p>
                  </div>
                </div>
                <div className="dest-pkg__perk-item">
                  <span className="dest-pkg__perk-icon">🚗</span>
                  <div>
                    <h4>Private AC Sightseeing</h4>
                    <p>Comfortable transfers with experienced English &amp; Hindi speaking drivers.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="dest-pkg__highlights-box">
              <h4 className="dest-pkg__highlights-title">Top Must-Experience Highlights:</h4>
              <ul className="dest-pkg__highlights-list">
                {destData.highlights.map((h, i) => (
                  <li key={i}>
                    <span className="dest-pkg__bullet">★</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Call to Action */}
          <div className="dest-pkg__cta-banner">
            <div className="dest-pkg__cta-content">
              <h3>Ready to Plan Your {destData.name} Vacation?</h3>
              <p>Our dedicated travel planners in Surat design personalized day-by-day itineraries tailored specifically for you and your family.</p>
            </div>
            <div className="dest-pkg__cta-actions">
              <button
                type="button"
                className="btn btn-navy dest-pkg__cta-btn-main"
                onClick={() => handleCustomizePackage({ title: `${destData.name} Custom Itinerary` })}
              >
                Plan My {destData.name} Trip Now
              </button>
              <button
                type="button"
                className="btn btn-outline dest-pkg__cta-btn-back"
                onClick={onBack}
              >
                ← Back to Home
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
