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
    tag: 'Đặc sản Đà Nẵng',
    title: 'Mì Quảng Ếch & Gà Bà Mua',
    subtitle: 'Thương hiệu Mì Quảng truyền thống',
    description: 'Tô mì Quảng vàng ươm chuẩn vị với nước dùng đậm đà ninh từ xương, thịt gà thả vườn hoặc thịt ếch đồng thơm ngon, ăn kèm rau sống Trà Quế tươi giòn & bánh tráng nướng vừng.',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80',
    address: '19 Trần Bình Trọng, Q. Hải Châu, Đà Nẵng',
    priceRange: '35.000 - 65.000 VNĐ',
    rating: '4.8',
    nomadTip: 'Nên gọi thêm đĩa bánh tráng nướng giòn và gọi nước chè xanh mát lạnh béo thơm.'
  },
  {
    id: 'food-2',
    category: 'food',
    tag: 'Món cuốn',
    title: 'Bánh Tráng Cuốn Thịt Heo Đại Lộc',
    subtitle: 'Đặc sản mắm nêm đậm đà',
    description: 'Thịt heo hai đầu da luộc chín tới mỏng mềm, cuốn cùng bánh tráng phơi sương Đại Lộc và đĩa rau sống tươi ngon hơn 10 loại lá rừng, chấm bát mắm nêm chưng thơm nức.',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    address: '124 Huỳnh Thúc Kháng, Q. Hải Châu, Đà Nẵng',
    priceRange: '50.000 - 90.000 VNĐ',
    rating: '4.9',
    nomadTip: 'Có chỗ ngồi điều hòa thoáng mát, Wi-Fi 80Mbps thích hợp dùng bữa trưa sau giờ làm việc.'
  },
  {
    id: 'food-3',
    category: 'food',
    tag: 'Đặc sản làng nghề',
    title: 'Gỏi Cá Nam Ô Ốc Sinh',
    subtitle: 'Đặc sản làng chài cổ Nam Ô',
    description: 'Món gỏi cá trích tươi vừa đánh bắt từ biển Nam Ô, trộn riềng ớt thính nếp thơm cay tròn vị, cuốn lá mưng, lá đinh lăng rừng và chấm nước xốt mè đậu xịn xò.',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80',
    address: 'Đường Nguyễn Lương Bằng, Làng Nam Ô, Q. Liên Chiểu',
    priceRange: '60.000 - 120.000 VNĐ',
    rating: '4.9',
    nomadTip: 'Nên thử cả 2 loại: Gỏi cá khô (trộn thính nếp) và Gỏi cá ướt (đậm đà nước xốt).'
  },
  {
    id: 'food-4',
    category: 'food',
    tag: 'Món nước',
    title: 'Bún Chả Cá Hòn',
    subtitle: 'Nước dùng bí đỏ béo thanh',
    description: 'Nước dùng ngọt thanh đậm vị biển nấu từ xương cá cờ tươi và bí đỏ thanh mát, tô bún chất lượng với chả cá thu chiên giòn, chả cá hấp dai ngon.',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80',
    address: '113/3 Nguyễn Chí Thanh, Q. Hải Châu, Đà Nẵng',
    priceRange: '30.000 - 55.000 VNĐ',
    rating: '4.7',
    nomadTip: 'Quán mở cửa từ 6h00 sáng, món ăn sáng giàu năng lượng cho Digital Nomads.'
  },
  {
    id: 'food-5',
    category: 'food',
    tag: 'Ăn vặt',
    title: 'Bánh Xèo & Nem Lụi Bà Dưỡng',
    subtitle: 'Ẩm thực hẻm nổi tiếng nhất Đà Nẵng',
    description: 'Bánh xèo vỏ giòn rụm màu nghệ tươi, nhân tôm đất & thịt bò mềm, nem lụi nướng than hoa thơm nức chấm nước xốt gan xay đặc chế béo ngậy.',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80',
    address: 'K280/23 Hoàng Diệu, Q. Hải Châu, Đà Nẵng',
    priceRange: '40.000 - 80.000 VNĐ',
    rating: '4.8',
    nomadTip: 'Quán trong hẻm nhưng rất rộng rãi, đông khách nhất lúc 17h00 - 19h00.'
  },
  {
    id: 'food-6',
    category: 'food',
    tag: 'Món nước',
    title: 'Cao Lầu Phố Cổ & Đà Nẵng',
    subtitle: 'Hương vị di sản Quảng Nam',
    description: 'Sợi cao lầu màu tro dai giòn đặc trưng, thịt xá xíu thái lát đậm đà, da heo chiên phồng giòn rụm cùng nước xốt rim xá xíu thơm lừng.',
    image: 'https://images.unsplash.com/photo-1617093727343-374698b1b08d?auto=format&fit=crop&w=800&q=80',
    address: '267 Thái Thị Bưởi, Q. Thanh Khê, Đà Nẵng',
    priceRange: '35.000 - 60.000 VNĐ',
    rating: '4.7',
    nomadTip: 'Sợi cao lầu làm theo công thức ngâm tro củi tràm truyền thống.'
  },

  // HERITAGE GUIDE ITEMS
  {
    id: 'heritage-1',
    category: 'heritage',
    tag: 'Di sản quốc gia',
    title: 'Danh Thắng Ngũ Hành Sơn',
    subtitle: 'Marble Mountains Da Nang',
    description: 'Quần thể 5 ngọn núi đá vôi kỳ vĩ mang tên Kim - Mộc - Thủy - Hỏa - Thổ, sở hữu các hang động thạch nhũ lung linh như Động Huyền Không, Động Tàng Chơn cùng chùa Linh Ứng Kim Sơn.',
    image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=800&q=80',
    address: '81 Huyền Trân Công Chúa, Q. Ngũ Hành Sơn, Đà Nẵng',
    priceRange: '40.000 VNĐ / vé',
    rating: '4.9',
    nomadTip: 'Có ngọn Thủy Sơn trang bị thang máy ngắm cảnh 360 độ ngắm trọn bờ biển Sơn Thủy.'
  },
  {
    id: 'heritage-2',
    category: 'heritage',
    tag: 'Làng nghề cổ',
    title: 'Làng Nước Mắm Nam Ô (700 Năm)',
    subtitle: 'Di sản văn hóa phi vật thể quốc gia',
    description: 'Làng chài lâu đời nằm dưới chân đèo Hải Vân. Nơi sản xuất ra dòng nước mắm cá trích nguyên chất làm thủ công trong chum gỗ ngả màu thời gian.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    address: 'Làng Nam Ô, P. Hòa Hiệp Nam, Q. Liên Chiểu, Đà Nẵng',
    priceRange: 'Miễn phí tham quan',
    rating: '5.0',
    nomadTip: 'Tham gia tour workshop ủ mắm cùng các nghệ nhân bản địa NomadNest.'
  },
  {
    id: 'heritage-3',
    category: 'heritage',
    tag: 'Bảo tàng lịch sử',
    title: 'Bảo Tàng Điêu Khắc Chăm Đà Nẵng',
    subtitle: 'Bảo tàng nghệ thuật Champa',
    description: 'Bảo tàng trưng bày bộ sưu tập hiện vật điêu khắc tháp Chăm quy mô nhất thế giới. Tòa nhà cổ kính xây dựng từ năm 1915 mang đậm dấu ấn kiến trúc Pháp pha nét Chăm cổ.',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    address: '02 Đường 2 Tháng 9, Q. Hải Châu, Đà Nẵng',
    priceRange: '60.000 VNĐ / vé',
    rating: '4.8',
    nomadTip: 'Không gian yên tĩnh lý tưởng để tìm hiểu lịch sử văn hóa Champa.'
  },
  {
    id: 'heritage-4',
    category: 'heritage',
    tag: 'Làng nghề cổ',
    title: 'Làng Đá Mỹ Nghệ Non Nước',
    subtitle: 'Di sản điêu khắc đá 400 năm',
    description: 'Làng nghề nằm ngay chân núi Ngũ Hành Sơn. Hàng trăm cơ sở chế tác đá nghệ thuật từ tượng Phật, con giống đến các tác phẩm điêu khắc tinh xảo xuất khẩu toàn cầu.',
    image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80',
    address: 'Chân núi Ngũ Hành Sơn, P. Hòa Hải, Q. Ngũ Hành Sơn',
    priceRange: 'Miễn phí vào làng',
    rating: '4.7',
    nomadTip: 'Bạn có thể mua các món đồ lưu niệm bằng đá cẩm thạch nhỏ xinh mang về.'
  },
  {
    id: 'heritage-5',
    category: 'heritage',
    tag: 'Danh thắng thiên nhiên',
    title: 'Chùa Linh Ứng Bãi Bụt - Sơn Trà',
    subtitle: 'Tượng Phật Bà Quan Thế Âm 67m',
    description: 'Ngôi chùa lớn nhất Đà Nẵng tọa lạc trên bán đảo Sơn Trà. Tượng Phật Bà đứng tựa lưng vào núi, hướng mặt ra biển Đông bao la với phong cảnh sơn thủy hữu tình.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    address: 'Bán đảo Sơn Trà, Q. Sơn Trà, Đà Nẵng',
    priceRange: 'Miễn phí',
    rating: '4.9',
    nomadTip: 'Nên đi vào khoảng 16h00 chiều để ngắm hoàng hôn buông xuống vịnh Đà Nẵng.'
  },
  {
    id: 'heritage-6',
    category: 'heritage',
    tag: 'Danh thắng thành phố',
    title: 'Cầu Rồng & Cầu Tình Yêu Đà Nẵng',
    subtitle: 'Biểu tượng hiện đại bên sông Hàn',
    description: 'Cầu Rồng phun lửa & phun nước rực rỡ vào 21h00 các tối Thứ 7 và Chủ Nhật hàng tuần. Ngay cạnh đó là cầu Tình Yêu rực rỡ tượng đèn lồng trái tim.',
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80',
    address: 'Bờ đông sông Hàn, Đường Trần Hưng Đạo, Q. Sơn Trà',
    priceRange: 'Miễn phí',
    rating: '4.8',
    nomadTip: 'Đến trước 20h30 để chọn được góc đứng chụp ảnh phun lửa đẹp nhất trên cầu.'
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
          title="Quay lại"
        >
          <span className="material-symbols-outlined text-xl">arrow_back</span>
        </button>

        <div className="text-center">
          <h1 className="font-extrabold text-base text-white tracking-wide">
            {activeView === 'category'
              ? 'Local Guide Đà Nẵng'
              : selectedCategory === 'food'
              ? 'Food Guide - Ẩm Thực'
              : 'Heritage Guide - Di Sản'}
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
                Khám phá bản địa
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                Discover Da Nang through Food & Heritage
              </h2>
              <p className="text-xs sm:text-sm text-white/70 mt-2 max-w-2xl leading-relaxed">
                Trải nghiệm trọn vẹn tinh hoa Đà Nẵng cùng NomadNest. Lựa chọn danh mục dưới đây để xem các món ăn đặc sản truyền thống hoặc các di sản văn hóa lịch sử lâu đời.
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
                      Khám phá đặc sản Đà Nẵng
                    </p>
                    <p className="text-xs text-white/80 line-clamp-2 leading-relaxed">
                      Từ Mì Quảng đậm đà, Bánh tráng cuốn thịt heo Đại Lộc đến Gỏi cá Nam Ô danh tiếng 700 năm.
                    </p>
                    <div className="pt-2 flex items-center text-xs font-bold text-[#8bd6b6] group-hover:underline gap-1">
                      <span>Xem danh sách món ăn</span>
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
                      Di sản & Điểm tham quan
                    </p>
                    <p className="text-xs text-white/80 line-clamp-2 leading-relaxed">
                      Khám phá di sản Ngũ Hành Sơn, Làng Nước Mắm Nam Ô, Bảo tàng Chăm & các thắng cảnh nổi tiếng.
                    </p>
                    <div className="pt-2 flex items-center text-xs font-bold text-[#8bd6b6] group-hover:underline gap-1">
                      <span>Xem danh sách điểm đến</span>
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
                <span>Food Guide (Ẩm thực)</span>
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
                <span>Heritage Guide (Di sản)</span>
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
                      ? 'Tìm món ăn đặc sản, mắm nêm, mì quảng...'
                      : 'Tìm di sản, làng nghề, danh thắng...'
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
                    {tag === 'all' ? 'Tất cả' : tag}
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
                            <span>Chi tiết</span>
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
                <p className="text-sm font-bold text-white">Không tìm thấy kết quả phù hợp</p>
                <p className="text-xs text-white/60">Vui lòng thử lại với từ khóa tìm kiếm khác hoặc chuyển danh mục.</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedTag('all');
                  }}
                  className="px-4 py-2 bg-[#8bd6b6] text-[#002116] rounded-xl text-xs font-bold hover:bg-[#72c2a0] transition-colors"
                >
                  Xóa bộ lọc
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
                  <span>Mức giá: <strong>{selectedItem.priceRange}</strong></span>
                </div>
              </div>

              {selectedItem.nomadTip && (
                <div className="bg-[#8bd6b6]/10 border border-[#8bd6b6]/30 rounded-2xl p-4 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-[#8bd6b6] tracking-wider block">
                    💡 Nomad Tip từ NomadNest:
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
                  <span>Xem trên bản đồ địa điểm</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
