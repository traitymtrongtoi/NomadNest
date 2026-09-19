import React, { useState, useRef, useEffect } from 'react';
import { CurrentUserProfile, getCurrentUserFromStorage } from '../../utils/userStorage';
import { User } from '../../types';
import { supabase } from '../../lib/supabase';
import {
  isEnglishText,
  translateEnglishToVietnamese,
  translateVietnameseToEnglish
} from '../../utils/chatTranslation';

export interface HostChatMessage {
  id: string | number;
  text: string;
  sender: 'host' | 'guest';
  time: string;
  senderName?: string;
  senderAvatar?: string;
  originalLanguage?: 'en' | 'vi';
  translatedViText?: string;
  showTranslation?: boolean;
}

export interface HostConversationItem {
  id: string; // conversation ID
  hostId: string; // host's user ID (must equal current_user_id)
  hostName: string;
  guestId: string;
  guestName: string;
  guestAvatar: string;
  guestCountry?: string;
  propertyTitle?: string;
  village?: string;
  lastMessage: string;
  lastTime: string;
  unreadCount: number;
  messages: HostChatMessage[];
}

export interface HostChatScreenProps {
  currentUser?: CurrentUserProfile | User | null;
  userRole?: 'host' | 'guest';
  conversationId?: string | null;
  activeHost?: any;
  onBack?: () => void;
  onNavigateHome?: () => void;
  onNavigateExplore?: () => void;
  onNavigateListings?: () => void;
  onOpenNotifications?: () => void;
  onCloseChat?: () => void;
}

const HOST_CONVERSATIONS_KEY = 'nomadnest_host_conversations';
const GLOBAL_CONVERSATIONS_KEY = 'nomadnest_chat_conversations';

// Sample international nomad conversation for demonstration and test convenience
export const SAMPLE_GUEST_CONVERSATION: HostConversationItem = {
  id: 'conv_host_sample_sarah',
  hostId: 'host_mrs_mai',
  hostName: 'Mrs. Mai',
  guestId: 'user_sarah',
  guestName: 'Sarah Johnson',
  guestAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  guestCountry: 'United States 🇺🇸',
  propertyTitle: 'Phòng Homestay Làng Nam Ô - Sea View',
  village: 'Làng Nước Mắm Nam Ô',
  lastMessage: 'Hi! Is the room with high-speed Wi-Fi available for next week?',
  lastTime: '10:15',
  unreadCount: 1,
  messages: [
    {
      id: 'msg_s1',
      text: 'Hello Mrs. Mai! I am a remote software engineer from California visiting Da Nang next week.',
      sender: 'guest',
      time: '10:12',
      senderName: 'Sarah Johnson',
      senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      originalLanguage: 'en',
      translatedViText: 'Xin chào cô Mai! Tôi là kỹ sư phần mềm làm việc từ xa đến từ California, sẽ đến Đà Nẵng vào tuần tới.',
      showTranslation: false
    },
    {
      id: 'msg_s2',
      text: 'Hi! Is the room with high-speed Wi-Fi available for next week? Also, can I join the traditional craft workshop?',
      sender: 'guest',
      time: '10:15',
      senderName: 'Sarah Johnson',
      senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      originalLanguage: 'en',
      translatedViText: 'Phòng có Wi-Fi tốc độ cao tuần tới còn trống không ạ? Tôi có thể tham gia workshop làng nghề truyền thống không?',
      showTranslation: false
    }
  ]
};

// Helper to retrieve conversations strictly where host_id === current_user_id
function getHostConversationsFromStorage(currentUserId: string): HostConversationItem[] {
  try {
    // 1. Check dedicated host conversations storage
    const rawHost = localStorage.getItem(HOST_CONVERSATIONS_KEY);
    let allHostConvs: HostConversationItem[] = [];
    if (rawHost) {
      const parsed = JSON.parse(rawHost);
      if (Array.isArray(parsed)) allHostConvs = parsed;
    }

    // 2. Also check global storage for any conversations directed to this host
    const rawGlobal = localStorage.getItem(GLOBAL_CONVERSATIONS_KEY);
    if (rawGlobal) {
      const parsedGlobal = JSON.parse(rawGlobal);
      if (Array.isArray(parsedGlobal)) {
        parsedGlobal.forEach((item: any) => {
          // Check role-based isolation: ONLY match where hostId === currentUserId
          const isTargetHost = item.hostId === currentUserId ||
            (currentUserId === 'host_mrs_mai' && (!item.hostId || item.hostId === 'host_mrs_mai'));
          
          if (isTargetHost && !allHostConvs.some(c => c.id === item.id)) {
            allHostConvs.push({
              id: item.id,
              hostId: currentUserId,
              hostName: item.hostName || 'Chủ nhà',
              guestId: item.guestId || 'guest_user',
              guestName: item.guestName || 'Khách Nomad',
              guestAvatar: item.guestAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
              propertyTitle: item.propertyTitle || 'Homestay làng nghề',
              village: item.village || 'Làng nghề Đà Nẵng',
              lastMessage: item.lastMessage || '',
              lastTime: item.lastTime || 'Hôm nay',
              unreadCount: item.unreadCount || 0,
              messages: (item.messages || []).map((m: any) => ({
                id: m.id,
                text: m.text,
                sender: m.sender === 'host' ? 'host' : 'guest',
                time: m.time,
                senderName: m.senderName,
                senderAvatar: m.senderAvatar,
                originalLanguage: isEnglishText(m.text) ? 'en' : 'vi',
                translatedViText: isEnglishText(m.text) ? translateEnglishToVietnamese(m.text) : undefined,
                showTranslation: false
              }))
            });
          }
        });
      }
    }

    // Strictly enforce role-based isolation: hostId must match currentUserId
    return allHostConvs.filter(c => c.hostId === currentUserId);
  } catch (err) {
    console.error('Error reading host conversations:', err);
    return [];
  }
}

// Helper to save conversations
function saveHostConversationsToStorage(conversations: HostConversationItem[]) {
  try {
    localStorage.setItem(HOST_CONVERSATIONS_KEY, JSON.stringify(conversations));
    window.dispatchEvent(new Event('nomadnest_host_conversations_updated'));
  } catch (err) {
    console.error('Error saving host conversations:', err);
  }
}

export const HostChatScreen: React.FC<HostChatScreenProps> = ({
  currentUser: propCurrentUser,
  conversationId: propConversationId,
  activeHost: propActiveHost,
  onBack,
  onNavigateHome,
  onNavigateListings,
  onOpenNotifications,
  onCloseChat
}) => {
  // 1. Resolve host user info
  const currentUser = propCurrentUser || getCurrentUserFromStorage('local_host');
  const currentUserId = currentUser?.id || 'host_mrs_mai';

  // 2. State for host conversations strictly filtered by host_id === current_user_id
  const [conversations, setConversations] = useState<HostConversationItem[]>(() => {
    return getHostConversationsFromStorage(currentUserId);
  });

  // 3. Active Chat Room state
  const [activeConversation, setActiveConversation] = useState<HostConversationItem | null>(null);

  // 4. Input & Auto-translate state
  const [input, setInput] = useState<string>('');
  const [autoTranslateToEnglish, setAutoTranslateToEnglish] = useState<boolean>(true);
  const [translatedPreview, setTranslatedPreview] = useState<string>('');
  const [showQuickChips, setShowQuickChips] = useState<boolean>(true);

  // Per-message translation toggle map { [messageId]: boolean }
  const [activeTranslations, setActiveTranslations] = useState<Record<string | number, boolean>>({});

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Synchronize when storage updates
  useEffect(() => {
    const handleSync = () => {
      const updated = getHostConversationsFromStorage(currentUserId);
      setConversations(updated);
      if (activeConversation) {
        const found = updated.find(c => c.id === activeConversation.id);
        if (found) setActiveConversation(found);
      }
    };

    window.addEventListener('nomadnest_host_conversations_updated', handleSync);
    window.addEventListener('storage', handleSync);
    return () => {
      window.removeEventListener('nomadnest_host_conversations_updated', handleSync);
      window.removeEventListener('storage', handleSync);
    };
  }, [currentUserId, activeConversation?.id]);

  // Query Supabase messages table if present (ensuring host_id === current_user_id)
  useEffect(() => {
    let isMounted = true;
    async function querySupabaseHostMessages() {
      try {
        const { data, error } = await supabase
          .from('messages')
          .select('*')
          .eq('host_id', currentUserId)
          .limit(20);

        if (!error && data && data.length > 0 && isMounted) {
          console.log(`Supabase: Found ${data.length} messages for host ${currentUserId}`);
        }
      } catch (err) {
        // Fallback gracefully to local database
      }
    }
    querySupabaseHostMessages();
    return () => {
      isMounted = false;
    };
  }, [currentUserId]);

  // Handle incoming props navigation
  useEffect(() => {
    if (propConversationId) {
      const found = conversations.find(c => c.id === propConversationId);
      if (found) {
        setActiveConversation(found);
        return;
      }
    }

    if (propActiveHost) {
      // If a guest name/data was passed via propActiveHost
      const guestName = propActiveHost.name || propActiveHost.guestName || 'Khách Nomad';
      const existing = conversations.find(c => c.guestName === guestName);
      if (existing) {
        setActiveConversation(existing);
      } else {
        // Initialize a new conversation thread for this host and guest
        const newThread: HostConversationItem = {
          id: 'conv_host_' + Date.now(),
          hostId: currentUserId,
          hostName: currentUser?.name || 'Mrs. Mai',
          guestId: propActiveHost.guestId || propActiveHost.hostId || ('guest_' + Date.now()),
          guestName,
          guestAvatar: propActiveHost.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
          propertyTitle: propActiveHost.village || 'Phòng Homestay Làng Nam Ô',
          village: 'Làng nghề Đà Nẵng',
          lastMessage: 'Cuộc trò chuyện mới tiếp đón khách',
          lastTime: 'Vừa xong',
          unreadCount: 0,
          messages: []
        };
        const updated = [newThread, ...conversations];
        saveHostConversationsToStorage(updated);
        setConversations(updated);
        setActiveConversation(newThread);
      }
    }
  }, [propConversationId, propActiveHost, currentUserId]);

  // Live Auto-Translate preview for host input (Vietnamese -> English)
  useEffect(() => {
    if (!autoTranslateToEnglish || !input.trim()) {
      setTranslatedPreview('');
      return;
    }
    const timer = setTimeout(() => {
      const englishTranslation = translateVietnameseToEnglish(input);
      setTranslatedPreview(englishTranslation);
    }, 150);
    return () => clearTimeout(timer);
  }, [input, autoTranslateToEnglish]);

  // Auto scroll to bottom of messages
  const scrollToBottom = (smooth = true) => {
    messagesEndRef.current?.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' });
  };

  useEffect(() => {
    if (activeConversation) {
      scrollToBottom(true);
    }
  }, [activeConversation?.messages]);

  // Toggle translation on an incoming guest message
  const handleToggleTranslation = (msgId: string | number) => {
    setActiveTranslations(prev => ({
      ...prev,
      [msgId]: !prev[msgId]
    }));
  };

  // Open conversation from inbox list
  const handleOpenConversation = (conv: HostConversationItem) => {
    const updated = conversations.map(c => c.id === conv.id ? { ...c, unreadCount: 0 } : c);
    saveHostConversationsToStorage(updated);
    setConversations(updated);
    setActiveConversation({ ...conv, unreadCount: 0 });
  };

  // Back to Host Inbox
  const handleBackToInbox = () => {
    setActiveConversation(null);
    setInput('');
    setTranslatedPreview('');
    if (onCloseChat) onCloseChat();
  };

  // Host Quick Reply Chips
  const HOST_QUICK_REPLIES = [
    'Phòng vẫn còn trống ạ',
    'Wi-Fi bên mình đạt 150+ Mbps rất ổn định',
    'Mời bạn ghé trải nghiệm xưởng nghề'
  ];

  const handleApplyQuickReply = (text: string) => {
    setInput(text);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Send message
  const handleSendMessage = () => {
    const trimmed = input.trim();
    if (!trimmed || !activeConversation) return;

    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // If auto-translate is active, we prepare the translated English version
    const finalEnglishText = autoTranslateToEnglish ? (translatedPreview || translateVietnameseToEnglish(trimmed)) : '';
    
    // We send the English version for the international nomad, with Vietnamese reference
    const displayText = autoTranslateToEnglish && finalEnglishText
      ? finalEnglishText
      : trimmed;

    const hostMessage: HostChatMessage = {
      id: 'host_msg_' + Date.now(),
      text: displayText,
      sender: 'host',
      time: currentTime,
      senderName: currentUser?.name || 'Mrs. Mai (Chủ nhà)',
      senderAvatar: currentUser?.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
      originalLanguage: autoTranslateToEnglish ? 'en' : 'vi',
      translatedViText: autoTranslateToEnglish ? trimmed : undefined
    };

    const updatedMessages = [...activeConversation.messages, hostMessage];
    const updatedConv: HostConversationItem = {
      ...activeConversation,
      messages: updatedMessages,
      lastMessage: displayText,
      lastTime: currentTime,
      unreadCount: 0
    };

    const newConversations = conversations.map(c => c.id === updatedConv.id ? updatedConv : c);
    if (!newConversations.some(c => c.id === updatedConv.id)) {
      newConversations.unshift(updatedConv);
    }

    saveHostConversationsToStorage(newConversations);
    setConversations(newConversations);
    setActiveConversation(updatedConv);
    setInput('');
    setTranslatedPreview('');
  };

  // Seed sample guest inquiry for demo testing
  const handleSeedSampleGuest = () => {
    const sampleThread: HostConversationItem = {
      ...SAMPLE_GUEST_CONVERSATION,
      hostId: currentUserId,
      id: 'conv_host_sample_' + Date.now()
    };
    const updated = [sampleThread, ...conversations];
    saveHostConversationsToStorage(updated);
    setConversations(updated);
    setActiveConversation(sampleThread);
  };

  const isInActiveChat = Boolean(activeConversation);

  return (
    <div className="h-screen flex flex-col justify-between bg-gradient-to-b from-[#0A3D2F] via-[#05261C] to-[#001710] text-white overflow-hidden relative font-sans">
      
      {/* ========================================================================= */}
      {/* 1. TOP HEADER (Default Vietnamese UI for Host Mode)                       */}
      {/* ========================================================================= */}
      <header className="h-16 shrink-0 bg-[#0F6B57]/95 backdrop-blur-xl shadow-md border-b border-white/10 flex items-center justify-between px-4 sm:px-6 z-20">
        
        {/* Left Section */}
        <div className="flex items-center gap-2.5">
          {isInActiveChat ? (
            <button
              onClick={handleBackToInbox}
              type="button"
              className="p-1.5 rounded-full hover:bg-white/10 text-white/90 hover:text-white transition-colors cursor-pointer flex items-center gap-1"
              title="Quay lại hộp thư tiếp đón"
              aria-label="Quay lại hộp thư"
            >
              <span className="material-symbols-outlined text-2xl">arrow_back</span>
            </button>
          ) : (
            onBack && (
              <button
                onClick={onBack}
                type="button"
                className="p-1.5 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
                title="Quay lại bảng điều khiển"
                aria-label="Quay lại"
              >
                <span className="material-symbols-outlined text-xl">arrow_back</span>
              </button>
            )
          )}

          {/* Logo & Brand Subtitle */}
          <div
            onClick={isInActiveChat ? handleBackToInbox : onNavigateHome}
            className="flex items-center gap-2 cursor-pointer hover:opacity-90 active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-amber-300 text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              storefront
            </span>
            <div className="flex flex-col">
              <span className="font-bold text-base sm:text-lg text-white tracking-tight leading-none flex items-center gap-1.5">
                NomadNest <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300 font-semibold border border-amber-400/30">Chủ nhà</span>
              </span>
              <span className="text-[11px] text-emerald-200/90 font-medium">
                Hộp thư tiếp đón & Yêu cầu từ khách
              </span>
            </div>
          </div>
        </div>

        {/* Center: Active Chat Guest Info */}
        {isInActiveChat && activeConversation ? (
          <div className="hidden md:flex items-center gap-2.5 px-3 py-1 bg-white/10 rounded-full border border-white/10 shadow-sm animate-fadeIn">
            <div className="relative">
              <img
                src={activeConversation.guestAvatar}
                alt={activeConversation.guestName}
                className="w-7 h-7 rounded-full object-cover border border-amber-300"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-emerald-400 rounded-full border border-black" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-bold text-white truncate max-w-[180px] leading-tight flex items-center gap-1">
                {activeConversation.guestName}
                <span className="text-[10px] text-emerald-300">✈️ Nomad</span>
              </span>
              <span className="text-[10px] text-emerald-200 font-medium leading-tight truncate max-w-[200px]">
                {activeConversation.propertyTitle || activeConversation.village}
              </span>
            </div>
          </div>
        ) : (
          <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10">
            <span className="material-symbols-outlined text-amber-300 text-sm">mark_email_unread</span>
            <span className="text-xs font-semibold text-emerald-100 tracking-wide">
              Hộp thư ({conversations.length})
            </span>
          </div>
        )}

        {/* Right Section: Notifications & Host Avatar */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenNotifications || (() => alert('Không có thông báo mới từ hệ thống.'))}
            type="button"
            className="text-white/90 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors relative cursor-pointer"
            title="Thông báo tiếp đón"
            aria-label="Thông báo"
          >
            <span className="material-symbols-outlined text-2xl">notifications</span>
            <span className="absolute top-2 right-2 w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
          </button>

          <div
            className="w-8 h-8 rounded-full overflow-hidden border-2 border-amber-400/80 bg-white/20 shrink-0 shadow cursor-pointer"
            title={currentUser?.name || 'Tài khoản chủ nhà'}
          >
            <img
              src={currentUser?.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80'}
              alt={currentUser?.name || 'Host Avatar'}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </header>

      {/* Sub-header on Mobile: ONLY in Active Chat State */}
      {isInActiveChat && activeConversation && (
        <div className="md:hidden shrink-0 px-4 py-2 bg-[#002b1f]/95 border-b border-white/10 flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <img
                src={activeConversation.guestAvatar}
                alt={activeConversation.guestName}
                className="w-7 h-7 rounded-full object-cover border border-amber-300"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-emerald-400 rounded-full border border-black" />
            </div>
            <div>
              <p className="text-xs font-bold text-white leading-tight flex items-center gap-1.5">
                {activeConversation.guestName}
                <span className="text-[9px] px-1 py-0.2 rounded bg-amber-400/20 text-amber-300">Khách quốc tế</span>
              </p>
              <p className="text-[10px] text-emerald-300/90 leading-tight truncate max-w-[220px]">
                {activeConversation.propertyTitle || 'Yêu cầu phòng & trải nghiệm'}
              </p>
            </div>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
            Trực tuyến
          </span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. MAIN CONTENT AREA                                                      */}
      {/* ========================================================================= */}
      <main className="flex-1 overflow-y-auto min-h-0 px-3 sm:px-4 py-3 sm:py-4 max-w-4xl w-full mx-auto flex flex-col">
        
        {/* ----------------------------------------------------------------------- */}
        {/* STATE A: ACTIVE CHAT ROOM (HOST VIEW WITH DUAL-WAY TRANSLATION)         */}
        {/* ----------------------------------------------------------------------- */}
        {isInActiveChat && activeConversation ? (
          <div className="flex-1 flex flex-col justify-between">
            {/* Conversation Stream */}
            <div className="flex flex-col space-y-3.5 w-full pb-3">
              
              {/* Context Banner */}
              <div className="text-center my-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 text-emerald-200 border border-white/10 text-xs shadow-sm">
                  <span className="material-symbols-outlined text-amber-300 text-sm">translate</span>
                  <span>Chế độ dịch thuật song ngữ thông minh (Anh ⇄ Việt)</span>
                </div>
              </div>

              {activeConversation.messages.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center px-4 py-8 animate-fadeIn">
                  <div className="w-14 h-14 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-300 mb-3">
                    <span className="material-symbols-outlined text-3xl">waving_hand</span>
                  </div>
                  <h4 className="text-base font-bold text-white">
                    Bắt đầu trả lời khách {activeConversation.guestName}
                  </h4>
                  <p className="text-xs text-emerald-200/80 max-w-xs mt-1">
                    Hãy sử dụng các mẫu phản hồi nhanh bên dưới hoặc nhập tin nhắn tiếng Việt, hệ thống sẽ tự động dịch sang tiếng Anh cho khách.
                  </p>
                </div>
              ) : (
                activeConversation.messages.map((msg) => {
                  const isHost = msg.sender === 'host';
                  const isEnglish = isEnglishText(msg.text);
                  const isTranslationVisible = activeTranslations[msg.id];
                  const vietnameseTranslation = msg.translatedViText || translateEnglishToVietnamese(msg.text);

                  return (
                    <div
                      key={msg.id}
                      className={`flex items-end gap-2.5 ${isHost ? 'justify-end' : 'justify-start'}`}
                    >
                      {/* Guest Avatar */}
                      {!isHost && (
                        <img
                          src={msg.senderAvatar || activeConversation.guestAvatar}
                          alt={msg.senderName || activeConversation.guestName}
                          className="w-8 h-8 rounded-full object-cover border border-amber-300/70 shrink-0 mb-1"
                        />
                      )}

                      <div className={`max-w-[85%] sm:max-w-[72%] flex flex-col ${isHost ? 'items-end' : 'items-start'}`}>
                        {/* Sender Label */}
                        <div className="flex items-center gap-2 mb-1 px-1">
                          <span className={`text-[11px] font-semibold ${isHost ? 'text-amber-300' : 'text-emerald-300'}`}>
                            {isHost ? 'Bạn (Chủ nhà)' : (msg.senderName || activeConversation.guestName)}
                          </span>
                          {!isHost && isEnglish && (
                            <span className="text-[9px] px-1.5 py-0.2 rounded bg-blue-500/20 text-blue-300 border border-blue-400/30 font-medium">
                              Tiếng Anh 🇬🇧
                            </span>
                          )}
                        </div>

                        {/* Message Bubble */}
                        <div
                          className={`p-3.5 text-sm rounded-2xl shadow-md transition-all ${
                            isHost
                              ? 'bg-gradient-to-r from-emerald-600 to-[#2ba882] text-white font-medium rounded-tr-xs border border-emerald-400/30'
                              : 'bg-white/10 backdrop-blur-md text-white border border-white/15 rounded-tl-xs'
                          }`}
                        >
                          <p className="leading-relaxed whitespace-pre-wrap break-words">{msg.text}</p>

                          {/* Quick translation toggle for English guest messages */}
                          {!isHost && isEnglish && (
                            <div className="mt-2 pt-2 border-t border-white/10 flex flex-col gap-1.5">
                              <button
                                onClick={() => handleToggleTranslation(msg.id)}
                                type="button"
                                className="self-start text-[11px] font-bold text-amber-300 hover:text-amber-200 bg-amber-400/15 hover:bg-amber-400/25 px-2.5 py-1 rounded-full border border-amber-400/30 transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
                              >
                                <span>🌐</span>
                                <span>{isTranslationVisible ? 'Ẩn bản dịch Tiếng Việt' : 'Dịch sang Tiếng Việt'}</span>
                              </button>

                              {/* Clean translated text block beneath original message */}
                              {isTranslationVisible && (
                                <div className="mt-1 p-2.5 rounded-xl bg-black/40 border border-amber-300/30 text-amber-100 text-xs leading-relaxed animate-fadeIn flex flex-col gap-1">
                                  <div className="flex items-center gap-1 text-[10px] text-amber-300 font-bold uppercase tracking-wider">
                                    <span className="material-symbols-outlined text-xs">g_translate</span>
                                    <span>Bản dịch Tiếng Việt:</span>
                                  </div>
                                  <p className="italic">{vietnameseTranslation}</p>
                                </div>
                              )}
                            </div>
                          )}

                          {/* Original Vietnamese note for host messages if translated */}
                          {isHost && msg.translatedViText && (
                            <div className="mt-1.5 text-[10px] text-emerald-200/70 border-t border-emerald-400/20 pt-1">
                              <span>Gốc tiếng Việt: </span>
                              <span className="italic">"{msg.translatedViText}"</span>
                            </div>
                          )}

                          {/* Timestamp */}
                          <div className={`text-[10px] mt-1.5 text-right flex items-center justify-end gap-1 ${isHost ? 'text-emerald-200/80' : 'text-white/50'}`}>
                            <span>{msg.time}</span>
                            {isHost && (
                              <span className="material-symbols-outlined text-xs text-amber-300">done_all</span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Host Avatar */}
                      {isHost && (
                        <img
                          src={currentUser?.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80'}
                          alt="Host"
                          className="w-8 h-8 rounded-full object-cover border border-emerald-400 shrink-0 mb-1"
                        />
                      )}
                    </div>
                  );
                })
              )}

              <div ref={messagesEndRef} className="h-2" />
            </div>
          </div>
        ) : (
          /* --------------------------------------------------------------------- */
          /* STATE B: DEDICATED HOST INBOX (ROLE-BASED ISOLATION)                  */
          /* --------------------------------------------------------------------- */
          <div className="flex-1 flex flex-col">
            {conversations.length === 0 ? (
              /* REQUIRED EXACT EMPTY STATE FOR HOST MODE */
              <div className="flex-1 flex flex-col items-center justify-center text-center px-4 py-12 animate-fadeIn max-w-lg mx-auto">
                {/* Inbox / Envelope Icon */}
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-amber-400/20 to-emerald-500/20 border-2 border-amber-400/40 flex items-center justify-center text-amber-300 shadow-2xl mb-4 backdrop-blur-md">
                  <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                    mail
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-2">
                  Chưa có tin nhắn mới từ khách
                </h2>

                {/* Description */}
                <p className="text-sm text-emerald-100/80 leading-relaxed mb-6">
                  Hộp thư tiếp đón của bạn đang trống. Khi khách du lịch hoặc digital nomad gửi tin nhắn hỏi phòng, trải nghiệm làng nghề hoặc đặt chỗ, các cuộc hội thoại sẽ xuất hiện tại đây.
                </p>

                {/* Redirect Button to Host listings/management screen */}
                <div className="flex flex-col sm:flex-row items-center gap-3 w-full justify-center">
                  <button
                    onClick={onNavigateListings || onNavigateHome || onBack}
                    type="button"
                    className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-300 text-[#002116] font-bold text-sm flex items-center justify-center gap-2 shadow-lg hover:shadow-amber-400/30 active:scale-95 transition-all cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-lg">view_list</span>
                    <span>Xem danh sách phòng & dịch vụ của tôi</span>
                  </button>

                  {/* Convenient test button to demo incoming English inquiries & translation */}
                  <button
                    onClick={handleSeedSampleGuest}
                    type="button"
                    className="w-full sm:w-auto px-4 py-3 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-white font-medium text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                    title="Mở hội thoại thử nghiệm từ khách quốc tế Sarah Johnson"
                  >
                    <span className="material-symbols-outlined text-sm text-emerald-300">play_arrow</span>
                    <span>Thử nghiệm tin nhắn từ khách</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Conversation Threads List for Host */
              <div className="space-y-3 w-full animate-fadeIn pb-24">
                <div className="flex items-center justify-between px-1 mb-1">
                  <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                    <span className="material-symbols-outlined text-amber-300 text-lg">mark_email_unread</span>
                    <span>Cuộc trò chuyện tiếp đón khách</span>
                  </h3>
                  <span className="text-xs text-amber-300 font-semibold bg-amber-400/15 px-2.5 py-0.5 rounded-full border border-amber-400/30">
                    {conversations.length} khách liên hệ
                  </span>
                </div>

                <div className="divide-y divide-white/10 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md overflow-hidden shadow-xl">
                  {conversations.map((conv) => (
                    <div
                      key={conv.id}
                      onClick={() => handleOpenConversation(conv)}
                      className="p-4 hover:bg-white/10 active:bg-white/15 transition-all cursor-pointer flex items-center gap-3.5 group"
                    >
                      <div className="relative shrink-0">
                        <img
                          src={conv.guestAvatar}
                          alt={conv.guestName}
                          className="w-12 h-12 rounded-full object-cover border-2 border-amber-300/80 shadow"
                        />
                        <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-black" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-sm font-bold text-white truncate group-hover:text-amber-300 transition-colors flex items-center gap-1.5">
                            <span>{conv.guestName}</span>
                            <span className="text-[10px] text-emerald-300 font-normal">
                              {conv.guestCountry || '✈️ Khách quốc tế'}
                            </span>
                          </h4>
                          <span className="text-[11px] text-white/50 shrink-0 ml-2">
                            {conv.lastTime}
                          </span>
                        </div>

                        <div className="flex items-center justify-between gap-2">
                          <p className="text-xs text-emerald-100/70 truncate font-normal">
                            {conv.lastMessage}
                          </p>
                          {conv.unreadCount > 0 && (
                            <span className="w-5 h-5 rounded-full bg-amber-400 text-[#002116] text-[10px] font-bold flex items-center justify-center shrink-0 shadow">
                              {conv.unreadCount}
                            </span>
                          )}
                        </div>

                        <div className="mt-1 flex items-center gap-2">
                          <span className="text-[10px] text-amber-300 font-medium px-2 py-0.5 rounded bg-amber-400/10 border border-amber-400/20 truncate max-w-[220px]">
                            {conv.propertyTitle || 'Yêu cầu đặt phòng'}
                          </span>
                        </div>
                      </div>

                      <span className="material-symbols-outlined text-white/30 group-hover:text-white/80 group-hover:translate-x-0.5 transition-all text-lg shrink-0">
                        chevron_right
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* ========================================================================= */}
      {/* 3. HOST BOTTOM INPUT & TRANSLATION TOOLBAR (ONLY IN ACTIVE CHAT)          */}
      {/* ========================================================================= */}
      {isInActiveChat && (
        <div className="shrink-0 w-full px-3 sm:px-4 pt-2 pb-2 mb-20 sm:mb-24 z-30 animate-fadeIn">
          <div className="max-w-4xl mx-auto bg-[#00281b]/95 backdrop-blur-xl border border-white/15 rounded-2xl p-2.5 sm:p-3 shadow-2xl flex flex-col gap-2">
            
            {/* Quick Reply Chips for Host */}
            {showQuickChips && (
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 pt-0.5">
                <span className="text-[10px] text-amber-300 font-bold uppercase shrink-0 flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">bolt</span>
                  <span>Trả lời nhanh:</span>
                </span>
                {HOST_QUICK_REPLIES.map((chip, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleApplyQuickReply(chip)}
                    className="px-3 py-1 rounded-full bg-white/10 hover:bg-amber-400/20 hover:border-amber-400/40 border border-white/10 text-white hover:text-amber-200 text-xs whitespace-nowrap transition-all cursor-pointer active:scale-95 shrink-0"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            )}

            {/* Input Row */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <div className="flex-1 relative flex items-center">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Nhập tin nhắn trả lời khách..."
                  className="w-full h-11 pl-4 pr-3 bg-black/30 border border-white/15 rounded-xl text-sm text-white placeholder:text-white/40 focus:border-amber-400 outline-none transition-colors"
                />
              </div>

              {/* Send Button */}
              <button
                type="submit"
                disabled={!input.trim()}
                className="h-11 px-5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-300 text-[#002116] font-bold text-sm flex items-center justify-center gap-1.5 transition-all shadow-md hover:shadow-amber-400/20 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shrink-0"
              >
                <span>Gửi</span>
                <span className="material-symbols-outlined text-lg">send</span>
              </button>
            </form>

            {/* Translation Settings & Live Preview Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 pt-1 border-t border-white/10 text-xs">
              
              {/* Optional Toggle Switch: 'Tự động dịch sang tiếng Anh trước khi gửi' */}
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={autoTranslateToEnglish}
                  onChange={(e) => setAutoTranslateToEnglish(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-amber-500 focus:ring-amber-400 accent-amber-400 cursor-pointer"
                />
                <span className="text-[11px] sm:text-xs text-emerald-200 font-medium">
                  Tự động dịch sang tiếng Anh trước khi gửi
                </span>
              </label>

              {/* Quick chips toggle button */}
              <button
                type="button"
                onClick={() => setShowQuickChips(prev => !prev)}
                className="text-[11px] text-white/50 hover:text-white self-end sm:self-auto cursor-pointer"
              >
                {showQuickChips ? 'Ẩn câu trả lời nhanh' : 'Hiện câu trả lời nhanh'}
              </button>
            </div>

            {/* Live Translation Preview Box (When host types in Vietnamese and toggle is on) */}
            {autoTranslateToEnglish && translatedPreview && (
              <div className="p-2 sm:p-2.5 rounded-xl bg-amber-400/10 border border-amber-400/30 text-amber-200 text-xs leading-relaxed animate-fadeIn flex items-start gap-2">
                <span className="material-symbols-outlined text-amber-300 text-sm mt-0.5 shrink-0">translate</span>
                <div className="flex-1 min-w-0">
                  <span className="font-bold text-[11px] text-amber-300 uppercase tracking-wider block">
                    Bản xem trước tiếng Anh cho khách:
                  </span>
                  <p className="text-white font-medium italic mt-0.5 break-words">
                    "{translatedPreview}"
                  </p>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};

export default HostChatScreen;
