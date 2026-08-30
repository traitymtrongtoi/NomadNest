import React, { useState } from 'react';

export interface GuideItem {
  id: string;
  category: 'food' | 'heritage';
  tag: string;
  title: string;
  subtitle?: string;
  description: string;
  image: string;
  address: string;
  priceRange: string;
  rating: string;
  nomadTip?: string;
}

export const MOCK_GUIDE_ITEMS: GuideItem[] = [
  // FOOD GUIDE ITEMS
  {
    id: 'food-1',
    category: 'food',
    tag: 'Da Nang Signature',
    title: 'Mi Quang Frog & Chicken - Ba Mua',
    subtitle: 'Traditional Quang-style Noodle Brand',
    description: 'A signature Da Nang turmeric-infused noodle bowl in a deeply savory slow-simmered broth with free-range chicken or tender frog, served alongside crisp Tra Que herbs, roasted peanuts, and crunchy toasted sesame rice crackers.',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80',
    address: '19 Tran Binh Trong, Hai Chau Dist, Da Nang',
    priceRange: '35,000 - 65,000 VND',
    rating: '4.8',
    nomadTip: 'Order an extra crispy sesame rice cracker and request refreshing iced green tea.'
  },
  {
    id: 'food-2',
    category: 'food',
    tag: 'Rice Paper Rolls',
    title: 'Banh Trang Cuon Thit Heo Dai Loc',
    subtitle: 'Pork Belly Rolls & Fermented Dipping Sauce',
    description: 'Thinly sliced boiled pork with two layers of skin, rolled in sun-dewed Dai Loc rice paper with over 10 varieties of fresh wild herbs, paired with an aromatic, savory fermented dipping sauce (mam nem).',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    address: '124 Huynh Thuc Khang, Hai Chau Dist, Da Nang',
    priceRange: '50,000 - 90,000 VND',
    rating: '4.9',
    nomadTip: 'Air-conditioned seating with 80Mbps Wi-Fi—ideal for a relaxing lunch after focused work sessions.'
  },
  {
    id: 'food-3',
    category: 'food',
    tag: 'Artisan Village Specialty',
    title: 'Goi Ca Nam O Oc Sinh',
    subtitle: 'Ancient Nam O Fishing Village Heritage',
    description: 'Freshly caught coastal herring tossed in galangal, chili, and fragrant roasted rice powder, rolled with wild mung and polyscias leaves, dipped in a rich sesame-peanut dipping sauce.',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80',
    address: 'Nguyen Luong Bang St, Nam O Village, Lien Chieu Dist',
    priceRange: '60,000 - 120,000 VND',
    rating: '4.9',
    nomadTip: 'Try both styles: Dry salad (tossed in roasted rice powder) and Wet salad (marinated in savory broth).'
  },
  {
    id: 'food-4',
    category: 'food',
    tag: 'Noodle Soup',
    title: 'Bun Cha Ca Hon',
    subtitle: 'Mackerel Fish Cake & Sweet Pumpkin Broth',
    description: 'A naturally sweet, ocean-rich broth simmered with fresh marlin bone and cooling pumpkin, served with crispy fried and tender steamed mackerel fish patties.',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80',
    address: '113/3 Nguyen Chi Thanh, Hai Chau Dist, Da Nang',
    priceRange: '30,000 - 55,000 VND',
    rating: '4.7',
    nomadTip: 'Opens at 6:00 AM—an energizing breakfast spot for early-rising Digital Nomads.'
  },
  {
    id: 'food-5',
    category: 'food',
    tag: 'Street Food & Snacks',
    title: 'Banh Xeo & Nem Lui Ba Duong',
    subtitle: 'Most Famous Hidden Alleyway Eatery',
    description: 'Crispy turmeric-yellow savory crepes stuffed with sweet shrimp and tender beef, paired with charcoal-grilled pork skewers (nem lui) and a special creamy liver dipping sauce.',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80',
    address: 'K280/23 Hoang Dieu, Hai Chau Dist, Da Nang',
    priceRange: '40,000 - 80,000 VND',
    rating: '4.8',
    nomadTip: 'Tucked inside an alley with spacious seating; peak hours are 5:00 PM – 7:00 PM.'
  },
  {
    id: 'food-6',
    category: 'food',
    tag: 'Noodle Heritage',
    title: 'Cao Lau Da Nang & Ancient Flavors',
    subtitle: 'Historic Central Vietnam Dish',
    description: 'Chewy ash-infused noodles topped with savory five-spice char siu pork slices, crispy fried pork cracklings, aromatic herbs, and a rich braising reduction sauce.',
    image: 'https://images.unsplash.com/photo-1617093727343-374698b1b08d?auto=format&fit=crop&w=800&q=80',
    address: '267 Thai Thi Buoi, Thanh Khe Dist, Da Nang',
    priceRange: '35,000 - 60,000 VND',
    rating: '4.7',
    nomadTip: 'Noodles are traditionally prepared with lye water from regional melaleuca tree ash.'
  },

  // HERITAGE GUIDE ITEMS
  {
    id: 'heritage-1',
    category: 'heritage',
    tag: 'National Heritage',
    title: 'Marble Mountains (Ngu Hanh Son)',
    subtitle: 'Sacred 5 Element Peaks',
    description: 'A breathtaking cluster of five limestone and marble peaks named after the cosmic elements (Metal, Wood, Water, Fire, Earth). Houses mystical illuminated caverns like Huyen Khong Cave and ancient cliffside pagodas.',
    image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=800&q=80',
    address: '81 Huyen Tran Cong Chua, Ngu Hanh Son Dist, Da Nang',
    priceRange: '40,000 VND / ticket',
    rating: '4.9',
    nomadTip: 'Take the panoramic glass elevator on Water Mountain for 360-degree ocean views.'
  },
  {
    id: 'heritage-2',
    category: 'heritage',
    tag: 'Living Craft Heritage',
    title: 'Nam O Fish Sauce Village (700 Years)',
    subtitle: 'National Intangible Cultural Heritage',
    description: 'A timeless 700-year-old coastal fishing village sheltered beneath Hai Van Pass. Master artisans handcraft pure anchovy fish sauce in weathered wooden vats, preserving ancestral secrets across centuries.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    address: 'Nam O Village, Hoa Hiep Nam, Lien Chieu Dist, Da Nang',
    priceRange: 'Free admission',
    rating: '5.0',
    nomadTip: 'Join hands-on fermentation workshops with local NomadNest artisans.'
  },
  {
    id: 'heritage-3',
    category: 'heritage',
    tag: 'Historical Museum',
    title: 'Museum of Cham Sculpture',
    subtitle: 'World-Renowned Champa Art Collection',
    description: 'Home to the world’s largest collection of Cham architectural sculptures and sacred relics. Built in 1915, this antique building uniquely blends French colonial elegance with ancient Cham motifs.',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    address: '02 2nd of September St, Hai Chau Dist, Da Nang',
    priceRange: '60,000 VND / ticket',
    rating: '4.8',
    nomadTip: 'A peaceful, contemplative haven to explore centuries of ancient Champa art and history.'
  },
  {
    id: 'heritage-4',
    category: 'heritage',
    tag: 'Ancient Craft Village',
    title: 'Non Nuoc Stone Carving Village',
    subtitle: '400-Year Stone Sculpture Legacy',
    description: 'Nestled at the foot of Marble Mountains, hundreds of master stone sculptors craft exquisite statues, Buddhist relics, and decorative art exported across the globe.',
    image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80',
    address: 'Foot of Marble Mountains, Hoa Hai, Ngu Hanh Son Dist',
    priceRange: 'Free admission',
    rating: '4.7',
    nomadTip: 'Pick up finely crafted miniature marble souvenirs from local family workshops.'
  },
  {
    id: 'heritage-5',
    category: 'heritage',
    tag: 'Spiritual & Scenic',
    title: 'Linh Ung Pagoda & Lady Buddha',
    subtitle: '67m Majestic Guanyin Statue',
    description: 'The grandest pagoda in Da Nang perched on the lush Son Tra Peninsula. The towering 67-meter Lady Buddha stands against the mountainside overlooking the boundless East Sea.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    address: 'Son Tra Peninsula, Son Tra Dist, Da Nang',
    priceRange: 'Free admission',
    rating: '4.9',
    nomadTip: 'Visit around 4:00 PM to catch the breathtaking golden sunset over Da Nang Bay.'
  },
  {
    id: 'heritage-6',
    category: 'heritage',
    tag: 'Urban Landmark',
    title: 'Dragon Bridge & Love Lock Bridge',
    subtitle: 'Modern Icon on the Han River',
    description: 'The iconic golden Dragon Bridge breathes fire and water in a spectacular display at 9:00 PM every Saturday and Sunday. Stroll alongside the romantic Love Lock Bridge illuminated by glowing heart-shaped lantern trees.',
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80',
    address: 'East bank of Han River, Tran Hung Dao St, Son Tra Dist',
    priceRange: 'Free',
    rating: '4.8',
    nomadTip: 'Arrive before 8:30 PM to secure the best photo spots along the pedestrian promenade.'
  }
];

interface LocalGuideScreenProps {
  onBack: () => void;
  onOpenMap?: () => void;
}

export const LocalGuideScreen: React.FC<LocalGuideScreenProps> = ({ onBack, onOpenMap }) => {
  const [activeView, setActiveView] = useState<'category' | 'catalog'>('category');
  const [selectedCategory, setSelectedCategory] = useState<'food' | 'heritage'>('food');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<GuideItem | null>(null);

  // Handle category card selection
  const handleSelectCategoryCard = (cat: 'food' | 'heritage') => {
    setSelectedCategory(cat);
    setActiveView('catalog');
    setSelectedTag('all');
    setSearchQuery('');
  };

  // Filter items based on active category, tag and search query
  const filteredItems = MOCK_GUIDE_ITEMS.filter(item => {
    if (item.category !== selectedCategory) return false;

    if (selectedTag !== 'all' && item.tag !== selectedTag) return false;

    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchDesc = item.description.toLowerCase().includes(q);
      const matchAddr = item.address.toLowerCase().includes(q);
      const matchTag = item.tag.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc && !matchAddr && !matchTag) return false;
    }

    return true;
  });

  // Extract available tags for current category
  const availableTags = ['all', ...Array.from(new Set(MOCK_GUIDE_ITEMS.filter(i => i.category === selectedCategory).map(i => i.tag)))];

  return (
    <div className="bg-gradient-to-b from-[#00281D] via-[#001D15] to-[#00120D] text-white min-h-screen pb-28 font-sans">
      {/* 1. TOP HEADER WITH CLEAR BACK BUTTON */}
      <header className="sticky top-0 z-50 bg-[#00281D]/95 backdrop-blur-xl flex items-center justify-between px-4 sm:px-6 h-16 border-b border-white/10 shadow-lg">
        <button
          onClick={() => {
            if (activeView === 'catalog') {
              setActiveView('category');
            } else {
              onBack();
            }
          }}
          type="button"
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer active:scale-95 shrink-0"
          title="Back"
        >
          <span className="material-symbols-outlined text-xl">arrow_back</span>
        </button>

        <div className="text-center">
          <h1 className="font-extrabold text-base text-white tracking-wide">
            {activeView === 'category'
              ? 'Da Nang Local Guide'
              : selectedCategory === 'food'
              ? 'Food Guide - Cuisine'
              : 'Heritage Guide - Attractions'}
          </h1>
          <p className="text-[10px] text-[#8bd6b6] font-semibold">NomadNest Cultural Compass</p>
        </div>

        <div className="w-10" />
      </header>

      {/* 2. MAIN CONTENT CONTAINER */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 space-y-6">
        {/* ================= STEP 1: CATEGORY SELECTION SCREEN ================= */}
        {activeView === 'category' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Intro Banner */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-5 sm:p-6 backdrop-blur-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#8bd6b6]/10 rounded-full blur-2xl pointer-events-none" />
              <span className="bg-[#8bd6b6] text-[#002116] text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full inline-block mb-2 shadow">
                Local Insights
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                Discover Da Nang through Food & Heritage
              </h2>
              <p className="text-xs sm:text-sm text-white/70 mt-2 max-w-2xl leading-relaxed">
                Immerse yourself in authentic Da Nang culture with NomadNest. Select a guide below to explore traditional local specialties or historic cultural heritage landmarks.
              </p>
            </div>

            {/* CATEGORY CARDS GRID (2 Large Cards) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
              {/* CARD 1: FOOD GUIDE */}
              <div
                onClick={() => handleSelectCategoryCard('food')}
                className="relative h-72 sm:h-80 rounded-[24px] overflow-hidden shadow-2xl border border-white/20 group cursor-pointer transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-[0_20px_50px_rgba(139,214,182,0.25)] hover:border-[#8bd6b6] active:scale-[0.98]"
                style={{ cursor: 'pointer' }}
              >
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1000&q=80')"
                  }}
                />
                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 group-hover:via-black/30 transition-all" />

                {/* Card Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between text-white z-10">
                  <div className="flex justify-between items-start">
                    <span className="px-3.5 py-1.5 rounded-full bg-[#8bd6b6]/90 backdrop-blur-md text-[#002116] text-xs font-black uppercase tracking-wider shadow-lg">
                      Food Guide
                    </span>
                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center group-hover:bg-[#8bd6b6] group-hover:text-[#002116] transition-colors shadow">
                      <span className="material-symbols-outlined text-xl">restaurant</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl sm:text-3xl font-black text-white group-hover:text-[#8bd6b6] transition-colors leading-tight drop-shadow">
                      Food Guide
                    </h3>
                    <p className="text-sm font-bold text-emerald-300">
                      Explore Da Nang Cuisine
                    </p>
                    <p className="text-xs text-white/80 line-clamp-2 leading-relaxed">
                      From savory Mi Quang and Dai Loc pork rice paper rolls to the renowned 700-year-old Nam O raw fish salad.
                    </p>
                    <div className="pt-2 flex items-center text-xs font-bold text-[#8bd6b6] group-hover:underline gap-1">
                      <span>View all dishes</span>
                      <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* CARD 2: HERITAGE GUIDE */}
              <div
                onClick={() => handleSelectCategoryCard('heritage')}
                className="relative h-72 sm:h-80 rounded-[24px] overflow-hidden shadow-2xl border border-white/20 group cursor-pointer transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-[0_20px_50px_rgba(139,214,182,0.25)] hover:border-[#8bd6b6] active:scale-[0.98]"
                style={{ cursor: 'pointer' }}
              >
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1000&q=80')"
                  }}
                />
                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 group-hover:via-black/30 transition-all" />

                {/* Card Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between text-white z-10">
                  <div className="flex justify-between items-start">
                    <span className="px-3.5 py-1.5 rounded-full bg-[#8bd6b6]/90 backdrop-blur-md text-[#002116] text-xs font-black uppercase tracking-wider shadow-lg">
                      Heritage Guide
                    </span>
                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center group-hover:bg-[#8bd6b6] group-hover:text-[#002116] transition-colors shadow">
                      <span className="material-symbols-outlined text-xl">castle</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl sm:text-3xl font-black text-white group-hover:text-[#8bd6b6] transition-colors leading-tight drop-shadow">
                      Heritage Guide
                    </h3>
                    <p className="text-sm font-bold text-emerald-300">
                      Heritages & Attractions
                    </p>
                    <p className="text-xs text-white/80 line-clamp-2 leading-relaxed">
                      Discover the Marble Mountains, Nam O Fish Sauce Village, Cham Museum, and other famous landmarks.
                    </p>
                    <div className="pt-2 flex items-center text-xs font-bold text-[#8bd6b6] group-hover:underline gap-1">
                      <span>View all destinations</span>
                      <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= STEP 2: CATALOG DETAILED LAYOUT ================= */}
        {activeView === 'catalog' && (
          <div className="space-y-5 animate-fadeIn">
            {/* Category Switcher Tabs */}
            <div className="flex items-center justify-between gap-3 bg-white/10 p-1.5 rounded-2xl border border-white/15 backdrop-blur-md">
              <button
                onClick={() => {
                  setSelectedCategory('food');
                  setSelectedTag('all');
                }}
                className={`flex-1 py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  selectedCategory === 'food'
                    ? 'bg-[#8bd6b6] text-[#002116] shadow-md'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                <span className="material-symbols-outlined text-lg">restaurant</span>
                <span>Food Guide (Cuisine)</span>
              </button>

              <button
                onClick={() => {
                  setSelectedCategory('heritage');
                  setSelectedTag('all');
                }}
                className={`flex-1 py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  selectedCategory === 'heritage'
                    ? 'bg-[#8bd6b6] text-[#002116] shadow-md'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                <span className="material-symbols-outlined text-lg">castle</span>
                <span>Heritage Guide (Attractions)</span>
              </button>
            </div>

            {/* Search & Tag Filters */}
            <div className="space-y-3">
              {/* Search Bar */}
              <div className="relative w-full">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-white/50 text-xl pointer-events-none">
                  search
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={
                    selectedCategory === 'food'
                      ? 'Search local specialties, noodles, rolls, seafood...'
                      : 'Search heritage sites, craft villages, landmarks...'
                  }
                  className="w-full bg-white/10 border border-white/20 focus:border-[#8bd6b6] rounded-2xl py-3 pl-11 pr-10 text-sm text-white placeholder:text-white/40 outline-none transition-all focus:ring-2 focus:ring-[#8bd6b6]/30"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white/20 text-white flex items-center justify-center text-xs hover:bg-white/40 transition-colors"
                  >
                    <span className="material-symbols-outlined text-sm">close</span>
                  </button>
                )}
              </div>

              {/* Filter Pills */}
              <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
                {availableTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                      selectedTag === tag
                        ? 'bg-[#8bd6b6] text-[#002116] shadow-md'
                        : 'bg-white/10 text-white/70 hover:bg-white/20 border border-white/10'
                    }`}
                  >
                    {tag === 'all' ? 'All' : tag}
                  </button>
                ))}
              </div>
            </div>

            {/* CATALOG GRID (1 col mobile, 2 sm, 3 md, 4 lg) */}
            {filteredItems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 pt-2">
                {filteredItems.map(item => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className="bg-white rounded-2xl overflow-hidden shadow-xl flex flex-col border border-gray-100 group cursor-pointer transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-2xl hover:border-[#8bd6b6] active:scale-[0.98] text-gray-900"
                    style={{ cursor: 'pointer' }}
                  >
                    {/* Thumbnail Image */}
                    <div className="h-44 w-full overflow-hidden relative shrink-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                      />
                      <div className="absolute top-2.5 left-2.5 bg-[#002116]/80 backdrop-blur-md text-[#8bd6b6] text-[10px] font-extrabold px-2.5 py-1 rounded-full border border-white/20 shadow">
                        {item.tag}
                      </div>
                      <div className="absolute top-2.5 right-2.5 bg-black/60 backdrop-blur-md text-yellow-400 text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5 border border-white/20 shadow">
                        <span className="material-symbols-outlined text-sm">star</span>
                        <span>{item.rating}</span>
                      </div>
                    </div>

                    {/* Card Text Content */}
                    <div className="p-4 flex flex-col justify-between flex-1 gap-2">
                      <div>
                        <h3 className="font-extrabold text-base text-gray-900 group-hover:text-emerald-700 transition-colors leading-snug">
                          {item.title}
                        </h3>
                        {item.subtitle && (
                          <p className="text-[11px] font-semibold text-emerald-800 mt-0.5">
                            {item.subtitle}
                          </p>
                        )}
                        <p className="text-xs text-gray-600 line-clamp-2 mt-1.5 leading-relaxed">
                          {item.description}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-gray-100 space-y-1.5">
                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                          <span className="material-symbols-outlined text-sm text-emerald-600 shrink-0">location_on</span>
                          <span className="truncate font-medium">{item.address}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs pt-1">
                          <span className="font-bold text-emerald-900 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                            {item.priceRange}
                          </span>
                          <span className="text-xs font-bold text-emerald-700 group-hover:underline flex items-center gap-0.5">
                            <span>Details</span>
                            <span className="material-symbols-outlined text-sm">chevron_right</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center space-y-3 my-6">
                <span className="material-symbols-outlined text-4xl text-white/40">search_off</span>
                <p className="text-sm font-bold text-white">No matching results found</p>
                <p className="text-xs text-white/60">Please try searching with different keywords or select another category.</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedTag('all');
                  }}
                  className="px-4 py-2 bg-[#8bd6b6] text-[#002116] rounded-xl text-xs font-bold hover:bg-[#72c2a0] transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* ITEM DETAIL MODAL */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#002116] border border-white/20 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl text-white relative flex flex-col max-h-[90vh]">
            {/* Image Header */}
            <div className="relative h-56 sm:h-64 w-full shrink-0">
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#002116] via-[#002116]/30 to-transparent" />

              {/* Close Button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md border border-white/30 transition-all active:scale-95 cursor-pointer z-10"
                title="Close"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>

              <div className="absolute bottom-4 left-6 right-6">
                <span className="bg-[#8bd6b6] text-[#002116] text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full inline-block mb-1 shadow">
                  {selectedItem.tag}
                </span>
                <h2 className="text-2xl font-extrabold text-white leading-tight">
                  {selectedItem.title}
                </h2>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-4 text-sm">
              <p className="text-white/80 leading-relaxed">
                {selectedItem.description}
              </p>

              <div className="bg-white/10 rounded-2xl p-4 border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-xs text-emerald-300 font-bold">
                  <span className="material-symbols-outlined text-base">location_on</span>
                  <span>{selectedItem.address}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-white/90">
                  <span className="material-symbols-outlined text-base text-[#8bd6b6]">payments</span>
                  <span>Price / Fee: <strong>{selectedItem.priceRange}</strong></span>
                </div>
              </div>

              {selectedItem.nomadTip && (
                <div className="bg-[#8bd6b6]/10 border border-[#8bd6b6]/30 rounded-2xl p-4 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-[#8bd6b6] tracking-wider block">
                    💡 Nomad Tip from NomadNest:
                  </span>
                  <p className="text-xs text-white/90 italic">
                    "{selectedItem.nomadTip}"
                  </p>
                </div>
              )}

              <div className="pt-2 flex gap-3">
                <button
                  onClick={() => {
                    setSelectedItem(null);
                    if (onOpenMap) onOpenMap();
                  }}
                  className="w-full py-3.5 px-4 rounded-2xl bg-[#8bd6b6] hover:bg-[#72c2a0] text-[#002116] font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer shadow-lg"
                >
                  <span className="material-symbols-outlined text-lg">map</span>
                  <span>View on Map</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
