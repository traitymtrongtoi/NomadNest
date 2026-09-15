import React, { useState } from 'react';
import { saveCurrentUserToStorage, extractNameFromEmail, checkEmailAlreadyExists } from '../../utils/userStorage';

interface GuestRegistrationScreenProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export const GuestRegistrationScreen: React.FC<GuestRegistrationScreenProps> = ({
  onSuccess,
  onCancel
}) => {
  const DEFAULT_NOMAD_AVATAR = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80';

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [nationality, setNationality] = useState('Việt Nam');
  const [avatar, setAvatar] = useState(DEFAULT_NOMAD_AVATAR);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileProcess = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileProcess(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFileProcess(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    const actualEmail = email.trim();
    if (!actualEmail) return;

    setIsSubmitting(true);
    try {
      // Check if email already exists in Supabase profiles or local storage
      const alreadyRegistered = await checkEmailAlreadyExists(actualEmail);
      if (alreadyRegistered) {
        setErrorMessage('This email is already registered. Please sign in instead.');
        setIsSubmitting(false);
        return;
      }
    } catch (err) {
      console.error('Error checking email uniqueness:', err);
    }

    const actualName = fullName.trim() || extractNameFromEmail(actualEmail);
    saveCurrentUserToStorage({
      id: 'user_' + Date.now(),
      name: actualName,
      email: actualEmail,
      avatar: avatar,
      role: 'nomad_user',
      language: 'en', // Automatic language assignment for Guest
      badge: 'Premium Nomad'
    });
    setIsSubmitting(false);
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
                  placeholder="VD: Sarah Johnson"
                />
              </div>
            </div>

            {/* Avatar Upload Zone */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-white/90 flex items-center justify-between">
                <span>Ảnh đại diện (Avatar)</span>
                <span className="text-[10px] text-primary-fixed font-semibold">Tải ảnh mới</span>
              </label>
              <div className="flex items-center gap-4 bg-black/20 p-3.5 rounded-2xl border border-white/10">
                {/* Left Circular Avatar Preview */}
                <div className="relative shrink-0">
                  <img
                    src={avatar}
                    alt="Avatar Preview"
                    className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md"
                  />
                  <label className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary-fixed text-on-primary-fixed rounded-full flex items-center justify-center cursor-pointer shadow hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-xs">photo_camera</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                
                {/* Right Drag & Drop Upload Zone */}
                <label
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  className="flex-1 border-2 border-dashed border-white/20 hover:border-primary-fixed/60 bg-white/5 hover:bg-white/10 rounded-2xl p-3 flex flex-col items-center justify-center text-center cursor-pointer transition-all group"
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <span className="material-symbols-outlined text-primary-fixed text-2xl group-hover:scale-110 transition-transform mb-1">
                    cloud_upload
                  </span>
                  <span className="text-xs font-bold text-white group-hover:text-primary-fixed transition-colors">
                    Click hoặc Kéo & Thả ảnh vào đây
                  </span>
                  <span className="text-[10px] text-white/50 mt-0.5">
                    JPG, PNG, WEBP (Max 5MB)
                  </span>
                </label>
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
                    placeholder="VD: sarah.j@digitalnomad.io"
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

            {/* Quốc tịch */}
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

            {/* Clear Error Alert on UI if email already exists */}
            {errorMessage && (
              <div
                id="guest-registration-error-alert"
                role="alert"
                className="p-4 rounded-2xl bg-rose-500/20 border-2 border-rose-500/80 text-rose-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xl"
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
                      Email này đã được đăng ký. Vui lòng quay lại để đăng nhập.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onCancel}
                  className="px-3.5 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold transition-all shrink-0 cursor-pointer shadow flex items-center gap-1 active:scale-95"
                >
                  <span>Đăng nhập ngay</span>
                  <span className="material-symbols-outlined text-sm">login</span>
                </button>
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-13 bg-primary-fixed hover:bg-primary-fixed-dim text-on-primary-fixed font-bold text-sm rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 active:scale-98 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-on-primary-fixed border-t-transparent rounded-full animate-spin" />
                    <span>Đang kiểm tra tài khoản...</span>
                  </>
                ) : (
                  <>
                    <span>Tạo Tài Khoản Nomad</span>
                    <span className="material-symbols-outlined text-base">arrow_forward</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};
