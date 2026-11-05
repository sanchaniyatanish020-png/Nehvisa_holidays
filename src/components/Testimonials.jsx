import { useState, useRef } from 'react';
import { testimonialsConfig, testimonials } from '../data/testimonials';
import './Testimonials.css';

function TestimonialCard({ item }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = item.text.length > 120;

  return (
    <article className="testi-card" aria-label={`Review by ${item.name}`}>
      {/* 5 Rating Stars */}
      <div className="testi-card__stars" aria-label="5 out of 5 stars">
        {'★'.repeat(item.rating)}
      </div>

      {/* Review Title */}
      <h3 className="testi-card__title">{item.title}</h3>

      {/* Review Description */}
      <p className="testi-card__text">
        {isLong && !expanded ? `${item.text.slice(0, 115)}...` : item.text}
      </p>

      {/* Read More Toggle */}
      {isLong ? (
        <button
          type="button"
          className="testi-card__readmore"
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
        >
          {expanded ? 'Show less' : 'Read more'}
        </button>
      ) : null}

      {/* Author and Date Footer */}
      <div className="testi-card__footer">
        <div className="testi-card__author-info">
          <strong className="testi-card__name">{item.name}</strong>
          <span className="testi-card__location">{item.destination}</span>
        </div>
        <time className="testi-card__date">{item.date}</time>
      </div>
    </article>
  );
}

export default function Testimonials() {
  const trackRef = useRef(null);

  if (!testimonialsConfig.isVisible || !testimonials || testimonials.length === 0) {
    return null;
  }

  const scrollLeft = () => {
    trackRef.current?.scrollBy({ left: -320, behavior: 'smooth' });
  };

  const scrollRight = () => {
    trackRef.current?.scrollBy({ left: 320, behavior: 'smooth' });
  };

  return (
    <section id="testimonials" className="testimonials section" aria-labelledby="testimonials-heading">
      <div className="container">
        {/* Top Header Row matching customer design */}
        <div className="testimonials__header-row">
          <div className="testimonials__header-left">
            <h2 id="testimonials-heading" className="testimonials__title">
              {testimonialsConfig.title}
            </h2>

            {/* Google Rating Badge */}
            <div className="testimonials__rating-badge">
              <div className="testimonials__stars-pill" aria-label="5 star rating">
                <span className="testimonials__star-icon">★</span>
                <span className="testimonials__star-icon">★</span>
                <span className="testimonials__star-icon">★</span>
                <span className="testimonials__star-icon">★</span>
                <span className="testimonials__star-icon">★</span>
              </div>
              <span className="testimonials__rating-score">{testimonialsConfig.ratingText}</span>
              <div className="testimonials__source-info">
                {/* Google G Logo SVG */}
                <svg className="testimonials__g-logo" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span className="testimonials__source-name">{testimonialsConfig.sourceName}</span>
                <span className="testimonials__source-subtext">Verified customer reviews</span>
              </div>
            </div>
          </div>

          {/* Action Buttons: Write a review & Show more reviews */}
          <div className="testimonials__actions">
            <a
              href={testimonialsConfig.writeReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="testimonials__action-btn testimonials__action-btn--write"
              id="write-google-review-btn"
              aria-label="Write a review on Google Maps"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 20h9"/>
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
              </svg>
              <span>Write a review</span>
            </a>

            <a
              href={testimonialsConfig.viewReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="testimonials__action-btn testimonials__action-btn--more"
              id="view-all-google-reviews-btn"
              aria-label="Show more reviews on Google Maps"
            >
              <span>Show more reviews</span>
              <span className="testimonials__chevron-icon" aria-hidden="true">›</span>
            </a>
          </div>
        </div>

        {/* Carousel / Cards Track */}
        <div className="testimonials__slider-wrapper">
          {/* Navigation Arrows for desktop */}
          <button
            type="button"
            className="testimonials__nav-btn testimonials__nav-btn--prev"
            onClick={scrollLeft}
            aria-label="Previous reviews"
          >
            ‹
          </button>

          <div className="testimonials__track" ref={trackRef}>
            {testimonials.map((item) => (
              <div key={item.id} className="testimonials__track-slide">
                <TestimonialCard item={item} />
              </div>
            ))}
          </div>

          <button
            type="button"
            className="testimonials__nav-btn testimonials__nav-btn--next"
            onClick={scrollRight}
            aria-label="Next reviews"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}
