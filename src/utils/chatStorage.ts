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
    text: 'Hello Mrs. Mai! Could you confirm if the Wi-Fi speed at Nam O Villa is fast enough for my remote video calls?',
    timestamp: '10:15 AM'
  },
  {
    id: 2,
    senderRole: 'host',
    senderName: 'Mrs. Mai (Host)',
    text: 'Hello Sarah! Our fiber-optic Wi-Fi reaches 150 Mbps, complete with ergonomic desk setups and power outlets. Zoom/Meet calls run smoothly!',
    timestamp: '10:18 AM'
  },
  {
    id: 3,
    senderRole: 'guest',
    senderName: 'Sarah Johnson',
    text: 'That sounds wonderful! Could you also share details about scooter rentals and sunrise SUP paddling near Son Tra Beach?',
    timestamp: '10:25 AM'
  },
  {
    id: 4,
    senderRole: 'host',
    senderName: 'Mrs. Mai (Host)',
    text: 'We have Vision scooters available for 150k/day delivered to your door. Our sunrise SUP tour at Son Tra is 250k and includes free GoPro photos!',
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

