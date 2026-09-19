import React, { useState } from 'react';
import { uploadRoomImage } from '../../lib/supabase';

interface AddRoomScreenProps {
  onBack: () => void;
  onPublishSuccess?: (newRoomData: any) => void;
}

export const AddRoomScreen: React.FC<AddRoomScreenProps> = ({
  onBack,
  onPublishSuccess
}) => {
  // Form States - Vietnamese localized for local hosts and artisans
  const [roomTitle, setRoomTitle] = useState('Phòng Studio hướng vườn với góc làm việc công thái học');
  const [villageName, setVillageName] = useState('Làng Nam Ô');
  const [description, setDescription] = useState('Căn studio khép kín yên tĩnh với bàn làm việc rộng rãi, ghế công thái học Herman Miller, Wi-Fi tốc độ cao 150Mbps và ban công riêng nhìn ra mảng xanh. Lý tưởng cho các kỳ lưu trú dài hạn của digital nomad.');
  
  // Pricing States
  const [nightlyPrice, setNightlyPrice] = useState('450,000');
  const [weeklyPrice, setWeeklyPrice] = useState('2,700,000');
  const [monthlyPrice, setMonthlyPrice] = useState('9,500,000');
  
  // Capacity & Amenities States
  const [maxGuests, setMaxGuests] = useState<number>(2);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([
    'Bàn ghế công thái học',
    'Wi-Fi tốc độ cao (100+ Mbps)',
    'Không gian yên tĩnh',
    'Gần xưởng nghề thủ công'
  ]);

  // Image Upload States
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [previewImages, setPreviewImages] = useState<string[]>([
    'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80'
  ]);

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [publishedDataJson, setPublishedDataJson] = useState<string>('');

  const sampleImages = [
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80'
  ];

  const availableAmenities = [
    { id: 'ergonomic', label: 'Bàn ghế công thái học', icon: 'desk' },
    { id: 'wifi', label: 'Wi-Fi tốc độ cao (100+ Mbps)', icon: 'wifi' },
    { id: 'quiet', label: 'Không gian yên tĩnh', icon: 'volume_off' },
    { id: 'craft', label: 'Gần xưởng nghề thủ công', icon: 'handyman' },
    { id: 'monitor', label: 'Màn hình phụ & Ổ cắm đa năng', icon: 'monitor' },
    { id: 'coffee', label: 'Trà & Cà phê địa phương miễn phí', icon: 'coffee' },
    { id: 'ac', label: 'Điều hòa không khí 2 chiều', icon: 'ac_unit' },
    { id: 'balcony', label: 'Ban công thoáng gió tự nhiên', icon: 'balcony' }
  ];

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setIsUploadingImage(true);
      const filesArray = Array.from(e.target.files);
      const uploadedUrls: string[] = [];

      for (const file of filesArray) {
        const url = await uploadRoomImage(file as File);
        uploadedUrls.push(url);
      }

      setPreviewImages(prev => [...prev, ...uploadedUrls]);
      setIsUploadingImage(false);
    }
  };

  const handleAddSampleImage = () => {
    const randomImg = sampleImages[Math.floor(Math.random() * sampleImages.length)];
    setPreviewImages(prev => [...prev, randomImg]);
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setPreviewImages(prev => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const toggleAmenity = (label: string) => {
    setSelectedAmenities(prev =>
      prev.includes(label) ? prev.filter(item => item !== label) : [...prev, label]
    );
  };

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();

    if (!roomTitle.trim()) {
      alert('Vui lòng nhập tên phòng / căn hộ.');
      return;
    }

    const newRoomData = {
      id: `room_${Date.now()}`,
      title: roomTitle,
      villageName: villageName,
      description: description,
      price: `${nightlyPrice} VNĐ/đêm`,
      nightlyPrice: nightlyPrice,
      weeklyPrice: weeklyPrice,
      monthlyPrice: monthlyPrice,
      pricing: {
        nightlyVND: nightlyPrice,
        weeklyVND: weeklyPrice,
        monthlyVND: monthlyPrice
      },
      maxGuests: maxGuests,
      amenities: selectedAmenities,
      images: previewImages,
      image: previewImages[0] || 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80',
      createdAt: new Date().toISOString(),
      status: 'published_active'
    };

    // Store in localStorage 'nomad_rooms'
    try {
      const existingRoomsStr = localStorage.getItem('nomad_rooms');
      const existingRooms = existingRoomsStr ? JSON.parse(existingRoomsStr) : [];
      const updatedRooms = [newRoomData, ...existingRooms];
      localStorage.setItem('nomad_rooms', JSON.stringify(updatedRooms));
    } catch (err) {
      console.error('Error saving room to localStorage:', err);
    }

    setPublishedDataJson(JSON.stringify(newRoomData, null, 2));
    setIsSuccessModalOpen(true);

    if (onPublishSuccess) {
      onPublishSuccess(newRoomData);
    }
  };

  const handleCloseSuccessModal = () => {
    setIsSuccessModalOpen(false);
    onBack();
  };

  return (
    <div className="bg-gradient-to-b from-[#00281D] via-[#001D15] to-[#00120D] text-white min-h-screen pb-28 font-sans">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-[#00281D]/95 backdrop-blur-xl flex items-center justify-between px-5 h-16 border-b border-white/10 shadow-lg">
        <button
          onClick={onBack}
          type="button"
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
          title="Quay lại"
          aria-label="Quay lại"
        >
          <span className="material-symbols-outlined text-xl">arrow_back</span>
        </button>
        <div className="text-center">
          <h1 className="font-extrabold text-base text-white">Đăng phòng mới</h1>
          <p className="text-[11px] text-emerald-300 font-medium">Cổng thông tin Chủ nhà • NomadNest</p>
        </div>
        <div className="w-10" />
      </header>

      {/* Main Form Container */}
      <main className="pt-20 px-4 max-w-2xl mx-auto space-y-6">
        <form onSubmit={handlePublish} className="space-y-6">

          {/* SECTION 1: IMAGE UPLOAD */}
          <div className="bg-white/5 border border-white/15 rounded-3xl p-5 backdrop-blur-xl space-y-4 shadow-xl">
            <div className="flex items-center gap-2 border-b border-white/10 pb-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center">
                <span className="material-symbols-outlined text-lg">add_a_photo</span>
              </div>
              <div>
                <h2 className="font-extrabold text-sm text-white">1. Hình ảnh không gian & Phòng ở</h2>
                <p className="text-[11px] text-emerald-200/70">Hình ảnh góc làm việc rõ nét giúp tăng 80% lượt đặt phòng từ khách Nomad</p>
              </div>
            </div>

            {/* Dropzone Area */}
            <label className="relative border-2 border-dashed border-emerald-400/40 hover:border-emerald-400 bg-emerald-950/20 hover:bg-emerald-950/40 rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all group">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isUploadingImage}
                className="hidden"
              />
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-2xl">
                  {isUploadingImage ? 'cloud_upload' : 'photo_camera'}
                </span>
              </div>
              {isUploadingImage ? (
                <p className="text-xs font-bold text-emerald-300 animate-pulse">
                  Đang tải ảnh lên Supabase Storage...
                </p>
              ) : (
                <>
                  <p className="text-xs font-bold text-white mb-1">
                    Kéo thả hoặc <span className="text-emerald-400 underline">chọn ảnh từ thiết bị</span>
                  </p>
                  <p className="text-[11px] text-emerald-100/60">
                    Hỗ trợ định dạng JPG, PNG, WEBP
                  </p>
                </>
              )}
            </label>

            {/* Quick Add Sample Image Button for testing */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleAddSampleImage}
                className="text-[11px] text-emerald-300 hover:text-white bg-white/10 px-3 py-1.5 rounded-lg border border-white/15 transition-colors cursor-pointer flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-sm">add</span>
                Thêm ảnh phòng mẫu
              </button>
            </div>

            {/* Preview Thumbnails Grid */}
            {previewImages.length > 0 && (
              <div className="space-y-2 pt-1">
                <p className="text-xs font-semibold text-white/80">Ảnh đã tải lên ({previewImages.length}):</p>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {previewImages.map((imgUrl, idx) => (
                    <div key={idx} className="relative aspect-video rounded-xl overflow-hidden border border-white/20 group shadow-md">
                      <img src={imgUrl} alt={`Xem trước ${idx}`} className="w-full h-full object-cover" />
                      {idx === 0 && (
                        <span className="absolute top-1 left-1 bg-emerald-600 text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded shadow">
                          Ảnh bìa
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(idx)}
                        className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/70 text-white flex items-center justify-center opacity-90 group-hover:opacity-100 transition-opacity hover:bg-red-600 cursor-pointer"
                        title="Xóa ảnh"
                      >
                        <span className="material-symbols-outlined text-xs">close</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* SECTION 2: ROOM DETAILS */}
          <div className="bg-white/5 border border-white/15 rounded-3xl p-5 backdrop-blur-xl space-y-4 shadow-xl">
            <div className="flex items-center gap-2 border-b border-white/10 pb-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center">
                <span className="material-symbols-outlined text-lg">edit_note</span>
              </div>
              <div>
                <h2 className="font-extrabold text-sm text-white">2. Thông tin phòng & Làng nghề</h2>
                <p className="text-[11px] text-emerald-200/70">Mô tả chi tiết không gian sống và góc làm việc</p>
              </div>
            </div>

            {/* Room Title Input */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-white">
                Tên phòng / Căn hộ <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                required
                value={roomTitle}
                onChange={(e) => setRoomTitle(e.target.value)}
                placeholder="VD: Phòng Studio hướng vườn với góc làm việc công thái học"
                className="w-full h-11 px-4 bg-black/30 border border-white/20 rounded-2xl text-xs text-white placeholder:text-white/40 focus:border-emerald-400 outline-none transition-all"
              />
            </div>

            {/* Village Selection */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-white">
                Làng nghề truyền thống lân cận
              </label>
              <select
                value={villageName}
                onChange={(e) => setVillageName(e.target.value)}
                className="w-full h-11 px-4 bg-black/30 border border-white/20 rounded-2xl text-xs text-white focus:border-emerald-400 outline-none cursor-pointer"
              >
                <option value="Làng Nam Ô" className="bg-[#00281D] text-white">Làng Nước Mắm Nam Ô (Đà Nẵng)</option>
                <option value="Làng Non Nước" className="bg-[#00281D] text-white">Làng Đá Non Nước</option>
                <option value="Làng Túy Loan" className="bg-[#00281D] text-white">Làng Bánh Tráng Túy Loan</option>
                <option value="Làng Cẩm Nê" className="bg-[#00281D] text-white">Làng Chiếu Cẩm Nê</option>
                <option value="Làng Mân Thái" className="bg-[#00281D] text-white">Làng Chài Mân Thái</option>
              </select>
            </div>

            {/* Description Textarea */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-white">
                Mô tả chi tiết không gian
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Mô tả ánh sáng, độ thoáng khí tự nhiên, độ yên tĩnh và khoảng cách đến các xưởng thủ công..."
                className="w-full p-3 bg-black/30 border border-white/20 rounded-2xl text-xs text-white placeholder:text-white/40 focus:border-emerald-400 outline-none transition-all resize-none"
              />
            </div>

            {/* Max Guests Dropdown */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-white">
                Số lượng khách tối đa
              </label>
              <select
                value={maxGuests}
                onChange={(e) => setMaxGuests(Number(e.target.value))}
                className="w-full h-11 px-4 bg-black/30 border border-white/20 rounded-2xl text-xs text-white focus:border-emerald-400 outline-none cursor-pointer"
              >
                <option value={1} className="bg-[#00281D] text-white">1 Khách (Nomad đơn)</option>
                <option value={2} className="bg-[#00281D] text-white">Tối đa 2 khách (Cặp đôi Nomad)</option>
                <option value={3} className="bg-[#00281D] text-white">Tối đa 3 khách (Nhóm nhỏ)</option>
                <option value={4} className="bg-[#00281D] text-white">4+ khách (Nhóm Coliving)</option>
              </select>
            </div>
          </div>

          {/* SECTION 3: PRICING */}
          <div className="bg-white/5 border border-white/15 rounded-3xl p-5 backdrop-blur-xl space-y-4 shadow-xl">
            <div className="flex items-center gap-2 border-b border-white/10 pb-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center">
                <span className="material-symbols-outlined text-lg">payments</span>
              </div>
              <div>
                <h2 className="font-extrabold text-sm text-white">3. Bảng giá linh hoạt cho Nomad</h2>
                <p className="text-[11px] text-emerald-200/70">Chính sách giá theo ngày, tuần và tháng</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Nightly Price */}
              <div className="bg-black/20 p-3 rounded-2xl border border-white/15">
                <label className="block text-[10px] font-bold text-emerald-300 uppercase tracking-wider mb-1">
                  GIÁ THEO ĐÊM (VNĐ/ĐÊM) <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={nightlyPrice}
                  onChange={(e) => setNightlyPrice(e.target.value)}
                  placeholder="450,000"
                  className="w-full h-10 px-3 bg-black/40 border border-white/20 rounded-xl text-xs font-bold text-white outline-none focus:border-emerald-400"
                />
              </div>

              {/* Weekly Price */}
              <div className="bg-black/20 p-3 rounded-2xl border border-white/15">
                <label className="block text-[10px] font-bold text-emerald-300 uppercase tracking-wider mb-1">
                  GIÁ THEO TUẦN (VNĐ/TUẦN)
                </label>
                <input
                  type="text"
                  value={weeklyPrice}
                  onChange={(e) => setWeeklyPrice(e.target.value)}
                  placeholder="2,700,000"
                  className="w-full h-10 px-3 bg-black/40 border border-white/20 rounded-xl text-xs font-bold text-white outline-none focus:border-emerald-400"
                />
              </div>

              {/* Monthly Price */}
              <div className="bg-black/20 p-3 rounded-2xl border border-white/15">
                <label className="block text-[10px] font-bold text-emerald-300 uppercase tracking-wider mb-1">
                  GIÁ THEO THÁNG (VNĐ/THÁNG)
                </label>
                <input
                  type="text"
                  value={monthlyPrice}
                  onChange={(e) => setMonthlyPrice(e.target.value)}
                  placeholder="9,500,000"
                  className="w-full h-10 px-3 bg-black/40 border border-white/20 rounded-xl text-xs font-bold text-white outline-none focus:border-emerald-400"
                />
              </div>
            </div>
          </div>

          {/* SECTION 4: WORK AMENITIES */}
          <div className="bg-white/5 border border-white/15 rounded-3xl p-5 backdrop-blur-xl space-y-4 shadow-xl">
            <div className="flex items-center gap-2 border-b border-white/10 pb-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center">
                <span className="material-symbols-outlined text-lg">chair</span>
              </div>
              <div>
                <h2 className="font-extrabold text-sm text-white">4. Tiện ích làm việc & Không gian Co-working</h2>
                <p className="text-[11px] text-emerald-200/70">Chọn các tiện ích hỗ trợ Digital Nomad</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {availableAmenities.map((amenity) => {
                const isSelected = selectedAmenities.includes(amenity.label);
                return (
                  <button
                    key={amenity.id}
                    type="button"
                    onClick={() => toggleAmenity(amenity.label)}
                    className={`p-3 rounded-2xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-600/30 border-emerald-400 text-white shadow-md'
                        : 'bg-black/20 border-white/15 text-white/70 hover:bg-white/10'
                    }`}
                  >
                    <span className={`material-symbols-outlined text-lg shrink-0 ${isSelected ? 'text-emerald-300' : 'text-white/50'}`}>
                      {amenity.icon}
                    </span>
                    <span className="text-xs font-medium flex-1">{amenity.label}</span>
                    <span className={`w-4 h-4 rounded-md border flex items-center justify-center text-[10px] ${
                      isSelected ? 'bg-emerald-500 border-emerald-400 text-white font-bold' : 'border-white/30'
                    }`}>
                      {isSelected ? '✓' : ''}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* SECTION 5: CALL TO ACTION BUTTON */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-white font-extrabold text-base rounded-2xl shadow-2xl flex items-center justify-center gap-2 active:scale-98 transition-all cursor-pointer border border-white/30"
            >
              <span className="material-symbols-outlined text-xl">publish</span>
              <span>Đăng phòng ngay</span>
            </button>
          </div>
        </form>
      </main>

      {/* PUBLISH SUCCESS MODAL */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#00281D] border border-white/20 rounded-3xl p-6 w-full max-w-lg text-white shadow-2xl relative">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-400/30 flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="material-symbols-outlined text-3xl">check_circle</span>
            </div>

            <h3 className="text-xl font-extrabold text-center text-white mb-1">Đăng phòng thành công!</h3>
            <p className="text-xs text-center text-emerald-200 mb-4">
              Phòng của bạn đã được đăng lên NomadNest và sẵn sàng để khách Nomad xem và đặt phòng.
            </p>

            <div className="space-y-1 mb-5">
              <label className="text-[10px] uppercase font-bold text-emerald-300 tracking-wider">
                Thông tin chi tiết:
              </label>
              <pre className="p-3 bg-black/50 border border-white/10 rounded-xl text-[11px] text-emerald-300 font-mono overflow-x-auto max-h-48 no-scrollbar">
                {publishedDataJson}
              </pre>
            </div>

            <button
              onClick={handleCloseSuccessModal}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-all cursor-pointer shadow-lg"
            >
              Quay lại Trung tâm Chủ nhà
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
