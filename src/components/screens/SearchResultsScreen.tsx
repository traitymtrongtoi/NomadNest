import React from 'react';
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
  return (
    <div className="bg-gradient-to-br from-primary-container via-primary to-on-primary-fixed text-white min-h-screen flex flex-col pb-24">
      {/* Top Header */}
      <header className="fixed top-0 w-full z-50 bg-primary/90 backdrop-blur-xl flex items-center justify-between px-6 h-16 border-b border-white/10">
        <button onClick={onBack} className="text-white hover:opacity-80 transition-opacity cursor-pointer">
          <span className="material-symbols-outlined text-2xl">arrow_back</span>
        </button>
        <h1 className="font-bold text-lg text-white">Find Home</h1>
        <div className="w-6" />
      </header>

      {/* Main Content */}
      <main className="flex-1 mt-16 px-6 py-6 flex flex-col gap-6 max-w-3xl mx-auto w-full">
        {/* Village Cards List */}
        <div className="flex flex-col gap-5">
          {MOCK_VILLAGES.map(village => (
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
