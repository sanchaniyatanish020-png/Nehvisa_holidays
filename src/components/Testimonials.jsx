import { useState, useEffect, useRef } from 'react';
import businessInfo from '../data/businessInfo';
import './Testimonials.css';

export default function Testimonials() {
  const [loadMap, setLoadMap] = useState(false);
  const sectionRef = useRef(null);

  // Lazy load the interactive Google Map only when section approaches viewport for 90+ Lighthouse score
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoadMap(true);
          observer.disconnect();
        }
      },
      { rootMargin: '300px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const { googleReviews } = businessInfo;

  return (
    <section id="testimonials" className="testimonials section" ref={sectionRef} aria-labelledby="testimonials-heading">
      <div className="container">
        {/* Section Header */}
        <div className="testimonials__header-row">
          <div className="testimonials__header-left">
            <p className="section-label">Google Rating & Reviews</p>
            <h2 id="testimonials-heading" className="testimonials__title">
              What do our customers say about our service?
            </h2>

            {/* Official Google Rating Badge */}
            <div className="testimonials__rating-badge">
              <div className="testimonials__stars-pill" aria-label="5 star Google rating">
                <span className="testimonials__star-icon">★</span>
                <span className="testimonials__star-icon">★</span>
                <span className="testimonials__star-icon">★</span>
                <span className="testimonials__star-icon">★</span>
                <span className="testimonials__star-icon">★</span>
              </div>
              <span className="testimonials__rating-score">Great | 5.0 Stars</span>
              <div className="testimonials__source-info">
                {/* Google G Logo */}
                <svg className="testimonials__g-logo" width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span className="testimonials__source-name">Google Reviews</span>
                <span className="testimonials__source-subtext">Verified feedback on Google Maps</span>
              </div>
            </div>
          </div>

          {/* Header Action Buttons */}
          <div className="testimonials__actions">
            <a
              href={googleReviews.writeReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="testimonials__action-btn testimonials__action-btn--write"
              id="header-write-review-btn"
              aria-label="Write a review on Google Maps"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 20h9"/>
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
              </svg>
              <span>Write a review</span>
            </a>

            <a
              href={googleReviews.viewReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="testimonials__action-btn testimonials__action-btn--more"
              id="header-view-reviews-btn"
              aria-label="Show all reviews on Google Maps"
            >
              <span>Show more reviews</span>
              <span className="testimonials__chevron-icon" aria-hidden="true">›</span>
            </a>
          </div>
        </div>

        {/* Live Google Maps & Business Profile Card View */}
        <div className="gmap-view-card">
          {/* Left: Google Business Listing Highlights */}
          <div className="gmap-view-card__info">
            <div className="gmap-view-card__badge-row">
              <span className="gmap-view-card__badge">
                <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                Google Verified Business
              </span>
              <span className="gmap-view-card__rating-tag">5.0 ★★★★★</span>
            </div>

            <h3 className="gmap-view-card__name">Nehvisa Holidays</h3>
            <p className="gmap-view-card__cat">Tour Operator & Travel Agency in Surat, Gujarat</p>

            <div className="gmap-view-card__rating-box">
              <div className="gmap-view-card__score">5.0</div>
              <div className="gmap-view-card__score-details">
                <div className="gmap-view-card__stars" aria-label="5 out of 5 stars">
                  ★★★★★
                </div>
                <span className="gmap-view-card__review-sub">
                  Google Maps Customer Reviews
                </span>
              </div>
            </div>

            <ul className="gmap-view-card__details" role="list">
              <li>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>204, Infinity Business Hub, Palanpor Canal Road, Surat - 395009</span>
              </li>
              <li>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
                <span>Mon – Sun: 10:00 AM – 7:00 PM</span>
              </li>
              <li>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.66A2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92"/>
                </svg>
                <span>+91 82005 18010</span>
              </li>
            </ul>

            {/* Direct Action Buttons */}
            <div className="gmap-view-card__ctas">
              <a
                href={googleReviews.writeReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn gmap-view-card__btn-write"
                id="gmap-card-write-btn"
                aria-label="Write a review for Nehvisa Holidays on Google"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 20h9"/>
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
                </svg>
                <span>Write A Review</span>
              </a>

              <a
                href={businessInfo.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn gmap-view-card__btn-directions"
                id="gmap-card-directions-btn"
                aria-label="Get directions to Nehvisa Holidays on Google Maps"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <polygon points="3 11 22 2 13 21 11 13 3 11"/>
                </svg>
                <span>Get Directions</span>
              </a>
            </div>
          </div>

          {/* Right: Live Interactive Google Map View of Nehvisa Holidays */}
          <div className="gmap-view-card__map-wrap">
            {loadMap ? (
              <iframe
                title="Nehvisa Holidays Live Google Map Location and Reviews"
                src={businessInfo.mapsEmbed}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '400px', display: 'block' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              <div className="gmap-view-card__map-placeholder">
                <span className="gmap-view-card__loading-text">Loading Google Maps view...</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
