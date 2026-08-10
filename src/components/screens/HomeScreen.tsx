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
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  currentUser,
  onNavigateSearch,
  onNavigateTranslator,
  onNavigateMap,
  onNavigateGrab,
  onNavigateLocalGuide,
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
            {currentUser?.name || 'Sarah Johnson'}
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
            <h2 className="text-xl font-bold text-white drop-shadow-sm">Events in Da Nang</h2>
            <button
              onClick={() => setSelectedEvent(MOCK_EVENTS[0])}
              type="button"
              className="text-xs text-[#8bd6b6] hover:text-white font-semibold cursor-pointer hover:underline transition-all active:scale-95"
            >
              See all
            </button>
          </div>
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
            {MOCK_EVENTS.map(evt => (
              <div
                key={evt.id}
                onClick={() => setSelectedEvent(evt)}
                className="min-w-[280px] w-[280px] rounded-2xl overflow-hidden shadow-lg flex flex-col bg-white text-gray-900 cursor-pointer transition-all duration-200 ease-in-out hover:scale-[1.02] hover:shadow-2xl hover:border-emerald-400 active:scale-[0.98] group border border-transparent shrink-0"
              >
                <div className="h-40 w-full overflow-hidden relative">
                  <img
                    src={evt.image}
                    alt={evt.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2 bg-emerald-600/90 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow">
                    Event
                  </div>
                </div>
                <div className="p-4 flex flex-col gap-1 flex-1 justify-between">
                  <div>
                    <h3 className="font-bold text-base text-gray-900 group-hover:text-emerald-700 transition-colors">
                      {evt.title}
                    </h3>
                    <p className="text-xs text-gray-600 line-clamp-2 mt-0.5">{evt.description}</p>
                    <div className="flex flex-col gap-1 mt-2.5 text-xs text-gray-500">
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-sm text-emerald-600">calendar_today</span>
                        <span>{evt.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-sm text-emerald-600">location_on</span>
                        <span className="truncate">{evt.location}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedEvent(evt);
                    }}
                    type="button"
                    className="mt-3.5 w-full py-2 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-600 font-bold text-xs transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-1"
                  >
                    <span>View Details</span>
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
            className="relative w-full h-60 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl border border-white/50 group cursor-pointer transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            style={{ cursor: 'pointer' }}
          >
            <div
              className="bg-cover bg-center w-full h-full transition-transform duration-700 group-hover:scale-110"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1000&q=80')"
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent group-hover:via-black/30 transition-all" />
            <div className="absolute bottom-0 left-0 w-full p-5 flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-primary/90 backdrop-blur-md text-white text-[10px] font-extrabold uppercase tracking-wider w-fit shadow">
                  Local Guide
                </span>
                <span className="text-xs font-bold text-[#8bd6b6] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  <span>Khám phá ngay</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </span>
              </div>
              <h3 className="text-xl font-extrabold text-white leading-tight group-hover:text-[#8bd6b6] transition-colors">
                Discover Da Nang through food and heritage.
              </h3>
            </div>
          </div>
        </section>

        {/* Popular Services */}
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-bold text-gray-900 drop-shadow-sm">Popular Services</h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-2xl overflow-hidden shadow-md text-gray-900 border border-gray-100 cursor-pointer">
              <div className="h-24 w-full">
                <div
                  className="bg-cover bg-center w-full h-full"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80')"
                  }}
                />
              </div>
              <div className="p-3 flex items-center justify-between">
                <span className="text-xs font-semibold">Massage & Spa</span>
                <span className="material-symbols-outlined text-primary text-sm">arrow_forward</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl overflow-hidden shadow-md text-gray-900 border border-gray-100 cursor-pointer">
              <div className="h-24 w-full">
                <div
                  className="bg-cover bg-center w-full h-full"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80')"
                  }}
                />
              </div>
              <div className="p-3 flex items-center justify-between">
                <span className="text-xs font-semibold">Motorbike Rental</span>
                <span className="material-symbols-outlined text-primary text-sm">arrow_forward</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Floating Action Buttons (FABs) - Clean & Modern 3D Green Accent */}
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
      <EventDetailModal
        event={selectedEvent}
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        onOpenMap={onNavigateMap}
      />
    </div>
  );
};
