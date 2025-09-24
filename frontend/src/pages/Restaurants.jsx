import { useState, useEffect } from 'react'

export default function Restaurants() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedRestaurant, setSelectedRestaurant] = useState(null)
  const [selectedMedia, setSelectedMedia] = useState(null)

  useEffect(() => {
    // Scroll reveal animation observer
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }
    
    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    }, observerOptions)
    
    document.querySelectorAll('.scroll-reveal').forEach(el => {
      observer.observe(el)
    })
    
    return () => observer.disconnect()
  }, [])

  // Reset animations when category changes
  useEffect(() => {
    setTimeout(() => {
      document.querySelectorAll('.restaurant-reveal').forEach(el => {
        el.classList.remove('visible')
      })
      
      setTimeout(() => {
        document.querySelectorAll('.restaurant-reveal').forEach(el => {
          el.classList.add('visible')
        })
      }, 50)
    }, 100)
  }, [selectedCategory])

  const categories = [
    { id: 'all', label: 'All Restaurants', icon: '🍽️' },
    { id: 'bengali', label: 'Bengali Cuisine', icon: '🐟' },
    { id: 'sweets', label: 'Sweets & Desserts', icon: '🍰' },
    { id: 'vegetarian', label: 'Vegetarian', icon: '🥗' },
    { id: 'street', label: 'Street Food', icon: '🍛' },
    { id: 'tea', label: 'Tea & Snacks', icon: '🍵' }
  ]

  const restaurants = [
    {
      id: 1,
      name: "Banglar Rannaghar",
      category: 'bengali',
      cuisine: 'Traditional Bengali',
      rating: 4.5,
      priceRange: '₹₹',
      location: {
        address: "23, College Street, Central Santipur",
        landmark: "Near Advaita Acharya Temple",
        phone: "+91 98765 43210",
        hours: "11:00 AM - 10:00 PM"
      },
      description: "Authentic Bengali home-style cooking in a traditional setting. Famous for fresh river fish curry and handmade sweets.",
      specialties: ["Hilsa Fish Curry", "Kosha Mangsho", "Chingri Malai Curry", "Mishti Doi"],
      ambiance: "Traditional Bengali home atmosphere with wooden furniture and cultural decor",
      established: "1987",
      gradient: "from-orange-200 to-red-300",
      icon: "🐟",
      mediaCount: "15 photos, 3 videos",
      menu: {
        mainCourse: [
          { item: "Hilsa Fish Curry", price: "₹280", description: "Fresh hilsa in traditional mustard gravy" },
          { item: "Kosha Mangsho", price: "₹320", description: "Slow-cooked mutton in rich spices" },
          { item: "Chingri Malai Curry", price: "₹350", description: "Prawns in coconut milk curry" },
          { item: "Aloo Posto", price: "₹180", description: "Potatoes in poppy seed paste" }
        ],
        rice: [
          { item: "Steamed Basmati Rice", price: "₹80", description: "Perfectly cooked long-grain rice" },
          { item: "Pulao", price: "₹120", description: "Aromatic rice with whole spices" }
        ],
        desserts: [
          { item: "Mishti Doi", price: "₹60", description: "Traditional sweet yogurt" },
          { item: "Rasgulla", price: "₹80", description: "Soft cottage cheese balls in syrup" }
        ]
      },
      mediaCollection: [
        { type: 'photo', title: 'Restaurant Exterior', description: 'Traditional facade with Bengali signage' },
        { type: 'photo', title: 'Dining Hall', description: 'Wooden tables and cultural decorations' },
        { type: 'photo', title: 'Hilsa Fish Curry', description: 'Signature dish with mustard gravy' },
        { type: 'photo', title: 'Kitchen Area', description: 'Traditional clay ovens and cooking methods' },
        { type: 'photo', title: 'Chef Portrait', description: 'Head chef with 30 years experience' },
        { type: 'photo', title: 'Fresh Fish Selection', description: 'Daily fresh catch from Hooghly River' },
        { type: 'photo', title: 'Kosha Mangsho', description: 'Slow-cooked mutton specialty' },
        { type: 'photo', title: 'Traditional Thali', description: 'Complete Bengali meal spread' },
        { type: 'photo', title: 'Mishti Doi', description: 'Homemade sweet yogurt' },
        { type: 'photo', title: 'Evening Ambiance', description: 'Warm lighting and family atmosphere' },
        { type: 'photo', title: 'Spice Collection', description: 'Traditional Bengali spices and herbs' },
        { type: 'photo', title: 'Clay Pot Cooking', description: 'Food prepared in traditional earthen pots' },
        { type: 'photo', title: 'Customer Reviews', description: 'Happy diners enjoying their meals' },
        { type: 'photo', title: 'Festival Decorations', description: 'Restaurant during Durga Puja celebrations' },
        { type: 'photo', title: 'Staff Team', description: 'Experienced team of Bengali cooks' },
        { type: 'video', title: 'Cooking Process', description: 'How Hilsa curry is prepared', duration: '8:30' },
        { type: 'video', title: 'Customer Reviews', description: 'Regular customers share their experiences', duration: '5:45' },
        { type: 'video', title: 'Restaurant Tour', description: 'Complete walkthrough of the establishment', duration: '12:15' }
      ]
    },
    {
      id: 2,
      name: "Mishti Mukh",
      category: 'sweets',
      cuisine: 'Bengali Sweets & Desserts',
      rating: 4.7,
      priceRange: '₹',
      location: {
        address: "15, Market Complex, Santipur Bazaar",
        landmark: "Opposite Railway Station",
        phone: "+91 98234 56789",
        hours: "8:00 AM - 9:00 PM"
      },
      description: "Traditional Bengali sweet shop known for fresh rasgulla, sandesh, and seasonal specialties. Four generations of sweet-making tradition.",
      specialties: ["Rasgulla", "Sandesh", "Kheer Kadam", "Langcha", "Seasonal Sweets"],
      ambiance: "Traditional sweet shop with glass display counters and marble floors",
      established: "1952",
      gradient: "from-pink-200 to-rose-300",
      icon: "🍰",
      mediaCount: "12 photos, 2 videos",
      menu: {
        signature: [
          { item: "Fresh Rasgulla (per piece)", price: "₹25", description: "Soft spongy balls in sugar syrup" },
          { item: "Sandesh Box (6 pieces)", price: "₹150", description: "Assorted flavored sandesh varieties" },
          { item: "Kheer Kadam (per piece)", price: "₹30", description: "Layered sweet with kheer center" },
          { item: "Langcha (per piece)", price: "₹20", description: "Oval-shaped sweet in sugar syrup" }
        ],
        seasonal: [
          { item: "Nolen Gur Sandesh", price: "₹180/kg", description: "Date palm jaggery sandesh (Winter only)" },
          { item: "Aam Sandesh", price: "₹200/kg", description: "Mango flavored sandesh (Summer only)" },
          { item: "Kaju Katli", price: "₹800/kg", description: "Cashew fudge for festivals" }
        ],
        gift: [
          { item: "Mixed Sweets Box (1kg)", price: "₹400", description: "Assorted traditional sweets" },
          { item: "Festival Special Box", price: "₹600", description: "Premium sweets for celebrations" }
        ]
      },
      mediaCollection: [
        { type: 'photo', title: 'Shop Front', description: 'Traditional sweet shop exterior with displays' },
        { type: 'photo', title: 'Sweet Display', description: 'Glass counters with variety of sweets' },
        { type: 'photo', title: 'Rasgulla Making', description: 'Fresh rasgulla being prepared' },
        { type: 'photo', title: 'Master Sweet Maker', description: 'Fourth generation owner at work' },
        { type: 'photo', title: 'Sandesh Varieties', description: 'Different flavors and shapes of sandesh' },
        { type: 'photo', title: 'Festival Collection', description: 'Special sweets for Durga Puja' },
        { type: 'photo', title: 'Kitchen Process', description: 'Traditional sweet-making techniques' },
        { type: 'photo', title: 'Fresh Milk', description: 'Quality ingredients from local dairy' },
        { type: 'photo', title: 'Gift Packaging', description: 'Beautiful boxes for festivals and occasions' },
        { type: 'photo', title: 'Customer Queue', description: 'Popular spot especially during festivals' },
        { type: 'photo', title: 'Traditional Tools', description: 'Copper pots and wooden ladles' },
        { type: 'photo', title: 'Awards Display', description: 'Recognition for quality and taste' },
        { type: 'video', title: 'Rasgulla Making Process', description: 'Step-by-step traditional preparation', duration: '10:20' },
        { type: 'video', title: 'Family Heritage Story', description: 'Four generations of sweet-making tradition', duration: '7:15' }
      ]
    },
    {
      id: 3,
      name: "Green Leaf Restaurant",
      category: 'vegetarian',
      cuisine: 'Pure Vegetarian',
      rating: 4.3,
      priceRange: '₹₹',
      location: {
        address: "45, Temple Road, Near Madana Gopala Temple",
        landmark: "Behind Post Office",
        phone: "+91 97654 32108",
        hours: "10:00 AM - 10:30 PM"
      },
      description: "Pure vegetarian restaurant serving North and South Indian dishes along with Bengali vegetarian specialties. Clean and family-friendly environment.",
      specialties: ["Paneer Butter Masala", "Dosa Varieties", "Bengali Veg Thali", "Chinese Vegetarian"],
      ambiance: "Clean, bright interior with family seating and air conditioning",
      established: "1995",
      gradient: "from-green-200 to-emerald-300",
      icon: "🥗",
      mediaCount: "10 photos, 1 video",
      menu: {
        northIndian: [
          { item: "Paneer Butter Masala", price: "₹220", description: "Cottage cheese in rich tomato gravy" },
          { item: "Dal Tadka", price: "₹160", description: "Tempered yellow lentils" },
          { item: "Mixed Vegetable Curry", price: "₹180", description: "Seasonal vegetables in spiced gravy" },
          { item: "Chapati (2 pieces)", price: "₹40", description: "Fresh wheat bread" }
        ],
        southIndian: [
          { item: "Masala Dosa", price: "₹120", description: "Crispy crepe with spiced potato filling" },
          { item: "Idli Sambar (3 pieces)", price: "₹80", description: "Steamed rice cakes with lentil curry" },
          { item: "Uttapam", price: "₹100", description: "Thick pancake with vegetables" }
        ],
        bengali: [
          { item: "Bengali Veg Thali", price: "₹200", description: "Complete vegetarian Bengali meal" },
          { item: "Aloo Posto", price: "₹140", description: "Potatoes in poppy seed paste" },
          { item: "Shukto", price: "₹160", description: "Mixed vegetable curry with bitter gourd" }
        ]
      },
      mediaCollection: [
        { type: 'photo', title: 'Restaurant Interior', description: 'Clean, well-lit dining area' },
        { type: 'photo', title: 'Bengali Thali', description: 'Traditional vegetarian Bengali meal' },
        { type: 'photo', title: 'Dosa Preparation', description: 'Fresh dosas being made' },
        { type: 'photo', title: 'Kitchen Staff', description: 'Experienced vegetarian cooks' },
        { type: 'photo', title: 'Paneer Specialties', description: 'Variety of paneer dishes' },
        { type: 'photo', title: 'Family Dining', description: 'Families enjoying meals together' },
        { type: 'photo', title: 'Fresh Vegetables', description: 'Daily fresh vegetable selection' },
        { type: 'photo', title: 'South Indian Corner', description: 'Dedicated dosa and idli counter' },
        { type: 'photo', title: 'Cleanliness Standards', description: 'Hygienic food preparation area' },
        { type: 'photo', title: 'Menu Display', description: 'Clear pricing and variety' },
        { type: 'video', title: 'Restaurant Overview', description: 'Tour of the vegetarian restaurant', duration: '6:40' }
      ]
    },
    {
      id: 4,
      name: "Chai Adda",
      category: 'tea',
      cuisine: 'Tea & Snacks',
      rating: 4.1,
      priceRange: '₹',
      location: {
        address: "7, Station Road, Near Bus Stand",
        landmark: "Next to Pharmacy",
        phone: "+91 96543 21087",
        hours: "6:00 AM - 11:00 PM"
      },
      description: "Popular tea stall and snack corner. Perfect spot for morning tea, evening snacks, and local gossip. Known for special masala chai and fresh pakoras.",
      specialties: ["Masala Chai", "Samosa", "Pakora", "Biscuits", "Evening Snacks"],
      ambiance: "Casual roadside setting with plastic chairs and tables, very local atmosphere",
      established: "2001",
      gradient: "from-amber-200 to-yellow-300",
      icon: "🍵",
      mediaCount: "8 photos",
      menu: {
        beverages: [
          { item: "Special Masala Chai", price: "₹15", description: "Tea with special blend of spices" },
          { item: "Regular Tea", price: "₹10", description: "Simple milk tea" },
          { item: "Black Tea", price: "₹8", description: "Tea without milk" },
          { item: "Coffee", price: "₹20", description: "Instant coffee with milk" }
        ],
        snacks: [
          { item: "Samosa (per piece)", price: "₹12", description: "Crispy fried pastry with potato filling" },
          { item: "Mixed Pakora", price: "₹30", description: "Assorted vegetable fritters" },
          { item: "Bread Pakora", price: "₹25", description: "Bread slices in gram flour batter" },
          { item: "Biscuits", price: "₹5", description: "Tea biscuits" }
        ],
        evening: [
          { item: "Jhal Muri", price: "₹20", description: "Spiced puffed rice snack" },
          { item: "Chanachur", price: "₹15", description: "Mixed savory snack" }
        ]
      },
      mediaCollection: [
        { type: 'photo', title: 'Tea Stall Setup', description: 'Traditional roadside tea preparation' },
        { type: 'photo', title: 'Masala Chai', description: 'Special spiced tea being prepared' },
        { type: 'photo', title: 'Fresh Samosas', description: 'Hot samosas ready to serve' },
        { type: 'photo', title: 'Local Gathering', description: 'Regular customers enjoying morning tea' },
        { type: 'photo', title: 'Tea Master', description: 'Owner preparing his special blend' },
        { type: 'photo', title: 'Pakora Counter', description: 'Fresh pakoras being fried' },
        { type: 'photo', title: 'Evening Rush', description: 'Busy evening snack time' },
        { type: 'photo', title: 'Regular Customers', description: 'Local community gathering spot' }
      ]
    },
    {
      id: 5,
      name: "Santipur Street Food Corner",
      category: 'street',
      cuisine: 'Bengali Street Food',
      rating: 4.4,
      priceRange: '₹',
      location: {
        address: "Market Square, Central Santipur",
        landmark: "Near Clock Tower",
        phone: "+91 95432 10876",
        hours: "4:00 PM - 11:00 PM"
      },
      description: "Popular street food destination offering authentic Bengali street snacks. Famous for phuchka, ghugni, and various evening snacks that locals love.",
      specialties: ["Phuchka", "Ghugni", "Aloo Kabli", "Jhalmuri", "Beguni"],
      ambiance: "Outdoor street food setup with standing tables and bustling market atmosphere",
      established: "2010",
      gradient: "from-red-200 to-orange-300",
      icon: "🍛",
      mediaCount: "11 photos, 1 video",
      menu: {
        popular: [
          { item: "Phuchka (6 pieces)", price: "₹30", description: "Crispy shells with spiced water and filling" },
          { item: "Ghugni", price: "₹25", description: "Spiced yellow peas curry" },
          { item: "Aloo Kabli", price: "₹35", description: "Spiced potato dish with chutneys" },
          { item: "Jhalmuri", price: "₹20", description: "Spicy puffed rice mix" }
        ],
        evening: [
          { item: "Beguni (4 pieces)", price: "₹20", description: "Batter-fried eggplant slices" },
          { item: "Telebhaja Mix", price: "₹25", description: "Assorted fried snacks" },
          { item: "Egg Roll", price: "₹40", description: "Egg wrapped in paratha with vegetables" }
        ],
        drinks: [
          { item: "Sugarcane Juice", price: "₹15", description: "Fresh pressed sugarcane juice" },
          { item: "Lemon Water", price: "₹10", description: "Fresh lime water with salt" }
        ]
      },
      mediaCollection: [
        { type: 'photo', title: 'Street Food Setup', description: 'Busy street food corner in market' },
        { type: 'photo', title: 'Phuchka Counter', description: 'Popular phuchka preparation station' },
        { type: 'photo', title: 'Ghugni Pot', description: 'Large pot of spiced yellow peas' },
        { type: 'photo', title: 'Crowd Favorite', description: 'Customers queuing for evening snacks' },
        { type: 'photo', title: 'Telebhaja Frying', description: 'Fresh fritters being prepared' },
        { type: 'photo', title: 'Spice Setup', description: 'Various chutneys and spice mixes' },
        { type: 'photo', title: 'Vendor at Work', description: 'Skilled street food vendor' },
        { type: 'photo', title: 'Evening Rush', description: 'Busy evening crowd enjoying food' },
        { type: 'photo', title: 'Jhalmuri Making', description: 'Mixing spiced puffed rice' },
        { type: 'photo', title: 'Local Favorites', description: 'Regular customers at their favorite spot' },
        { type: 'photo', title: 'Market Atmosphere', description: 'Vibrant market setting' },
        { type: 'video', title: 'Street Food Experience', description: 'Complete street food tour and tasting', duration: '9:25' }
      ]
    }
  ]

  const filteredRestaurants = selectedCategory === 'all' 
    ? restaurants 
    : restaurants.filter(restaurant => restaurant.category === selectedCategory)

  // Restaurant Detail Modal
  const RestaurantModal = ({ restaurant, onClose }) => {
    const [activeTab, setActiveTab] = useState('overview')
    
    if (!restaurant) return null

    return (
      <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className={`bg-gradient-to-r ${restaurant.gradient} p-6 rounded-t-3xl relative`}>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 bg-black/20 rounded-full flex items-center justify-center hover:bg-black/30 transition-colors"
            >
              <span className="text-2xl text-white">×</span>
            </button>
            
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-white/30 rounded-full flex items-center justify-center text-3xl">
                {restaurant.icon}
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold font-serif text-gray-800 mb-2">{restaurant.name}</h2>
                <p className="text-lg text-gray-700 mb-2">{restaurant.cuisine}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-700">
                  <span>★ {restaurant.rating}</span>
                  <span>{restaurant.priceRange}</span>
                  <span>Est. {restaurant.established}</span>
                  <span>{restaurant.mediaCount}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <div className="flex space-x-8 px-6">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'menu', label: 'Menu' },
                { id: 'photos', label: 'Photos & Videos' },
                { id: 'location', label: 'Location' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-2 border-b-2 font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-600 hover:text-gray-800'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">About</h3>
                  <p className="text-gray-700 leading-relaxed">{restaurant.description}</p>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Specialties</h3>
                  <div className="flex flex-wrap gap-2">
                    {restaurant.specialties.map((specialty, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Ambiance</h3>
                  <p className="text-gray-700">{restaurant.ambiance}</p>
                </div>
              </div>
            )}

            {activeTab === 'menu' && (
              <div className="space-y-8">
                {Object.entries(restaurant.menu).map(([category, items]) => (
                  <div key={category}>
                    <h3 className="text-xl font-bold text-gray-800 mb-4 capitalize">
                      {category.replace(/([A-Z])/g, ' $1').trim()}
                    </h3>
                    <div className="grid gap-4">
                      {items.map((menuItem, index) => (
                        <div key={index} className="flex justify-between items-start p-4 bg-gray-50 rounded-lg">
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-800">{menuItem.item}</h4>
                            <p className="text-sm text-gray-600 mt-1">{menuItem.description}</p>
                          </div>
                          <span className="font-bold text-green-600 ml-4">{menuItem.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'photos' && (
              <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
                {restaurant.mediaCollection.map((media, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-xl p-3 cursor-pointer hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
                    onClick={() => setSelectedMedia({ ...media, restaurant })}
                  >
                    <div className={`aspect-video bg-gradient-to-br ${restaurant.gradient} rounded-lg flex items-center justify-center mb-3 relative group`}>
                      <div className="absolute inset-0 bg-black/20 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <div className="w-8 h-8 bg-white/80 rounded-full flex items-center justify-center">
                          <span className="text-sm text-gray-800">{media.type === 'video' ? '▶' : '👁'}</span>
                        </div>
                      </div>
                      <span className="text-2xl opacity-60">{media.type === 'video' ? '🎥' : '📸'}</span>
                      {media.duration && (
                        <div className="absolute bottom-1 right-1 bg-black/70 text-white px-1 py-0.5 rounded text-xs">
                          {media.duration}
                        </div>
                      )}
                    </div>
                    <h4 className="text-sm font-semibold text-gray-800 mb-1 line-clamp-2">{media.title}</h4>
                    <p className="text-xs text-gray-600 line-clamp-2">{media.description}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'location' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Location & Contact</h3>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Address</h4>
                        <p className="text-gray-700">{restaurant.location.address}</p>
                        <p className="text-sm text-gray-600 mt-1">{restaurant.location.landmark}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Contact</h4>
                        <p className="text-gray-700">{restaurant.location.phone}</p>
                        <p className="text-gray-700">{restaurant.location.hours}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Map</h3>
                  <div className="bg-gradient-to-br from-blue-100 to-green-100 h-64 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <span className="text-4xl">🗺️</span>
                      <p className="text-gray-600 mt-2">Interactive Map Coming Soon</p>
                      <p className="text-sm text-gray-500">Click to open in Google Maps</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Media Detail Modal
  const MediaDetailModal = ({ media, onClose }) => {
    if (!media) return null

    return (
      <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm z-60 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={onClose}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <span className="text-xl">←</span>
                <span className="font-medium">Back</span>
              </button>
              <button
                onClick={onClose}
                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <span className="text-lg">×</span>
              </button>
            </div>

            <div className={`aspect-video bg-gradient-to-br ${media.restaurant.gradient} rounded-xl flex items-center justify-center mb-4 relative cursor-pointer group`}>
              <div className="absolute inset-0 bg-black/20 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center">
                  <span className="text-2xl text-gray-800">{media.type === 'video' ? '▶' : '🔍'}</span>
                </div>
              </div>
              <span className="text-6xl opacity-70">{media.restaurant.icon}</span>
              {media.duration && (
                <div className="absolute bottom-3 right-3 bg-black/70 text-white px-3 py-1 rounded text-sm">
                  {media.duration}
                </div>
              )}
            </div>

            <h3 className="text-xl font-bold text-gray-800 mb-2">{media.title}</h3>
            <p className="text-gray-600 mb-4">{media.description}</p>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>From: {media.restaurant.name}</span>
                <span>{media.type === 'video' ? '🎥' : '📸'} {media.type}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50">
      {/* Header Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
          <div className="text-center scroll-reveal">
            <h1 className="text-5xl md:text-6xl font-bold font-serif mb-6">
              Restaurants in Santipur
            </h1>
            <p className="text-xl md:text-2xl text-orange-100 max-w-4xl mx-auto leading-relaxed">
              Discover authentic Bengali cuisine and local flavors in Santipur's finest restaurants, 
              from traditional Bengali dishes to street food delights.
            </p>
          </div>
        </div>
      </div>

      {/* Restaurant Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="scroll-reveal">
              <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-white">🍽️</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-2">15+</h3>
              <p className="text-gray-600">Restaurants</p>
            </div>
            <div className="scroll-reveal" style={{animationDelay: '0.1s'}}>
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-white">🐟</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-2">100+</h3>
              <p className="text-gray-600">Bengali Dishes</p>
            </div>
            <div className="scroll-reveal" style={{animationDelay: '0.2s'}}>
              <div className="w-16 h-16 bg-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-white">⭐</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-2">4.5</h3>
              <p className="text-gray-600">Average Rating</p>
            </div>
            <div className="scroll-reveal" style={{animationDelay: '0.3s'}}>
              <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-white">💰</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-2">₹-₹₹</h3>
              <p className="text-gray-600">Price Range</p>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-t">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-orange-50 hover:text-orange-600 border border-gray-200'
                }`}
              >
                <span className="text-lg">{category.icon}</span>
                <span>{category.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Restaurants Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-3xl font-bold font-serif text-gray-800 mb-4">
              {categories.find(cat => cat.id === selectedCategory)?.label || 'All Restaurants'}
            </h2>
            <p className="text-lg text-gray-600">
              {filteredRestaurants.length} restaurants found
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRestaurants.map((restaurant, index) => (
              <div
                key={restaurant.id}
                className="restaurant-reveal bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer overflow-hidden"
                style={{animationDelay: `${index * 0.1}s`}}
                onClick={() => setSelectedRestaurant(restaurant)}
              >
                <div className={`h-48 bg-gradient-to-br ${restaurant.gradient} flex items-center justify-center relative group`}>
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                    <div className="text-white text-center">
                      <span className="block text-2xl mb-2">👁️</span>
                      <span className="text-sm font-medium">View Details</span>
                    </div>
                  </div>
                  <span className="text-6xl opacity-70">{restaurant.icon}</span>
                  <div className="absolute top-4 right-4 bg-white/90 px-2 py-1 rounded-full text-xs font-medium text-gray-800">
                    ⭐ {restaurant.rating}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{restaurant.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{restaurant.cuisine}</p>
                  <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-3">
                    {restaurant.description}
                  </p>
                  
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">{restaurant.priceRange}</span>
                    <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs">
                      {restaurant.mediaCount.split(',')[0]}
                    </span>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center text-xs text-gray-500">
                      <span>📍 {restaurant.location.landmark}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Restaurant and Media Modals */}
      <RestaurantModal 
        restaurant={selectedRestaurant} 
        onClose={() => setSelectedRestaurant(null)} 
      />
      
      <MediaDetailModal 
        media={selectedMedia} 
        onClose={() => setSelectedMedia(null)} 
      />
    </div>
  )
}