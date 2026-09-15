import React, { useState } from 'react';

interface GrabServicesScreenProps {
  onBack?: () => void;
}

interface VehicleOption {
  id: string;
  name: string;
  icon: string;
  eta: string;
  price: number;
  formattedPrice: string;
  description: string;
  badge?: string;
}

const VEHICLE_OPTIONS: VehicleOption[] = [
  {
    id: 'grabbike',
    name: 'GrabBike',
    icon: 'two_wheeler',
    eta: '3 mins',
    price: 15000,
    formattedPrice: '15,000 VND',
    description: 'Fast & affordable motorbike ride',
    badge: 'Popular'
  },
  {
    id: 'grabcar4',
    name: 'GrabCar (4 Seats)',
    icon: 'local_taxi',
    eta: '5 mins',
    price: 45000,
    formattedPrice: '45,000 VND',
    description: 'Comfortable 4-seat A/C car'
  },
  {
    id: 'grabcar7',
    name: 'GrabCar (7 Seats)',
    icon: 'directions_car',
    eta: '6 mins',
    price: 68000,
    formattedPrice: '68,000 VND',
    description: 'Spacious 7-seater for groups & luggage'
  }
];

const SUGGESTED_DESTINATIONS = [
  { name: 'Non Nuoc Stone Village', price: '15,000 VND' },
  { name: 'Nam O Fish Sauce Village', price: '45,000 VND' },
  { name: 'My Khe Beach', price: '25,000 VND' },
  { name: 'Dragon Bridge Da Nang', price: '30,000 VND' }
];

export const GrabServicesScreen: React.FC<GrabServicesScreenProps> = ({ onBack }) => {
  // Mode: 'home' (Grab Home Dashboard) vs 'booking' (Map & Ride Booking)
  const [viewMode, setViewMode] = useState<'home' | 'booking'>('home');

  // Bottom Navigation tab in Grab Home
  const [activeBottomNav, setActiveBottomNav] = useState<'home' | 'payment' | 'activity' | 'messages'>('home');

  // Ride booking state
  const [pickup, setPickup] = useState('Current Location - Da Nang');
  const [dropoff, setDropoff] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState<string>('grabbike');
  const [isBooking, setIsBooking] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [driverInfo, setDriverInfo] = useState<{
    name: string;
    licensePlate: string;
    rating: string;
    eta: string;
    vehicleName: string;
    phone: string;
  } | null>(null);

  const activeVehicleObj = VEHICLE_OPTIONS.find(v => v.id === selectedVehicle) || VEHICLE_OPTIONS[0];

  const handleBookRide = () => {
    if (isBooking) return;
    setIsBooking(true);

    // Simulated 2-second driver match flow
    setTimeout(() => {
      setIsBooking(false);
      setBookingSuccess(true);
      setDriverInfo({
        name: 'Nguyen Van A',
        licensePlate: '43A-123.45',
        rating: '4.9 ★',
        eta: '3 mins',
        vehicleName: activeVehicleObj.name,
        phone: '+84 905 123 456'
      });
    }, 2000);
  };

  const handleResetBooking = () => {
    setBookingSuccess(false);
    setDriverInfo(null);
    setIsBooking(false);
  };

  const openRideBooking = (vehicleType: string = 'grabbike', destName: string = '') => {
    setSelectedVehicle(vehicleType);
    if (destName) setDropoff(destName);
    setViewMode('booking');
  };

  return (
    <div className="bg-[#f8f9fb] min-h-screen text-[#191c1e] font-sans flex flex-col relative select-none overflow-x-hidden">
      {/* VIEW MODE 1: GRAB HOME DASHBOARD */}
      {viewMode === 'home' && (
        <div className="flex flex-col min-h-screen pb-20 animate-fadeIn">
          {/* 1. Header (Search Bar on top) */}
          <header className="w-full bg-[#00A550] flex items-center justify-between px-4 py-3 sticky top-0 z-50 shadow-md">
            {/* Back button to Explore in NomadNest */}
            <button
              onClick={onBack}
              type="button"
              className="mr-1 w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 active:scale-95 text-white flex items-center justify-center transition-all cursor-pointer shrink-0"
              title="Back to Explore"
            >
              <span className="material-symbols-outlined text-xl">arrow_back</span>
            </button>

            {/* QR Code Scanner */}
            <div
              onClick={() => alert('Opening Grab QR scanner...')}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 text-white cursor-pointer hover:bg-white/30 transition-colors shrink-0"
              title="Scan QR Code"
            >
              <span className="material-symbols-outlined">qr_code_scanner</span>
            </div>

            {/* Search Input Bar */}
            <div
              onClick={() => openRideBooking('grabbike')}
              className="flex-1 mx-2.5 h-10 rounded-full bg-white flex items-center px-4 cursor-pointer border border-transparent shadow-sm hover:shadow-md transition-shadow"
            >
              <span className="material-symbols-outlined text-gray-400 mr-2 text-xl">search</span>
              <input
                type="text"
                readOnly
                className="bg-transparent w-full text-sm font-medium outline-none text-gray-800 placeholder:text-gray-400 cursor-pointer"
                placeholder="Where to?"
              />
            </div>

            {/* User Profile Avatar / Grab badge */}
            <div className="flex items-center gap-2 shrink-0">
              <div className="w-9 h-9 rounded-full bg-white text-[#00A550] flex items-center justify-center font-black text-lg shadow-sm border border-white/40">
                G
              </div>
              <div className="w-9 h-9 rounded-full overflow-hidden border border-white/50 shadow-sm cursor-pointer">
                <img
                  alt="Profile"
                  className="w-full h-full object-cover"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                />
              </div>
            </div>
          </header>

          {/* Main Content Area */}
          <main className="flex-1 pt-4 pb-12 bg-gradient-to-b from-gray-100 to-white">
            {/* 2. Main Services Grid (2 rows x 5 columns) */}
            <div className="grid grid-cols-5 gap-y-5 gap-x-2 px-3 mb-6">
              {/* Row 1 */}
              {/* 1. Food */}
              <button
                onClick={() => alert('GrabFood Service: Connecting restaurants near you!')}
                type="button"
                className="flex flex-col items-center justify-start gap-1 group cursor-pointer"
              >
                <div className="w-13 h-13 sm:w-14 sm:h-14 bg-white rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform shadow-sm border border-gray-100 text-2xl">
                  🍜
                </div>
                <span className="text-[11px] font-semibold text-center text-gray-700 leading-tight">Food</span>
              </button>

              {/* 2. Rides */}
              <button
                onClick={() => openRideBooking('grabcar4')}
                type="button"
                className="flex flex-col items-center justify-start gap-1 group cursor-pointer"
              >
                <div className="w-13 h-13 sm:w-14 sm:h-14 bg-white rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform shadow-sm border border-gray-100 text-2xl relative">
                  🚗
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] font-extrabold px-1 rounded-full">HOT</span>
                </div>
                <span className="text-[11px] font-bold text-center text-[#00A550] leading-tight">Rides</span>
              </button>

              {/* 3. Dine-in */}
              <button
                onClick={() => alert('Dine-in: Up to 50% discount in Da Nang!')}
                type="button"
                className="flex flex-col items-center justify-start gap-1 group cursor-pointer"
              >
                <div className="w-13 h-13 sm:w-14 sm:h-14 bg-white rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform shadow-sm border border-gray-100 text-2xl">
                  🍽️
                </div>
                <span className="text-[11px] font-semibold text-center text-gray-700 leading-tight">
                  Dine-in
                </span>
              </button>

              {/* 4. Advance */}
              <button
                onClick={() => openRideBooking('grabcar4')}
                type="button"
                className="flex flex-col items-center justify-start gap-1 group cursor-pointer"
              >
                <div className="w-13 h-13 sm:w-14 sm:h-14 bg-white rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform shadow-sm border border-gray-100 text-2xl relative">
                  ⏰
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] font-extrabold px-1.5 py-0.2 rounded-sm">NEW</span>
                </div>
                <span className="text-[11px] font-semibold text-center text-gray-700 leading-tight">
                  Advance
                </span>
              </button>

              {/* 5. Gifts */}
              <button
                onClick={() => alert('GrabRewards & Gifts')}
                type="button"
                className="flex flex-col items-center justify-start gap-1 group cursor-pointer"
              >
                <div className="w-13 h-13 sm:w-14 sm:h-14 bg-white rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform shadow-sm border border-gray-100 text-2xl">
                  🎁
                </div>
                <span className="text-[11px] font-semibold text-center text-gray-700 leading-tight">Gifts</span>
              </button>

              {/* Row 2 */}
              {/* 6. Bike */}
              <button
                onClick={() => openRideBooking('grabbike')}
                type="button"
                className="flex flex-col items-center justify-start gap-1 group cursor-pointer"
              >
                <div className="w-13 h-13 sm:w-14 sm:h-14 bg-white rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform shadow-sm border border-gray-100 text-2xl">
                  🛵
                </div>
                <span className="text-[11px] font-bold text-center text-[#00A550] leading-tight">Bike</span>
              </button>

              {/* 7. Delivery */}
              <button
                onClick={() => alert('GrabExpress: Express parcel delivery in 30 minutes')}
                type="button"
                className="flex flex-col items-center justify-start gap-1 group cursor-pointer"
              >
                <div className="w-13 h-13 sm:w-14 sm:h-14 bg-white rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform shadow-sm border border-gray-100 text-2xl">
                  📦
                </div>
                <span className="text-[11px] font-semibold text-center text-gray-700 leading-tight">Delivery</span>
              </button>

              {/* 8. Mart */}
              <button
                onClick={() => alert('GrabMart: Supermarket & grocery delivery')}
                type="button"
                className="flex flex-col items-center justify-start gap-1 group cursor-pointer"
              >
                <div className="w-13 h-13 sm:w-14 sm:h-14 bg-white rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform shadow-sm border border-gray-100 text-2xl">
                  🛒
                </div>
                <span className="text-[11px] font-semibold text-center text-gray-700 leading-tight">Mart</span>
              </button>

              {/* 9. Loans */}
              <button
                onClick={() => alert('GrabFin: Financial & payment solutions')}
                type="button"
                className="flex flex-col items-center justify-start gap-1 group cursor-pointer"
              >
                <div className="w-13 h-13 sm:w-14 sm:h-14 bg-white rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform shadow-sm border border-gray-100 text-2xl">
                  💳
                </div>
                <span className="text-[11px] font-semibold text-center text-gray-700 leading-tight">Loans</span>
              </button>

              {/* 10. Map */}
              <button
                onClick={() => openRideBooking('grabbike')}
                type="button"
                className="flex flex-col items-center justify-start gap-1 group cursor-pointer"
              >
                <div className="w-13 h-13 sm:w-14 sm:h-14 bg-white rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform shadow-sm border border-gray-100 text-2xl">
                  🗺️
                </div>
                <span className="text-[11px] font-semibold text-center text-gray-700 leading-tight">Map</span>
              </button>
            </div>

            {/* Pagination Indicator */}
            <div className="flex justify-center gap-1.5 mb-6">
              <div className="w-5 h-1 bg-gray-600 rounded-full" />
              <div className="w-1.5 h-1 bg-gray-300 rounded-full" />
            </div>

            {/* 3. Quick Access Widgets */}
            <div className="mb-6">
              <div className="px-4 mb-2 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500">QUICK ACCESS</span>
                <span className="text-xs text-[#00A550] font-semibold cursor-pointer hover:underline">View all</span>
              </div>

              <div className="flex overflow-x-auto gap-3 px-4 pb-2 no-scrollbar scroll-smooth">
                {/* Card 1: Wallet */}
                <div className="min-w-[170px] bg-white border border-gray-200/80 rounded-2xl p-3.5 flex flex-col justify-between shadow-sm cursor-pointer hover:border-[#00A550]/50 transition-all shrink-0">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">WALLET</span>
                    <div className="w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center">
                      <span className="material-symbols-outlined text-xs">smartphone</span>
                    </div>
                  </div>
                  <div className="font-bold text-sm text-gray-900">Viettel Money 8677</div>
                  <span className="text-[10px] text-emerald-600 font-semibold mt-1">Linked • Sufficient balance</span>
                </div>

                {/* Card 2: Ride Shortcut */}
                <div
                  onClick={() => openRideBooking('grabbike', 'Home')}
                  className="min-w-[170px] bg-white border border-gray-200/80 rounded-2xl p-3.5 flex flex-col justify-between shadow-sm cursor-pointer hover:border-[#00A550]/50 transition-all shrink-0"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">RIDE SHORTCUT</span>
                    <span className="text-lg">🛵</span>
                  </div>
                  <div className="font-bold text-sm text-gray-900">RIDE TO: Home</div>
                  <span className="text-[10px] text-gray-500 mt-1">1-tap booking</span>
                </div>

                {/* Card 3: Offers */}
                <div className="min-w-[170px] bg-white border border-gray-200/80 rounded-2xl p-3.5 flex flex-col justify-between shadow-sm cursor-pointer hover:border-[#00A550]/50 transition-all shrink-0">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">OFFERS</span>
                    <span className="text-lg">🏷️</span>
                  </div>
                  <div className="font-bold text-sm text-gray-900">Saver Pass</div>
                  <span className="text-[10px] text-amber-600 font-semibold mt-1">30% off next ride</span>
                </div>
              </div>
            </div>

            {/* 4. Promotional Banner */}
            <div className="px-4 mb-6">
              <div className="flex items-center gap-1 mb-2.5 cursor-pointer group">
                <h3 className="font-bold text-base text-gray-900 group-hover:text-[#00A550] transition-colors">
                  Activate Ride Cover Now
                </h3>
                <span className="material-symbols-outlined text-gray-400 group-hover:text-[#00A550] text-sm transition-colors">
                  chevron_right
                </span>
              </div>

              <div
                onClick={() => alert('GrabInsure: Ride-Cover protection activated successfully!')}
                className="relative w-full h-44 rounded-2xl overflow-hidden shadow-lg cursor-pointer group border border-gray-100 bg-gradient-to-br from-emerald-800 via-teal-900 to-slate-900"
              >
                <img
                  src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1200&q=80"
                  alt="Grab Ride Cover Travel"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-70"
                  onError={(e) => {
                    // Fallback to stylized gradient if network image fails
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white z-10">
                  <span className="bg-[#00A550] text-white text-[9px] font-extrabold px-2 py-0.5 rounded-md uppercase mb-1.5 inline-block tracking-wider">
                    NEWLY LAUNCHED
                  </span>
                  <h4 className="font-bold text-lg leading-tight mb-1">
                    Travel Far with Ride-Cover<br />Peace of Mind for All
                  </h4>
                  <p className="text-xs text-gray-200 font-normal">Comprehensive protection during & after your ride</p>
                  <p className="text-[10px] text-gray-400 mt-1">Ad · GrabInsure</p>
                </div>
              </div>
            </div>
          </main>

          {/* 5. Bottom Navigation */}
          <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] flex justify-around items-center px-2 py-2">
            {/* Active: Home */}
            <button
              onClick={() => setActiveBottomNav('home')}
              type="button"
              className={`flex flex-col items-center justify-center p-1.5 min-w-[64px] cursor-pointer ${
                activeBottomNav === 'home' ? 'text-[#00A550]' : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              <span className="material-symbols-outlined text-2xl mb-0.5">home</span>
              <span className="text-[10px] font-bold leading-tight">Home</span>
            </button>

            {/* Payment */}
            <button
              onClick={() => {
                setActiveBottomNav('payment');
                alert('Grab Wallet & Payment Screen');
              }}
              type="button"
              className={`flex flex-col items-center justify-center p-1.5 min-w-[64px] relative cursor-pointer ${
                activeBottomNav === 'payment' ? 'text-[#00A550]' : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              <span className="material-symbols-outlined text-2xl mb-0.5">account_balance_wallet</span>
              <span className="text-[10px] font-medium leading-tight">Payment</span>
              <div className="absolute top-1.5 right-4 w-2 h-2 bg-red-500 rounded-full border border-white" />
            </button>

            {/* Activity */}
            <button
              onClick={() => {
                setActiveBottomNav('activity');
                alert('Grab Activity & Trip History');
              }}
              type="button"
              className={`flex flex-col items-center justify-center p-1.5 min-w-[64px] relative cursor-pointer ${
                activeBottomNav === 'activity' ? 'text-[#00A550]' : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              <span className="material-symbols-outlined text-2xl mb-0.5">receipt_long</span>
              <span className="text-[10px] font-medium leading-tight">Activity</span>
              <div className="absolute top-1.5 right-4 w-2 h-2 bg-red-500 rounded-full border border-white" />
            </button>

            {/* Messages */}
            <button
              onClick={() => {
                setActiveBottomNav('messages');
                alert('Grab Messages & Notifications');
              }}
              type="button"
              className={`flex flex-col items-center justify-center p-1.5 min-w-[64px] relative cursor-pointer ${
                activeBottomNav === 'messages' ? 'text-[#00A550]' : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              <span className="material-symbols-outlined text-2xl mb-0.5">chat</span>
              <span className="text-[10px] font-medium leading-tight">Messages</span>
              <div className="absolute top-1 right-3 bg-red-500 text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full border border-white">
                6
              </div>
            </button>
          </nav>
        </div>
      )}

      {/* VIEW MODE 2: RIDE BOOKING & INTERACTIVE MAP VIEW */}
      {viewMode === 'booking' && (
        <div className="flex flex-col min-h-screen animate-fadeIn bg-slate-900 pb-20">
          {/* Top Header Bar */}
          <header className="fixed top-0 left-0 right-0 z-50 bg-[#00B14F] text-white px-4 h-14 flex items-center justify-between shadow-md">
            <button
              onClick={() => setViewMode('home')}
              type="button"
              className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/10 active:scale-95 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-2xl">arrow_back</span>
            </button>

            <div className="flex items-center gap-2">
              <div className="bg-white text-[#00B14F] px-2 py-0.5 rounded-lg font-black tracking-tight text-base shadow-sm">
                Grab
              </div>
              <span className="font-bold text-sm tracking-wide text-white">Book Ride - NomadNest</span>
            </div>

            <div className="w-10" />
          </header>

          {/* Main Container */}
          <div className="pt-14 flex-1 flex flex-col min-h-screen">
            {/* MAP AREA (Top Half) */}
            <div className="relative w-full h-[40vh] min-h-[280px] bg-slate-200 overflow-hidden shadow-inner">
              <div
                className="w-full h-full bg-cover bg-center brightness-105 contrast-95 opacity-90"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80')"
                }}
              />

              <div className="absolute inset-0 bg-blue-900/10 pointer-events-none" />

              <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                <path
                  d="M 100 110 Q 180 150 260 170"
                  fill="none"
                  stroke="#00B14F"
                  strokeWidth="4"
                  strokeDasharray="6 6"
                  className="animate-pulse"
                />
              </svg>

              {/* Pin 1: Pickup (Blue Pin) */}
              <div className="absolute top-[22%] left-[18%] sm:left-[25%] z-20 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group">
                <div className="bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-xl shadow-lg border border-blue-200 text-[11px] font-bold text-slate-800 mb-1 flex items-center gap-1.5 whitespace-nowrap">
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
                  <span>Pickup: {pickup}</span>
                </div>
                <div className="w-9 h-9 rounded-full bg-blue-600 border-2 border-white shadow-xl flex items-center justify-center text-white ring-4 ring-blue-500/30">
                  <span className="material-symbols-outlined text-lg">my_location</span>
                </div>
                <div className="w-2 h-1 bg-black/30 rounded-full blur-[1px] mt-0.5" />
              </div>

              {/* Pin 2: Drop-off (Red Pin) */}
              <div className="absolute top-[52%] right-[15%] sm:right-[22%] z-20 transform translate-x-1/2 -translate-y-1/2 flex flex-col items-center group">
                <div className="bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-xl shadow-lg border border-red-200 text-[11px] font-bold text-slate-800 mb-1 flex items-center gap-1.5 whitespace-nowrap max-w-[200px] truncate">
                  <span className="material-symbols-outlined text-xs text-red-500">location_on</span>
                  <span>{dropoff ? dropoff : 'Where to?'}</span>
                </div>
                <div className="w-9 h-9 rounded-full bg-red-600 border-2 border-white shadow-xl flex items-center justify-center text-white ring-4 ring-red-500/30 animate-bounce">
                  <span className="material-symbols-outlined text-lg">flag</span>
                </div>
                <div className="w-2 h-1 bg-black/30 rounded-full blur-[1px] mt-0.5" />
              </div>

              {/* GPS Recenter */}
              <div className="absolute bottom-4 right-4 z-20 bg-white/90 backdrop-blur-md p-2 rounded-full shadow-lg border border-gray-200 text-gray-700 hover:bg-white cursor-pointer active:scale-95 transition-all">
                <span className="material-symbols-outlined text-xl text-blue-600">gps_fixed</span>
              </div>
            </div>

            {/* BOOKING CONTROL PANEL (Bottom Sheet Overlay) */}
            <div className="flex-1 bg-white rounded-t-3xl shadow-[0_-10px_30px_rgba(0,0,0,0.15)] p-5 sm:p-6 -mt-6 z-30 flex flex-col justify-between border-t border-gray-100 max-w-2xl mx-auto w-full">
              {!bookingSuccess ? (
                <div className="space-y-5">
                  <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto -mt-1 mb-2 opacity-80" />

                  {/* Location Inputs */}
                  <div className="bg-gray-50 rounded-2xl p-3 border border-gray-200 space-y-3 relative shadow-inner">
                    <div className="absolute left-[27px] top-[28px] bottom-[28px] w-0.5 bg-gray-300 border-l border-dashed border-gray-400 z-0" />

                    <div className="flex items-center gap-3 relative z-10">
                      <div className="w-4 h-4 rounded-full bg-blue-500 ring-4 ring-blue-100 flex items-center justify-center shrink-0">
                        <div className="w-1.5 h-1.5 rounded-full bg-white" />
                      </div>
                      <div className="flex-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block leading-none mb-0.5">
                          Pickup Location
                        </label>
                        <input
                          type="text"
                          value={pickup}
                          onChange={e => setPickup(e.target.value)}
                          className="w-full bg-transparent text-sm font-semibold text-gray-800 outline-none placeholder:text-gray-400"
                          placeholder="Enter pickup address..."
                        />
                      </div>
                    </div>

                    <div className="h-px bg-gray-200 ml-7" />

                    <div className="flex items-center gap-3 relative z-10">
                      <div className="w-4 h-4 rounded-full bg-red-500 ring-4 ring-red-100 flex items-center justify-center shrink-0">
                        <div className="w-1.5 h-1.5 rounded-full bg-white" />
                      </div>
                      <div className="flex-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block leading-none mb-0.5">
                          Drop-off Location
                        </label>
                        <input
                          type="text"
                          value={dropoff}
                          onChange={e => setDropoff(e.target.value)}
                          className="w-full bg-transparent text-sm font-bold text-[#00B14F] outline-none placeholder:text-gray-400 placeholder:font-normal"
                          placeholder="Where to?"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Suggested Quick Destinations */}
                  <div>
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">
                      Popular destinations in Da Nang:
                    </span>
                    <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                      {SUGGESTED_DESTINATIONS.map((dest, idx) => (
                        <button
                          key={idx}
                          onClick={() => setDropoff(dest.name)}
                          type="button"
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap border transition-all cursor-pointer ${
                            dropoff === dest.name
                              ? 'bg-[#00B14F] text-white border-[#00B14F] shadow-md'
                              : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-200'
                          }`}
                        >
                          {dest.name} <span className="opacity-80 font-normal">({dest.price})</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Vehicle Options List */}
                  <div className="space-y-2.5 pt-1">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">
                      Select Grab ride:
                    </span>

                    <div className="space-y-2">
                      {VEHICLE_OPTIONS.map(v => {
                        const isSelected = selectedVehicle === v.id;
                        return (
                          <div
                            key={v.id}
                            onClick={() => setSelectedVehicle(v.id)}
                            className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                              isSelected
                                ? 'border-[#00B14F] bg-[#00B14F]/5 shadow-md ring-1 ring-[#00B14F]'
                                : 'border-gray-200 hover:border-gray-300 bg-gray-50/80'
                            }`}
                          >
                            <div className="flex items-center gap-3.5">
                              <div
                                className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                                  isSelected
                                    ? 'bg-[#00B14F] text-white shadow-md'
                                    : 'bg-gray-200 text-gray-700'
                                }`}
                              >
                                <span className="material-symbols-outlined text-2xl">{v.icon}</span>
                              </div>

                              <div>
                                <div className="flex items-center gap-2">
                                  <h4 className="font-bold text-sm text-gray-900">{v.name}</h4>
                                  {v.badge && (
                                    <span className="bg-[#00B14F]/20 text-[#00B14F] font-extrabold text-[9px] px-2 py-0.5 rounded-full uppercase">
                                      {v.badge}
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs text-gray-500 mt-0.5">{v.description}</p>
                                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-600 mt-1">
                                  <span className="material-symbols-outlined text-xs text-[#00B14F]">schedule</span>
                                  <span>Driver arrives in {v.eta}</span>
                                </div>
                              </div>
                            </div>

                            <div className="text-right pl-2">
                              <span className="text-base font-extrabold text-[#00B14F] block">
                                {v.formattedPrice}
                              </span>
                              <span className="text-[10px] text-gray-400 font-medium">Fixed fare</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="pt-3 pb-2">
                    <button
                      onClick={handleBookRide}
                      disabled={isBooking}
                      type="button"
                      className={`w-full py-4 rounded-2xl text-base font-bold text-white shadow-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        isBooking
                          ? 'bg-[#00B14F]/75 opacity-90 cursor-not-allowed'
                          : 'bg-[#00B14F] hover:bg-[#009643] active:scale-[0.99] shadow-[#00B14F]/30'
                      }`}
                    >
                      {isBooking ? (
                        <>
                          <span className="material-symbols-outlined animate-spin text-xl">autorenew</span>
                          <span>Finding your driver...</span>
                        </>
                      ) : (
                        <>
                          <span className="material-symbols-outlined text-xl">local_taxi</span>
                          <span>
                            Book {activeVehicleObj.name} • {activeVehicleObj.formattedPrice}
                          </span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ) : (
                /* SUCCESS STATE: DRIVER FOUND */
                <div className="space-y-6 py-2 animate-fadeIn">
                  <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#00B14F] text-white flex items-center justify-center shrink-0 shadow-md">
                      <span className="material-symbols-outlined text-2xl">check_circle</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-emerald-950">Driver Found!</h3>
                      <p className="text-xs text-emerald-800 leading-snug mt-0.5">
                        Driver <b>{driverInfo?.name}</b> (Plate: <b>{driverInfo?.licensePlate}</b>) is arriving in <b>3 mins</b>.
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-slate-300 overflow-hidden border-2 border-white shadow">
                          <img
                            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                            alt="Driver"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-bold text-base text-gray-900">{driverInfo?.name}</h4>
                          <p className="text-xs text-gray-500">{driverInfo?.vehicleName} • Honda Wave Alpha</p>
                          <div className="flex items-center gap-1 text-xs font-bold text-amber-500 mt-0.5">
                            <span className="material-symbols-outlined text-xs">star</span>
                            <span>{driverInfo?.rating} (500+ trips)</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="px-2.5 py-1 rounded-lg bg-gray-900 text-white font-mono font-bold text-xs tracking-wider block">
                          {driverInfo?.licensePlate}
                        </span>
                        <span className="text-[10px] text-gray-500 mt-1 block">On the way</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-200">
                      <button
                        onClick={() => alert(`Calling driver ${driverInfo?.name} at ${driverInfo?.phone}...`)}
                        type="button"
                        className="py-2.5 bg-white border border-gray-300 rounded-xl text-xs font-bold text-gray-800 flex items-center justify-center gap-1.5 hover:bg-gray-100 cursor-pointer active:scale-95"
                      >
                        <span className="material-symbols-outlined text-base text-[#00B14F]">call</span>
                        <span>Call</span>
                      </button>

                      <button
                        onClick={() => alert(`Opening chat with driver ${driverInfo?.name}...`)}
                        type="button"
                        className="py-2.5 bg-white border border-gray-300 rounded-xl text-xs font-bold text-gray-800 flex items-center justify-center gap-1.5 hover:bg-gray-100 cursor-pointer active:scale-95"
                      >
                        <span className="material-symbols-outlined text-base text-[#00B14F]">chat</span>
                        <span>Message</span>
                      </button>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-3 border border-gray-200 text-xs space-y-1.5">
                    <div className="flex items-center gap-2 text-gray-700">
                      <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                      <span className="font-semibold truncate">Pickup: {pickup}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <span className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
                      <span className="font-semibold truncate">Drop-off: {dropoff || 'Selected Destination'}</span>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <button
                      onClick={() => setViewMode('home')}
                      type="button"
                      className="w-full py-3.5 bg-[#00B14F] hover:bg-[#009643] text-white font-bold text-sm rounded-xl shadow-lg cursor-pointer active:scale-95 transition-all"
                    >
                      Back to Grab Home
                    </button>

                    <button
                      onClick={handleResetBooking}
                      type="button"
                      className="w-full py-2.5 text-xs text-gray-500 font-semibold hover:text-gray-800 cursor-pointer"
                    >
                      Book another ride
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

