import React, { useState } from 'react';
import { saveCurrentUserToStorage } from '../../utils/userStorage';

interface GuestRegistrationScreenProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export const GuestRegistrationScreen: React.FC<GuestRegistrationScreenProps> = ({
  onSuccess,
  onCancel
}) => {
  const [fullName, setFullName] = useState('Sarah Jenkins');
  const [email, setEmail] = useState('sarah.j@digitalnomad.io');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [nationality, setNationality] = useState('Việt Nam');
  const [workField, setWorkField] = useState('IT & Lập trình');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveCurrentUserToStorage({
      id: 'user_' + Date.now(),
      name: fullName,
      email: email,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      role: 'nomad_user',
      badge: 'Premium Nomad'
    });
    onSuccess();
  };

  return (
    <div className="bg-gradient-to-br from-[#003829] via-[#002B1F] to-[#001710] min-h-screen text-white font-sans overflow-x-hidden relative pb-32">
      {/* Top Header */}
      <header className="fixed top-0 w-full z-50 bg-[#002116]/80 backdrop-blur-xl shadow-sm border-b border-white/10">
        <div className="flex items-center justify-between px-6 h-16 w-full max-w-5xl mx-auto">
          <button
            onClick={onCancel}
            className="flex items-center gap-1.5 text-xs font-semibold text-white/80 hover:text-white px-3 py-1.5 rounded-full bg-white/10 border border-white/20 transition-all"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            <span>Quay lại</span>
          </button>
          <div className="flex items-center gap-2 text-primary-fixed">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>spa</span>
            <h1 className="font-bold text-xl tracking-tight text-white">NomadNest</h1>
          </div>
          <div className="w-20" />
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 px-6 max-w-xl mx-auto">
        <div className="mb-6 text-center">
          <div className="w-12 h-12 rounded-2xl bg-primary-fixed text-on-primary-fixed flex items-center justify-center mx-auto mb-3 shadow-lg">
            <span className="material-symbols-outlined text-2xl">luggage</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-1">Tôi là Digital Nomad</h2>
          <p className="text-primary-fixed-dim text-xs">Tìm kiếm chỗ ở và không gian làm việc tại các làng nghề.</p>
        </div>

        {/* Form Card */}
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-white/10 shadow-2xl relative overflow-hidden">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            
            {/* Họ và tên */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-white/90">Họ và tên</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-white/50 text-lg">person</span>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  className="w-full h-11 pl-10 pr-4 bg-black/20 border border-white/20 rounded-xl text-sm text-white placeholder:text-white/40 focus:border-primary-fixed outline-none"
                  placeholder="Họ và tên của bạn"
                />
              </div>
            </div>

            {/* Email & Password */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-white/90">Email</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-white/50 text-lg">mail</span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full h-11 pl-10 pr-4 bg-black/20 border border-white/20 rounded-xl text-sm text-white placeholder:text-white/40 focus:border-primary-fixed outline-none"
                    placeholder="email@domain.com"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-white/90">Mật khẩu</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-white/50 text-lg">lock</span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full h-11 pl-10 pr-11 bg-black/20 border border-white/20 rounded-xl text-sm text-white placeholder:text-white/40 focus:border-primary-fixed outline-none"
                    placeholder="••••••••"
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

            {/* Quốc tịch & Lĩnh vực công việc */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-white/90">Quốc tịch</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-white/50 text-lg">public</span>
                  <select
                    value={nationality}
                    onChange={e => setNationality(e.target.value)}
                    className="w-full h-11 pl-10 pr-4 bg-[#00281D] border border-white/20 rounded-xl text-sm text-white focus:border-primary-fixed outline-none"
                  >
                    <option value="Việt Nam">Việt Nam</option>
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Australia">Australia</option>
                    <option value="Germany">Germany</option>
                    <option value="Japan">Japan</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-white/90">Lĩnh vực công việc</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-white/50 text-lg">work</span>
                  <select
                    value={workField}
                    onChange={e => setWorkField(e.target.value)}
                    className="w-full h-11 pl-10 pr-4 bg-[#00281D] border border-white/20 rounded-xl text-sm text-white focus:border-primary-fixed outline-none"
                  >
                    <option value="IT & Lập trình">IT & Lập trình</option>
                    <option value="Marketing & Nội dung">Marketing & Content</option>
                    <option value="Thiết kế (UI/UX, Graphic)">Thiết kế (UI/UX, Graphic)</option>
                    <option value="Kinh doanh & Remote">Kinh doanh & Remote</option>
                    <option value="Khác">Lĩnh vực khác</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-3">
              <button
                type="submit"
                className="w-full h-13 bg-primary-fixed hover:bg-primary-fixed-dim text-on-primary-fixed font-bold text-sm rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 active:scale-98"
              >
                <span>Tạo Tài Khoản Nomad</span>
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};
