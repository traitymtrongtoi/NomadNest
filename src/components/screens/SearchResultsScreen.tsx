import React, { useState } from 'react';
import { MOCK_VILLAGES } from '../../data/mockData';
import { Village } from '../../types';

interface SearchResultsScreenProps {
  initialQuery?: string;
  onSelectVillage: (village: Village) => void;
  onBack: () => void;
}

export const SearchResultsScreen: React.FC<SearchResultsScreenProps> = ({
  initialQuery = '',
  onSelectVillage,
  onBack
}) => {
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [wifiFilter, setWifiSpeed] = useState<number>(50);

  const tags = ['All', 'Heritage', 'Artisan', 'Culinary', 'Craft', 'Local Life'];

  const filteredVillages = MOCK_VILLAGES.filter(v => {
    if (selectedTag !== 'All' && v.category !== selectedTag) return false;
    return true;
  });

  return (
    <div className="bg-gradient-to-br from-primary-container via-primary to-on-primary-fixed text-white min-h-screen flex flex-col pb-24">
      {/* Top Header */}
      <header className="fixed top-0 w-full z-50 bg-primary/90 backdrop-blur-xl flex items-center justify-between px-6 h-16 border-b border-white/10">
        <button onClick={onBack} className="text-white hover:opacity-80 transition-opacity">
          <span className="material-symbols-outlined text-2xl">arrow_back</span>
        </button>
        <h1 className="font-bold text-lg text-white">Find Home (Màn hình Kết quả)</h1>
        <div className="w-6" />
      </header>

      {/* Main Content */}
      <main className="flex-1 mt-16 px-6 py-6 flex flex-col gap-6 max-w-3xl mx-auto w-full">
        {/* Filter Panel */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20 shadow-lg space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-primary-fixed flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">tune</span> Bộ Lọc Digital Nomad
            </span>
            <span className="text-xs text-white/70">Wi-Fi tối thiểu: {wifiFilter} Mbps</span>
          </div>

          <input
            type="range"
            min={20}
            max={200}
            value={wifiFilter}
            onChange={e => setWifiSpeed(Number(e.target.value))}
            className="w-full accent-primary-fixed cursor-pointer"
          />

          <div className="flex gap-2 overflow-x-auto no-scrollbar pt-1">
            {tags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedTag === tag
                    ? 'bg-white text-primary shadow'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Village Cards List */}
        <div className="flex flex-col gap-5">
          {filteredVillages.map(village => (
            <article
              key={village.id}
              onClick={() => onSelectVillage(village)}
              className="w-full bg-white/10 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/20 shadow-xl flex flex-col cursor-pointer hover:scale-[1.01] active:scale-[0.99] transition-all"
            >
              <div className="relative w-full aspect-video overflow-hidden">
                <img
                  src={village.image}
                  alt={village.name}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-white/90 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-sm">
                    {village.category}
                  </span>
                  <span className="bg-white/90 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-sm flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">wifi</span> 100+ Mbps
                  </span>
                </div>
              </div>
              <div className="p-5 flex flex-col">
                <h2 className="text-xl font-bold text-white mb-1 leading-tight">{village.name}</h2>
                <p className="text-sm text-white/80 line-clamp-1">"{village.slogan}"</p>
                <div className="mt-3 flex items-center justify-between text-xs text-primary-fixed-dim">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">location_on</span>
                    {village.distanceFromCenter}
                  </span>
                  <span className="font-semibold text-white underline">Khám phá ngay →</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
};
