import { useState, useEffect } from 'react';
import businessInfo from '../data/businessInfo';
import './FloatingButtons.css';

export default function FloatingButtons() {
  const [visible, setVisible] = useState(false);
  const [inContactView, setInContactView] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hide button while the contact form section is in view to prevent covering fields or buttons
  useEffect(() => {
    const contactSection = document.getElementById('contact');
    if (!contactSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInContactView(entry.isIntersecting);
      },
      { threshold: 0.12 }
    );

    observer.observe(contactSection);
    return () => observer.disconnect();
  }, []);

  const waUrl = `${businessInfo.whatsappLink}?text=${encodeURIComponent(businessInfo.whatsappDefaultMessage)}`;
  const isShown = visible && !inContactView;

  return (
    <div
      className={`floating-btns${isShown ? ' floating-btns--visible' : ''}`}
      aria-label="Floating WhatsApp contact"
    >
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-btn floating-btn--wa"
        id="floating-whatsapp-btn"
        aria-label="Chat with Nehvisa Holidays on WhatsApp"
        title="Chat on WhatsApp"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.558 4.119 1.532 5.849L.057 23.7a.5.5 0 0 0 .623.624l5.85-1.474A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.796 9.796 0 0 1-5.126-1.447l-.368-.218-3.822.963.981-3.72-.239-.384A9.792 9.792 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182c5.43 0 9.818 4.388 9.818 9.818 0 5.43-4.388 9.818-9.818 9.818z"/>
        </svg>
        <span className="floating-btn__label">WhatsApp Us</span>
      </a>
    </div>
  );
}
