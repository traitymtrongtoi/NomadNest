export type UserRole = 'nomad_user' | 'local_host' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
  nationality?: string;
  languages?: string[];
  isVerified?: boolean;
  badge?: string;
}

export interface Village {
  id: string;
  name: string;
  category: 'Heritage' | 'Artisan' | 'Culinary' | 'Craft' | 'Local Life';
  tags: string[];
  slogan: string;
  description: string;
  image: string;
  location: string;
  distanceFromCenter: string;
  highlights: string[];
  experiences: {
    id: string;
    title: string;
    type: string;
    description: string;
    image: string;
    price: string;
  }[];
  atmosphereImages: string[];
}

export interface Property {
  id: string;
  villageId: string;
  villageName: string;
  title: string;
  hostName: string;
  hostAvatar: string;
  hostExperience: string;
  hostBio: string;
  pricePerNight: number;
  rating: number;
  reviewsCount: number;
  location: string;
  images: string[];
  tags: string[];
  description: string;
  amenities: { icon: string; name: string }[];
  wifiSpeedMbps: number;
  workspaceType: string;
  maxGuests: number;
}

export interface Booking {
  id: string;
  propertyId: string;
  propertyTitle: string;
  propertyImage: string;
  checkIn: string;
  checkOut: string;
  guestsCount: number;
  nightsCount: number;
  pricePerNight: number;
  packagePrice: number;
  serviceFee: number;
  taxes: number;
  totalPrice: number;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  guestName: string;
}

export interface EventItem {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  image: string;
}

export interface ChatMessage {
  id: string;
  sender: 'me' | 'other';
  text: string;
  timestamp: string;
}

export interface ChatConversation {
  id: string;
  partnerName: string;
  partnerAvatar: string;
  partnerLocation: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isOnline: boolean;
  messages: ChatMessage[];
}

export interface MapSpot {
  id: string;
  title: string;
  category: 'co_working' | 'cafe' | 'villa' | 'workshop' | 'food';
  locationName: string;
  rating: number;
  reviewsCount: number;
  wifiSpeed: string;
  quietLevel: string;
  image: string;
  lat: number;
  lng: number;
}

export interface CulturalPhrase {
  id: string;
  english: string;
  vietnamese: string;
  category: 'common' | 'craft' | 'slang' | 'dos_and_donts';
  pronunciation?: string;
}
