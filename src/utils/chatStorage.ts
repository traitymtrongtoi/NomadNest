import { supabase } from '../lib/supabase';

export interface StoredChatMessage {
  id: number | string;
  senderRole: 'guest' | 'host';
  senderName: string;
  text: string;
  timestamp: string;
}

export const CHAT_STORAGE_KEY = 'nomad_chat_history';

export const INITIAL_CHAT_MESSAGES: StoredChatMessage[] = [
  {
    id: 1,
    senderRole: 'guest',
    senderName: 'Sarah Johnson',
    text: 'Xin chào Mrs. Mai! Cho em hỏi tốc độ Wi-Fi ở homestay Làng Rau Trà Quế có đủ nhanh để em gọi video work remote không ạ?',
    timestamp: '10:15 AM'
  },
  {
    id: 2,
    senderRole: 'host',
    senderName: 'Mrs. Mai (Host)',
    text: 'Chào Sarah! Wi-Fi cáp quang ở làng đạt 150Mbps, đầy đủ bàn làm việc và ổ cắm điện. Bạn yên tâm gọi Zoom/Meet nhé!',
    timestamp: '10:18 AM'
  },
  {
    id: 3,
    senderRole: 'guest',
    senderName: 'Sarah Johnson',
    text: 'Dạ tuyệt quá! Cho em hỏi thêm về dịch vụ thuê xe máy và chèo SUP bình minh ở Bãi Bụt Sơn Trà với ạ?',
    timestamp: '10:25 AM'
  },
  {
    id: 4,
    senderRole: 'host',
    senderName: 'Mrs. Mai (Host)',
    text: 'Bên mình có sẵn xe ga Vision 150k/ngày giao tận phòng. Còn tour SUP bình minh bãi Bụt 250k bao gồm ảnh GoPro miễn phí luôn nè!',
    timestamp: '10:30 AM'
  }
];

export const getStoredChatMessages = (): StoredChatMessage[] => {
  try {
    const raw = localStorage.getItem(CHAT_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(INITIAL_CHAT_MESSAGES));
      return INITIAL_CHAT_MESSAGES;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading chat from localStorage:', err);
    return INITIAL_CHAT_MESSAGES;
  }
};

export const saveStoredChatMessage = (
  senderRole: 'guest' | 'host',
  senderName: string,
  text: string
): StoredChatMessage[] => {
  const currentMessages = getStoredChatMessages();
  const timeStr = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
  const newMsg: StoredChatMessage = {
    id: Date.now(),
    senderRole,
    senderName,
    text: text.trim(),
    timestamp: timeStr
  };
  const updated = [...currentMessages, newMsg];
  try {
    localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(updated));
    // Trigger custom event for same-tab reactive update
    window.dispatchEvent(new Event('nomad_chat_updated'));

    // Sync asynchronously to Supabase
    supabase.from('chat_messages').insert({
      sender_role: senderRole,
      sender_name: senderName,
      text: text.trim(),
      timestamp: timeStr
    }).then(({ error }) => {
      if (error) console.log('Supabase chat sync note:', error.message);
    });
  } catch (err) {
    console.error('Error saving chat to localStorage:', err);
  }
  return updated;
};

