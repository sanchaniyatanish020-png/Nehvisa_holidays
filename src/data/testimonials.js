// Testimonials and Reviews Configuration
// Set isVisible: true only when real, verified client testimonials with consent are added.
// Never display fabricated reviews.

export const testimonialsConfig = {
  isVisible: false, // TODO: Set to true once real customer reviews from Google Maps or WhatsApp are verified
  sectionLabel: 'Traveler Stories',
  title: 'What Our Travelers Say',
  subtitle: 'Genuine feedback from travelers who planned their dream vacations with Nehvisa Holidays.',
};

export const testimonials = [
  {
    id: 1,
    name: '[Client Name]', // TODO: Add real traveler name
    location: 'Surat, Gujarat',
    destination: 'Dubai Family Package',
    rating: 5,
    text: 'TODO: Replace with verified client quote regarding their tour experience with Nehvisa Holidays.',
    year: '2026',
  },
  {
    id: 2,
    name: '[Client Name]', // TODO: Add real traveler name
    location: 'Surat, Gujarat',
    destination: 'Char Dham Yatra',
    rating: 5,
    text: 'TODO: Replace with verified client quote regarding their tour experience with Nehvisa Holidays.',
    year: '2026',
  },
  {
    id: 3,
    name: '[Client Name]', // TODO: Add real traveler name
    location: 'Surat, Gujarat',
    destination: 'Bali Tour Package',
    rating: 5,
    text: 'TODO: Replace with verified client quote regarding their tour experience with Nehvisa Holidays.',
    year: '2026',
  },
];

export default testimonials;
