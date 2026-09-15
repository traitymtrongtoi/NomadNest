import { supabase } from '../lib/supabase';

export interface StoredChatMessage {
  id: number | string;
  senderRole: 'guest' | 'host';
  senderName: string;
  text: string;
  timestamp: string;
}

export const CHAT_STORAGE_KEY = 'nomad_chat_history';

export const INITIAL_CHAT_MESSAGES: StoredChatMessage[] = [];

export const getStoredChatMessages = (): StoredChatMessage[] => {
  try {
    const raw = localStorage.getItem(CHAT_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify([]));
      return [];
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    
    // Purge any legacy hardcoded mock messages if found
    const hasLegacyMock = parsed.some(
      (m: StoredChatMessage) =>
        m.text?.includes('Hello Mrs. Mai!') ||
        m.text?.includes('Wi-Fi speed at Nam O Villa') ||
        m.text?.includes('Son Tra Beach')
    );
    if (hasLegacyMock) {
      localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify([]));
      return [];
    }

    return parsed;
  } catch (err) {
    console.error('Error reading chat from localStorage:', err);
    return [];
  }
};

export const saveStoredChatMessage = (
  senderRole: 'guest' | 'host',
  senderName: string,
  text: string
): StoredChatMessage[] => {
  const currentMessages = getStoredChatMessages();
  const timeStr = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const newMsg: StoredChatMessage = {
    id: `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    senderRole,
    senderName: senderName || (senderRole === 'guest' ? 'Guest' : 'Host'),
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
      sender_name: senderName || (senderRole === 'guest' ? 'Guest' : 'Host'),
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


