import React, { useState, useEffect } from 'react';
import { User } from '../../types';

interface HostReservationsScreenProps {
  currentUser?: User | null;
  onBack: () => void;
  onNavigateChat?: (guestName: string) => void;
}

interface ReservationItem {
  id: string;
  guestName: string;
  guestAvatar: string;
  propertyTitle: string;
  checkIn: string;
  checkOut: string;
  nightsCount: number;
  guestsCount: number;
  totalPriceFormatted: string;
  status: 'confirmed' | 'active' | 'completed' | 'cancelled';
  createdAt: string;
  notes?: string;
}

export const HostReservationsScreen: React.FC<HostReservationsScreenProps> = ({
  currentUser,
  onBack,
  onNavigateChat
}) => {
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'active' | 'completed'>('all');
  const [reservations, setReservations] = useState<ReservationItem[]>([
    {
      id: 'res_001',
      guestName: 'Alex Rivera',
      guestAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
      propertyTitle: 'Studio Hướng Vườn & Bàn Làm Việc Công Thái Học',
      checkIn: '10/08/2026',
      checkOut: '15/08/2026',
      nightsCount: 5,
      guestsCount: 1,
      totalPriceFormatted: '2.400.000 VNĐ',
      status: 'active',
      createdAt: '08/08/2026',
      notes: 'Khách yêu cầu bàn ghế công thái học và kiểm tra tốc độ Wi-Fi trước khi nhận phòng.'
    },
    {
      id: 'res_002',
      guestName: 'Sarah Jenkins',
      guestAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
      propertyTitle: 'Phòng Ocean View Ban Công Riêng & Bếp Nấu Truyền Thống',
      checkIn: '18/08/2026',
      checkOut: '25/08/2026',
      nightsCount: 7,
      guestsCount: 2,
      totalPriceFormatted: '4.550.000 VNĐ',
      status: 'confirmed',
      createdAt: '12/08/2026',
      notes: 'Đăng ký thêm workshop làm nước mắm Nam Ô truyền thống vào sáng Thứ Bảy.'
    },
    {
      id: 'res_003',
      guestName: 'Minh Tuấn (Kỹ sư AI)',
      guestAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      propertyTitle: 'Căn Hộ Gác Lửng Yên Tĩnh Phong Cách Làng Nghề Thủ Công',
      checkIn: '01/08/2026',
      checkOut: '05/08/2026',
      nightsCount: 4,
      guestsCount: 1,
      totalPriceFormatted: '1.680.000 VNĐ',
      status: 'completed',
      createdAt: '28/07/2026',
      notes: 'Đã hoàn tất lưu trú và đánh giá 5 sao.'
    }
  ]);

  // Sync real-time reservations from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem('myBookings');
      if (raw) {
        const guestBookings = JSON.parse(raw);
        if (Array.isArray(guestBookings) && guestBookings.length > 0) {
          const mapped: ReservationItem[] = guestBookings.map((item: any, idx: number) => {
            const guestName = item.guestName || item.userName || item.name || 'Sarah Johnson (Nomad)';
            const propertyTitle = item.propertyTitle || item.title || 'Studio Homestay Làng Nam Ô';
            const checkIn = item.checkIn || '10/08/2026';
            const checkOut = item.checkOut || '15/08/2026';
            const nightsCount = item.nightsCount || 3;
            const guestsCount = item.guestsCount || 1;
            let priceDisplay = '2.550.000 VNĐ';
            if (item.totalPrice) {
              priceDisplay = item.totalPrice;
            } else if (item.rawTotalPrice) {
              priceDisplay = `${Number(item.rawTotalPrice).toLocaleString('vi-VN')} VNĐ`;
            }

            return {
              id: item.id || `local_res_${idx}`,
              guestName,
              guestAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
              propertyTitle,
              checkIn,
              checkOut,
              nightsCount,
              guestsCount,
              totalPriceFormatted: priceDisplay,
              status: (item.status as any) || 'confirmed',
              createdAt: 'Gần đây',
              notes: 'Đặt phòng trực tuyến qua ứng dụng NomadNest'
            };
          });

          // Merge and avoid duplicate IDs
          setReservations(prev => {
            const existingIds = new Set(prev.map(p => p.id));
            const fresh = mapped.filter(m => !existingIds.has(m.id));
            return [...fresh, ...prev];
          });
        }
      }
    } catch (err) {
      console.error('Error reading reservations:', err);
    }
  }, []);

  const filteredReservations = reservations.filter(item => {
    if (filter === 'upcoming') return item.status === 'confirmed';
    if (filter === 'active') return item.status === 'active';
    if (filter === 'completed') return item.status === 'completed';
    return true;
  });

  return (
    <div className="bg-[#002116] text-white min-h-screen pb-32 font-sans">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-[#002116]/95 backdrop-blur-xl flex items-center justify-between px-5 h-16 border-b border-white/10 shadow-lg">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
          title="Quay lại"
        >
          <span className="material-symbols-outlined text-xl">arrow_back</span>
        </button>
        <h1 className="font-extrabold text-base text-white">Quản lý Đơn đặt phòng</h1>
        <div className="w-10" />
      </header>

      <main className="pt-20 px-4 sm:px-6 max-w-3xl mx-auto space-y-5">
        {/* Metric Summary */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-2xl p-3.5 backdrop-blur-xl text-center">
            <span className="text-xs text-emerald-300 block">Đang ở</span>
            <span className="text-xl font-black text-emerald-300 mt-1 block">
              {reservations.filter(r => r.status === 'active').length}
            </span>
          </div>
          <div className="bg-teal-950/40 border border-teal-500/30 rounded-2xl p-3.5 backdrop-blur-xl text-center">
            <span className="text-xs text-teal-300 block">Sắp đến</span>
            <span className="text-xl font-black text-teal-300 mt-1 block">
              {reservations.filter(r => r.status === 'confirmed').length}
            </span>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 backdrop-blur-xl text-center">
            <span className="text-xs text-white/60 block">Đã hoàn tất</span>
            <span className="text-xl font-black text-white mt-1 block">
              {reservations.filter(r => r.status === 'completed').length}
            </span>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {[
            { id: 'all', label: 'Tất cả đơn đặt' },
            { id: 'active', label: 'Đang lưu trú' },
            { id: 'upcoming', label: 'Sắp nhận phòng' },
            { id: 'completed', label: 'Đã hoàn tất' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                filter === tab.id
                  ? 'bg-emerald-500 text-white shadow-md'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Reservation List */}
        <div className="space-y-4">
          {filteredReservations.length === 0 ? (
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 text-center text-white/60 text-xs">
              Không có đơn đặt phòng nào trong danh mục này.
            </div>
          ) : (
            filteredReservations.map(res => (
              <div
                key={res.id}
                className="bg-white/5 border border-white/10 rounded-3xl p-5 backdrop-blur-xl shadow-xl space-y-4 hover:border-emerald-400/40 transition-all"
              >
                {/* Guest Profile Bar */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={res.guestAvatar}
                      alt={res.guestName}
                      className="w-12 h-12 rounded-full object-cover border-2 border-emerald-400 shadow-md"
                    />
                    <div>
                      <h2 className="font-extrabold text-sm text-white">{res.guestName}</h2>
                      <p className="text-[11px] text-white/60">Mã đơn: #{res.id.slice(-6).toUpperCase()}</p>
                    </div>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border shadow-sm ${
                      res.status === 'active'
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                        : res.status === 'confirmed'
                        ? 'bg-teal-500/20 text-teal-300 border-teal-500/40'
                        : 'bg-white/10 text-white/70 border-white/20'
                    }`}
                  >
                    {res.status === 'active'
                      ? 'Đang ở'
                      : res.status === 'confirmed'
                      ? 'Đã xác nhận'
                      : 'Đã trả phòng'}
                  </span>
                </div>

                {/* Property & Dates */}
                <div className="bg-black/20 rounded-2xl p-3.5 border border-white/5 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-300">
                    <span className="material-symbols-outlined text-base">hotel</span>
                    <span>{res.propertyTitle}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-white/5">
                    <div>
                      <span className="text-[10px] text-white/50 block">Nhận phòng (Check-in)</span>
                      <span className="font-bold text-white">{res.checkIn} (14:00)</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-white/50 block">Trả phòng (Check-out)</span>
                      <span className="font-bold text-white">{res.checkOut} (12:00)</span>
                    </div>
                  </div>

                  {res.notes && (
                    <div className="pt-2 text-[11px] text-white/70 bg-white/5 p-2 rounded-xl">
                      <span className="font-bold text-amber-300">Ghi chú của khách: </span>
                      {res.notes}
                    </div>
                  )}
                </div>

                {/* Footer & Actions */}
                <div className="flex items-center justify-between pt-1">
                  <div>
                    <span className="text-xs text-white/60 block">Tổng tiền chi trả</span>
                    <span className="text-base font-black text-emerald-300">{res.totalPriceFormatted}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        if (onNavigateChat) {
                          onNavigateChat(res.guestName);
                        } else {
                          alert(`Đang mở cuộc trò chuyện trực tiếp với khách ${res.guestName}...`);
                        }
                      }}
                      className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-400 hover:opacity-95 text-[#002116] rounded-xl text-xs font-black transition-all shadow cursor-pointer flex items-center gap-1.5 active:scale-95"
                    >
                      <span className="material-symbols-outlined text-sm font-bold">chat</span>
                      <span>Nhắn tin cho khách</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};
