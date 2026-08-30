import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MOCK_MAP_SPOTS } from '../../data/mockData';
import { MapSpot } from '../../types';

interface MapScreenProps {
  onBack?: () => void;
}

const FILTER_CHIPS = [
  { id: 'all', label: 'Tất cả' },
  { id: 'wifi', label: 'Fast Wi-Fi (100+ Mbps)' },
  { id: 'workshop', label: 'Làng nghề truyền thống' },
  { id: 'co_working', label: 'Không gian làm việc' },
  { id: 'cafe', label: 'Cà phê yên tĩnh' },
  { id: 'food', label: 'Local Food & Làng chài' }
];

export const MapScreen: React.FC<MapScreenProps> = ({ onBack }) => {
  const [selectedSpot, setSelectedSpot] = useState<MapSpot | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [offlineDownloaded, setOfflineDownloaded] = useState<boolean>(false);
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersGroupRef = useRef<L.LayerGroup | null>(null);
  const userMarkerRef = useRef<L.Marker | null>(null);

  // Show Toast Message helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Filter spots based on active filter chip and search query
  const filteredSpots = MOCK_MAP_SPOTS.filter(spot => {
    // Search query filter
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      const matchesTitle = spot.title.toLowerCase().includes(q);
      const matchesLocation = spot.locationName.toLowerCase().includes(q);
      const matchesCat = spot.category.toLowerCase().includes(q);
      if (!matchesTitle && !matchesLocation && !matchesCat) return false;
    }

    // Filter chip selection
    if (activeFilter === 'all') return true;
    if (activeFilter === 'wifi') return parseInt(spot.wifiSpeed) >= 100;
    if (activeFilter === 'co_working') return spot.category === 'co_working';
    if (activeFilter === 'cafe') return spot.category === 'cafe';
    if (activeFilter === 'workshop') return spot.category === 'workshop';
    if (activeFilter === 'food') return spot.category === 'food';
    return true;
  });

  // 1. Clear search input and restore focus
  const handleClearSearch = () => {
    setSearchQuery('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Handle enter key in search
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredSpots.length > 0) {
        const topSpot = filteredSpots[0];
        setSelectedSpot(topSpot);
        if (mapInstanceRef.current) {
          mapInstanceRef.current.flyTo([topSpot.lat, topSpot.lng], 14, { duration: 1 });
        }
        showToast(`Tìm thấy ${filteredSpots.length} địa điểm cho "${searchQuery}"`);
      } else {
        showToast(`Không tìm thấy địa điểm nào khớp với "${searchQuery}"`);
      }
    }
  };

  // 2. Initialize Leaflet Map inside useEffect safely
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Teardown previous instance if re-mounted
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    // Default center: Da Nang [16.0544, 108.2022], Zoom level 13
    const map = L.map(mapContainerRef.current, {
      zoomControl: false,
      attributionControl: false
    }).setView([16.0544, 108.2022], 13);

    // OpenStreetMap Tile Layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Add Zoom Control at top right
    L.control.zoom({ position: 'topright' }).addTo(map);

    // Add Attribution Control at bottom right
    L.control.attribution({ position: 'bottomright' }).addTo(map);

    // Create layer group for spot markers
    const markersGroup = L.layerGroup().addTo(map);
    markersGroupRef.current = markersGroup;
    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // 3. Render Markers onto map when filteredSpots or selectedSpot changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    const markersGroup = markersGroupRef.current;
    if (!map || !markersGroup) return;

    markersGroup.clearLayers();

    filteredSpots.forEach(spot => {
      const isSelected = selectedSpot?.id === spot.id;

      // Icon symbol based on spot category
      const iconName =
        spot.category === 'co_working'
          ? 'wifi'
          : spot.category === 'cafe'
          ? 'local_cafe'
          : spot.category === 'food'
          ? 'restaurant'
          : 'handyman';

      // Custom Leaflet DivIcon with Tailwind badge styling
      const customIcon = L.divIcon({
        className: 'custom-leaflet-marker',
        html: `
          <div class="cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all">
            <div class="px-2.5 py-1.5 rounded-2xl backdrop-blur-md border flex items-center gap-1.5 shadow-2xl ${
              isSelected
                ? 'bg-[#8bd6b6] text-[#002116] border-white scale-110 ring-4 ring-[#8bd6b6]/50 font-bold'
                : 'bg-[#002116] text-white border-white/30 hover:scale-105'
            }">
              <span class="material-symbols-outlined text-base">${iconName}</span>
              <div class="text-left pr-0.5">
                <p class="text-xs font-bold leading-none whitespace-nowrap">${spot.title}</p>
                <p class="text-[9px] opacity-80 mt-0.5 whitespace-nowrap">${spot.wifiSpeed}</p>
              </div>
            </div>
            <div class="w-2.5 h-2.5 ${
              isSelected ? 'bg-[#8bd6b6]' : 'bg-[#002116]'
            } rotate-45 mx-auto -mt-1.5 border-r border-b border-white/30"></div>
          </div>
        `,
        iconSize: [0, 0],
        iconAnchor: [0, 0]
      });

      const marker = L.marker([spot.lat, spot.lng], { icon: customIcon });

      marker.on('click', () => {
        setSelectedSpot(spot);
        map.panTo([spot.lat, spot.lng], { animate: true, duration: 0.8 });
      });

      marker.addTo(markersGroup);
    });
  }, [filteredSpots, selectedSpot]);

  // Recenter to Da Nang center
  const handleRecenterDaNang = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([16.0544, 108.2022], 13, { duration: 1 });
      showToast('Đã về trung tâm Đà Nẵng');
    }
  };

  // 4. Geolocation logic (My Location button)
  const handleMyLocation = () => {
    if (!navigator.geolocation) {
      showToast('Trình duyệt của bạn không hỗ trợ định vị vị trí GPS.');
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setIsLocating(false);
        const { latitude, longitude } = position.coords;
        const map = mapInstanceRef.current;
        if (map) {
          map.flyTo([latitude, longitude], 15, { duration: 1.2 });

          // Add or update User Location pulsing marker
          if (userMarkerRef.current) {
            userMarkerRef.current.setLatLng([latitude, longitude]);
          } else {
            const userIcon = L.divIcon({
              className: 'custom-user-marker',
              html: `
                <div class="relative flex items-center justify-center -translate-x-1/2 -translate-y-1/2">
                  <div class="w-7 h-7 rounded-full bg-cyan-400/50 animate-ping absolute"></div>
                  <div class="w-5 h-5 rounded-full bg-cyan-400 border-2 border-white shadow-lg relative z-10 flex items-center justify-center text-slate-900">
                    <div class="w-2 h-2 rounded-full bg-white"></div>
                  </div>
                </div>
              `,
              iconSize: [0, 0],
              iconAnchor: [0, 0]
            });
            userMarkerRef.current = L.marker([latitude, longitude], { icon: userIcon }).addTo(map);
          }
        }
        showToast('Đã xác định vị trí hiện tại của bạn!');
      },
      (error) => {
        setIsLocating(false);
        console.warn('Geolocation error:', error);
        showToast('Không thể lấy vị trí. Đang dùng tọa độ mặc định Đà Nẵng.');
        handleRecenterDaNang();
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  return (
    <div className="bg-[#002116] text-white h-screen w-screen relative font-sans overflow-hidden select-none">
      {/* 1. TOP HEADER BAR */}
      <header className="absolute top-0 left-0 w-full z-30 bg-[#002116]/85 backdrop-blur-xl flex items-center justify-between px-4 sm:px-6 h-16 border-b border-white/10 shadow-lg">
        {onBack ? (
          <button
            onClick={onBack}
            className="text-white hover:opacity-80 w-10 h-10 rounded-full flex items-center justify-center bg-white/10 active:scale-95 transition-all cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-2xl">arrow_back</span>
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary-fixed">map</span>
            <span className="font-bold text-lg text-white">Smart Maps</span>
          </div>
        )}

        <div className="text-center">
          <h1 className="font-bold text-sm sm:text-base text-primary-fixed leading-tight">
            Smart Maps Đà Nẵng
          </h1>
          <p className="text-[10px] text-white/70">Làng Nghề & Workation Hubs</p>
        </div>

        <button
          onClick={() => {
            const nextState = !offlineDownloaded;
            setOfflineDownloaded(nextState);
            showToast(nextState ? 'Đã tải bản đồ offline thành công!' : 'Đã xoá bản đồ offline');
          }}
          type="button"
          className={`px-3 py-1.5 rounded-full text-xs font-semibold border flex items-center gap-1 transition-all cursor-pointer ${
            offlineDownloaded
              ? 'bg-emerald-600 text-white border-emerald-400 shadow-md'
              : 'bg-white/10 text-white/80 border-white/20 hover:bg-white/20'
          }`}
        >
          <span className="material-symbols-outlined text-sm">download_for_offline</span>
          <span className="hidden sm:inline">{offlineDownloaded ? 'Offline Saved' : 'Download Map'}</span>
        </button>
      </header>

      {/* 2. LEAFLET MAP CONTAINER (Full viewport, z-0) */}
      <div
        ref={mapContainerRef}
        className="w-full h-full absolute inset-0 z-0 bg-slate-900"
        style={{ width: '100%', height: '100vh', position: 'absolute', top: 0, left: 0, zIndex: 0 }}
      />

      {/* 3. FLOATING CATEGORY PILLS (Top Area under Header) */}
      <div className="absolute top-18 left-0 w-full z-[1000] px-4 sm:px-6 flex gap-2 overflow-x-auto no-scrollbar py-1">
        {FILTER_CHIPS.map(chip => (
          <button
            key={chip.id}
            onClick={() => {
              setActiveFilter(chip.id);
              setSelectedSpot(null);
            }}
            type="button"
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap backdrop-blur-md border shadow-xl transition-all cursor-pointer ${
              activeFilter === chip.id
                ? 'bg-[#8bd6b6] text-[#002116] border-[#8bd6b6] shadow-emerald-950/40 ring-2 ring-[#8bd6b6]/40'
                : 'bg-[#002116]/85 text-white border-white/20 hover:bg-white/20'
            }`}
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* 3.5 FLOATING SEARCH BAR (Overlay on map below category pills) */}
      <div className="absolute top-[120px] left-4 right-4 max-w-lg mx-auto z-[1000]">
        <div className="bg-white/95 backdrop-blur-md rounded-[20px] px-4 py-2.5 shadow-[0_8px_30px_rgb(0,0,0,0.25)] border border-gray-100 flex items-center gap-2.5 transition-all focus-within:ring-2 focus-within:ring-[#8bd6b6]">
          <span className="material-symbols-outlined text-gray-400 text-xl shrink-0">search</span>
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearchKeyDown}
            placeholder="Tìm kiếm địa điểm (The Hive, Nam Ô, Non Nước...)"
            className="w-full bg-transparent text-sm font-semibold text-gray-800 placeholder:text-gray-400 placeholder:font-normal outline-none"
          />
          {searchQuery && (
            <button
              onClick={handleClearSearch}
              type="button"
              className="w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 flex items-center justify-center shrink-0 transition-colors cursor-pointer active:scale-95"
              title="Xóa tìm kiếm"
            >
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          )}
        </div>
      </div>

      {/* 4. RECENTER & GPS BUTTONS */}
      <div className="absolute top-[180px] right-4 z-[1000] flex flex-col gap-2">
        <button
          onClick={handleMyLocation}
          disabled={isLocating}
          type="button"
          className="w-10 h-10 rounded-full bg-[#002116]/90 backdrop-blur-md border border-white/20 text-white flex items-center justify-center shadow-xl hover:bg-[#002116] active:scale-95 transition-all cursor-pointer disabled:opacity-50"
          title="Định vị vị trí hiện tại"
        >
          <span className={`material-symbols-outlined text-xl text-cyan-300 ${isLocating ? 'animate-spin' : ''}`}>
            {isLocating ? 'sync' : 'my_location'}
          </span>
        </button>

        <button
          onClick={handleRecenterDaNang}
          type="button"
          className="w-10 h-10 rounded-full bg-[#002116]/90 backdrop-blur-md border border-white/20 text-white flex items-center justify-center shadow-xl hover:bg-[#002116] active:scale-95 transition-all cursor-pointer"
          title="Về trung tâm Đà Nẵng"
        >
          <span className="material-symbols-outlined text-xl text-primary-fixed">center_focus_strong</span>
        </button>
      </div>

      {/* 5. TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="absolute top-[175px] left-1/2 -translate-x-1/2 z-[1100] bg-black/80 text-emerald-300 border border-emerald-400/40 text-xs font-bold px-4 py-2 rounded-full shadow-2xl backdrop-blur-md animate-fadeIn">
          {toastMessage}
        </div>
      )}

      {/* 6. BOTTOM INFO CARD (Default: HIDDEN when selectedSpot is null) */}
      {selectedSpot && (
        <div className="absolute bottom-20 left-4 right-4 sm:left-6 sm:right-6 max-w-xl mx-auto z-[1000] animate-fadeIn">
          <div className="bg-[#002116]/95 backdrop-blur-2xl rounded-3xl p-4 sm:p-5 border border-white/25 shadow-[0_10px_35px_rgba(0,0,0,0.6)] flex flex-col md:flex-row gap-4 items-center relative">
            {/* Close Button */}
            <button
              onClick={() => setSelectedSpot(null)}
              type="button"
              className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white/80 flex items-center justify-center transition-all cursor-pointer z-10"
              title="Đóng"
            >
              <span className="material-symbols-outlined text-base">close</span>
            </button>

            {/* Spot Image */}
            <img
              src={selectedSpot.image}
              alt={selectedSpot.title}
              className="w-full md:w-32 h-28 object-cover rounded-2xl shrink-0 shadow-md"
            />

            {/* Spot Info */}
            <div className="flex-1 w-full pr-6">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-bold text-primary-fixed uppercase tracking-wider block mb-0.5">
                    {selectedSpot.quietLevel}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-white leading-snug">{selectedSpot.title}</h3>
                  <p className="text-xs text-white/70 mt-0.5">{selectedSpot.locationName}</p>
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-amber-400 bg-black/40 px-2 py-0.5 rounded-full shrink-0">
                  <span className="material-symbols-outlined text-sm">star</span>
                  <span>{selectedSpot.rating}</span>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between pt-2 border-t border-white/15">
                <span className="text-xs font-bold text-primary-fixed flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">wifi</span>
                  {selectedSpot.wifiSpeed} Verified
                </span>

                <button
                  onClick={() => showToast(`Đang mở ứng dụng bản đồ chỉ đường tới ${selectedSpot.title}...`)}
                  type="button"
                  className="px-4 py-2 bg-[#8bd6b6] hover:bg-[#6fcba6] text-[#002116] font-bold text-xs rounded-full shadow-lg transition-all active:scale-95 cursor-pointer"
                >
                  Chỉ Đường
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

