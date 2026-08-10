import React, { useState } from 'react';
import { User } from '../../types';

interface AdminDashboardScreenProps {
  currentUser: User | null;
  onNavigateHome?: () => void;
}

export const AdminDashboardScreen: React.FC<AdminDashboardScreenProps> = ({
  currentUser,
  onNavigateHome
}) => {
  const [activeTab, setActiveTab] = useState<'users' | 'listings' | 'analytics' | 'settings'>('analytics');

  return (
    <div className="bg-[#001710] text-white min-h-screen pb-28 font-sans">
      {/* Top Admin Bar */}
      <header className="fixed top-0 w-full z-50 bg-[#001710]/90 backdrop-blur-xl flex items-center justify-between px-6 h-16 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-amber-400">admin_panel_settings</span>
          <span className="font-bold text-lg text-white">NomadNest System Admin</span>
        </div>
        <span className="px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-full text-xs font-bold">
          Master Control
        </span>
      </header>

      <main className="pt-20 px-6 max-w-4xl mx-auto space-y-6">
        {/* Admin Header Info */}
        <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-2xl flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-white">Hệ Thống Quản Trị NomadNest</h1>
            <p className="text-xs text-white/70 mt-1">Quản lý toàn bộ người dùng, Homestay Làng Nghề & Doanh thu</p>
          </div>
          <button
            onClick={() => alert('Đang xuất báo cáo hệ thống PDF...')}
            className="px-4 py-2 bg-amber-500 text-black font-bold text-xs rounded-full shadow hover:bg-amber-400"
          >
            Xuất Báo Cáo
          </button>
        </div>

        {/* Global Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-xl">
            <span className="text-xs text-white/60">Tổng Người Dùng</span>
            <div className="text-2xl font-extrabold text-amber-400 mt-1">1,240</div>
            <span className="text-[10px] text-emerald-400 font-semibold">↑ +120 tuần này</span>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-xl">
            <span className="text-xs text-white/60">Local Hosts Đã Duyệt</span>
            <div className="text-2xl font-extrabold text-white mt-1">86</div>
            <span className="text-[10px] text-primary-fixed-dim font-semibold">5 Làng nghề Đà Nẵng</span>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-xl">
            <span className="text-xs text-white/60">Tổng GMV Đặt Phòng</span>
            <div className="text-2xl font-extrabold text-emerald-400 mt-1">$48,900</div>
            <span className="text-[10px] text-white/70">Tháng 11/2026</span>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-xl">
            <span className="text-xs text-white/60">Yêu cầu Wi-Fi Check</span>
            <div className="text-2xl font-extrabold text-blue-400 mt-1">3 Mới</div>
            <span className="text-[10px] text-blue-300 font-semibold">Cần thẩm định</span>
          </div>
        </div>

        {/* Admin Navigation Tabs */}
        <div className="flex gap-2 border-b border-white/10 pb-2 overflow-x-auto no-scrollbar">
          {[
            { id: 'analytics', label: 'Báo Cáo Analytics' },
            { id: 'users', label: 'Quản Lý Người Dùng (Users)' },
            { id: 'listings', label: 'Duyệt Chỗ Ở (Listings)' },
            { id: 'settings', label: 'Cấu Hình Hệ Thống' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-amber-500 text-black shadow'
                  : 'bg-white/10 text-white/80 hover:bg-white/20'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab View Contents */}
        {activeTab === 'analytics' && (
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 space-y-4">
            <h2 className="text-lg font-bold text-white">Biểu Đồ Tăng Trưởng Làng Nghề</h2>
            <div className="h-48 bg-black/30 rounded-2xl border border-white/10 flex items-end justify-between p-4 gap-2">
              {[
                { name: 'Nam Ô', val: 80 },
                { name: 'Non Nước', val: 65 },
                { name: 'Túy Loan', val: 45 },
                { name: 'Cẩm Nẻ', val: 35 },
                { name: 'Mẫn Thái', val: 90 }
              ].map((item, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                  <div
                    className="w-full bg-gradient-to-t from-emerald-600 to-amber-400 rounded-t-lg transition-all duration-500"
                    style={{ height: `${item.val}%` }}
                  />
                  <span className="text-[10px] text-white/70 font-semibold">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 space-y-3">
            <h2 className="text-lg font-bold text-white mb-2">Danh Sách Người Dùng Hàng Đầu</h2>
            <div className="space-y-2">
              <div className="p-3 bg-white/10 rounded-xl flex items-center justify-between">
                <div>
                  <p className="font-bold text-sm text-white">Sarah Johnson (Nomad User)</p>
                  <p className="text-xs text-white/60">sarah.j@digitalnomad.io • US</p>
                </div>
                <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-bold">Active</span>
              </div>
              <div className="p-3 bg-white/10 rounded-xl flex items-center justify-between">
                <div>
                  <p className="font-bold text-sm text-white">Mrs. Mai (Local Host)</p>
                  <p className="text-xs text-white/60">mai.oceanbreeze@nomadnest.vn • Verified Superhost</p>
                </div>
                <span className="px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full text-xs font-bold">Superhost</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'listings' && (
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 space-y-3">
            <h2 className="text-lg font-bold text-white mb-2">Yêu Cầu Duyệt Homestay Mới</h2>
            <div className="p-4 bg-white/10 rounded-2xl flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-white">Marble Mountain Loft (Non Nuoc Village)</h3>
                <p className="text-xs text-white/60">Host: Mr. Binh • Đã kiểm định Wi-Fi 200 Mbps</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => alert('Đã phê duyệt Homestay!')}
                  className="px-3 py-1.5 bg-emerald-600 text-white font-bold text-xs rounded-full shadow hover:bg-emerald-500"
                >
                  Phê Duyệt
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 space-y-4">
            <h2 className="text-lg font-bold text-white">Cấu Hình Tích Hợp Hệ Thống</h2>
            <div className="space-y-3 text-sm">
              <label className="flex items-center justify-between p-3 bg-white/10 rounded-xl">
                <span>Tự động kết nối Gemini AI Translator</span>
                <input type="checkbox" defaultChecked className="w-5 h-5 accent-amber-400" />
              </label>
              <label className="flex items-center justify-between p-3 bg-white/10 rounded-xl">
                <span>Bật Grab Mini-App SDK Deep Link</span>
                <input type="checkbox" defaultChecked className="w-5 h-5 accent-amber-400" />
              </label>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
