import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';

export interface BookingCheckoutData {
  id?: string;
  propertyId?: string;
  title: string;
  image: string;
  location?: string;
  villageName?: string;
  checkIn: string;
  checkOut: string;
  nightsCount: number;
  guestsCount: number;
  pricePerNight: number | string; // e.g. 850000 or "$35"
  priceFormatted?: string;
  currency?: 'VND' | 'USD';
}

interface BookingCheckoutScreenProps {
  bookingData: BookingCheckoutData;
  currentUser?: { name?: string; email?: string } | null;
  onBack: () => void;
  onConfirmSuccess: () => void;
}

export const BookingCheckoutScreen: React.FC<BookingCheckoutScreenProps> = ({
  bookingData,
  currentUser,
  onBack,
  onConfirmSuccess
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'momo' | 'pay_at_property'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  // Helper to parse numeric price
  const parsePriceNumber = (val: number | string): number => {
    if (typeof val === 'number') return val;
    const cleanStr = String(val).replace(/[^0-9]/g, '');
    const num = parseInt(cleanStr, 10);
    return isNaN(num) ? 500000 : num;
  };

  const rawBasePrice = parsePriceNumber(bookingData.pricePerNight);
  const nights = bookingData.nightsCount || 1;
  const roomTotalPrice = rawBasePrice * nights;
  const serviceFee = Math.round(roomTotalPrice * 0.08); // 8% service fee
  const grandTotal = roomTotalPrice + serviceFee;

  // Format currency helper
  const isUSD = typeof bookingData.pricePerNight === 'number' && bookingData.pricePerNight < 1000;
  
  const formatMoney = (amount: number) => {
    if (isUSD) {
      return `$${amount.toLocaleString('en-US')}.00 USD`;
    }
    return `${amount.toLocaleString('vi-VN')} VNĐ`;
  };

  const handleConfirmAndPay = () => {
    alert('Đặt phòng thành công! Cảm ơn bạn.');

    setIsProcessing(true);

    setTimeout(() => {
      // Determine guest name dynamically
      let guestDisplayName = currentUser?.name;
      if (!guestDisplayName) {
        try {
          const storedNomad = localStorage.getItem('nomad_current_user_nomad_user');
          if (storedNomad) {
            const parsed = JSON.parse(storedNomad);
            if (parsed?.name) guestDisplayName = parsed.name;
          }
        } catch (_) {}
      }
      if (!guestDisplayName) {
        guestDisplayName = 'David Miller (Kỹ sư phần mềm)';
      }

      // 1. Create new booking record
      const newBooking = {
        id: 'bk_' + Date.now(),
        guestName: guestDisplayName,
        propertyTitle: bookingData.title,
        propertyImage: bookingData.image,
        location: bookingData.location || bookingData.villageName || 'Đà Nẵng',
        villageName: bookingData.villageName || 'Đà Nẵng',
        checkIn: bookingData.checkIn,
        checkOut: bookingData.checkOut,
        nightsCount: nights,
        guestsCount: bookingData.guestsCount || 1,
        totalPrice: formatMoney(grandTotal),
        rawTotalPrice: grandTotal,
        paymentMethod: paymentMethod,
        status: 'confirmed',
        createdAt: new Date().toISOString()
      };

      // 2. Save into localStorage 'myBookings'
      try {
        const existingMyBookings = JSON.parse(localStorage.getItem('myBookings') || '[]');
        existingMyBookings.unshift(newBooking);
        localStorage.setItem('myBookings', JSON.stringify(existingMyBookings));

        // Also sync nomad_bookings for backwards compatibility
        localStorage.setItem('nomad_bookings', JSON.stringify(existingMyBookings));
        window.dispatchEvent(new Event('nomad_bookings_updated'));
      } catch (err) {
        console.error('Error saving booking to localStorage:', err);
      }

      // Sync booking asynchronously to Supabase
      supabase.from('bookings').insert({
        id: newBooking.id,
        property_title: newBooking.propertyTitle,
        check_in: newBooking.checkIn,
        check_out: newBooking.checkOut,
        total_price: grandTotal,
        status: 'confirmed'
      }).then(({ error }) => {
        if (error) console.log('Supabase booking sync note:', error.message);
      });

      setIsProcessing(false);
      setShowSuccessToast(true);

      // Auto redirect to My Bookings screen
      setTimeout(() => {
        onConfirmSuccess();
      }, 1200);
    }, 600);
  };

  return (
    <div className="bg-gradient-to-br from-[#00281D] via-[#001D15] to-[#00120D] text-white min-h-screen flex flex-col pb-32 font-sans antialiased">
      {/* Top Header */}
      <header className="fixed top-0 w-full z-50 bg-[#00281D]/95 backdrop-blur-xl flex items-center justify-between px-5 h-16 border-b border-white/10 shadow-lg">
        <button
          onClick={onBack}
          type="button"
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer active:scale-95"
        >
          <span className="material-symbols-outlined text-xl">arrow_back</span>
        </button>
        <h1 className="font-extrabold text-base text-white tracking-tight">Xác Nhận & Thanh Toán</h1>
        <div className="w-10" />
      </header>

      {/* Main Form Content */}
      <main className="pt-20 px-4 max-w-xl mx-auto w-full space-y-6 flex-1">
        
        {/* KHỐI 1: TÓM TẮT ĐƠN HÀNG (ORDER SUMMARY) */}
        <section className="bg-white/10 border border-white/20 backdrop-blur-xl rounded-3xl p-5 shadow-2xl space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-white/10">
            <span className="material-symbols-outlined text-emerald-400 text-xl">receipt_long</span>
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-emerald-300">Tóm Tắt Đơn Hàng</h2>
          </div>

          <div className="flex gap-4 items-center">
            <img
              src={bookingData.image || 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=400&q=80'}
              alt={bookingData.title}
              className="w-20 h-20 rounded-2xl object-cover shrink-0 border border-white/20 shadow-md"
            />
            <div className="flex-1 min-w-0">
              {bookingData.villageName && (
                <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-wide block">
                  {bookingData.villageName}
                </span>
              )}
              <h3 className="text-base font-extrabold text-white truncate leading-snug">{bookingData.title}</h3>
              {bookingData.location && (
                <p className="text-xs text-white/70 flex items-center gap-1 mt-0.5">
                  <span className="material-symbols-outlined text-xs text-emerald-400">location_on</span>
                  <span className="truncate">{bookingData.location}</span>
                </p>
              )}
            </div>
          </div>

          {/* Stay Dates & Nights Info */}
          <div className="bg-black/30 border border-white/10 rounded-2xl p-3 grid grid-cols-2 gap-2 text-xs">
            <div className="space-y-0.5">
              <span className="text-[10px] uppercase font-bold text-emerald-300/80">Thời Gian Lưu Trú</span>
              <p className="font-extrabold text-white flex items-center gap-1">
                <span className="material-symbols-outlined text-xs text-emerald-400">calendar_month</span>
                <span>{bookingData.checkIn} - {bookingData.checkOut}</span>
              </p>
            </div>
            <div className="space-y-0.5 text-right">
              <span className="text-[10px] uppercase font-bold text-emerald-300/80">Số Đêm & Số Khách</span>
              <p className="font-extrabold text-white flex items-center justify-end gap-1">
                <span className="material-symbols-outlined text-xs text-emerald-400">group</span>
                <span>{nights} Đêm • {bookingData.guestsCount || 1} Khách</span>
              </p>
            </div>
          </div>

          {/* Cost Calculations */}
          <div className="pt-2 space-y-2 border-t border-white/10 text-xs text-white/80">
            <div className="flex justify-between items-center">
              <span>Giá phòng ({formatMoney(rawBasePrice)} x {nights} đêm)</span>
              <span className="font-bold text-white">{formatMoney(roomTotalPrice)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-1">
                <span>Phí dịch vụ & Bảo trợ Nomad</span>
                <span className="material-symbols-outlined text-[14px] text-emerald-400">info</span>
              </span>
              <span className="font-bold text-white">{formatMoney(serviceFee)}</span>
            </div>

            <div className="pt-3 border-t border-white/15 flex justify-between items-center">
              <div>
                <span className="block text-[11px] font-extrabold uppercase text-emerald-300 tracking-wider">Tổng Tiền Thanh Toán</span>
                <span className="text-[10px] text-white/50">Đã bao gồm thuế & phí dịch vụ</span>
              </div>
              <span className="text-xl font-black text-emerald-300 tracking-tight">
                {formatMoney(grandTotal)}
              </span>
            </div>
          </div>
        </section>

        {/* KHỐI 2: PHƯƠNG THỨC THANH TOÁN (PAYMENT METHODS) */}
        <section className="bg-white/10 border border-white/20 backdrop-blur-xl rounded-3xl p-5 shadow-2xl space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-white/10">
            <span className="material-symbols-outlined text-emerald-400 text-xl">payments</span>
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-emerald-300">Phương Thức Thanh Toán</h2>
          </div>

          <div className="space-y-2.5">
            {/* Option 1: Credit / Debit Card */}
            <div
              onClick={() => setPaymentMethod('card')}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center gap-3.5 ${
                paymentMethod === 'card'
                  ? 'bg-emerald-500/20 border-emerald-400 ring-2 ring-emerald-400/30'
                  : 'bg-black/20 border-white/10 hover:border-white/30'
              }`}
            >
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                paymentMethod === 'card' ? 'border-emerald-400 bg-emerald-500' : 'border-white/40'
              }`}>
                {paymentMethod === 'card' && <div className="w-2 h-2 rounded-full bg-white" />}
              </div>

              <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0 text-amber-300">
                <span className="material-symbols-outlined text-2xl">credit_card</span>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-extrabold text-white">Thẻ Tín dụng / Ghi nợ</h4>
                  <div className="flex items-center gap-1 bg-white/20 px-1.5 py-0.5 rounded text-[9px] font-bold text-white">
                    Visa / Mastercard / JCB
                  </div>
                </div>
                <p className="text-[11px] text-white/60 mt-0.5">Thanh toán bảo mật quốc tế qua cổng Stripe/CyberSource</p>
              </div>
            </div>

            {/* Option 2: E-Wallet / MoMo / VNPay */}
            <div
              onClick={() => setPaymentMethod('momo')}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center gap-3.5 ${
                paymentMethod === 'momo'
                  ? 'bg-emerald-500/20 border-emerald-400 ring-2 ring-emerald-400/30'
                  : 'bg-black/20 border-white/10 hover:border-white/30'
              }`}
            >
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                paymentMethod === 'momo' ? 'border-emerald-400 bg-emerald-500' : 'border-white/40'
              }`}>
                {paymentMethod === 'momo' && <div className="w-2 h-2 rounded-full bg-white" />}
              </div>

              <div className="w-10 h-10 rounded-xl bg-pink-500/20 border border-pink-400/30 flex items-center justify-center shrink-0 text-pink-300">
                <span className="material-symbols-outlined text-2xl">qr_code_2</span>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-extrabold text-white">Ví Điện Tử (MoMo / VNPay / ZaloPay)</h4>
                  <span className="bg-pink-500/30 text-pink-200 border border-pink-400/40 text-[9px] font-bold px-1.5 py-0.5 rounded">
                    Quét Mã QR
                  </span>
                </div>
                <p className="text-[11px] text-white/60 mt-0.5">Thanh toán tức thì bằng ứng dụng Ngân hàng hoặc Ví MoMo</p>
              </div>
            </div>

            {/* Option 3: Pay At Property */}
            <div
              onClick={() => setPaymentMethod('pay_at_property')}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center gap-3.5 ${
                paymentMethod === 'pay_at_property'
                  ? 'bg-emerald-500/20 border-emerald-400 ring-2 ring-emerald-400/30'
                  : 'bg-black/20 border-white/10 hover:border-white/30'
              }`}
            >
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                paymentMethod === 'pay_at_property' ? 'border-emerald-400 bg-emerald-500' : 'border-white/40'
              }`}>
                {paymentMethod === 'pay_at_property' && <div className="w-2 h-2 rounded-full bg-white" />}
              </div>

              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center shrink-0 text-emerald-300">
                <span className="material-symbols-outlined text-2xl">storefront</span>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-extrabold text-white">Thanh Toán Tại Chỗ (Pay at property)</h4>
                  <span className="bg-emerald-500/30 text-emerald-200 border border-emerald-400/40 text-[9px] font-bold px-1.5 py-0.5 rounded">
                    Tiền mặt / Chuyển khoản
                  </span>
                </div>
                <p className="text-[11px] text-white/60 mt-0.5">Thanh toán trực tiếp cho Host địa phương khi bạn Check-in</p>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* KHỐI 3: BOTTOM BAR CỐ ĐỊNH Ở ĐÁY MÀN HÌNH (FIXED BOTTOM ACTION BAR) */}
      <div 
        id="checkout-fixed-bottom-bar"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100%',
          padding: '16px',
          backgroundColor: '#0b261a',
          zIndex: 50,
          borderTop: '1px solid #1f3d2f'
        }}
        className="shadow-2xl"
      >
        <div className="max-w-xl mx-auto w-full">
          <button
            id="btn-confirm-booking"
            type="button"
            onClick={handleConfirmAndPay}
            disabled={isProcessing || showSuccessToast}
            style={{
              width: '100%',
              backgroundColor: '#1db954',
              color: '#ffffff',
              fontWeight: 'bold',
              borderRadius: '8px',
              padding: '14px 0',
              textAlign: 'center',
              cursor: 'pointer',
              border: 'none',
              fontSize: '16px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}
            className="hover:opacity-95 active:scale-[0.99] transition-all disabled:opacity-50"
          >
            {isProcessing ? 'ĐANG XỬ LÝ...' : 'XÁC NHẬN ĐẶT PHÒNG'}
          </button>
        </div>
      </div>

      {/* SUCCESS TOAST / POPUP MODAL */}
      {showSuccessToast && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#00281D] border border-emerald-400/50 rounded-3xl p-6 w-full max-w-sm text-center text-white shadow-2xl space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-300 flex items-center justify-center mx-auto shadow-lg animate-bounce">
              <span className="material-symbols-outlined text-4xl">check_circle</span>
            </div>
            <div>
              <h3 className="text-xl font-black text-white">Đặt Phòng Thành Công!</h3>
              <p className="text-xs text-emerald-200 mt-1.5 leading-relaxed">
                Đơn đặt phòng cho <strong className="text-white">"{bookingData.title}"</strong> đã được lưu thành công.
              </p>
            </div>
            <div className="p-3 bg-black/30 rounded-2xl border border-white/10 text-xs text-white/80 space-y-1">
              <p className="font-bold text-emerald-300">Tổng tiền: {formatMoney(grandTotal)}</p>
              <p className="text-[11px] text-white/60">Đang chuyển về trang chính...</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
