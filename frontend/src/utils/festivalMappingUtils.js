// frontend/src/utils/festivalMappingUtils.js

/**
 * Maps festival types from club management to festival IDs
 * This allows clubs to be associated with the correct festivals
 */
export const festivalTypeToIdMap = {
  'durga-puja': 6,
  'kali-puja': 7,
  'saraswati-puja': 8,
  'lakshmi-puja': 9,
  'jagaddhatri-puja': null, // No direct festival page
  'kartik-puja': null, // No direct festival page
  'rath-yatra': 3,
  'dol-yatra': 2,
  'janmashtami': 4,
  'ganesh-puja': null, // No direct festival page
  'cultural': 1, // Maps to Ras Yatra for cultural clubs
  'other': null // General category
}

/**
 * Gets all festival types that map to a specific festival ID
 */
export const getFestivalTypesForFestivalId = (festivalId) => {
  return Object.entries(festivalTypeToIdMap)
    .filter(([_, id]) => id === festivalId)
    .map(([type, _]) => type)
}

/**
 * Gets festival icon for a festival type
 */
export const getFestivalIcon = (festivalType) => {
  const icons = {
    'durga-puja': '🏺',
    'kali-puja': '🌙',
    'saraswati-puja': '📚',
    'lakshmi-puja': '💰',
    'jagaddhatri-puja': '🦁',
    'kartik-puja': '🏹',
    'rath-yatra': '🚂',
    'dol-yatra': '🎨',
    'janmashtami': '🪈',
    'ganesh-puja': '🐘',
    'cultural': '🎭',
    'other': '🎊'
  }
  return icons[festivalType] || '🎉'
}

/**
 * Formats festival type for display
 */
export const formatFestivalType = (festivalType) => {
  if (!festivalType) return 'Unknown'
  
  return festivalType
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

/**
 * Gets the festival name from festival type
 */
export const getFestivalNameFromType = (festivalType) => {
  const names = {
    'durga-puja': 'Durga Puja',
    'kali-puja': 'Kali Puja',
    'saraswati-puja': 'Saraswati Puja',
    'lakshmi-puja': 'Lakshmi Puja',
    'jagaddhatri-puja': 'Jagaddhatri Puja',
    'kartik-puja': 'Kartik Puja',
    'rath-yatra': 'Rath Yatra',
    'dol-yatra': 'Dol Jatra (Holi)',
    'janmashtami': 'Janmashtami',
    'ganesh-puja': 'Ganesh Puja',
    'cultural': 'Cultural Events',
    'other': 'Other Festivals'
  }
  return names[festivalType] || formatFestivalType(festivalType)
}