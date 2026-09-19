import React, { useState, useEffect } from 'react';

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

// Reusable Image component with subtle skeleton placeholder and fallback
interface ImageWithSkeletonProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  fallbackSrc?: string;
  iconFallback?: string;
}

export const ImageWithSkeleton: React.FC<ImageWithSkeletonProps> = ({
  src,
  alt,
  className = '',
  containerClassName = '',
  fallbackSrc = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1000&q=80',
  iconFallback = 'restaurant'
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [currentSrc, setCurrentSrc] = useState<string>(src);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    setCurrentSrc(src);
    setLoading(true);
    setHasError(false);
  }, [src]);

  const handleLoad = () => {
    setLoading(false);
  };

  const handleError = () => {
    if (!hasError && fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      setHasError(true);
    } else {
      setLoading(false);
      setHasError(true);
    }
  };

  return (
    <div className={`relative overflow-hidden bg-emerald-950/60 ${containerClassName}`}>
      {/* Subtle animated skeleton placeholder */}
      {loading && (
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-emerald-950/90 via-emerald-900/60 to-emerald-950/90 animate-pulse flex flex-col items-center justify-center gap-2">
          <span className="material-symbols-outlined text-emerald-400/40 text-2xl animate-pulse">
            {iconFallback}
          </span>
          <span className="text-[9px] font-bold text-emerald-300/40 uppercase tracking-widest">
            Loading...
          </span>
        </div>
      )}

      {/* Real image with object-fit: cover and referrerPolicy */}
      <img
        src={currentSrc}
        alt={alt}
        loading="lazy"
        referrerPolicy="no-referrer"
        onLoad={handleLoad}
        onError={handleError}
        className={`w-full h-full object-cover transition-all duration-500 ${
          loading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
        } ${className}`}
      />
    </div>
  );
};

export const MOCK_GUIDE_ITEMS: GuideItem[] = [
  // 1. Mì Quảng Bà Mua (Quang-style Noodles)
  {
    id: 'food-1',
    category: 'food',
    tag: 'Quang Noodles',
    title: 'Mì Quảng Bà Mua (Quang-style Noodles)',
    subtitle: 'Signature Central Vietnam Turmeric Noodle Dish',
    description: 'A legendary Da Nang staple featuring chewy turmeric-infused noodles in a rich, slow-simmered savory broth with tender chicken, shrimp, and quail eggs. Served alongside crisp Tra Que fresh herbs, toasted peanuts, and crunchy toasted sesame rice crackers.',
    image: 'https://www.taidanang.com/wp-content/uploads/2017/11/mi-quang-ba-mua-2.jpg',
    address: '19 Tran Binh Trong, Hai Chau Dist, Da Nang',
    priceRange: '35,000 - 65,000 VND ($1.50 - $2.70 USD)',
    rating: '4.8',
    nomadTip: 'Order an extra crispy sesame rice cracker (bánh tráng mè) and ask for iced green tea. Fast Wi-Fi available.'
  },

  // 2. Bánh Tráng Cuốn Thịt Heo Đại Lộc (Pork Rice Paper Rolls)
  {
    id: 'food-2',
    category: 'food',
    tag: 'Pork Rice Rolls',
    title: 'Bánh Tráng Cuốn Thịt Heo Đại Lộc (Pork Rice Paper Rolls)',
    subtitle: 'Two-Tone Pork Belly Rolls with Fermented Anchovy Dip',
    description: 'Thinly sliced boiled pork belly with distinct double layers of tender fat and lean meat, wrapped in sun-dried Dai Loc rice paper with green bananas, crisp cucumbers, and over 10 wild herbs, dipped in aromatic fermented anchovy sauce (mắm nêm).',
    image: 'https://mms.img.susercontent.com/vn-11134513-7r98o-lsu3omx8ah1gd1@resize_ss1242x600!@crop_w1242_h600_cT',
    address: '124 Huynh Thuc Khang, Hai Chau Dist, Da Nang',
    priceRange: '50,000 - 90,000 VND ($2.00 - $3.70 USD)',
    rating: '4.9',
    nomadTip: 'Spacious air-conditioned dining area with reliable 80Mbps Wi-Fi—ideal for a relaxing lunch after morning focus sessions.'
  },

  // 3. Gỏi Cá Nam Ô (Nam O Raw Fish Salad)
  {
    id: 'food-3',
    category: 'food',
    tag: 'Village Specialty',
    title: 'Gỏi Cá Nam Ô (Nam O Raw Fish Salad)',
    subtitle: '700-Year-Old Coastal Fisherman Heritage Specialty',
    description: 'Freshly landed morning coastal herring filleted and cured with galangal, spicy chili, and golden roasted corn-rice meal, bundled with wild mountain herbs in tender rice paper, accompanied by a decadent roasted sesame-peanut dipping sauce.',
    image: 'https://static.vinwonders.com/2023/01/goi-ca-nam-o-thump.jpg',
    address: 'Nguyen Luong Bang St, Nam O Craft Village, Lien Chieu Dist, Da Nang',
    priceRange: '60,000 - 120,000 VND ($2.50 - $5.00 USD)',
    rating: '4.9',
    nomadTip: 'Try both styles: "Gỏi khô" (dry tossed with roasted rice meal) and "Gỏi ướt" (steeped in savory spiced broth).'
  },

  // 4. Bún Chả Cá Hờn (Da Nang Fish Cake Noodle Soup)
  {
    id: 'food-4',
    category: 'food',
    tag: 'Fish Cake Noodles',
    title: 'Bún Chả Cá Hờn (Da Nang Fish Cake Noodle Soup)',
    subtitle: 'Steamed & Fried Fish Patties in Naturally Sweet Broth',
    description: 'A naturally sweet, ocean-fragrant broth simmered with fresh marlin bone, sweet pineapple, tomato, and cooling pumpkin, served over fresh rice vermicelli with crisp fried and steamed mackerel patties, bamboo shoots, and shallot pickles.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRR4csYUKCGr4yzUx5lLxTfTWdWz2PSkfezm79XuxDzBK5fdynmgoQwAXkb&s=10',
    address: '113/3 Nguyen Chi Thanh, Hai Chau Dist, Da Nang',
    priceRange: '30,000 - 55,000 VND ($1.20 - $2.30 USD)',
    rating: '4.7',
    nomadTip: 'Opens early at 6:00 AM—an energizing, healthy breakfast spot for early-rising digital nomads before morning deep-work.'
  },

  // 5. Bánh Xèo Bà Dưỡng (Crispy Vietnamese Sizzling Crepe)
  {
    id: 'food-5',
    category: 'food',
    tag: 'Sizzling Crepes',
    title: 'Bánh Xèo Bà Dưỡng (Crispy Vietnamese Sizzling Crepe)',
    subtitle: 'Legendary Hidden Alleyway Sizzling Crepes & Pork Skewers',
    description: 'Crispy golden-yellow rice-flour crepes packed with sea shrimp, pork belly, and tender bean sprouts, wrapped with mustard greens and rice paper, served with charcoal-grilled lemongrass pork skewers (nem lụi) and a warm creamy liver-peanut dip.',
    image: 'https://prod-pics.guide.michelin.com/api/public/content/4a6360958af84e40a16e3c4b1c6fdc25.jpeg?w=300&h=300&format=webp&org_if_sml=1',
    address: 'K280/23 Hoang Dieu, Hai Chau Dist, Da Nang',
    priceRange: '40,000 - 80,000 VND ($1.60 - $3.30 USD)',
    rating: '4.8',
    nomadTip: 'Michelin-selected alley eatery; visit between 2:00 PM – 4:30 PM to avoid dinner rush queues.'
  },

  // 6. Cao Lầu Đà Nẵng (Cao Lau Noodles)
  {
    id: 'food-6',
    category: 'food',
    tag: 'Noodle Heritage',
    title: 'Cao Lầu Đà Nẵng (Cao Lau Noodles)',
    subtitle: 'Wood-Ash Infused Heritage Noodles with Char Siu Pork',
    description: 'Thick, artisanal noodles kneaded with mineral water and local melaleuca wood ash, topped with fragrant five-spice char siu pork, crispy squared rice cracklings, baby mustard greens, and a concentrated pork braising glaze.',
    image: 'https://static.vinwonders.com/2023/01/Cao-lau-da-nang-banner.jpg',
    address: '267 Thai Thi Buoi, Thanh Khe Dist, Da Nang',
    priceRange: '35,000 - 60,000 VND ($1.40 - $2.50 USD)',
    rating: '4.7',
    nomadTip: 'A historic regional dish combining Cham, Vietnamese, and trade-era culinary influences with incredible texture.'
  },

  // HERITAGE GUIDE ITEMS
  {
    id: 'heritage-1',
    category: 'heritage',
    tag: 'National Heritage',
    title: 'Marble Mountains (Ngũ Hành Sơn)',
    subtitle: 'Sacred 5 Element Peaks & Cave Temples',
    description: 'A breathtaking cluster of five limestone and marble peaks named after cosmic elements (Metal, Wood, Water, Fire, Earth). Houses mystical illuminated caverns like Huyen Khong Cave and ancient cliffside pagodas.',
    image: 'https://images.vietnamtourism.gov.vn/vn/images/2022/ngu_hanh_son_da_nang_369258062.jpg',
    address: '81 Huyen Tran Cong Chua, Ngu Hanh Son Dist, Da Nang',
    priceRange: '40,000 VND / ticket (~$1.60 USD)',
    rating: '4.9',
    nomadTip: 'Take the panoramic glass elevator on Water Mountain for 360-degree ocean views.'
  },
  {
    id: 'heritage-2',
    category: 'heritage',
    tag: 'Living Craft Heritage',
    title: 'Nam O Village (Nam Ô)',
    subtitle: '700-Year Ancient Coastal Fish Sauce Heritage',
    description: 'A timeless 700-year-old coastal fishing village sheltered beneath Hai Van Pass. Master artisans handcraft pure anchovy fish sauce in weathered wooden vats, preserving ancestral fermentation secrets across centuries.',
    image: 'https://vietnamland.vn/wp-content/uploads/2024/06/du-an-nam-o-heritage-da-nang.jpg',
    address: 'Nam O Village, Hoa Hiep Nam, Lien Chieu Dist, Da Nang',
    priceRange: 'Free admission',
    rating: '5.0',
    nomadTip: 'Join hands-on fermentation workshops with local NomadNest artisans and explore ancient reef trails.'
  },
  {
    id: 'heritage-3',
    category: 'heritage',
    tag: 'Historical Museum',
    title: 'Museum of Cham Sculpture (Bảo tàng Điêu khắc Chăm)',
    subtitle: 'World-Renowned Champa Art & Sculpture Collection',
    description: 'Home to the world’s largest collection of Cham architectural sculptures and sacred sandstone relics. Built in 1915, this antique building uniquely blends French colonial elegance with ancient Cham motifs.',
    image: 'https://hn.ss.bfcplatform.vn/tckt/2025/03/25A02018-2.jpg',
    address: '02 2nd of September St, Hai Chau Dist, Da Nang',
    priceRange: '60,000 VND / ticket (~$2.40 USD)',
    rating: '4.8',
    nomadTip: 'A peaceful, contemplative haven to explore centuries of ancient Champa art, history, and sacred iconography.'
  },
  {
    id: 'heritage-4',
    category: 'heritage',
    tag: 'Ancient Craft Village',
    title: 'Non Nuoc Stone Carving Village (Làng đá Non Nước)',
    subtitle: '400-Year Stone Sculpture Craft Legacy',
    description: 'Nestled at the foot of Marble Mountains, hundreds of master stone sculptors craft exquisite statues, Buddhist relics, and fine artistic ornaments exported across the globe.',
    image: 'https://namthientravel.com.vn/wp-content/uploads/2025/08/Lang-Nghe-Da-My-Nghe-Non-Nuoc-O-Dau.webp',
    address: 'Foot of Marble Mountains, Hoa Hai, Ngu Hanh Son Dist, Da Nang',
    priceRange: 'Free admission',
    rating: '4.7',
    nomadTip: 'Pick up finely crafted miniature marble souvenirs and observe live chisel sculpting in family workshops.'
  },
  {
    id: 'heritage-5',
    category: 'heritage',
    tag: 'Spiritual & Scenic',
    title: 'Linh Ung Pagoda (Chùa Linh Ứng)',
    subtitle: '67m Majestic Guanyin Statue Overlooking the Bay',
    description: 'The grandest spiritual sanctuary in Da Nang perched on the lush Son Tra Peninsula. The towering 67-meter Lady Buddha statue stands proudly against the mountainside overlooking the boundless East Sea.',
    image: 'https://danangfantasticity.com/wp-content/uploads/2019/09/chua-linh-ung-chon-binh-yen-giua-long-da-nang-013-2.jpg',
    address: 'Son Tra Peninsula, Son Tra Dist, Da Nang',
    priceRange: 'Free admission',
    rating: '4.9',
    nomadTip: 'Visit around 4:00 PM to catch the breathtaking golden sunset and ocean panorama over Da Nang Bay.'
  },
  {
    id: 'heritage-6',
    category: 'heritage',
    tag: 'Urban Landmark',
    title: 'Love Lock Bridge (Cầu Tình Yêu)',
    subtitle: 'Romantic Riverside Promenade on the Han River',
    description: 'A scenic European-inspired pedestrian pier extending over the Han River, decorated with radiant heart-shaped lantern trees where couples and visitors leave engraved padlocks, steps away from the Dragon Bridge.',
    image: 'https://ik.imagekit.io/tvlk/blog/2023/08/cau-tinh-yeu-da-nang-9.jpg?tr=q-70,c-at_max,w-1000,h-600',
    address: 'East Bank of Han River, Tran Hung Dao St, Son Tra Dist, Da Nang',
    priceRange: 'Free',
    rating: '4.8',
    nomadTip: 'Spectacular night view of illuminated city skylines, riverside coffee spots, and weekend Dragon Bridge shows.'
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
              {/* CARD 1: FOOD GUIDE with real-life photo banner */}
              <div
                onClick={() => handleSelectCategoryCard('food')}
                className="relative h-72 sm:h-80 rounded-[24px] overflow-hidden shadow-2xl border border-white/20 group cursor-pointer transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-[0_20px_50px_rgba(139,214,182,0.25)] hover:border-[#8bd6b6] active:scale-[0.98]"
                style={{ cursor: 'pointer' }}
              >
                {/* Background Image with skeleton loader and object-fit: cover */}
                <ImageWithSkeleton
                  src="https://diff.vn/wp-content/uploads/2025/03/trai-nghiem-dem-tai-da-nang-1-1.jpg"
                  alt="Da Nang Food Guide & Night Life"
                  containerClassName="absolute inset-0 w-full h-full"
                  className="group-hover:scale-110 transition-transform duration-700 ease-out"
                  fallbackSrc="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1000&q=80"
                  iconFallback="restaurant"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/20 group-hover:via-black/35 transition-all pointer-events-none" />

                {/* Card Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between text-white z-10 pointer-events-none">
                  <div className="flex justify-between items-start">
                    <span className="px-3.5 py-1.5 rounded-full bg-[#8bd6b6]/95 backdrop-blur-md text-[#002116] text-xs font-black uppercase tracking-wider shadow-lg">
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
                      Explore Authentic Da Nang Cuisine
                    </p>
                    <p className="text-xs text-white/85 line-clamp-2 leading-relaxed">
                      From savory Mì Quảng Bà Mua and Đại Lộc pork rolls to legendary Bánh Xèo Bà Dưỡng and 700-year-old Nam Ô fish salad.
                    </p>
                    <div className="pt-2 flex items-center text-xs font-bold text-[#8bd6b6] group-hover:underline gap-1">
                      <span>View all 6 dishes</span>
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
                {/* Background Image with skeleton loader and object-fit: cover */}
                <ImageWithSkeleton
                  src="https://images.vietnamtourism.gov.vn/vn/images/2022/ngu_hanh_son_da_nang_369258062.jpg"
                  alt="Da Nang Heritage & Craft Villages"
                  containerClassName="absolute inset-0 w-full h-full"
                  className="group-hover:scale-110 transition-transform duration-700 ease-out"
                  fallbackSrc="https://images.vietnamtourism.gov.vn/vn/images/2022/ngu_hanh_son_da_nang_369258062.jpg"
                  iconFallback="castle"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/20 group-hover:via-black/35 transition-all pointer-events-none" />

                {/* Card Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between text-white z-10 pointer-events-none">
                  <div className="flex justify-between items-start">
                    <span className="px-3.5 py-1.5 rounded-full bg-[#8bd6b6]/95 backdrop-blur-md text-[#002116] text-xs font-black uppercase tracking-wider shadow-lg">
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
                    <p className="text-xs text-white/85 line-clamp-2 leading-relaxed">
                      Discover the Marble Mountains, 700-year Nam O Fish Sauce Village, Cham Museum, and sacred cultural shrines.
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

            {/* FOOD GUIDE COVER BANNER (Displayed prominently when viewing Food Guide) */}
            {selectedCategory === 'food' && (
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/20 group">
                <div className="h-48 sm:h-56 w-full relative overflow-hidden">
                  <ImageWithSkeleton
                    src="https://diff.vn/wp-content/uploads/2025/03/trai-nghiem-dem-tai-da-nang-1-1.jpg"
                    alt="Food Guide Cover - Da Nang Culinary Nightlife"
                    containerClassName="w-full h-full"
                    className="group-hover:scale-105 transition-transform duration-700 ease-out"
                    fallbackSrc="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1000&q=80"
                    iconFallback="restaurant"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#002116] via-[#002116]/50 to-transparent pointer-events-none" />
                  
                  <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-6 text-white z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="bg-[#8bd6b6] text-[#002116] text-[10px] font-extrabold uppercase tracking-wider px-3 py-0.5 rounded-full shadow">
                          Food Guide Cover
                        </span>
                        <span className="text-xs text-emerald-200 font-bold flex items-center gap-1">
                          <span className="material-symbols-outlined text-sm text-yellow-400">local_fire_department</span>
                          Da Nang Culinary Classics
                        </span>
                      </div>
                      <h2 className="text-xl sm:text-2xl font-black text-white drop-shadow">
                        Da Nang Food & Gastronomy Guide
                      </h2>
                      <p className="text-xs text-white/85 max-w-xl line-clamp-2 mt-0.5 leading-relaxed">
                        Curated real-life specialties: savory Mì Quảng, Đại Lộc pork rolls, Nam Ô raw fish salad, fresh fish cake noodle soup, and sizzling crepes.
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/20 text-xs font-bold text-emerald-300 self-start sm:self-auto shrink-0 shadow">
                      <span className="material-symbols-outlined text-sm text-emerald-400">verified</span>
                      <span>100% Real-Life Photography</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* HERITAGE GUIDE COVER BANNER (Displayed prominently when viewing Heritage Guide) */}
            {selectedCategory === 'heritage' && (
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/20 group">
                <div className="h-48 sm:h-56 w-full relative overflow-hidden">
                  <ImageWithSkeleton
                    src="https://images.vietnamtourism.gov.vn/vn/images/2022/ngu_hanh_son_da_nang_369258062.jpg"
                    alt="Heritage Guide Cover - Marble Mountains & Craft Villages"
                    containerClassName="w-full h-full"
                    className="group-hover:scale-105 transition-transform duration-700 ease-out"
                    fallbackSrc="https://images.vietnamtourism.gov.vn/vn/images/2022/ngu_hanh_son_da_nang_369258062.jpg"
                    iconFallback="castle"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#002116] via-[#002116]/50 to-transparent pointer-events-none" />
                  
                  <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-6 text-white z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="bg-[#8bd6b6] text-[#002116] text-[10px] font-extrabold uppercase tracking-wider px-3 py-0.5 rounded-full shadow">
                          Heritage Guide Cover
                        </span>
                        <span className="text-xs text-emerald-200 font-bold flex items-center gap-1">
                          <span className="material-symbols-outlined text-sm text-yellow-400">temple_buddhist</span>
                          6 Historic Landmarks & Craft Enclaves
                        </span>
                      </div>
                      <h2 className="text-xl sm:text-2xl font-black text-white drop-shadow">
                        Da Nang Heritage & Craft Village Guide
                      </h2>
                      <p className="text-xs text-white/85 max-w-xl line-clamp-2 mt-0.5 leading-relaxed">
                        Authentic landmarks: sacred Marble Mountains, 700-year Nam O Village, Cham Sculpture Museum, Non Nuoc marble carving, Linh Ung Pagoda, and Love Lock Bridge.
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/20 text-xs font-bold text-emerald-300 self-start sm:self-auto shrink-0 shadow">
                      <span className="material-symbols-outlined text-sm text-emerald-400">verified</span>
                      <span>100% Real-Life Photography</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

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
                      ? 'Search Mì Quảng, Bánh Xèo, Gỏi Cá, noodles, rolls, seafood...'
                      : 'Search Marble Mountains, Nam Ô Village, Cham Museum...'
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
                    {tag === 'all' ? (selectedCategory === 'food' ? 'All Dishes' : 'All Destinations') : tag}
                  </button>
                ))}
              </div>
            </div>

            {/* CATALOG GRID (1 col mobile, 2 sm, 3 md, 3 lg) */}
            {filteredItems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 pt-2">
                {filteredItems.map(item => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className="bg-white rounded-2xl overflow-hidden shadow-xl flex flex-col border border-gray-100 group cursor-pointer transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-2xl hover:border-[#8bd6b6] active:scale-[0.98] text-gray-900"
                    style={{ cursor: 'pointer' }}
                  >
                    {/* Thumbnail Image with skeleton loading and proper aspect ratio */}
                    <div className="aspect-[16/10] sm:aspect-[4/3] w-full overflow-hidden relative shrink-0 bg-emerald-950/40">
                      <ImageWithSkeleton
                        src={item.image}
                        alt={item.title}
                        containerClassName="w-full h-full"
                        className="group-hover:scale-108 transition-transform duration-500"
                        fallbackSrc="https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80"
                        iconFallback={item.category === 'food' ? 'restaurant' : 'castle'}
                      />
                      <div className="absolute top-2.5 left-2.5 bg-[#002116]/85 backdrop-blur-md text-[#8bd6b6] text-[10px] font-extrabold px-2.5 py-1 rounded-full border border-white/20 shadow z-10">
                        {item.tag}
                      </div>
                      <div className="absolute top-2.5 right-2.5 bg-black/70 backdrop-blur-md text-yellow-400 text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5 border border-white/20 shadow z-10">
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
                <p className="text-sm font-bold text-white">
                  No matching {selectedCategory === 'food' ? 'dishes' : 'destinations'} or spots found
                </p>
                <p className="text-xs text-white/60">
                  Please try searching with different keywords or clear your active filters.
                </p>
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
            {/* Image Header with skeleton and object-fit: cover */}
            <div className="relative h-60 sm:h-72 w-full shrink-0 overflow-hidden bg-black/40">
              <ImageWithSkeleton
                src={selectedItem.image}
                alt={selectedItem.title}
                containerClassName="w-full h-full"
                fallbackSrc="https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80"
                iconFallback={selectedItem.category === 'food' ? 'restaurant' : 'castle'}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#002116] via-[#002116]/40 to-transparent pointer-events-none" />

              {/* Close Button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-md border border-white/30 transition-all active:scale-95 cursor-pointer z-20"
                title="Close"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>

              <div className="absolute bottom-4 left-6 right-6 z-10">
                <span className="bg-[#8bd6b6] text-[#002116] text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full inline-block mb-1 shadow">
                  {selectedItem.tag}
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white leading-tight">
                  {selectedItem.title}
                </h2>
                {selectedItem.subtitle && (
                  <p className="text-xs font-semibold text-emerald-300 mt-0.5">
                    {selectedItem.subtitle}
                  </p>
                )}
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-4 text-sm">
              <p className="text-white/85 leading-relaxed">
                {selectedItem.description}
              </p>

              <div className="bg-white/10 rounded-2xl p-4 border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-xs text-emerald-300 font-bold">
                  <span className="material-symbols-outlined text-base shrink-0">location_on</span>
                  <span>{selectedItem.address}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-white/90">
                  <span className="material-symbols-outlined text-base text-[#8bd6b6] shrink-0">payments</span>
                  <span>Price Range: <strong className="text-emerald-200">{selectedItem.priceRange}</strong></span>
                </div>
              </div>

              {selectedItem.nomadTip && (
                <div className="bg-[#8bd6b6]/15 border border-[#8bd6b6]/30 rounded-2xl p-4 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-[#8bd6b6] tracking-wider block flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">tips_and_updates</span>
                    <span>Nomad Tip from NomadNest:</span>
                  </span>
                  <p className="text-xs text-white/95 italic leading-relaxed">
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
