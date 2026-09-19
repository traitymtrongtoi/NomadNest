import React, { useState } from 'react';
import { MOCK_EVENTS } from '../../data/mockData';
import { Village, User, EventItem } from '../../types';
import {
  ThreeDHomeIcon,
  ThreeDTranslatorIcon,
  ThreeDSmartMapsIcon,
  ThreeDGrabIcon,
} from '../common/ThreeDActionIcons';
import { EmergencyModal } from '../common/EmergencyModal';
import { AIChatbotModal } from '../common/AIChatbotModal';
import { EventDetailModal } from '../common/EventDetailModal';

interface HomeScreenProps {
  currentUser: User | null;
  onNavigateSearch: (query?: string) => void;
  onNavigateVillageDetail?: (village: Village) => void;
  onNavigateTranslator: () => void;
  onNavigateMap: () => void;
  onNavigateGrab: () => void;
  onNavigateLocalGuide?: () => void;
  onNavigateServices?: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  currentUser,
  onNavigateSearch,
  onNavigateTranslator,
  onNavigateMap,
  onNavigateGrab,
  onNavigateLocalGuide,
  onNavigateServices,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigateSearch(searchQuery);
  };

  return (
    <div
      className="font-sans relative min-h-screen pb-24 text-white"
      style={{
        background: 'linear-gradient(rgb(10, 79, 61) 0%, rgb(10, 79, 61) 30%, rgb(15, 107, 87) 60%, rgb(245, 251, 248) 100%)'
      }}
    >
      <main className="pt-20 px-6 flex flex-col gap-6 max-w-4xl mx-auto">
        {/* Greeting & Weather */}
        <section className="flex flex-col gap-1 mt-2">
          <h1 className="text-3xl font-extrabold text-white leading-tight">
            Good Morning,<br />
            {currentUser?.name || 'Explorer'}
          </h1>
          <div className="flex items-center gap-1 text-white/90 text-sm font-medium">
            <span className="material-symbols-outlined text-amber-300 text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
              wb_sunny
            </span>
            <span>Da Nang, 28°C Sunny</span>
          </div>
        </section>

        {/* Search Bar */}
        <section>
          <form onSubmit={handleSearch} className="relative w-full">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-white/80">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search villages, services, food or attractions..."
              className="w-full h-14 pl-12 pr-4 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 text-white placeholder:text-white/80 font-normal outline-none focus:ring-2 focus:ring-white shadow-lg"
            />
          </form>
        </section>

        {/* Quick Actions (Bento Grid with 3D Photorealistic Models) */}
        <section className="flex justify-between items-start gap-2 overflow-x-auto no-scrollbar py-1">
          <button onClick={() => onNavigateSearch()} className="flex flex-col items-center gap-1.5 min-w-[72px] group">
            <div className="w-16 h-16 rounded-2xl bg-white p-1.5 shadow-lg border border-white/60 active:scale-95 transition-all flex items-center justify-center overflow-hidden relative group-hover:shadow-2xl group-hover:border-emerald-300">
              <ThreeDHomeIcon className="w-full h-full group-hover:scale-110 transition-transform duration-300" />
            </div>
            <span className="text-xs text-white font-semibold text-center shadow-sm">Find Home</span>
          </button>

          <button onClick={onNavigateTranslator} className="flex flex-col items-center gap-1.5 min-w-[72px] group">
            <div className="w-16 h-16 rounded-2xl bg-white p-1.5 shadow-lg border border-white/60 active:scale-95 transition-all flex items-center justify-center overflow-hidden relative group-hover:shadow-2xl group-hover:border-emerald-300">
              <ThreeDTranslatorIcon className="w-full h-full group-hover:scale-110 transition-transform duration-300" />
            </div>
            <span className="text-xs text-white font-semibold text-center shadow-sm">Translator</span>
          </button>

          <button onClick={onNavigateMap} className="flex flex-col items-center gap-1.5 min-w-[72px] group">
            <div className="w-16 h-16 rounded-2xl bg-white p-1.5 shadow-lg border border-white/60 active:scale-95 transition-all flex items-center justify-center overflow-hidden relative group-hover:shadow-2xl group-hover:border-emerald-300">
              <ThreeDSmartMapsIcon className="w-full h-full group-hover:scale-110 transition-transform duration-300" />
            </div>
            <span className="text-xs text-white font-semibold text-center shadow-sm">Smart Maps</span>
          </button>

          <button onClick={onNavigateGrab} className="flex flex-col items-center gap-1.5 min-w-[72px] group">
            <div className="w-16 h-16 rounded-2xl bg-white p-1.5 shadow-lg border border-white/60 active:scale-95 transition-all flex items-center justify-center overflow-hidden relative group-hover:shadow-2xl group-hover:border-emerald-300">
              <ThreeDGrabIcon className="w-full h-full group-hover:scale-110 transition-transform duration-300" />
            </div>
            <span className="text-xs text-white font-semibold text-center shadow-sm">Grab</span>
          </button>
        </section>

        {/* Events in Da Nang */}
        <section className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-white drop-shadow-sm">Events in Da Nang</h2>
              <span className="hidden sm:inline-flex bg-[#8bd6b6]/20 text-[#8bd6b6] text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#8bd6b6]/30">
                2 Featured Events
              </span>
            </div>
            <button
              onClick={() => setSelectedEvent(MOCK_EVENTS[0])}
              type="button"
              className="text-xs text-[#8bd6b6] hover:text-white font-semibold cursor-pointer hover:underline transition-all active:scale-95 flex items-center gap-0.5"
            >
              <span>See all</span>
              <span className="material-symbols-outlined text-sm">chevron_right</span>
            </button>
          </div>

          {/* Clean 2-card responsive grid layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            {MOCK_EVENTS.slice(0, 2).map(evt => (
              <div
                key={evt.id}
                onClick={() => setSelectedEvent(evt)}
                className="w-full rounded-2xl overflow-hidden shadow-xl flex flex-col bg-[#00261a]/95 backdrop-blur-md text-white cursor-pointer transition-all duration-300 ease-in-out hover:scale-[1.015] hover:shadow-2xl border border-white/15 hover:border-[#8bd6b6]/60 active:scale-[0.98] group"
              >
                {/* Responsive Image Header with object-fit: cover */}
                <div className="h-44 sm:h-48 w-full overflow-hidden relative aspect-[16/10] bg-[#001810]">
                  <img
                    src={evt.image}
                    alt={evt.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  {/* Contrast Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#00261a] via-transparent to-black/25 pointer-events-none" />

                  {/* Badge */}
                  <div className="absolute top-2.5 right-2.5 bg-[#8bd6b6] text-[#002116] text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shadow-md uppercase tracking-wider">
                    Featured Event
                  </div>
                </div>

                {/* Card Content in Dark Green Aesthetic */}
                <div className="p-4 sm:p-5 flex flex-col gap-1 flex-1 justify-between">
                  <div>
                    <h3 className="font-bold text-base sm:text-lg text-white group-hover:text-[#8bd6b6] transition-colors leading-snug line-clamp-1">
                      {evt.title}
                    </h3>
                    <p className="text-xs text-white/75 line-clamp-2 mt-1.5 leading-relaxed">
                      {evt.description}
                    </p>

                    <div className="flex flex-col gap-1.5 mt-3 text-xs text-white/80">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm text-[#8bd6b6]">calendar_month</span>
                        <span className="font-medium text-white/90">{evt.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm text-[#8bd6b6]">location_on</span>
                        <span className="truncate font-medium text-white/90">{evt.location}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedEvent(evt);
                    }}
                    type="button"
                    className="mt-4 w-full py-2.5 rounded-xl bg-white/10 text-[#8bd6b6] border border-white/15 group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-500 font-bold text-xs transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <span>View Event Details</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Local Guide Banner */}
        <section>
          <div
            onClick={onNavigateLocalGuide}
            className="relative w-full h-60 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl border border-white/50 group cursor-pointer transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] bg-[#002116]"
            style={{ cursor: 'pointer' }}
          >
            <img
              src="https://www.agoda.com/wp-content/uploads/2024/08/Da-Nang-Dragon-Bridge-featured-1244x700.jpg"
              alt="Da Nang Dragon Bridge"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1244&q=80';
              }}
            />
            {/* Dark gradient overlay to ensure text contrast and legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent group-hover:via-black/35 transition-all pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-full p-5 flex flex-col gap-1.5 z-10 pointer-events-none">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-primary/90 backdrop-blur-md text-white text-[10px] font-extrabold uppercase tracking-wider w-fit shadow">
                  Local Guide
                </span>
                <span className="text-xs font-bold text-[#8bd6b6] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  <span>Explore Now</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </span>
              </div>
              <h3 className="text-xl font-extrabold text-white leading-tight group-hover:text-[#8bd6b6] transition-colors drop-shadow">
                Discover Da Nang through food and heritage.
              </h3>
            </div>
          </div>
        </section>

        {/* Popular Services */}
        <section className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900 drop-shadow-sm">Popular Services</h2>
            {onNavigateServices && (
              <button
                onClick={onNavigateServices}
                type="button"
                className="text-xs text-emerald-800 hover:text-emerald-950 font-semibold cursor-pointer hover:underline transition-all flex items-center gap-0.5"
              >
                <span>View All</span>
                <span className="material-symbols-outlined text-sm">chevron_right</span>
              </button>
            )}
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {/* Massage & Spa Card */}
            <div
              onClick={() => onNavigateServices ? onNavigateServices() : onNavigateSearch('spa')}
              className="bg-white rounded-2xl overflow-hidden shadow-md text-gray-900 border border-gray-100 hover:border-emerald-300 hover:shadow-xl transition-all duration-300 active:scale-[0.98] cursor-pointer group flex flex-col"
            >
              <div className="h-28 sm:h-36 w-full relative overflow-hidden bg-gray-100">
                <img
                  src="https://charmspagrand.com/uploads/images/images/go%CC%A3%CC%82i%20%C4%91a%CC%82u%CC%80%20du%CC%9Bo%CC%9B%CC%83ng%20sinh%20nha%20trang.JPG"
                  alt="Massage & Spa"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>
              <div className="p-3 sm:p-3.5 flex items-center justify-between bg-white">
                <span className="text-xs sm:text-sm font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">
                  Massage & Spa
                </span>
                <span className="material-symbols-outlined text-primary text-sm sm:text-base group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </div>
            </div>

            {/* Motorbike Rental Card */}
            <div
              onClick={() => onNavigateServices ? onNavigateServices() : onNavigateSearch('rental')}
              className="bg-white rounded-2xl overflow-hidden shadow-md text-gray-900 border border-gray-100 hover:border-emerald-300 hover:shadow-xl transition-all duration-300 active:scale-[0.98] cursor-pointer group flex flex-col"
            >
              <div className="h-28 sm:h-36 w-full relative overflow-hidden bg-gray-100">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4lAIdMxCYjobtwnht9td6cEhv1NqB-ihHbBU-qfBI_xtAyukXJEjBr-M&s=10"
                  alt="Motorbike Rental"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>
              <div className="p-3 sm:p-3.5 flex items-center justify-between bg-white">
                <span className="text-xs sm:text-sm font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">
                  Motorbike Rental
                </span>
                <span className="material-symbols-outlined text-primary text-sm sm:text-base group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Floating Action Buttons (FABs) - Clean & Modern 3D Green Accent */}
      <div className="fixed bottom-24 right-5 flex flex-col gap-3.5 z-40 items-end">
        {/* FAB 1: Emergency Contact */}
        <button
          onClick={() => setIsEmergencyOpen(true)}
          className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-[#003829] to-emerald-600 text-white shadow-2xl flex items-center justify-center active:scale-92 border-2 border-white/40 hover:border-emerald-300 transition-all cursor-pointer group relative"
          title="24/7 Emergency Support"
        >
          <span className="material-symbols-outlined text-2xl drop-shadow group-hover:scale-110 transition-transform">
            phone_in_talk
          </span>
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-red-500 border-2 border-white animate-pulse" />
        </button>

        {/* FAB 2: AI Chatbot Sheep */}
        <button
          onClick={() => setIsChatbotOpen(true)}
          className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-2xl flex items-center justify-center active:scale-92 border-2 border-white/40 hover:border-emerald-200 transition-all cursor-pointer group relative text-2xl"
          title="NomadNest AI Assistant (Sheep 🐑)"
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
      <EventDetailModal
        event={selectedEvent}
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        onOpenMap={onNavigateMap}
      />
    </div>
  );
};
