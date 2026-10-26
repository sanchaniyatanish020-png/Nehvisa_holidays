import { useState, useEffect, useRef } from 'react';
import businessInfo from '../data/businessInfo';
import destinations from '../data/destinations';
import './Contact.css';

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
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    destination: 'Dubai',
    tourType: 'International Tour Package',
    travelers: '2 Adults (Couple)',
    travelDate: '',
    notes: '',
  });
  const [phoneError, setPhoneError] = useState('');

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
      `👥 *Travelers:* ${formData.travelers}\n` +
      `📅 *Tentative Date/Month:* ${formData.travelDate || 'Flexible'}\n` +
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
      `Number of Travelers: ${formData.travelers}\n` +
      `Tentative Date/Month: ${formData.travelDate}\n` +
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
                  <option value="Domestic / India Tour">Domestic / India Tour</option>
                  <option value="Char Dham / Spiritual Yatra">Char Dham / Spiritual Yatra</option>
                  <option value="Flight & Hotel Booking">Flight & Hotel Booking</option>
                  <option value="Family Vacation">Family Vacation</option>
                  <option value="Group Tour">Group Tour</option>
                </select>
              </div>

              <div className="planner__group">
                <label htmlFor="planner-travelers">Travelers</label>
                <select
                  id="planner-travelers"
                  name="travelers"
                  value={formData.travelers}
                  onChange={handleChange}
                >
                  <option value="1 Solo Traveler">Solo Traveler</option>
                  <option value="2 Adults (Couple)">2 Adults (Couple)</option>
                  <option value="Family (3-5 people)">Family (3-5 people)</option>
                  <option value="Group (6+ people)">Group (6+ people)</option>
                </select>
              </div>

              <div className="planner__group">
                <label htmlFor="planner-date">Approximate Travel Month / Date</label>
                <input
                  id="planner-date"
                  type="text"
                  name="travelDate"
                  value={formData.travelDate}
                  onChange={handleChange}
                  placeholder="e.g. Next Month / Diwali Holidays"
                />
              </div>

              <div className="planner__group planner__group--full">
                <label htmlFor="planner-notes">Special Requests / Preferences</label>
                <textarea
                  id="planner-notes"
                  name="notes"
                  rows="2"
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

        {/* Contact Cards */}
        <div className="contact__cards">
          <ContactCard
            icon={
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.66A2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92"/>
              </svg>
            }
            title="Phone"
            value={businessInfo.phone}
            btnText="Call Now"
            btnHref={businessInfo.phoneLink}
            btnId="contact-call-btn"
          />
          <ContactCard
            icon={
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.558 4.119 1.532 5.849L.057 23.7a.5.5 0 0 0 .623.624l5.85-1.474A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.796 9.796 0 0 1-5.126-1.447l-.368-.218-3.822.963.981-3.72-.239-.384A9.792 9.792 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182c5.43 0 9.818 4.388 9.818 9.818 0 5.43-4.388 9.818-9.818 9.818z"/>
              </svg>
            }
            title="WhatsApp"
            value={businessInfo.whatsapp}
            btnText="Chat on WhatsApp"
            btnHref={waUrl}
            btnId="contact-whatsapp-btn"
            target="_blank"
          />
          <ContactCard
            icon={
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            }
            title="Email"
            value={businessInfo.email}
            btnText="Email Us"
            btnHref={businessInfo.emailLink}
            btnId="contact-email-btn"
          />
          <ContactCard
            icon={
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            }
            title="Office"
            value={`${address.line1} ${address.line2} ${address.line3} ${address.line4}`}
            btnText="Get Directions"
            btnHref={businessInfo.mapsLink}
            btnId="contact-directions-btn"
            target="_blank"
          />
        </div>

        {/* Office Hours */}
        <div className="contact__hours fade-up">
          <div className="contact__hours-icon" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
          </div>
          <div>
            <h3 className="contact__hours-title">Office Hours</h3>
            <p className="contact__hours-detail">{businessInfo.hours.days}</p>
            <p className="contact__hours-detail">{businessInfo.hours.time}</p>
          </div>
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
          <div className="contact__map-wrap">
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

        {/* Instagram CTA */}
        <div className="contact__instagram fade-up">
          <div className="contact__instagram-icon" aria-hidden="true">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
            </svg>
          </div>
          <div className="contact__instagram-text">
            <p className="contact__instagram-handle">{businessInfo.instagram.handle}</p>
            <p className="contact__instagram-sub">Follow us for travel updates and inspiration</p>
          </div>
          <a
            href={businessInfo.instagram.link}
            target="_blank"
            rel="noopener noreferrer"
            className="btn contact__instagram-btn"
            id="contact-instagram-btn"
            aria-label="Follow Nehvisa Holidays on Instagram"
          >
            Follow Us on Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
