import React, { useEffect, useState } from 'react';
import { User } from '../../types';
import { checkSupabaseConnection } from '../../lib/supabase';

interface AccountScreenProps {
  currentUser: User | null;
  initialMode?: 'guest' | 'host';
  onModeChange?: (newMode: 'guest' | 'host') => void;
  onLogout: () => void;
  onNavigateMyBookings?: () => void;
  onNavigateHostDashboard?: () => void;
  onNavigateHostListings?: () => void;
  onNavigateAddRoom?: () => void;
  onNavigateHostReservations?: () => void;
  onNavigateHostRevenue?: () => void;
  onNavigateHostEarnings?: () => void;
}

export const AccountScreen: React.FC<AccountScreenProps> = ({
  currentUser,
  initialMode = 'guest',
  onModeChange,
  onLogout,
  onNavigateMyBookings,
  onNavigateHostDashboard,
  onNavigateHostListings,
  onNavigateAddRoom,
  onNavigateHostReservations,
  onNavigateHostRevenue,
  onNavigateHostEarnings,
}) => {
  // 1. State to manage current mode (Guest vs Host)
  const [userMode, setUserMode] = useState<'guest' | 'host'>(() => {
    if (initialMode) return initialMode;
    return currentUser?.role === 'local_host' ? 'host' : 'guest';
  });

  const [supabaseStatus, setSupabaseStatus] = useState<string>('Checking database status...');

  useEffect(() => {
    checkSupabaseConnection().then(res => {
      setSupabaseStatus(res.message);
    });
  }, []);

  // Update internal mode if initialMode prop updates
  useEffect(() => {
    if (initialMode) {
      setUserMode(initialMode);
    }
  }, [initialMode]);

  // Handle Mode Toggle (Guest <-> Host)
  const handleToggleUserMode = () => {
    const nextMode: 'guest' | 'host' = userMode === 'guest' ? 'host' : 'guest';
    setUserMode(nextMode);
    if (onModeChange) {
      onModeChange(nextMode);
    }
  };

  return (
    <div className="bg-[#002116] text-white min-h-screen pb-32 font-sans">
      {/* Top Header */}
      <header className="fixed top-0 w-full z-50 bg-[#002116]/95 backdrop-blur-xl flex items-center justify-between px-6 h-16 border-b border-white/10 shadow-md">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#8bd6b6]">
            {userMode === 'host' ? 'storefront' : 'person'}
          </span>
          <span className="font-extrabold text-lg text-white">
            {userMode === 'host' ? 'Tài khoản Chủ nhà' : 'Nomad Account'}
          </span>
        </div>

        {/* Quick status pill */}
        <div className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-white/10 text-white/90 border border-white/15">
          {userMode === 'host' ? 'CHẾ ĐỘ CHỦ NHÀ' : 'GUEST MODE'}
        </div>
      </header>

      <main className="pt-20 px-4 sm:px-6 max-w-2xl mx-auto space-y-6">
        {/* Profile Card */}
        <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-5 sm:p-6 shadow-2xl space-y-5">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
                alt="Profile"
                className={`w-20 h-20 rounded-full object-cover border-2 shadow-lg shrink-0 ${
                  userMode === 'host' ? 'border-emerald-400' : 'border-[#8bd6b6]'
                }`}
              />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#002116] border border-white/20 flex items-center justify-center text-xs">
                <span
                  className="material-symbols-outlined text-sm text-[#8bd6b6]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  verified
                </span>
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black text-white truncate">
                  {currentUser?.name || (userMode === 'host' ? 'Chủ nhà Bản địa' : 'Nomad Traveler')}
                </h1>
              </div>
              <p className="text-xs text-white/60 mt-0.5 truncate">{currentUser?.email || 'user@nomadnest.local'}</p>

              <div className="mt-2.5 flex flex-wrap items-center gap-2">
                {/* Dynamic Badge based on userMode */}
                {userMode === 'guest' ? (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#8bd6b6] text-[#002116] rounded-full text-xs font-black shadow-sm">
                    <span className="material-symbols-outlined text-sm">workspace_premium</span>
                    <span>Nomad Member</span>
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-emerald-400 to-teal-400 text-[#002116] rounded-full text-xs font-black shadow-sm">
                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                      star
                    </span>
                    <span>Chủ nhà Tiêu biểu</span>
                  </div>
                )}

                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full text-[10px] font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>{userMode === 'host' ? 'Đã kết nối dữ liệu' : 'Database Connected'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= CONDITIONAL MENU SECTION ================= */}

        {/* 2A. GUEST MODE MENU: JOURNEY & RESERVATIONS */}
        {userMode === 'guest' && (
          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl overflow-hidden shadow-xl animate-fadeIn">
            <div className="p-4 border-b border-white/10 text-xs font-black uppercase tracking-wider text-[#8bd6b6] flex items-center justify-between">
              <span>JOURNEY & RESERVATIONS</span>
              <span className="text-[10px] text-white/50 lowercase font-normal">guest management</span>
            </div>

            {/* My Bookings */}
            <div
              id="menu-my-bookings"
              onClick={() => {
                if (onNavigateMyBookings) {
                  onNavigateMyBookings();
                } else {
                  alert('Opening: My Bookings');
                }
              }}
              className="p-4 flex items-center justify-between hover:bg-white/10 active:bg-white/15 active:scale-[0.99] transition-all cursor-pointer border-b border-white/5 group"
              style={{ cursor: 'pointer' }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#8bd6b6]/20 text-[#8bd6b6] flex items-center justify-center group-hover:bg-[#8bd6b6] group-hover:text-[#002116] transition-colors">
                  <span className="material-symbols-outlined text-xl">receipt_long</span>
                </div>
                <div>
                  <span className="text-sm font-bold text-white group-hover:text-[#8bd6b6] transition-colors">My Bookings</span>
                  <p className="text-xs text-white/60">View booked homestay rooms & trip history</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all text-base">chevron_right</span>
            </div>

            {/* Saved Stays */}
            <div
              id="menu-saved-stays"
              onClick={() => alert('Opening: Saved Stays & Experiences')}
              className="p-4 flex items-center justify-between hover:bg-white/10 active:bg-white/15 active:scale-[0.99] transition-all cursor-pointer border-b border-white/5 group"
              style={{ cursor: 'pointer' }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#8bd6b6]/20 text-[#8bd6b6] flex items-center justify-center group-hover:bg-[#8bd6b6] group-hover:text-[#002116] transition-colors">
                  <span className="material-symbols-outlined text-xl">favorite</span>
                </div>
                <div>
                  <span className="text-sm font-bold text-white group-hover:text-[#8bd6b6] transition-colors">Saved</span>
                  <p className="text-xs text-white/60">Saved craft villages, stays & craft experiences</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all text-base">chevron_right</span>
            </div>

            {/* My Journey Log */}
            <div
              id="menu-journey-log"
              onClick={() => alert('Opening: My Journey Log')}
              className="p-4 flex items-center justify-between hover:bg-white/10 active:bg-white/15 active:scale-[0.99] transition-all cursor-pointer group"
              style={{ cursor: 'pointer' }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#8bd6b6]/20 text-[#8bd6b6] flex items-center justify-center group-hover:bg-[#8bd6b6] group-hover:text-[#002116] transition-colors">
                  <span className="material-symbols-outlined text-xl">route</span>
                </div>
                <div>
                  <span className="text-sm font-bold text-white group-hover:text-[#8bd6b6] transition-colors">My Journey Log</span>
                  <p className="text-xs text-white/60">Travel itinerary, cultural footprints & activities</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all text-base">chevron_right</span>
            </div>
          </div>
        )}

        {/* 2B. HOST MODE MENU: HOSTING DASHBOARD */}
        {userMode === 'host' && (
          <div className="bg-white/5 border border-emerald-500/20 backdrop-blur-xl rounded-3xl overflow-hidden shadow-xl animate-fadeIn">
            <div className="p-4 border-b border-emerald-500/20 text-xs font-black uppercase tracking-wider text-emerald-400 flex items-center justify-between">
              <span>QUẢN LÝ ĐÓN KHÁCH</span>
              <span className="text-[10px] text-emerald-300/60 lowercase font-normal">quản lý vận hành</span>
            </div>

            {/* My Listings */}
            <div
              id="menu-host-listings"
              onClick={() => {
                if (onNavigateHostListings) {
                  onNavigateHostListings();
                } else if (onNavigateHostDashboard) {
                  onNavigateHostDashboard();
                } else {
                  alert('Đang mở: Danh sách phòng');
                }
              }}
              className="p-4 flex items-center justify-between hover:bg-white/10 active:bg-white/15 active:scale-[0.99] transition-all cursor-pointer border-b border-white/5 group"
              style={{ cursor: 'pointer' }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-[#002116] transition-colors">
                  <span className="material-symbols-outlined text-xl">domain</span>
                </div>
                <div>
                  <span className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">Danh sách phòng</span>
                  <p className="text-xs text-white/60">Quản lý phòng homestay, giá cả & tình trạng</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded-lg border border-emerald-500/30">
                  Hoạt động
                </span>
                <span className="material-symbols-outlined text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all text-base">chevron_right</span>
              </div>
            </div>

            {/* Reservations */}
            <div
              id="menu-host-reservations"
              onClick={() => {
                if (onNavigateHostReservations) {
                  onNavigateHostReservations();
                } else {
                  alert('Đang mở: Đơn đặt phòng');
                }
              }}
              className="p-4 flex items-center justify-between hover:bg-white/10 active:bg-white/15 active:scale-[0.99] transition-all cursor-pointer border-b border-white/5 group"
              style={{ cursor: 'pointer' }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-[#002116] transition-colors">
                  <span className="material-symbols-outlined text-xl">calendar_month</span>
                </div>
                <div>
                  <span className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">Đơn đặt phòng</span>
                  <p className="text-xs text-white/60">Quản lý đơn đặt, yêu cầu check-in & lịch trình</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span className="material-symbols-outlined text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all text-base">chevron_right</span>
              </div>
            </div>

            {/* Earnings / Revenue */}
            <div
              id="menu-host-earnings"
              onClick={() => {
                if (onNavigateHostRevenue) {
                  onNavigateHostRevenue();
                } else if (onNavigateHostEarnings) {
                  onNavigateHostEarnings();
                } else {
                  alert('Đang mở: Báo cáo Doanh thu');
                }
              }}
              className="p-4 flex items-center justify-between hover:bg-white/10 active:bg-white/15 active:scale-[0.99] transition-all cursor-pointer group"
              style={{ cursor: 'pointer' }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-[#002116] transition-colors">
                  <span className="material-symbols-outlined text-xl">account_balance_wallet</span>
                </div>
                <div>
                  <span className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">Doanh thu</span>
                  <p className="text-xs text-white/60">Tổng quan doanh thu, phương thức thanh toán & báo cáo</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all text-base">chevron_right</span>
            </div>
          </div>
        )}

        {/* Menu Options Group: SETTINGS & PAYMENT */}
        <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl overflow-hidden shadow-xl">
          <div className="p-4 border-b border-white/10 text-xs font-black uppercase tracking-wider text-[#8bd6b6]">
            {userMode === 'host' ? 'CÀI ĐẶT & THANH TOÁN' : 'SETTINGS & PAYMENT'}
          </div>

          <div
            id="menu-payments-cards"
            onClick={() => alert(userMode === 'host' ? 'Đang mở: Phương thức chi trả & Tài khoản ngân hàng' : 'Opening: Payment Methods & Cards')}
            className="p-4 flex items-center justify-between hover:bg-white/10 active:bg-white/15 active:scale-[0.99] transition-all cursor-pointer border-b border-white/5 group"
            style={{ cursor: 'pointer' }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#8bd6b6]/20 text-[#8bd6b6] flex items-center justify-center group-hover:bg-[#8bd6b6] group-hover:text-[#002116] transition-colors">
                <span className="material-symbols-outlined text-xl">credit_card</span>
              </div>
              <div>
                <span className="text-sm font-bold text-white group-hover:text-[#8bd6b6] transition-colors">
                  {userMode === 'host' ? 'Tài khoản ngân hàng & Chi trả' : 'Payments & Cards'}
                </span>
                <p className="text-xs text-white/60">
                  {userMode === 'host' ? 'Tài khoản ngân hàng & thiết lập nhận tiền' : 'Credit/Debit cards & transaction methods'}
                </p>
              </div>
            </div>
            <span className="material-symbols-outlined text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all text-base">chevron_right</span>
          </div>

          <div
            id="menu-app-language"
            onClick={() => alert('Language: English (US) / Tiếng Việt')}
            className="p-4 flex items-center justify-between hover:bg-white/10 active:bg-white/15 active:scale-[0.99] transition-all cursor-pointer group"
            style={{ cursor: 'pointer' }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#8bd6b6]/20 text-[#8bd6b6] flex items-center justify-center group-hover:bg-[#8bd6b6] group-hover:text-[#002116] transition-colors">
                <span className="material-symbols-outlined text-xl">language</span>
              </div>
              <div>
                <span className="text-sm font-bold text-white group-hover:text-[#8bd6b6] transition-colors">
                  {userMode === 'host' ? 'Ngôn ngữ ứng dụng' : 'App Language'}
                </span>
                <p className="text-xs text-white/60">English (US) / Tiếng Việt</p>
              </div>
            </div>
            <span className="text-xs text-[#8bd6b6] font-bold bg-[#8bd6b6]/10 px-2.5 py-1 rounded-lg border border-[#8bd6b6]/20">
              {userMode === 'host' ? 'Tiếng Việt' : 'English (US)'}
            </span>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={onLogout}
          className="w-full h-14 bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30 font-extrabold rounded-2xl transition-all flex items-center justify-center gap-2 text-sm shadow-lg cursor-pointer active:scale-95"
        >
          <span className="material-symbols-outlined text-lg">logout</span>
          <span>{userMode === 'host' ? 'Đăng xuất' : 'Sign Out'}</span>
        </button>
      </main>
    </div>
  );
};

