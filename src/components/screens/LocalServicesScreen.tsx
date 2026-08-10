import React, { useState } from 'react';

export interface ServiceItem {
  id: string;
  category: 'rental' | 'sup' | 'spa' | 'laundry' | 'coworking';
  tag?: string;
  badge?: string;
  title: string;
  provider: string;
  description: string;
  price: string;
  priceValue: number;
  unit: string;
  rating: string;
  reviewsCount: number;
  image: string;
  highlights: string[];
}

export const MOCK_SERVICES: ServiceItem[] = [
  {
    id: 'service-1',
    category: 'rental',
    badge: 'Phổ biến',
    tag: 'Thuê xe di chuyển',
    title: 'Thuê Xe Máy Tay Ga Honda AirBlade / Vision',
    provider: 'Da Nang Nomad Wheels',
    description: 'Giao nhận xe tận nơi tại homestay / làng nghề. Xe đời mới êm ái, đầy đủ 2 mũ bảo hiểm đạt chuẩn, 2 áo mưa & thay dầu định kỳ.',
    price: '150.000 VNĐ',
    priceValue: 150000,
    unit: 'ngày',
    rating: '4.9',
    reviewsCount: 128,
    image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80',
    highlights: ['Giao xe tận nơi miễn phí', 'Đầy đủ 2 nón bảo hiểm & áo mưa', 'Không cần thế chân tiền mặt']
  },
  {
    id: 'service-2',
    category: 'rental',
    tag: 'Thuê xe di chuyển',
    title: 'Thuê Xe Đạp Địa Hình & Touring Sơn Trà',
    provider: 'Green Bike Da Nang',
    description: 'Xe đạp thể thao cao cấp phù hợp đạp xe khám phá bán đảo Sơn Trà & Ngũ Hành Sơn. Bao gồm khóa an toàn & bộ dụng cụ sửa xe khẩn cấp.',
    price: '100.000 VNĐ',
    priceValue: 100000,
    unit: 'ngày',
    rating: '4.8',
    reviewsCount: 84,
    image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=800&q=80',
    highlights: ['Khung nhôm siêu nhẹ', 'Tặng kèm bản đồ cung đường đạp đẹp', 'Hỗ trợ đổi xe khẩn cấp']
  },
  {
    id: 'service-3',
    category: 'sup',
    badge: 'HOT 🔥',
    tag: 'Chèo SUP',
    title: 'Tour Chèo SUP Bình Minh Bãi Bụt Sơn Trà',
    provider: 'Da Nang Ocean SUP Club',
    description: 'Trải nghiệm ngắm bình minh rực rỡ trên biển Bãi Bụt Sơn Trà. Bao gồm ván SUP chất lượng cao, áo phao, hướng dẫn viên chuyên nghiệp & chụp ảnh GoPro miễn phí.',
    price: '250.000 VNĐ',
    priceValue: 250000,
    unit: 'người',
    rating: '5.0',
    reviewsCount: 210,
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
    highlights: ['Chụp ảnh GoPro chèo SUP miễn phí', 'Tặng 1 dừa tươi ngọt mát sau tour', 'HDV hướng dẫn chèo chi tiết']
  },
  {
    id: 'service-4',
    category: 'sup',
    badge: 'Khuyên dùng',
    tag: 'Chèo SUP',
    title: 'Chèo SUP Hoàng Hôn Ngắm Cầu Rồng Sông Hàn',
    provider: 'Han River SUP Experience',
    description: 'Thưởng ngoạn cảnh sông Hàn êm đềm khi hoàng hôn buông xuống, ngắm các cây cầu biểu tượng từ mặt nước lung linh.',
    price: '200.000 VNĐ',
    priceValue: 200000,
    unit: 'người',
    rating: '4.9',
    reviewsCount: 95,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    highlights: ['Khung giờ đẹp 16h30 - 18h30', 'An toàn với áo phao chuẩn ISO', 'Phù hợp người mới chèo lần đầu']
  },
  {
    id: 'service-5',
    category: 'spa',
    badge: 'Nomad Choice 💆',
    tag: 'Thư giãn & Spa',
    title: 'Massage Trị Liệu Cổ Vai Gáy Nomad Care (60 Phút)',
    provider: 'Lotus Herbal Spa Da Nang',
    description: 'Liệu trình massage bấm huyệt thảo dược chuyên sâu dành riêng cho Digital Nomads làm việc máy tính nhiều. Giảm căng cứng cổ vai gáy & phục hồi năng lượng.',
    price: '280.000 VNĐ',
    priceValue: 280000,
    unit: 'buổi (60 phút)',
    rating: '4.9',
    reviewsCount: 162,
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80',
    highlights: ['Chuyên viên tay nghề cao', 'Chườm gối thảo dược ấm', 'Tặng trà gừng & mứt gừng ấm áp']
  },
  {
    id: 'service-6',
    category: 'spa',
    tag: 'Thư giãn & Spa',
    title: 'Tắm Thảo Dược Người Dao Đỏ & Xông Hơi Đá Muối',
    provider: 'An Nhiên Wellness Center',
    description: 'Giải độc cơ thể với nước tắm thảo dược Dao Đỏ nấu tươi trong bồn pơ-mu thơm nức, kết hợp xông hơi đá muối Himalaya thư thái.',
    price: '320.000 VNĐ',
    priceValue: 320000,
    unit: 'lượt',
    rating: '4.8',
    reviewsCount: 76,
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    highlights: ['Bồn tắm gỗ Pơ-mu tự nhiên', 'Thảo dược chuẩn vùng cao', 'Thư giãn cơ bắp sau ngày dài']
  },
  {
    id: 'service-7',
    category: 'laundry',
    badge: 'Giao tận nơi 🚚',
    tag: 'Giặt ủi',
    title: 'Giặt Sấy Thơm Lấy Ngay & Giao Nhận Tận Phòng',
    provider: 'Nomad Clean Express Laundry',
    description: 'Dịch vụ giặt riêng theo từng phòng, nước giặt cao cấp không hại vải, sấy khô gấp gọn thơm nức. Nhận và giao lại tận phòng trong 4 giờ.',
    price: '25.000 VNĐ',
    priceValue: 25000,
    unit: 'kg',
    rating: '4.9',
    reviewsCount: 310,
    image: 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&w=800&q=80',
    highlights: ['Giặt riêng từng máy', 'Nước giặt Comfort dịu nhẹ', 'Giao nhận miễn phí tận phòng']
  },
  {
    id: 'service-8',
    category: 'coworking',
    badge: 'Tốc độ cao 🚀',
    tag: 'Co-working & SIM',
    title: 'Day Pass Co-Working Space Wi-Fi 200Mbps & Cold Brew',
    provider: 'NomadNest WorkHub Da Nang',
    description: 'Chỗ ngồi làm việc máy lạnh 24/7, ghế ergonomic êm ái, Internet cáp quang 200Mbps cực khỏe cho Video Call. Tặng kèm 1 ly Cold Brew thơm ngon.',
    price: '90.000 VNĐ',
    priceValue: 90000,
    unit: 'ngày',
    rating: '5.0',
    reviewsCount: 145,
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    highlights: ['Wi-Fi 200Mbps ổn định', 'Tặng 1 đồ uống tùy chọn', 'Ổ cắm điện riêng tại mỗi bàn']
  }
];

interface LocalServicesScreenProps {
  onBack: () => void;
  onOpenGrab?: () => void;
}

export const LocalServicesScreen: React.FC<LocalServicesScreenProps> = ({ onBack, onOpenGrab }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [bookingSuccessService, setBookingSuccessService] = useState<string | null>(null);

  // Filter items
  const filteredServices = MOCK_SERVICES.filter(service => {
    if (selectedCategory !== 'all' && service.category !== selectedCategory) {
      return false;
    }
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchTitle = service.title.toLowerCase().includes(q);
      const matchDesc = service.description.toLowerCase().includes(q);
      const matchTag = service.tag.toLowerCase().includes(q);
      const matchProvider = service.provider.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc && !matchTag && !matchProvider) return false;
    }
    return true;
  });

  const categories = [
    { id: 'all', label: 'Tất cả dịch vụ', icon: 'grid_view' },
    { id: 'rental', label: 'Thuê xe di chuyển', icon: 'two_wheeler' },
    { id: 'sup', label: 'Chèo SUP', icon: 'surfing' },
    { id: 'spa', label: 'Thư giãn & Spa', icon: 'spa' },
    { id: 'laundry', label: 'Giặt ủi tận nơi', icon: 'local_laundry_service' },
    { id: 'coworking', label: 'Co-working & SIM', icon: 'laptop_mac' }
  ];

  return (
    <div className="bg-gradient-to-b from-[#00281D] via-[#001D15] to-[#00120D] text-white min-h-screen pb-28 font-sans">
      {/* 1. TOP STICKY HEADER */}
      <header className="sticky top-0 z-50 bg-[#00281D]/95 backdrop-blur-xl flex items-center justify-between px-4 sm:px-6 h-16 border-b border-white/10 shadow-lg">
        <button
          onClick={onBack}
          type="button"
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer active:scale-95 shrink-0"
          title="Quay lại"
        >
          <span className="material-symbols-outlined text-xl">arrow_back</span>
        </button>

        <div className="text-center">
          <h1 className="font-extrabold text-base text-white tracking-wide">
            Trải Nghiệm & Dịch Vụ Địa Phương
          </h1>
          <p className="text-[10px] text-[#8bd6b6] font-semibold">Explore Local Services & Essentials</p>
        </div>

        <div className="w-10" />
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-5 space-y-6">
        {/* 2. GRAB QUICK LAUNCH BANNER */}
        {onOpenGrab && (
          <div className="bg-gradient-to-r from-[#00b14f]/20 via-emerald-900/40 to-teal-900/30 border border-[#00b14f]/40 rounded-3xl p-4 sm:p-5 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl relative overflow-hidden">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-[#00b14f] text-white flex items-center justify-center shrink-0 shadow-lg font-black text-xl tracking-tighter">
                Grab
              </div>
              <div>
                <span className="text-[10px] uppercase font-black text-[#00b14f] tracking-widest bg-[#00b14f]/20 px-2 py-0.5 rounded-full border border-[#00b14f]/30">
                  Đối Tác Di Chuyển & Đồ Ăn
                </span>
                <h2 className="text-base sm:text-lg font-extrabold text-white mt-0.5">
                  Cần gọi GrabCar, GrabBike hoặc Đồ ăn GrabFood?
                </h2>
                <p className="text-xs text-white/70">
                  Đặt xe máy, ô tô di chuyển nhanh & giao đồ ăn tận phòng làng nghề.
                </p>
              </div>
            </div>

            <button
              onClick={onOpenGrab}
              type="button"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#00b14f] hover:bg-[#009241] text-white font-extrabold text-xs transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2 shadow-lg shrink-0"
            >
              <span className="material-symbols-outlined text-lg">local_taxi</span>
              <span>Mở Grab Mini-App</span>
            </button>
          </div>
        )}

        {/* 3. SEARCH BAR & CATEGORY FILTERS */}
        <div className="space-y-3">
          {/* Compact Search Bar */}
          <div className="relative w-full">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-white/50 text-xl pointer-events-none">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm dịch vụ thuê xe máy, chèo SUP, giặt ủi, spa..."
              className="w-full bg-white/10 border border-white/20 focus:border-[#8bd6b6] rounded-2xl py-3 pl-11 pr-10 text-sm text-white placeholder:text-white/40 outline-none transition-all focus:ring-2 focus:ring-[#8bd6b6]/30"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white/20 text-white flex items-center justify-center text-xs hover:bg-white/40 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            )}
          </div>

          {/* Filter Pills */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
            {categories.map(cat => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#8bd6b6] text-[#002116] shadow-md font-extrabold'
                    : 'bg-white/10 text-white/80 hover:bg-white/20 border border-white/10'
                }`}
              >
                <span className="material-symbols-outlined text-base">{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 4. SERVICES GRID (2 Column Grid on tablet/desktop, 1 col mobile) */}
        {filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 pt-1">
            {filteredServices.map(service => (
              <div
                key={service.id}
                onClick={() => setSelectedService(service)}
                className="bg-white text-gray-900 rounded-3xl overflow-hidden shadow-xl flex flex-col border border-gray-100 group cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:border-[#8bd6b6] active:scale-[0.98]"
                style={{ cursor: 'pointer' }}
              >
                {/* Image Section (~60% height visual ratio) */}
                <div className="relative h-48 w-full overflow-hidden shrink-0 bg-gray-100">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  />
                  {/* Category Tag Badge */}
                  <div className="absolute top-3 left-3 bg-[#002116]/85 backdrop-blur-md text-[#8bd6b6] text-[10px] font-extrabold px-2.5 py-1 rounded-full border border-white/20 shadow">
                    {service.tag}
                  </div>

                  {/* Hot/Special Badge */}
                  {service.badge && (
                    <div className="absolute top-3 right-3 bg-amber-500 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-lg border border-amber-300/40">
                      {service.badge}
                    </div>
                  )}

                  {/* Rating Overlay at bottom image */}
                  <div className="absolute bottom-2.5 right-2.5 bg-black/60 backdrop-blur-md text-amber-300 text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1 border border-white/20 shadow">
                    <span className="material-symbols-outlined text-sm">star</span>
                    <span>{service.rating} ({service.reviewsCount})</span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-4 flex flex-col justify-between flex-1 gap-3">
                  <div>
                    <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
                      Cung cấp bởi: {service.provider}
                    </span>
                    <h3 className="font-extrabold text-base text-gray-900 group-hover:text-emerald-700 transition-colors leading-snug mt-0.5">
                      {service.title}
                    </h3>
                    <p className="text-xs text-gray-600 line-clamp-2 mt-1.5 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Pricing & Booking Action */}
                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                    <div>
                      <span className="block text-[9px] uppercase font-bold text-gray-400">Giá tham khảo</span>
                      <div className="flex items-baseline gap-1">
                        <span className="font-black text-emerald-800 text-base">{service.price}</span>
                        <span className="text-[11px] font-semibold text-gray-500">/ {service.unit}</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedService(service);
                      }}
                      className="px-4 py-2 rounded-xl bg-[#002116] hover:bg-emerald-800 text-[#8bd6b6] hover:text-white font-extrabold text-xs transition-all active:scale-95 cursor-pointer shadow flex items-center gap-1"
                    >
                      <span>Đặt ngay</span>
                      <span className="material-symbols-outlined text-sm">chevron_right</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center space-y-3 my-6">
            <span className="material-symbols-outlined text-4xl text-white/40">search_off</span>
            <p className="text-sm font-bold text-white">Không tìm thấy dịch vụ phù hợp</p>
            <p className="text-xs text-white/60">Vui lòng thử lại với từ khóa khác hoặc chuyển danh mục dịch vụ.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-4 py-2 bg-[#8bd6b6] text-[#002116] rounded-xl text-xs font-bold hover:bg-[#72c2a0] transition-colors"
            >
              Xóa bộ lọc
            </button>
          </div>
        )}
      </main>

      {/* SERVICE DETAIL & BOOKING MODAL */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#002116] border border-white/20 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl text-white relative flex flex-col max-h-[90vh]">
            {/* Header Image */}
            <div className="relative h-56 w-full shrink-0">
              <img
                src={selectedService.image}
                alt={selectedService.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#002116] via-[#002116]/40 to-transparent" />

              {/* Close Button */}
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md border border-white/30 transition-all active:scale-95 cursor-pointer z-10"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>

              <div className="absolute bottom-4 left-5 right-5">
                <span className="bg-[#8bd6b6] text-[#002116] text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full inline-block mb-1 shadow">
                  {selectedService.tag}
                </span>
                <h2 className="text-xl font-extrabold text-white leading-tight">
                  {selectedService.title}
                </h2>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-sm">
              <p className="text-white/80 leading-relaxed text-xs sm:text-sm">
                {selectedService.description}
              </p>

              {/* Highlights List */}
              <div className="bg-white/10 rounded-2xl p-4 border border-white/10 space-y-2">
                <span className="text-[10px] uppercase font-extrabold text-[#8bd6b6] tracking-wider block">
                  ✨ Điểm nổi bật dịch vụ:
                </span>
                <ul className="space-y-1.5 text-xs text-white/90">
                  {selectedService.highlights.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-emerald-400 text-sm">check_circle</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price Banner */}
              <div className="bg-emerald-950/60 border border-emerald-500/30 rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-emerald-300 block">Đơn giá niêm yết</span>
                  <span className="text-xl font-extrabold text-white">{selectedService.price}</span>
                  <span className="text-xs text-emerald-300"> / {selectedService.unit}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-white/60 block">Đánh giá khách hàng</span>
                  <span className="text-sm font-bold text-amber-300">★ {selectedService.rating} / 5.0</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    const title = selectedService.title;
                    setSelectedService(null);
                    setBookingSuccessService(title);
                  }}
                  className="w-full py-3.5 px-4 rounded-2xl bg-[#8bd6b6] hover:bg-[#72c2a0] text-[#002116] font-extrabold text-sm flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer shadow-lg"
                >
                  <span className="material-symbols-outlined text-lg">event_available</span>
                  <span>Xác Nhận Đặt Dịch Vụ Ngay</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* BOOKING SUCCESS CONFIRMATION MODAL */}
      {bookingSuccessService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#00281D] border border-white/20 rounded-3xl p-6 w-full max-w-md text-white shadow-2xl relative text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-400 flex items-center justify-center mx-auto shadow-lg">
              <span className="material-symbols-outlined text-3xl">task_alt</span>
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-white">Yêu Cầu Đặt Dịch Vụ Thành Công!</h3>
              <p className="text-xs text-emerald-200/90 mt-1">
                Yêu cầu cho dịch vụ <strong className="text-white">"{bookingSuccessService}"</strong> đã được chuyển tới đơn vị cung cấp bản địa.
              </p>
            </div>

            <div className="p-3.5 bg-white/10 rounded-2xl text-xs text-white/80 border border-white/10 text-left space-y-1">
              <p className="font-bold text-[#8bd6b6]">📞 Hỗ trợ nhanh từ NomadNest:</p>
              <p>Đội ngũ sẽ liên hệ xác nhận khung giờ giao nhận / phục vụ trực tiếp qua Zalo / SĐT trong vòng 15 phút.</p>
            </div>

            <button
              onClick={() => setBookingSuccessService(null)}
              className="w-full py-3 bg-[#8bd6b6] hover:bg-[#72c2a0] text-[#002116] font-extrabold text-xs rounded-xl transition-all cursor-pointer shadow-lg"
            >
              Đóng & Hoàn Tất
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
