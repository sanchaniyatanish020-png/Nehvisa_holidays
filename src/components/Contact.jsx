import { useState, useEffect, useRef } from 'react';
import businessInfo from '../data/businessInfo';
import destinations from '../data/destinations';
import './Contact.css';

/** Format ISO date string (2026-12-15) → "15 December 2026" for messages */
function formatDate(isoDate) {
  if (!isoDate) return 'Flexible';
  try {
    return new Date(isoDate).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  } catch {
    return isoDate;
  }
}

export default function Contact() {
  const ref = useRef(null);
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

    const msg =
      `*New Trip Enquiry - Nehvisa Holidays*\n\n` +
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
    const body =
      `Hello Nehvisa Holidays Team,\n\n` +
      `I would like to enquire about a vacation plan.\n\n` +
      `Name: ${formData.name}\n` +
      `Phone: ${formData.phone}\n` +
      `Destination: ${formData.destination}\n` +
      `Tour Type: ${formData.tourType}\n` +
      `Number of Travelers: ${getTravelersSummary()}\n` +
      `Tentative Date/Month: ${formatDate(formData.travelDate)}\n` +
      `Special Requests: ${formData.notes}\n\n` +
      `Looking forward to hearing from you!`;

    const mailto = `mailto:${businessInfo.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  };

  return (
    <section id="contact" className="contact-with-bg" ref={ref} aria-labelledby="contact-heading">
      {/* Background Image Container */}
      <div className="contact-with-bg__img-wrap" aria-hidden="true">
        <picture>
          <img
            src={`${import.meta.env.BASE_URL}inquiry-bg.jpg`}
            onError={(e) => {
              e.currentTarget.src = `${import.meta.env.BASE_URL}cruise-1400.jpg`;
            }}
            alt=""
            className="contact-with-bg__img"
            loading="lazy"
            decoding="async"
            width="1400"
            height="800"
          />
        </picture>
        <div className="contact-with-bg__overlay" />
      </div>

      <div className="container contact-with-bg__container">
        {/* Header */}
        <header className="contact-with-bg__header">
          <span className="contact-with-bg__badge">Custom Vacation Planner</span>
          <h2 id="contact-heading" className="contact-with-bg__title">
            Customize Your Travel Itinerary
          </h2>
          <p className="contact-with-bg__subtitle">
            Tell us your preferences and our travel experts will design the ideal holiday for you.
          </p>
        </header>

        {/* Interactive Trip Planner Form Card */}
        <div className="contact__planner-box">
          <form className="contact__planner-form" onSubmit={handleWhatsAppSubmit}>
            <div className="planner__grid">
              {/* Field 1: Your Full Name */}
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

              {/* Field 2: Contact Phone Number */}
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

              {/* Field 3: Preferred Destination */}
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
                  <option value="Europe">Europe / Switzerland &amp; Paris</option>
                  <option value="Other / Customized">Other / Customized Destination</option>
                </select>
              </div>

              {/* Field 4: Service Required */}
              <div className="planner__group">
                <label htmlFor="planner-type">Service Required</label>
                <select
                  id="planner-type"
                  name="tourType"
                  value={formData.tourType}
                  onChange={handleChange}
                >
                  <option value="International Tour Package">International Tour Package</option>
                  <option value="Flight &amp; Hotel Booking">Flight &amp; Hotel Booking</option>
                  <option value="Family Vacation">Family Vacation</option>
                  <option value="Group Tour">Group Tour</option>
                  <option value="Honeymoon Package">Honeymoon Package</option>
                </select>
              </div>

              {/* Field 5: Adults (12+ Years) */}
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

              {/* Field 6: Child (1 to 12 Years) */}
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

              {/* Dynamic Child Ages dropdowns if child selected */}
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

              {/* Field 7: Approximate Travel Date */}
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

              {/* Field 8: Special Requests / Preferences */}
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

            {/* Buttons: Request Custom Quotation & Send via Email */}
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
      </div>
    </section>
  );
}
