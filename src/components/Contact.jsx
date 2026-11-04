import { useState, useEffect, useRef } from 'react';
import businessInfo from '../data/businessInfo';
import destinations from '../data/destinations';
import './Contact.css';

/** Format ISO date string (2026-12-15) → "15 December 2026" for messages */
function formatDate(isoDate) {
  if (!isoDate) return 'Flexible';
  try {
    return new Date(isoDate).toLocaleDateString('en-IN', {
      day: 'numeric', month: 'long', year: 'numeric'
    });
  } catch {
    return isoDate;
  }
}

function ContactCard({ icon, title, value, btnText, btnHref, btnId, target }) {
  return (
    <div className="contact-card fade-up">
      <div className="contact-card__icon" aria-hidden="true">{icon}</div>
      <div className="contact-card__info">
        <h3 className="contact-card__title">{title}</h3>
        <p className="contact-card__value">{value}</p>
      </div>
      <a
        href={btnHref}
        target={target || '_self'}
        rel={target === '_blank' ? 'noopener noreferrer' : undefined}
        className="contact-card__btn"
        id={btnId}
        aria-label={`${btnText} - ${title}`}
      >
        {btnText}
      </a>
    </div>
  );
}

export default function Contact() {
  const ref = useRef(null);
  const mapWrapRef = useRef(null);
  const [loadMap, setLoadMap] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    destination: 'Dubai',
    tourType: 'International Tour Package',
    travelDate: '',
    notes: '',
  });
  const [adults, setAdults] = useState('2');
  const [children, setChildren] = useState('0');
  const [childAges, setChildAges] = useState([]);
  const [phoneError, setPhoneError] = useState('');

  const handleChildrenChange = (e) => {
    const count = parseInt(e.target.value, 10) || 0;
    setChildren(String(count));
    setChildAges((prev) => {
      const newAges = [...prev];
      if (count > newAges.length) {
        for (let i = newAges.length; i < count; i++) {
          newAges.push('5 Years');
        }
      } else {
        newAges.length = count;
      }
      return newAges;
    });
  };

  const handleChildAgeChange = (index, age) => {
    setChildAges((prev) => {
      const updated = [...prev];
      updated[index] = age;
      return updated;
    });
  };

  const getTravelersSummary = () => {
    const adultNum = parseInt(adults, 10) || 1;
    const childNum = parseInt(children, 10) || 0;
    const adultText = `${adultNum} ${adultNum === 1 ? 'Adult' : 'Adults'}`;

    if (childNum === 0) {
      return adultText;
    }

    const childText = `${childNum} ${childNum === 1 ? 'Child' : 'Children'}`;
    const agesList = childAges
      .slice(0, childNum)
      .map((age, i) => `Child ${i + 1}: ${age || '5 Years'}`)
      .join(', ');

    return `${adultText}, ${childText} (${agesList})`;
  };

  // Listen for destination preselection from Destination cards
  useEffect(() => {
    const handleDestinationSelect = (e) => {
      if (e.detail?.destinationName) {
        setFormData((prev) => ({
          ...prev,
          destination: e.detail.destinationName,
        }));
      }
    };

    window.addEventListener('select-destination', handleDestinationSelect);
    return () => window.removeEventListener('select-destination', handleDestinationSelect);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    );
    ref.current?.querySelectorAll('.fade-up').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Defer Google Maps iframe until user scrolls near the map container
  useEffect(() => {
    const el = mapWrapRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoadMap(true);
          observer.disconnect();
        }
      },
      { rootMargin: '350px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Validate Indian 10-digit mobile number (+91 optional prefix)
  const validateIndianPhone = (phoneStr) => {
    if (!phoneStr.trim()) return false;
    const cleaned = phoneStr.replace(/[\s\-()]/g, '');
    const indianRegex = /^(?:\+?91|0)?[6-9]\d{9}$/;
    return indianRegex.test(cleaned);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === 'phone' && phoneError) {
      if (validateIndianPhone(value)) {
        setPhoneError('');
      }
    }
  };

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();

    if (!validateIndianPhone(formData.phone)) {
      setPhoneError('Please enter a valid 10-digit mobile number (e.g. 9876543210 or +91 9876543210).');
      document.getElementById('planner-phone')?.focus();
      return;
    }
    setPhoneError('');

    const msg = `*New Trip Enquiry - Nehvisa Holidays*\n\n` +
      `👤 *Name:* ${formData.name || 'Not specified'}\n` +
      `📞 *Phone:* ${formData.phone || 'Not specified'}\n` +
      `✈️ *Destination:* ${formData.destination}\n` +
      `🏷️ *Type:* ${formData.tourType}\n` +
      `👥 *Travelers:* ${getTravelersSummary()}\n` +
      `📅 *Tentative Date/Month:* ${formatDate(formData.travelDate)}\n` +
      (formData.notes ? `📝 *Notes:* ${formData.notes}\n` : '');

    const url = `${businessInfo.whatsappLink}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();

    if (!validateIndianPhone(formData.phone)) {
      setPhoneError('Please enter a valid 10-digit mobile number (e.g. 9876543210).');
      document.getElementById('planner-phone')?.focus();
      return;
    }
    setPhoneError('');

    const subject = `Holiday Enquiry for ${formData.destination} - ${formData.name || 'Traveler'}`;
    const body = `Hello Nehvisa Holidays Team,\n\n` +
      `I would like to enquire about a vacation plan.\n\n` +
      `Name: ${formData.name}\n` +
      `Phone: ${formData.phone}\n` +
      `Destination: ${formData.destination}\n` +
      `Tour Type: ${formData.tourType}\n` +
      `Number of Travelers: ${getTravelersSummary()}\n` +
      `Tentative Date/Month: ${formatDate(formData.travelDate)}\n` +
      `Special Requests: ${formData.notes}\n\n` +
      `Looking forward to hearing from you!`;

    const mailto = `mailto:${businessInfo.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  };

  const waUrl = `${businessInfo.whatsappLink}?text=${encodeURIComponent(businessInfo.whatsappDefaultMessage)}`;
  const { address } = businessInfo;

  return (
    <section id="contact" className="contact section" ref={ref} aria-labelledby="contact-heading">
      <div className="container">
        {/* Header */}
        <header className="section-header">
          <p className="section-label fade-up">Get In Touch</p>
          <h2 id="contact-heading" className="section-title fade-up">
            Plan Your Vacation With Us
          </h2>
          <p className="section-subtitle fade-up">
            Tell us your travel preferences and our experts will craft a personalized itinerary for you.
          </p>
        </header>

        {/* Interactive Trip Planner Form */}
        <div className="contact__planner fade-up">
          <div className="contact__planner-header">
            <div className="contact__planner-badge">Custom Vacation Planner</div>
            <h3 className="contact__planner-title">Customize Your Travel Itinerary</h3>
            <p className="contact__planner-sub">Tell us your preferences and our travel experts will design the ideal holiday for you.</p>
          </div>

          <form className="contact__planner-form" onSubmit={handleWhatsAppSubmit}>
            <div className="planner__grid">
              <div className="planner__group">
                <label htmlFor="planner-name">Your Full Name</label>
                <input
                  id="planner-name"
                  type="text"
                  name="name"
                  autoComplete="name"
                  enterKeyHint="next"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Rahul Sharma"
                  required
                />
              </div>

              <div className="planner__group">
                <label htmlFor="planner-phone">Contact Phone Number</label>
                <input
                  id="planner-phone"
                  type="tel"
                  name="phone"
                  inputMode="tel"
                  autoComplete="tel"
                  enterKeyHint="next"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="e.g. 98765 43210 or +91 98765 43210"
                  aria-invalid={!!phoneError}
                  aria-describedby={phoneError ? 'planner-phone-error' : undefined}
                  required
                />
                {phoneError && (
                  <p id="planner-phone-error" className="planner__error-msg" role="alert">
                    {phoneError}
                  </p>
                )}
              </div>

              <div className="planner__group">
                <label htmlFor="planner-destination">Preferred Destination</label>
                <select
                  id="planner-destination"
                  name="destination"
                  value={formData.destination}
                  onChange={handleChange}
                >
                  {destinations.map((d) => (
                    <option key={d.id} value={d.name}>
                      {d.name} ({d.region})
                    </option>
                  ))}
                  <option value="Other">Other destination</option>
                  <option value="Other / Customized">Other / Customized Destination</option>
                </select>
              </div>

              <div className="planner__group">
                <label htmlFor="planner-type">Service Required</label>
                <select
                  id="planner-type"
                  name="tourType"
                  value={formData.tourType}
                  onChange={handleChange}
                >
                  <option value="International Tour Package">International Tour Package</option>
                  <option value="Flight & Hotel Booking">Flight & Hotel Booking</option>
                  <option value="Family Vacation">Family Vacation</option>
                  <option value="Group Tour">Group Tour</option>
                </select>
              </div>

              {/* Adults portion (1 to 9) */}
              <div className="planner__group">
                <label htmlFor="planner-adults">Adults (12+ Years)</label>
                <select
                  id="planner-adults"
                  name="adults"
                  value={adults}
                  onChange={(e) => setAdults(e.target.value)}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'Adult' : 'Adults'}
                    </option>
                  ))}
                </select>
              </div>

              {/* Child portion (0 to 9) */}
              <div className="planner__group">
                <label htmlFor="planner-children">Child (1 to 12 Years)</label>
                <select
                  id="planner-children"
                  name="children"
                  value={children}
                  onChange={handleChildrenChange}
                >
                  <option value="0">0 Child (None)</option>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'Child' : 'Children'}
                    </option>
                  ))}
                </select>
              </div>

              {/* Dynamic Child Age dropdown(s) if child selected (1 to 12 years) */}
              {parseInt(children, 10) > 0 && (
                <div className="planner__child-ages-container planner__group--full">
                  <div className="planner__child-ages-header">
                    <span className="planner__child-ages-icon" aria-hidden="true">👶</span>
                    <span className="planner__child-ages-title">
                      Age of Child ({parseInt(children, 10) === 1 ? 'Select Age (1 - 12 Years)' : 'Select Age for Each Child (1 - 12 Years)'}):
                    </span>
                  </div>
                  <div className="planner__child-ages-grid">
                    {Array.from({ length: parseInt(children, 10) }).map((_, i) => (
                      <div key={i} className="planner__child-age-field">
                        <label htmlFor={`child-age-${i}`}>
                          Child {i + 1} Age
                        </label>
                        <select
                          id={`child-age-${i}`}
                          value={childAges[i] || '5 Years'}
                          onChange={(e) => handleChildAgeChange(i, e.target.value)}
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((age) => (
                            <option key={age} value={`${age} ${age === 1 ? 'Year' : 'Years'}`}>
                              {age} {age === 1 ? 'Year' : 'Years'}
                            </option>
                          ))}
                        </select>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="planner__group">
                <label htmlFor="planner-date">📅 Approximate Travel Date</label>
                <input
                  id="planner-date"
                  type="date"
                  name="travelDate"
                  value={formData.travelDate}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  style={{ cursor: 'pointer' }}
                />
              </div>

              <div className="planner__group planner__group--full">
                <label htmlFor="planner-notes">Special Requests / Preferences</label>
                <textarea
                  id="planner-notes"
                  name="notes"
                  rows="2"
                  enterKeyHint="done"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Any preferences for hotel type, specific sights, budget, or flight arrangements..."
                ></textarea>
              </div>
            </div>

            <div className="planner__actions">
              <button
                type="submit"
                className="btn btn-navy planner__btn-wa"
                id="planner-submit-whatsapp"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
                Request Custom Quotation
              </button>
              <button
                type="button"
                onClick={handleEmailSubmit}
                className="btn btn-outline planner__btn-email"
                id="planner-submit-email"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                Send via Email
              </button>
            </div>
          </form>
        </div>


        {/* Map */}
        <div className="contact__map fade-up">
          <div className="contact__map-header">
            <h3 className="contact__map-title">Find Our Office</h3>
            <a
              href={businessInfo.mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="contact__map-link"
              id="contact-open-maps-btn"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
              Open in Google Maps
            </a>
          </div>
          <div className="contact__map-wrap" ref={mapWrapRef} style={{ minHeight: '420px', background: '#e2e8f0' }}>
            {loadMap ? (
              <iframe
                title="Nehvisa Holidays Office Location - 204 Infinity Business Hub Surat"
                src="https://maps.google.com/maps?q=204%2C%20Infinity%20Business%20Hub%2C%20Palanpor%20Canal%20Road%2C%20Palanpor%2C%20Surat%2C%20Gujarat%20395009&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="420"
                style={{ border: 0, display: 'block' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            ) : null}
          </div>
          <div className="contact__address-bar">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            <address style={{ fontStyle: 'normal' }}>
              {address.line1} {address.line2} {address.line3} {address.line4}
            </address>
          </div>
        </div>
      </div>
    </section>
  );
}
