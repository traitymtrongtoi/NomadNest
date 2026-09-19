import React, { useState, useEffect } from 'react';

export interface SplashScreenProps {
  onExplore: () => void;
}

export const SLIDES = [
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVGJ2rmelQRYWISCYvBEjVKQLBrwhpAnviIP6b-afacfCz2k6UY3or_7w&s=10',
  'https://media.cungphuot.info/2020/07/27468/1.jpg',
  'https://media.istockphoto.com/id/2207968568/vi/anh/quang-c%E1%BA%A3nh-c%E1%BA%A7u-r%E1%BB%93ng-v%C3%A0o-l%C3%BAc-ho%C3%A0ng-h%C3%B4n-bu%E1%BB%95i-t%E1%BB%91i.jpg?s=612x612&w=0&k=20&c=qSmfpOjChnnoY2cVN3NcmtPJuMm2MILcb0RU9dERADs='
];

export const SplashScreen: React.FC<SplashScreenProps> = ({ onExplore }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [currentSlide]);

  return (
    <div className="bg-black text-white overflow-hidden h-screen w-screen relative flex flex-col justify-between select-none">
      {/* Cinematic Da Nang Background Carousel with Ken Burns & Overlays */}
      <div className="fixed inset-0 z-0 overflow-hidden bg-black pointer-events-none">
        {SLIDES.map((slideUrl, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentSlide ? 'opacity-100 z-0' : 'opacity-0 -z-10'
            }`}
          >
            <img
              src={slideUrl}
              alt={`Authentic Da Nang ${idx + 1}`}
              referrerPolicy="no-referrer"
              className={`w-full h-full object-cover transition-transform duration-[10000ms] ease-out ${
                idx === currentSlide ? 'scale-105' : 'scale-100'
              }`}
              onError={(e) => {
                // High-quality Da Nang fallback if network error occurs
                (e.currentTarget as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1920&q=80';
              }}
            />
          </div>
        ))}

        {/* Subtle, luminous veil overlay ensuring full scenery vibrancy and high clarity */}
        <div className="absolute inset-0 z-10 pointer-events-none bg-black/30" />
        <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-black/35 via-transparent to-black/45" />
      </div>

      {/* UI Overlay Layer */}
      <div className="relative z-20 w-full h-full flex flex-col justify-between items-center pt-8">
        {/* Brand Content */}
        <main className="flex-grow flex flex-col items-center justify-center w-full px-6 text-center max-w-2xl mx-auto -mt-10">
          <div className="flex flex-col items-center">
            {/* NomadNest logo badge with fallback */}
            <div className="relative mb-6">
              <img
                src="./logo-cua-ban.png"
                onError={(e) => {
                  // Fallback if local relative image is missing
                  e.currentTarget.src =
                    'https://lh3.googleusercontent.com/aida-public/AB6AXuC2IN3UiAlepsI59WsSVmklR16jvjwhO4-rvkYuksykdlrWFpp_vnQOw6JLizBSnyAC52pOSOzubc3VTlqarwtWpFEw8rJchk3apopftqk5IgaECo2AMoBixrzu273Sq7zIz-Ckktjk641lnoCBpH442LZVexiKqvwZSmzcOsTUV_4zKQkjD1uoDDnEiyoVXQH9fTZwXjmhmVFVaorPlB5VcR10I3h4do--EHpeY6LOBPSO5veUQcPIpClP3T7T7iL8REyhCG5E2ELvcg';
                }}
                alt="NomadNest Logo"
                className="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 object-contain drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]"
              />
            </div>

            <div className="space-y-3">
              <h1
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white drop-shadow-md"
                style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.6), 0 4px 12px rgba(0, 0, 0, 0.4)' }}
              >
                Welcome to NomadNest
              </h1>
              <div className="flex flex-col gap-1 mt-2">
                <p
                  className="text-lg sm:text-xl md:text-2xl font-medium tracking-wide text-emerald-300 drop-shadow-md"
                  style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.6)' }}
                >
                  Live Local. Work Global.
                </p>
                <p
                  className="text-base sm:text-lg md:text-xl font-light tracking-wide text-white drop-shadow-md"
                  style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.6)' }}
                >
                  Experience Authentic Da Nang.
                </p>
              </div>
            </div>
          </div>
        </main>

        {/* Footer CTA & 3-Dot Pagination Indicators */}
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

          {/* Functional 3-Dot Pagination Indicators */}
          <div className="mt-8 flex items-center justify-center gap-2.5">
            {SLIDES.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Go to Da Nang slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-400/50 ${
                  idx === currentSlide
                    ? 'w-8 bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.7)] opacity-100'
                    : 'w-2 bg-white/40 hover:bg-white/70 opacity-60 hover:scale-125'
                }`}
              />
            ))}
          </div>
        </footer>
      </div>
    </div>
  );
};

// Export HeroWelcomeCarousel alias for consistent referencing
export const HeroWelcomeCarousel = SplashScreen;



