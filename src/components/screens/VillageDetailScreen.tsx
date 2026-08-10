import React from 'react';
import { Village, Property } from '../../types';
import { MOCK_PROPERTIES } from '../../data/mockData';

interface VillageDetailScreenProps {
  village: Village;
  onBack: () => void;
  onExploreProperty: (property: Property) => void;
}

export const VillageDetailScreen: React.FC<VillageDetailScreenProps> = ({
  village,
  onBack,
  onExploreProperty
}) => {
  const property = MOCK_PROPERTIES.find(p => p.villageId === village.id) || MOCK_PROPERTIES[0];

  return (
    <div className="bg-gradient-to-b from-emerald-950 via-emerald-900 to-emerald-800 text-white font-sans antialiased pb-28 min-h-screen">
      {/* Hero Header */}
      <header className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden rounded-b-[2.5rem] shadow-2xl">
        <div className="absolute inset-0 bg-black/30 z-10" />
        <img
          src={village.image}
          alt={village.name}
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

        {/* Floating Controls */}
        <div className="absolute top-0 left-0 w-full p-6 z-20 flex justify-between items-center">
          <button
            onClick={onBack}
            className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 hover:bg-white/20"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <div className="flex gap-3">
            <button className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 hover:bg-white/20">
              <span className="material-symbols-outlined">bookmark_border</span>
            </button>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full p-6 z-20 bg-gradient-to-t from-emerald-950/90 to-transparent pt-24">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-emerald-500/80 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full mb-3">
              <span className="material-symbols-outlined text-sm">water_drop</span>
              {village.category} Craft
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-2 tracking-tight">
              {village.name}
            </h1>
            <p className="text-emerald-50 text-base max-w-xl font-medium">
              "{village.slogan}" — {village.distanceFromCenter}
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-6 pt-8 space-y-8">
        {/* Cultural Story */}
        <section className="bg-white/5 border border-white/10 backdrop-blur-md rounded-[2rem] p-6 md:p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-white mb-3 flex items-center gap-2">
            <span className="material-symbols-outlined text-emerald-400">history_edu</span>
            The Heritage of Flavor
          </h2>
          <p className="text-emerald-100/90 text-base leading-relaxed">
            {village.description}
          </p>
        </section>

        {/* Video / Cinematic View */}
        <section className="space-y-3">
          <h3 className="text-xl font-bold text-white pl-1">A Glimpse into the Craft</h3>
          <div className="relative w-full aspect-video rounded-[2rem] overflow-hidden shadow-2xl group cursor-pointer border border-white/10">
            <img
              src={village.image}
              alt="Artisan working"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-emerald-900/30 group-hover:bg-emerald-900/10 transition-colors" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-emerald-500/90 backdrop-blur-md rounded-full flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-3xl ml-1">play_arrow</span>
              </div>
            </div>
          </div>
        </section>

        {/* Experiences (Static Information Cards) */}
        {village.experiences.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white pl-1">Immersive Experiences</h2>
            <div className="grid grid-cols-1 gap-4">
              {village.experiences.map(exp => (
                <div key={exp.id} className="bg-white/5 border border-white/10 rounded-[2rem] p-5 shadow-xl flex flex-col md:flex-row gap-4 items-center select-none">
                  <img src={exp.image} alt={exp.title} className="w-full md:w-40 h-32 object-cover rounded-xl" />
                  <div className="flex-1">
                    <span className="text-xs font-bold uppercase text-emerald-300 tracking-wider">{exp.type}</span>
                    <h3 className="text-lg font-bold text-white">{exp.title}</h3>
                    <p className="text-xs text-emerald-100/80 mt-1">{exp.description}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-sm font-bold text-emerald-300 bg-emerald-500/20 px-3 py-1 rounded-lg border border-emerald-400/30">
                        {exp.price}
                      </span>
                      <span className="text-[11px] text-emerald-200/60 font-medium">
                        Trải nghiệm làng nghề địa phương
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Atmosphere Gallery */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white pl-1">Atmosphere</h2>
          <div className="grid grid-cols-3 gap-3">
            {village.atmosphereImages.map((img, idx) => (
              <div key={idx} className="aspect-square rounded-2xl overflow-hidden shadow-lg border border-white/10">
                <img src={img} alt="Atmosphere" className="w-full h-full object-cover hover:scale-105 transition-transform" />
              </div>
            ))}
          </div>
        </section>

        {/* Location */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white pl-1">Location</h2>
          <div className="bg-white/5 border border-white/10 rounded-[2rem] p-5 shadow-xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <span className="material-symbols-outlined text-2xl">location_on</span>
            </div>
            <div>
              <h4 className="text-base font-bold text-white">{village.name}</h4>
              <p className="text-xs text-emerald-100/90">{village.location}</p>
              <p className="text-xs font-semibold text-emerald-300 uppercase mt-0.5">{village.distanceFromCenter}</p>
            </div>
          </div>
        </section>
      </main>

      {/* Fixed Bottom Bar Container */}
      <div
        className="fixed bottom-0 left-0 w-full bg-white p-4 z-[100] shadow-[0_-4px_12px_rgba(0,0,0,0.05)] border-t border-gray-100"
        style={{ position: 'fixed', bottom: 0, left: 0, width: '100%', backgroundColor: '#ffffff', padding: '16px', boxShadow: '0 -4px 12px rgba(0,0,0,0.05)', zIndex: 100 }}
      >
        <div className="max-w-3xl mx-auto w-full">
          <button
            onClick={() => onExploreProperty(property)}
            className="w-full bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-base rounded-[12px] py-[14px] shadow-md transition-all active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer border-0"
            style={{ width: '100%', borderRadius: '12px', padding: '14px 0' }}
          >
            <span className="material-symbols-outlined text-xl">calendar_month</span>
            <span>Xem Phòng & Đặt Chỗ</span>
            <span className="material-symbols-outlined text-lg">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};
