import businessInfo from '../data/businessInfo';
import './PromoBanner.css';

export default function PromoBanner() {
  const handleDealClick = (dealName, minPrice) => {
    const message = `Hello Nehvisa Holidays, I am interested in the "${dealName}" offer starting ${minPrice}. Please share itinerary details.`;
    window.open(`${businessInfo.whatsappLink}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
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

            {/* 3-Column Deals Pill Box */}
            <div className="promo-banner__deals-box" role="group" aria-label="Holiday package price deals">
              {/* Deal 1 */}
              <button
                type="button"
                className="promo-banner__deal-item"
                onClick={() => handleDealClick('World Tours', '₹80,000')}
                title="Inquire about World Tours on WhatsApp"
              >
                <span className="promo-banner__deal-title">World Tours</span>
                <span className="promo-banner__deal-price">From ₹80,000</span>
              </button>

              <div className="promo-banner__divider" aria-hidden="true" />

              {/* Deal 2 */}
              <button
                type="button"
                className="promo-banner__deal-item"
                onClick={() => handleDealClick('Dubai & Asia Tours', '₹35,000')}
                title="Inquire about Asia Tours on WhatsApp"
              >
                <span className="promo-banner__deal-title">Asia Tours</span>
                <span className="promo-banner__deal-price">From ₹35,000</span>
              </button>

              <div className="promo-banner__divider" aria-hidden="true" />

              {/* Deal 3 with Special Badge */}
              <button
                type="button"
                className="promo-banner__deal-item promo-banner__deal-item--featured"
                onClick={() => handleDealClick('Thailand Special Package', '₹49,000')}
                title="Inquire about Thailand Special on WhatsApp"
              >
                <span className="promo-banner__deal-title">Thailand</span>
                <span className="promo-banner__deal-price">From ₹49,000</span>
                <span className="promo-banner__deal-badge">Special Offer</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
