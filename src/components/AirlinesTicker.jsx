import './AirlinesTicker.css';

const airlines = [
  'Emirates',
  'Qatar Airways',
  'Air India',
  'IndiGo',
  'Singapore Airlines',
  'Malaysia Airlines',
  'Vietnam Airlines',
  'VietJet Air',
  'Thai Airways',
  'AirAsia',
  'Garuda Indonesia',
  'Etihad Airways',
  'flydubai',
  'Scoot',
  'SriLankan Airlines',
];

export default function AirlinesTicker() {
  // Duplicate list twice for seamless infinite CSS loop
  const marqueeList = [...airlines, ...airlines];

  return (
    <aside className="airlines-ticker" aria-label="Airline Partners and Flight Booking Available">
      <div className="airlines-ticker__inner">
        {/* Fixed Title Label on Left for Brand Trust */}
        <div className="airlines-ticker__badge">
          <svg
            className="airlines-ticker__badge-icon"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
          </svg>
          <span>Flight Partners</span>
        </div>

        {/* Continuously Moving Airline Names Track */}
        <div className="airlines-ticker__track-container">
          <div className="airlines-ticker__track">
            {marqueeList.map((airline, idx) => (
              <span key={`${airline}-${idx}`} className="airlines-ticker__item">
                <svg
                  className="airlines-ticker__plane-icon"
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
                </svg>
                <span className="airlines-ticker__name">{airline}</span>
                <span className="airlines-ticker__dot" aria-hidden="true">•</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
