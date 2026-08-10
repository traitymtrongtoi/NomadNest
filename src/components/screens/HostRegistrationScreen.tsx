import React, { useState } from 'react';
import { saveCurrentUserToStorage } from '../../utils/userStorage';

interface HostRegistrationScreenProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export const HostRegistrationScreen: React.FC<HostRegistrationScreenProps> = ({
  onSuccess,
  onCancel
}) => {
  const [hostName, setHostName] = useState('');
  const [propertyTitle, setPropertyTitle] = useState('');
  const [craftVillage, setCraftVillage] = useState('Làng nước mắm Nam Ô');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveCurrentUserToStorage({
      id: 'host_' + Date.now(),
      name: hostName.trim() || 'Mrs. Mai',
      email: email.trim() || 'mai.host@nomadnest.vn',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
      role: 'local_host',
      badge: 'Superhost'
    });
    onSuccess();
  };

  return (
    <div className="bg-gradient-to-br from-[#065f46] to-[#002116] min-h-screen text-white font-sans antialiased pb-24 pt-20">
      {/* Top App Bar */}
      <header className="fixed top-0 w-full z-50 bg-[#002116]/80 backdrop-blur-xl shadow-sm flex items-center justify-between px-6 h-16 border-b border-white/10">
        <button
          onClick={onCancel}
          className="flex items-center gap-1.5 text-xs font-semibold text-white/80 hover:text-white px-3 py-1.5 rounded-full bg-white/10 border border-white/20 transition-all"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          <span>Quay lại</span>
        </button>
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary-fixed" style={{ fontVariationSettings: "'FILL' 1" }}>spa</span>
          <span className="font-bold text-xl text-white tracking-tight">NomadNest Host</span>
        </div>
        <div className="w-20" />
      </header>

      <main className="max-w-xl mx-auto px-6 mt-4">
        {/* Header */}
        <div className="mb-6 text-center">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center mx-auto mb-3 shadow-lg">
            <span className="material-symbols-outlined text-2xl">storefront</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-1">Tôi là Local Host</h1>
          <p className="text-white/70 text-xs">Cung cấp chỗ ở và chia sẻ văn hóa làng nghề truyền thống.</p>
        </div>

        {/* Form Card */}
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-white/10 shadow-2xl relative overflow-hidden">
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Họ và tên chủ nhà */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-white/90">Họ và tên chủ nhà</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-white/50 text-lg">person</span>
                <input
                  type="text"
                  required
                  value={hostName}
                  onChange={e => setHostName(e.target.value)}
                  placeholder="VD: Bà Mai / Ông Bình"
                  className="w-full h-11 pl-10 pr-4 bg-black/20 border border-white/20 rounded-xl text-sm text-white placeholder:text-white/40 focus:border-primary-fixed outline-none"
                />
              </div>
            </div>

            {/* Tên cơ sở lưu trú / Xưởng */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-white/90">Tên cơ sở lưu trú / Xưởng</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-white/50 text-lg">home</span>
                <input
                  type="text"
                  required
                  value={propertyTitle}
                  onChange={e => setPropertyTitle(e.target.value)}
                  placeholder="VD: Ocean Breeze Villa / Xưởng Đá Non Nước"
                  className="w-full h-11 pl-10 pr-4 bg-black/20 border border-white/20 rounded-xl text-sm text-white placeholder:text-white/40 focus:border-primary-fixed outline-none"
                />
              </div>
            </div>

            {/* Thuộc Làng nghề nào */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-white/90">Thuộc Làng nghề nào?</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-white/50 text-lg">location_on</span>
                <select
                  value={craftVillage}
                  onChange={e => setCraftVillage(e.target.value)}
                  className="w-full h-11 pl-10 pr-4 bg-[#00281D] border border-white/20 rounded-xl text-sm text-white focus:border-primary-fixed outline-none"
                >
                  <option value="Làng nước mắm Nam Ô">Làng nước mắm Nam Ô</option>
                  <option value="Làng đá mỹ nghệ Non Nước">Làng đá mỹ nghệ Non Nước</option>
                  <option value="Làng chiếu Cẩm Nê">Làng chiếu Cẩm Nê</option>
                  <option value="Làng bánh tráng Túy Loan">Làng bánh tráng Túy Loan</option>
                  <option value="Làng chài Mẫn Thái">Làng chài Mẫn Thái</option>
                  <option value="Khác">Làng nghề khác...</option>
                </select>
              </div>
            </div>

            {/* Email & Mật khẩu */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-white/90">Email</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-white/50 text-lg">mail</span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="host@nomadnest.vn"
                    className="w-full h-11 pl-10 pr-4 bg-black/20 border border-white/20 rounded-xl text-sm text-white placeholder:text-white/40 focus:border-primary-fixed outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-white/90">Mật khẩu</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-white/50 text-lg">lock</span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full h-11 pl-10 pr-11 bg-black/20 border border-white/20 rounded-xl text-sm text-white placeholder:text-white/40 focus:border-primary-fixed outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors focus:outline-none flex items-center justify-center cursor-pointer p-1"
                    aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                  >
                    <span className="material-symbols-outlined text-lg">
                      {showPassword ? 'visibility' : 'visibility_off'}
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-3">
              <button
                type="submit"
                className="w-full h-13 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 active:scale-98"
              >
                <span>Trở Thành Local Host</span>
                <span className="material-symbols-outlined text-base">verified</span>
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};
