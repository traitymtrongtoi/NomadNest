import React, { useState, useEffect, useRef, useCallback } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MOCK_MAP_SPOTS, MOCK_VILLAGES } from '../../data/mockData';
import { UnifiedMapSpot, NormalizedMapPlace } from '../../types';

// Fix default Leaflet icon paths
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

interface MapScreenProps {
  onBack?: () => void;
}

const FILTER_CHIPS = [
  { id: 'all', label: 'Tất cả', type: 'local' },
  { id: 'workshop', label: 'Làng nghề truyền thống', type: 'local' },
  { id: 'wifi', label: 'Fast Wi-Fi (100+ Mbps)', type: 'serpapi', query: 'coworking cafe fast wifi Da Nang' },
  { id: 'co_working', label: 'Không gian làm việc', type: 'serpapi', query: 'coworking space Da Nang' },
  { id: 'cafe', label: 'Cà phê yên tĩnh', type: 'serpapi', query: 'quiet cafe Da Nang' },
  { id: 'food', label: 'Local Food & Làng chài', type: 'serpapi', query: 'local specialty restaurants Da Nang' }
];

// Coordinates mapping for NomadNest Craft Villages
const VILLAGE_COORDINATES: Record<string, { lat: number; lng: number }> = {
  nam_o: { lat: 16.1264, lng: 108.1219 },
  tuy_loan: { lat: 15.9922, lng: 108.1578 },
  non_nuoc: { lat: 16.0041, lng: 108.2618 },
  cam_ne: { lat: 15.9680, lng: 108.1880 },
  man_thai: { lat: 16.0880, lng: 108.2380 }
};

// Convert MOCK_VILLAGES to UnifiedMapSpot
const CRAFT_VILLAGE_SPOTS: UnifiedMapSpot[] = MOCK_VILLAGES.map(v => {
  const coords = VILLAGE_COORDINATES[v.id] || { lat: 16.0544, lng: 108.2022 };
  return {
    id: `village_${v.id}`,
    sourceType: 'craft_village',
    title: v.name,
    subtitle: v.slogan || v.category,
    address: v.location,
    category: 'Làng nghề truyền thống',
    lat: coords.lat,
    lng: coords.lng,
    rating: 4.9,
    reviewsCount: 150,
    quietLevel: 'Di sản & Văn hoá',
    wifiSpeed: '100+ Mbps',
    image: v.image || v.imageUrl,
    maps_link: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(v.name + ' ' + v.location)}`
  };
});

// Convert MOCK_MAP_SPOTS to UnifiedMapSpot
const CURATED_LOCAL_SPOTS: UnifiedMapSpot[] = MOCK_MAP_SPOTS.map(spot => ({
  id: `curated_${spot.id}`,
  sourceType: 'curated_spot',
  title: spot.title,
  subtitle: spot.locationName,
  address: spot.locationName,
  category: spot.category === 'co_working' ? 'Không gian làm việc' : spot.category === 'cafe' ? 'Cà phê yên tĩnh' : spot.category === 'food' ? 'Ẩm thực địa phương' : 'Làng nghề',
  lat: spot.lat,
  lng: spot.lng,
  rating: spot.rating,
  reviewsCount: spot.reviewsCount,
  wifiSpeed: spot.wifiSpeed,
  quietLevel: spot.quietLevel,
  image: spot.image,
  maps_link: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(spot.title + ' Da Nang')}`
}));

// Session-level in-memory cache for SerpApi results to minimize API overhead
const searchCache = new Map<string, UnifiedMapSpot[]>();

export const MapScreen: React.FC<MapScreenProps> = ({ onBack }) => {
  const [selectedSpot, setSelectedSpot] = useState<UnifiedMapSpot | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [displayedSpots, setDisplayedSpots] = useState<UnifiedMapSpot[]>([...CRAFT_VILLAGE_SPOTS, ...CURATED_LOCAL_SPOTS]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [offlineDownloaded, setOfflineDownloaded] = useState<boolean>(false);
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersGroupRef = useRef<L.LayerGroup | null>(null);
  const userMarkerRef = useRef<L.Marker | null>(null);

  // Helper to show brief toast notification
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Perform SerpApi Google Maps search via server-side /api/maps/search endpoint
  const executeSerpApiSearch = useCallback(async (query: string, filterLabel?: string) => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) return;

    // Check session cache first
    const cacheKey = trimmedQuery.toLowerCase();
    if (searchCache.has(cacheKey)) {
      const cached = searchCache.get(cacheKey)!;
      setDisplayedSpots(cached);
      setSearchError(null);
      showToast(`Đã tải ${cached.length} địa điểm (${filterLabel || trimmedQuery})`);
      fitMapToSpots(cached);
      return;
    }

    setIsLoading(true);
    setSearchError(null);

    try {
      const response = await fetch('/api/maps/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ q: trimmedQuery })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Lỗi máy chủ (${response.status})`);
      }

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.error || 'Không thể tìm kiếm địa điểm');
      }

      const results: NormalizedMapPlace[] = data.results || [];
      
      // Filter results that have valid latitude & longitude
      const validSpots: UnifiedMapSpot[] = results
        .filter(place => place.latitude !== undefined && place.longitude !== undefined && !isNaN(place.latitude) && !isNaN(place.longitude))
        .map((place, idx) => ({
          id: `serp_${place.place_id || idx}_${Date.now()}`,
          sourceType: 'google_maps_serpapi',
          title: place.title,
          subtitle: place.type,
          address: place.address,
          category: place.type || 'Địa điểm Google Maps',
          lat: place.latitude!,
          lng: place.longitude!,
          rating: place.rating,
          reviewsCount: place.reviews,
          phone: place.phone,
          website: place.website,
          hours: place.hours,
          image: place.thumbnail || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
          maps_link: place.maps_link || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.title + ' ' + (place.address || ''))}`
        }));

      // Cache session results
      searchCache.set(cacheKey, validSpots);
      setDisplayedSpots(validSpots);

      if (validSpots.length === 0) {
        showToast(`Không tìm thấy kết quả nào cho "${trimmedQuery}"`);
      } else {
        showToast(`Tìm thấy ${validSpots.length} địa điểm thực tế từ Google Maps`);
        fitMapToSpots(validSpots);
      }
    } catch (err: any) {
      console.error('Error fetching places:', err);
      setSearchError(err?.message || 'Không thể kết nối đến dịch vụ tìm kiếm');
      showToast('Lỗi khi tải dữ liệu bản đồ. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fit map view smoothly to result spots
  const fitMapToSpots = (spots: UnifiedMapSpot[]) => {
    const map = mapInstanceRef.current;
    if (!map || spots.length === 0) return;

    if (spots.length === 1) {
      map.flyTo([spots[0].lat, spots[0].lng], 15, { duration: 1 });
    } else {
      const bounds = L.latLngBounds(spots.map(s => [s.lat, s.lng]));
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 14, animate: true });
    }
  };

  // Handle Search Input submission (Enter or click)
  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) return;

    setActiveFilter('custom');
    executeSerpApiSearch(searchQuery);
  };

  // Handle Filter Pill Click
  const handleFilterClick = (chip: typeof FILTER_CHIPS[0]) => {
    setActiveFilter(chip.id);
    setSelectedSpot(null);
    setSearchError(null);

    if (chip.id === 'all') {
      const allDefault = [...CRAFT_VILLAGE_SPOTS, ...CURATED_LOCAL_SPOTS];
      setDisplayedSpots(allDefault);
      fitMapToSpots(allDefault);
      showToast('Hiển thị tất cả Làng nghề & Điểm Nomad');
    } else if (chip.id === 'workshop') {
      setDisplayedSpots(CRAFT_VILLAGE_SPOTS);
      fitMapToSpots(CRAFT_VILLAGE_SPOTS);
      showToast('Hiển thị 5 Làng nghề truyền thống Đà Nẵng');
    } else if (chip.query) {
      // Trigger SerpApi search for the category
      executeSerpApiSearch(chip.query, chip.label);
    }
  };

  // Clear search input
  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchError(null);
    setActiveFilter('all');
    const allDefault = [...CRAFT_VILLAGE_SPOTS, ...CURATED_LOCAL_SPOTS];
    setDisplayedSpots(allDefault);
    fitMapToSpots(allDefault);
    if (inputRef.current) inputRef.current.focus();
  };

  // 1. Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    const map = L.map(mapContainerRef.current, {
      zoomControl: false,
      attributionControl: false
    }).setView([16.0544, 108.2022], 12);

    // OpenStreetMap Tile Layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Add Zoom Control at top right
    L.control.zoom({ position: 'topright' }).addTo(map);

    // Add Attribution Control at bottom right
    L.control.attribution({ position: 'bottomright', prefix: false }).addTo(map);

    // Invalidate map size to ensure tile calculation after DOM paint
    setTimeout(() => {
      map.invalidateSize();
    }, 200);

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

  // 2. Render Markers on map when displayedSpots or selectedSpot changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    const markersGroup = markersGroupRef.current;
    if (!map || !markersGroup) return;

    markersGroup.clearLayers();

    displayedSpots.forEach(spot => {
      const isSelected = selectedSpot?.id === spot.id;
      const isVillage = spot.sourceType === 'craft_village';
      const isSerpApi = spot.sourceType === 'google_maps_serpapi';

      // Pick icon based on source & category
      let iconName = 'location_on';
      if (isVillage) {
        iconName = 'palette';
      } else if (spot.category.toLowerCase().includes('co_working') || spot.category.toLowerCase().includes('work')) {
        iconName = 'wifi';
      } else if (spot.category.toLowerCase().includes('cafe') || spot.category.toLowerCase().includes('cà phê')) {
        iconName = 'local_cafe';
      } else if (spot.category.toLowerCase().includes('food') || spot.category.toLowerCase().includes('restaurant') || spot.category.toLowerCase().includes('ẩm thực')) {
        iconName = 'restaurant';
      }

      // Visual styling distinction: Craft Village (Emerald Gold) vs Google Maps (Cyan Dark)
      const badgeBg = isVillage
        ? isSelected ? 'bg-amber-400 text-slate-950 font-black ring-4 ring-amber-300/50' : 'bg-emerald-800 text-amber-200 border-amber-400/40'
        : isSerpApi
        ? isSelected ? 'bg-[#8bd6b6] text-[#002116] font-bold ring-4 ring-[#8bd6b6]/50' : 'bg-[#002116] text-white border-white/30'
        : isSelected ? 'bg-[#8bd6b6] text-[#002116] font-bold ring-4 ring-[#8bd6b6]/50' : 'bg-emerald-950 text-white border-white/20';

      const pinColor = isVillage
        ? isSelected ? 'bg-amber-400' : 'bg-emerald-800'
        : isSelected ? 'bg-[#8bd6b6]' : 'bg-[#002116]';

      const customIcon = L.divIcon({
        className: 'custom-leaflet-marker',
        html: `
          <div class="cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 ${isSelected ? 'scale-115 z-50' : 'hover:scale-105'}">
            <div class="px-2.5 py-1.5 rounded-2xl backdrop-blur-md border flex items-center gap-1.5 shadow-2xl ${badgeBg}">
              <span class="material-symbols-outlined text-sm shrink-0">${iconName}</span>
              <div class="text-left pr-0.5 overflow-hidden">
                <p class="text-[11px] font-bold leading-none truncate max-w-[130px]">${spot.title}</p>
                <div class="flex items-center gap-1 mt-0.5">
                  ${isVillage ? '<span class="text-[8px] uppercase tracking-wider text-amber-300 font-extrabold">Làng nghề</span>' : ''}
                  ${spot.rating ? `<span class="text-[9px] font-semibold flex items-center gap-0.5 opacity-90">★ ${spot.rating}</span>` : ''}
                  ${spot.wifiSpeed ? `<span class="text-[8px] opacity-75 truncate max-w-[60px]">• ${spot.wifiSpeed}</span>` : ''}
                </div>
              </div>
            </div>
            <div class="w-2.5 h-2.5 ${pinColor} rotate-45 mx-auto -mt-1.5 border-r border-b border-white/30 shadow-md"></div>
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
  }, [displayedSpots, selectedSpot]);

  // Recenter to Da Nang center
  const handleRecenterDaNang = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([16.0544, 108.2022], 12, { duration: 1 });
      showToast('Đã về trung tâm Đà Nẵng');
    }
  };

  // HTML5 User Location Geolocation
  const handleMyLocation = () => {
    if (!navigator.geolocation) {
      showToast('Trình duyệt của bạn không hỗ trợ GPS.');
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

          if (userMarkerRef.current) {
            userMarkerRef.current.setLatLng([latitude, longitude]);
          } else {
            const userIcon = L.divIcon({
              className: 'custom-user-marker',
              html: `
                <div class="relative flex items-center justify-center -translate-x-1/2 -translate-y-1/2">
                  <div class="w-8 h-8 rounded-full bg-cyan-400/40 animate-ping absolute"></div>
                  <div class="w-5 h-5 rounded-full bg-cyan-400 border-2 border-white shadow-xl relative z-10 flex items-center justify-center">
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
        showToast('Không thể lấy vị trí hiện tại. Vui lòng cho phép quyền truy cập GPS.');
        handleRecenterDaNang();
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  return (
    <div className="bg-[#002116] text-white h-screen w-screen relative font-sans overflow-hidden select-none" style={{ height: '100vh', width: '100vw', minHeight: '100vh' }}>
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
            <span className="material-symbols-outlined text-[#8bd6b6]">map</span>
            <span className="font-bold text-lg text-white">Smart Maps</span>
          </div>
        )}

        <div className="text-center">
          <h1 className="font-bold text-sm sm:text-base text-[#8bd6b6] leading-tight">
            Smart Maps Đà Nẵng
          </h1>
          <p className="text-[10px] text-white/70">Di sản Làng Nghề & Workation Hubs</p>
        </div>

        <button
          onClick={() => {
            const nextState = !offlineDownloaded;
            setOfflineDownloaded(nextState);
            showToast(nextState ? 'Đã lưu bản đồ offline thành công!' : 'Đã xoá bản đồ offline');
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

      {/* 2. LEAFLET MAP CONTAINER (Pure OSM Tiles) */}
      <div
        ref={mapContainerRef}
        id="leaflet-map-container"
        className="w-full h-full absolute inset-0 z-0 bg-slate-900"
        style={{ width: '100%', height: '100%', minHeight: '100vh', position: 'absolute', top: 0, left: 0, zIndex: 0 }}
      />

      {/* 3. FLOATING CATEGORY PILLS */}
      <div className="absolute top-18 left-0 w-full z-[1000] px-4 sm:px-6 flex gap-2 overflow-x-auto no-scrollbar py-1">
        {FILTER_CHIPS.map(chip => (
          <button
            key={chip.id}
            onClick={() => handleFilterClick(chip)}
            type="button"
            disabled={isLoading}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap backdrop-blur-md border shadow-xl transition-all cursor-pointer ${
              activeFilter === chip.id
                ? 'bg-[#8bd6b6] text-[#002116] border-[#8bd6b6] shadow-emerald-950/40 ring-2 ring-[#8bd6b6]/40'
                : 'bg-[#002116]/85 text-white border-white/20 hover:bg-white/20'
            } disabled:opacity-50`}
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* 4. FLOATING SEARCH BAR (Connected to /api/maps/search) */}
      <div className="absolute top-[120px] left-4 right-4 max-w-lg mx-auto z-[1000]">
        <form onSubmit={handleSearchSubmit} className="relative">
          <div className="bg-white/95 backdrop-blur-md rounded-[20px] px-4 py-2.5 shadow-[0_8px_30px_rgb(0,0,0,0.25)] border border-gray-100 flex items-center gap-2.5 transition-all focus-within:ring-2 focus-within:ring-[#8bd6b6]">
            {isLoading ? (
              <span className="material-symbols-outlined text-emerald-600 text-xl animate-spin shrink-0">
                progress_activity
              </span>
            ) : (
              <span className="material-symbols-outlined text-gray-400 text-xl shrink-0">
                search
              </span>
            )}
            
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm địa điểm (cà phê, coworking, làng nghề...)"
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

            <button
              type="submit"
              disabled={isLoading || !searchQuery.trim()}
              className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white text-xs font-bold rounded-xl transition-all shrink-0 cursor-pointer shadow"
            >
              Tìm
            </button>
          </div>
        </form>

        {/* Error Banner with Retry */}
        {searchError && (
          <div className="mt-2 bg-red-950/90 border border-red-500/40 text-red-200 text-xs px-3.5 py-2 rounded-xl backdrop-blur-md flex items-center justify-between shadow-lg">
            <span>{searchError}</span>
            <button
              onClick={() => handleSearchSubmit()}
              className="underline font-bold hover:text-white ml-2 cursor-pointer"
            >
              Thử lại
            </button>
          </div>
        )}
      </div>

      {/* 5. RECENTER & GPS BUTTONS */}
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
          <span className="material-symbols-outlined text-xl text-[#8bd6b6]">center_focus_strong</span>
        </button>
      </div>

      {/* 6. TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="absolute top-[180px] left-1/2 -translate-x-1/2 z-[1100] bg-black/85 text-emerald-300 border border-emerald-400/40 text-xs font-bold px-4 py-2 rounded-full shadow-2xl backdrop-blur-md animate-fadeIn whitespace-nowrap">
          {toastMessage}
        </div>
      )}

      {/* 7. BOTTOM DETAIL CARD (Opens when any marker is clicked) */}
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

            {/* Spot Thumbnail */}
            {selectedSpot.image && (
              <img
                src={selectedSpot.image}
                alt={selectedSpot.title}
                className="w-full md:w-32 h-28 object-cover rounded-2xl shrink-0 shadow-md border border-white/10"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            )}

            {/* Spot Info Details */}
            <div className="flex-1 w-full pr-6">
              <div className="flex justify-between items-start gap-2">
                <div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {selectedSpot.sourceType === 'craft_village' ? (
                      <span className="text-[10px] font-black bg-amber-400/20 text-amber-300 border border-amber-400/40 px-2 py-0.5 rounded-full uppercase tracking-wider">
                        Làng nghề truyền thống
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-[#8bd6b6] uppercase tracking-wider">
                        {selectedSpot.category}
                      </span>
                    )}

                    {selectedSpot.quietLevel && (
                      <span className="text-[10px] text-white/70 bg-white/10 px-2 py-0.5 rounded-full">
                        {selectedSpot.quietLevel}
                      </span>
                    )}
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white leading-snug mt-1">
                    {selectedSpot.title}
                  </h3>

                  {selectedSpot.address && (
                    <p className="text-xs text-white/70 mt-0.5 line-clamp-1">{selectedSpot.address}</p>
                  )}
                </div>

                {/* Rating Badge */}
                {selectedSpot.rating !== undefined && (
                  <div className="flex items-center gap-1 text-xs font-bold text-amber-400 bg-black/40 px-2 py-1 rounded-full shrink-0 border border-amber-400/20">
                    <span className="material-symbols-outlined text-sm">star</span>
                    <span>{selectedSpot.rating}</span>
                    {selectedSpot.reviewsCount ? (
                      <span className="text-[10px] text-white/60">({selectedSpot.reviewsCount})</span>
                    ) : null}
                  </div>
                )}
              </div>

              {/* Operating Hours / Phone if available */}
              {(selectedSpot.hours || selectedSpot.phone) && (
                <div className="mt-1.5 text-[11px] text-white/60 flex flex-wrap gap-2">
                  {selectedSpot.hours && (
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">schedule</span>
                      <span className="truncate max-w-[200px]">{selectedSpot.hours}</span>
                    </span>
                  )}
                  {selectedSpot.phone && (
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">call</span>
                      <span>{selectedSpot.phone}</span>
                    </span>
                  )}
                </div>
              )}

              {/* Action Bar */}
              <div className="mt-3 flex items-center justify-between pt-2 border-t border-white/15">
                {selectedSpot.wifiSpeed ? (
                  <span className="text-xs font-bold text-[#8bd6b6] flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">wifi</span>
                    {selectedSpot.wifiSpeed} Verified
                  </span>
                ) : selectedSpot.website ? (
                  <a
                    href={selectedSpot.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-[#8bd6b6] hover:underline flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-sm">language</span>
                    Trang web
                  </a>
                ) : (
                  <span className="text-xs text-white/50 flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">location_on</span>
                    Đà Nẵng
                  </span>
                )}

                {/* Directions Button */}
                {selectedSpot.maps_link ? (
                  <a
                    href={selectedSpot.maps_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-[#8bd6b6] hover:bg-[#6fcba6] text-[#002116] font-bold text-xs rounded-full shadow-lg transition-all active:scale-95 cursor-pointer flex items-center gap-1 text-center"
                  >
                    <span>Chỉ Đường</span>
                    <span className="material-symbols-outlined text-xs">open_in_new</span>
                  </a>
                ) : (
                  <button
                    onClick={() => showToast(`Đang định vị tới ${selectedSpot.title}...`)}
                    type="button"
                    className="px-4 py-2 bg-[#8bd6b6] hover:bg-[#6fcba6] text-[#002116] font-bold text-xs rounded-full shadow-lg transition-all active:scale-95 cursor-pointer"
                  >
                    Chỉ Đường
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapScreen;
