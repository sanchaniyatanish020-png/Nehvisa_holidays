const travelThemes = [
  {
    id: 'cruise',
    title: 'Cruise',
    subtitle: 'A floating holiday like no other.',
    image: `${import.meta.env.BASE_URL}cruise.jpg`,
    tags: ['Photography', 'Ocean Cruise', 'Luxury Liner'],
    serviceType: 'International Tour Package',
    destinationNote: 'Luxury Cruise Experience',
  },
  {
    id: 'honeymoon',
    title: 'Honeymoon',
    subtitle: 'Celebrate love with dreamy honeymoon getaways.',
    image: `${import.meta.env.BASE_URL}honeymoon.jpg`,
    tags: ['Sunset Dinner Cruise', 'Floating Breakfast', 'Couple Spa'],
    serviceType: 'Honeymoon Package',
    destinationNote: 'Romantic Honeymoon Getaway',
  },
  {
    id: 'luxury',
    title: 'Luxury',
    subtitle: 'Where comfort, class, and exclusivity come together.',
    image: `${import.meta.env.BASE_URL}luxury.jpg`,
    tags: ['Unique Experiences', '5-Star Stays', 'Private Villas'],
    serviceType: 'International Tour Package',
    destinationNote: 'Ultra Luxury Vacation',
  },
  {
    id: 'adventure',
    title: 'Adventure',
    subtitle: 'Adventures that push limits and create stories.',
    image: `${import.meta.env.BASE_URL}adventure.jpg`,
    tags: ['Funicular Ride', 'Snorkelling', 'Desert Safari', 'Helicopter ride'],
    serviceType: 'Group Tour',
    destinationNote: 'Adventure & Exploration Tour',
  },
  {
    id: 'wildlife',
    title: 'Wildlife',
    subtitle: 'Experience nature in its purest form.',
    image: `${import.meta.env.BASE_URL}wildlife.jpg`,
    tags: ['Game Drive', 'African penguins', 'National Parks', 'Migration'],
    serviceType: 'International Tour Package',
    destinationNote: 'Wildlife Safari & Polar Expedition',
  },
];

export default travelThemes;
