import React from 'react';

export type HostTabType = 'dashboard' | 'add_room' | 'translator' | 'chat' | 'account';

interface HostBottomNavProps {
  activeTab: HostTabType;
  onTabChange: (tab: HostTabType) => void;
}

export const HostBottomNav: React.FC<HostBottomNavProps> = ({ activeTab, onTabChange }) => {
  const navItems: { id: HostTabType; label: string; icon: string }[] = [
    { id: 'dashboard', label: 'Tổng quan', icon: 'dashboard' },
    { id: 'add_room', label: 'Đăng phòng', icon: 'add_circle' },
    { id: 'translator', label: 'Dịch thuật', icon: 'g_translate' },
    { id: 'chat', label: 'Tin nhắn', icon: 'chat_bubble' },
    { id: 'account', label: 'Tài khoản', icon: 'person' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full flex items-center justify-between px-2 sm:px-4 pt-2.5 pb-6 bg-[#001D15]/95 backdrop-blur-2xl rounded-t-2xl z-50 border-t border-emerald-500/30 shadow-[0_-4px_24px_rgba(0,0,0,0.5)] max-w-7xl mx-auto right-0 font-sans">
      {navItems.map((item) => {
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            type="button"
            className={`flex-1 flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all active:scale-95 cursor-pointer select-none mx-0.5 ${
              isActive
                ? 'bg-emerald-500 text-[#002116] font-extrabold shadow-md'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            <span
              className="material-symbols-outlined text-xl sm:text-2xl transition-transform"
              style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
            >
              {item.icon}
            </span>
            <span className="text-[10px] sm:text-[11px] mt-0.5 font-bold tracking-tight whitespace-nowrap">
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
