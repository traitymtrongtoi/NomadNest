import React, { useState } from 'react';
import { UserRole } from '../../types';
import {
  saveCurrentUserToStorage,
  findUserByEmail,
  extractNameFromEmail,
  checkEmailAlreadyExists,
  CurrentUserProfile
} from '../../utils/userStorage';

interface AuthFormProps {
  role: UserRole;
  onBackToRoleSelect: () => void;
  onAuthSuccess: (role: UserRole) => void;
}

export const AuthForm: React.FC<AuthFormProps> = ({
  role,
  onBackToRoleSelect,
  onAuthSuccess,
}) => {
  const isHost = role === 'local_host';

  // Default Avatar Images
  const DEFAULT_NOMAD_AVATAR = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80';
  const DEFAULT_HOST_AVATAR = 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80';

  // Auth Mode State ('login' | 'signup') - Default to login for fast access
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  // Error message and loading state for duplicate checks
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ===================== GUEST (DIGITAL NOMAD) STATES =====================
  const [nomadName, setNomadName] = useState('');
  const [nomadEmail, setNomadEmail] = useState('');
  const [nomadPassword, setNomadPassword] = useState('');
  const [nomadNationality, setNomadNationality] = useState('Vietnam');
  const [nomadAvatar, setNomadAvatar] = useState(DEFAULT_NOMAD_AVATAR);
  const [guestLoginEmail, setGuestLoginEmail] = useState('');
  const [guestLoginPassword, setGuestLoginPassword] = useState('');
  const [showGuestPassword, setShowGuestPassword] = useState(false);

  // ===================== HOST (LOCAL HOST) STATES =====================
  const [hostName, setHostName] = useState('');
  const [hostProperty, setHostProperty] = useState('');
  const [hostVillage, setHostVillage] = useState('Làng nước mắm Nam Ô');
  const [hostEmail, setHostEmail] = useState('');
  const [hostPassword, setHostPassword] = useState('');
  const [hostAvatar, setHostAvatar] = useState(DEFAULT_HOST_AVATAR);
  const [hostLoginEmail, setHostLoginEmail] = useState('');
  const [hostLoginPassword, setHostLoginPassword] = useState('');
  const [showHostPassword, setShowHostPassword] = useState(false);

  // File upload and Drag & Drop handler
  const handleFileProcess = (file: File, forHost: boolean) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          if (forHost) setHostAvatar(reader.result);
          else setNomadAvatar(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, forHost: boolean) => {
    const file = e.target.files?.[0];
    if (file) handleFileProcess(file, forHost);
  };

  const handleDrop = (e: React.DragEvent, forHost: boolean) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFileProcess(file, forHost);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // ===================== GUEST SUBMIT HANDLER =====================
  const handleGuestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    let actualName = '';
    let actualEmail = '';
    let chosenAvatar = '';

    if (authMode === 'signup') {
      actualEmail = nomadEmail.trim();
      actualName = nomadName.trim() || extractNameFromEmail(actualEmail);
      chosenAvatar = nomadAvatar;

      if (!actualEmail) return;

      setIsSubmitting(true);
      try {
        // Strictly check if email is already registered before creating user
        const alreadyRegistered = await checkEmailAlreadyExists(actualEmail);
        if (alreadyRegistered) {
          setErrorMessage('This email is already registered. Please sign in instead.');
          setIsSubmitting(false);
          return;
        }
      } catch (err) {
        console.error('Email uniqueness check error:', err);
      }
    } else {
      actualEmail = guestLoginEmail.trim();
      const existingUser = findUserByEmail(actualEmail);
      if (existingUser) {
        actualName = existingUser.name;
        chosenAvatar = existingUser.avatar || DEFAULT_NOMAD_AVATAR;
      } else {
        actualName = extractNameFromEmail(actualEmail);
        chosenAvatar = DEFAULT_NOMAD_AVATAR;
      }
    }

    const newUserProfile: CurrentUserProfile = {
      id: 'user_' + Date.now(),
      name: actualName || 'Sarah Johnson',
      email: actualEmail || 'sarah.j@digitalnomad.io',
      avatar: chosenAvatar,
      role: 'nomad_user',
      language: 'en',
      badge: 'Premium Nomad'
    };

    saveCurrentUserToStorage(newUserProfile);
    setIsSubmitting(false);
    onAuthSuccess('nomad_user');
  };

  // ===================== HOST SUBMIT HANDLER =====================
  const handleHostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    let actualName = '';
    let actualEmail = '';
    let chosenAvatar = '';

    if (authMode === 'signup') {
      actualEmail = hostEmail.trim();
      actualName = hostName.trim() || extractNameFromEmail(actualEmail);
      chosenAvatar = hostAvatar;

      if (!actualEmail) return;

      setIsSubmitting(true);
      try {
        // Strictly check if email is already registered before creating user
        const alreadyRegistered = await checkEmailAlreadyExists(actualEmail);
        if (alreadyRegistered) {
          setErrorMessage('This email is already registered. Please sign in instead.');
          setIsSubmitting(false);
          return;
        }
      } catch (err) {
        console.error('Email uniqueness check error:', err);
      }
    } else {
      actualEmail = hostLoginEmail.trim();
      const existingUser = findUserByEmail(actualEmail);
      if (existingUser) {
        actualName = existingUser.name;
        chosenAvatar = existingUser.avatar || DEFAULT_HOST_AVATAR;
      } else {
        actualName = extractNameFromEmail(actualEmail);
        chosenAvatar = DEFAULT_HOST_AVATAR;
      }
    }

    const newUserProfile: CurrentUserProfile = {
      id: 'host_' + Date.now(),
      name: actualName || 'Nguyễn Văn A',
      email: actualEmail || 'nguyenvana@gmail.com',
      avatar: chosenAvatar,
      role: 'local_host',
      language: 'vi',
      badge: 'Superhost'
    };

    saveCurrentUserToStorage(newUserProfile);
    setIsSubmitting(false);
    onAuthSuccess('local_host');
  };

  // =========================================================================
  // 1. HOST AUTH FLOW (100% VIỆT HÓA)
  // =========================================================================
  if (isHost) {
    return (
      <div className="w-full max-w-xl mx-auto flex flex-col items-center animate-fadeIn font-sans">
        {/* Top Navigation & Host Badge */}
        <div className="w-full flex items-center justify-between mb-5">
          <button
            type="button"
            onClick={onBackToRoleSelect}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold text-white transition-all shadow-md active:scale-95 cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">arrow_back</span>
            <span>Quay lại chọn vai trò</span>
          </button>

          <div className="px-3.5 py-1 rounded-full text-xs font-black flex items-center gap-1.5 bg-emerald-950/90 text-emerald-300 border border-emerald-500/50 shadow">
            <span className="material-symbols-outlined text-sm text-emerald-400">storefront</span>
            <span>Vai trò: Chủ Nhà Địa Phương</span>
          </div>
        </div>

        {/* Mode Switcher: Đăng nhập vs Đăng ký */}
        <div className="w-full bg-white/10 p-1.5 rounded-2xl border border-white/20 flex items-center mb-6 shadow-inner">
          <button
            type="button"
            onClick={() => {
              setAuthMode('login');
              setErrorMessage(null);
            }}
            className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
              authMode === 'login'
                ? 'bg-gradient-to-r from-emerald-500 to-[#8bd6b6] text-[#002116] shadow-lg scale-[1.02]'
                : 'text-white/80 hover:text-white'
            }`}
          >
            Đăng nhập
          </button>
          <button
            type="button"
            onClick={() => {
              setAuthMode('signup');
              setErrorMessage(null);
            }}
            className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
              authMode === 'signup'
                ? 'bg-gradient-to-r from-emerald-500 to-[#8bd6b6] text-[#002116] shadow-lg scale-[1.02]'
                : 'text-white/80 hover:text-white'
            }`}
          >
            Đăng ký Chủ Nhà
          </button>
        </div>

        {/* HOST LOGIN FORM */}
        {authMode === 'login' ? (
          <form
            onSubmit={handleHostSubmit}
            className="w-full bg-white/5 border border-emerald-500/20 backdrop-blur-xl p-6 md:p-8 rounded-3xl space-y-4 shadow-2xl"
          >
            <div className="text-center mb-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center justify-center mx-auto mb-2.5 shadow-md">
                <span className="material-symbols-outlined text-2xl">storefront</span>
              </div>
              <h2 className="text-xl md:text-2xl font-black text-white mb-1">
                Đăng nhập Chủ Nhà
              </h2>
              <p className="text-xs text-[#8bd6b6] font-medium">
                Nhập thông tin để truy cập Kênh Chủ Nhà
              </p>
            </div>

            {/* Email Address */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-white/90">Địa chỉ Email</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-white/50 text-lg">
                  mail
                </span>
                <input
                  type="email"
                  required
                  value={hostLoginEmail}
                  onChange={(e) => setHostLoginEmail(e.target.value)}
                  className="w-full h-11 pl-10 pr-4 bg-black/30 border border-white/20 rounded-xl text-sm text-white placeholder:text-white/40 focus:border-emerald-400 outline-none transition-colors"
                  placeholder="ví dụ: nguyenvana@gmail.com"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-white/90">Mật khẩu</label>
                <button
                  type="button"
                  onClick={() => alert('Vui lòng liên hệ quản trị viên hoặc sử dụng email đã đăng ký để khôi phục mật khẩu.')}
                  className="text-[11px] text-[#8bd6b6] hover:underline cursor-pointer"
                >
                  Quên mật khẩu?
                </button>
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-white/50 text-lg">
                  lock
                </span>
                <input
                  type={showHostPassword ? 'text' : 'password'}
                  required
                  value={hostLoginPassword}
                  onChange={(e) => setHostLoginPassword(e.target.value)}
                  className="w-full h-11 pl-10 pr-11 bg-black/30 border border-white/20 rounded-xl text-sm text-white placeholder:text-white/40 focus:border-emerald-400 outline-none transition-colors"
                  placeholder="••••••••"
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

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full h-12 mt-4 bg-gradient-to-r from-emerald-500 to-[#8bd6b6] text-[#002116] font-black text-sm rounded-xl transition-all shadow-lg hover:shadow-emerald-500/20 flex items-center justify-center gap-2 active:scale-98 cursor-pointer"
            >
              <span>Vào Kênh Chủ Nhà</span>
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </button>
          </form>
        ) : (
          /* HOST SIGNUP FORM */
          <form
            onSubmit={handleHostSubmit}
            className="w-full bg-white/5 border border-emerald-500/20 backdrop-blur-xl p-6 md:p-8 rounded-3xl space-y-4 shadow-2xl"
          >
            <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-2">
              <div className="w-11 h-11 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md">
                <span className="material-symbols-outlined text-2xl">storefront</span>
              </div>
              <div>
                <h2 className="font-extrabold text-lg md:text-xl text-white">
                  Đăng ký Chủ Nhà
                </h2>
                <p className="text-xs text-[#8bd6b6] font-medium">
                  Trở thành chủ nhà để chào đón khách du mục & gìn giữ làng nghề
                </p>
              </div>
            </div>

            {/* Host Full Name */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-white/90">Họ và tên chủ nhà</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-white/50 text-lg">
                  person
                </span>
                <input
                  type="text"
                  required
                  value={hostName}
                  onChange={(e) => setHostName(e.target.value)}
                  placeholder="VD: Nguyễn Văn A / Cô Mai"
                  className="w-full h-11 pl-10 pr-4 bg-black/20 border border-white/20 rounded-xl text-sm text-white placeholder:text-white/40 focus:border-emerald-400 outline-none transition-colors"
                />
              </div>
            </div>

            {/* Host Avatar Upload Zone */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-white/90 flex items-center justify-between">
                <span>Ảnh đại diện (Avatar)</span>
                <span className="text-[10px] text-emerald-300 font-semibold">Tải ảnh mới</span>
              </label>
              <div className="flex items-center gap-4 bg-black/20 p-3.5 rounded-2xl border border-white/10">
                <div className="relative shrink-0">
                  <img
                    src={hostAvatar}
                    alt="Host Avatar Preview"
                    className="w-16 h-16 rounded-full object-cover border-2 border-emerald-400 shadow-md"
                  />
                  <label className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center cursor-pointer shadow hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-xs">photo_camera</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, true)}
                      className="hidden"
                    />
                  </label>
                </div>
                
                <label
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, true)}
                  className="flex-1 border-2 border-dashed border-white/20 hover:border-emerald-400/60 bg-white/5 hover:bg-white/10 rounded-2xl p-3 flex flex-col items-center justify-center text-center cursor-pointer transition-all group"
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, true)}
                    className="hidden"
                  />
                  <span className="material-symbols-outlined text-emerald-400 text-2xl group-hover:scale-110 transition-transform mb-1">
                    cloud_upload
                  </span>
                  <span className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">
                    Nhấn hoặc Kéo & Thả ảnh vào đây
                  </span>
                  <span className="text-[10px] text-white/50 mt-0.5">
                    JPG, PNG, WEBP (Tối đa 5MB)
                  </span>
                </label>
              </div>
            </div>

            {/* Property/Workshop Name */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-white/90">Tên Homestay / Chỗ ở / Workshop</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-white/50 text-lg">
                  home
                </span>
                <input
                  type="text"
                  required
                  value={hostProperty}
                  onChange={(e) => setHostProperty(e.target.value)}
                  placeholder="VD: Ocean Breeze Villa / Xưởng đá Non Nước"
                  className="w-full h-11 pl-10 pr-4 bg-black/20 border border-white/20 rounded-xl text-sm text-white placeholder:text-white/40 focus:border-emerald-400 outline-none transition-colors"
                />
              </div>
            </div>

            {/* Craft Village Selection */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-white/90">Khu vực làng nghề</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-white/50 text-lg">
                  location_on
                </span>
                <select
                  value={hostVillage}
                  onChange={(e) => setHostVillage(e.target.value)}
                  className="w-full h-11 pl-10 pr-4 bg-[#00281D] border border-white/20 rounded-xl text-sm text-white focus:border-emerald-400 outline-none transition-colors cursor-pointer"
                >
                  <option value="Làng nước mắm Nam Ô">Làng nước mắm Nam Ô (Liên Chiểu)</option>
                  <option value="Làng đá mỹ nghệ Non Nước">Làng đá mỹ nghệ Non Nước (Ngũ Hành Sơn)</option>
                  <option value="Làng chiếu Cẩm Nê">Làng chiếu Cẩm Nê (Hòa Vang)</option>
                  <option value="Làng bánh tráng Túy Loan">Làng bánh tráng Túy Loan (Hòa Vang)</option>
                  <option value="Làng chài Mân Thái">Làng chài Mân Thái (Sơn Trà)</option>
                  <option value="Khác">Làng nghề truyền thống khác...</option>
                </select>
              </div>
            </div>

            {/* Email & Password */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-white/90">Địa chỉ Email</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-white/50 text-lg">
                    mail
                  </span>
                  <input
                    type="email"
                    required
                    value={hostEmail}
                    onChange={(e) => setHostEmail(e.target.value)}
                    placeholder="ví dụ: nguyenvana@gmail.com"
                    className="w-full h-11 pl-10 pr-4 bg-black/20 border border-white/20 rounded-xl text-sm text-white placeholder:text-white/40 focus:border-emerald-400 outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-white/90">Mật khẩu</label>
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
                    className="w-full h-11 pl-10 pr-11 bg-black/20 border border-white/20 rounded-xl text-sm text-white placeholder:text-white/40 focus:border-emerald-400 outline-none transition-colors"
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

            {/* Clear Error Alert on UI if duplicate email is detected */}
            {errorMessage && authMode === 'signup' && (
              <div
                id="host-signup-error-alert"
                role="alert"
                className="w-full p-4 rounded-2xl bg-rose-500/20 border-2 border-rose-500/80 text-rose-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xl animate-shake"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-500/30 text-rose-300 border border-rose-500/50 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-2xl">error</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white tracking-wide">
                      {errorMessage}
                    </p>
                    <p className="text-xs text-rose-300/90 mt-0.5">
                      Email này đã được sử dụng. Nhấn nút bên cạnh để đăng nhập.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('login');
                    setHostLoginEmail(hostEmail);
                    setErrorMessage(null);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold transition-all shrink-0 cursor-pointer shadow flex items-center gap-1 active:scale-95"
                >
                  <span>Đăng nhập ngay</span>
                  <span className="material-symbols-outlined text-sm">login</span>
                </button>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 mt-4 bg-gradient-to-r from-emerald-500 to-[#8bd6b6] text-[#002116] font-black text-sm rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 active:scale-98 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-[#002116] border-t-transparent rounded-full animate-spin" />
                  <span>Đang kiểm tra tài khoản...</span>
                </>
              ) : (
                <>
                  <span>Đăng ký & Vào Kênh Chủ Nhà</span>
                  <span className="material-symbols-outlined text-base">verified</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    );
  }

  // =========================================================================
  // 2. GUEST (DIGITAL NOMAD) AUTH FLOW (ENGLISH)
  // =========================================================================
  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center animate-fadeIn font-sans">
      {/* Top Header Controls: Back Button & Selected Role Badge */}
      <div className="w-full flex items-center justify-between mb-5">
        <button
          type="button"
          onClick={onBackToRoleSelect}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold text-white transition-all shadow-md active:scale-95 cursor-pointer"
        >
          <span className="material-symbols-outlined text-base">arrow_back</span>
          <span>Back to role selection</span>
        </button>

        <div className="px-3.5 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 bg-primary-950/80 text-primary-fixed border border-primary-fixed/40 shadow">
          <span className="material-symbols-outlined text-sm">luggage</span>
          <span>Role: Digital Nomad (Guest)</span>
        </div>
      </div>

      {/* Mode Switcher: Sign Up vs Log In */}
      <div className="w-full bg-white/10 p-1.5 rounded-2xl border border-white/20 flex items-center mb-6 shadow-inner">
        <button
          type="button"
          onClick={() => {
            setAuthMode('login');
            setErrorMessage(null);
          }}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            authMode === 'login'
              ? 'bg-primary-fixed text-on-primary-fixed shadow-md font-black'
              : 'text-white/80 hover:text-white'
          }`}
        >
          Log In
        </button>
        <button
          type="button"
          onClick={() => {
            setAuthMode('signup');
            setErrorMessage(null);
          }}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            authMode === 'signup'
              ? 'bg-primary-fixed text-on-primary-fixed shadow-md font-black'
              : 'text-white/80 hover:text-white'
          }`}
        >
          Sign Up
        </button>
      </div>

      {/* GUEST LOGIN FORM */}
      {authMode === 'login' ? (
        <form
          onSubmit={handleGuestSubmit}
          className="w-full bg-white/5 border border-white/10 backdrop-blur-xl p-6 md:p-8 rounded-3xl space-y-4 shadow-2xl"
        >
          <div className="text-center mb-4">
            <div className="w-12 h-12 rounded-2xl bg-[#8bd6b6]/20 text-[#8bd6b6] border border-[#8bd6b6]/30 flex items-center justify-center mx-auto mb-2.5 shadow-md">
              <span className="material-symbols-outlined text-2xl">luggage</span>
            </div>
            <h2 className="text-xl md:text-2xl font-extrabold text-white mb-1">
              Guest Log In
            </h2>
            <p className="text-xs text-primary-fixed-dim">
              Enter your credentials to explore artisan village stays
            </p>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-white/90">Email Address</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-white/50 text-lg">
                mail
              </span>
              <input
                type="email"
                required
                value={guestLoginEmail}
                onChange={(e) => setGuestLoginEmail(e.target.value)}
                className="w-full h-11 pl-10 pr-4 bg-black/20 border border-white/20 rounded-xl text-sm text-white placeholder:text-white/40 focus:border-primary-fixed outline-none"
                placeholder="e.g. sarah.j@digitalnomad.io"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-white/90">Password</label>
              <a href="#" onClick={(e) => { e.preventDefault(); alert('Please check your email for reset instructions.'); }} className="text-[11px] text-primary-fixed hover:underline">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-white/50 text-lg">
                lock
              </span>
              <input
                type={showGuestPassword ? 'text' : 'password'}
                required
                value={guestLoginPassword}
                onChange={(e) => setGuestLoginPassword(e.target.value)}
                className="w-full h-11 pl-10 pr-11 bg-black/20 border border-white/20 rounded-xl text-sm text-white placeholder:text-white/40 focus:border-primary-fixed outline-none"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowGuestPassword(!showGuestPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors focus:outline-none flex items-center justify-center cursor-pointer p-1"
                aria-label={showGuestPassword ? "Hide password" : "Show password"}
              >
                <span className="material-symbols-outlined text-lg">
                  {showGuestPassword ? 'visibility' : 'visibility_off'}
                </span>
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full h-12 mt-3 bg-primary-fixed hover:bg-primary-fixed-dim text-on-primary-fixed font-bold text-sm rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 active:scale-98 cursor-pointer"
          >
            <span>Log In & Find Home</span>
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </button>
        </form>
      ) : (
        /* GUEST SIGNUP FORM */
        <form
          onSubmit={handleGuestSubmit}
          className="w-full bg-white/5 border border-white/10 backdrop-blur-xl p-6 md:p-8 rounded-3xl space-y-4 shadow-2xl"
        >
          <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-2">
            <div className="w-11 h-11 rounded-2xl bg-primary-fixed text-on-primary-fixed flex items-center justify-center shrink-0 shadow-md">
              <span className="material-symbols-outlined text-2xl">luggage</span>
            </div>
            <div>
              <h2 className="font-extrabold text-lg md:text-xl text-white">
                Guest Sign Up
              </h2>
              <p className="text-xs text-primary-fixed-dim">
                Fill in details to start booking co-living sanctuaries & craft workshops
              </p>
            </div>
          </div>

          {/* Full Name */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-white/90">Full Name</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-white/50 text-lg">
                person
              </span>
              <input
                type="text"
                required
                value={nomadName}
                onChange={(e) => setNomadName(e.target.value)}
                placeholder="e.g. Sarah Johnson"
                className="w-full h-11 pl-10 pr-4 bg-black/20 border border-white/20 rounded-xl text-sm text-white placeholder:text-white/40 focus:border-primary-fixed outline-none transition-colors"
              />
            </div>
          </div>

          {/* Nomad Avatar Upload Zone */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-white/90 flex items-center justify-between">
              <span>Profile Avatar</span>
              <span className="text-[10px] text-primary-fixed font-semibold">Upload new photo</span>
            </label>
            <div className="flex items-center gap-4 bg-black/20 p-3.5 rounded-2xl border border-white/10">
              <div className="relative shrink-0">
                <img
                  src={nomadAvatar}
                  alt="Avatar Preview"
                  className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md"
                />
                <label className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary-fixed text-on-primary-fixed rounded-full flex items-center justify-center cursor-pointer shadow hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-xs">photo_camera</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, false)}
                    className="hidden"
                  />
                </label>
              </div>
              
              <label
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, false)}
                className="flex-1 border-2 border-dashed border-white/20 hover:border-primary-fixed/60 bg-white/5 hover:bg-white/10 rounded-2xl p-3 flex flex-col items-center justify-center text-center cursor-pointer transition-all group"
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, false)}
                  className="hidden"
                />
                <span className="material-symbols-outlined text-primary-fixed text-2xl group-hover:scale-110 transition-transform mb-1">
                  cloud_upload
                </span>
                <span className="text-xs font-bold text-white group-hover:text-primary-fixed transition-colors">
                  Click or Drag & Drop Image
                </span>
                <span className="text-[10px] text-white/50 mt-0.5">
                  JPG, PNG, WEBP (Max 5MB)
                </span>
              </label>
            </div>
          </div>

          {/* Email & Password */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-white/90">Email Address</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-white/50 text-lg">
                  mail
                </span>
                <input
                  type="email"
                  required
                  value={nomadEmail}
                  onChange={(e) => setNomadEmail(e.target.value)}
                  placeholder="e.g. sarah.j@digitalnomad.io"
                  className="w-full h-11 pl-10 pr-4 bg-black/20 border border-white/20 rounded-xl text-sm text-white placeholder:text-white/40 focus:border-primary-fixed outline-none transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-white/90">Password</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-white/50 text-lg">
                  lock
                </span>
                <input
                  type={showGuestPassword ? 'text' : 'password'}
                  required
                  value={nomadPassword}
                  onChange={(e) => setNomadPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-11 pl-10 pr-11 bg-black/20 border border-white/20 rounded-xl text-sm text-white placeholder:text-white/40 focus:border-primary-fixed outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowGuestPassword(!showGuestPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors focus:outline-none flex items-center justify-center cursor-pointer p-1"
                  aria-label={showGuestPassword ? "Hide password" : "Show password"}
                >
                  <span className="material-symbols-outlined text-lg">
                    {showGuestPassword ? 'visibility' : 'visibility_off'}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Nationality */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-white/90">Nationality</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-white/50 text-lg">
                public
              </span>
              <select
                value={nomadNationality}
                onChange={(e) => setNomadNationality(e.target.value)}
                className="w-full h-11 pl-10 pr-4 bg-[#00281D] border border-white/20 rounded-xl text-sm text-white focus:border-primary-fixed outline-none transition-colors cursor-pointer"
              >
                <option value="United States">United States</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Australia">Australia</option>
                <option value="Germany">Germany</option>
                <option value="Japan">Japan</option>
                <option value="Vietnam">Vietnam</option>
                <option value="Other">Other...</option>
              </select>
            </div>
          </div>

          {/* Clear Error Alert on UI if duplicate email is detected */}
          {errorMessage && authMode === 'signup' && (
            <div
              id="guest-signup-error-alert"
              role="alert"
              className="w-full p-4 rounded-2xl bg-rose-500/20 border-2 border-rose-500/80 text-rose-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xl animate-shake"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-500/30 text-rose-300 border border-rose-500/50 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-2xl">error</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-white tracking-wide">
                    {errorMessage}
                  </p>
                  <p className="text-xs text-rose-300/90 mt-0.5">
                    An account with this email already exists. Click to sign in instead.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setAuthMode('login');
                  setGuestLoginEmail(nomadEmail);
                  setErrorMessage(null);
                }}
                className="px-3.5 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold transition-all shrink-0 cursor-pointer shadow flex items-center gap-1 active:scale-95"
              >
                <span>Sign in instead</span>
                <span className="material-symbols-outlined text-sm">login</span>
              </button>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 mt-4 bg-primary-fixed hover:bg-primary-fixed-dim text-on-primary-fixed font-bold text-sm rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 active:scale-98 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-on-primary-fixed border-t-transparent rounded-full animate-spin" />
                <span>Checking email availability...</span>
              </>
            ) : (
              <>
                <span>Create Guest Account & Find Home</span>
                <span className="material-symbols-outlined text-base">check_circle</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
};

