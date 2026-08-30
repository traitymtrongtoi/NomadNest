import React from 'react';
import { UserRole } from '../../types';

interface RoleSelectionProps {
  onSelectRole: (role: UserRole) => void;
  lang?: 'EN';
}

export const RoleSelection: React.FC<RoleSelectionProps> = ({
  onSelectRole,
}) => {
  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center animate-fadeIn">
      {/* 1. Clean Focused Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
          How will you join NomadNest?
        </h1>
      </div>

      {/* 2. Simplified Interactive Role Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full mb-8">
        
        {/* Card 1: Digital Nomad */}
        <button
          id="role-card-nomad"
          type="button"
          onClick={() => onSelectRole('nomad_user')}
          className="group text-left rounded-3xl p-6 bg-white/5 hover:bg-white/10 active:bg-white/15 border border-white/15 hover:border-emerald-400 focus:border-emerald-400 transition-all duration-200 shadow-xl hover:shadow-2xl flex flex-col relative overflow-hidden active:scale-[0.98] cursor-pointer hover:ring-2 hover:ring-emerald-400/50"
        >
          {/* Top Background Glow */}
          <div className="absolute -right-8 -top-8 w-28 h-28 bg-emerald-400/10 rounded-full blur-2xl group-hover:bg-emerald-400/25 transition-all pointer-events-none" />

          <div className="w-14 h-14 rounded-2xl bg-emerald-500 text-white flex items-center justify-center mb-4 shadow-lg group-hover:scale-105 transition-transform shrink-0">
            <span className="material-symbols-outlined text-3xl">luggage</span>
          </div>

          <h2 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors mb-1.5">
            I am a Guest
          </h2>

          <p className="text-xs text-white/75 leading-relaxed">
            Find co-living stays & work hubs
          </p>
        </button>

        {/* Card 2: Local Host */}
        <button
          id="role-card-host"
          type="button"
          onClick={() => onSelectRole('local_host')}
          className="group text-left rounded-3xl p-6 bg-white/5 hover:bg-white/10 active:bg-white/15 border border-white/15 hover:border-emerald-400 focus:border-emerald-400 transition-all duration-200 shadow-xl hover:shadow-2xl flex flex-col relative overflow-hidden active:scale-[0.98] cursor-pointer hover:ring-2 hover:ring-emerald-400/50"
        >
          {/* Top Background Glow */}
          <div className="absolute -right-8 -top-8 w-28 h-28 bg-emerald-400/10 rounded-full blur-2xl group-hover:bg-emerald-400/25 transition-all pointer-events-none" />

          <div className="w-14 h-14 rounded-2xl bg-teal-600 text-white flex items-center justify-center mb-4 shadow-lg group-hover:scale-105 transition-transform shrink-0">
            <span className="material-symbols-outlined text-3xl">storefront</span>
          </div>

          <h2 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors mb-1.5">
            I am a Local Host
          </h2>

          <p className="text-xs text-white/75 leading-relaxed">
            Host remote workers & share crafts
          </p>
        </button>

      </div>
    </div>
  );
};


