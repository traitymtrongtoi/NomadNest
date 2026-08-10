import React, { useState } from 'react';
import { UserRole } from '../../types';
import { saveCurrentUserToStorage } from '../../utils/userStorage';

interface AuthFormProps {
  role: UserRole;
  onBackToRoleSelect: () => void;
  onAuthSuccess: (role: UserRole) => void;
  lang: 'VI' | 'EN';
}

export const AuthForm: React.FC<AuthFormProps> = ({
  role,
  onBackToRoleSelect,
  onAuthSuccess,
  lang,
}) => {
  const [authMode, setAuthMode] = useState<'signup' | 'login'>('signup');

  // Digital Nomad Signup States
  const [nomadName, setNomadName] = useState('');
  const [nomadEmail, setNomadEmail] = useState('');
  const [nomadPassword, setNomadPassword] = useState('');
  const [nomadNationality, setNomadNationality] = useState('Việt Nam');

  // Local Host Signup States
  const [hostName, setHostName] = useState('');
  const [hostProperty, setHostProperty] = useState('');
  const [hostVillage, setHostVillage] = useState('Làng nước mắm Nam Ô');
  const [hostEmail, setHostEmail] = useState('');
  const [hostPassword, setHostPassword] = useState('');

  // Common Login States
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Show/Hide Password States
  const [showNomadPassword, setShowNomadPassword] = useState(false);
  const [showHostPassword, setShowHostPassword] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === 'local_host') {
      const name = authMode === 'signup' ? (hostName || 'Mrs. Mai') : 'Mrs. Mai';
      const email = authMode === 'signup' ? (hostEmail || 'mai.host@nomadnest.vn') : (loginEmail || 'mai.host@nomadnest.vn');
      saveCurrentUserToStorage({
        id: 'host_' + Date.now(),
        name: name,
        email: email,
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
        role: 'local_host',
        badge: 'Superhost'
      });
    } else if (role === 'admin') {
      saveCurrentUserToStorage({
        id: 'admin_sys',
        name: 'System Administrator',
        email: 'admin@nomadnest.vn',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
        role: 'admin',
        badge: 'Master Admin'
      });
    } else {
      const name = authMode === 'signup' ? (nomadName || 'Sarah Johnson') : 'Sarah Johnson';
      const email = authMode === 'signup' ? (nomadEmail || 'sarah.j@digitalnomad.io') : (loginEmail || 'sarah.j@digitalnomad.io');
      saveCurrentUserToStorage({
        id: 'user_' + Date.now(),
        name: name,
        email: email,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        role: 'nomad_user',
        badge: 'Premium Nomad'
      });
    }
    onAuthSuccess(role);
  };

  const isHost = role === 'local_host';

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center animate-fadeIn">
      {/* Top Header Controls: Back Button & Selected Role Badge */}
      <div className="w-full flex items-center justify-between mb-5">
        <button
          type="button"
          onClick={onBackToRoleSelect}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold text-white transition-all shadow-md active:scale-95"
        >
          <span className="material-symbols-outlined text-base">arrow_back</span>
          <span>{lang === 'VI' ? 'Quay lại chọn vai trò' : 'Back to role selection'}</span>
        </button>

        <div
          className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 border shadow ${
            isHost
              ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40'
              : 'bg-primary-950/80 text-primary-fixed border-primary-fixed/40'
          }`}
        >
          <span className="material-symbols-outlined text-sm">
            {isHost ? 'storefront' : 'luggage'}
          </span>
          <span>
            {isHost
              ? lang === 'VI' ? 'Vai trò: Local Host' : 'Role: Local Host'
              : lang === 'VI' ? 'Vai trò: Digital Nomad' : 'Role: Digital Nomad'}
          </span>
        </div>
      </div>

      {/* Mode Switcher: Sign Up vs Log In */}
      <div className="w-full bg-white/10 p-1.5 rounded-full border border-white/20 flex items-center mb-6 shadow-inner">
        <button
          type="button"
          onClick={() => setAuthMode('signup')}
          className={`flex-1 py-2.5 rounded-full text-xs font-bold transition-all ${
            authMode === 'signup'
              ? 'bg-primary-fixed text-on-primary-fixed shadow-md'
              : 'text-white/80 hover:text-white'
          }`}
        >
          {lang === 'VI' ? 'Đăng Ký' : 'Sign Up'}
        </button>
        <button
          type="button"
          onClick={() => setAuthMode('login')}
          className={`flex-1 py-2.5 rounded-full text-xs font-bold transition-all ${
            authMode === 'login'
              ? 'bg-primary-fixed text-on-primary-fixed shadow-md'
              : 'text-white/80 hover:text-white'
          }`}
        >
          {lang === 'VI' ? 'Đăng Nhập' : 'Log In'}
        </button>
      </div>

      {/* ===================== MODE 1: SIGNUP ===================== */}
      {authMode === 'signup' && (
        <div className="w-full space-y-4">
          
          {/* DIGITAL NOMAD SIGNUP FORM */}
          {!isHost && (
            <form
              onSubmit={handleSubmit}
              className="bg-white/5 border border-white/10 backdrop-blur-xl p-6 md:p-8 rounded-3xl space-y-4 shadow-2xl"
            >
              <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-2">
                <div className="w-11 h-11 rounded-2xl bg-primary-fixed text-on-primary-fixed flex items-center justify-center shrink-0 shadow-md">
                  <span className="material-symbols-outlined text-2xl">luggage</span>
                </div>
                <div>
                  <h2 className="font-extrabold text-lg md:text-xl text-white">
                    {lang === 'VI' ? 'Tạo tài khoản Digital Nomad' : 'Create Guest Account'}
                  </h2>
                  <p className="text-xs text-primary-fixed-dim">
                    {lang === 'VI'
                      ? 'Điền thông tin để bắt đầu trải nghiệm chỗ ở & workspace làng nghề'
                      : 'Fill in details to start booking co-living sanctuaries & craft workshops'}
                  </p>
                </div>
              </div>

              {/* Họ và tên */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-white/90">Họ và tên (Full Name)</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-white/50 text-lg">
                    person
                  </span>
                  <input
                    type="text"
                    required
                    value={nomadName}
                    onChange={(e) => setNomadName(e.target.value)}
                    placeholder="VD: Sarah Johnson"
                    className="w-full h-11 pl-10 pr-4 bg-black/20 border border-white/20 rounded-xl text-sm text-white placeholder:text-white/40 focus:border-primary-fixed outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Email & Password */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-white/90">Email</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-white/50 text-lg">
                      mail
                    </span>
                    <input
                      type="email"
                      required
                      value={nomadEmail}
                      onChange={(e) => setNomadEmail(e.target.value)}
                      placeholder="VD: sarah.j@digitalnomad.io"
                      className="w-full h-11 pl-10 pr-4 bg-black/20 border border-white/20 rounded-xl text-sm text-white placeholder:text-white/40 focus:border-primary-fixed outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-white/90">Mật khẩu (Password)</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-white/50 text-lg">
                      lock
                    </span>
                    <input
                      type={showNomadPassword ? 'text' : 'password'}
                      required
                      value={nomadPassword}
                      onChange={(e) => setNomadPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full h-11 pl-10 pr-11 bg-black/20 border border-white/20 rounded-xl text-sm text-white placeholder:text-white/40 focus:border-primary-fixed outline-none transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNomadPassword(!showNomadPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors focus:outline-none flex items-center justify-center cursor-pointer p-1"
                      aria-label={showNomadPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                    >
                      <span className="material-symbols-outlined text-lg">
                        {showNomadPassword ? 'visibility' : 'visibility_off'}
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Quốc tịch */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-white/90">Quốc tịch (Nationality)</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-white/50 text-lg">
                    public
                  </span>
                  <select
                    value={nomadNationality}
                    onChange={(e) => setNomadNationality(e.target.value)}
                    className="w-full h-11 pl-10 pr-4 bg-[#00281D] border border-white/20 rounded-xl text-sm text-white focus:border-primary-fixed outline-none transition-colors cursor-pointer"
                  >
                    <option value="Việt Nam">Việt Nam</option>
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Australia">Australia</option>
                    <option value="Germany">Germany</option>
                    <option value="Japan">Japan</option>
                    <option value="Khác">Khác...</option>
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full h-12 mt-4 bg-primary-fixed hover:bg-primary-fixed-dim text-on-primary-fixed font-bold text-sm rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 active:scale-98 cursor-pointer"
              >
                <span>Tạo Tài Khoản Nomad</span>
                <span className="material-symbols-outlined text-base">check_circle</span>
              </button>
            </form>
          )}

          {/* LOCAL HOST SIGNUP FORM */}
          {isHost && (
            <form
              onSubmit={handleSubmit}
              className="bg-white/5 border border-white/10 backdrop-blur-xl p-6 md:p-8 rounded-3xl space-y-4 shadow-2xl"
            >
              <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-2">
                <div className="w-11 h-11 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md">
                  <span className="material-symbols-outlined text-2xl">storefront</span>
                </div>
                <div>
                  <h2 className="font-extrabold text-lg md:text-xl text-white">
                    {lang === 'VI' ? 'Đăng ký Local Host' : 'Host / Artisan Registration'}
                  </h2>
                  <p className="text-xs text-primary-fixed-dim">
                    {lang === 'VI'
                      ? 'Đón tiếp du khách & chia sẻ sản phẩm văn hóa làng nghề'
                      : 'Become a host to welcome remote workers & share cultural heritage'}
                  </p>
                </div>
              </div>

              {/* Họ và tên chủ nhà */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-white/90">Họ và tên chủ nhà (Host Full Name)</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-white/50 text-lg">
                    person
                  </span>
                  <input
                    type="text"
                    required
                    value={hostName}
                    onChange={(e) => setHostName(e.target.value)}
                    placeholder="VD: Bà Mai / Ông Bình"
                    className="w-full h-11 pl-10 pr-4 bg-black/20 border border-white/20 rounded-xl text-sm text-white placeholder:text-white/40 focus:border-primary-fixed outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Tên cơ sở lưu trú / Xưởng */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-white/90">Tên cơ sở lưu trú / Xưởng (Property/Workshop Name)</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-white/50 text-lg">
                    home
                  </span>
                  <input
                    type="text"
                    required
                    value={hostProperty}
                    onChange={(e) => setHostProperty(e.target.value)}
                    placeholder="VD: Ocean Breeze Villa / Xưởng Đá Non Nước"
                    className="w-full h-11 pl-10 pr-4 bg-black/20 border border-white/20 rounded-xl text-sm text-white placeholder:text-white/40 focus:border-primary-fixed outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Thuộc Làng nghề nào */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-white/90">Thuộc Làng nghề nào? (Craft Village)</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-white/50 text-lg">
                    location_on
                  </span>
                  <select
                    value={hostVillage}
                    onChange={(e) => setHostVillage(e.target.value)}
                    className="w-full h-11 pl-10 pr-4 bg-[#00281D] border border-white/20 rounded-xl text-sm text-white focus:border-primary-fixed outline-none transition-colors cursor-pointer"
                  >
                    <option value="Làng đá mỹ nghệ Non Nước">Làng đá mỹ nghệ Non Nước</option>
                    <option value="Làng nước mắm Nam Ô">Làng nước mắm Nam Ô</option>
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
                    <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-white/50 text-lg">
                      mail
                    </span>
                    <input
                      type="email"
                      required
                      value={hostEmail}
                      onChange={(e) => setHostEmail(e.target.value)}
                      placeholder="host@nomadnest.vn"
                      className="w-full h-11 pl-10 pr-4 bg-black/20 border border-white/20 rounded-xl text-sm text-white placeholder:text-white/40 focus:border-primary-fixed outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-white/90">Mật khẩu (Password)</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-white/50 text-lg">
                      lock
                    </span>
                    <input
                      type={showHostPassword ? 'text' : 'password'}
                      required
                      value={hostPassword}
                      onChange={(e) => setHostPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full h-11 pl-10 pr-11 bg-black/20 border border-white/20 rounded-xl text-sm text-white placeholder:text-white/40 focus:border-primary-fixed outline-none transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowHostPassword(!showHostPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors focus:outline-none flex items-center justify-center cursor-pointer p-1"
                      aria-label={showHostPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                    >
                      <span className="material-symbols-outlined text-lg">
                        {showHostPassword ? 'visibility' : 'visibility_off'}
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full h-12 mt-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 active:scale-98 cursor-pointer"
              >
                <span>Trở Thành Local Host</span>
                <span className="material-symbols-outlined text-base">verified</span>
              </button>
            </form>
          )}

        </div>
      )}

      {/* ===================== MODE 2: LOGIN ===================== */}
      {authMode === 'login' && (
        <form
          onSubmit={handleSubmit}
          className="w-full bg-white/5 border border-white/10 backdrop-blur-xl p-6 md:p-8 rounded-3xl space-y-4 shadow-2xl"
        >
          <div className="text-center mb-4">
            <h2 className="text-xl md:text-2xl font-extrabold text-white mb-1">
              {isHost
                ? lang === 'VI' ? 'Đăng Nhập Local Host' : 'Host Log In'
                : lang === 'VI' ? 'Đăng Nhập Digital Nomad' : 'Guest Log In'}
            </h2>
            <p className="text-xs text-primary-fixed-dim">
              {lang === 'VI'
                ? 'Nhập email và mật khẩu để tiếp tục'
                : 'Enter your credentials to manage your account'}
            </p>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-white/90">Email</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-white/50 text-lg">
                mail
              </span>
              <input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full h-11 pl-10 pr-4 bg-black/20 border border-white/20 rounded-xl text-sm text-white placeholder:text-white/40 focus:border-primary-fixed outline-none"
                placeholder="VD: sarah.j@digitalnomad.io"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-white/90">Mật khẩu</label>
              <a href="#" className="text-[11px] text-primary-fixed hover:underline">
                Quên mật khẩu?
              </a>
            </div>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-white/50 text-lg">
                lock
              </span>
              <input
                type={showLoginPassword ? 'text' : 'password'}
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full h-11 pl-10 pr-11 bg-black/20 border border-white/20 rounded-xl text-sm text-white placeholder:text-white/40 focus:border-primary-fixed outline-none"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowLoginPassword(!showLoginPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors focus:outline-none flex items-center justify-center cursor-pointer p-1"
                aria-label={showLoginPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
              >
                <span className="material-symbols-outlined text-lg">
                  {showLoginPassword ? 'visibility' : 'visibility_off'}
                </span>
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full h-12 mt-3 bg-primary-fixed hover:bg-primary-fixed-dim text-on-primary-fixed font-bold text-sm rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 active:scale-98 cursor-pointer"
          >
            <span>
              {isHost
                ? lang === 'VI' ? 'Đăng Nhập Host' : 'Log In as Host'
                : lang === 'VI' ? 'Đăng Nhập Nomad' : 'Log In as Guest'}
            </span>
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </button>
        </form>
      )}

    </div>
  );
};
