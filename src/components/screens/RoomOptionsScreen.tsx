import React, { useState, useEffect } from 'react';
import { Village } from '../../types';

interface RoomOptionsScreenProps {
  village: Village;
  onBack: () => void;
}

export interface RoomItem {
  id: string;
  title: string;
  villageName?: string;
  image: string;
  images?: string[];
  price: string;
  pricing?: {
    nightlyVND?: string;
    weeklyVND?: string;
    monthlyVND?: string;
  };
  description: string;
  maxGuests: number;
  amenities?: string[];
  createdAt?: string;
}

export const RoomOptionsScreen: React.FC<RoomOptionsScreenProps> = ({
  village,
  onBack
}) => {
  // Helper to format ISO YYYY-MM-DD to DD/MM/YYYY
  const formatDateDisplay = (isoStr: string) => {
    if (!isoStr) return '--/--/----';
    const parts = isoStr.split('-');
    if (parts.length !== 3) return isoStr;
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  };

  // Get today's ISO date string
  const getTodayISO = () => {
    const today = new Date();
    const y = today.getFullYear();
    const m = String(today.getMonth() + 1).padStart(2, '0');
    const d = String(today.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  // Helper to calculate total nights
  const getNightsCount = (checkIn: string, checkOut: string) => {
    const d1 = new Date(checkIn);
    const d2 = new Date(checkOut);
    const diffTime = d2.getTime() - d1.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  };

  // Filter Bar States: Check-in / Check-out dates and Guest count
  const todayISO = getTodayISO();
  const [checkInDate, setCheckInDate] = useState<string>('2026-08-10');
  const [checkOutDate, setCheckOutDate] = useState<string>('2026-08-15');
  const [guestCount, setGuestCount] = useState<number>(1);

  // Calendar Popup Modal States
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
  const [activeDateTab, setActiveDateTab] = useState<'checkIn' | 'checkOut'>('checkIn');
  const [viewYear, setViewYear] = useState<number>(2026);
  const [viewMonth, setViewMonth] = useState<number>(7); // 0-indexed: 7 = August

  // Dynamic state populated from localStorage 'nomad_rooms'
  const [availableRooms, setAvailableRooms] = useState<RoomItem[]>([]);
  const [bookingSuccessModal, setBookingSuccessModal] = useState<string | null>(null);

  // Read saved rooms from localStorage on mount and sync state
  useEffect(() => {
    const loadSavedRooms = () => {
      try {
        const savedRooms = JSON.parse(localStorage.getItem('nomad_rooms') || '[]');
        setAvailableRooms(savedRooms);
      } catch (err) {
        console.error('Error reading saved rooms from localStorage:', err);
        setAvailableRooms([]);
      }
    };

    loadSavedRooms();

    window.addEventListener('storage', loadSavedRooms);
    return () => window.removeEventListener('storage', loadSavedRooms);
  }, []);

  const handleBookRoom = (room: RoomItem) => {
    setBookingSuccessModal(room.title);
  };

  // Open calendar popup with targeted active tab
  const handleOpenCalendar = (target: 'checkIn' | 'checkOut') => {
    setActiveDateTab(target);
    const targetDateStr = target === 'checkIn' ? checkInDate : checkOutDate;
    if (targetDateStr) {
      const parts = targetDateStr.split('-');
      if (parts.length === 3) {
        setViewYear(parseInt(parts[0], 10));
        setViewMonth(parseInt(parts[1], 10) - 1);
      }
    }
    setIsCalendarOpen(true);
  };

  // Month navigation logic
  const handlePrevMonth = () => {
    const now = new Date();
    const currentRealYear = now.getFullYear();
    const currentRealMonth = now.getMonth();

    if (viewYear < currentRealYear || (viewYear === currentRealYear && viewMonth <= currentRealMonth)) {
      return; // Prevent navigating into past months
    }

    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(prev => prev - 1);
    } else {
      setViewMonth(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(prev => prev + 1);
    } else {
      setViewMonth(prev => prev + 1);
    }
  };

  // Calendar Day Selection Logic
  const handleSelectDay = (dayNum: number) => {
    const selectedMonthStr = String(viewMonth + 1).padStart(2, '0');
    const selectedDayStr = String(dayNum).padStart(2, '0');
    const selectedISO = `${viewYear}-${selectedMonthStr}-${selectedDayStr}`;

    if (activeDateTab === 'checkIn') {
      setCheckInDate(selectedISO);
      // Auto-adjust check-out date if check-out is <= check-in
      if (checkOutDate <= selectedISO) {
        const nextDayDate = new Date(viewYear, viewMonth, dayNum + 1);
        const ny = nextDayDate.getFullYear();
        const nm = String(nextDayDate.getMonth() + 1).padStart(2, '0');
        const nd = String(nextDayDate.getDate()).padStart(2, '0');
        setCheckOutDate(`${ny}-${nm}-${nd}`);
      }
      // Switch active tab to checkOut for smooth UX
      setActiveDateTab('checkOut');
    } else {
      // Must be after check-in date
      if (selectedISO > checkInDate) {
        setCheckOutDate(selectedISO);
      }
    }
  };

  // Generate Days Grid for Calendar
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDayIndex = (new Date(viewYear, viewMonth, 1).getDay() + 6) % 7; // Monday = 0

  const monthNamesVi = [
    'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
    'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
  ];

  return (
    <div className="bg-gradient-to-br from-[#00281D] via-[#001D15] to-[#00120D] text-white min-h-screen flex flex-col pb-28 font-sans">
      {/* Top Header */}
      <header className="fixed top-0 w-full z-50 bg-[#00281D]/95 backdrop-blur-xl flex items-center justify-between px-5 h-16 border-b border-white/10 shadow-lg">
        <button
          onClick={onBack}
          type="button"
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-xl">arrow_back</span>
        </button>
        <div className="text-center">
          <h1 className="font-extrabold text-base text-white">Danh Sách Phòng Trống</h1>
          <p className="text-[11px] text-emerald-300 font-medium">{village?.name || 'Làng Nghề Đà Nẵng'}</p>
        </div>
        <div className="w-10" />
      </header>

      {/* Sticky Top Filter Bar (Interactive Date Picker & Guest Count) */}
      <div className="sticky top-16 z-40 bg-[#003829]/95 backdrop-blur-md border-b border-white/15 px-4 py-3 shadow-md">
        <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {/* Filter 1: Interactive Date Picker Selector (Manual Input Disabled) */}
          <div
            onClick={() => handleOpenCalendar('checkIn')}
            className="bg-black/40 border border-white/20 hover:border-emerald-400/80 rounded-2xl p-2.5 flex items-center gap-3 cursor-pointer transition-all hover:bg-black/50 active:scale-[0.99] group shadow-inner"
            title="Bấm để chọn ngày Check-in / Check-out"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-xl">calendar_month</span>
            </div>

            <div className="flex-1 flex items-center justify-between gap-2 text-xs">
              {/* Check-in Column */}
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenCalendar('checkIn');
                }}
                className="flex-1 rounded-lg p-1 transition-colors hover:bg-white/10"
              >
                <span className="block text-[9px] uppercase tracking-wider text-emerald-300 font-bold">Check-in</span>
                <span className="text-sm font-extrabold text-white tracking-wide block mt-0.5">
                  {formatDateDisplay(checkInDate)}
                </span>
              </div>

              <span className="text-emerald-400 font-extrabold text-sm">-</span>

              {/* Check-out Column */}
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenCalendar('checkOut');
                }}
                className="flex-1 rounded-lg p-1 transition-colors hover:bg-white/10 text-right"
              >
                <span className="block text-[9px] uppercase tracking-wider text-emerald-300 font-bold">Check-out</span>
                <span className="text-sm font-extrabold text-white tracking-wide block mt-0.5">
                  {formatDateDisplay(checkOutDate)}
                </span>
              </div>
            </div>
          </div>

          {/* Filter 2: Chọn Số Lượng Khách (Guest Count Selector) */}
          <div className="bg-black/40 border border-white/20 rounded-2xl p-2.5 flex items-center justify-between shadow-inner">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-xl">group</span>
              </div>
              <div>
                <label className="block text-[9px] uppercase tracking-wider text-emerald-300 font-bold">Số khách</label>
                <span className="text-xs font-bold text-white">{guestCount} Nomad / Khách</span>
              </div>
            </div>
            <div className="flex items-center gap-1 bg-white/10 rounded-xl p-1 border border-white/10">
              <button
                type="button"
                onClick={() => setGuestCount(prev => Math.max(1, prev - 1))}
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white font-bold text-sm transition-colors cursor-pointer active:scale-95"
              >
                -
              </button>
              <span className="w-6 text-center text-xs font-bold text-white">{guestCount}</span>
              <button
                type="button"
                onClick={() => setGuestCount(prev => prev + 1)}
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white font-bold text-sm transition-colors cursor-pointer active:scale-95"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area (Room List / Empty State) */}
      <main className="flex-1 mt-6 px-4 max-w-2xl mx-auto w-full flex flex-col justify-start">
        {availableRooms.length > 0 ? (
          <div className="space-y-5">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-extrabold text-emerald-300 uppercase tracking-wider">
                Phòng do Host vừa đăng tải ({availableRooms.length})
              </span>
              <span className="text-[11px] text-white/60">
                Được cập nhật trực tiếp từ Local Host
              </span>
            </div>

            {availableRooms.map((room) => (
              <div
                key={room.id}
                className="bg-white/10 border border-white/20 hover:border-emerald-400/50 rounded-3xl overflow-hidden p-5 backdrop-blur-md shadow-2xl transition-all space-y-3"
              >
                {/* Room Image & Badge */}
                <div className="relative h-52 w-full overflow-hidden rounded-2xl bg-black/40">
                  <img
                    src={room.image || room.images?.[0] || 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80'}
                    alt={room.title}
                    className="w-full h-full object-cover"
                  />
                  {room.villageName && (
                    <div className="absolute top-3 left-3 bg-[#00281D]/80 backdrop-blur-md border border-white/20 text-[#8bd6b6] text-[10px] font-extrabold px-3 py-1 rounded-full shadow">
                      {room.villageName}
                    </div>
                  )}
                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs text-amber-400">group</span>
                    <span>Tối đa {room.maxGuests || 2} khách</span>
                  </div>
                </div>

                {/* Title & Description */}
                <div>
                  <h3 className="text-lg font-extrabold text-white leading-snug">{room.title}</h3>
                  <p className="text-xs text-white/70 mt-1 line-clamp-2 leading-relaxed">
                    {room.description}
                  </p>
                </div>

                {/* Amenities Pills */}
                {room.amenities && room.amenities.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {room.amenities.map((amenity, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-semibold bg-emerald-950/60 text-emerald-300 border border-emerald-500/30 px-2.5 py-0.5 rounded-full"
                      >
                        ✓ {amenity}
                      </span>
                    ))}
                  </div>
                )}

                {/* Price & Booking Button */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-3">
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-white/50">Mức giá niêm yết</span>
                    <span className="text-base font-extrabold text-emerald-300">
                      {room.price || (room.pricing?.nightlyVND ? `${room.pricing.nightlyVND} VNĐ / đêm` : 'Liên hệ Host')}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleBookRoom(room)}
                    className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-extrabold text-xs rounded-xl shadow-lg transition-all active:scale-95 cursor-pointer flex items-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-base">bookmark_add</span>
                    <span>Đặt Phòng Ngay</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State when availableRooms.length === 0 */
          <div className="my-10 py-12 px-6 bg-white/5 border border-white/15 backdrop-blur-md rounded-3xl text-center flex flex-col items-center justify-center shadow-2xl">
            {/* Illustrated Icon */}
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300 mb-4 shadow-inner">
              <span className="material-symbols-outlined text-4xl">bed_view</span>
            </div>

            {/* Title & Exact Specified Message */}
            <h3 className="text-lg font-extrabold text-white mb-2">Chưa Có Phòng Trống</h3>
            <p className="text-sm text-emerald-100/90 leading-relaxed max-w-md font-medium">
              Hiện chưa có phòng nào được Host đăng tải cho thời gian này.
            </p>

            <p className="text-xs text-white/50 mt-4 italic">
              Vui lòng thử chọn khoảng thời gian khác hoặc liên hệ Host địa phương qua tính năng Chat.
            </p>
          </div>
        )}
      </main>

      {/* INTERACTIVE CALENDAR POPUP MODAL (Manual Input Disabled) */}
      {isCalendarOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#00281D] border border-white/20 rounded-3xl p-5 sm:p-6 w-full max-w-md text-white shadow-2xl relative space-y-4">
            {/* Header & Close Button */}
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <div>
                <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-400">calendar_month</span>
                  <span>Chọn Ngày Lưu Trú</span>
                </h3>
                <p className="text-[11px] text-emerald-300">Không cho phép nhập tay bằng bàn phím</p>
              </div>
              <button
                type="button"
                onClick={() => setIsCalendarOpen(false)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            {/* Target Date Tabs (Check-in / Check-out) */}
            <div className="grid grid-cols-2 gap-2 bg-black/40 p-1.5 rounded-2xl border border-white/10">
              <button
                type="button"
                onClick={() => setActiveDateTab('checkIn')}
                className={`py-2 px-3 rounded-xl font-bold text-xs transition-all flex flex-col items-center justify-center cursor-pointer ${
                  activeDateTab === 'checkIn'
                    ? 'bg-[#8bd6b6] text-[#002116] shadow-md'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                <span className="text-[9px] uppercase tracking-wider font-extrabold">CHECK-IN</span>
                <span className="text-xs font-extrabold">{formatDateDisplay(checkInDate)}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveDateTab('checkOut')}
                className={`py-2 px-3 rounded-xl font-bold text-xs transition-all flex flex-col items-center justify-center cursor-pointer ${
                  activeDateTab === 'checkOut'
                    ? 'bg-[#8bd6b6] text-[#002116] shadow-md'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                <span className="text-[9px] uppercase tracking-wider font-extrabold">CHECK-OUT</span>
                <span className="text-xs font-extrabold">{formatDateDisplay(checkOutDate)}</span>
              </button>
            </div>

            {/* Month Header Navigation */}
            <div className="flex items-center justify-between px-2 pt-1">
              <button
                type="button"
                onClick={handlePrevMonth}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <span className="material-symbols-outlined text-lg">chevron_left</span>
              </button>

              <span className="text-sm font-extrabold text-white tracking-wide">
                {monthNamesVi[viewMonth]} {viewYear}
              </span>

              <button
                type="button"
                onClick={handleNextMonth}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg">chevron_right</span>
              </button>
            </div>

            {/* Days of the Week */}
            <div className="grid grid-cols-7 text-center text-[11px] font-extrabold text-emerald-300 py-1">
              <span>T2</span>
              <span>T3</span>
              <span>T4</span>
              <span>T5</span>
              <span>T6</span>
              <span>T7</span>
              <span>CN</span>
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 gap-1 text-center">
              {/* Empty leading slots */}
              {Array.from({ length: firstDayIndex }).map((_, idx) => (
                <div key={`empty-${idx}`} className="h-9" />
              ))}

              {/* Day cells */}
              {Array.from({ length: daysInMonth }).map((_, idx) => {
                const dayNum = idx + 1;
                const mStr = String(viewMonth + 1).padStart(2, '0');
                const dStr = String(dayNum).padStart(2, '0');
                const dayISO = `${viewYear}-${mStr}-${dStr}`;

                const isPast = dayISO < todayISO;
                const isCheckIn = dayISO === checkInDate;
                const isCheckOut = dayISO === checkOutDate;
                const isInRange = dayISO > checkInDate && dayISO < checkOutDate;

                // Disable rule for Check-out: must be > checkInDate
                const isDisabledForCheckOut = activeDateTab === 'checkOut' && dayISO <= checkInDate;
                const isDisabled = isPast || isDisabledForCheckOut;

                let cellStyle = 'hover:bg-white/20 text-white font-medium';

                if (isDisabled) {
                  cellStyle = 'text-white/20 cursor-not-allowed opacity-40';
                } else if (isCheckIn) {
                  cellStyle = 'bg-[#8bd6b6] text-[#002116] font-extrabold shadow-lg rounded-full scale-105';
                } else if (isCheckOut) {
                  cellStyle = 'bg-teal-400 text-[#002116] font-extrabold shadow-lg rounded-full scale-105';
                } else if (isInRange) {
                  cellStyle = 'bg-emerald-500/25 text-emerald-200 font-bold rounded-lg';
                } else {
                  cellStyle = 'hover:bg-white/15 text-white font-bold rounded-full';
                }

                return (
                  <button
                    key={dayNum}
                    type="button"
                    disabled={isDisabled}
                    onClick={() => handleSelectDay(dayNum)}
                    className={`h-9 w-full flex items-center justify-center text-xs transition-all cursor-pointer ${cellStyle}`}
                  >
                    {dayNum}
                  </button>
                );
              })}
            </div>

            {/* Modal Bottom Summary & Confirm */}
            <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-3">
              <div className="text-xs">
                <span className="block text-[10px] text-white/50 uppercase font-bold">Tổng thời gian:</span>
                <span className="font-extrabold text-emerald-300">
                  {getNightsCount(checkInDate, checkOutDate)} Đêm Lưu Trú
                </span>
              </div>

              <button
                type="button"
                onClick={() => setIsCalendarOpen(false)}
                className="px-6 py-2.5 bg-[#8bd6b6] hover:bg-[#72c2a0] text-[#002116] font-extrabold text-xs rounded-xl shadow-lg transition-all active:scale-95 cursor-pointer"
              >
                Xác Nhận Ngày
              </button>
            </div>
          </div>
        </div>
      )}

      {/* BOOKING SUCCESS MODAL */}
      {bookingSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#00281D] border border-white/20 rounded-3xl p-6 w-full max-w-md text-white shadow-2xl relative text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-400 flex items-center justify-center mx-auto shadow-lg">
              <span className="material-symbols-outlined text-3xl">task_alt</span>
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-white">Yêu Cầu Đặt Phòng Đã Gửi!</h3>
              <p className="text-xs text-emerald-200/90 mt-1">
                Yêu cầu giữ chỗ cho phòng <strong className="text-white">"{bookingSuccessModal}"</strong> đã được chuyển tới Host địa phương.
              </p>
            </div>

            <div className="p-3 bg-white/10 rounded-2xl text-xs text-white/80 border border-white/10 space-y-1">
              <p className="font-bold text-emerald-300">Thời gian nhận phòng dự kiến:</p>
              <p>{checkInDate} đến {checkOutDate} ({guestCount} Khách)</p>
            </div>

            <button
              onClick={() => setBookingSuccessModal(null)}
              className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-[#002116] font-extrabold text-xs rounded-xl transition-all cursor-pointer shadow-lg"
            >
              Đóng & Tiếp Tục
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

