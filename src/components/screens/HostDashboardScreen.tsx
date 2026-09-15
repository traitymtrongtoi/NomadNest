import React, { useState, useEffect } from 'react';
import { User } from '../../types';
import { EmergencyModal } from '../common/EmergencyModal';
import { AIChatbotModal } from '../common/AIChatbotModal';

interface HostDashboardScreenProps {
  currentUser: User | null;
  onNavigateHome?: () => void;
  onNavigateAddRoom?: () => void;
}

export interface HostBookingItem {
  id: string;
  guestName: string;
  propertyTitle: string;
  dates: string;
  totalPriceFormatted: string;
  status: string;
  isInstant?: boolean;
}

export const HostDashboardScreen: React.FC<HostDashboardScreenProps> = ({
  currentUser,
  onNavigateHome,
  onNavigateAddRoom
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'rooms' | 'reviews'>('overview');
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [recentBookings, setRecentBookings] = useState<HostBookingItem[]>([]);

  // Real-time synchronization of guest bookings strictly from localStorage
  useEffect(() => {
    const loadBookings = () => {
      try {
        const rawGuestBookings = localStorage.getItem('myBookings') || '[]';
        const guestBookings = JSON.parse(rawGuestBookings);

        let mappedGuestBookings: HostBookingItem[] = [];
        if (Array.isArray(guestBookings) && guestBookings.length > 0) {
          mappedGuestBookings = guestBookings.map((item: any, idx: number) => {
            const guestName = item.guestName || item.userName || item.name || item.customerName || 'Khách hàng';
            const propertyTitle = item.propertyTitle || item.title || 'Phòng Homestay Làng Nam Ô';
            const dates = item.checkIn && item.checkOut ? `${item.checkIn} - ${item.checkOut}` : 'Vừa đặt hôm nay';
            
            let priceDisplay = 'Đã xác nhận & Thanh toán';
            if (item.totalPrice) {
              priceDisplay = `Đã xác nhận & Thanh toán (${item.totalPrice})`;
            } else if (item.rawTotalPrice) {
              priceDisplay = `Đã xác nhận & Thanh toán (${Number(item.rawTotalPrice).toLocaleString('vi-VN')} VNĐ)`;
            }

            return {
              id: item.id || `guest_booking_${idx}_${Date.now()}`,
              guestName,
              propertyTitle,
              dates,
              totalPriceFormatted: priceDisplay,
              status: item.status || 'confirmed',
              isInstant: true
            };
          });
        }

        // Only use real booking data from localStorage (no mock items)
        setRecentBookings(mappedGuestBookings);
      } catch (err) {
        console.error('Error reading bookings from localStorage:', err);
        setRecentBookings([]);
      }
    };

    loadBookings();

    // Listen for storage changes across tabs or screens
    window.addEventListener('storage', loadBookings);
    window.addEventListener('nomad_bookings_updated', loadBookings);
    return () => {
      window.removeEventListener('storage', loadBookings);
      window.removeEventListener('nomad_bookings_updated', loadBookings);
    };
  }, []);

  return (
    <div className="bg-[#002116] text-white min-h-screen pb-28 font-sans">
      <main className="pt-6 px-4 sm:px-6 max-w-3xl mx-auto space-y-6">
        {/* Host Welcome Card */}
        <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-2xl flex flex-col md:flex-row items-center gap-4">
          <img
            src={currentUser?.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80'}
            alt={currentUser?.name || 'Local Host'}
            className="w-20 h-20 rounded-2xl object-cover shrink-0 border-2 border-emerald-400 shadow-md"
          />
          <div className="text-center md:text-left flex-1">
            <h1 className="text-2xl font-black text-white">Chào buổi sáng, {currentUser?.name || 'traitymtrongtoi'}</h1>
            <p className="text-xs text-[#8bd6b6] mt-1 font-medium">Chủ nhà tại Ocean Breeze Villa, Làng nghề Nam Ô</p>
            <div className="mt-3 flex flex-wrap justify-center md:justify-start gap-2">
              <span className="text-xs font-bold bg-white/10 text-white px-3 py-1 rounded-full border border-white/10">12 Phòng</span>
              <span className="text-xs font-bold bg-white/10 text-amber-300 px-3 py-1 rounded-full border border-white/10 flex items-center gap-1">
                <span>4.9★</span>
                <span className="text-white/80">Đánh giá</span>
              </span>
            </div>
          </div>
        </div>

        {/* Priority 1 Action Area: Management Hub & Bookings (Right Below Welcome Card) */}
        <div className="space-y-3">
          <div className="flex gap-2 border-b border-white/10 pb-2 overflow-x-auto no-scrollbar">
            {[
              { id: 'overview', label: 'Đơn đặt phòng gần đây' },
              { id: 'rooms', label: 'Danh sách phòng' },
              { id: 'reviews', label: 'Đánh giá từ khách' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[#8bd6b6] text-[#002116] shadow-md font-black'
                    : 'bg-white/10 text-white/80 hover:bg-white/20'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-5 space-y-4 shadow-xl">
            <div className="flex justify-between items-center flex-wrap gap-2">
              <h3 className="font-extrabold text-base text-white">
                {activeTab === 'overview' && 'Đơn đặt phòng gần đây'}
                {activeTab === 'rooms' && 'Phòng đang cho thuê'}
                {activeTab === 'reviews' && 'Đánh giá từ khách du mục'}
              </h3>
              <button
                type="button"
                onClick={onNavigateAddRoom}
                className="px-3.5 py-2 bg-emerald-500 hover:bg-emerald-400 text-white rounded-xl text-xs font-bold transition-all shadow flex items-center gap-1.5 cursor-pointer active:scale-95"
              >
                <span className="material-symbols-outlined text-sm">add_circle</span>
                <span>Đăng phòng mới</span>
              </button>
            </div>

            {activeTab === 'overview' && (
              <div>
                {recentBookings.length === 0 ? (
                  <p className="text-xs text-white/50 italic py-2">
                    Chưa có đơn đặt phòng nào mới.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {recentBookings.map((booking) => (
                      <div
                        key={booking.id}
                        className="bg-white/10 p-4 rounded-2xl flex items-center justify-between border border-white/10 hover:bg-white/15 transition-all"
                      >
                        <div className="min-w-0 flex-1 pr-2">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="font-bold text-sm text-white truncate">{booking.guestName}</h4>
                            {booking.isInstant && (
                              <span className="text-[10px] font-black bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 px-2 py-0.5 rounded-full flex items-center gap-1 shrink-0">
                                <span className="material-symbols-outlined text-[11px]">bolt</span>
                                Đặt tức thời
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-white/60 mt-0.5 truncate">{booking.propertyTitle} • {booking.dates}</p>
                          <span className="text-[11px] text-emerald-400 font-bold block mt-0.5">{booking.totalPriceFormatted}</span>
                        </div>
                        <button
                          onClick={() => alert(`Mở cuộc trò chuyện gửi lời chào & hướng dẫn check-in cho ${booking.guestName}...`)}
                          className="px-3.5 py-1.5 bg-[#8bd6b6] text-[#002116] rounded-full text-xs font-black hover:bg-emerald-300 cursor-pointer shadow active:scale-95 transition-all flex items-center gap-1 shrink-0"
                        >
                          <span className="material-symbols-outlined text-sm">chat</span>
                          <span>Nhắn tin</span>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'rooms' && (
              <div className="space-y-3">
                <div className="p-4 bg-white/10 rounded-2xl border border-white/10 flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <h4 className="font-bold text-sm text-white">Studio Hướng Vườn & Bàn Làm Việc Công Thái Học</h4>
                    <p className="text-xs text-emerald-300 font-medium mt-0.5">Làng Nước Mắm Nam Ô • 480.000 VNĐ / Đêm</p>
                    <div className="mt-1.5 flex items-center gap-2">
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded font-bold">Đang hoạt động</span>
                      <span className="text-[10px] text-white/60">Wi-Fi 150Mbps • Tối đa 2 khách</span>
                    </div>
                  </div>
                  <button
                    onClick={onNavigateAddRoom}
                    className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold cursor-pointer border border-white/10"
                  >
                    Chỉnh sửa phòng
                  </button>
                </div>

                <div className="p-6 text-center border-2 border-dashed border-white/20 rounded-2xl bg-white/5">
                  <p className="text-xs text-white/70 mb-3">Bạn muốn đăng thêm phòng nghỉ mới cho khách du mục?</p>
                  <button
                    onClick={onNavigateAddRoom}
                    className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black transition-all shadow cursor-pointer inline-flex items-center gap-1.5 active:scale-95"
                  >
                    <span className="material-symbols-outlined text-sm">add_circle</span>
                    <span>Tạo tin đăng phòng</span>
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-3">
                <div className="p-4 bg-white/10 rounded-2xl border border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-white">Alex Riviera (Kỹ sư Phần Mềm - Mỹ)</span>
                    <span className="text-xs text-amber-400 font-black">5.0 ★</span>
                  </div>
                  <p className="text-xs text-white/85 leading-relaxed">
                    "Không gian tuyệt đối yên bình và riêng tư. Cô chủ Mai rất mến khách và tặng cả nước mắm Nam Ô nguyên chất. Bàn làm việc công thái học giúp làm việc cả ngày rất thoải mái!"
                  </p>
                  <div className="flex items-center gap-1 text-[10px] text-emerald-300 font-medium">
                    <span className="material-symbols-outlined text-xs">g_translate</span>
                    <span>Bản dịch Tiếng Việt (Nguyên bản: Tiếng Anh)</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Room Status Today Breakdown Bar */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-5 backdrop-blur-xl space-y-3 shadow-xl">
          <h2 className="text-xs font-black uppercase tracking-wider text-[#8bd6b6] flex items-center gap-1.5">
            <span className="material-symbols-outlined text-base">hotel</span>
            Tình trạng phòng hôm nay
          </h2>

          <div className="grid grid-cols-4 gap-2 text-center">
            <div className="bg-black/20 p-2.5 rounded-xl border border-white/5">
              <span className="text-[11px] text-white/60 block">Tổng số</span>
              <span className="text-lg font-black text-white">12</span>
            </div>
            <div className="bg-emerald-950/60 p-2.5 rounded-xl border border-emerald-500/30">
              <span className="text-[11px] text-emerald-300 block">Còn trống</span>
              <span className="text-lg font-black text-emerald-300">3</span>
            </div>
            <div className="bg-amber-950/60 p-2.5 rounded-xl border border-amber-500/30">
              <span className="text-[11px] text-amber-300 block">Đang ở</span>
              <span className="text-lg font-black text-amber-300">8</span>
            </div>
            <div className="bg-teal-950/60 p-2.5 rounded-xl border border-teal-500/30">
              <span className="text-[11px] text-teal-300 block">Đã xác nhận</span>
              <span className="text-lg font-black text-teal-300">1</span>
            </div>
          </div>
        </div>

        {/* Financial & Craft Village Activities */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Monthly Revenue */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-xl shadow-lg flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs text-white/60 font-medium">Doanh thu tháng</span>
              <span className="material-symbols-outlined text-emerald-400 text-lg">payments</span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-[#8bd6b6] mt-1">58.800.000 VNĐ</div>
            <span className="text-[11px] text-emerald-400 font-bold block mt-1">↑ +18% so với tháng trước</span>
          </div>

          {/* Craft Village Experience */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-xl shadow-lg flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs text-white/60 font-medium">Trải nghiệm Làng nghề</span>
              <span className="material-symbols-outlined text-amber-400 text-lg">palette</span>
            </div>
            <div className="text-2xl font-black text-amber-400 mt-1">42 Lượt khách</div>
            <span className="text-[11px] text-white/70 block mt-1">Workshop Nước Mắm Nam Ô</span>
          </div>
        </div>
      </main>

      {/* Floating Action Buttons (FABs) - Synchronized with Guest */}
      <div className="fixed bottom-24 right-5 flex flex-col gap-3.5 z-40 items-end">
        {/* FAB 1: Emergency Contact */}
        <button
          onClick={() => setIsEmergencyOpen(true)}
          className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-[#003829] to-emerald-600 text-white shadow-2xl flex items-center justify-center active:scale-92 border-2 border-white/40 hover:border-emerald-300 transition-all cursor-pointer group relative"
          title="Hỗ trợ khẩn cấp 24/7"
        >
          <span className="material-symbols-outlined text-2xl drop-shadow group-hover:scale-110 transition-transform">
            phone_in_talk
          </span>
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-red-500 border-2 border-white animate-pulse" />
        </button>

        {/* FAB 2: AI Chatbot Sheep */}
        <button
          onClick={() => setIsChatbotOpen(true)}
          className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-2xl flex items-center justify-center active:scale-92 border-2 border-white/40 hover:border-emerald-200 transition-all cursor-pointer group relative text-2xl"
          title="Trợ lý AI Cừu NomadNest (Sheep 🐑)"
        >
          <span className="group-hover:scale-115 transition-transform drop-shadow">
            🐑
          </span>
          <span className="absolute -top-1 -right-1 px-1.5 py-0.5 rounded-full bg-emerald-400 text-emerald-950 font-extrabold text-[9px] border border-white shadow">
            AI
          </span>
        </button>
      </div>

      {/* Modals */}
      <EmergencyModal
        isOpen={isEmergencyOpen}
        onClose={() => setIsEmergencyOpen(false)}
      />
      <AIChatbotModal
        isOpen={isChatbotOpen}
        onClose={() => setIsChatbotOpen(false)}
      />
    </div>
  );
};
