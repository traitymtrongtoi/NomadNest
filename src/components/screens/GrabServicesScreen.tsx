import React, { useState } from 'react';

interface GrabServicesScreenProps {
  onBack?: () => void;
}

interface VehicleOption {
  id: string;
  name: string;
  icon: string;
  eta: string;
  price: number;
  formattedPrice: string;
  description: string;
  badge?: string;
}

const VEHICLE_OPTIONS: VehicleOption[] = [
  {
    id: 'grabbike',
    name: 'GrabBike',
    icon: 'two_wheeler',
    eta: '3 phút',
    price: 15000,
    formattedPrice: '15.000đ',
    description: 'Xe máy nhanh chóng, tiết kiệm',
    badge: 'Phổ biến'
  },
  {
    id: 'grabcar4',
    name: 'GrabCar 4 chỗ',
    icon: 'local_taxi',
    eta: '5 phút',
    price: 45000,
    formattedPrice: '45.000đ',
    description: 'Xe 4 chỗ thoải mái, máy lạnh'
  },
  {
    id: 'grabcar7',
    name: 'GrabCar 7 chỗ',
    icon: 'directions_car',
    eta: '6 phút',
    price: 68000,
    formattedPrice: '68.000đ',
    description: 'Xe 7 chỗ rộng rãi cho nhóm & hành lý'
  }
];

const SUGGESTED_DESTINATIONS = [
  { name: 'Làng đá Mỹ nghệ Non Nước', price: '15.000đ' },
  { name: 'Làng Nước Mắm Nam Ô', price: '45.000đ' },
  { name: 'Bãi biển Mỹ Khê', price: '25.000đ' },
  { name: 'Cầu Rồng Đà Nẵng', price: '30.000đ' }
];

export const GrabServicesScreen: React.FC<GrabServicesScreenProps> = ({ onBack }) => {
  // Mode: 'home' (Grab Home Dashboard) vs 'booking' (Map & Ride Booking)
  const [viewMode, setViewMode] = useState<'home' | 'booking'>('home');

  // Bottom Navigation tab in Grab Home
  const [activeBottomNav, setActiveBottomNav] = useState<'home' | 'payment' | 'activity' | 'messages'>('home');

  // Ride booking state
  const [pickup, setPickup] = useState('Vị trí hiện tại - Đà Nẵng');
  const [dropoff, setDropoff] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState<string>('grabbike');
  const [isBooking, setIsBooking] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [driverInfo, setDriverInfo] = useState<{
    name: string;
    licensePlate: string;
    rating: string;
    eta: string;
    vehicleName: string;
    phone: string;
  } | null>(null);

  const activeVehicleObj = VEHICLE_OPTIONS.find(v => v.id === selectedVehicle) || VEHICLE_OPTIONS[0];

  const handleBookRide = () => {
    if (isBooking) return;
    setIsBooking(true);

    // Simulated 2-second driver match flow
    setTimeout(() => {
      setIsBooking(false);
      setBookingSuccess(true);
      setDriverInfo({
        name: 'Nguyễn Văn A',
        licensePlate: '43A-123.45',
        rating: '4.9 ★',
        eta: '3 phút',
        vehicleName: activeVehicleObj.name,
        phone: '0905 123 456'
      });
    }, 2000);
  };

  const handleResetBooking = () => {
    setBookingSuccess(false);
    setDriverInfo(null);
    setIsBooking(false);
  };

  const openRideBooking = (vehicleType: string = 'grabbike', destName: string = '') => {
    setSelectedVehicle(vehicleType);
    if (destName) setDropoff(destName);
    setViewMode('booking');
  };

  return (
    <div className="bg-[#f8f9fb] min-h-screen text-[#191c1e] font-sans flex flex-col relative select-none overflow-x-hidden">
      {/* VIEW MODE 1: GRAB HOME DASHBOARD */}
      {viewMode === 'home' && (
        <div className="flex flex-col min-h-screen pb-20 animate-fadeIn">
          {/* 1. Header (Thanh tìm kiếm trên cùng) */}
          <header className="w-full bg-[#00A550] flex items-center justify-between px-4 py-3 sticky top-0 z-50 shadow-md">
            {/* Back button to main NomadNest app */}
            <button
              onClick={onBack}
              type="button"
              className="mr-1 w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-all cursor-pointer shrink-0"
              title="Quay lại NomadNest"
            >
              <span className="material-symbols-outlined text-xl">arrow_back</span>
            </button>

            {/* QR Code Scanner */}
            <div
              onClick={() => alert('Mở máy quét mã QR Grab...')}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 text-white cursor-pointer hover:bg-white/30 transition-colors shrink-0"
              title="Quét mã QR"
            >
              <span className="material-symbols-outlined">qr_code_scanner</span>
            </div>

            {/* Search Input Bar */}
            <div
              onClick={() => openRideBooking('grabbike')}
              className="flex-1 mx-2.5 h-10 rounded-full bg-white flex items-center px-4 cursor-pointer border border-transparent shadow-sm hover:shadow-md transition-shadow"
            >
              <span className="material-symbols-outlined text-gray-400 mr-2 text-xl">search</span>
              <input
                type="text"
                readOnly
                className="bg-transparent w-full text-sm font-medium outline-none text-gray-800 placeholder:text-gray-400 cursor-pointer"
                placeholder="Tìm địa điểm"
              />
            </div>

            {/* User Profile Avatar / Grab badge */}
            <div className="flex items-center gap-2 shrink-0">
              <div className="w-9 h-9 rounded-full bg-white text-[#00A550] flex items-center justify-center font-black text-lg shadow-sm border border-white/40">
                G
              </div>
              <div className="w-9 h-9 rounded-full overflow-hidden border border-white/50 shadow-sm cursor-pointer">
                <img
                  alt="Profile"
                  className="w-full h-full object-cover"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                />
              </div>
            </div>
          </header>

          {/* Main Content Area */}
          <main className="flex-1 pt-4 pb-12 bg-gradient-to-b from-gray-100 to-white">
            {/* 2. Grid Dịch vụ chính (Main Services - 2 hàng x 5 cột) */}
            <div className="grid grid-cols-5 gap-y-5 gap-x-2 px-3 mb-6">
              {/* Row 1 */}
              {/* 1. Đồ ăn */}
              <button
                onClick={() => alert('Dịch vụ GrabFood: Đang kết nối nhà hàng gần bạn!')}
                type="button"
                className="flex flex-col items-center justify-start gap-1 group cursor-pointer"
              >
                <div className="w-13 h-13 sm:w-14 sm:h-14 bg-white rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform shadow-sm border border-gray-100 text-2xl">
                  🍜
                </div>
                <span className="text-[11px] font-semibold text-center text-gray-700 leading-tight">Đồ ăn</span>
              </button>

              {/* 2. Ô tô -> Chuyển sang màn hình Đặt xe */}
              <button
                onClick={() => openRideBooking('grabcar4')}
                type="button"
                className="flex flex-col items-center justify-start gap-1 group cursor-pointer"
              >
                <div className="w-13 h-13 sm:w-14 sm:h-14 bg-white rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform shadow-sm border border-gray-100 text-2xl relative">
                  🚗
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] font-extrabold px-1 rounded-full">HOT</span>
                </div>
                <span className="text-[11px] font-bold text-center text-[#00A550] leading-tight">Ô tô</span>
              </button>

              {/* 3. Đi Ăn Nhà Hàng */}
              <button
                onClick={() => alert('Đi Ăn Nhà Hàng: Ưu đãi tới 50% tại Đà Nẵng!')}
                type="button"
                className="flex flex-col items-center justify-start gap-1 group cursor-pointer"
              >
                <div className="w-13 h-13 sm:w-14 sm:h-14 bg-white rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform shadow-sm border border-gray-100 text-2xl">
                  🍽️
                </div>
                <span className="text-[11px] font-semibold text-center text-gray-700 leading-tight">
                  Đi Ăn<br />Nhà Hàng
                </span>
              </button>

              {/* 4. Đặt xe trước */}
              <button
                onClick={() => openRideBooking('grabcar4')}
                type="button"
                className="flex flex-col items-center justify-start gap-1 group cursor-pointer"
              >
                <div className="w-13 h-13 sm:w-14 sm:h-14 bg-white rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform shadow-sm border border-gray-100 text-2xl relative">
                  ⏰
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] font-extrabold px-1.5 py-0.2 rounded-sm">NEW</span>
                </div>
                <span className="text-[11px] font-semibold text-center text-gray-700 leading-tight">
                  Đặt xe<br />trước
                </span>
              </button>

              {/* 5. Quà tặng */}
              <button
                onClick={() => alert('Quà tặng GrabRewards')}
                type="button"
                className="flex flex-col items-center justify-start gap-1 group cursor-pointer"
              >
                <div className="w-13 h-13 sm:w-14 sm:h-14 bg-white rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform shadow-sm border border-gray-100 text-2xl">
                  🎁
                </div>
                <span className="text-[11px] font-semibold text-center text-gray-700 leading-tight">Quà tặng</span>
              </button>

              {/* Row 2 */}
              {/* 6. Xe máy -> Chuyển sang màn hình Đặt xe */}
              <button
                onClick={() => openRideBooking('grabbike')}
                type="button"
                className="flex flex-col items-center justify-start gap-1 group cursor-pointer"
              >
                <div className="w-13 h-13 sm:w-14 sm:h-14 bg-white rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform shadow-sm border border-gray-100 text-2xl">
                  🛵
                </div>
                <span className="text-[11px] font-bold text-center text-[#00A550] leading-tight">Xe máy</span>
              </button>

              {/* 7. Giao hàng */}
              <button
                onClick={() => alert('GrabExpress: Giao hàng siêu tốc trong 30 phút')}
                type="button"
                className="flex flex-col items-center justify-start gap-1 group cursor-pointer"
              >
                <div className="w-13 h-13 sm:w-14 sm:h-14 bg-white rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform shadow-sm border border-gray-100 text-2xl">
                  📦
                </div>
                <span className="text-[11px] font-semibold text-center text-gray-700 leading-tight">Giao hàng</span>
              </button>

              {/* 8. Đi chợ */}
              <button
                onClick={() => alert('GrabMart: Đi chợ siêu thị online')}
                type="button"
                className="flex flex-col items-center justify-start gap-1 group cursor-pointer"
              >
                <div className="w-13 h-13 sm:w-14 sm:h-14 bg-white rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform shadow-sm border border-gray-100 text-2xl">
                  🛒
                </div>
                <span className="text-[11px] font-semibold text-center text-gray-700 leading-tight">Đi chợ</span>
              </button>

              {/* 9. Vay */}
              <button
                onClick={() => alert('GrabFin: Dịch vụ tài chính & Tiêu dùng')}
                type="button"
                className="flex flex-col items-center justify-start gap-1 group cursor-pointer"
              >
                <div className="w-13 h-13 sm:w-14 sm:h-14 bg-white rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform shadow-sm border border-gray-100 text-2xl">
                  💳
                </div>
                <span className="text-[11px] font-semibold text-center text-gray-700 leading-tight">Vay</span>
              </button>

              {/* 10. Bản đồ */}
              <button
                onClick={() => openRideBooking('grabbike')}
                type="button"
                className="flex flex-col items-center justify-start gap-1 group cursor-pointer"
              >
                <div className="w-13 h-13 sm:w-14 sm:h-14 bg-white rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform shadow-sm border border-gray-100 text-2xl">
                  🗺️
                </div>
                <span className="text-[11px] font-semibold text-center text-gray-700 leading-tight">Bản đồ</span>
              </button>
            </div>

            {/* Pagination Indicator */}
            <div className="flex justify-center gap-1.5 mb-6">
              <div className="w-5 h-1 bg-gray-600 rounded-full" />
              <div className="w-1.5 h-1 bg-gray-300 rounded-full" />
            </div>

            {/* 3. Khu vực Tiện ích (Widgets - Cuộn ngang) */}
            <div className="mb-6">
              <div className="px-4 mb-2 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Tiện ích nhanh</span>
                <span className="text-xs text-[#00A550] font-semibold cursor-pointer">Xem thêm</span>
              </div>

              <div className="flex overflow-x-auto gap-3 px-4 pb-2 no-scrollbar scroll-smooth">
                {/* Thẻ 1: Thông tin ví */}
                <div className="min-w-[170px] bg-white border border-gray-200/80 rounded-2xl p-3.5 flex flex-col justify-between shadow-sm cursor-pointer hover:border-[#00A550]/50 transition-all shrink-0">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Ví thanh toán</span>
                    <div className="w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center">
                      <span className="material-symbols-outlined text-xs">smartphone</span>
                    </div>
                  </div>
                  <div className="font-bold text-sm text-gray-900">Viettel Money 8677</div>
                  <span className="text-[10px] text-emerald-600 font-semibold mt-1">Đã liên kết • Đủ số dư</span>
                </div>

                {/* Thẻ 2: Lối tắt đặt xe */}
                <div
                  onClick={() => openRideBooking('grabbike', 'Nhà riêng')}
                  className="min-w-[170px] bg-white border border-gray-200/80 rounded-2xl p-3.5 flex flex-col justify-between shadow-sm cursor-pointer hover:border-[#00A550]/50 transition-all shrink-0"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Lối tắt đặt xe</span>
                    <span className="text-lg">🛵</span>
                  </div>
                  <div className="font-bold text-sm text-gray-900">ĐẶT XE ĐẾN: Nhà</div>
                  <span className="text-[10px] text-gray-500 mt-1">Chỉ 1-chạm gọi xe</span>
                </div>

                {/* Thẻ 3: Đánh giá & Gói cước */}
                <div className="min-w-[170px] bg-white border border-gray-200/80 rounded-2xl p-3.5 flex flex-col justify-between shadow-sm cursor-pointer hover:border-[#00A550]/50 transition-all shrink-0">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Ưu đãi chuyến</span>
                    <span className="text-lg">🏷️</span>
                  </div>
                  <div className="font-bold text-sm text-gray-900">Gói Cước Tiết Kiệm</div>
                  <span className="text-[10px] text-amber-600 font-semibold mt-1">Giảm 30% chuyến tiếp</span>
                </div>
              </div>
            </div>

            {/* 4. Banner Quảng cáo */}
            <div className="px-4 mb-6">
              <div className="flex items-center gap-1 mb-2.5 cursor-pointer group">
                <h3 className="font-bold text-base text-gray-900 group-hover:text-[#00A550] transition-colors">
                  Bật Ride Cover Ngay
                </h3>
                <span className="material-symbols-outlined text-gray-400 group-hover:text-[#00A550] text-sm transition-colors">
                  chevron_right
                </span>
              </div>

              <div
                onClick={() => alert('GrabInsure: Đăng ký bảo vệ hành trình thành công!')}
                className="relative w-full h-44 rounded-2xl overflow-hidden shadow-lg cursor-pointer group border border-gray-100"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80')"
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="bg-[#00A550] text-white text-[9px] font-extrabold px-2 py-0.5 rounded-md uppercase mb-1.5 inline-block">
                    Mới ra mắt
                  </span>
                  <h4 className="font-bold text-lg leading-tight mb-1">
                    Đi Xa Bật Ride-Cover<br />Cả Nhà Thêm An Tâm
                  </h4>
                  <p className="text-xs text-gray-200 font-normal">Bảo vệ bạn trong và sau chuyến đi</p>
                  <p className="text-[10px] text-gray-400 mt-1">QC · GrabInsure</p>
                </div>
              </div>
            </div>
          </main>

          {/* 5. Thanh điều hướng dưới cùng (Bottom Navigation) */}
          <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] flex justify-around items-center px-2 py-2">
            {/* Active: Home */}
            <button
              onClick={() => setActiveBottomNav('home')}
              type="button"
              className={`flex flex-col items-center justify-center p-1.5 min-w-[64px] cursor-pointer ${
                activeBottomNav === 'home' ? 'text-[#00A550]' : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              <span className="material-symbols-outlined text-2xl mb-0.5">home</span>
              <span className="text-[10px] font-bold leading-tight">Trang chủ</span>
            </button>

            {/* Payment */}
            <button
              onClick={() => {
                setActiveBottomNav('payment');
                alert('Màn hình Ví & Thanh toán Grab');
              }}
              type="button"
              className={`flex flex-col items-center justify-center p-1.5 min-w-[64px] relative cursor-pointer ${
                activeBottomNav === 'payment' ? 'text-[#00A550]' : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              <span className="material-symbols-outlined text-2xl mb-0.5">account_balance_wallet</span>
              <span className="text-[10px] font-medium leading-tight">Thanh toán</span>
              <div className="absolute top-1.5 right-4 w-2 h-2 bg-red-500 rounded-full border border-white" />
            </button>

            {/* Activity */}
            <button
              onClick={() => {
                setActiveBottomNav('activity');
                alert('Màn hình Lịch sử Hoạt động Grab');
              }}
              type="button"
              className={`flex flex-col items-center justify-center p-1.5 min-w-[64px] relative cursor-pointer ${
                activeBottomNav === 'activity' ? 'text-[#00A550]' : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              <span className="material-symbols-outlined text-2xl mb-0.5">receipt_long</span>
              <span className="text-[10px] font-medium leading-tight">Hoạt động</span>
              <div className="absolute top-1.5 right-4 w-2 h-2 bg-red-500 rounded-full border border-white" />
            </button>

            {/* Messages */}
            <button
              onClick={() => {
                setActiveBottomNav('messages');
                alert('Màn hình Tin nhắn Grab');
              }}
              type="button"
              className={`flex flex-col items-center justify-center p-1.5 min-w-[64px] relative cursor-pointer ${
                activeBottomNav === 'messages' ? 'text-[#00A550]' : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              <span className="material-symbols-outlined text-2xl mb-0.5">chat</span>
              <span className="text-[10px] font-medium leading-tight">Tin nhắn</span>
              <div className="absolute top-1 right-3 bg-red-500 text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full border border-white">
                6
              </div>
            </button>
          </nav>
        </div>
      )}

      {/* VIEW MODE 2: RIDE BOOKING & INTERACTIVE MAP VIEW */}
      {viewMode === 'booking' && (
        <div className="flex flex-col min-h-screen animate-fadeIn bg-slate-900 pb-20">
          {/* Top Header Bar */}
          <header className="fixed top-0 left-0 right-0 z-50 bg-[#00B14F] text-white px-4 h-14 flex items-center justify-between shadow-md">
            <button
              onClick={() => setViewMode('home')}
              type="button"
              className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/10 active:scale-95 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-2xl">arrow_back</span>
            </button>

            <div className="flex items-center gap-2">
              <div className="bg-white text-[#00B14F] px-2 py-0.5 rounded-lg font-black tracking-tight text-base shadow-sm">
                Grab
              </div>
              <span className="font-bold text-sm tracking-wide text-white">Gọi Xe - NomadNest</span>
            </div>

            <div className="w-10" />
          </header>

          {/* Main Container */}
          <div className="pt-14 flex-1 flex flex-col min-h-screen">
            {/* MAP AREA (Top Half) */}
            <div className="relative w-full h-[40vh] min-h-[280px] bg-slate-200 overflow-hidden shadow-inner">
              <div
                className="w-full h-full bg-cover bg-center brightness-105 contrast-95 opacity-90"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAlbsswNH2PDEeIAJDKDiQhX1AG8mqrtuCfYxmUdnrevz3bVd3riZ9mcWcnd94AwrdOlU3z9k5eykXWW9te5YpRgu7WjuQaC8oWZP9epsnleCm4S06mW6wmuOBMXSpTOA5ZX-9bQO05i7-LIg4noSWIIVRVoWPHogGWL-t5mxQTRYSshZIA6XFn-masSU95WzL4RcbgwjPtXJ4SgtHd8FPGctJjLCEs7BqbgbqV3Fxn-GajloQrrgHbMA')"
                }}
              />

              <div className="absolute inset-0 bg-blue-900/5 pointer-events-none" />

              <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                <path
                  d="M 100 110 Q 180 150 260 170"
                  fill="none"
                  stroke="#00B14F"
                  strokeWidth="4"
                  strokeDasharray="6 6"
                  className="animate-pulse"
                />
              </svg>

              {/* Pin 1: Pickup (Blue Pin) */}
              <div className="absolute top-[22%] left-[18%] sm:left-[25%] z-20 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group">
                <div className="bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-xl shadow-lg border border-blue-200 text-[11px] font-bold text-slate-800 mb-1 flex items-center gap-1.5 whitespace-nowrap">
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
                  <span>Điểm đón: {pickup}</span>
                </div>
                <div className="w-9 h-9 rounded-full bg-blue-600 border-2 border-white shadow-xl flex items-center justify-center text-white ring-4 ring-blue-500/30">
                  <span className="material-symbols-outlined text-lg">my_location</span>
                </div>
                <div className="w-2 h-1 bg-black/30 rounded-full blur-[1px] mt-0.5" />
              </div>

              {/* Pin 2: Drop-off (Red Pin) */}
              <div className="absolute top-[52%] right-[15%] sm:right-[22%] z-20 transform translate-x-1/2 -translate-y-1/2 flex flex-col items-center group">
                <div className="bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-xl shadow-lg border border-red-200 text-[11px] font-bold text-slate-800 mb-1 flex items-center gap-1.5 whitespace-nowrap max-w-[200px] truncate">
                  <span className="material-symbols-outlined text-xs text-red-500">location_on</span>
                  <span>{dropoff ? dropoff : 'Bạn muốn đi đâu?'}</span>
                </div>
                <div className="w-9 h-9 rounded-full bg-red-600 border-2 border-white shadow-xl flex items-center justify-center text-white ring-4 ring-red-500/30 animate-bounce">
                  <span className="material-symbols-outlined text-lg">flag</span>
                </div>
                <div className="w-2 h-1 bg-black/30 rounded-full blur-[1px] mt-0.5" />
              </div>

              {/* GPS Recenter */}
              <div className="absolute bottom-4 right-4 z-20 bg-white/90 backdrop-blur-md p-2 rounded-full shadow-lg border border-gray-200 text-gray-700 hover:bg-white cursor-pointer active:scale-95 transition-all">
                <span className="material-symbols-outlined text-xl text-blue-600">gps_fixed</span>
              </div>
            </div>

            {/* BOOKING CONTROL PANEL (Bottom Sheet Overlay) */}
            <div className="flex-1 bg-white rounded-t-3xl shadow-[0_-10px_30px_rgba(0,0,0,0.15)] p-5 sm:p-6 -mt-6 z-30 flex flex-col justify-between border-t border-gray-100 max-w-2xl mx-auto w-full">
              {!bookingSuccess ? (
                <div className="space-y-5">
                  <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto -mt-1 mb-2 opacity-80" />

                  {/* Location Inputs */}
                  <div className="bg-gray-50 rounded-2xl p-3 border border-gray-200 space-y-3 relative shadow-inner">
                    <div className="absolute left-[27px] top-[28px] bottom-[28px] w-0.5 bg-gray-300 border-l border-dashed border-gray-400 z-0" />

                    <div className="flex items-center gap-3 relative z-10">
                      <div className="w-4 h-4 rounded-full bg-blue-500 ring-4 ring-blue-100 flex items-center justify-center shrink-0">
                        <div className="w-1.5 h-1.5 rounded-full bg-white" />
                      </div>
                      <div className="flex-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block leading-none mb-0.5">
                          Điểm đón
                        </label>
                        <input
                          type="text"
                          value={pickup}
                          onChange={e => setPickup(e.target.value)}
                          className="w-full bg-transparent text-sm font-semibold text-gray-800 outline-none placeholder:text-gray-400"
                          placeholder="Nhập vị trí đón..."
                        />
                      </div>
                    </div>

                    <div className="h-px bg-gray-200 ml-7" />

                    <div className="flex items-center gap-3 relative z-10">
                      <div className="w-4 h-4 rounded-full bg-red-500 ring-4 ring-red-100 flex items-center justify-center shrink-0">
                        <div className="w-1.5 h-1.5 rounded-full bg-white" />
                      </div>
                      <div className="flex-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block leading-none mb-0.5">
                          Điểm đến
                        </label>
                        <input
                          type="text"
                          value={dropoff}
                          onChange={e => setDropoff(e.target.value)}
                          className="w-full bg-transparent text-sm font-bold text-[#00B14F] outline-none placeholder:text-gray-400 placeholder:font-normal"
                          placeholder="Bạn muốn đi đâu?"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Suggested Quick Destinations */}
                  <div>
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">
                      Gợi ý điểm đến phổ biến tại Đà Nẵng:
                    </span>
                    <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                      {SUGGESTED_DESTINATIONS.map((dest, idx) => (
                        <button
                          key={idx}
                          onClick={() => setDropoff(dest.name)}
                          type="button"
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap border transition-all cursor-pointer ${
                            dropoff === dest.name
                              ? 'bg-[#00B14F] text-white border-[#00B14F] shadow-md'
                              : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-200'
                          }`}
                        >
                          {dest.name} <span className="opacity-80 font-normal">({dest.price})</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Vehicle Options List */}
                  <div className="space-y-2.5 pt-1">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">
                      Chọn loại xe Grab:
                    </span>

                    <div className="space-y-2">
                      {VEHICLE_OPTIONS.map(v => {
                        const isSelected = selectedVehicle === v.id;
                        return (
                          <div
                            key={v.id}
                            onClick={() => setSelectedVehicle(v.id)}
                            className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                              isSelected
                                ? 'border-[#00B14F] bg-[#00B14F]/5 shadow-md ring-1 ring-[#00B14F]'
                                : 'border-gray-200 hover:border-gray-300 bg-gray-50/80'
                            }`}
                          >
                            <div className="flex items-center gap-3.5">
                              <div
                                className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                                  isSelected
                                    ? 'bg-[#00B14F] text-white shadow-md'
                                    : 'bg-gray-200 text-gray-700'
                                }`}
                              >
                                <span className="material-symbols-outlined text-2xl">{v.icon}</span>
                              </div>

                              <div>
                                <div className="flex items-center gap-2">
                                  <h4 className="font-bold text-sm text-gray-900">{v.name}</h4>
                                  {v.badge && (
                                    <span className="bg-[#00B14F]/20 text-[#00B14F] font-extrabold text-[9px] px-2 py-0.5 rounded-full uppercase">
                                      {v.badge}
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs text-gray-500 mt-0.5">{v.description}</p>
                                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-600 mt-1">
                                  <span className="material-symbols-outlined text-xs text-[#00B14F]">schedule</span>
                                  <span>Tài xế đến sau {v.eta}</span>
                                </div>
                              </div>
                            </div>

                            <div className="text-right pl-2">
                              <span className="text-base font-extrabold text-[#00B14F] block">
                                {v.formattedPrice}
                              </span>
                              <span className="text-[10px] text-gray-400 font-medium">Giá cố định</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="pt-3 pb-2">
                    <button
                      onClick={handleBookRide}
                      disabled={isBooking}
                      type="button"
                      className={`w-full py-4 rounded-2xl text-base font-bold text-white shadow-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        isBooking
                          ? 'bg-[#00B14F]/75 opacity-90 cursor-not-allowed'
                          : 'bg-[#00B14F] hover:bg-[#009643] active:scale-[0.99] shadow-[#00B14F]/30'
                      }`}
                    >
                      {isBooking ? (
                        <>
                          <span className="material-symbols-outlined animate-spin text-xl">autorenew</span>
                          <span>Đang tìm tài xế...</span>
                        </>
                      ) : (
                        <>
                          <span className="material-symbols-outlined text-xl">local_taxi</span>
                          <span>
                            Đặt {activeVehicleObj.name} • {activeVehicleObj.formattedPrice}
                          </span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ) : (
                /* SUCCESS STATE: DRIVER FOUND */
                <div className="space-y-6 py-2 animate-fadeIn">
                  <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#00B14F] text-white flex items-center justify-center shrink-0 shadow-md">
                      <span className="material-symbols-outlined text-2xl">check_circle</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-emerald-950">Đã tìm thấy tài xế!</h3>
                      <p className="text-xs text-emerald-800 leading-snug mt-0.5">
                        Tài xế <b>{driverInfo?.name}</b> (Biển số: <b>{driverInfo?.licensePlate}</b>) đang đến đón bạn trong <b>3 phút</b>.
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-slate-300 overflow-hidden border-2 border-white shadow">
                          <img
                            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                            alt="Driver"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-bold text-base text-gray-900">{driverInfo?.name}</h4>
                          <p className="text-xs text-gray-500">{driverInfo?.vehicleName} • Honda Wave Alpha</p>
                          <div className="flex items-center gap-1 text-xs font-bold text-amber-500 mt-0.5">
                            <span className="material-symbols-outlined text-xs">star</span>
                            <span>{driverInfo?.rating} (500+ chuyến)</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="px-2.5 py-1 rounded-lg bg-gray-900 text-white font-mono font-bold text-xs tracking-wider block">
                          {driverInfo?.licensePlate}
                        </span>
                        <span className="text-[10px] text-gray-500 mt-1 block">Đang di chuyển</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-200">
                      <button
                        onClick={() => alert(`Đang gọi tài xế ${driverInfo?.name} qua số ${driverInfo?.phone}...`)}
                        type="button"
                        className="py-2.5 bg-white border border-gray-300 rounded-xl text-xs font-bold text-gray-800 flex items-center justify-center gap-1.5 hover:bg-gray-100 cursor-pointer active:scale-95"
                      >
                        <span className="material-symbols-outlined text-base text-[#00B14F]">call</span>
                        <span>Gọi điện</span>
                      </button>

                      <button
                        onClick={() => alert(`Mở khung chat với tài xế ${driverInfo?.name}...`)}
                        type="button"
                        className="py-2.5 bg-white border border-gray-300 rounded-xl text-xs font-bold text-gray-800 flex items-center justify-center gap-1.5 hover:bg-gray-100 cursor-pointer active:scale-95"
                      >
                        <span className="material-symbols-outlined text-base text-[#00B14F]">chat</span>
                        <span>Nhắn tin</span>
                      </button>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-3 border border-gray-200 text-xs space-y-1.5">
                    <div className="flex items-center gap-2 text-gray-700">
                      <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                      <span className="font-semibold truncate">Đón: {pickup}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <span className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
                      <span className="font-semibold truncate">Đến: {dropoff || 'Điểm đến đã chọn'}</span>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <button
                      onClick={() => setViewMode('home')}
                      type="button"
                      className="w-full py-3.5 bg-[#00B14F] hover:bg-[#009643] text-white font-bold text-sm rounded-xl shadow-lg cursor-pointer active:scale-95 transition-all"
                    >
                      Quay lại Grab Home
                    </button>

                    <button
                      onClick={handleResetBooking}
                      type="button"
                      className="w-full py-2.5 text-xs text-gray-500 font-semibold hover:text-gray-800 cursor-pointer"
                    >
                      Đặt chuyến khác
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
