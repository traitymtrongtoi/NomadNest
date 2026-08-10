import React, { useState } from 'react';
import { User } from '../../types';
import { EmergencyModal } from '../common/EmergencyModal';
import { AIChatbotModal } from '../common/AIChatbotModal';

interface HostDashboardScreenProps {
  currentUser: User | null;
  onNavigateHome?: () => void;
  onNavigateAddRoom?: () => void;
}

export const HostDashboardScreen: React.FC<HostDashboardScreenProps> = ({
  currentUser,
  onNavigateHome,
  onNavigateAddRoom
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'rooms' | 'reviews'>('overview');
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  return (
    <div className="bg-[#002116] text-white min-h-screen pb-28 font-sans">
      {/* Top Header */}
      <header className="fixed top-0 w-full z-50 bg-[#002116]/90 backdrop-blur-xl flex items-center justify-between px-4 sm:px-6 h-16 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary-fixed">real_estate_agent</span>
          <span className="font-bold text-base sm:text-lg text-white">Local Host Hub</span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <span className="hidden sm:flex px-3 py-1 bg-emerald-700/80 text-white rounded-full text-xs font-bold items-center gap-1 border border-emerald-500/40">
            <span className="material-symbols-outlined text-xs">verified</span> Superhost
          </span>

          {/* Emergency Phone Icon */}
          <button
            onClick={() => setIsEmergencyOpen(true)}
            className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#003829] to-emerald-600 text-white shadow-md flex items-center justify-center active:scale-95 border border-white/30 hover:border-emerald-300 transition-all cursor-pointer group relative shrink-0"
            title="Liên hệ khẩn cấp 24/7"
          >
            <span className="material-symbols-outlined text-xl drop-shadow group-hover:scale-110 transition-transform">
              phone_in_talk
            </span>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-red-500 border border-white animate-pulse" />
          </button>

          {/* AI Chatbot Sheep Icon */}
          <button
            onClick={() => setIsChatbotOpen(true)}
            className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-md flex items-center justify-center active:scale-95 border border-white/30 hover:border-emerald-200 transition-all cursor-pointer group relative text-lg shrink-0"
            title="Trợ lý AI NomadNest (Cừu 🐑)"
          >
            <span className="group-hover:scale-110 transition-transform drop-shadow">
              🐑
            </span>
            <span className="absolute -top-1 -right-1 px-1 py-0.2 rounded-full bg-emerald-400 text-emerald-950 font-extrabold text-[8px] border border-white shadow">
              AI
            </span>
          </button>
        </div>
      </header>

      <main className="pt-20 px-6 max-w-3xl mx-auto space-y-6">
        {/* Host Welcome Card */}
        <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-2xl flex flex-col md:flex-row items-center gap-4">
          <img
            src={currentUser?.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80'}
            alt="Mrs. Mai"
            className="w-20 h-20 rounded-2xl object-cover shrink-0 border-2 border-primary-fixed"
          />
          <div className="text-center md:text-left flex-1">
            <h1 className="text-2xl font-extrabold text-white">Good Morning, {currentUser?.name || 'Mrs. Mai'}</h1>
            <p className="text-xs text-primary-fixed-dim mt-1">Host at Ocean Breeze Villa, Nam O Craft Village</p>
            <div className="mt-3 flex flex-wrap justify-center md:justify-start gap-2">
              <span className="text-[10px] bg-white/10 text-white px-2.5 py-1 rounded-full border border-white/10">12 Total Rooms</span>
              <span className="text-[10px] bg-white/10 text-white px-2.5 py-1 rounded-full border border-white/10">4.9★ Guest Rating</span>
            </div>
          </div>
        </div>

        {/* Financial & Performance Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-xl">
            <span className="text-xs text-white/60 font-medium">Doanh thu tháng này</span>
            <div className="text-2xl font-extrabold text-primary-fixed mt-1">$2,450</div>
            <span className="text-[10px] text-emerald-400 font-bold">↑ +18% so với tháng trước</span>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-xl">
            <span className="text-xs text-white/60 font-medium">Tỷ lệ lấp đầy phòng</span>
            <div className="text-2xl font-extrabold text-white mt-1">85%</div>
            <span className="text-[10px] text-primary-fixed-dim font-bold">10/12 Phòng đã đặt</span>
          </div>

          <div className="col-span-2 md:col-span-1 bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-xl">
            <span className="text-xs text-white/60 font-medium">Trải nghiệm làng nghề</span>
            <div className="text-2xl font-extrabold text-amber-400 mt-1">42 Lượt</div>
            <span className="text-[10px] text-white/70">Workshop làm nước mắm</span>
          </div>
        </div>

        {/* Room Status Today Bar */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-5 backdrop-blur-xl space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-primary-fixed flex items-center gap-1">
            <span className="material-symbols-outlined text-base">hotel</span>
            Tình Trạng Phòng Hôm Nay
          </h2>

          <div className="grid grid-cols-4 gap-2 text-center">
            <div className="bg-black/20 p-2.5 rounded-xl">
              <span className="text-xs text-white/60 block">Tổng số</span>
              <span className="text-lg font-bold text-white">12</span>
            </div>
            <div className="bg-emerald-950/60 p-2.5 rounded-xl border border-emerald-500/30">
              <span className="text-xs text-emerald-300 block">Sẵn sàng</span>
              <span className="text-lg font-bold text-emerald-300">3</span>
            </div>
            <div className="bg-amber-950/60 p-2.5 rounded-xl border border-amber-500/30">
              <span className="text-xs text-amber-300 block">Đang ở</span>
              <span className="text-lg font-bold text-amber-300">8</span>
            </div>
            <div className="bg-blue-950/60 p-2.5 rounded-xl border border-blue-500/30">
              <span className="text-xs text-blue-300 block">Chờ duyệt</span>
              <span className="text-lg font-bold text-blue-300">1</span>
            </div>
          </div>
        </div>

        {/* Management Hub Tabs */}
        <div className="space-y-3">
          <div className="flex gap-2 border-b border-white/10 pb-2 overflow-x-auto no-scrollbar">
            {[
              { id: 'overview', label: 'Tổng Quan Booking' },
              { id: 'rooms', label: 'Danh Sách Phòng' },
              { id: 'reviews', label: 'Đánh Giá Từ Nomad' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-primary-fixed text-on-primary-fixed shadow'
                    : 'bg-white/10 text-white/80 hover:bg-white/20'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-5 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-base text-white">
                {activeTab === 'overview' && 'Lịch Đặt Phòng Gần Đây'}
                {activeTab === 'rooms' && 'Danh Sách Phòng Đang Đăng Tải'}
                {activeTab === 'reviews' && 'Đánh Giá Từ Digital Nomad'}
              </h3>
              <button
                type="button"
                onClick={onNavigateAddRoom}
                className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-white rounded-xl text-xs font-bold transition-all shadow flex items-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">add</span>
                <span>Đăng tải phòng mới</span>
              </button>
            </div>

            {activeTab === 'overview' && (
              <div className="space-y-3">
                <div className="bg-white/10 p-4 rounded-2xl flex items-center justify-between border border-white/10">
                  <div>
                    <h4 className="font-bold text-sm text-white">Sarah Johnson (Digital Nomad)</h4>
                    <p className="text-xs text-primary-fixed-dim">Ocean Breeze Villa • 12/11 - 15/11/2026</p>
                    <span className="text-[10px] text-emerald-400 font-semibold">Đã xác nhận thanh toán ($255.00)</span>
                  </div>
                  <button
                    onClick={() => alert('Đang nhắn tin cho khách Sarah Johnson...')}
                    className="px-3 py-1.5 bg-primary-fixed text-on-primary-fixed rounded-full text-xs font-bold hover:bg-primary-fixed-dim cursor-pointer"
                  >
                    Nhắn Tin
                  </button>
                </div>

                <div className="bg-white/10 p-4 rounded-2xl flex items-center justify-between border border-white/10">
                  <div>
                    <h4 className="font-bold text-sm text-white">David Miller (Remote Engineer)</h4>
                    <p className="text-xs text-primary-fixed-dim">Garden Studio • 18/11 - 25/11/2026</p>
                    <span className="text-[10px] text-amber-400 font-semibold">Chờ xác nhận check-in</span>
                  </div>
                  <button
                    onClick={() => alert('Đã duyệt đơn đặt phòng!')}
                    className="px-3 py-1.5 bg-emerald-600 text-white rounded-full text-xs font-bold hover:bg-emerald-500 cursor-pointer"
                  >
                    Duyệt Đơn
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'rooms' && (
              <div className="space-y-3">
                <div className="p-4 bg-white/10 rounded-2xl border border-white/10 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-white">Studio View Vườn & Bàn Ghế Công Thái Học</h4>
                    <p className="text-xs text-emerald-300">Làng nước mắm Nam Ô • 450.000 VNĐ / Đêm</p>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-bold">Đang hoạt động</span>
                      <span className="text-[10px] text-white/60">WiFi 150Mbps • Max 2 khách</span>
                    </div>
                  </div>
                  <button
                    onClick={onNavigateAddRoom}
                    className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold cursor-pointer"
                  >
                    Chỉnh sửa
                  </button>
                </div>

                <div className="p-6 text-center border-2 border-dashed border-white/20 rounded-2xl">
                  <p className="text-xs text-white/70 mb-3">Bạn muốn đăng bài niêm yết phòng mới cho Digital Nomad?</p>
                  <button
                    onClick={onNavigateAddRoom}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-sm">add_circle</span>
                    <span>Tạo bài đăng phòng ngay</span>
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-3">
                <div className="p-4 bg-white/10 rounded-2xl border border-white/10">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs text-white">Alex Riviera (Software Engineer)</span>
                    <span className="text-xs text-amber-400 font-bold">5.0 ★</span>
                  </div>
                  <p className="text-xs text-white/80">"Không gian yên tĩnh tuyệt đối, Host Mai rất hiếu khách còn tặng mắm Nam Ô chuẩn vị. Bàn làm việc công thái học rất êm lưng!"</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Floating Action Buttons (FABs) - Synchronized with Guest */}
      <div className="fixed bottom-24 right-5 flex flex-col gap-3.5 z-40 items-end">
        {/* FAB 1: Emergency Contact (Liên hệ khẩn cấp) */}
        <button
          onClick={() => setIsEmergencyOpen(true)}
          className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-[#003829] to-emerald-600 text-white shadow-2xl flex items-center justify-center active:scale-92 border-2 border-white/40 hover:border-emerald-300 transition-all cursor-pointer group relative"
          title="Liên hệ khẩn cấp 24/7"
        >
          <span className="material-symbols-outlined text-2xl drop-shadow group-hover:scale-110 transition-transform">
            phone_in_talk
          </span>
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-red-500 border-2 border-white animate-pulse" />
        </button>

        {/* FAB 2: AI Chatbot Sheep (Trợ lý con cừu NomadNest) */}
        <button
          onClick={() => setIsChatbotOpen(true)}
          className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-2xl flex items-center justify-center active:scale-92 border-2 border-white/40 hover:border-emerald-200 transition-all cursor-pointer group relative text-2xl"
          title="Trợ lý AI NomadNest (Cừu 🐑)"
        >
          <span className="group-hover:scale-115 transition-transform drop-shadow">
            🐑
          </span>
          <span className="absolute -top-1 -right-1 px-1.5 py-0.5 rounded-full bg-emerald-400 text-emerald-950 font-extrabold text-[9px] border border-white shadow">
            AI
          </span>
        </button>
      </div>

      {/* Modals */}
      <EmergencyModal
        isOpen={isEmergencyOpen}
        onClose={() => setIsEmergencyOpen(false)}
      />
      <AIChatbotModal
        isOpen={isChatbotOpen}
        onClose={() => setIsChatbotOpen(false)}
      />
    </div>
  );
};
