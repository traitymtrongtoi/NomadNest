import React, { useState } from 'react';
import { Property, Booking } from '../../types';
import { supabase } from '../../lib/supabase';

interface BookingSummaryScreenProps {
  property: Property;
  onConfirmBooking: (booking: Booking) => void;
  onCancel: () => void;
}

export const BookingSummaryScreen: React.FC<BookingSummaryScreenProps> = ({
  property,
  onConfirmBooking,
  onCancel
}) => {
  const [nights] = useState(3);
  const [includePackage, setIncludePackage] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  const roomPrice = property.pricePerNight * nights;
  const packagePrice = includePackage ? 45 : 0;
  const serviceFee = 25;
  const taxes = 20;
  const totalPrice = roomPrice + packagePrice + serviceFee + taxes;

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const newBooking: Booking = {
        id: 'bk_' + Date.now(),
        propertyId: property.id,
        propertyTitle: property.title,
        propertyImage: property.images[0],
        checkIn: 'Nov 12, 2026',
        checkOut: 'Nov 15, 2026',
        guestsCount: 1,
        nightsCount: nights,
        pricePerNight: property.pricePerNight,
        packagePrice,
        serviceFee,
        taxes,
        totalPrice,
        status: 'confirmed',
        guestName: 'Sarah Johnson'
      };
      // Sync booking asynchronously to Supabase
      supabase.from('bookings').insert({
        id: newBooking.id,
        property_id: newBooking.propertyId,
        property_title: newBooking.propertyTitle,
        check_in: newBooking.checkIn,
        check_out: newBooking.checkOut,
        total_price: newBooking.totalPrice,
        status: newBooking.status,
        guest_name: newBooking.guestName
      }).then(({ error }) => {
        if (error) console.log('Supabase booking sync note:', error.message);
      });

      setIsProcessing(false);
      onConfirmBooking(newBooking);
    }, 1500);
  };

  return (
    <div className="bg-slate-50 text-gray-900 font-sans min-h-screen pb-24">
      {/* Top Header */}
      <header className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-xl shadow-sm border-b border-gray-200 flex items-center justify-between px-6 h-16">
        <button onClick={onCancel} className="text-gray-700 hover:text-black">
          <span className="material-symbols-outlined text-2xl">arrow_back</span>
        </button>
        <h1 className="font-bold text-lg text-emerald-900">Review your booking</h1>
        <div className="w-6" />
      </header>

      <main className="pt-20 px-6 max-w-xl mx-auto space-y-6">
        {/* Property Card Summary */}
        <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-sm flex items-center gap-4">
          <img src={property.images[0]} alt={property.title} className="w-24 h-24 rounded-2xl object-cover shrink-0" />
          <div>
            <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">{property.villageName}</span>
            <h2 className="text-lg font-bold text-gray-900">{property.title}</h2>
            <p className="text-xs text-gray-500 mt-0.5">{property.location}</p>
            <div className="mt-2 text-xs font-semibold text-emerald-800 flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">event</span>
              Nov 12 - Nov 15, 2026 ({nights} Nights)
            </div>
          </div>
        </div>

        {/* Nomad Package Addon */}
        <div className="bg-emerald-900 text-white rounded-3xl p-5 shadow-md space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary-fixed">wifi_calling_3</span>
              <h3 className="font-bold text-base">Nomad Workation Bundle</h3>
            </div>
            <input
              type="checkbox"
              checked={includePackage}
              onChange={e => setIncludePackage(e.target.checked)}
              className="w-5 h-5 accent-primary-fixed cursor-pointer"
            />
          </div>
          <p className="text-xs text-emerald-100/80 leading-relaxed">
            Includes 150 Mbps Fiber Wi-Fi guarantee, Ergonomic Chair setup, 24/7 Concierge Support, and 1 Free Craft Workshop.
          </p>
          <div className="text-xs font-bold text-primary-fixed">+ $45.00 USD</div>
        </div>

        {/* Price Breakdown */}
        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-3">
          <h3 className="font-bold text-base text-gray-900 pb-2 border-b border-gray-100">Price Details</h3>
          <div className="flex justify-between text-sm text-gray-600">
            <span>${property.pricePerNight} x {nights} nights</span>
            <span className="font-semibold text-gray-900">${roomPrice}.00</span>
          </div>
          {includePackage && (
            <div className="flex justify-between text-sm text-gray-600">
              <span>Nomad Workation Bundle</span>
              <span className="font-semibold text-gray-900">$45.00</span>
            </div>
          )}
          <div className="flex justify-between text-sm text-gray-600">
            <span>NomadNest Service Fee</span>
            <span className="font-semibold text-gray-900">${serviceFee}.00</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Taxes & Local Tourism Fees</span>
            <span className="font-semibold text-gray-900">${taxes}.00</span>
          </div>
          <div className="border-t border-gray-200 pt-3 flex justify-between items-center text-lg font-bold text-gray-900">
            <span>Total Price</span>
            <span className="text-emerald-900">${totalPrice}.00 USD</span>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3 pt-2">
          <button
            onClick={handlePay}
            disabled={isProcessing}
            className="w-full h-14 bg-emerald-900 text-white font-bold rounded-2xl shadow-lg hover:bg-emerald-800 transition-all flex items-center justify-center gap-2 text-base active:scale-98"
          >
            {isProcessing ? (
              <span className="flex items-center gap-2">
                <span className="material-symbols-outlined animate-spin">sync</span>
                Securing Reservation...
              </span>
            ) : (
              <span>Continue to Payment (${totalPrice}.00)</span>
            )}
          </button>
          <button
            onClick={onCancel}
            className="w-full py-3 text-sm text-gray-500 font-semibold hover:text-gray-800"
          >
            Cancel Booking
          </button>
        </div>
      </main>
    </div>
  );
};
