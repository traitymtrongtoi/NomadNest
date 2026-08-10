import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MOCK_MAP_SPOTS } from '../../data/mockData';
import { MapSpot } from '../../types';

interface MapScreenProps {
  onBack?: () => void;
}

export const MapScreen: React.FC<MapScreenProps> = ({ onBack }) => {
  const [selectedSpot, setSelectedSpot] = useState<MapSpot | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [offlineDownloaded, setOfflineDownloaded] = useState<boolean>(false);

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersGroupRef = useRef<L.LayerGroup | null>(null);

  // Filter spots based on active category and search query
  const filteredSpots = MOCK_MAP_SPOTS.filter(spot => {
    // Search query filter
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchesTitle = spot.title.toLowerCase().includes(q);
      const matchesLocation = spot.locationName.toLowerCase().includes(q);
      if (!matchesTitle && !matchesLocation) return false;
    }

    // Category filter
    if (activeCategory === 'all') return true;
    if (activeCategory === 'wifi') return parseInt(spot.wifiSpeed) >= 100;
    if (activeCategory === 'co_working') return spot.category === 'co_working';
    if (activeCategory === 'cafe') return spot.category === 'cafe';
    if (activeCategory === 'workshop') return spot.category === 'workshop';
    if (activeCategory === 'food') return spot.category === 'food';
    return true;
  });

  // 1. Initialize Leaflet Map inside useEffect safely
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

  // 2. Render Markers onto map when filteredSpots or selectedSpot changes
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

  const handleRecenterDaNang = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([16.0544, 108.2022], 13, { duration: 1 });
    }
  };

  return (
    <div className="bg-[#002116] text-white h-screen w-screen relative font-sans overflow-hidden select-none">
      {/* 1. TOP HEADER BAR */}
      <header className="absolute top-0 left-0 w-full z-30 bg-[#002116]/85 backdrop-blur-xl flex items-center justify-between px-4 sm:px-6 h-16 border-b border-white/10 shadow-lg">
        {onBack ? (
          <button
            onClick={onBack}
            className="text-white hover:opacity-80 w-10 h-10 rounded-full flex items-center justify-center bg-white/10 active:scale-95 transition-all"
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
          onClick={() => setOfflineDownloaded(!offlineDownloaded)}
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
        {[
          { id: 'all', label: 'Tất cả' },
          { id: 'wifi', label: 'Fast Wi-Fi (100+ Mbps)' },
          { id: 'co_working', label: 'Co-working Spaces' },
          { id: 'cafe', label: 'Cà phê yên tĩnh' },
          { id: 'workshop', label: 'Làng nghề truyền thống' },
          { id: 'food', label: 'Làng chài & Ẩm thực' }
        ].map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            type="button"
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap backdrop-blur-md border shadow-xl transition-all cursor-pointer ${
              activeCategory === cat.id
                ? 'bg-[#8bd6b6] text-[#002116] border-[#8bd6b6] shadow-emerald-950/40'
                : 'bg-[#002116]/85 text-white border-white/20 hover:bg-white/20'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* 3.5 FLOATING SEARCH BAR (Overlay on map below category pills) */}
      <div className="absolute top-[120px] left-4 right-4 max-w-lg mx-auto z-[1000]">
        <div className="bg-white/95 backdrop-blur-md rounded-[20px] px-4 py-2.5 shadow-[0_8px_30px_rgb(0,0,0,0.25)] border border-gray-100 flex items-center gap-2.5 transition-all focus-within:ring-2 focus-within:ring-[#8bd6b6]">
          <span className="material-symbols-outlined text-gray-400 text-xl shrink-0">search</span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm địa điểm (The Hive, Nam Ô, Non Nước...)"
            className="w-full bg-transparent text-sm font-semibold text-gray-800 placeholder:text-gray-400 placeholder:font-normal outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              type="button"
              className="w-5 h-5 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-600 flex items-center justify-center shrink-0 transition-colors"
            >
              <span className="material-symbols-outlined text-xs">close</span>
            </button>
          )}
        </div>
      </div>

      {/* 4. RECENTER GPS BUTTON */}
      <button
        onClick={handleRecenterDaNang}
        type="button"
        className="absolute top-[180px] right-4 z-[1000] w-10 h-10 rounded-full bg-[#002116]/90 backdrop-blur-md border border-white/20 text-white flex items-center justify-center shadow-xl hover:bg-[#002116] active:scale-95 transition-all cursor-pointer"
        title="Về trung tâm Đà Nẵng"
      >
        <span className="material-symbols-outlined text-xl text-primary-fixed">my_location</span>
      </button>

      {/* 5. BOTTOM INFO CARD (Default: HIDDEN when selectedSpot is null) */}
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
                  onClick={() => alert(`Đang chỉ đường tới ${selectedSpot.title}...`)}
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
