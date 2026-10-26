import { useState, useEffect, useRef } from 'react';
import heroSlides from '../data/heroSlides';
import './Hero.css';

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  const goToSlide = (index) => {
    if (isAnimating || index === currentSlide) return;
    setIsAnimating(true);
    setCurrentSlide(index);
    setTimeout(() => setIsAnimating(false), 800);
  };

  const nextSlide = () => {
    goToSlide((currentSlide + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    goToSlide((currentSlide - 1 + heroSlides.length) % heroSlides.length);
  };

  // Autoplay with touch/focus pause and prefers-reduced-motion check
  useEffect(() => {
    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused]);

  const handleDotClick = (i) => {
    goToSlide(i);
  };

  const handlePrev = () => {
    prevSlide();
  };

  const handleNext = () => {
    nextSlide();
  };

  const slide = heroSlides[currentSlide];

  // Touch swipe support for mobile
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  const handleTouchStart = (e) => {
    setIsPaused(true);
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const diff = touchStartX.current - touchEndX.current;
      if (diff > 45) {
        handleNext();
      } else if (diff < -45) {
        handlePrev();
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
    // Resume autoplay after 3.5 seconds of inactivity
    setTimeout(() => setIsPaused(false), 3500);
  };

  return (
    <section
      id="home"
      className="hero"
      aria-label="Hero slideshow"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      {/* Slides */}
      {heroSlides.map((s, i) => {
        const isCurrent = i === currentSlide;
        // Load only slide 0 on initial page load, and adjacent slides on-demand
        const isLoaded = i === 0 || i === currentSlide || i === (currentSlide + 1) % heroSlides.length;

        return (
          <div
            key={s.id}
            className={`hero__slide${isCurrent ? ' hero__slide--active' : ''}`}
            aria-hidden={!isCurrent}
          >
            {isLoaded ? (
              <picture>
                <source
                  type="image/webp"
                  srcSet={`/${s.baseImage}-800.webp 800w, /${s.baseImage}-1400.webp 1400w`}
                  sizes="(max-width: 768px) 100vw, 100vw"
                />
                <source
                  type="image/jpeg"
                  srcSet={`/${s.baseImage}-800.jpg 800w, /${s.baseImage}-1400.jpg 1400w`}
                  sizes="(max-width: 768px) 100vw, 100vw"
                />
                <img
                  src={`/${s.baseImage}-800.jpg`}
                  alt={`Travel destination: ${s.destination}`}
                  className="hero__bg"
                  width="1400"
                  height="782"
                  loading={i === 0 ? 'eager' : 'lazy'}
                  fetchPriority={i === 0 ? 'high' : 'auto'}
                  decoding="async"
                />
              </picture>
            ) : null}
            <div className="hero__overlay" aria-hidden="true" />
          </div>
        );
      })}

      {/* Content */}
      <div className="hero__content container">
        {/* Brand label */}
        <p className="hero__brand-label" key={`label-${currentSlide}`}>
          <span className="hero__dest-label">{slide.destination}</span>
        </p>

        {/* Main Heading */}
        <h1 className="hero__heading" key={`heading-${currentSlide}`}>
          {slide.headline}
        </h1>

        {/* Subtext */}
        <p className="hero__subtext" key={`sub-${currentSlide}`}>
          {slide.subtext}
        </p>

        {/* CTA Buttons */}
        <div className="hero__ctas">
          <a
            href="#destinations"
            className="btn btn-primary hero__btn"
            id="hero-destinations-btn"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('destinations')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            Explore Destinations
          </a>
          <a
            href="#contact"
            className="btn btn-secondary hero__btn"
            id="hero-contact-btn"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Plan My Trip
          </a>
        </div>
      </div>

      {/* Slider Arrows */}
      <button
        className="hero__arrow hero__arrow--prev"
        onClick={handlePrev}
        aria-label="Previous destination slide"
        type="button"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <button
        className="hero__arrow hero__arrow--next"
        onClick={handleNext}
        aria-label="Next destination slide"
        type="button"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      {/* Dots with accessible tap targets */}
      <div className="hero__dots" role="tablist" aria-label="Destination slides">
        {heroSlides.map((s, i) => (
          <button
            key={s.id}
            className={`hero__dot${i === currentSlide ? ' hero__dot--active' : ''}`}
            onClick={() => handleDotClick(i)}
            aria-label={`Slide ${i + 1}: ${s.destination}`}
            aria-selected={i === currentSlide}
            role="tab"
            type="button"
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="hero__scroll-hint" aria-hidden="true">
        <span className="hero__scroll-mouse">
          <span className="hero__scroll-wheel" />
        </span>
      </div>
    </section>
  );
}
