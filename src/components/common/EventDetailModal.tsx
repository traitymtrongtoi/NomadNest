import React, { useState } from 'react';
import { EventItem } from '../../types';

interface EventDetailModalProps {
  event: EventItem | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenMap?: () => void;
}

export const EventDetailModal: React.FC<EventDetailModalProps> = ({
  event,
  isOpen,
  onClose,
  onOpenMap
}) => {
  const [isRegistered, setIsRegistered] = useState(false);

  if (!isOpen || !event) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#002116] border border-white/20 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl text-white relative flex flex-col max-h-[90vh]">
        {/* Banner Image */}
        <div className="relative h-56 sm:h-64 w-full shrink-0">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#002116] via-[#002116]/40 to-transparent" />

          {/* Close Button */}
          <button
            onClick={onClose}
            type="button"
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md border border-white/30 transition-all active:scale-95 cursor-pointer z-10"
            title="Đóng"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>

          {/* Event Badge */}
          <div className="absolute bottom-4 left-6 right-6">
            <span className="bg-[#8bd6b6] text-[#002116] text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full inline-block mb-2 shadow">
              Sự Kiện Nổi Bật Đà Nẵng
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              {event.title}
            </h2>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-sm">
          {/* Date & Location Pill Bar */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/10 rounded-2xl p-3 border border-white/10 flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#8bd6b6]/20 text-[#8bd6b6] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-xl">calendar_month</span>
              </div>
              <div>
                <span className="text-[10px] text-white/60 font-semibold block uppercase">Thời gian</span>
                <span className="text-xs font-bold text-white">{event.date}</span>
              </div>
            </div>

            <div className="bg-white/10 rounded-2xl p-3 border border-white/10 flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#8bd6b6]/20 text-[#8bd6b6] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-xl">location_on</span>
              </div>
              <div>
                <span className="text-[10px] text-white/60 font-semibold block uppercase">Địa điểm</span>
                <span className="text-xs font-bold text-white truncate block">{event.location}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#8bd6b6] mb-1.5">Mô tả sự kiện</h4>
            <p className="text-white/80 leading-relaxed text-sm">
              {event.description}
            </p>
          </div>

          {/* Highlights */}
          <div className="bg-white/5 rounded-2xl p-4 border border-white/10 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Điểm đặc sắc:</h4>
            <ul className="text-xs text-white/80 space-y-1.5">
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sm text-[#8bd6b6]">check_circle</span>
                <span>Miễn phí vé vào cửa cho NomadNest members</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sm text-[#8bd6b6]">check_circle</span>
                <span>Giao lưu nghệ nhân & trải nghiệm văn hóa bản địa</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sm text-[#8bd6b6]">check_circle</span>
                <span>Có khu vực Wi-Fi tốc độ cao & góc làm việc ngoài trời</span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => {
                setIsRegistered(!isRegistered);
                if (!isRegistered) {
                  alert(`Đăng ký thành công tham gia sự kiện: ${event.title}!`);
                }
              }}
              type="button"
              className={`flex-1 py-3.5 px-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95 cursor-pointer ${
                isRegistered
                  ? 'bg-emerald-600 text-white border border-emerald-400'
                  : 'bg-[#8bd6b6] hover:bg-[#72c2a0] text-[#002116]'
              }`}
            >
              <span className="material-symbols-outlined text-lg">
                {isRegistered ? 'task_alt' : 'event_available'}
              </span>
              <span>{isRegistered ? 'Đã đăng ký tham gia' : 'Đăng ký tham gia ngay'}</span>
            </button>

            {onOpenMap && (
              <button
                onClick={() => {
                  onClose();
                  onOpenMap();
                }}
                type="button"
                className="py-3.5 px-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg text-[#8bd6b6]">map</span>
                <span>Xem trên bản đồ</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
