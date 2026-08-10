import React from 'react';

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EmergencyModal: React.FC<EmergencyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleCallSOS = (number: string, title: string) => {
    alert(`Đang khởi tạo cuộc gọi khẩn cấp đến ${title} (${number})...`);
  };

  const handleShareLocation = () => {
    alert('📍 Vị trí GPS hiện tại của bạn đã được gửi khẩn cấp tới Local Host & Đội cứu hộ NomadNest Đà Nẵng!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-gradient-to-b from-[#003829] to-[#001D15] border border-white/20 rounded-3xl p-6 w-full max-w-md text-white shadow-2xl relative overflow-hidden">
        {/* Top Glow Accent */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-red-500/20 rounded-full blur-2xl" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
        >
          <span className="material-symbols-outlined text-sm">close</span>
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center shadow-lg shrink-0">
            <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              support_agent
            </span>
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-white">Liên Hệ Khẩn Cấp 24/7</h2>
            <p className="text-xs text-red-200">Hỗ trợ y tế, an ninh & cứu hộ NomadNest Đà Nẵng</p>
          </div>
        </div>

        {/* SOS Quick Action Cards */}
        <div className="space-y-3 mb-5">
          {/* NomadNest Support Hotline */}
          <button
            onClick={() => handleCallSOS('+84 905 123 456', 'NomadNest Support 24/7')}
            className="w-full p-3.5 bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 rounded-2xl flex items-center justify-between text-left transition-all group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-500 text-white flex items-center justify-center shadow">
                <span className="material-symbols-outlined text-xl">phone_in_talk</span>
              </div>
              <div>
                <p className="text-xs text-red-300 font-bold uppercase tracking-wider">Hotline NomadNest (24/7)</p>
                <p className="text-sm font-extrabold text-white">+84 905 123 456</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-red-300 group-hover:translate-x-1 transition-transform">
              chevron_right
            </span>
          </button>

          {/* Emergency Ambulance 115 */}
          <button
            onClick={() => handleCallSOS('115', 'Cấp Cứu Y Tế 115')}
            className="w-full p-3 bg-white/5 hover:bg-white/10 border border-white/15 rounded-2xl flex items-center justify-between text-left transition-all cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/30 text-amber-300 flex items-center justify-center">
                <span className="material-symbols-outlined text-xl">medical_services</span>
              </div>
              <div>
                <p className="text-xs text-white/70 font-semibold">Cấp Cứu Y Tế Quốc Gia</p>
                <p className="text-sm font-bold text-white">115</p>
              </div>
            </div>
            <span className="text-xs font-bold text-amber-300 bg-amber-500/20 px-2.5 py-1 rounded-lg">Gọi Ngay</span>
          </button>

          {/* Police 113 */}
          <button
            onClick={() => handleCallSOS('113', 'Cảnh Sát 113')}
            className="w-full p-3 bg-white/5 hover:bg-white/10 border border-white/15 rounded-2xl flex items-center justify-between text-left transition-all cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/30 text-blue-300 flex items-center justify-center">
                <span className="material-symbols-outlined text-xl">local_police</span>
              </div>
              <div>
                <p className="text-xs text-white/70 font-semibold">Cảnh Sát & An Ninh</p>
                <p className="text-sm font-bold text-white">113</p>
              </div>
            </div>
            <span className="text-xs font-bold text-blue-300 bg-blue-500/20 px-2.5 py-1 rounded-lg">Gọi Ngay</span>
          </button>
        </div>

        {/* Send Location SOS Button */}
        <button
          onClick={handleShareLocation}
          className="w-full py-3 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-xs rounded-xl shadow-lg flex items-center justify-center gap-2 active:scale-98 transition-all cursor-pointer mb-3"
        >
          <span className="material-symbols-outlined text-base">my_location</span>
          <span>Gửi Vị Trí Cứu Hộ SOS Cho Host</span>
        </button>

        <p className="text-[11px] text-center text-white/60">
          Đội ngũ hỗ trợ địa phương NomadNest luôn ứng trực 24/7 để bảo vệ an toàn cho bạn.
        </p>
      </div>
    </div>
  );
};
