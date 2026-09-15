import { Village, Property, EventItem, ChatConversation, MapSpot, CulturalPhrase, User } from '../types';

export const MOCK_USERS: Record<string, User> = {
  nomad_user: {
    id: 'user_sarah',
    name: 'Sarah Johnson',
    email: 'sarah.j@digitalnomad.io',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    role: 'nomad_user',
    nationality: 'United States',
    languages: ['English', 'Spanish'],
    isVerified: true,
    badge: 'Premium Nomad'
  },
  local_host: {
    id: 'host_mrs_mai',
    name: 'Mrs. Mai',
    email: 'mai.oceanbreeze@nomadnest.vn',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    role: 'local_host',
    nationality: 'Vietnam',
    languages: ['Vietnamese', 'English'],
    isVerified: true,
    badge: 'Superhost'
  },
  admin: {
    id: 'admin_sys',
    name: 'System Administrator',
    email: 'admin@nomadnest.vn',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    role: 'admin',
    nationality: 'Vietnam',
    languages: ['Vietnamese', 'English'],
    isVerified: true,
    badge: 'Master Admin'
  }
};

export const MOCK_VILLAGES: Village[] = [
  {
    id: 'nam_o',
    name: 'Nam O Fish Sauce Village',
    category: 'Heritage',
    tags: ['Traditional Craft Village', 'Wooden Fermentation Vats', 'Anchovy Fermentation'],
    slogan: 'Where the ocean turns into 400-year heritage flavors.',
    description: 'Experience rustic living alongside 400-year-old wooden fermentation vats producing pure traditional anchovy fish sauce. Tucked away along the Lien Chieu coast, local artisans preserve time-honored secrets under golden sunlight.',
    image: 'https://danangbest.com/uploads/news/news-editor-20260626-115438-48ec3abb.jpg',
    imageUrl: 'https://danangbest.com/uploads/news/news-editor-20260626-115438-48ec3abb.jpg',
    location: 'Lien Chieu District, Da Nang',
    distanceFromCenter: '15km from city center',
    highlights: ['400-year-old Heritage', 'Wooden Vat Fish Sauce Craft', 'Famous Nam O Raw Fish Salad'],
    experiences: [
      {
        id: 'exp_1',
        title: 'Traditional Fish Sauce Fermentation Workshop',
        type: 'Hands-on Craft',
        description: 'Tour wooden vat houses, interact with master artisans, and taste premium first-press pure fish sauce drops.',
        image: 'https://danangfantasticity.com/wp-content/uploads/2025/05/nghe-lam-nuoc-mam-nam-o-da-nang-02.jpg',
        price: 'Free Tour'
      },
      {
        id: 'exp_2',
        title: 'Ancient Nam O Fishing Village Walking Tour',
        type: 'Cultural Tour',
        description: 'Explore ancient village alleyways, coastal net-drying spots, and visit the historic Nam O Whales Shrine.',
        image: 'https://statics.vinpearl.com/lang-nghe-nuoc-mam-nam-o--_1628760585.jpg',
        price: '150,000 VND'
      }
    ],
    atmosphereImages: [
      'https://bqn.1cdn.vn/2024/02/28/baodanang.vn-dataimages-202402-original-_images1729055_1.gif',
      'https://thanhnien.mediacdn.vn/Uploaded/minhnguyet/2022_09_14/nam-o1-406.jpg',
      'https://vannghedanang.org.vn/app/upload/post/2019-11-15/20191115071807_download.jpg',
      'https://thanhnien.mediacdn.vn/Uploaded/minhnguyet/2022_09_14/nam-o-578.jpg'
    ]
  },
  {
    id: 'tuy_loan',
    name: 'Tuy Loan Rice Paper Village',
    category: 'Culinary',
    tags: ['Bamboo Drying Trays', 'Wood-fired Clay Stoves', '500-Year Ancient Village'],
    slogan: 'Aromatic fresh rice flour on bamboo trays drying under morning sun.',
    description: 'Immerse yourself in authentic rustic living next to 500-year-old wood-fired rice paper stoves. Long bamboo trays filled with paper-thin rice sheets dry under bright sun rays and warm wood fires.',
    image: 'https://statics.vinpearl.com/lang-banh-trang-tuy-loan-3_1632484988.jpg',
    imageUrl: 'https://statics.vinpearl.com/lang-banh-trang-tuy-loan-3_1632484988.jpg',
    location: 'Hoa Phong Commune, Hoa Vang, Da Nang',
    distanceFromCenter: '14km from city center',
    highlights: ['Sun-dried Rice Paper Trays', '500-Year Wood-fired Stoves', 'Historic Tuy Loan Village Temple'],
    experiences: [
      {
        id: 'exp_tuy_1',
        title: 'Hand-make & Sun-dry Fresh Rice Paper',
        type: 'Culinary Workshop',
        description: 'Learn to ladle rice batter, spread it paper-thin over cloth stoves, and carry bamboo trays out to sun-dry.',
        image: 'https://tourbanahills.vn/wp-content/uploads/2023/01/lang-banh-trang-tuy-loan7.jpg.jpg',
        price: '100,000 VND'
      },
      {
        id: 'exp_tuy_2',
        title: 'Traditional Tuy Loan Rice Paper Craft Tour',
        type: 'Village Tour',
        description: 'Visit century-old craft families, learn the secret of sesame & ginger rice batter, and savor freshly roasted rice crackers.',
        image: 'https://danangbest.com/upload_content/banh-trang-tuy-loan-4.webp',
        price: '150,000 VND'
      }
    ],
    atmosphereImages: [
      'https://danangfantasticity.com/wp-content/uploads/2024/02/tu-hao-lang-nghe-banh-trang-tuy-loan-1.jpg',
      'https://statics.vinpearl.com/lang-banh-trang-tuy-loan-05_1632496264.jpg',
      'https://media-cdn-v2.laodong.vn/storage/newsportal/2024/12/28/1442239/Banh-Trang-Tuy-Loan..jpg',
      'https://statics.vinpearl.com/lang-banh-trang-tuy-loan-00_1632497035.jpg'
    ]
  },
  {
    id: 'non_nuoc',
    name: 'Non Nuoc Stone Carving Village',
    category: 'Artisan',
    tags: ['Marble Sculptures', 'Marble Mountains Foot', 'Exquisite Stone Statues'],
    slogan: 'Where raw marble blocks speak the language of fine art.',
    description: 'Reside in an artistic haven at the foot of the Marble Mountains. Skilled Non Nuoc stone carvers meticulously sculpt exquisite marble artworks with centuries-old craftsmanship.',
    image: 'https://statics.vinpearl.com/lang-da-my-nghe-non-nuoc-01_1636966781.jpg',
    imageUrl: 'https://statics.vinpearl.com/lang-da-my-nghe-non-nuoc-01_1636966781.jpg',
    location: 'Ngu Hanh Son District, Da Nang',
    distanceFromCenter: '10km from city center',
    highlights: ['Marble Mountains Scenic Area', 'Handcrafted Marble Sculptures', 'Quiet & Creative Atmosphere'],
    experiences: [
      {
        id: 'exp_non_1',
        title: 'Stone Carving Practice with Master Artisan',
        type: 'Craft Class',
        description: 'Observe master sculptors carving intricate details and chisel your own small stone souvenir to take home.',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTZZJvv7hUOpidFBSQYWeJ8aNRpAHc8KYssr-0wINqnHEJ0PxfFopokI0&s=10',
        price: '200,000 VND'
      },
      {
        id: 'exp_non_2',
        title: 'Marble Sculpting & Craft Village Tour',
        type: 'Artisan Tour',
        description: 'Explore centuries-old sculpture workshops at the foot of Marble Mountains and learn precision chisel techniques from master artisans.',
        image: 'https://danangbest.com/upload_content/lang-da-non-nuoc-ngu-hanh-son-6.webp',
        price: '250,000 VND'
      }
    ],
    atmosphereImages: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT10AJ-HbBFQABt3Rr-QNGwvffRrBWlQg0b7LHOS52iYHNXaIcFwFN94kyr&s=10',
      'https://www.danang.gov.vn/documents/37638/981989/lang+da-2.jpg/d1285c75-d43b-6d45-e8b0-8e7c50c0d2c7?t=1743578562210',
      'https://www.danangxanh.com/data/images/lang-da-1.jpg',
      'https://mia.vn/media/uploads/blog-du-lich/lang-da-my-nghe-non-nuoc-07-1700399102.jpg'
    ]
  },
  {
    id: 'cam_ne',
    name: 'Cam Ne Sedge Mat Village',
    category: 'Craft',
    tags: ['Colorful Sedge Fiber', 'Wooden Weaving Looms', 'Royal Tribute Mats'],
    slogan: 'Vibrant sedge fibers woven with warm countryside heritage.',
    description: 'Enjoy peaceful sanctuary in a village renowned for weaving royal tribute sedge mats for Nguyen Dynasty kings. Bright red, green, and yellow dyed sedge fibers dry along peaceful village pathways.',
    image: 'https://mia.vn/media/uploads/blog-du-lich/lang-cam-ne-1-1761062285.jpg',
    imageUrl: 'https://mia.vn/media/uploads/blog-du-lich/lang-cam-ne-1-1761062285.jpg',
    location: 'Hoa Tien Commune, Hoa Vang, Da Nang',
    distanceFromCenter: '12km from city center',
    highlights: ['Vibrant Sun-dyed Sedge Strands', 'Traditional Handloom Weaving', 'Serene Eco Homestays'],
    experiences: [
      {
        id: 'exp_cam_1',
        title: 'Cam Ne Floral Sedge Mat Weaving Class',
        type: 'Hand Weaving',
        description: 'Try operating the wooden loom shutter and threading colorful sedge strands into famous floral patterns.',
        image: 'https://statics.vinpearl.com/lang-chieu-cam-ne-02_1634712501.jpg',
        price: '120,000 VND'
      },
      {
        id: 'exp_cam_2',
        title: 'Traditional Sedge Dyeing & Village Discovery Tour',
        type: 'Village Craft Tour',
        description: 'Learn the natural boiling dye process for vibrant sedge fibers and discover royal tribute mat weaving traditions.',
        image: 'https://danangbest.com/upload_content/lang-chieu-cam-le-5.webp',
        price: '150,000 VND'
      }
    ],
    atmosphereImages: [
      'https://media-cdn-v2.laodong.vn/storage/newsportal/2018/9/28/633240/1.jpg?w=800&crop=auto&scale=both',
      'https://mia.vn/media/uploads/blog-du-lich/lang-cam-ne-3-1761062289.jpg',
      'https://www.vietnambooking.com/wp-content/uploads/2026/04/lang-chieu-cam-ne-3.jpg',
      'https://i.ytimg.com/vi/CddR4s9kpOw/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAzcslsj9QhaLvkI9moEHErdbaJfQ'
    ]
  },
  {
    id: 'man_thai',
    name: 'Man Thai Fishing Village',
    category: 'Local Life',
    tags: ['Round Coracle Boats', 'Son Tra Beachfront', 'Fresh Seafood Market'],
    slogan: 'Immerse yourself in the vibrant rhythm of the ocean.',
    description: 'Watch hundreds of round bamboo coracle boats row out into early morning sunrise under Son Tra peninsula. Fresh catches arrive directly at shore for beachside seafood lovers.',
    image: 'https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2021/10/1/959183/Langchai2-01.jpg',
    imageUrl: 'https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2021/10/1/959183/Langchai2-01.jpg',
    location: 'Son Tra District, Da Nang',
    distanceFromCenter: '5km from city center',
    highlights: ['Man Thai Beach Coracle Boats', 'Dawn Fish Market', 'Beachside Remote Work'],
    experiences: [
      {
        id: 'exp_man_1',
        title: 'Coracle Rowing & Early Morning Fish Market',
        type: 'Fisherman Experience',
        description: 'Learn to paddle a round basket boat near shore and join local fishermen receiving the morning catch.',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvYIrpTDO7dTu6wXl9b9H_z8Q_XoEIfwmrjvmwBRmPugj-E5SEeCvwCRzu&s=10',
        price: '180,000 VND'
      },
      {
        id: 'exp_man_2',
        title: 'Dawn Coastal Net Casting & Fresh Seafood Feast',
        type: 'Coastal Culture Tour',
        description: 'Experience pulling traditional beach seine nets at daybreak and savoring fresh grilled catches right on the sands.',
        image: 'https://myhanhseafood.vn/wp-content/uploads/2025/08/Artboard-2-copy-3-1-1-scaled.jpg',
        price: '220,000 VND'
      }
    ],
    atmosphereImages: [
      'https://i.ex-cdn.com/vntravellive.com/files/thaotpt/2025/06/12/0331-nhip-song-man-moi-cua-cho-ca-man-thai-len-loi-giua-long-da-nang-170258.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJYn5X8TBA26BxnYvRGfx0xE1enOlbZVFe-SeXbRtdstoPbItNd8pJaC61&s=10',
      'https://bqn.1cdn.vn/2021/12/25/baodanang.vn-dataimages-202112-original-_images1635545_02__8_.jpg',
      'https://cdnphoto.dantri.com.vn/I5kyvpBfhz9hllLN5QjxI5KXh20=/thumb_w/1920/2023/09/24/h6-1695517819546.jpg'
    ]
  }
];

export const MOCK_PROPERTIES: Property[] = [
  {
    id: 'prop_ocean_breeze',
    villageId: 'nam_o',
    villageName: 'Nam O Fish Sauce Village',
    title: 'Ocean Breeze Villa - Nam Ô Heritage',
    hostName: 'Mrs. Mai',
    hostAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    hostExperience: 'Superhost • 5 Years Hosting Nomads',
    hostBio: '"Hello! Born and raised in ancient Nam O village, I am thrilled to welcome you to rest, work remotely, and experience authentic 400-year coastal fish sauce heritage."',
    pricePerNight: 55,
    rating: 4.9,
    reviewsCount: 128,
    location: 'Nam O Village, Lien Chieu, Da Nang',
    images: [
      'https://danangbest.com/uploads/news/news-editor-20260626-115438-48ec3abb.jpg',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1516541196182-6bdb0516ed27?auto=format&fit=crop&w=1000&q=80'
    ],
    tags: ['Wi-Fi 150 Mbps', 'Fish Sauce Vat Tour', 'Near Nam O Beach', 'Ergonomic Desk'],
    description: 'Experience authentic living beside a 400-year-old traditional wooden fish sauce vat house. Sunlit villa equipped with ergonomic desk setups, high-speed Wi-Fi, and a breezy sea balcony.',
    amenities: [
      { icon: 'wifi', name: 'Fiber Wi-Fi (150 Mbps)' },
      { icon: 'ac_unit', name: 'Climate Control AC' },
      { icon: 'bathtub', name: 'Private En-suite Bathroom' },
      { icon: 'desk', name: 'Ergonomic Workstation & Chair' },
      { icon: 'coffee_maker', name: 'Artisanal Coffee Brewer' },
      { icon: 'local_laundry_service', name: 'Washer & Dryer' }
    ],
    wifiSpeedMbps: 150,
    workspaceType: 'Private Ergonomic Workstation',
    maxGuests: 2
  },
  {
    id: 'prop_tuy_loan_cottage',
    villageId: 'tuy_loan',
    villageName: 'Tuy Loan Rice Paper Village',
    title: 'Ancient Rice Paper Heritage Cottage',
    hostName: 'Uncle Hai',
    hostAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    hostExperience: 'Master Artisan • 6 Years Hosting',
    hostBio: 'Five generations of my family have made wood-fired rice paper. Welcome digital nomads to enjoy our peaceful 500-year-old culinary village.',
    pricePerNight: 42,
    rating: 4.95,
    reviewsCount: 86,
    location: 'Tuy Loan Village, Hoa Vang, Da Nang',
    images: [
      'https://statics.vinpearl.com/lang-banh-trang-tuy-loan-3_1632484988.jpg',
      'https://images.unsplash.com/photo-1509315811355-57bd3b7776b6?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1000&q=80'
    ],
    tags: ['500-Yr Stove Heritage', 'Bamboo Drying Courtyard', 'Wi-Fi 120 Mbps', 'Peaceful Garden'],
    description: 'Rustic garden cottage adjacent to a 500-year-old traditional rice paper stove. Enjoy fragrant toasted rice crackers, lotus tea, and quiet garden workspaces.',
    amenities: [
      { icon: 'wifi', name: 'Wi-Fi 120 Mbps' },
      { icon: 'desk', name: 'Garden View Work Corner' },
      { icon: 'coffee_maker', name: 'Free Lotus Tea & Roasted Rice Crackers' }
    ],
    wifiSpeedMbps: 120,
    workspaceType: 'Garden View Workspace',
    maxGuests: 3
  },
  {
    id: 'prop_marble_sanctuary',
    villageId: 'non_nuoc',
    villageName: 'Non Nuoc Stone Carving Village',
    title: 'Marble Mountain Art Loft - Non Nước',
    hostName: 'Mr. Binh',
    hostAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    hostExperience: 'Master Sculptor • 8 Years Hosting',
    hostBio: 'Passionate about marble art and crafting serene living studios for digital creators and engineers.',
    pricePerNight: 48,
    rating: 4.88,
    reviewsCount: 104,
    location: 'Non Nuoc Village, Ngu Hanh Son, Da Nang',
    images: [
      'https://statics.vinpearl.com/lang-da-my-nghe-non-nuoc-01_1636966781.jpg',
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1569172122301-bc5008bc09c5?auto=format&fit=crop&w=1000&q=80'
    ],
    tags: ['Marble Artworks', 'Marble Mountain Foot', 'Fiber 200 Mbps'],
    description: 'Luxurious studio adorned with hand-carved marble sculptures at the base of Marble Mountain. Features dual-monitor setups ideal for software developers and remote creators.',
    amenities: [
      { icon: 'wifi', name: 'Fiber Wi-Fi 200 Mbps' },
      { icon: 'desk', name: 'Dual Monitor Workstation' },
      { icon: 'ac_unit', name: 'Air Conditioning' }
    ],
    wifiSpeedMbps: 200,
    workspaceType: 'Dual-Monitor Studio Workstation',
    maxGuests: 3
  },
  {
    id: 'prop_cam_ne_homestay',
    villageId: 'cam_ne',
    villageName: 'Cam Ne Sedge Mat Village',
    title: 'Sedge Loom Garden Homestay - Cẩm Nê',
    hostName: 'Grandma Tam',
    hostAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    hostExperience: 'Master Weaver • 4 Years Hosting',
    hostBio: 'Welcome young creators to Cam Ne village to relax, work remotely, and discover royal sedge mat weaving heritage.',
    pricePerNight: 38,
    rating: 4.9,
    reviewsCount: 62,
    location: 'Cam Ne Village, Hoa Vang, Da Nang',
    images: [
      'https://mia.vn/media/uploads/blog-du-lich/lang-cam-ne-1-1761062285.jpg',
      'https://images.unsplash.com/photo-1528458909336-e7a0adfac1d5?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?auto=format&fit=crop&w=1000&q=80'
    ],
    tags: ['Colorful Sedge Fiber', 'Wooden Handloom', 'Eco Quietness'],
    description: 'Rustic eco-homestay surrounded by colorful sun-dyed sedge strands drying along verandas. Sleep peacefully on handwoven floral sedge mats.',
    amenities: [
      { icon: 'wifi', name: 'Wi-Fi 100 Mbps' },
      { icon: 'desk', name: 'Natural Solid Wood Desk' }
    ],
    wifiSpeedMbps: 100,
    workspaceType: 'Solid Wood Desk beside Loom',
    maxGuests: 2
  },
  {
    id: 'prop_man_thai_beach',
    villageId: 'man_thai',
    villageName: 'Man Thai Fishing Village',
    title: 'Coracle & Oceanfront Studio - Mẫn Thái',
    hostName: 'Anh Tuan',
    hostAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    hostExperience: 'Fisherman & Host • 3 Years Hosting',
    hostBio: 'I love Da Nang sea and want to bring authentic beachfront living experiences to digital nomads.',
    pricePerNight: 50,
    rating: 4.92,
    reviewsCount: 115,
    location: 'Man Thai Fishing Village, Son Tra, Da Nang',
    images: [
      'https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2021/10/1/959183/Langchai2-01.jpg',
      'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1000&q=80'
    ],
    tags: ['Coracle Boats', 'Son Tra Sunrise', 'Fiber 180 Mbps'],
    description: 'Oceanfront beach studio with direct balcony views of basket boats returning at sunrise. Perfect for remote nomads who love ocean waves.',
    amenities: [
      { icon: 'wifi', name: 'Fiber Wi-Fi 180 Mbps' },
      { icon: 'desk', name: 'Ocean View Desk Setup' }
    ],
    wifiSpeedMbps: 180,
    workspaceType: 'Ocean Window Workstation',
    maxGuests: 2
  }
];

export const MOCK_EVENTS: EventItem[] = [
  {
    id: 'evt_1',
    title: 'Da Nang Soundscape 2026',
    description: 'A modern music festival by the Han River featuring international DJs and vibrant stage lights.',
    date: 'July 15-20',
    location: 'Han River Port',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'evt_2',
    title: 'Cu De River Boat Race',
    description: 'Traditional dragon boat racing on the scenic Cu De river with local crowds and festive atmosphere.',
    date: 'August 5',
    location: 'Cu De River, Hoa Vang',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'evt_3',
    title: 'Ancient Village Lantern Night',
    description: 'Experience the magic of traditional silk lanterns lighting up the historic Tuy Loan village.',
    date: 'Every full moon',
    location: 'Tuy Loan Village',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80'
  }
];

export const MOCK_CONVERSATIONS: ChatConversation[] = [];

export const MOCK_MAP_SPOTS: MapSpot[] = [
  {
    id: 'spot_hive',
    title: 'The Hive Da Nang',
    category: 'co_working',
    locationName: 'An Thuong, Ngu Hanh Son, Da Nang',
    rating: 4.9,
    reviewsCount: 142,
    wifiSpeed: '250 Mbps',
    quietLevel: 'Silent Work Zone',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    lat: 16.0500,
    lng: 108.2435
  },
  {
    id: 'spot_nam_o',
    title: 'Nam O Fish Sauce Village',
    category: 'workshop',
    locationName: 'Lien Chieu, Da Nang',
    rating: 4.95,
    reviewsCount: 210,
    wifiSpeed: '100 Mbps',
    quietLevel: 'Heritage & Experience',
    image: 'https://danangbest.com/uploads/news/news-editor-20260626-115438-48ec3abb.jpg',
    lat: 16.1030,
    lng: 108.1320
  },
  {
    id: 'spot_roots',
    title: 'Roots Plant-based Cafe',
    category: 'cafe',
    locationName: 'An Thuong, Da Nang',
    rating: 4.8,
    reviewsCount: 98,
    wifiSpeed: '150 Mbps',
    quietLevel: 'Cozy & Chill',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
    lat: 16.0510,
    lng: 108.2415
  },
  {
    id: 'spot_non_nuoc',
    title: 'Non Nuoc Stone Carving Village',
    category: 'workshop',
    locationName: 'Ngu Hanh Son, Da Nang',
    rating: 4.88,
    reviewsCount: 165,
    wifiSpeed: '120 Mbps',
    quietLevel: 'Artisan Hub',
    image: 'https://statics.vinpearl.com/lang-da-my-nghe-non-nuoc-01_1636966781.jpg',
    lat: 16.0020,
    lng: 108.2630
  },
  {
    id: 'spot_man_thai',
    title: 'Man Thai Fishing Village',
    category: 'food',
    locationName: 'Son Tra Peninsula, Da Nang',
    rating: 4.75,
    reviewsCount: 112,
    wifiSpeed: '90 Mbps',
    quietLevel: 'Ocean Breeze & Fresh Seafood',
    image: 'https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2021/10/1/959183/Langchai2-01.jpg',
    lat: 16.0880,
    lng: 108.2380
  },
  {
    id: 'spot_tuy_loan',
    title: 'Tuy Loan Ancient Rice Paper Village',
    category: 'workshop',
    locationName: 'Hoa Vang, Da Nang',
    rating: 4.9,
    reviewsCount: 85,
    wifiSpeed: '80 Mbps',
    quietLevel: 'Peaceful Countryside',
    image: 'https://statics.vinpearl.com/lang-banh-trang-tuy-loan-3_1632484988.jpg',
    lat: 16.0120,
    lng: 108.1250
  }
];

export const CULTURAL_PHRASES: CulturalPhrase[] = [
  { id: '1', english: 'Hello', vietnamese: 'Xin chào', category: 'common', pronunciation: 'sin chow' },
  { id: '2', english: 'Thank you', vietnamese: 'Cảm ơn', category: 'common', pronunciation: 'kahm uhn' },
  { id: '3', english: 'How much?', vietnamese: 'Bao nhiêu?', category: 'common', pronunciation: 'bow nyew' },
  { id: '4', english: 'Delicious', vietnamese: 'Ngon quá', category: 'common', pronunciation: 'ngon kwah' },
  { id: '5', english: 'Traditional fish sauce', vietnamese: 'Nước mắm truyền thống', category: 'craft', pronunciation: 'nuok mahm truyen thong' },
  { id: '6', english: 'Terracotta fermentation vat', vietnamese: 'Thố đất nung', category: 'craft', pronunciation: 'tho dat nung' },
  { id: '7', english: 'Anchovies', vietnamese: 'Cá cơm than', category: 'craft', pronunciation: 'kah kom than' },
  { id: '8', english: 'Super tasty local food', vietnamese: 'Ngon nhức nách', category: 'slang', pronunciation: 'ngon nhuk nahk' },
  { id: '9', english: 'Friendly greeting to elders', vietnamese: 'Dạ con chào bác', category: 'dos_and_donts' }
];

