import './AirlinesTicker.css';

const airlines = [
  { name: 'Emirates', code: 'EK' },
  { name: 'Qatar Airways', code: 'QR' },
  { name: 'Air India', code: 'AI' },
  { name: 'IndiGo', code: '6E' },
  { name: 'Singapore Airlines', code: 'SQ' },
  { name: 'Malaysia Airlines', code: 'MH' },
  { name: 'Vietnam Airlines', code: 'VN' },
  { name: 'VietJet Air', code: 'VJ' },
  { name: 'Thai Airways', code: 'TG' },
  { name: 'AirAsia', code: 'AK' },
  { name: 'Garuda Indonesia', code: 'GA' },
  { name: 'Etihad Airways', code: 'EY' },
  { name: 'flydubai', code: 'FZ' },
  { name: 'Scoot', code: 'TR' },
  { name: 'SriLankan Airlines', code: 'UL' },
];

export default function AirlinesTicker() {
  // Duplicate list twice for seamless infinite CSS loop
  const marqueeList = [...airlines, ...airlines];

  return (
    <aside className="airlines-ticker" aria-label="Official Flight Partners">
      <div className="airlines-ticker__inner">
        {/* Continuously Moving Airline Names & Official Logos */}
        <div className="airlines-ticker__track-container">
          <div className="airlines-ticker__track">
            {marqueeList.map((airline, idx) => (
              <span key={`${airline.code}-${idx}`} className="airlines-ticker__item">
                <span className="airlines-ticker__logo-wrap">
                  <picture>
                    <source
                      type="image/webp"
                      srcSet={`${import.meta.env.BASE_URL}airlines/${airline.code}.webp`}
                    />
                    <img
                      src={`${import.meta.env.BASE_URL}airlines/${airline.code}.png`}
                      alt={`${airline.name} official logo`}
                      className="airlines-ticker__logo"
                      width="36"
                      height="36"
                      loading="lazy"
                      decoding="async"
                    />
                  </picture>
                </span>
                <span className="airlines-ticker__name">{airline.name}</span>
                <span className="airlines-ticker__dot" aria-hidden="true">•</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
