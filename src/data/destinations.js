// Destinations catalog categorized by Asia, Europe, Africa, Cruise
// baseImage points to public/[baseImage]-800.webp / .jpg and [baseImage]-1400.webp / .jpg
const destinations = [
  // ─── ASIA ───
  {
    id: 2,
    name: 'Dubai',
    region: 'United Arab Emirates',
    category: 'asia',
    type: 'international',
    baseImage: 'dubai',
    description:
      'Discover a dynamic destination filled with iconic experiences, luxury desert safaris and modern wonders.',
    whatsappMessage:
      'Hello Nehvisa Holidays, I am interested in travelling to Dubai.',
    label: 'ASIA',
    duration: '4 Nights / 5 Days',
    startingPrice: '',
    inclusions: ['Desert Safari with BBQ', 'Burj Khalifa 124th Floor', 'Marina Dhow Cruise', '4-Star Luxury Hotel'],
  },
  {
    id: 3,
    name: 'Vietnam',
    region: 'Southeast Asia',
    category: 'asia',
    type: 'international',
    baseImage: 'vietnam',
    description:
      'Explore breathtaking limestone karsts, rich heritage, bustling night markets and Halong Bay cruises.',
    whatsappMessage:
      'Hello Nehvisa Holidays, I am interested in travelling to Vietnam.',
    label: 'ASIA',
    duration: '5 Nights / 6 Days',
    startingPrice: '',
    inclusions: ['Halong Bay Overnight Cruise', 'Hanoi & Da Nang Tour', 'Ba Na Hills & Golden Bridge', 'Airport Transfers'],
  },
  {
    id: 4,
    name: 'Bali / Indonesia',
    region: 'Indonesia',
    category: 'asia',
    type: 'international',
    baseImage: 'bali',
    description:
      'Experience tropical beauty, cultural temples, lush rice terraces and serene island escapes.',
    whatsappMessage:
      'Hello Nehvisa Holidays, I am interested in travelling to Bali / Indonesia.',
    label: 'ASIA',
    duration: '6 Nights / 7 Days',
    startingPrice: '',
    inclusions: ['Private Pool Villa Stay', 'Ubud & Kintamani Volcano Tour', 'Nusa Penida Island Tour', 'Water Sports at Tanjung Benoa'],
  },
  {
    id: 5,
    name: 'Singapore',
    region: 'Southeast Asia',
    category: 'asia',
    type: 'international',
    baseImage: 'singapore',
    description:
      'Discover a world-class city of futuristic skylines, Gardens by the Bay and thrilling family attractions.',
    whatsappMessage:
      'Hello Nehvisa Holidays, I am interested in travelling to Singapore.',
    label: 'ASIA',
    duration: '4 Nights / 5 Days',
    startingPrice: '',
    inclusions: ['Universal Studios Singapore', 'Gardens by the Bay & Supertree', 'Marina Bay Sands SkyPark', 'Night Safari Adventure'],
  },
  {
    id: 6,
    name: 'Malaysia',
    region: 'Southeast Asia',
    category: 'asia',
    type: 'international',
    baseImage: 'malaysia-kl',
    description:
      'Explore modern skylines, lush rainforests, Batu Caves, Genting Highlands and vibrant cultural heritage.',
    whatsappMessage:
      'Hello Nehvisa Holidays, I am interested in travelling to Malaysia.',
    label: 'ASIA',
    duration: '4 Nights / 5 Days',
    startingPrice: '',
    inclusions: ['Kuala Lumpur City Tour', 'Batu Caves Excursion', 'Genting Highlands & Cable Car', 'Premium City Hotel'],
  },
  {
    id: 7,
    name: 'Thailand',
    region: 'Southeast Asia',
    category: 'asia',
    type: 'international',
    baseImage: 'thailand',
    description:
      'Enjoy pristine tropical beaches, vibrant night markets, exotic island hopping and rich cultural temples.',
    whatsappMessage:
      'Hello Nehvisa Holidays, I am interested in travelling to Thailand.',
    label: 'ASIA',
    duration: '5 Nights / 6 Days',
    startingPrice: '',
    inclusions: ['Bangkok & Phuket Twin Tour', 'Phi Phi Island Speedboat', 'Coral Island Watersports', 'City Temple Tour & Breakfast'],
  },

  // ─── EUROPE ───
  {
    id: 8,
    name: 'Switzerland & Paris',
    region: 'Central Europe',
    category: 'europe',
    type: 'international',
    baseImage: 'europe',
    description:
      'Experience the romance of Paris and the majestic snow-capped peaks, alpine lakes and scenic trains of Switzerland.',
    whatsappMessage:
      'Hello Nehvisa Holidays, I am interested in Europe holiday packages.',
    label: 'EUROPE',
    duration: '7 Nights / 8 Days',
    startingPrice: '',
    inclusions: ['Mt. Titlis Rotating Cable Car', 'Eiffel Tower 2nd Level', 'Scenic Lake Lucerne Cruise', 'Seine River Cruise in Paris'],
  },

  // ─── AFRICA ───
  {
    id: 9,
    name: 'Kenya & Safari',
    region: 'East Africa',
    category: 'africa',
    type: 'international',
    baseImage: 'africa',
    description:
      'Embark on an unforgettable Big 5 wildlife safari adventure across the world-renowned Maasai Mara savanna.',
    whatsappMessage:
      'Hello Nehvisa Holidays, I am interested in African Safari holiday packages.',
    label: 'AFRICA',
    duration: '6 Nights / 7 Days',
    startingPrice: '',
    inclusions: ['Maasai Mara 4x4 Game Drives', 'Lake Naivasha Boat Safari', 'Authentic Safari Lodge Stay', 'Big Five Wildlife Spotting'],
  },

  // ─── CRUISE ───
  {
    id: 10,
    name: 'Southeast Asia Luxury Cruise',
    region: 'Singapore · Malaysia · Thailand',
    category: 'cruise',
    type: 'international',
    baseImage: 'cruise',
    description:
      'Sail across turquoise waters aboard world-class cruise liners featuring fine dining, Broadway shows and tropical ports.',
    whatsappMessage:
      'Hello Nehvisa Holidays, I am interested in Luxury Cruise vacation packages.',
    label: 'CRUISE',
    duration: '4 Nights / 5 Days',
    startingPrice: '',
    inclusions: ['Oceanview Balcony Stateroom', 'All-Inclusive International Dining', 'Live Broadway Theater Shows', 'Port Excursions & Water Parks'],
  },
];

export default destinations;
