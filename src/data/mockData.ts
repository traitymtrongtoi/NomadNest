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
    name: 'Làng Nước Mắm Nam Ô',
    category: 'Heritage',
    tags: ['Làng nghề truyền thống', 'Thùng lều gỗ ủ mắm', 'Ủ chượp cá cơm'],
    slogan: 'Nơi đại dương hóa thành hương vị di sản 400 năm.',
    description: 'Trải nghiệm không gian mộc mạc bên cạnh những thùng lều gỗ lớn ủ mắm cá cơm truyền thống hơn 400 năm tuổi. Làng Nam Ô nằm nép mình ven biển Liên Chiểu, nơi nghệ nhân gìn giữ bí quyết chắt lọc từng giọt nước mắm cá cơm than nguyên chất đậm đà dưới nắng vàng.',
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=1000&q=80',
    location: 'Quận Liên Chiểu, Đà Nẵng',
    distanceFromCenter: 'Cách trung tâm 15km',
    highlights: ['Di sản 400 năm tuổi', 'Thùng lều gỗ ủ mắm cá cơm', 'Gỏi cá Nam Ô trứ danh'],
    experiences: [
      {
        id: 'exp_1',
        title: 'Trải nghiệm ủ chượp mắm truyền thống',
        type: 'Thực hành làm mắm',
        description: 'Tận mắt tham quan nhà thùng gỗ ủ mắm cá cơm than, giao lưu cùng nghệ nhân và nếm thử các giọt mắm cốt nhĩ thượng hạng.',
        image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80',
        price: 'Miễn phí tham quan'
      },
      {
        id: 'exp_2',
        title: 'Tản bộ làng chài cổ Nam Ô',
        type: 'Tour văn hóa',
        description: 'Khám phá con đường làng cổ, dốc biển phơi lưới cá và ghé viếng Dinh Lăng Ông Nam Ô kính ngưỡng ngàn năm.',
        image: 'https://images.unsplash.com/photo-1516541196182-6bdb0516ed27?auto=format&fit=crop&w=800&q=80',
        price: '150,000 VND'
      }
    ],
    atmosphereImages: [
      'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1516541196182-6bdb0516ed27?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'tuy_loan',
    name: 'Làng Bánh Tráng Túy Loan',
    category: 'Culinary',
    tags: ['Bánh tráng vỉ tre', 'Lò tráng than củi', 'Làng cổ 500 năm'],
    slogan: 'Thơm lừng hương gạo mới trên những vỉ tre phơi nắng.',
    description: 'Trải nghiệm không gian sống mộc mạc bên cạnh lò tráng bánh tráng truyền thống hơn 500 năm tuổi. Nơi những vỉ tre dài phơi đầy bánh tráng tròn mộc mạc dưới ánh nắng rực rỡ và bếp than củi rực hồng đum đúc đêm ngày.',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1000&q=80',
    location: 'Xã Hòa Phong, Huyện Hòa Vang, Đà Nẵng',
    distanceFromCenter: 'Cách trung tâm 14km',
    highlights: ['Vỉ tre phơi bánh tráng nắng', 'Lò tráng than củi 500 năm', 'Đình làng cổ Túy Loan'],
    experiences: [
      {
        id: 'exp_tuy_1',
        title: 'Tự tay tráng & phơi bánh tráng',
        type: 'Trải nghiệm làm bánh',
        description: 'Học kỹ thuật múc bột gạo, tráng mỏng trên vung vải bếp than và tự tay bưng vỉ tre phơi bánh dưới nắng mai.',
        image: 'https://images.unsplash.com/photo-1509315811355-57bd3b7776b6?auto=format&fit=crop&w=800&q=80',
        price: '100,000 VND'
      }
    ],
    atmosphereImages: [
      'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'non_nuoc',
    name: 'Làng Đá Mỹ Nghệ Non Nước',
    category: 'Artisan',
    tags: ['Điêu khắc cẩm thạch', 'Sơn Thủy Ngũ Hành Sơn', 'Tượng đá tinh xảo'],
    slogan: 'Nơi những khối đá cẩm thạch cất lời thành nghệ thuật.',
    description: 'Sinh sống trong không gian đậm chất nghệ thuật dưới chân danh thắng Ngũ Hành Sơn. Nơi các nghệ nhân Non Nước tài hoa tỉ mẩn gọt dũa, chế tác các bức tượng đá cẩm thạch tinh xảo từ hàng trăm năm qua.',
    image: 'https://images.unsplash.com/photo-1569172122301-bc5008bc09c5?auto=format&fit=crop&w=1000&q=80',
    location: 'Quận Ngũ Hành Sơn, Đà Nẵng',
    distanceFromCenter: 'Cách trung tâm 10km',
    highlights: ['Thắng cảnh Ngũ Hành Sơn', 'Tượng đá cẩm thạch thủ công', 'Không gian yên tĩnh sáng tạo'],
    experiences: [
      {
        id: 'exp_non_1',
        title: 'Thực hành điêu khắc đá cùng Nghệ nhân',
        type: 'Lớp học thủ công',
        description: 'Quan sát nghệ nhân chạm khắc chi tiết và tự tay đục đẽo khối đá nhỏ làm vật kỷ niệm mang về.',
        image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
        price: '200,000 VND'
      }
    ],
    atmosphereImages: [
      'https://images.unsplash.com/photo-1569172122301-bc5008bc09c5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'cam_ne',
    name: 'Làng Chiếu Cẩm Nê',
    category: 'Craft',
    tags: ['Sợi lác nhiều màu', 'Khung dệt gỗ', 'Chiếu tiến Vua'],
    slogan: 'Rực rỡ sắc màu sợi lác và tình quê dệt thắm.',
    description: 'Tận hưởng không gian thanh bình tại làng dệt chiếu từng được tuyển chọn tiến Vua nhà Nguyễn. Khắp lối đi làng quê phơi đầy những chùm sợi lác nhuộm màu đỏ, xanh, vàng rực rỡ bên khung dệt gỗ truyền thống.',
    image: 'https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?auto=format&fit=crop&w=1000&q=80',
    location: 'Xã Hòa Tiến, Huyện Hòa Vang, Đà Nẵng',
    distanceFromCenter: 'Cách trung tâm 12km',
    highlights: ['Chiếu lác nhuộm màu rực rỡ', 'Dệt chiếu thủ công truyền thống', 'Homestay sinh thái bình yên'],
    experiences: [
      {
        id: 'exp_cam_1',
        title: 'Trải nghiệm dệt chiếu hoa Cẩm Nê',
        type: 'Dệt chiếu thủ công',
        description: 'Thử sức đẩy dập khung gỗ và luồn sợi lác màu dệt nên những hoa văn chiếu hoa nổi tiếng.',
        image: 'https://images.unsplash.com/photo-1528458909336-e7a0adfac1d5?auto=format&fit=crop&w=800&q=80',
        price: '120,000 VND'
      }
    ],
    atmosphereImages: [
      'https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1528458909336-e7a0adfac1d5?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'man_thai',
    name: 'Làng Chài Mẫn Thái',
    category: 'Local Life',
    tags: ['Thuyền thúng tròn', 'Bãi biển Sơn Trà', 'Hải sản tươi sống'],
    slogan: 'Hòa mình vào nhịp đập rộn ràng của biển cả.',
    description: 'Ngắm nhìn hàng trăm chiếc thuyền thúng tròn bơi ra khơi trong ánh bình minh dưới chân bán đảo Sơn Trà. Nơi kéo lưới nhộn nhịp mang về những mẻ cá tôm tươi rói phục vụ thực khách.',
    image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1000&q=80',
    location: 'Quận Sơn Trà, Đà Nẵng',
    distanceFromCenter: 'Cách trung tâm 5km',
    highlights: ['Thuyền thúng bãi biển Mẫn Thái', 'Chợ cá bình minh', 'Làm việc sát bờ biển'],
    experiences: [
      {
        id: 'exp_man_1',
        title: 'Chèo thuyền thúng & Chợ cá sớm',
        type: 'Trải nghiệm ngư dân',
        description: 'Tự tay tập chèo thuyền thúng tròn ven bờ và trải nghiệm đón chuyến tàu đánh cá đầu tiên trong ngày.',
        image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=800&q=80',
        price: '180,000 VND'
      }
    ],
    atmosphereImages: [
      'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'
    ]
  }
];

export const MOCK_PROPERTIES: Property[] = [
  {
    id: 'prop_ocean_breeze',
    villageId: 'nam_o',
    villageName: 'Làng Nước Mắm Nam Ô',
    title: 'Ocean Breeze Villa - Nam Ô Heritage',
    hostName: 'Mrs. Mai',
    hostAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    hostExperience: 'Superhost • 5 năm đón tiếp Nomad',
    hostBio: '"Xin chào! Tôi sinh ra và lớn lên tại làng cổ Nam Ô. Rất vui được đón tiếp bạn đến nghỉ dưỡng và trải nghiệm không gian làm việc yên tĩnh ngập tràn hương vị biển cùng làng nghề nước mắm 400 năm tuổi."',
    pricePerNight: 55,
    rating: 4.9,
    reviewsCount: 128,
    location: 'Làng nước mắm Nam Ô, Liên Chiểu, Đà Nẵng',
    images: [
      'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1516541196182-6bdb0516ed27?auto=format&fit=crop&w=1000&q=80'
    ],
    tags: ['Wi-Fi 150 Mbps', 'Xem ủ mắm cá cơm', 'Gần biển Nam Ô', 'Góc làm việc Ergonomic'],
    description: 'Trải nghiệm không gian sống mộc mạc bên cạnh xưởng thùng lều gỗ ủ mắm cá cơm truyền thống hơn 400 năm tuổi. Căn biệt thự ngập tràn ánh nắng tự nhiên, trang bị bàn ghế làm việc Ergonomic tiêu chuẩn, Wi-Fi tốc độ cao và ban công thoáng mát lộng gió biển Nam Ô.',
    amenities: [
      { icon: 'wifi', name: 'Wi-Fi cáp quang (150 Mbps)' },
      { icon: 'ac_unit', name: 'Điều hòa 2 chiều' },
      { icon: 'bathtub', name: 'Phòng tắm riêng khép kín' },
      { icon: 'desk', name: 'Bàn ghế làm việc chuẩn Ergonomic' },
      { icon: 'coffee_maker', name: 'Máy pha cà phê thủ công' },
      { icon: 'local_laundry_service', name: 'Máy giặt & Sấy đồ' }
    ],
    wifiSpeedMbps: 150,
    workspaceType: 'Bàn làm việc riêng tư & Ghế công thái học',
    maxGuests: 2
  },
  {
    id: 'prop_tuy_loan_cottage',
    villageId: 'tuy_loan',
    villageName: 'Làng Bánh Tráng Túy Loan',
    title: 'Ancient Rice Paper Heritage Cottage',
    hostName: 'Chú Hai Túy Loan',
    hostAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    hostExperience: 'Nghệ nhân tráng bánh • 6 năm làm Host',
    hostBio: 'Gia đình tôi 5 đời tráng bánh tráng vỉ tre trên bếp than củi. Chào mừng các bạn Nomad đến lưu trú và trải nghiệm văn hóa ẩm thực làng cổ 500 năm.',
    pricePerNight: 42,
    rating: 4.95,
    reviewsCount: 86,
    location: 'Làng bánh tráng Túy Loan, Hòa Vang, Đà Nẵng',
    images: [
      'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1509315811355-57bd3b7776b6?auto=format&fit=crop&w=1000&q=80'
    ],
    tags: ['Lò tráng bánh 500 năm', 'Sân phơi vỉ tre', 'Wi-Fi 120 Mbps', 'Khung cảnh yên bình'],
    description: 'Trải nghiệm không gian sống mộc mạc bên cạnh lò tráng bánh tráng truyền thống hơn 500 năm tuổi. Căn homestay vườn cây xanh mát nơi những vỉ tre phơi đầy bánh tráng tròn thơm thoang thoảng dưới nắng vàng Túy Loan.',
    amenities: [
      { icon: 'wifi', name: 'Wi-Fi 120 Mbps' },
      { icon: 'desk', name: 'Góc làm việc hướng ra vườn tre' },
      { icon: 'coffee_maker', name: 'Trà sen & Bánh tráng nướng miễn phí' }
    ],
    wifiSpeedMbps: 120,
    workspaceType: 'Góc làm việc yên tĩnh nhìn ra vườn tre phơi bánh',
    maxGuests: 3
  },
  {
    id: 'prop_marble_sanctuary',
    villageId: 'non_nuoc',
    villageName: 'Làng Đá Mỹ Nghệ Non Nước',
    title: 'Marble Mountain Art Loft - Non Nước',
    hostName: 'Mr. Binh',
    hostAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    hostExperience: 'Nghệ nhân điêu khắc • 8 năm làm Host',
    hostBio: 'Đam mê chạm khắc đá cẩm thạch và tạo dựng không gian sống thanh tĩnh cho giới sáng tạo.',
    pricePerNight: 48,
    rating: 4.88,
    reviewsCount: 104,
    location: 'Làng đá Non Nước, Ngũ Hành Sơn, Đà Nẵng',
    images: [
      'https://images.unsplash.com/photo-1569172122301-bc5008bc09c5?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1000&q=80'
    ],
    tags: ['Tượng đá cẩm thạch', 'Chân núi Ngũ Hành Sơn', 'Cáp quang 200 Mbps'],
    description: 'Căn studio sang trọng được bài trí các tác phẩm đá cẩm thạch điêu khắc thủ công tinh xảo dưới chân núi Ngũ Hành Sơn. Không gian tĩnh lặng với góc làm việc đa màn hình cho lập trình viên và người sáng tạo.',
    amenities: [
      { icon: 'wifi', name: 'Wi-Fi Cáp quang 200 Mbps' },
      { icon: 'desk', name: 'Bàn làm việc Dual Monitor' },
      { icon: 'ac_unit', name: 'Điều hòa không khí' }
    ],
    wifiSpeedMbps: 200,
    workspaceType: 'Studio làm việc chuyên nghiệp trang bị 2 màn hình',
    maxGuests: 3
  },
  {
    id: 'prop_cam_ne_homestay',
    villageId: 'cam_ne',
    villageName: 'Làng Chiếu Cẩm Nê',
    title: 'Sedge Loom Garden Homestay - Cẩm Nê',
    hostName: 'Mế Tám Cẩm Nê',
    hostAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    hostExperience: 'Nghệ nhân dệt chiếu • 4 năm làm Host',
    hostBio: 'Đón mừng các bạn trẻ về làng chiếu Cẩm Nê nghỉ ngơi, làm việc và khám phá di sản dệt chiếu tiến Vua.',
    pricePerNight: 38,
    rating: 4.9,
    reviewsCount: 62,
    location: 'Làng chiếu Cẩm Nê, Hòa Vang, Đà Nẵng',
    images: [
      'https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1528458909336-e7a0adfac1d5?auto=format&fit=crop&w=1000&q=80'
    ],
    tags: ['Chiếu lác nhuộm màu', 'Khung dệt gỗ', 'Yên tĩnh sinh thái'],
    description: 'Trải nghiệm nghỉ dưỡng tại không gian homestay mộc mạc surrounded by rực rỡ sắc màu sợi lác phơi dọc hiên nhà. Trải nghiệm giấc ngủ êm ái trên những tấm chiếu lác dệt tay hoa văn tinh tế.',
    amenities: [
      { icon: 'wifi', name: 'Wi-Fi 100 Mbps' },
      { icon: 'desk', name: 'Bàn làm việc gỗ tự nhiên' }
    ],
    wifiSpeedMbps: 100,
    workspaceType: 'Góc làm việc gỗ mộc bên khung dệt chiếu',
    maxGuests: 2
  },
  {
    id: 'prop_man_thai_beach',
    villageId: 'man_thai',
    villageName: 'Làng Chài Mẫn Thái',
    title: 'Coracle & Oceanfront Studio - Mẫn Thái',
    hostName: 'Anh Tuấn',
    hostAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    hostExperience: 'Ngư dân & Host • 3 năm làm Host',
    hostBio: 'Yêu biển Đà Nẵng và mong muốn mang lại trải nghiệm sống sát bờ biển rộn ràng cho các Digital Nomad.',
    pricePerNight: 50,
    rating: 4.92,
    reviewsCount: 115,
    location: 'Làng chài Mẫn Thái, Sơn Trà, Đà Nẵng',
    images: [
      'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1000&q=80'
    ],
    tags: ['Thuyền thúng ven biển', 'Ngắm bình minh Sơn Trà', 'Cáp quang 180 Mbps'],
    description: 'Studio sát biển Mẫn Thái với ban công nhìn thẳng ra những chiếc thuyền thúng tròn mộc mạc cập bến mỗi bình minh. Lý tưởng cho Nomad vừa làm việc online vừa yêu thích không khí biển khơi.',
    amenities: [
      { icon: 'wifi', name: 'Wi-Fi Cáp quang 180 Mbps' },
      { icon: 'desk', name: 'Bàn làm việc hướng biển' }
    ],
    wifiSpeedMbps: 180,
    workspaceType: 'Bàn làm việc sát cửa kính view thuyền thúng biển Mẫn Thái',
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

export const MOCK_CONVERSATIONS: ChatConversation[] = [
  {
    id: 'chat_mrs_mai',
    partnerName: 'Mrs. Mai',
    partnerAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    partnerLocation: 'Nam O Village',
    lastMessage: 'Yes, the bicycle is ready for your ride to the beach!',
    timestamp: '09:42 AM',
    unreadCount: 1,
    isOnline: true,
    messages: [
      { id: 'm1', sender: 'me', text: 'Xin chào Mrs. Mai! Can I rent a bicycle today?', timestamp: '09:30 AM' },
      { id: 'm2', sender: 'other', text: 'Yes, the bicycle is ready for your ride to the beach!', timestamp: '09:42 AM' }
    ]
  },
  {
    id: 'chat_mr_binh',
    partnerName: 'Mr. Binh',
    partnerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    partnerLocation: 'Non Nuoc',
    lastMessage: 'Thank you for staying with us. Have a safe flight back!',
    timestamp: 'Yesterday',
    unreadCount: 0,
    isOnline: false,
    messages: [
      { id: 'm10', sender: 'other', text: 'Thank you for staying with us. Have a safe flight back!', timestamp: 'Yesterday' }
    ]
  },
  {
    id: 'chat_concierge',
    partnerName: 'NomadNest Concierge',
    partnerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    partnerLocation: 'Support',
    lastMessage: 'Your Wi-Fi upgrade request for next month has been approved.',
    timestamp: 'Mon',
    unreadCount: 0,
    isOnline: true,
    messages: [
      { id: 'm20', sender: 'other', text: 'Your Wi-Fi upgrade request for next month has been approved.', timestamp: 'Mon' }
    ]
  }
];

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
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
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
    image: 'https://images.unsplash.com/photo-1568084680786-a84f91d1153c?auto=format&fit=crop&w=800&q=80',
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
    image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=800&q=80',
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
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
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

