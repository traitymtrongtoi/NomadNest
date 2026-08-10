import React, { useEffect, useState } from 'react';
import { User } from '../../types';
import { checkSupabaseConnection } from '../../lib/supabase';

interface AccountScreenProps {
  currentUser: User | null;
  onLogout: () => void;
  onOpenQuickRoles?: () => void;
}

export const AccountScreen: React.FC<AccountScreenProps> = ({
  currentUser,
  onLogout,
  onOpenQuickRoles
}) => {
  const [supabaseStatus, setSupabaseStatus] = useState<string>('Đang kiểm tra Supabase...');

  useEffect(() => {
    checkSupabaseConnection().then(res => {
      setSupabaseStatus(res.message);
    });
  }, []);

  return (
    <div className="bg-[#002116] text-white min-h-screen pb-28 font-sans">
      {/* Top Header */}
      <header className="fixed top-0 w-full z-50 bg-[#002116]/90 backdrop-blur-xl flex items-center justify-between px-6 h-16 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary-fixed">person</span>
          <span className="font-bold text-lg text-white">Cá Nhân / Account</span>
        </div>
        <button
          onClick={onOpenQuickRoles}
          className="px-3 py-1 bg-white/15 hover:bg-white/25 text-primary-fixed text-xs font-bold rounded-full border border-white/20 flex items-center gap-1"
        >
          <span className="material-symbols-outlined text-sm">published_with_changes</span>
          <span>Đổi Role Test</span>
        </button>
      </header>

      <main className="pt-20 px-6 max-w-2xl mx-auto space-y-6">
        {/* Profile Card */}
        <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-2xl flex items-center gap-4">
          <img
            src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover border-2 border-primary-fixed shrink-0"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold text-white">{currentUser?.name || 'Sarah Johnson'}</h1>
              <span className="material-symbols-outlined text-primary-fixed text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
            </div>
            <p className="text-xs text-primary-fixed-dim mt-0.5">{currentUser?.email || 'sarah.j@digitalnomad.io'}</p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-1 px-3 py-1 bg-primary-fixed text-on-primary-fixed rounded-full text-[10px] font-bold">
                <span className="material-symbols-outlined text-xs">workspace_premium</span>
                {currentUser?.badge || 'Premium Nomad Member'}
              </div>
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full text-[10px] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Supabase Connected</span>
              </div>
            </div>
            <p className="text-[11px] text-emerald-200/70 mt-1.5 font-mono truncate">{supabaseStatus}</p>
          </div>
        </div>

        {/* Menu Options Group 1 */}
        <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl overflow-hidden shadow-xl">
          <div className="p-4 border-b border-white/10 text-xs font-bold uppercase tracking-wider text-primary-fixed">
            Hành Trình & Đặt Phòng
          </div>

          <div
            onClick={() => alert('Danh sách chỗ ở đã đặt: Ocean Breeze Villa (12/11 - 15/11/2026)')}
            className="p-4 flex items-center justify-between hover:bg-white/10 transition-colors cursor-pointer border-b border-white/5"
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary-fixed">receipt_long</span>
              <span className="text-sm font-semibold">Chỗ Ở Đã Đặt (My Bookings)</span>
            </div>
            <span className="material-symbols-outlined text-white/50 text-base">chevron_right</span>
          </div>

          <div
            onClick={() => alert('Danh sách địa điểm ưa thích: Nam O Village, Ocean Breeze Villa')}
            className="p-4 flex items-center justify-between hover:bg-white/10 transition-colors cursor-pointer border-b border-white/5"
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary-fixed">favorite</span>
              <span className="text-sm font-semibold">Địa Điểm Đã Lưu (Saved)</span>
            </div>
            <span className="material-symbols-outlined text-white/50 text-base">chevron_right</span>
          </div>

          <div
            onClick={() => alert('Lịch sử di chuyển Grab & Trải nghiệm Làng nghề')}
            className="p-4 flex items-center justify-between hover:bg-white/10 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary-fixed">route</span>
              <span className="text-sm font-semibold">Nhật Ký Hành Trình (My Journey)</span>
            </div>
            <span className="material-symbols-outlined text-white/50 text-base">chevron_right</span>
          </div>
        </div>

        {/* Menu Options Group 2 */}
        <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl overflow-hidden shadow-xl">
          <div className="p-4 border-b border-white/10 text-xs font-bold uppercase tracking-wider text-primary-fixed">
            Cài Đặt & Thanh Toán
          </div>

          <div
            onClick={() => alert('Phương thức thanh toán: Visa **** 4242 (Active)')}
            className="p-4 flex items-center justify-between hover:bg-white/10 transition-colors cursor-pointer border-b border-white/5"
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary-fixed">credit_card</span>
              <span className="text-sm font-semibold">Thanh Toán & Thẻ (Payments)</span>
            </div>
            <span className="material-symbols-outlined text-white/50 text-base">chevron_right</span>
          </div>

          <div
            onClick={() => alert('Ngôn ngữ hiện tại: English / Tiếng Việt')}
            className="p-4 flex items-center justify-between hover:bg-white/10 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary-fixed">language</span>
              <span className="text-sm font-semibold">Ngôn Ngữ & Ứng Dụng</span>
            </div>
            <span className="text-xs text-primary-fixed-dim font-bold">Tiếng Việt / EN</span>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={onLogout}
          className="w-full h-14 bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30 font-bold rounded-2xl transition-all flex items-center justify-center gap-2 text-sm shadow"
        >
          <span className="material-symbols-outlined text-base">logout</span>
          <span>Đăng Xuất / Đổi Màn Hình Đăng Nhập</span>
        </button>
      </main>
    </div>
  );
};
