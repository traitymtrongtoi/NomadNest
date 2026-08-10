import React, { useState, useEffect } from 'react';

interface SplashScreenProps {
  onExplore: () => void;
  onSkip: () => void;
}

const SLIDES = [
  'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1920&q=80'
];

export const SplashScreen: React.FC<SplashScreenProps> = ({ onExplore, onSkip }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-black text-white overflow-hidden h-screen w-screen relative flex flex-col justify-between select-none">
      {/* Cinematic Background with Ken Burns & Overlays */}
      <div className="fixed inset-0 z-0 overflow-hidden bg-black pointer-events-none">
        {SLIDES.map((slideUrl, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
              idx === currentSlide
                ? 'opacity-100 scale-105 transition-transform duration-[12000ms] ease-out'
                : 'opacity-0 scale-100'
            }`}
            style={{ backgroundImage: `url('${slideUrl}')` }}
          />
        ))}

        {/* Cầu Rồng / Video Background Layer */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-30 -z-10"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-fire-breathing-dragon-bridge-in-da-nang-41584-large.mp4" type="video/mp4" />
        </video>

        {/* Overlays for Legibility */}
        <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-black/60 via-black/30 to-black/80" />
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{ background: 'radial-gradient(circle, transparent 20%, rgba(0, 0, 0, 0.4) 100%)' }}
        />
      </div>

      {/* UI Overlay Layer */}
      <div className="relative z-20 w-full h-full flex flex-col justify-between items-center">
        {/* Top Navigation */}
        <header className="w-full flex justify-end p-6 md:p-10">
          <button
            onClick={onSkip}
            type="button"
            className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-2 rounded-full text-xs font-semibold uppercase tracking-widest hover:bg-white/20 transition-all active:scale-95 cursor-pointer shadow-lg"
          >
            Skip
          </button>
        </header>

        {/* Brand Content */}
        <main className="flex-grow flex flex-col items-center justify-center w-full px-6 text-center max-w-2xl mx-auto -mt-10">
          <div className="flex flex-col items-center">
            {/* Logo image with fallback */}
            <img
              src="./logo-cua-ban.png"
              onError={(e) => {
                // Fallback if local relative image is missing
                e.currentTarget.src = 'https://lh3.googleusercontent.com/aida-public/AB6AXuC2IN3UiAlepsI59WsSVmklR16jvjwhO4-rvkYuksykdlrWFpp_vnQOw6JLizBSnyAC52pOSOzubc3VTlqarwtWpFEw8rJchk3apopftqk5IgaECo2AMoBixrzu273Sq7zIz-Ckktjk641lnoCBpH442LZVexiKqvwZSmzcOsTUV_4zKQkjD1uoDDnEiyoVXQH9fTZwXjmhmVFVaorPlB5VcR10I3h4do--EHpeY6LOBPSO5veUQcPIpClP3T7T7iL8REyhCG5E2ELvcg';
              }}
              alt="NomadNest Logo"
              className="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 object-contain drop-shadow-2xl mb-8"
            />

            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)] text-white">
                Welcome to NomadNest
              </h1>
              <div className="flex flex-col gap-1">
                <p className="text-lg sm:text-xl md:text-2xl font-light tracking-wide text-emerald-300 drop-shadow-md">
                  Live Local. Work Global.
                </p>
                <p className="text-base sm:text-lg md:text-xl font-light tracking-wide opacity-90 drop-shadow-md text-white/90">
                  Experience Authentic Da Nang.
                </p>
              </div>
            </div>
          </div>
        </main>

        {/* Footer CTA */}
        <footer className="w-full flex flex-col items-center pb-12 pt-6 max-w-xs mx-auto px-6">
          <button
            onClick={onExplore}
            type="button"
            className="group flex items-center justify-center gap-3 bg-[#065f46] hover:bg-[#044e39] text-white w-full py-4 rounded-full text-base sm:text-lg font-bold shadow-[0_10px_40px_rgba(0,69,50,0.6)] hover:shadow-[0_15px_50px_rgba(0,69,50,0.8)] transition-all duration-300 hover:-translate-y-1 active:scale-[0.98] cursor-pointer border border-white/20"
          >
            <span>Explore NomadNest</span>
            <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform duration-300">
              arrow_forward
            </span>
          </button>

          {/* Progress Dots */}
          <div className="mt-8 flex justify-center gap-2.5">
            {SLIDES.map((_, idx) => (
              <div
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  idx === currentSlide ? 'w-8 bg-emerald-400 opacity-100' : 'w-2 bg-white/40 opacity-50'
                }`}
              />
            ))}
          </div>
        </footer>
      </div>
    </div>
  );
};


