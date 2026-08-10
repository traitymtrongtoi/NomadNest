import React from 'react';
import { UserRole } from '../../types';

interface RoleSelectionProps {
  onSelectRole: (role: UserRole) => void;
  lang: 'VI' | 'EN';
  onToggleLang: () => void;
}

export const RoleSelection: React.FC<RoleSelectionProps> = ({
  onSelectRole,
  lang,
  onToggleLang,
}) => {
  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center animate-fadeIn">
      {/* Welcome Banner */}
      <div className="text-center mb-8">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary-fixed/15 border border-primary-fixed/30 text-primary-fixed text-xs font-bold uppercase tracking-wider mb-3">
          <span className="material-symbols-outlined text-sm">handshake</span>
          <span>{lang === 'VI' ? 'Bước 1: Chọn Vai Trò' : 'Step 1: Role Selection'}</span>
        </span>
        <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-2 tracking-tight">
          {lang === 'VI' ? 'Bạn tham gia NomadNest với vai trò nào?' : 'How will you join NomadNest?'}
        </h1>
        <p className="text-xs md:text-sm text-primary-fixed-dim/90 max-w-md mx-auto leading-relaxed">
          {lang === 'VI'
            ? 'Vui lòng chọn vai trò để trải nghiệm giao diện và tính năng được cá nhân hóa cho bạn.'
            : 'Please select a role to unlock tailored sanctuary booking & host management tools.'}
        </p>
      </div>

      {/* 2 Big Interactive Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full mb-8">
        
        {/* Card 1: Digital Nomad (Guest) */}
        <button
          type="button"
          onClick={() => onSelectRole('nomad_user')}
          className="group text-left rounded-3xl p-6 bg-white/5 hover:bg-white/10 border border-white/15 hover:border-primary-fixed transition-all duration-300 shadow-xl hover:shadow-2xl flex flex-col justify-between relative overflow-hidden active:scale-98 cursor-pointer ring-0 hover:ring-2 hover:ring-primary-fixed"
        >
          {/* Top Background Glow */}
          <div className="absolute -right-8 -top-8 w-28 h-28 bg-primary-fixed/10 rounded-full blur-2xl group-hover:bg-primary-fixed/25 transition-all" />

          <div>
            <div className="w-14 h-14 rounded-2xl bg-primary-fixed text-on-primary-fixed flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-3xl">luggage</span>
            </div>
            
            <div className="inline-block px-2.5 py-0.5 rounded-md bg-white/10 text-[10px] font-bold uppercase tracking-wider text-primary-fixed mb-2">
              Guest / Visitor
            </div>

            <h2 className="text-xl font-bold text-white group-hover:text-primary-fixed transition-colors mb-2">
              {lang === 'VI' ? 'Tôi là Digital Nomad' : 'I am a Digital Nomad'}
            </h2>

            <p className="text-xs text-white/80 leading-relaxed">
              {lang === 'VI'
                ? 'Tìm kiếm chỗ ở và không gian làm việc tại các làng nghề.'
                : 'Discover co-living stays and peaceful work hubs inside authentic craft villages.'}
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-primary-fixed group-hover:translate-x-1 transition-transform">
            <span>{lang === 'VI' ? 'Chọn vai trò này' : 'Select this role'}</span>
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </div>
        </button>

        {/* Card 2: Local Host (Chủ nhà / Nghệ nhân) */}
        <button
          type="button"
          onClick={() => onSelectRole('local_host')}
          className="group text-left rounded-3xl p-6 bg-white/5 hover:bg-white/10 border border-white/15 hover:border-emerald-400 transition-all duration-300 shadow-xl hover:shadow-2xl flex flex-col justify-between relative overflow-hidden active:scale-98 cursor-pointer ring-0 hover:ring-2 hover:ring-emerald-400"
        >
          {/* Top Background Glow */}
          <div className="absolute -right-8 -top-8 w-28 h-28 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/25 transition-all" />

          <div>
            <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-3xl">storefront</span>
            </div>

            <div className="inline-block px-2.5 py-0.5 rounded-md bg-white/10 text-[10px] font-bold uppercase tracking-wider text-emerald-300 mb-2">
              Host / Artisan
            </div>

            <h2 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors mb-2">
              {lang === 'VI' ? 'Tôi là Local Host' : 'I am a Local Host'}
            </h2>

            <p className="text-xs text-white/80 leading-relaxed">
              {lang === 'VI'
                ? 'Cung cấp chỗ ở và chia sẻ văn hóa làng nghề truyền thống.'
                : 'Host global remote workers, share cultural heritage & manage workshop experiences.'}
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-emerald-300 group-hover:translate-x-1 transition-transform">
            <span>{lang === 'VI' ? 'Chọn vai trò này' : 'Select this role'}</span>
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </div>
        </button>

      </div>

      {/* Demo Test Quick Access (Admin & Role Preview) */}
      <div className="w-full bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10 shadow-lg text-center">
        <p className="text-[11px] font-bold text-white/60 uppercase tracking-wider mb-2 flex items-center justify-center gap-1">
          <span className="material-symbols-outlined text-xs">science</span>
          <span>{lang === 'VI' ? 'Truy cập nhanh cho Demo & Admin' : 'Quick Access for Demo & Admin'}</span>
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={() => onSelectRole('admin')}
            className="px-3 py-1.5 bg-amber-600/80 hover:bg-amber-500 text-white rounded-xl text-xs font-semibold transition-colors flex items-center gap-1 shadow"
          >
            <span className="material-symbols-outlined text-sm">admin_panel_settings</span>
            <span>Trải nghiệm Admin Dashboard</span>
          </button>
        </div>
      </div>
    </div>
  );
};
