// Destinations catalog
// baseImage points to public/[baseImage]-800.webp / .jpg and [baseImage]-1400.webp / .jpg
// Optional fields: duration, startingPrice, inclusions (render only when filled; do NOT invent prices)
const destinations = [
  {
    id: 1,
    name: 'Char Dham Yatra',
    region: 'Uttarakhand, India',
    type: 'india',
    baseImage: 'chardham',
    description:
      'Experience a meaningful spiritual journey through the sacred Char Dham destinations of Uttarakhand.',
    whatsappMessage:
      'Hello Nehvisa Holidays, I am interested in the Char Dham Yatra.',
    label: 'INDIA',
    // Optional details - render only if filled in (TODO: Add actual package duration, price, and inclusions)
    duration: '', // e.g. '10 Nights / 11 Days' (TODO: Replace with actual duration)
    startingPrice: '', // e.g. 'Starting from ₹____' (TODO: Replace with actual starting price)
    inclusions: [], // e.g. ['Helicopter Option', 'Deluxe Hotels', 'All Meals', 'VIP Darshan'] (TODO: Add real inclusions)
  },
  {
    id: 2,
    name: 'Dubai',
    region: 'United Arab Emirates',
    type: 'international',
    baseImage: 'dubai',
    description:
      'Discover a dynamic destination filled with iconic experiences, luxury and adventure.',
    whatsappMessage:
      'Hello Nehvisa Holidays, I am interested in travelling to Dubai.',
    label: 'INTERNATIONAL',
    duration: '', // e.g. '4 Nights / 5 Days' (TODO: Replace with actual duration)
    startingPrice: '', // e.g. 'Starting from ₹____' (TODO: Replace with actual starting price)
    inclusions: [], // e.g. ['Desert Safari', 'Burj Khalifa', '4-Star Hotel', 'City Tour'] (TODO: Add real inclusions)
  },
  {
    id: 3,
    name: 'Vietnam',
    region: 'Southeast Asia',
    type: 'international',
    baseImage: 'vietnam',
    description:
      'Explore beautiful landscapes, rich culture and unforgettable experiences.',
    whatsappMessage:
      'Hello Nehvisa Holidays, I am interested in travelling to Vietnam.',
    label: 'INTERNATIONAL',
    duration: '', // e.g. '5 Nights / 6 Days' (TODO: Replace with actual duration)
    startingPrice: '', // e.g. 'Starting from ₹____' (TODO: Replace with actual starting price)
    inclusions: [], // e.g. ['Halong Bay Cruise', 'Hanoi & Da Nang', 'Airport Transfers'] (TODO: Add real inclusions)
  },
  {
    id: 4,
    name: 'Bali / Indonesia',
    region: 'Indonesia',
    type: 'international',
    baseImage: 'bali',
    description:
      'Experience tropical beauty, culture and relaxing island escapes.',
    whatsappMessage:
      'Hello Nehvisa Holidays, I am interested in travelling to Bali / Indonesia.',
    label: 'INTERNATIONAL',
    duration: '', // e.g. '6 Nights / 7 Days' (TODO: Replace with actual duration)
    startingPrice: '', // e.g. 'Starting from ₹____' (TODO: Replace with actual starting price)
    inclusions: [], // e.g. ['Private Pool Villa', 'Nusa Penida Tour', 'Water Sports'] (TODO: Add real inclusions)
  },
  {
    id: 5,
    name: 'Singapore',
    region: 'Southeast Asia',
    type: 'international',
    baseImage: 'singapore',
    description:
      'Discover a modern city known for its attractions, experiences and vibrant atmosphere.',
    whatsappMessage:
      'Hello Nehvisa Holidays, I am interested in travelling to Singapore.',
    label: 'INTERNATIONAL',
    duration: '', // e.g. '4 Nights / 5 Days' (TODO: Replace with actual duration)
    startingPrice: '', // e.g. 'Starting from ₹____' (TODO: Replace with actual starting price)
    inclusions: [], // e.g. ['Universal Studios', 'Marina Bay Sands', 'Night Safari'] (TODO: Add real inclusions)
  },
  {
    id: 6,
    name: 'Malaysia',
    region: 'Southeast Asia',
    type: 'international',
    // TODO: Replace public/malaysia.jpg (and generated webp files) with a real photo of Kuala Lumpur / Petronas Towers.
    // The current file is a marked placeholder slot to fix the duplicate Bali image issue.
    baseImage: 'malaysia',
    description:
      'Explore diverse landscapes, modern cities and memorable cultural experiences.',
    whatsappMessage:
      'Hello Nehvisa Holidays, I am interested in travelling to Malaysia.',
    label: 'INTERNATIONAL',
    duration: '', // e.g. '4 Nights / 5 Days' (TODO: Replace with actual duration)
    startingPrice: '', // e.g. 'Starting from ₹____' (TODO: Replace with actual starting price)
    inclusions: [], // e.g. ['Batu Caves Tour', 'Genting Highlands', 'City Hotel'] (TODO: Add real inclusions)
  },
  {
    id: 7,
    name: 'Thailand',
    region: 'Southeast Asia',
    type: 'international',
    baseImage: 'thailand',
    description:
      'Enjoy beautiful destinations, vibrant culture and relaxing tropical experiences.',
    whatsappMessage:
      'Hello Nehvisa Holidays, I am interested in travelling to Thailand.',
    label: 'INTERNATIONAL',
    duration: '', // e.g. '5 Nights / 6 Days' (TODO: Replace with actual duration)
    startingPrice: '', // e.g. 'Starting from ₹____' (TODO: Replace with actual starting price)
    inclusions: [], // e.g. ['Bangkok & Phuket', 'Phi Phi Island Tour', 'Breakfast Included'] (TODO: Add real inclusions)
  },
];

export default destinations;
