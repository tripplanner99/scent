import type { Room, ScentAsset, DualityPreset, SiteSettings } from '@shared/schema';

// Seed data based on One Scent Club catalogue
export const dualityPresets: DualityPreset[] = [
  {
    id: 'day-night',
    nameA: 'Day',
    nameB: 'Night',
    themeTokens: {
      backgroundA: '50 15% 95%',
      backgroundB: '210 20% 8%',
      primaryA: '25 40% 70%',
      primaryB: '280 35% 30%',
      accentA: '200 30% 60%',
      accentB: '45 80% 65%',
    },
  },
  {
    id: 'mumbai-ny',
    nameA: 'Mumbai',
    nameB: 'New York',
    themeTokens: {
      backgroundA: '30 25% 92%',
      backgroundB: '220 15% 12%',
      primaryA: '30 40% 60%',
      primaryB: '220 30% 40%',
      accentA: '45 70% 55%',
      accentB: '200 60% 60%',
    },
  },
  {
    id: 'traditional-contemporary',
    nameA: 'Traditional',
    nameB: 'Contemporary',
    themeTokens: {
      backgroundA: '25 20% 90%',
      backgroundB: '0 0% 10%',
      primaryA: '25 50% 55%',
      primaryB: '0 0% 85%',
      accentA: '150 30% 45%',
      accentB: '280 60% 60%',
    },
  },
  {
    id: 'minimalist-maximalist',
    nameA: 'Minimalist',
    nameB: 'Maximalist',
    themeTokens: {
      backgroundA: '0 0% 98%',
      backgroundB: '340 30% 15%',
      primaryA: '0 0% 20%',
      primaryB: '340 70% 70%',
      accentA: '200 20% 60%',
      accentB: '60 80% 60%',
    },
  },
];

export const rooms: Room[] = [
  {
    id: 'living-room',
    name: 'Living Room',
    descriptionA: 'A bright, welcoming space where morning sunlight dances through natural textures and warm cream tones.',
    descriptionB: 'An intimate evening retreat with deep shadows, ambient lighting, and rich plum accents creating sophisticated comfort.',
    imageA: '/api/assets/living-day.jpg',
    imageB: '/api/assets/living-night.jpg',
    ambientSoundA: '/api/sounds/morning-birds.mp3',
    ambientSoundB: '/api/sounds/evening-jazz.mp3',
    recommendedAssetsA: ['azure', 'morning-bloom', 'citrus-grove'],
    recommendedAssetsB: ['reverie', 'midnight-woods', 'amber-dreams'],
  },
  {
    id: 'bedroom',
    name: 'Bedroom',
    descriptionA: 'A serene sanctuary of soft morning light, natural linens, and sage blue accents perfect for gentle awakening rituals.',
    descriptionB: 'A cozy haven of warm amber glow, deep charcoal walls, and plum touches designed for restful evening wind-down.',
    imageA: '/api/assets/bedroom-day.jpg',
    imageB: '/api/assets/bedroom-night.jpg',
    ambientSoundA: '/api/sounds/soft-breeze.mp3',
    ambientSoundB: '/api/sounds/night-calm.mp3',
    recommendedAssetsA: ['gentle-bloom', 'morning-dew', 'fresh-linen'],
    recommendedAssetsB: ['lavender-dreams', 'sandalwood-night', 'cozy-amber'],
  },
  {
    id: 'bathroom',
    name: 'Bathroom',
    descriptionA: 'A spa-like retreat with marble surfaces, natural light, and plants creating a fresh morning ritual space.',
    descriptionB: 'A dramatic sanctuary with deep tones, candlelight, and sophisticated ambience for evening relaxation.',
    imageA: '/api/assets/bathroom-day.jpg',
    imageB: '/api/assets/bathroom-night.jpg',
    ambientSoundA: '/api/sounds/water-drops.mp3',
    ambientSoundB: '/api/sounds/spa-ambience.mp3',
    recommendedAssetsA: ['eucalyptus-mint', 'ocean-breeze', 'white-tea'],
    recommendedAssetsB: ['black-orchid', 'midnight-rose', 'dark-vanilla'],
  },
];

export const scentAssets: ScentAsset[] = [
  {
    id: 'azure',
    title: 'Azure',
    category: 'Eau de Parfum',
    notes: {
      top: ['Bergamot', 'Ocean Breeze', 'Lemon Zest'],
      middle: ['Lavender', 'Sea Salt', 'White Jasmine'],
      base: ['Driftwood', 'Ambergris', 'Soft Musk'],
    },
    imageA: '/api/assets/azure-day.jpg',
    imageB: '/api/assets/azure-night.jpg',
    intensityProfile: {
      strength: 7,
      longevity: 8,
      sillage: 6,
    },
    seedExampleFromCatalogue: 'Azure - A fresh oceanic fragrance that captures the essence of morning sea breeze and endless blue skies.',
  },
  {
    id: 'reverie',
    title: 'Reverie',
    category: 'Reed Diffuser',
    notes: {
      top: ['Black Currant', 'Pink Pepper', 'Mandarin'],
      middle: ['Rose Petals', 'Violet Leaves', 'Peony'],
      base: ['Sandalwood', 'White Musk', 'Soft Amber'],
    },
    imageA: '/api/assets/reverie-day.jpg',
    imageB: '/api/assets/reverie-night.jpg',
    intensityProfile: {
      strength: 5,
      longevity: 9,
      sillage: 4,
    },
    seedExampleFromCatalogue: 'Reverie - A dreamy floral composition that transforms any space into a romantic garden sanctuary.',
  },
  {
    id: 'devotion-incense',
    title: 'Devotion',
    category: 'Devotion Incense',
    notes: {
      top: ['Frankincense', 'Sage', 'Cardamom'],
      middle: ['Cedar', 'Patchouli', 'Rose Wood'],
      base: ['Sandalwood', 'Vetiver', 'Dark Amber'],
    },
    imageA: '/api/assets/devotion-day.jpg',
    imageB: '/api/assets/devotion-night.jpg',
    intensityProfile: {
      strength: 8,
      longevity: 6,
      sillage: 9,
    },
    seedExampleFromCatalogue: 'Devotion - Sacred incense blend for meditation and spiritual rituals, creating profound tranquility.',
  },
  {
    id: 'morning-bloom',
    title: 'Morning Bloom',
    category: 'Home Care',
    notes: {
      top: ['Grapefruit', 'Green Leaves', 'Dewdrops'],
      middle: ['Peony', 'Lily of Valley', 'White Tea'],
      base: ['Clean Musk', 'Soft Woods', 'Fresh Air'],
    },
    imageA: '/api/assets/bloom-day.jpg',
    imageB: '/api/assets/bloom-night.jpg',
    intensityProfile: {
      strength: 6,
      longevity: 7,
      sillage: 5,
    },
    seedExampleFromCatalogue: 'Morning Bloom - Fresh floral home care that brings the garden indoors with every spray.',
  },
];

export const siteSettings: SiteSettings = {
  defaultDuality: 'day-night',
  availableDualities: ['day-night', 'mumbai-ny', 'traditional-contemporary', 'minimalist-maximalist'],
  enabledFeatures: {
    doodleBoard: true,
    dragDrop: true,
    audioAmbience: true,
  },
};