import React from 'react';

// 1. Cozy 3D Cottage Home for "Find Home"
export const ThreeDHomeIcon: React.FC<{ className?: string }> = ({ className = "w-full h-full" }) => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      {/* Garden Grass Gradient */}
      <radialGradient id="grassGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#86EFAC" />
        <stop offset="70%" stopColor="#22C55E" />
        <stop offset="100%" stopColor="#15803D" />
      </radialGradient>
      {/* Roof Red Gradient */}
      <linearGradient id="roofRed" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FF6B6B" />
        <stop offset="50%" stopColor="#EE5253" />
        <stop offset="100%" stopColor="#C0392B" />
      </linearGradient>
      {/* Wall Stone Gradient */}
      <linearGradient id="wallGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFF9E6" />
        <stop offset="100%" stopColor="#E2D4B7" />
      </linearGradient>
      {/* Warm Glow Window */}
      <radialGradient id="windowGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FEF08A" />
        <stop offset="100%" stopColor="#F59E0B" />
      </radialGradient>
      {/* Soft Drop Shadow */}
      <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="#064E3B" floodOpacity="0.35" />
      </filter>
      <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="2" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>

    {/* Base Lawn / Garden Island */}
    <ellipse cx="60" cy="92" rx="46" ry="18" fill="url(#grassGlow)" filter="url(#softShadow)" />
    <path d="M25 90 Q60 105 95 90 Q60 82 25 90 Z" fill="#166534" opacity="0.3" />

    {/* Stone Pathway */}
    <ellipse cx="60" cy="96" rx="10" ry="4" fill="#D1D5DB" />
    <ellipse cx="56" cy="101" rx="8" ry="3" fill="#9CA3AF" />

    {/* Tiny Garden Bush */}
    <circle cx="28" cy="85" r="9" fill="#10B981" />
    <circle cx="25" cy="82" r="6" fill="#34D399" />
    <circle cx="92" cy="86" r="8" fill="#10B981" />

    {/* House Main Body (3D Isometric Box) */}
    {/* Left Wall */}
    <path d="M38 58 L60 70 L60 88 L38 76 Z" fill="url(#wallGradient)" />
    {/* Right Wall */}
    <path d="M60 70 L82 58 L82 76 L60 88 Z" fill="#D4C5A9" />

    {/* Front Gable Gable Triangle */}
    <path d="M38 58 L49 42 L60 70 Z" fill="url(#wallGradient)" />

    {/* Roof 3D Structure */}
    {/* Left Roof Side */}
    <path d="M34 58 L49 38 L60 70 L45 70 Z" fill="url(#roofRed)" filter="url(#softShadow)" />
    {/* Main Roof Pitch */}
    <path d="M49 38 L75 26 L86 54 L60 70 Z" fill="#D63031" />
    {/* Roof Overhang Edge */}
    <path d="M32 59 L49 36 L77 24 L75 27 L49 39 L34 61 Z" fill="#FF7675" />

    {/* Chimney */}
    <path d="M68 34 L74 31 L74 42 L68 45 Z" fill="#B2BEC3" />
    <path d="M74 31 L78 33 L78 40 L74 42 Z" fill="#636E72" />
    {/* Smoke Puff */}
    <circle cx="76" cy="25" r="4" fill="#FFFFFF" opacity="0.8" filter="url(#glowEffect)" />
    <circle cx="81" cy="19" r="6" fill="#FFFFFF" opacity="0.6" filter="url(#glowEffect)" />

    {/* Door */}
    <path d="M45 68 L53 72 L53 84 L45 80 Z" fill="#78350F" />
    <circle cx="51" cy="78" r="1" fill="#F59E0B" />

    {/* Glowing Windows */}
    <rect x="66" y="62" width="10" height="12" rx="2" fill="url(#windowGlow)" filter="url(#glowEffect)" transform="skewY(-15)" />
    <line x1="71" y1="60" x2="71" y2="72" stroke="#B45309" strokeWidth="1" />
    <line x1="66" y1="66" x2="76" y2="66" stroke="#B45309" strokeWidth="1" />
  </svg>
);

// 2. 3D Open Book & Floating Speech Bubble for "Translator"
export const ThreeDTranslatorIcon: React.FC<{ className?: string }> = ({ className = "w-full h-full" }) => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="bookCover" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3B82F6" />
        <stop offset="100%" stopColor="#1D4ED8" />
      </linearGradient>
      <linearGradient id="bubbleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10B981" />
        <stop offset="100%" stopColor="#059669" />
      </linearGradient>
      <filter id="dropShadow3D" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="6" stdDeviation="4" floodColor="#1E3A8A" floodOpacity="0.3" />
      </filter>
    </defs>

    {/* Book Base Shadow */}
    <ellipse cx="60" cy="98" rx="42" ry="12" fill="#1E293B" opacity="0.25" />

    {/* Leather Book Cover */}
    <path d="M18 68 Q60 82 102 68 L106 82 Q60 96 14 82 Z" fill="url(#bookCover)" filter="url(#dropShadow3D)" />

    {/* Book Pages Stack - Left & Right */}
    <path d="M20 64 Q60 76 60 62 Q60 76 100 64 L102 76 Q60 88 60 74 Q60 88 18 76 Z" fill="#E2E8F0" />
    <path d="M22 62 Q60 74 60 60 L60 72 Q60 86 20 74 Z" fill="#FFFFFF" />
    <path d="M60 60 Q60 74 98 62 L98 74 Q60 86 60 72 Z" fill="#F8FAFC" />

    {/* Page Text Lines & Asian/Western Sculpted Characters */}
    <path d="M30 63 Q45 67 52 64" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
    <path d="M30 68 Q45 72 52 69" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
    <text x="32" y="58" fill="#1E40AF" fontSize="16" fontStyle="italic" fontWeight="900" fontFamily="serif">A</text>

    <path d="M68 64 Q85 67 90 63" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
    <path d="M68 69 Q85 72 90 68" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
    <text x="74" y="58" fill="#047857" fontSize="15" fontWeight="bold" fontFamily="sans-serif">文</text>

    {/* Glowing Floating 3D Speech Bubble */}
    <g filter="url(#dropShadow3D)">
      <rect x="30" y="16" width="60" height="36" rx="18" fill="url(#bubbleGrad)" />
      {/* Speech Bubble Tail */}
      <path d="M50 52 L58 60 L62 52 Z" fill="#059669" />
      {/* Glass Highlight */}
      <path d="M36 22 Q60 18 84 22 Q60 26 36 22 Z" fill="#FFFFFF" opacity="0.4" />
      {/* Translation Sync Icon inside bubble */}
      <path d="M48 34 C48 30 52 26 58 26 C62 26 66 29 67 33" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
      <polygon points="67,29 71,34 65,35" fill="#FFFFFF" />
      <path d="M72 34 C72 38 68 42 62 42 C58 42 54 39 53 35" stroke="#FEF08A" strokeWidth="3" strokeLinecap="round" />
      <polygon points="53,39 49,34 55,33" fill="#FEF08A" />
    </g>
  </svg>
);

// 3. 3D Globe & Brass Compass with Pin for "Smart Maps"
export const ThreeDSmartMapsIcon: React.FC<{ className?: string }> = ({ className = "w-full h-full" }) => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <radialGradient id="globeOcean" cx="40%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#60A5FA" />
        <stop offset="60%" stopColor="#2563EB" />
        <stop offset="100%" stopColor="#1E3A8A" />
      </radialGradient>
      <linearGradient id="brassRing" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FDE047" />
        <stop offset="50%" stopColor="#CA8A04" />
        <stop offset="100%" stopColor="#854D0E" />
      </linearGradient>
      <linearGradient id="pinRed" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#EF4444" />
        <stop offset="100%" stopColor="#991B1B" />
      </linearGradient>
      <filter id="globeShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="8" stdDeviation="5" floodColor="#0F172A" floodOpacity="0.4" />
      </filter>
    </defs>

    {/* Shadow */}
    <ellipse cx="60" cy="98" rx="42" ry="12" fill="#0F172A" opacity="0.3" />

    {/* Brass Outer Stand / Compass Ring */}
    <ellipse cx="60" cy="65" rx="46" ry="22" fill="none" stroke="url(#brassRing)" strokeWidth="6" filter="url(#globeShadow)" />

    {/* 3D Mini Globe Sphere */}
    <circle cx="60" cy="58" r="34" fill="url(#globeOcean)" filter="url(#globeShadow)" />

    {/* Globe Continent Textures */}
    <path d="M42 45 Q50 35 62 42 Q70 50 60 62 Q45 68 42 45 Z" fill="#10B981" opacity="0.9" />
    <path d="M68 62 Q80 55 88 68 Q75 82 68 76 Z" fill="#34D399" opacity="0.85" />

    {/* Latitude / Longitude 3D Lines */}
    <ellipse cx="60" cy="58" rx="34" ry="14" fill="none" stroke="#FFFFFF" strokeWidth="1" opacity="0.3" />
    <path d="M60 24 C46 38 46 78 60 92" fill="none" stroke="#FFFFFF" strokeWidth="1" opacity="0.3" />
    <path d="M60 24 C74 38 74 78 60 92" fill="none" stroke="#FFFFFF" strokeWidth="1" opacity="0.3" />

    {/* Shiny Glass Highlight */}
    <path d="M36 36 C42 28 54 26 62 28 C48 30 40 40 36 36 Z" fill="#FFFFFF" opacity="0.5" />

    {/* Compass Needle (Red & Silver) */}
    <polygon points="60,32 66,58 60,54 54,58" fill="#EF4444" />
    <polygon points="60,84 66,58 60,54 54,58" fill="#E2E8F0" />
    <circle cx="60" cy="58" r="4" fill="url(#brassRing)" />

    {/* 3D Red Location Pin Dropped on Top */}
    <g filter="url(#globeShadow)">
      <path d="M60 12 C51 12 44 19 44 28 C44 40 60 54 60 54 C60 54 76 40 76 28 C76 19 69 12 60 12 Z" fill="url(#pinRed)" />
      <circle cx="60" cy="27" r="6" fill="#FFFFFF" />
    </g>
  </svg>
);

// 4. Stylized 3D Grab Green Tech Sedan with Floating Logo Badge for "Grab"
export const ThreeDGrabIcon: React.FC<{ className?: string }> = ({ className = "w-full h-full" }) => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      {/* Signature Grab Green Gradient */}
      <linearGradient id="grabGreen" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00B14F" />
        <stop offset="50%" stopColor="#008837" />
        <stop offset="100%" stopColor="#005B22" />
      </linearGradient>
      {/* Car Metallic Highlight */}
      <linearGradient id="carRoof" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#34D399" />
        <stop offset="100%" stopColor="#00B14F" />
      </linearGradient>
      {/* Windshield Tint */}
      <linearGradient id="glassTint" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#93C5FD" />
        <stop offset="100%" stopColor="#1E40AF" />
      </linearGradient>
      {/* Badge Gold */}
      <linearGradient id="badgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#22C55E" />
        <stop offset="100%" stopColor="#15803D" />
      </linearGradient>
      <filter id="carShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="7" stdDeviation="4" floodColor="#064E3B" floodOpacity="0.4" />
      </filter>
    </defs>

    {/* Ground Shadow */}
    <ellipse cx="60" cy="94" rx="44" ry="10" fill="#022C22" opacity="0.35" />

    {/* 3D Modern Green Sedan Body */}
    <g filter="url(#carShadow)">
      {/* Lower Chassis / Body */}
      <path d="M16 68 C16 62 24 58 38 56 L82 56 C96 58 104 62 104 68 L106 78 C106 82 100 86 88 86 L32 86 C20 86 14 82 14 78 Z" fill="url(#grabGreen)" />

      {/* Cabin Roof / Pillars */}
      <path d="M34 56 L44 38 C48 34 72 34 76 38 L86 56 Z" fill="url(#carRoof)" />

      {/* Front Windshield */}
      <path d="M46 40 L74 40 L82 54 L38 54 Z" fill="url(#glassTint)" />
      {/* Glass Specular Reflection */}
      <path d="M48 42 L60 42 L52 52 L42 52 Z" fill="#FFFFFF" opacity="0.4" />

      {/* Side Windows */}
      <path d="M40 54 L46 42 L58 42 L58 54 Z" fill="#1E293B" opacity="0.6" />
      <path d="M60 54 L60 42 L72 42 L78 54 Z" fill="#1E293B" opacity="0.6" />

      {/* Headlights Glowing */}
      <ellipse cx="18" cy="72" rx="4" ry="3" fill="#FEF08A" />
      <ellipse cx="102" cy="72" rx="4" ry="3" fill="#FEF08A" />

      {/* Front Bumper / Grille */}
      <rect x="48" y="74" width="24" height="6" rx="2" fill="#0F172A" />

      {/* 3D Alloy Wheels */}
      {/* Front Left Wheel */}
      <circle cx="32" cy="84" r="10" fill="#1E293B" />
      <circle cx="32" cy="84" r="6" fill="#94A3B8" />
      <circle cx="32" cy="84" r="3" fill="#0F172A" />

      {/* Front Right Wheel */}
      <circle cx="88" cy="84" r="10" fill="#1E293B" />
      <circle cx="88" cy="84" r="6" fill="#94A3B8" />
      <circle cx="88" cy="84" r="3" fill="#0F172A" />
    </g>

    {/* Floating 3D "Grab" Green Tech Badge */}
    <g filter="url(#carShadow)">
      <rect x="36" y="12" width="48" height="22" rx="11" fill="url(#badgeGrad)" stroke="#FFFFFF" strokeWidth="2" />
      <text x="60" y="27" fill="#FFFFFF" fontSize="13" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" letterSpacing="0.5">
        Grab
      </text>
    </g>
  </svg>
);
