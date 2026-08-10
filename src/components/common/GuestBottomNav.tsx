import React from 'react';

interface GuestBottomNavProps {
  activeTab: 'home' | 'services' | 'chat' | 'account';
  onTabChange: (tab: 'home' | 'services' | 'chat' | 'account') => void;
}

export const GuestBottomNav: React.FC<GuestBottomNavProps> = ({ activeTab, onTabChange }) => {
  return (
    <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pt-2.5 pb-6 bg-[#002116]/95 backdrop-blur-2xl rounded-t-2xl z-50 border-t border-white/10 shadow-[0_-4px_24px_rgba(0,0,0,0.3)] max-w-7xl mx-auto right-0 font-sans">
      <button
        onClick={() => onTabChange('home')}
        type="button"
        className={`flex flex-col items-center justify-center px-3 sm:px-5 py-1 rounded-full transition-all active:scale-95 cursor-pointer ${
          activeTab === 'home'
            ? 'bg-[#8bd6b6] text-[#002116] font-extrabold shadow-md'
            : 'text-white/70 hover:text-white'
        }`}
      >
        <span
          className="material-symbols-outlined text-xl"
          style={{ fontVariationSettings: activeTab === 'home' ? "'FILL' 1" : "'FILL' 0" }}
        >
          home_work
        </span>
        <span className="text-[10px] mt-0.5">Trang chủ</span>
      </button>

      <button
        onClick={() => onTabChange('services')}
        type="button"
        className={`flex flex-col items-center justify-center px-3 sm:px-5 py-1 rounded-full transition-all active:scale-95 cursor-pointer ${
          activeTab === 'services'
            ? 'bg-[#8bd6b6] text-[#002116] font-extrabold shadow-md'
            : 'text-white/70 hover:text-white'
        }`}
      >
        <span
          className="material-symbols-outlined text-xl"
          style={{ fontVariationSettings: activeTab === 'services' ? "'FILL' 1" : "'FILL' 0" }}
        >
          explore
        </span>
        <span className="text-[10px] mt-0.5">Dịch vụ</span>
      </button>

      <button
        onClick={() => onTabChange('chat')}
        type="button"
        className={`flex flex-col items-center justify-center px-3 sm:px-5 py-1 rounded-full transition-all active:scale-95 cursor-pointer ${
          activeTab === 'chat'
            ? 'bg-[#8bd6b6] text-[#002116] font-extrabold shadow-md'
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
            ? 'bg-[#8bd6b6] text-[#002116] font-extrabold shadow-md'
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
