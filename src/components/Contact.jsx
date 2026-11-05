import { useState, useEffect, useRef } from 'react';
import businessInfo from '../data/businessInfo';
import destinations from '../data/destinations';
import './Contact.css';

export default function Contact() {
  const sectionRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    destination: '',
  });
  const [consent, setConsent] = useState(true);
  const [phoneError, setPhoneError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

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

  // Validate Indian 10-digit mobile number
  const validatePhone = (phoneStr) => {
    const cleaned = phoneStr.replace(/[\s\-()]/g, '');
    const indianRegex = /^[6-9]\d{9}$/;
    return indianRegex.test(cleaned);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      const numbersOnly = value.replace(/\D/g, '').slice(0, 10);
      setFormData((prev) => ({ ...prev, phone: numbersOnly }));
      if (phoneError && numbersOnly.length === 10) {
        setPhoneError('');
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validatePhone(formData.phone)) {
      setPhoneError('Please enter a valid 10-digit mobile number.');
      document.getElementById('contact-phone')?.focus();
      return;
    }
    setPhoneError('');

    if (!consent) {
      alert('Please accept the Privacy Policy to proceed.');
      return;
    }

    // Format callback request message for WhatsApp
    const msg =
      `*New Callback Request - Nehvisa Holidays*\n\n` +
      `👤 *Name:* ${formData.name.trim()}\n` +
      `📞 *Mobile:* +91 ${formData.phone.trim()}\n` +
      (formData.email.trim() ? `✉️ *Email:* ${formData.email.trim()}\n` : '') +
      `✈️ *Destination:* ${formData.destination || 'Not decided yet'}\n\n` +
      `_Please arrange a callback tailored to my vacation preferences._`;

    const waUrl = `${businessInfo.whatsappLink}?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
    }, 8000);
  };

  return (
    <section id="contact" className="contact-banner" ref={sectionRef} aria-labelledby="contact-heading">
      <div className="contact-banner__bg-wrap">
        <picture>
          <source type="image/webp" srcSet={`${import.meta.env.BASE_URL}inquiry-bg.webp`} />
          <img
            src={`${import.meta.env.BASE_URL}inquiry-bg.jpg`}
            onError={(e) => {
              // Fallback to existing high-res coastal/scenic image if inquiry-bg is not yet present
              e.currentTarget.src = `${import.meta.env.BASE_URL}cruise-1400.jpg`;
            }}
            alt="Scenic Mediterranean coastal destination"
            className="contact-banner__bg-img"
            loading="lazy"
            decoding="async"
            width="1400"
            height="800"
          />
        </picture>
        <div className="contact-banner__overlay" aria-hidden="true" />
      </div>

      <div className="container contact-banner__container">
        {/* Left Side: Dramatic Typography */}
        <div className="contact-banner__text-col">
          <h2 id="contact-heading" className="contact-banner__title">
            Need help<br />
            choosing<br />
            your destination?
          </h2>
          <p className="contact-banner__subtitle">
            Speak to our travel expert for a trip tailored just for you.
          </p>
        </div>

        {/* Right Side: Floating Clean Form Card */}
        <div className="contact-banner__card-col">
          <div className="contact-card-box">
            {isSubmitted ? (
              <div className="contact-card-box__success" role="alert">
                <div className="contact-card-box__success-icon">✓</div>
                <h3 className="contact-card-box__success-title">Thank You!</h3>
                <p className="contact-card-box__success-msg">
                  Your callback request has been sent. Our travel expert will contact you shortly!
                </p>
                <button
                  type="button"
                  className="contact-card-box__reset-btn"
                  onClick={() => setIsSubmitted(false)}
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form className="contact-card-box__form" onSubmit={handleSubmit}>
                {/* Field 1: Enter Name */}
                <div className="contact-card-box__field">
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    autoComplete="name"
                    enterKeyHint="next"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter Name"
                    className="contact-card-box__input"
                    required
                  />
                </div>

                {/* Field 2: +91 Enter Mobile No. */}
                <div className="contact-card-box__field">
                  <div className={`contact-card-box__phone-group${phoneError ? ' contact-card-box__field--error' : ''}`}>
                    <div className="contact-card-box__country-pill">
                      <span>+91</span>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                    <input
                      id="contact-phone"
                      type="tel"
                      name="phone"
                      inputMode="numeric"
                      autoComplete="tel"
                      enterKeyHint="next"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter Mobile No."
                      className="contact-card-box__input contact-card-box__input--phone"
                      aria-invalid={!!phoneError}
                      required
                    />
                  </div>
                  {phoneError && (
                    <span className="contact-card-box__err-text" role="alert">
                      {phoneError}
                    </span>
                  )}
                </div>

                {/* Field 3: ✉ Enter Mail ID */}
                <div className="contact-card-box__field">
                  <div className="contact-card-box__icon-group">
                    <span className="contact-card-box__prefix-icon" aria-hidden="true">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <rect x="2" y="4" width="20" height="16" rx="2" />
                        <polyline points="22 6 12 13 2 6" />
                      </svg>
                    </span>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      autoComplete="email"
                      enterKeyHint="next"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter Mail ID"
                      className="contact-card-box__input contact-card-box__input--icon"
                    />
                  </div>
                </div>

                {/* Field 4: Select Destination */}
                <div className="contact-card-box__field">
                  <div className="contact-card-box__select-wrap">
                    <select
                      id="contact-destination"
                      name="destination"
                      value={formData.destination}
                      onChange={handleChange}
                      className="contact-card-box__select"
                      required
                    >
                      <option value="" disabled>Select Destination</option>
                      {destinations.map((d) => (
                        <option key={d.id} value={d.name}>
                          {d.name}
                        </option>
                      ))}
                      <option value="Europe">Europe / Switzerland &amp; Paris</option>
                      <option value="Other / Customized">Other / Customized Tour</option>
                    </select>
                    <span className="contact-card-box__select-arrow" aria-hidden="true">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </span>
                  </div>
                </div>

                {/* Field 5: Consent Checkbox */}
                <div className="contact-card-box__consent">
                  <label className="contact-card-box__checkbox-label">
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="contact-card-box__checkbox"
                      required
                    />
                    <span className="contact-card-box__checkbox-custom" aria-hidden="true">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span className="contact-card-box__consent-text">
                      I accept the <a href="#privacy" onClick={(e) => e.preventDefault()} className="contact-card-box__link">Privacy Policy</a> and authorize Nehvisa Holidays to contact me with details.
                    </span>
                  </label>
                </div>

                {/* Field 6: Request a Callback Button */}
                <button
                  type="submit"
                  className="contact-card-box__submit-btn"
                  id="contact-request-callback"
                >
                  <span>Request a Callback</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" aria-hidden="true">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
