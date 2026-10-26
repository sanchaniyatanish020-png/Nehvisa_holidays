import { testimonialsConfig, testimonials } from '../data/testimonials';
import './Testimonials.css';

export default function Testimonials() {
  if (!testimonialsConfig.isVisible || !testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <section id="testimonials" className="testimonials section" aria-labelledby="testimonials-heading">
      <div className="container">
        <header className="section-header">
          <p className="section-label fade-up">{testimonialsConfig.sectionLabel}</p>
          <h2 id="testimonials-heading" className="section-title fade-up">
            {testimonialsConfig.title}
          </h2>
          <p className="section-subtitle fade-up">
            {testimonialsConfig.subtitle}
          </p>
        </header>

        <div className="testimonials__grid">
          {testimonials.map((item) => (
            <article key={item.id} className="testimonial-card fade-up">
              <div className="testimonial-card__stars" aria-label={`${item.rating} out of 5 stars`}>
                {'★'.repeat(item.rating)}
              </div>
              <blockquote className="testimonial-card__text">
                "{item.text}"
              </blockquote>
              <div className="testimonial-card__author">
                <strong className="testimonial-card__name">{item.name}</strong>
                <span className="testimonial-card__meta">
                  {item.destination} • {item.location}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
