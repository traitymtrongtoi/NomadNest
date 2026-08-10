import React from 'react';
import { User } from '../../types';

interface HeaderProps {
  currentUser: User | null;
  onOpenNotifications?: () => void;
  onNavigateHome?: () => void;
  onOpenQuickRoles?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentUser,
  onOpenNotifications,
  onNavigateHome,
  onOpenQuickRoles
}) => {
  return (
    <header className="fixed top-0 w-full z-50 bg-[#0F6B57]/80 backdrop-blur-xl shadow-sm border-b border-white/10 flex items-center justify-between px-6 h-16 transition-all">
      <div
        onClick={onNavigateHome}
        className="flex items-center gap-2 cursor-pointer hover:opacity-90 active:scale-95 transition-all"
      >
        <span className="material-symbols-outlined text-white text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>spa</span>
        <span className="font-bold text-xl text-white tracking-tight">NomadNest</span>
      </div>

      <div className="flex items-center gap-3">
        {/* Quick Role Test Switcher Badge */}
        {onOpenQuickRoles && (
          <button
            onClick={onOpenQuickRoles}
            className="px-2.5 py-1 bg-white/15 hover:bg-white/25 text-white rounded-full text-xs font-semibold border border-white/20 flex items-center gap-1 shadow-sm transition-all"
            title="Đổi vai trò người dùng (Test)"
          >
            <span className="material-symbols-outlined text-sm text-primary-fixed">badge</span>
            <span className="hidden sm:inline">{currentUser?.name || 'Vai trò'}</span>
          </button>
        )}

        <button
          onClick={onOpenNotifications}
          className="text-white/90 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
        >
          <span className="material-symbols-outlined text-2xl">notifications</span>
        </button>

        <div className="w-8 h-8 rounded-full overflow-hidden border border-white/30 bg-white/20">
          <img
            src={currentUser?.avatar || 'https://lh3.googleusercontent.com/aida-public/AB6AXuAhrWvU8Q5qCwztacgo9tNsPyXw_PU1vQ5wMuwNbZMqDEvVPP_aN3ryYNGrbbSvlSHvRmGE0UGTrNGSgtXQHrWYGJYWOqEeVOl4c1SNF4oW8qCj-Px-xBR4wGvKiNiVgJBIIJvKmRcOlyRyE49PXZK1i0osNgGsZs6roshKPNaVz6y2lniMn8g9Ib3ylh_B64MvzlH4lQFEP8iEUzPUv627BHI4AvVjLTOa09K61tXR8reCHy15lV2jnw'}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </header>
  );
};
