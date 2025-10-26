// src/data/festivalsData.js

export const festivalsData = [
  {
    id: 1,
    name: "Ras Yatra",
    category: "major",
    season: "Winter",
    duration: "3 Days",
    description: "The grandest festival celebrating Lord Krishna's divine play with the Gopis. A spectacular celebration of devotion, music, and dance that attracts thousands of pilgrims.",
    highlights: [
      "Elaborate Ras Leela performances",
      "Traditional Kirtan sessions",
      "Decorated temple processions",
      "Cultural dance competitions",
      "Community feast (Mahaprasad)"
    ],
    date: "November-December (Kartik Purnima)",
    significance: "Celebrates the divine love between Radha and Krishna, representing the soul's longing for the divine.",
    traditions: [
      "Devotees dress as Radha-Krishna",
      "24-hour continuous kirtan",
      "Traditional Bengali sweets distribution",
      "Boat decorations on nearby rivers"
    ],
    icon: "🎭",
    color: "from-purple-600 to-pink-600",
    festivalTypes: [], // No direct mapping - can add 'cultural' or 'other' type clubs
    detailedDescription: `Ras Yatra is the most magnificent festival celebrated in Santipur, drawing thousands of devotees from across Bengal and beyond. This three-day extravaganza transforms the entire town into a divine celebration of love, devotion, and spiritual ecstasy.

The festival commemorates Lord Krishna's Ras Leela - the divine dance with the Gopis under the full moon. Each evening, elaborate performances recreate these celestial events, with talented artists portraying the divine love story through classical dance, music, and theatrical performances.

The streets come alive with colorful decorations, traditional music echoing through the air, and the sweet fragrance of incense and flowers. Devotees from all walks of life gather to witness the spectacular processions and participate in the continuous kirtan that goes on day and night.`,
    images: [
      { 
        url: "https://images.unsplash.com/photo-1583309122708-cde2cd665952?w=800", 
        caption: "Grand Ras Leela Performance" 
      },
      { 
        url: "https://images.unsplash.com/photo-1609169707991-f0c6dc0738a4?w=800", 
        caption: "Temple Decorations" 
      },
      { 
        url: "https://images.unsplash.com/photo-1591947733656-bce993e2619b?w=800", 
        caption: "Evening Kirtan Session" 
      },
      { 
        url: "https://images.unsplash.com/photo-1609652717642-c0eaaa2eb89f?w=800", 
        caption: "Community Celebration" 
      }
    ],
    fairInfo: {
      description: "A grand fair is organized during Ras Yatra, featuring traditional handicrafts, Bengali sweets, religious artifacts, and cultural performances.",
      stalls: [
        "Traditional Handicrafts", 
        "Bengali Sweets", 
        "Religious Books & Artifacts", 
        "Handloom Textiles", 
        "Local Art"
      ],
      timings: "10 AM - 10 PM daily",
      specialAttractions: [
        "Folk Music Performances", 
        "Traditional Dance Shows", 
        "Food Court", 
        "Kids Play Zone"
      ]
    }
  },
  {
    id: 2,
    name: "Dol Jatra (Holi)",
    category: "major",
    season: "Spring",
    duration: "2 Days",
    description: "The festival of colors celebrating spring's arrival and Lord Krishna's playful nature.",
    highlights: [
      "Colorful powder (abir) celebrations",
      "Traditional Holi songs",
      "Community color fights",
      "Special Holi delicacies",
      "Cultural programs"
    ],
    date: "March (Falgun Purnima)",
    significance: "Represents the victory of good over evil and the arrival of spring, celebrating Krishna's playful spirit.",
    traditions: [
      "Early morning temple prayers",
      "Throwing colored powders",
      "Traditional drums and music",
      "Sweet preparation and sharing"
    ],
    icon: "🎨",
    color: "from-red-500 to-yellow-500",
    festivalTypes: ['dol-yatra'], // Maps to dol-yatra clubs
    detailedDescription: `Dol Jatra, also known as Holi, marks the arrival of spring with an explosion of colors, joy, and celebration. In Santipur, this festival takes on a special spiritual significance as devotees celebrate Lord Krishna's playful nature.

The festivities begin early morning with special prayers at temples, followed by the traditional throwing of colored powders (abir). The entire town transforms into a canvas of vibrant colors as people of all ages participate in the celebrations.

Traditional Holi songs and dhol beats fill the air, creating an atmosphere of pure joy and unity. Special delicacies like gujiya, thandai, and various Bengali sweets are prepared and shared among neighbors and friends.`,
    images: [
      { 
        url: "https://images.unsplash.com/photo-1583225214464-9296029427aa?w=800", 
        caption: "Colorful Celebrations" 
      },
      { 
        url: "https://images.unsplash.com/photo-1616530940355-351fabd9524b?w=800", 
        caption: "Traditional Abir Play" 
      },
      { 
        url: "https://images.unsplash.com/photo-1551972805-8f17c8fcbe48?w=800", 
        caption: "Community Gathering" 
      }
    ],
    fairInfo: {
      description: "The Dol Mela features stalls selling colored powders, water guns, traditional sweets, and spring season specialties.",
      stalls: [
        "Colored Powders", 
        "Traditional Sweets", 
        "Water Toys", 
        "Spring Flowers", 
        "Festive Clothing"
      ],
      timings: "6 AM - 8 PM",
      specialAttractions: [
        "Live Music Performances", 
        "Dance Competitions", 
        "Food Festival", 
        "Children's Games"
      ]
    }
  },
  {
    id: 3,
    name: "Rath Yatra",
    category: "major",
    season: "Summer",
    duration: "7 Days",
    description: "The chariot festival where decorated chariots carry the deities through the streets.",
    highlights: [
      "Grand chariot processions",
      "Deity decorations",
      "Street performances",
      "Prasadam distribution",
      "Community participation"
    ],
    date: "June-July (Ashadh)",
    significance: "Celebrates Lord Jagannath's journey to visit devotees, symbolizing God's accessibility to all.",
    traditions: [
      "Hand-pulling decorated chariots",
      "Offering flowers and fruits",
      "Singing devotional songs",
      "Community service activities"
    ],
    icon: "🚂",
    color: "from-orange-600 to-red-600",
    festivalTypes: ['rath-yatra'], // Maps to rath-yatra clubs
    detailedDescription: "The magnificent Rath Yatra is a week-long celebration featuring grand chariot processions through the streets of Santipur. This ancient tradition brings together thousands of devotees who pull the decorated chariots carrying the deities.",
    images: [
      { 
        url: "https://images.unsplash.com/photo-1588421357574-87938a86fa28?w=800", 
        caption: "Grand Chariot Procession" 
      }
    ],
    fairInfo: {
      description: "Week-long fair with religious items, food stalls, and cultural performances.",
      stalls: ["Prasadam", "Religious Books", "Handicrafts", "Traditional Foods"],
      timings: "8 AM - 9 PM",
      specialAttractions: [
        "Chariot Procession", 
        "Daily Cultural Programs", 
        "Mahaprasad Distribution"
      ]
    }
  },
  {
    id: 4,
    name: "Janmashtami",
    category: "other",
    season: "Monsoon",
    duration: "1 Day",
    description: "Lord Krishna's birthday celebration with midnight festivities.",
    highlights: [
      "Midnight celebrations",
      "Krishna Leela performances",
      "Dahi Handi ceremonies",
      "Devotional music",
      "Special temple decorations"
    ],
    date: "August-September (Bhadra)",
    significance: "Celebrates the birth of Lord Krishna, symbolizing the divine incarnation.",
    traditions: [
      "Fasting until midnight",
      "Cradle ceremonies",
      "Jhulana (swing) decorations",
      "108 names chanting"
    ],
    icon: "👶",
    color: "from-blue-600 to-purple-600",
    festivalTypes: ['janmashtami'] // Maps to janmashtami clubs
  },
  {
    id: 5,
    name: "Gaura Purnima",
    category: "other",
    season: "Spring",
    duration: "1 Day",
    description: "Celebrating the appearance of Sri Chaitanya Mahaprabhu.",
    highlights: [
      "Chaitanya Leela performances",
      "Sankirtan processions",
      "Community prayers",
      "Devotional discourses",
      "Traditional feast"
    ],
    date: "March (Falgun Purnima)",
    significance: "Honors Sri Chaitanya's contributions to devotional practices.",
    traditions: [
      "Golden Gauranga processions",
      "24-hour naam sankirtan",
      "Charitable activities",
      "Community singing"
    ],
    icon: "🙏",
    color: "from-yellow-500 to-orange-500",
    festivalTypes: [] // No direct mapping
  },
  {
    id: 6,
    name: "Durga Puja",
    category: "other",
    season: "Autumn",
    duration: "5 Days",
    description: "The grand celebration of Goddess Durga's victory over evil.",
    highlights: [
      "Artistic idol installations",
      "Cultural performances",
      "Traditional music concerts",
      "Community gatherings",
      "Bhog distribution"
    ],
    date: "September-October (Ashwin)",
    significance: "Celebrates the divine feminine power and the triumph of good over evil.",
    traditions: [
      "Elaborate pandal decorations",
      "Traditional dhak playing",
      "Anjali offerings",
      "Sindur khela ceremony"
    ],
    icon: "🏺",
    color: "from-pink-600 to-purple-600",
    festivalTypes: ['durga-puja'] // Maps to durga-puja clubs
  },
  {
    id: 7,
    name: "Kali Puja",
    category: "other",
    season: "Autumn",
    duration: "1 Day",
    description: "Worshipping the fierce form of Goddess Kali on the new moon night.",
    highlights: [
      "Nighttime worship ceremonies",
      "Traditional offerings",
      "Cultural programs",
      "Community participation"
    ],
    date: "October-November (Kartik Amavasya)",
    significance: "Celebrates the power of divine mother in her fierce protective form.",
    traditions: [
      "Midnight puja rituals",
      "Animal-shaped sweets",
      "Oil lamp lighting",
      "Community feasting"
    ],
    icon: "🌙",
    color: "from-indigo-600 to-purple-600",
    festivalTypes: ['kali-puja']
  },
  {
    id: 8,
    name: "Saraswati Puja",
    category: "other",
    season: "Spring",
    duration: "1 Day",
    description: "Honoring the goddess of knowledge, music, and arts.",
    highlights: [
      "Student participation",
      "Book and instrument worship",
      "Cultural performances",
      "Educational celebrations"
    ],
    date: "January-February (Maghi Panchami)",
    significance: "Seeking blessings for knowledge, wisdom, and artistic talents.",
    traditions: [
      "Yellow clothing tradition",
      "Placing books at goddess feet",
      "Cultural programs",
      "Prasad distribution"
    ],
    icon: "📚",
    color: "from-yellow-400 to-orange-500",
    festivalTypes: ['saraswati-puja']
  },
  {
    id: 9,
    name: "Lakshmi Puja",
    category: "other",
    season: "Autumn",
    duration: "1 Day",
    description: "Worshipping Goddess Lakshmi for prosperity and wealth.",
    highlights: [
      "Home decorations",
      "Oil lamp lighting",
      "Business community participation",
      "Traditional rituals"
    ],
    date: "October-November (Kojagari Purnima)",
    significance: "Seeking divine blessings for prosperity, wealth, and well-being.",
    traditions: [
      "Cleaning and decorating homes",
      "Alpana (rangoli) designs",
      "Lighting diyas",
      "Offering lotus flowers"
    ],
    icon: "💰",
    color: "from-pink-500 to-red-500",
    festivalTypes: ['lakshmi-puja']
  }
]