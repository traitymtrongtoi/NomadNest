import React, { useState, useEffect } from 'react';
import { User } from '../../types';

interface HostListingsScreenProps {
  currentUser?: User | null;
  onBack: () => void;
  onNavigateAddRoom: () => void;
}

interface RoomListing {
  id: string;
  title: string;
  location: string;
  pricePerNight: number;
  priceFormatted: string;
  image: string;
  status: 'active' | 'paused';
  wifiSpeed: string;
  maxGuests: number;
  rating: number;
  reviewsCount: number;
  workspaceType: string;
}

export const HostListingsScreen: React.FC<HostListingsScreenProps> = ({
  currentUser,
  onBack,
  onNavigateAddRoom
}) => {
  const [filter, setFilter] = useState<'all' | 'active' | 'paused'>('all');
  const [listings, setListings] = useState<RoomListing[]>([
    {
      id: 'room_1',
      title: 'Studio Hướng Vườn & Bàn Làm Việc Công Thái Học',
      location: 'Làng Nước Mắm Nam Ô, Liên Chiểu, Đà Nẵng',
      pricePerNight: 480000,
      priceFormatted: '480.000 VNĐ / Đêm',
      image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80',
      status: 'active',
      wifiSpeed: '150 Mbps',
      maxGuests: 2,
      rating: 4.9,
      reviewsCount: 28,
      workspaceType: 'Ghế công thái học Herman Miller & Màn hình phụ 27 inch'
    },
    {
      id: 'room_2',
      title: 'Phòng Ocean View Ban Công Riêng & Bếp Nấu Truyền Thống',
      location: 'Ocean Breeze Villa, Làng Nam Ô, Đà Nẵng',
      pricePerNight: 650000,
      priceFormatted: '650.000 VNĐ / Đêm',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
      status: 'active',
      wifiSpeed: '200 Mbps',
      maxGuests: 3,
      rating: 4.95,
      reviewsCount: 34,
      workspaceType: 'Bàn gỗ sồi tự nhiên nhìn ra vịnh biển Nam Ô'
    },
    {
      id: 'room_3',
      title: 'Căn Hộ Gác Lửng Yên Tĩnh Phong Cách Làng Nghề Thủ Công',
      location: 'Làng Đá Mỹ Nghệ Non Nước, Ngũ Hành Sơn, Đà Nẵng',
      pricePerNight: 420000,
      priceFormatted: '420.000 VNĐ / Đêm',
      image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80',
      status: 'paused',
      wifiSpeed: '120 Mbps',
      maxGuests: 2,
      rating: 4.8,
      reviewsCount: 19,
      workspaceType: 'Góc làm việc tĩnh lặng cách âm 100%'
    }
  ]);

  // Read newly created rooms from storage if available
  useEffect(() => {
    try {
      const stored = localStorage.getItem('nomad_custom_rooms');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setListings(prev => {
            const existingIds = new Set(prev.map(p => p.id));
            const newItems: RoomListing[] = parsed
              .filter((item: any) => !existingIds.has(item.id))
              .map((item: any) => ({
                id: item.id || `custom_${Date.now()}`,
                title: item.title || 'Phòng mới đăng',
                location: item.location || 'Làng Nghề Đà Nẵng',
                pricePerNight: item.price || 500000,
                priceFormatted: `${Number(item.price || 500000).toLocaleString('vi-VN')} VNĐ / Đêm`,
                image: item.image || 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80',
                status: 'active',
                wifiSpeed: item.wifiSpeed || '150 Mbps',
                maxGuests: item.maxGuests || 2,
                rating: 5.0,
                reviewsCount: 1,
                workspaceType: item.workspaceType || 'Bàn làm việc tiêu chuẩn Nomad'
              }));
            return [...newItems, ...prev];
          });
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const toggleRoomStatus = (id: string) => {
    setListings(prev =>
      prev.map(item => {
        if (item.id === id) {
          const nextStatus = item.status === 'active' ? 'paused' : 'active';
          return { ...item, status: nextStatus };
        }
        return item;
      })
    );
  };

  const filteredListings = listings.filter(item => {
    if (filter === 'active') return item.status === 'active';
    if (filter === 'paused') return item.status === 'paused';
    return true;
  });

  return (
    <div className="bg-[#002116] text-white min-h-screen pb-32 font-sans">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-[#002116]/95 backdrop-blur-xl flex items-center justify-between px-5 h-16 border-b border-white/10 shadow-lg">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
          title="Quay lại"
        >
          <span className="material-symbols-outlined text-xl">arrow_back</span>
        </button>
        <h1 className="font-extrabold text-base text-white">Quản lý Danh sách phòng</h1>
        <button
          onClick={onNavigateAddRoom}
          className="w-10 h-10 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white flex items-center justify-center transition-all shadow cursor-pointer active:scale-95"
          title="Thêm phòng mới"
        >
          <span className="material-symbols-outlined text-xl">add</span>
        </button>
      </header>

      <main className="pt-20 px-4 sm:px-6 max-w-3xl mx-auto space-y-5">
        {/* Quick Stats Bar */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 backdrop-blur-xl text-center">
            <span className="text-xs text-white/60 block">Tổng số phòng</span>
            <span className="text-xl font-black text-white mt-1 block">{listings.length}</span>
          </div>
          <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-2xl p-3.5 backdrop-blur-xl text-center">
            <span className="text-xs text-emerald-300 block">Đang hoạt động</span>
            <span className="text-xl font-black text-emerald-300 mt-1 block">
              {listings.filter(r => r.status === 'active').length}
            </span>
          </div>
          <div className="bg-amber-950/40 border border-amber-500/30 rounded-2xl p-3.5 backdrop-blur-xl text-center">
            <span className="text-xs text-amber-300 block">Tạm ngưng</span>
            <span className="text-xl font-black text-amber-300 mt-1 block">
              {listings.filter(r => r.status === 'paused').length}
            </span>
          </div>
        </div>

        {/* Filter Tabs & Add Room CTA */}
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex gap-2">
            {[
              { id: 'all', label: 'Tất cả' },
              { id: 'active', label: 'Đang hoạt động' },
              { id: 'paused', label: 'Tạm ngưng' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  filter === tab.id
                    ? 'bg-emerald-500 text-white shadow-md'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <button
            onClick={onNavigateAddRoom}
            className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-400 hover:opacity-95 text-[#002116] rounded-xl text-xs font-black transition-all shadow-md flex items-center gap-1.5 cursor-pointer active:scale-95"
          >
            <span className="material-symbols-outlined text-sm font-bold">add_circle</span>
            <span>Tạo tin đăng mới</span>
          </button>
        </div>

        {/* Listings Cards */}
        <div className="space-y-4">
          {filteredListings.map(room => (
            <div
              key={room.id}
              className="bg-white/5 border border-white/10 rounded-3xl p-4 sm:p-5 backdrop-blur-xl shadow-xl space-y-4 hover:border-emerald-400/40 transition-all"
            >
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Image */}
                <div className="relative sm:w-44 h-36 rounded-2xl overflow-hidden shrink-0">
                  <img
                    src={room.image}
                    alt={room.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border shadow-md backdrop-blur-md ${
                        room.status === 'active'
                          ? 'bg-emerald-500/90 text-white border-emerald-300'
                          : 'bg-amber-500/90 text-white border-amber-300'
                      }`}
                    >
                      {room.status === 'active' ? 'Đang đón khách' : 'Tạm ẩn'}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <h2 className="font-extrabold text-base text-white truncate">{room.title}</h2>
                      <div className="flex items-center gap-1 text-amber-300 text-xs font-bold shrink-0">
                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                          star
                        </span>
                        <span>{room.rating}</span>
                        <span className="text-white/50">({room.reviewsCount})</span>
                      </div>
                    </div>

                    <p className="text-xs text-emerald-300/90 mt-1 flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm text-emerald-400">location_on</span>
                      <span className="truncate">{room.location}</span>
                    </p>

                    <p className="text-xs text-white/60 mt-1 line-clamp-1">
                      💻 {room.workspaceType}
                    </p>
                  </div>

                  <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between flex-wrap gap-2">
                    <div>
                      <span className="text-sm font-black text-emerald-300">{room.priceFormatted}</span>
                      <span className="text-[10px] text-white/50 block">Wi-Fi: {room.wifiSpeed} • Tối đa {room.maxGuests} khách</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => toggleRoomStatus(room.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                          room.status === 'active'
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/30 hover:bg-amber-500/30'
                            : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/30'
                        }`}
                      >
                        {room.status === 'active' ? 'Tạm ngưng' : 'Mở lại phòng'}
                      </button>

                      <button
                        type="button"
                        onClick={onNavigateAddRoom}
                        className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition-all cursor-pointer border border-white/10"
                      >
                        Chỉnh sửa
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};
