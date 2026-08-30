import React, { useEffect, useState } from 'react';

export interface BookingItem {
  id: string;
  propertyTitle: string;
  propertyImage?: string;
  location?: string;
  villageName?: string;
  checkIn: string;
  checkOut: string;
  nightsCount: number;
  guestsCount?: number;
  totalPrice: string | number;
  rawTotalPrice?: number;
  paymentMethod?: string;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  createdAt?: string;
}

interface MyBookingsScreenProps {
  onBack: () => void;
  onExplore: () => void;
}

export const MyBookingsScreen: React.FC<MyBookingsScreenProps> = ({
  onBack,
  onExplore,
}) => {
  const [bookings, setBookings] = useState<BookingItem[]>([]);
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'completed'>('all');

  const loadBookings = () => {
    try {
      // 1. Read from localStorage 'myBookings'
      const myBookingsData = localStorage.getItem('myBookings');
      if (myBookingsData) {
        const parsed = JSON.parse(myBookingsData);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setBookings(parsed);
          return;
        }
      }

      // Fallback check from 'nomad_bookings' if myBookings was empty
      const legacyData = localStorage.getItem('nomad_bookings');
      if (legacyData) {
        const parsed = JSON.parse(legacyData);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setBookings(parsed);
          // Sync to myBookings
          localStorage.setItem('myBookings', JSON.stringify(parsed));
          return;
        }
      }

      setBookings([]);
    } catch (err) {
      console.error('Error loading bookings:', err);
      setBookings([]);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const handleCancelBooking = (bookingId: string) => {
    if (window.confirm('Bạn có chắc chắn muốn hủy đơn đặt phòng này không?')) {
      const updated = bookings.filter((b) => b.id !== bookingId);
      setBookings(updated);
      localStorage.setItem('myBookings', JSON.stringify(updated));
      localStorage.setItem('nomad_bookings', JSON.stringify(updated));
    }
  };

  const filteredBookings = bookings.filter((item) => {
    if (filter === 'upcoming') return item.status === 'confirmed' || item.status === 'pending';
    if (filter === 'completed') return item.status === 'completed';
    return true;
  });

  return (
    <div className="bg-gradient-to-br from-[#00281D] via-[#001D15] to-[#00120D] text-white min-h-screen pb-28 font-sans antialiased">
      {/* Top Header with Back Button */}
      <header className="fixed top-0 w-full z-50 bg-[#00281D]/95 backdrop-blur-xl flex items-center justify-between px-5 h-16 border-b border-white/10 shadow-lg">
        <button
          id="btn-back-from-bookings"
          onClick={onBack}
          type="button"
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 flex items-center justify-center text-white transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-xl">arrow_back</span>
        </button>
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary-fixed">receipt_long</span>
          <h1 className="font-extrabold text-base text-white tracking-tight">Chuyến Đi Của Tôi (My Bookings)</h1>
        </div>
        <div className="w-10 flex justify-end">
          <span className="text-xs bg-emerald-500/20 text-emerald-300 font-bold px-2 py-1 rounded-full border border-emerald-500/30">
            {bookings.length}
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20 px-4 max-w-2xl mx-auto w-full space-y-5">
        
        {/* Filters */}
        {bookings.length > 0 && (
          <div className="flex items-center gap-2 p-1 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md">
            <button
              onClick={() => setFilter('all')}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                filter === 'all'
                  ? 'bg-primary-fixed text-on-primary-fixed shadow-md'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              Tất cả ({bookings.length})
            </button>
            <button
              onClick={() => setFilter('upcoming')}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                filter === 'upcoming'
                  ? 'bg-primary-fixed text-on-primary-fixed shadow-md'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              Sắp tới
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                filter === 'completed'
                  ? 'bg-primary-fixed text-on-primary-fixed shadow-md'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              Hoàn thành
            </button>
          </div>
        )}

        {/* EMPTY STATE */}
        {bookings.length === 0 ? (
          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 text-center space-y-6 shadow-2xl my-8">
            <div className="w-24 h-24 rounded-full bg-emerald-500/10 border-2 border-dashed border-emerald-400/40 text-emerald-300 flex items-center justify-center mx-auto shadow-inner">
              <span className="material-symbols-outlined text-5xl">luggage</span>
            </div>
            
            <div className="space-y-2">
              <h2 className="text-xl font-black text-white">Bạn chưa có chuyến đi nào</h2>
              <p className="text-xs text-white/60 max-w-sm mx-auto leading-relaxed">
                Khám phá ngay các homestay làng nghề thủ công độc đáo tại Đà Nẵng và đặt phòng trải nghiệm cùng nghệ nhân bản địa.
              </p>
            </div>

            <button
              id="btn-explore-now"
              type="button"
              onClick={onExplore}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 active:scale-95 text-[#002116] font-extrabold text-sm rounded-2xl shadow-xl transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg">travel_explore</span>
              <span>Khám phá ngay</span>
            </button>
          </div>
        ) : (
          /* BOOKING CARDS LIST */
          <div className="space-y-4">
            {filteredBookings.map((item) => (
              <div
                key={item.id}
                className="bg-white/10 border border-white/15 backdrop-blur-xl rounded-3xl p-5 shadow-2xl space-y-4 hover:border-emerald-400/40 transition-all group"
              >
                {/* Header of Card: Status & ID */}
                <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span className="font-extrabold text-emerald-300 uppercase tracking-wider text-[11px]">
                      {item.status === 'confirmed' ? 'Đã xác nhận' : item.status}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-white/50">Mã: #{item.id.slice(-6)}</span>
                </div>

                {/* Property Details */}
                <div className="flex gap-4 items-start">
                  <img
                    src={
                      item.propertyImage ||
                      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=400&q=80'
                    }
                    alt={item.propertyTitle}
                    className="w-24 h-24 rounded-2xl object-cover shrink-0 border border-white/20 shadow-md group-hover:scale-105 transition-transform"
                  />
                  <div className="flex-1 min-w-0 space-y-1">
                    {item.villageName && (
                      <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-wider block">
                        {item.villageName}
                      </span>
                    )}
                    <h3 className="text-base font-extrabold text-white leading-snug truncate">
                      {item.propertyTitle}
                    </h3>
                    {item.location && (
                      <p className="text-xs text-white/70 flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs text-emerald-400">location_on</span>
                        <span className="truncate">{item.location}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Date & Guest Info Grid */}
                <div className="bg-black/30 border border-white/10 rounded-2xl p-3 grid grid-cols-2 gap-2 text-xs">
                  <div className="space-y-0.5">
                    <span className="text-[10px] uppercase font-bold text-emerald-300/80">Lịch Trình</span>
                    <p className="font-extrabold text-white flex items-center gap-1 text-[11px]">
                      <span className="material-symbols-outlined text-xs text-emerald-400">calendar_today</span>
                      <span>{item.checkIn} - {item.checkOut}</span>
                    </p>
                  </div>
                  <div className="space-y-0.5 text-right">
                    <span className="text-[10px] uppercase font-bold text-emerald-300/80">Thời Gian & Khách</span>
                    <p className="font-extrabold text-white flex items-center justify-end gap-1 text-[11px]">
                      <span className="material-symbols-outlined text-xs text-emerald-400">group</span>
                      <span>{item.nightsCount || 1} Đêm • {item.guestsCount || 1} Khách</span>
                    </p>
                  </div>
                </div>

                {/* Footer: Price & Actions */}
                <div className="pt-2 flex items-center justify-between border-t border-white/10">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-white/50 block">Tổng thanh toán</span>
                    <span className="text-base font-extrabold text-emerald-300">
                      {typeof item.totalPrice === 'number'
                        ? `${item.totalPrice.toLocaleString('vi-VN')} VNĐ`
                        : item.totalPrice}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => alert(`Chi tiết đặt phòng #${item.id}\nHomestay: ${item.propertyTitle}\nLịch trình: ${item.checkIn} - ${item.checkOut}`)}
                      className="px-3 py-1.5 bg-white/10 hover:bg-white/20 active:scale-95 text-xs font-bold rounded-xl transition-all text-white border border-white/15"
                    >
                      Chi tiết
                    </button>
                    <button
                      onClick={() => handleCancelBooking(item.id)}
                      className="px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 active:scale-95 text-xs font-bold rounded-xl transition-all text-red-300 border border-red-500/20"
                    >
                      Hủy
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </main>
    </div>
  );
};
