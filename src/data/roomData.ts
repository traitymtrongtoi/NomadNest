export interface RoomItem {
  id: string;
  title: string;
  villageName?: string;
  image: string;
  images?: string[];
  price: string;
  pricing?: {
    nightlyVND?: string;
    weeklyVND?: string;
    monthlyVND?: string;
  };
  description: string;
  maxGuests: number;
  amenities?: string[];
  createdAt?: string;
}

export const DEFAULT_GUEST_ROOMS: RoomItem[] = [
  {
    id: 'room_nam_o_studio_garden',
    title: 'Garden View Studio with Ergonomic Workspace',
    villageName: 'Nam O Village',
    image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80'
    ],
    price: '$35 / night',
    pricing: {
      nightlyVND: '450,000',
      weeklyVND: '2,700,000',
      monthlyVND: '9,500,000'
    },
    description: 'Quiet en-suite studio featuring a spacious workstation, Herman Miller ergonomic chair, 150Mbps high-speed Wi-Fi, and a private balcony overlooking lush greenery. Ideal for long-term digital nomad stays.',
    maxGuests: 2,
    amenities: [
      'Ergonomic Workstation',
      'High-speed Wi-Fi (100+ Mbps)',
      'Quiet Workspace',
      'Near Craft Workshops'
    ],
    createdAt: new Date().toISOString()
  },
  {
    id: 'room_nam_o_ocean_loft',
    title: 'Ocean Breeze Heritage Loft & Dual Workstation',
    villageName: 'Nam O Village',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80'
    ],
    price: '$45 / night',
    pricing: {
      nightlyVND: '650,000',
      weeklyVND: '3,900,000',
      monthlyVND: '12,500,000'
    },
    description: 'Bright coastal loft situated right next to the historic fishing docks. Features twin ergonomic desks, 200Mbps fiber internet, ocean breeze balcony, and dedicated silent focus areas.',
    maxGuests: 2,
    amenities: [
      'Ergonomic Workstation',
      'High-speed Wi-Fi (100+ Mbps)',
      'Quiet Workspace',
      'Sea View Balcony'
    ],
    createdAt: new Date().toISOString()
  }
];

// Helper to sanitize / translate room data dynamically to English for guest view
export function sanitizeRoomForGuest(rawRoom: any): RoomItem {
  if (!rawRoom) return DEFAULT_GUEST_ROOMS[0];

  let title = rawRoom.title || 'Studio with Workspace';
  let description = rawRoom.description || '';
  let villageName = rawRoom.villageName || 'Nam O Village';
  let amenities: string[] = Array.isArray(rawRoom.amenities) ? [...rawRoom.amenities] : [];

  // Translate known Vietnamese title
  if (title.includes('Studio View Vườn') || title.includes('Bàn Làm Việc Công Thái Học')) {
    title = 'Garden View Studio with Ergonomic Workspace';
  } else if (title.includes('Làng Nam Ô') || title.includes('Nam Ô')) {
    title = title.replace(/Làng Nam Ô|Làng nước mắm Nam Ô/g, 'Nam O Village');
  }

  // Translate known Vietnamese description
  if (
    description.includes('Phòng yên tĩnh khép kín') ||
    description.includes('Herman Miller') ||
    description.includes('Digital Nomad')
  ) {
    description = 'Quiet en-suite studio featuring a spacious workstation, Herman Miller ergonomic chair, 150Mbps high-speed Wi-Fi, and a private balcony overlooking lush greenery. Ideal for long-term digital nomad stays.';
  }

  // Translate village badge
  if (
    villageName.includes('Làng nước mắm Nam Ô') ||
    villageName.includes('Nam Ô') ||
    villageName.includes('Nam O')
  ) {
    villageName = 'Nam O Village';
  } else if (villageName.includes('Tuy Loan') || villageName.includes('Tuý Loan')) {
    villageName = 'Tuy Loan Village';
  } else if (villageName.includes('Non Nuoc') || villageName.includes('Non Nước')) {
    villageName = 'Non Nuoc Village';
  } else if (villageName.includes('Cam Ne') || villageName.includes('Cẩm Nê')) {
    villageName = 'Cam Ne Village';
  } else if (villageName.includes('Man Thai') || villageName.includes('Mân Thái')) {
    villageName = 'Man Thai Village';
  }

  // Translate amenities to English
  const amenityMap: Record<string, string> = {
    'Bàn làm việc công thái học': 'Ergonomic Workstation',
    'Wi-Fi tốc độ cao (100+ Mbps)': 'High-speed Wi-Fi (100+ Mbps)',
    'Không gian yên tĩnh': 'Quiet Workspace',
    'Gần xưởng thủ công': 'Near Craft Workshops',
    'Màn hình phụ & Ổ cắm điện đa năng': 'External Monitor & Universal Plug',
    'Trà & Cà phê miễn phí': 'Complimentary Artisanal Tea & Coffee',
    'Điều hòa 2 chiều': 'Dual-mode AC Climate Control',
    'Ban công view thoáng mát': 'Fresh Air Balcony',
    'Bếp chung tiện nghi': 'Fully-equipped Shared Kitchen',
    'Máy giặt & Sân phơi': 'Laundry Washer & Drying Yard'
  };

  amenities = amenities.map(am => amenityMap[am] || am);

  // Default amenities if none
  if (amenities.length === 0) {
    amenities = [
      'Ergonomic Workstation',
      'High-speed Wi-Fi (100+ Mbps)',
      'Quiet Workspace',
      'Near Craft Workshops'
    ];
  }

  // Price formatting for English view
  let price = rawRoom.price || '$35 / night';
  if (price.includes('VNĐ') || price.includes('VND') || price.includes('đêm')) {
    if (price.includes('450.000') || price.includes('450,000')) {
      price = '$20 / night (450,000 VND)';
    } else if (price.includes('650.000') || price.includes('650,000')) {
      price = '$28 / night (650,000 VND)';
    } else if (price.includes('850.000') || price.includes('850,000')) {
      price = '$35 / night (850,000 VND)';
    }
  }

  return {
    ...rawRoom,
    title,
    description,
    villageName,
    amenities,
    price,
    maxGuests: rawRoom.maxGuests || 2
  };
}
