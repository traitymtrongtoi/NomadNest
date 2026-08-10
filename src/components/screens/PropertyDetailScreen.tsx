import React, { useState } from 'react';
import { Property } from '../../types';

interface PropertyDetailScreenProps {
  property: Property;
  onBack: () => void;
  onBookNow: (property: Property) => void;
}

export const PropertyDetailScreen: React.FC<PropertyDetailScreenProps> = ({
  property,
  onBack,
  onBookNow
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState(0);

  return (
    <div className="bg-slate-50 text-gray-900 font-sans antialiased pb-32 md:pb-8 min-h-screen">
      {/* Top Header */}
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl shadow-sm border-b border-gray-200 flex items-center justify-between px-6 h-16">
        <button onClick={onBack} className="text-emerald-900 hover:opacity-80">
          <span className="material-symbols-outlined text-2xl">arrow_back</span>
        </button>
        <h1 className="font-bold text-lg text-emerald-900">Chi Tiết Chỗ Ở</h1>
        <div className="flex gap-3">
          <button className="text-gray-600 hover:text-emerald-900">
            <span className="material-symbols-outlined text-2xl">share</span>
          </button>
          <button className="text-gray-600 hover:text-emerald-900">
            <span className="material-symbols-outlined text-2xl">favorite_border</span>
          </button>
        </div>
      </header>

      <main className="pt-16 max-w-5xl mx-auto md:px-6 md:py-6">
        {/* Gallery */}
        <section className="w-full h-[45vh] md:h-[55vh] md:rounded-3xl overflow-hidden relative shadow-md bg-gray-200">
          <img
            src={property.images[selectedPhoto] || property.images[0]}
            alt={property.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md rounded-full px-4 py-2 text-xs font-semibold text-emerald-900 flex items-center gap-2 shadow">
            <span className="material-symbols-outlined text-sm">photo_library</span>
            <span>See all {property.images.length + 10} photos</span>
          </div>
        </section>

        {/* Info Grid */}
        <div className="px-6 md:px-0 flex flex-col md:flex-row gap-8 mt-6">
          {/* Main Info */}
          <div className="flex-1 flex flex-col gap-6">
            <div>
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">{property.title}</h2>
                <div className="text-right">
                  <span className="text-2xl font-bold text-emerald-900">${property.pricePerNight}</span>
                  <span className="text-xs text-gray-500 block">/ night</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-gray-600 text-sm mb-4">
                <span className="material-symbols-outlined text-emerald-700 text-base">location_on</span>
                <span>{property.location}</span>
                <span>•</span>
                <span className="material-symbols-outlined text-amber-500 text-base">star</span>
                <span className="font-bold text-gray-900">{property.rating}</span>
                <span className="underline cursor-pointer">({property.reviewsCount} reviews)</span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {property.tags.map(tag => (
                  <span key={tag} className="bg-[#E7E0D3] text-emerald-900 px-3 py-1 rounded-full text-xs font-semibold">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Wi-Fi & Workation Speed Result Card (Special Nomad Feature) */}
            <div className="bg-emerald-900 text-white rounded-2xl p-4 shadow-md flex items-center justify-between border border-emerald-700">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-800 flex items-center justify-center text-primary-fixed">
                  <span className="material-symbols-outlined text-2xl">speed</span>
                </div>
                <div>
                  <span className="text-xs text-emerald-200 uppercase tracking-wider font-semibold">Speedtest Verified</span>
                  <h4 className="text-lg font-bold">{property.wifiSpeedMbps} Mbps Dedicated Fiber</h4>
                  <p className="text-xs text-emerald-100/80">{property.workspaceType}</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-emerald-700 text-primary-fixed rounded-full text-xs font-bold">100% Stable</span>
            </div>

            {/* Description */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">About this space</h3>
              <p className="text-gray-700 text-sm leading-relaxed">{property.description}</p>
            </div>

            {/* Amenities Bento */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Amenities & Ergonomics</h3>
              <div className="grid grid-cols-2 gap-3">
                {property.amenities.map(am => (
                  <div key={am.name} className="flex items-center gap-3 p-3.5 bg-white rounded-2xl shadow-sm border border-gray-100">
                    <span className="material-symbols-outlined text-emerald-800">{am.icon}</span>
                    <span className="text-xs font-medium text-gray-800">{am.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Host Section */}
            <div className="border-t border-gray-200 pt-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-5 items-center md:items-start">
                <img src={property.hostAvatar} alt={property.hostName} className="w-20 h-20 rounded-full object-cover shrink-0" />
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-0.5">Meet your host, {property.hostName}</h3>
                  <p className="text-xs text-emerald-800 font-semibold mb-3">{property.hostExperience}</p>
                  <p className="text-xs text-gray-600 leading-relaxed mb-4">{property.hostBio}</p>
                  <button className="border border-emerald-800 text-emerald-800 px-5 py-2 rounded-full text-xs font-semibold hover:bg-emerald-50">
                    Message Host
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Right Card / Booking */}
          <div className="hidden md:block w-80 shrink-0">
            <div className="sticky top-24 bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
              <div className="flex items-end gap-1 mb-4">
                <span className="text-3xl font-extrabold text-emerald-900">${property.pricePerNight}</span>
                <span className="text-xs text-gray-500 pb-1">/ night</span>
              </div>
              <div className="border border-gray-200 rounded-xl mb-4 p-3 bg-gray-50">
                <div className="text-xs font-semibold text-gray-500 uppercase mb-1">Check-in / Check-out</div>
                <div className="text-sm font-bold text-gray-900">Nov 12 - Nov 15 (3 Nights)</div>
              </div>
              <button
                onClick={() => onBookNow(property)}
                className="w-full h-14 bg-emerald-900 text-white rounded-full font-bold text-sm hover:bg-emerald-800 transition-colors shadow"
              >
                Choose This Room
              </button>
              <p className="text-center text-xs text-gray-500 mt-3">Instant booking for nomads</p>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Sticky Bottom CTA */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-xl border-t border-gray-200 p-4 flex justify-between items-center z-50 shadow-xl">
        <div>
          <div className="text-xl font-bold text-emerald-900">${property.pricePerNight} <span className="text-xs font-normal text-gray-500">/ night</span></div>
          <div className="text-xs text-gray-500 underline">Nov 12 - Nov 15</div>
        </div>
        <button
          onClick={() => onBookNow(property)}
          className="px-6 h-12 bg-emerald-900 text-white rounded-full font-bold text-xs shadow hover:bg-emerald-800"
        >
          Choose This Room
        </button>
      </div>
    </div>
  );
};
