import React from 'react';

interface HostBottomNavProps {
  activeTab: 'dashboard' | 'add_room' | 'chat' | 'account';
  onTabChange: (tab: 'dashboard' | 'add_room' | 'chat' | 'account') => void;
}

export const HostBottomNav: React.FC<HostBottomNavProps> = ({ activeTab, onTabChange }) => {
  return (
    <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pt-2.5 pb-6 bg-[#001D15]/95 backdrop-blur-2xl rounded-t-2xl z-50 border-t border-emerald-500/30 shadow-[0_-4px_24px_rgba(0,0,0,0.5)] max-w-7xl mx-auto right-0 font-sans">
      <button
        onClick={() => onTabChange('dashboard')}
        type="button"
        className={`flex flex-col items-center justify-center px-3 sm:px-5 py-1 rounded-full transition-all active:scale-95 cursor-pointer ${
          activeTab === 'dashboard'
            ? 'bg-emerald-500 text-[#002116] font-extrabold shadow-md'
            : 'text-white/70 hover:text-white'
        }`}
      >
        <span
          className="material-symbols-outlined text-xl"
          style={{ fontVariationSettings: activeTab === 'dashboard' ? "'FILL' 1" : "'FILL' 0" }}
        >
          dashboard
        </span>
        <span className="text-[10px] mt-0.5">Tổng quan</span>
      </button>

      <button
        onClick={() => onTabChange('add_room')}
        type="button"
        className={`flex flex-col items-center justify-center px-3 sm:px-5 py-1 rounded-full transition-all active:scale-95 cursor-pointer ${
          activeTab === 'add_room'
            ? 'bg-emerald-500 text-[#002116] font-extrabold shadow-md'
            : 'text-white/70 hover:text-white'
        }`}
      >
        <span
          className="material-symbols-outlined text-xl"
          style={{ fontVariationSettings: activeTab === 'add_room' ? "'FILL' 1" : "'FILL' 0" }}
        >
          add_circle
        </span>
        <span className="text-[10px] mt-0.5">Đăng phòng</span>
      </button>

      <button
        onClick={() => onTabChange('chat')}
        type="button"
        className={`flex flex-col items-center justify-center px-3 sm:px-5 py-1 rounded-full transition-all active:scale-95 cursor-pointer ${
          activeTab === 'chat'
            ? 'bg-emerald-500 text-[#002116] font-extrabold shadow-md'
            : 'text-white/70 hover:text-white'
        }`}
      >
        <span
          className="material-symbols-outlined text-xl"
          style={{ fontVariationSettings: activeTab === 'chat' ? "'FILL' 1" : "'FILL' 0" }}
        >
          chat_bubble
        </span>
        <span className="text-[10px] mt-0.5">Tin nhắn</span>
      </button>

      <button
        onClick={() => onTabChange('account')}
        type="button"
        className={`flex flex-col items-center justify-center px-3 sm:px-5 py-1 rounded-full transition-all active:scale-95 cursor-pointer ${
          activeTab === 'account'
            ? 'bg-emerald-500 text-[#002116] font-extrabold shadow-md'
            : 'text-white/70 hover:text-white'
        }`}
      >
        <span
          className="material-symbols-outlined text-xl"
          style={{ fontVariationSettings: activeTab === 'account' ? "'FILL' 1" : "'FILL' 0" }}
        >
          person
        </span>
        <span className="text-[10px] mt-0.5">Tài khoản</span>
      </button>
    </nav>
  );
};
