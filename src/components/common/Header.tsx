import React from 'react';
import { User } from '../../types';

interface HeaderProps {
  currentUser: User | null;
  onOpenNotifications?: () => void;
  onNavigateHome?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentUser,
  onOpenNotifications,
  onNavigateHome
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
        <button
          onClick={onOpenNotifications}
          className="text-white/90 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
          title="Notifications"
        >
          <span className="material-symbols-outlined text-2xl">notifications</span>
        </button>

        <div className="w-8 h-8 rounded-full overflow-hidden border border-white/30 bg-white/20">
          <img
            src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </header>
  );
};
