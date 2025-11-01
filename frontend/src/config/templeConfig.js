// frontend/src/config/templeConfig.js - Temple Categories & Festival Mapping

// Festival Type to Temple Category Mapping
export const festivalToTempleCategoryMap = {
  'durga-puja': 'durga',
  'jagaddhatri-puja': 'jagaddhatri',
  'kali-puja': 'kali',
  'rath-yatra': 'radhakrishna',
  'janmashtami': 'radhakrishna',
  'dol-yatra': 'radhakrishna',
  'saraswati-puja': 'saraswati',
  'lakshmi-puja': 'lakshmi',
  'kartik-puja': 'radhakrishna',
  'ganesh-puja': 'ganesh',
  'cultural': 'other',
  'other': 'other'
};

// Temple Categories for filtering
export const templeCategories = [
  { id: 'all', name: 'All Temples', icon: '🕉️' },
  { id: 'radhakrishna', name: 'Radha Krishna', icon: '🏛️' },
  { id: 'kali', name: 'Kali', icon: '🔱' },
  { id: 'durga', name: 'Durga', icon: '🪔' },
  { id: 'jagaddhatri', name: 'Jagaddhatri', icon: '🦁' },
  { id: 'saraswati', name: 'Saraswati', icon: '📚' },
  { id: 'lakshmi', name: 'Lakshmi', icon: '💰' },
  { id: 'ganesh', name: 'Ganesh', icon: '🐘' },
  { id: 'shiv', name: 'Shiv', icon: '🕉️' },
  { id: 'narayan', name: 'Narayan', icon: '⛩️' },
  { id: 'other', name: 'Other', icon: '🎊' }
];

// Static temple images
export const templeImages = {
  boroGhosmai: "https://res.cloudinary.com/dd5jhb6pf/image/upload/v1760819860/boroGhosamiBari_dxgukv.jpg",
  paglaGhosami: "https://res.cloudinary.com/dd5jhb6pf/image/upload/v1760822869/paglaGhosami_oxjbyp.webp"
};

// Static temples data (your existing hardcoded temples)
export const staticTemples = [
  {
    id: 'static-1',
    name: "Boro Goswami Bari",
    image: templeImages.boroGhosmai,
    shortDesc: "One of the oldest and most prominent Goswami families' temple in Santipur, maintaining centuries of unbroken devotional traditions and spiritual teachings.",
    fullDesc: "Boro Goswami Bari stands as a testament to centuries of devotional tradition in Santipur. This ancient temple complex has been the spiritual home of one of the most respected Goswami families, maintaining unbroken lineages of worship and scholarship. The temple features traditional Bengali architecture with intricate terracotta work and a peaceful courtyard where devotees gather for daily kirtans and spiritual discussions.",
    period: "16th Century",
    category: "radhakrishna",
    specialFeatures: [
      "Ancient family lineage of spiritual teachers",
      "Daily kirtan and bhajan sessions",
      "Traditional manuscript library",
      "Annual Ras Yatra celebrations"
    ],
    gallery: [templeImages.boroGhosmai, "📿", "🕉️", "🎭", "📚", "🌺"],
    isStatic: true
  },
  {
    id: 'static-2',
    name: "Pagla Goswami Bari",
    image: templeImages.paglaGhosami,
    shortDesc: "Sacred temple known for its unique spiritual atmosphere, ecstatic devotional practices, and night-long kirtan sessions during special occasions.",
    fullDesc: "Pagla Goswami Bari carries a fascinating history of ecstatic devotion and spiritual practices. The temple earned its name from the deep devotional fervor displayed by its early devotees. Today, it remains a center of intense bhakti (devotion) where traditional worship methods are preserved with utmost care. The temple is particularly known for its night-long kirtan sessions during special occasions.",
    period: "18th Century",
    category: "radhakrishna",
    specialFeatures: [
      "Night-long kirtan traditions",
      "Ecstatic devotional practices",
      "Historic spiritual artifacts",
      "Monthly full moon celebrations"
    ],
    gallery: [templeImages.paglaGhosami, "🎵", "🌙", "💫", "🕯️", "🎶"],
    isStatic: true
  },
  {
    id: 'static-3',
    name: "Agameshwari Kali Temple",
    image: "🔱",
    shortDesc: "The principal Kali temple of Santipur, famous for its powerful spiritual energy, tantric worship traditions, and legendary Kali Puja celebrations.",
    fullDesc: "Agameshwari Kali Temple stands as the premier center of Shakti worship in Santipur. The temple houses a powerful deity of Goddess Kali and is known for the intense spiritual energy felt within its premises. The annual Kali Puja celebrations here are legendary, attracting thousands of devotees.",
    period: "17th Century",
    category: "kali",
    specialFeatures: [
      "Principal Shakti worship center",
      "Tantric ritual traditions",
      "Grand Kali Puja celebrations",
      "Powerful spiritual atmosphere"
    ],
    gallery: ["🔱", "🔥", "🌙", "🎆", "💀", "🕉️"],
    isStatic: true
  }
  // Add more static temples as needed...
];

// Helper function to convert club data to temple format
export const convertClubToTemple = (club) => {
  const category = festivalToTempleCategoryMap[club.festivalType] || 'other';
  
  return {
    id: club._id,
    name: club.clubName,
    image: club.images && club.images.length > 0 ? club.images[0] : '🏛️',
    shortDesc: club.description || `A sacred temple dedicated to ${club.clubName}`,
    fullDesc: club.description || `This temple in Santipur maintains traditional worship practices and serves as an important spiritual center in the community.`,
    period: club.establishedYear ? `Established ${club.establishedYear}` : "Modern Era",
    category: category,
    specialFeatures: [
      club.otherEvents || "Traditional daily worship rituals",
      "Community prayer gatherings",
      "Festival celebrations",
      "Cultural preservation efforts"
    ],
    gallery: club.images || ["🏛️", "🌺", "🪔", "📿"],
    address: club.address || '',
    phone: club.phone || '',
    email: club.email || '',
    location: club.location || { latitude: '', longitude: '' },
    socialMedia: club.socialMedia || {},
    isFromClub: true,
    clubId: club._id
  };
};