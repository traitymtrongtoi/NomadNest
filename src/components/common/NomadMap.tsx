import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// =========================================================================
// 1. FIX LỖI ICON MARKER BỊ TÀNG HÌNH TRONG REACT / VITE / WEBPACK
// Leaflet mặc định tìm asset ảnh tương đối, trong bundler React sẽ bị lỗi 404
// =========================================================================
delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Kiểu dữ liệu cho điểm ghim tùy chọn trên bản đồ
export interface MapMarkerItem {
  id?: string | number;
  position: [number, number];
  title?: string;
  description?: string;
}

export interface NomadMapProps {
  /** Tọa độ trung tâm bản đồ [vĩ độ, kinh độ] - Mặc định là Đà Nẵng: [16.0544, 108.2022] */
  center?: [number, number];
  /** Độ phóng to bản đồ (mặc định 13) */
  zoom?: number;
  /** Chiều cao container bản đồ (mặc định '300px') */
  height?: string | number;
  /** Chiều rộng container bản đồ (mặc định '100%') */
  width?: string | number;
  /** Bán kính bo góc (mặc định '12px') */
  borderRadius?: string | number;
  /** Danh sách các điểm ghim tùy chọn trên bản đồ */
  markers?: MapMarkerItem[];
  /** Tùy chọn class Tailwind thêm vào wrapper bên ngoài */
  className?: string;
}

/**
 * Component Bản Đồ NomadMap sử dụng OpenStreetMap & Leaflet hoàn toàn miễn phí
 */
export const NomadMap: React.FC<NomadMapProps> = ({
  center = [16.0544, 108.2022], // Mặc định tọa độ trung tâm: Đà Nẵng
  zoom = 13,
  height = '300px',
  width = '100%',
  borderRadius = '12px',
  markers = [
    {
      id: 'da-nang-center',
      position: [16.0544, 108.2022],
      title: 'Đà Nẵng City',
      description: 'Trung tâm thành phố Đà Nẵng - Thành phố đáng sống',
    },
    {
      id: 'nam-o-village',
      position: [16.1264, 108.1328],
      title: 'Làng Nước Mắm Nam Ô',
      description: 'Di sản văn hóa phi vật thể quốc gia & Homestay ven biển',
    },
    {
      id: 'non-nuoc-village',
      position: [16.0028, 108.2619],
      title: 'Làng Đá Mỹ Nghệ Non Nước',
      description: 'Dưới chân danh thắng Ngũ Hành Sơn',
    },
  ],
  className = '',
}) => {
  return (
    /*
      BẮT BUỘC: Thẻ bao ngoài (Wrapper div) phải có kích thước cố định (width, height)
      và overflow: 'hidden' kết hợp position: 'relative' và z-index để không bị lỗi mảng trắng
    */
    <div
      className={`relative shadow-lg border border-white/15 overflow-hidden z-0 ${className}`}
      style={{
        width,
        height,
        borderRadius,
      }}
    >
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
        style={{ width: '100%', height: '100%' }}
      >
        {/* Lớp bản đồ miễn phí từ OpenStreetMap */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Render danh sách các Marker & Popup */}
        {markers.map((marker, index) => (
          <Marker key={marker.id || index} position={marker.position}>
            {(marker.title || marker.description) && (
              <Popup>
                <div className="p-1 font-sans text-gray-800">
                  {marker.title && (
                    <h4 className="font-bold text-sm text-gray-900 mb-0.5">
                      {marker.title}
                    </h4>
                  )}
                  {marker.description && (
                    <p className="text-xs text-gray-600 leading-tight">
                      {marker.description}
                    </p>
                  )}
                </div>
              </Popup>
            )}
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default NomadMap;
