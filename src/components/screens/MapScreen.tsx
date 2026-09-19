import React, { useState, useRef } from 'react';

interface MapScreenProps {
  onBack?: () => void;
}

interface FilterChip {
  id: string;
  label: string;
  query: string;
  zoom: number;
}

const FILTER_CHIPS: FilterChip[] = [
  {
    id: 'all',
    label: 'All',
    query: 'Da Nang, Vietnam',
    zoom: 13
  },
  {
    id: 'workshop',
    label: 'Craft Villages',
    query: 'traditional craft village Da Nang, Vietnam',
    zoom: 12
  },
  {
    id: 'homestay',
    label: 'Homestays',
    query: 'homestays in Da Nang, Vietnam',
    zoom: 13
  },
  {
    id: 'wifi',
    label: 'Fast Wi-Fi',
    query: 'coworking spaces and cafes fast wifi Da Nang, Vietnam',
    zoom: 14
  }
];

// Curated Da Nang landmarks for the floating "Scan / Explore" action button
const SCAN_HIGHLIGHTS = [
  { name: 'Da Nang City Center', query: 'Da Nang, Vietnam', zoom: 13 },
  { name: 'Nam O Fish Sauce Craft Village', query: 'Nam O Village, Lien Chieu, Da Nang, Vietnam', zoom: 15 },
  { name: 'Non Nuoc Stone Carving Village', query: 'Non Nuoc Stone Carving Village, Ngu Hanh Son, Da Nang, Vietnam', zoom: 15 },
  { name: 'Tuy Loan Rice Paper Village', query: 'Tuy Loan Village, Hoa Vang, Da Nang, Vietnam', zoom: 15 },
  { name: 'Museum of Cham Sculpture', query: 'Museum of Cham Sculpture, Hai Chau, Da Nang, Vietnam', zoom: 16 },
  { name: 'An Thuong Digital Nomad Quarter', query: 'An Thuong, Ngu Hanh Son, Da Nang, Vietnam', zoom: 15 },
  { name: 'Son Tra Peninsula & Linh Ung', query: 'Son Tra Peninsula, Da Nang, Vietnam', zoom: 13 }
];

const GOOGLE_MAPS_DEFAULT_URL =
  'https://maps.google.com/maps?q=Da+Nang,+Vietnam&t=&z=13&ie=UTF8&iwloc=&output=embed';

const buildGoogleMapsEmbedUrl = (query: string, zoom = 14) => {
  return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&t=&z=${zoom}&ie=UTF8&iwloc=&output=embed`;
};

export const MapScreen: React.FC<MapScreenProps> = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [iframeUrl, setIframeUrl] = useState<string>(GOOGLE_MAPS_DEFAULT_URL);
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [scanIndex, setScanIndex] = useState<number>(0);

  const inputRef = useRef<HTMLInputElement>(null);

  // Helper to show brief toast notification
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  // Handle Search Input submission
  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const query = searchQuery.trim();
    if (!query) return;

    setActiveFilter('custom');
    const fullQuery = query.toLowerCase().includes('da nang') ? query : `${query}, Da Nang, Vietnam`;
    setIframeUrl(buildGoogleMapsEmbedUrl(fullQuery, 14));
    showToast(`Searching "${query}" on Google Maps`);
  };

  // Clear search input
  const handleClearSearch = () => {
    setSearchQuery('');
    setActiveFilter('all');
    setIframeUrl(GOOGLE_MAPS_DEFAULT_URL);
    showToast('Reset to Da Nang City');
    if (inputRef.current) inputRef.current.focus();
  };

  // Handle Filter Pill Click
  const handleFilterClick = (chip: FilterChip) => {
    setActiveFilter(chip.id);
    setSearchQuery('');
    setIframeUrl(buildGoogleMapsEmbedUrl(chip.query, chip.zoom));
    showToast(`Showing ${chip.label}`);
  };

  // Recenter to default Da Nang center
  const handleRecenterDaNang = () => {
    setActiveFilter('all');
    setSearchQuery('');
    setIframeUrl(GOOGLE_MAPS_DEFAULT_URL);
    showToast('Re-centered on Da Nang City');
  };

  // Scan / Cycle through Da Nang highlights
  const handleScanExplore = () => {
    const nextIndex = (scanIndex + 1) % SCAN_HIGHLIGHTS.length;
    setScanIndex(nextIndex);
    const target = SCAN_HIGHLIGHTS[nextIndex];
    setActiveFilter('custom');
    setIframeUrl(buildGoogleMapsEmbedUrl(target.query, target.zoom));
    showToast(`Exploring: ${target.name}`);
  };

  // HTML5 User Location Geolocation
  const handleMyLocation = () => {
    if (!navigator.geolocation) {
      showToast('Geolocation is not supported by your browser.');
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setIsLocating(false);
        const { latitude, longitude } = position.coords;
        setIframeUrl(buildGoogleMapsEmbedUrl(`${latitude},${longitude}`, 15));
        showToast('Located your current position!');
      },
      (error) => {
        setIsLocating(false);
        console.warn('Geolocation error:', error);
        showToast('Unable to retrieve GPS location.');
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  return (
    <div
      className="bg-[#001710] text-white h-screen w-screen relative font-sans overflow-hidden select-none"
      style={{ height: '100vh', width: '100vw', minHeight: '100vh' }}
    >
      {/* 1. EMBEDDED GOOGLE MAPS IFRAME OPTIMIZED FOR MOBILE TOUCH & FLUID GESTURES */}
      {/* touch-action: pan-x pan-y allows one- and two-finger dragging/panning without triggering scroll-trap warnings */}
      <div
        className="w-full h-full absolute inset-0 overflow-hidden pointer-events-auto"
        style={{
          touchAction: 'pan-x pan-y',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        <iframe
          title="Google Maps Da Nang"
          src={iframeUrl}
          className="w-full h-full border-0 absolute inset-0 pointer-events-auto"
          style={{
            touchAction: 'pan-x pan-y',
            width: '100%',
            height: '100%',
            border: 0
          }}
          loading="lazy"
          allowFullScreen
          tabIndex={0}
        />
      </div>

      {/* 2. FLOATING UI CONTROLS LAYER */}
      <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
        
        {/* Top Floating Controls (Search Bar + Category Filters) */}
        {/* Positioned right below the fixed app header (top-16) with touch-friendly spacing */}
        <div className="pointer-events-auto absolute top-18 sm:top-20 left-0 w-full px-3 sm:px-4 flex flex-col items-center gap-2">
          
          {/* Floating Search Bar */}
          <div className="w-full max-w-lg">
            <form onSubmit={handleSearchSubmit} className="relative">
              <div className="bg-white/95 backdrop-blur-md rounded-2xl px-3.5 sm:px-4 py-2 sm:py-2.5 shadow-[0_8px_30px_rgb(0,0,0,0.3)] border border-gray-100 flex items-center gap-2 sm:gap-2.5 transition-all focus-within:ring-2 focus-within:ring-[#8bd6b6]">
                <span className="material-symbols-outlined text-gray-400 text-xl shrink-0">
                  search
                </span>

                <input
                  ref={inputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search places (cafes, coworking, villages)..."
                  className="w-full bg-transparent text-sm font-semibold text-gray-800 placeholder:text-gray-400 placeholder:font-normal outline-none"
                />

                {searchQuery && (
                  <button
                    onClick={handleClearSearch}
                    type="button"
                    className="w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 flex items-center justify-center shrink-0 transition-colors cursor-pointer active:scale-95"
                    title="Clear search"
                  >
                    <span className="material-symbols-outlined text-sm">close</span>
                  </button>
                )}

                <button
                  type="submit"
                  disabled={!searchQuery.trim()}
                  className="px-3 sm:px-3.5 py-1 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white text-xs font-bold rounded-xl transition-all shrink-0 cursor-pointer shadow active:scale-95"
                >
                  Search
                </button>
              </div>
            </form>
          </div>

          {/* Top Category Filter Pills */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar py-1 max-w-full px-1">
            {FILTER_CHIPS.map((chip) => (
              <button
                key={chip.id}
                onClick={() => handleFilterClick(chip)}
                type="button"
                className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap backdrop-blur-md border shadow-xl transition-all cursor-pointer active:scale-95 ${
                  activeFilter === chip.id
                    ? 'bg-[#8bd6b6] text-[#002116] border-[#8bd6b6] shadow-emerald-950/40 ring-2 ring-[#8bd6b6]/40'
                    : 'bg-[#002116]/85 text-white border-white/20 hover:bg-white/20'
                }`}
              >
                {chip.label}
              </button>
            ))}
          </div>

        </div>

        {/* Floating Right-Hand Action Buttons (Re-center / Scan / Geolocation) */}
        {/* Adjusted vertical position and sizing for comfortable thumb tapping on touchscreens */}
        <div className="pointer-events-auto absolute top-44 sm:top-48 right-3 sm:right-4 flex flex-col gap-2.5 z-20">
          {/* Geolocation Button */}
          <button
            onClick={handleMyLocation}
            disabled={isLocating}
            type="button"
            className="w-11 h-11 rounded-full bg-[#002116]/90 backdrop-blur-md border border-white/20 text-white flex items-center justify-center shadow-xl hover:bg-[#002116] active:scale-90 transition-all cursor-pointer disabled:opacity-50"
            title="Locate my position"
          >
            <span className={`material-symbols-outlined text-xl text-cyan-300 ${isLocating ? 'animate-spin' : ''}`}>
              {isLocating ? 'sync' : 'my_location'}
            </span>
          </button>

          {/* Re-center Da Nang Button */}
          <button
            onClick={handleRecenterDaNang}
            type="button"
            className="w-11 h-11 rounded-full bg-[#002116]/90 backdrop-blur-md border border-white/20 text-white flex items-center justify-center shadow-xl hover:bg-[#002116] active:scale-90 transition-all cursor-pointer"
            title="Re-center Da Nang"
          >
            <span className="material-symbols-outlined text-xl text-[#8bd6b6]">center_focus_strong</span>
          </button>

          {/* Scan / Explore Next Landmark Button */}
          <button
            onClick={handleScanExplore}
            type="button"
            className="w-11 h-11 rounded-full bg-[#002116]/90 backdrop-blur-md border border-white/20 text-white flex items-center justify-center shadow-xl hover:bg-[#002116] active:scale-90 transition-all cursor-pointer"
            title="Scan / Explore Next Landmark"
          >
            <span className="material-symbols-outlined text-xl text-amber-300">radar</span>
          </button>
        </div>

        {/* Toast Notification Banner */}
        {toastMessage && (
          <div className="pointer-events-none absolute top-36 sm:top-40 left-1/2 -translate-x-1/2 z-30 bg-black/85 text-emerald-300 border border-emerald-400/40 text-xs font-bold px-4 py-2 rounded-full shadow-2xl backdrop-blur-md animate-fadeIn whitespace-nowrap">
            {toastMessage}
          </div>
        )}

      </div>
    </div>
  );
};

export default MapScreen;
