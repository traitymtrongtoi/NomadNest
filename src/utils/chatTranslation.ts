/**
 * Chat Translation Engine for NomadNest
 * Provides smart bidirectional EN <-> VI translation for Host and Guest messaging,
 * focusing on digital nomad inquiries, village homestays, craft workshops, and local hospitality.
 */

// Common English to Vietnamese phrase mappings
const EN_TO_VI_PHRASES: [RegExp, string][] = [
  [/^hi\b|^hello\b|^hey\b/i, 'Xin chào!'],
  [/is the room available(\?)?/i, 'Phòng này vẫn còn trống phải không ạ?'],
  [/is the room with high[- ]speed wi[- ]?fi available for next week(\?)?/i, 'Phòng có Wi-Fi tốc độ cao tuần tới còn trống không ạ?'],
  [/do you have (fast|high[- ]speed) (wifi|internet)(\?)?/i, 'Bên mình có Wi-Fi tốc độ cao để làm việc không ạ?'],
  [/what is the (wifi|internet) speed(\?)?/i, 'Tốc độ Wi-Fi ở chỗ bạn là bao nhiêu Mbps?'],
  [/i('m| am) a software engineer and need stable internet for video calls/i, 'Tôi là kỹ sư phần mềm và cần internet ổn định để họp video.'],
  [/can i join the (traditional )?fish sauce (making )?workshop(\?)?/i, 'Tôi có thể tham gia workshop làm nước mắm truyền thống không?'],
  [/can i join the (traditional )?craft workshop(\?)?/i, 'Tôi có thể tham gia trải nghiệm workshop làng nghề không?'],
  [/what time is check[- ]in(\?)?/i, 'Mấy giờ có thể nhận phòng vậy ạ?'],
  [/what time is check[- ]out(\?)?/i, 'Mấy giờ phải trả phòng vậy ạ?'],
  [/is breakfast included(\?)?/i, 'Giá phòng đã bao gồm bữa sáng chưa ạ?'],
  [/how far is it to the beach(\?)?/i, 'Từ chỗ mình ra bãi biển mất bao xa?'],
  [/how far is it to the city center(\?)?/i, 'Từ đây về trung tâm thành phố bao xa?'],
  [/can i book for (\d+) (days|nights)(\?)?/i, 'Tôi có thể đặt phòng cho $1 đêm được không?'],
  [/i would love to stay at your homestay/i, 'Tôi rất mong muốn được trải nghiệm lưu trú tại homestay của bạn.'],
  [/thank you so much(!)?/i, 'Cảm ơn bạn rất nhiều!'],
  [/looking forward to seeing you/i, 'Rất mong sớm được gặp bạn!'],
  [/can you send me the location|can you send me the address/i, 'Bạn có thể gửi cho mình định vị / địa chỉ cụ thể không?'],
  [/where can i get good local food nearby(\?)?/i, 'Gần homestay có quán ăn địa phương ngon nào không bạn?']
];

// Common Vietnamese to English phrase mappings
const VI_TO_EN_PHRASES: [RegExp, string][] = [
  [/^phòng vẫn còn trống ạ/i, 'The room is still available!'],
  [/^wi[- ]?fi bên mình đạt 150\+? mbps rất ổn định/i, 'Our Wi-Fi reaches 150+ Mbps and is very stable for remote work.'],
  [/^mời bạn ghé trải nghiệm xưởng nghề/i, 'We warmly invite you to visit and experience our traditional craft workshop!'],
  [/^chào bạn(!)?|^xin chào(!)?/i, 'Hello! Welcome to NomadNest.'],
  [/^dạ có ạ|^dạ vâng/i, 'Yes, absolutely!'],
  [/^cảm ơn bạn đã quan tâm/i, 'Thank you so much for your inquiry.'],
  [/^hẹn gặp bạn sớm nhé/i, 'Looking forward to welcoming you soon!'],
  [/^bên mình có bữa sáng miễn phí/i, 'We provide complimentary breakfast.'],
  [/^giờ nhận phòng là (\d+) giờ/i, 'Check-in time is at $1:00.'],
  [/^bạn cần hỗ trợ gì thêm không(\?)?/i, 'Do you need any additional assistance?'],
  [/^rất vui được đón tiếp bạn/i, 'We are delighted to host you!']
];

// Core bilingual word dictionary for fallback translation
const EN_VI_DICT: Record<string, string> = {
  'hello': 'xin chào',
  'hi': 'chào bạn',
  'room': 'phòng',
  'available': 'còn trống',
  'wifi': 'wi-fi',
  'internet': 'mạng internet',
  'fast': 'nhanh',
  'speed': 'tốc độ',
  'stable': 'ổn định',
  'work': 'làm việc',
  'workshop': 'xưởng trải nghiệm',
  'craft': 'làng nghề thủ công',
  'village': 'làng',
  'fish': 'cá',
  'sauce': 'nước mắm',
  'checkin': 'nhận phòng',
  'checkout': 'trả phòng',
  'price': 'giá',
  'cost': 'chi phí',
  'breakfast': 'bữa sáng',
  'included': 'bao gồm',
  'beach': 'bãi biển',
  'booking': 'đặt chỗ',
  'stay': 'lưu trú',
  'host': 'chủ nhà',
  'homestay': 'homestay',
  'desk': 'bàn làm việc',
  'quiet': 'yên tĩnh',
  'thanks': 'cảm ơn',
  'thank': 'cảm ơn',
  'yes': 'vâng / có',
  'no': 'không',
  'tomorrow': 'ngày mai',
  'today': 'hôm nay',
  'tonight': 'tối nay',
  'weekend': 'cuối tuần',
  'week': 'tuần',
  'night': 'đêm',
  'day': 'ngày',
  'address': 'địa chỉ',
  'location': 'vị trí',
  'near': 'gần',
  'far': 'xa',
  'center': 'trung tâm',
  'welcome': 'chào đón'
};

const VI_EN_DICT: Record<string, string> = {
  'xin chào': 'hello',
  'chào bạn': 'hello there',
  'phòng': 'room',
  'còn trống': 'available',
  'hết phòng': 'fully booked',
  'wifi': 'wi-fi',
  'mạng': 'internet',
  'nhanh': 'fast',
  'rất nhanh': 'very fast',
  'ổn định': 'stable',
  'làm việc': 'working',
  'xưởng': 'workshop',
  'làng nghề': 'craft village',
  'nước mắm': 'fish sauce',
  'nhận phòng': 'check-in',
  'trả phòng': 'check-out',
  'giá': 'price',
  'bữa sáng': 'breakfast',
  'miễn phí': 'free / complimentary',
  'bao gồm': 'included',
  'bãi biển': 'beach',
  'đặt phòng': 'booking',
  'lưu trú': 'stay',
  'chủ nhà': 'host',
  'bàn làm việc': 'work desk',
  'yên tĩnh': 'quiet',
  'cảm ơn': 'thank you',
  'dạ có': 'yes, certainly',
  'vâng': 'yes',
  'không': 'no',
  'ngày mai': 'tomorrow',
  'hôm nay': 'today',
  'tối nay': 'tonight',
  'cuối tuần': 'this weekend',
  'đêm': 'night',
  'ngày': 'day',
  'địa chỉ': 'address',
  'chào mừng': 'welcome'
};

/**
 * Detects if a string is primarily English (contains no Vietnamese tone accents)
 */
export function isEnglishText(text: string): boolean {
  if (!text || !text.trim()) return false;
  const vietnameseMarks = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđĐ]/i;
  if (vietnameseMarks.test(text)) return false;
  // If it contains English words or ASCII letters
  return /[a-zA-Z]/.test(text);
}

/**
 * Translates English text into fluent, natural Vietnamese for Vietnamese hosts
 */
export function translateEnglishToVietnamese(text: string): string {
  const trimmed = text.trim();
  if (!trimmed) return '';

  // 1. Check exact / regex phrase mappings
  for (const [pattern, translation] of EN_TO_VI_PHRASES) {
    if (pattern.test(trimmed)) {
      return translation;
    }
  }

  // 2. Tokenized dictionary replacement
  const words = trimmed.split(/\s+/);
  const translatedWords = words.map(word => {
    const clean = word.toLowerCase().replace(/[^a-z0-9]/g, '');
    const punctuation = word.replace(/[a-z0-9]/gi, '');
    if (EN_VI_DICT[clean]) {
      return EN_VI_DICT[clean] + punctuation;
    }
    return word;
  });

  const joined = translatedWords.join(' ');
  // If no words matched, add a friendly translated summary
  if (joined.toLowerCase() === trimmed.toLowerCase()) {
    return `[Dịch]: "${trimmed}" (Tin nhắn từ khách du lịch)`;
  }
  return joined.charAt(0).toUpperCase() + joined.slice(1);
}

/**
 * Translates Vietnamese text into natural English for international nomads
 */
export function translateVietnameseToEnglish(text: string): string {
  const trimmed = text.trim();
  if (!trimmed) return '';

  // 1. Check phrase matches
  for (const [pattern, translation] of VI_TO_EN_PHRASES) {
    if (pattern.test(trimmed)) {
      return translation;
    }
  }

  // 2. Common specific phrase replacements
  let translated = trimmed;
  for (const [viPhrase, enPhrase] of Object.entries(VI_EN_DICT)) {
    const regex = new RegExp(`\\b${viPhrase}\\b`, 'gi');
    translated = translated.replace(regex, enPhrase);
  }

  if (translated.toLowerCase() === trimmed.toLowerCase()) {
    return trimmed;
  }

  return translated.charAt(0).toUpperCase() + translated.slice(1);
}
