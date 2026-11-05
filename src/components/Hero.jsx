import { useState, useEffect, useRef } from 'react';
import heroSlides from '../data/heroSlides';
import './Hero.css';

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [allowAdjacentLoad, setAllowAdjacentLoad] = useState(false);
  const timerRef = useRef(null);

  // Defer loading adjacent slide images until after critical load is complete
  useEffect(() => {
    const timer = setTimeout(() => {
      setAllowAdjacentLoad(true);
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

  const goToSlide = (index) => {
    if (isAnimating || index === currentSlide) return;
    setAllowAdjacentLoad(true);
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
    }, 6000);

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

  const safeIndex = currentSlide < heroSlides.length ? currentSlide : 0;
  const slide = heroSlides[safeIndex];

  // Touch swipe support for mobile destination slides
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
      const diffX = touchStartX.current - touchEndX.current;
      if (diffX > 30) {
        handleNext();
      } else if (diffX < -30) {
        handlePrev();
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
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
        const isLoaded = i === 0 || i === currentSlide || (allowAdjacentLoad && (i === (currentSlide + 1) % heroSlides.length || i === (currentSlide - 1 + heroSlides.length) % heroSlides.length));

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
                  srcSet={`${import.meta.env.BASE_URL}${s.baseImage}-800.webp 800w, ${import.meta.env.BASE_URL}${s.baseImage}-1400.webp 1400w`}
                  sizes="(max-width: 768px) 100vw, 100vw"
                />
                <source
                  type="image/jpeg"
                  srcSet={`${import.meta.env.BASE_URL}${s.baseImage}-800.jpg 800w, ${import.meta.env.BASE_URL}${s.baseImage}-1400.jpg 1400w`}
                  sizes="(max-width: 768px) 100vw, 100vw"
                />
                <img
                  src={`${import.meta.env.BASE_URL}${s.baseImage}-800.webp`}
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
        {/* Brand / Destination Badge */}
        <div className="hero__brand-label" key={`label-${currentSlide}`}>
          <span className="hero__dest-label">
            <span className="hero__dest-star" aria-hidden="true">✦</span>
            <span>{slide.destination}</span>
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="hero__heading" key={`heading-${currentSlide}`}>
          {slide.headlinePrefix} <span className="hero__heading-accent">{slide.headlineAccent}</span>
        </h1>

        {/* Subtext */}
        <p className="hero__subtext" key={`sub-${currentSlide}`}>
          {slide.subtext}
        </p>

        {/* CTA Buttons */}
        <div className="hero__ctas">
          <a
            href="https://wa.me/919909943345?text=Hello%20Nehvisa%20Holidays%2C%20I%20would%20like%20to%20plan%20a%20holiday%20trip."
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary hero__btn hero__btn--primary"
            id="hero-wa-btn"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.275.072.376-.044c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824z" />
            </svg>
            <span>Book On WhatsApp</span>
          </a>
          <a
            href="#destinations"
            className="btn btn-secondary hero__btn"
            id="hero-destinations-btn"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('destinations')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span>Explore Packages</span>
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

      {/* Classic Mouse Scroll Indicator */}
      <button
        className="hero__scroll-hint"
        type="button"
        aria-label="Scroll down to About section"
        onClick={() => {
          document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <span className="hero__scroll-mouse">
          <span className="hero__scroll-wheel" />
        </span>
      </button>
    </section>
  );
}
