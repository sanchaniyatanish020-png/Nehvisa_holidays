import businessInfo from '../data/businessInfo';
import './PromoBanner.css';

export default function PromoBanner() {
  const handleDealClick = (destName) => {
    window.dispatchEvent(
      new CustomEvent('select-destination', {
        detail: { destinationName: destName },
      })
    );
    const destEl = document.getElementById('destinations');
    if (destEl) {
      destEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      const message = `Hello Nehvisa Holidays, I am interested in planning a holiday trip to ${destName}. Please share itinerary details.`;
      window.open(`${businessInfo.whatsappLink}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section className="promo-section" aria-label="Seasonal Holiday Offer">
      <div className="container">
        <div className="promo-banner">
          {/* Left Collage of Destination Images */}
          <div className="promo-banner__collage" aria-hidden="true">
            {/* Column 1: Two stacked images */}
            <div className="promo-banner__col promo-banner__col--split">
              <div className="promo-banner__img-box">
                <img
                  src={`${import.meta.env.BASE_URL}thailand-800.webp`}
                  alt="Thailand tours"
                  width="200"
                  height="140"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="promo-banner__img-box">
                <img
                  src={`${import.meta.env.BASE_URL}vietnam-800.webp`}
                  alt="Vietnam Golden Bridge"
                  width="200"
                  height="140"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>

            {/* Column 2: Dubai vertical strip */}
            <div className="promo-banner__col">
              <div className="promo-banner__img-box promo-banner__img-box--full">
                <img
                  src={`${import.meta.env.BASE_URL}dubai-800.webp`}
                  alt="Dubai luxury holidays"
                  width="220"
                  height="280"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>

            {/* Column 3: Bali vertical strip */}
            <div className="promo-banner__col">
              <div className="promo-banner__img-box promo-banner__img-box--full">
                <img
                  src={`${import.meta.env.BASE_URL}bali-800.webp`}
                  alt="Bali temples and beaches"
                  width="220"
                  height="280"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>

            {/* Column 4: Singapore vertical strip */}
            <div className="promo-banner__col">
              <div className="promo-banner__img-box promo-banner__img-box--full">
                <img
                  src={`${import.meta.env.BASE_URL}singapore-800.webp`}
                  alt="Singapore city skylines"
                  width="220"
                  height="280"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>

          {/* Right Text & Deals Box */}
          <div className="promo-banner__content">
            <div className="promo-banner__header">
              <h2 className="promo-banner__title">
                <span className="promo-banner__title-top">ONE HOLIDAY!</span>
                <span className="promo-banner__title-bottom">
                  BEFORE THE{' '}
                  <span className="promo-banner__highlight">
                    YEAR ENDS!
                    <svg
                      className="promo-banner__brush"
                      viewBox="0 0 160 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        d="M3 10C45 4 115 3 157 7"
                        stroke="#f59e0b"
                        strokeWidth="5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </span>
              </h2>
            </div>

            {/* 3-Column Deals Pill Box: Exact Website Destinations without Price */}
            <div className="promo-banner__deals-box" role="group" aria-label="Featured holiday destinations">
              {/* Destination 1: Dubai */}
              <button
                type="button"
                className="promo-banner__deal-item"
                onClick={() => handleDealClick('Dubai')}
                title="Explore Dubai Packages"
              >
                <span className="promo-banner__deal-title">Dubai</span>
                <span className="promo-banner__deal-sub">Custom Plan</span>
              </button>

              <div className="promo-banner__divider" aria-hidden="true" />

              {/* Destination 2: Bali */}
              <button
                type="button"
                className="promo-banner__deal-item"
                onClick={() => handleDealClick('Bali / Indonesia')}
                title="Explore Bali Packages"
              >
                <span className="promo-banner__deal-title">Bali</span>
                <span className="promo-banner__deal-sub">Custom Plan</span>
              </button>

              <div className="promo-banner__divider" aria-hidden="true" />

              {/* Destination 3: Vietnam with Special Badge */}
              <button
                type="button"
                className="promo-banner__deal-item promo-banner__deal-item--featured"
                onClick={() => handleDealClick('Vietnam')}
                title="Explore Vietnam Packages"
              >
                <span className="promo-banner__deal-title">Vietnam</span>
                <span className="promo-banner__deal-sub">Custom Plan</span>
                <span className="promo-banner__deal-badge">Special Offer</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
