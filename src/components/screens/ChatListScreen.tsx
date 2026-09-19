import React, { useState, useRef, useEffect, useMemo } from 'react';
import { CurrentUserProfile, getCurrentUserFromStorage } from '../../utils/userStorage';
import { User } from '../../types';
import { supabase } from '../../lib/supabase';
import HostChatScreen from './HostChatScreen';

export interface ChatMessage {
  id: string | number;
  text: string;
  sender: 'user' | 'host';
  time: string;
  senderName?: string;
  senderAvatar?: string;
}

export interface ChatHostInfo {
  id?: string;
  hostId?: string;
  name: string;
  role?: string;
  avatar?: string;
  village?: string;
  propertyTitle?: string;
  status?: string;
}

export interface ConversationItem {
  id: string; // conversation ID
  hostId: string;
  hostName: string;
  hostRole?: string;
  hostAvatar: string;
  village: string;
  propertyTitle?: string;
  lastMessage: string;
  lastTime: string;
  unreadCount: number;
  messages: ChatMessage[];
}

export interface ChatScreenProps {
  currentUser?: CurrentUserProfile | User | null;
  userRole?: 'host' | 'guest';
  hostId?: string | null;
  conversationId?: string | null;
  activeHost?: ChatHostInfo | null;
  onBack?: () => void;
  onNavigateHome?: () => void;
  onNavigateExplore?: () => void;
  onNavigateListings?: () => void;
  onOpenNotifications?: () => void;
  onCloseChat?: () => void;
}

const CONVERSATIONS_STORAGE_KEY = 'nomadnest_chat_conversations';

// Helper to load conversations from localStorage
function getStoredConversations(): ConversationItem[] {
  try {
    const raw = localStorage.getItem(CONVERSATIONS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (err) {
    console.error('Error reading conversations from storage:', err);
  }
  return [];
}

// Helper to save conversations to localStorage
function saveConversationsToStorage(conversations: ConversationItem[]) {
  try {
    localStorage.setItem(CONVERSATIONS_STORAGE_KEY, JSON.stringify(conversations));
    window.dispatchEvent(new Event('nomadnest_conversations_updated'));
  } catch (err) {
    console.error('Error saving conversations to storage:', err);
  }
}

export default function ChatScreen({
  currentUser: propCurrentUser,
  userRole,
  hostId: propHostId,
  conversationId: propConversationId,
  activeHost: propActiveHost,
  onBack,
  onNavigateHome,
  onNavigateExplore,
  onNavigateListings,
  onOpenNotifications,
  onCloseChat
}: ChatScreenProps) {
  // 1. Resolve user info
  const currentUser = propCurrentUser || getCurrentUserFromStorage('nomad_user');

  // Role-Based Isolation: When in Host / Artisan Mode (userRole === 'host' or role === 'local_host'),
  // strictly render the dedicated Host Inbox flow instead of the Guest flow!
  const isHost = userRole === 'host' || currentUser?.role === 'local_host';
  if (isHost) {
    return (
      <HostChatScreen
        currentUser={currentUser}
        userRole="host"
        conversationId={propConversationId}
        activeHost={propActiveHost}
        onBack={onBack}
        onNavigateHome={onNavigateHome}
        onNavigateExplore={onNavigateExplore}
        onNavigateListings={onNavigateListings}
        onOpenNotifications={onOpenNotifications}
        onCloseChat={onCloseChat}
      />
    );
  }

  // 2. All stored conversations
  const [conversations, setConversations] = useState<ConversationItem[]>(() => getStoredConversations());

  // 3. Active conversation state (null = Default State / Inbox list)
  const [activeConversation, setActiveConversation] = useState<ConversationItem | null>(null);

  // Chat input state
  const [input, setInput] = useState('');
  const [isHostTyping, setIsHostTyping] = useState(false);

  // Ref for auto scroll to bottom
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Refresh conversations from storage
  const syncConversations = () => {
    const stored = getStoredConversations();
    setConversations(stored);
  };

  useEffect(() => {
    window.addEventListener('nomadnest_conversations_updated', syncConversations);
    window.addEventListener('storage', syncConversations);
    return () => {
      window.removeEventListener('nomadnest_conversations_updated', syncConversations);
      window.removeEventListener('storage', syncConversations);
    };
  }, []);

  // Check Supabase messages table if exists
  useEffect(() => {
    let isMounted = true;
    async function checkSupabaseMessages() {
      try {
        const { data, error } = await supabase
          .from('messages')
          .select('*')
          .limit(10);
        if (!error && data && data.length > 0 && isMounted) {
          // If server messages exist, we can merge them
          console.log('Supabase messages detected:', data.length);
        }
      } catch (err) {
        // Supabase table may not exist yet, fallback to localStorage
      }
    }
    checkSupabaseMessages();
    return () => {
      isMounted = false;
    };
  }, []);

  // 4. Handle navigation props: if a valid hostId, conversationId, or activeHost is provided, open Active Chat State!
  useEffect(() => {
    const targetHostId = propHostId || propActiveHost?.id || propActiveHost?.hostId;
    const targetConvId = propConversationId;

    if (targetConvId) {
      const existing = conversations.find(c => c.id === targetConvId);
      if (existing) {
        setActiveConversation(existing);
        return;
      }
    }

    if (targetHostId || propActiveHost) {
      // Find conversation by hostId
      const existing = conversations.find(c => c.hostId === (targetHostId || ''));
      if (existing) {
        setActiveConversation(existing);
      } else if (propActiveHost) {
        // Initialize a new conversation thread for this host
        const newThread: ConversationItem = {
          id: 'conv_' + Date.now(),
          hostId: targetHostId || ('host_' + Date.now()),
          hostName: propActiveHost.name,
          hostAvatar: propActiveHost.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
          hostRole: propActiveHost.role || 'Chủ nhà làng nghề',
          village: propActiveHost.village || 'Làng nghề Đà Nẵng',
          propertyTitle: propActiveHost.propertyTitle,
          lastMessage: 'Cuộc trò chuyện mới',
          lastTime: 'Vừa xong',
          unreadCount: 0,
          messages: []
        };
        const updated = [newThread, ...conversations];
        saveConversationsToStorage(updated);
        setConversations(updated);
        setActiveConversation(newThread);
      }
    } else {
      // No target host/conversation passed via props -> ensure we show Default Inbox State
      setActiveConversation(null);
    }
  }, [propHostId, propConversationId, propActiveHost]);

  // Scroll to bottom when messages or typing status update
  const scrollToBottom = (smooth = true) => {
    messagesEndRef.current?.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' });
  };

  useEffect(() => {
    if (activeConversation) {
      scrollToBottom(true);
    }
  }, [activeConversation?.messages, isHostTyping]);

  // Handle opening a conversation from the Inbox list
  const handleOpenConversation = (conv: ConversationItem) => {
    // Clear unread count
    const updated = conversations.map(c => c.id === conv.id ? { ...c, unreadCount: 0 } : c);
    saveConversationsToStorage(updated);
    setConversations(updated);
    setActiveConversation({ ...conv, unreadCount: 0 });
  };

  // Handle returning from Active Chat back to Inbox list
  const handleBackToInbox = () => {
    setActiveConversation(null);
    if (onCloseChat) {
      onCloseChat();
    }
  };

  // Handle Sending a Message in Active Chat
  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || !activeConversation) return;

    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: ChatMessage = {
      id: 'msg_' + Date.now(),
      text,
      sender: 'user',
      time: currentTime,
      senderName: currentUser?.name || 'Bạn',
      senderAvatar: currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
    };

    const updatedMessages = [...activeConversation.messages, userMsg];
    const updatedConv: ConversationItem = {
      ...activeConversation,
      messages: updatedMessages,
      lastMessage: text,
      lastTime: currentTime,
      unreadCount: 0
    };

    const newConversations = conversations.map(c => c.id === updatedConv.id ? updatedConv : c);
    if (!newConversations.some(c => c.id === updatedConv.id)) {
      newConversations.unshift(updatedConv);
    }

    saveConversationsToStorage(newConversations);
    setConversations(newConversations);
    setActiveConversation(updatedConv);
    setInput('');

    // Simulated responsive host reply
    setIsHostTyping(true);
    setTimeout(() => {
      setIsHostTyping(false);
      const hostReplies = [
        `Chào bạn! Rất vui được đón tiếp bạn tại ${updatedConv.village}. Chỗ ở của chúng mình luôn có wifi cáp quang tốc độ cao chuyên cho digital nomad làm việc.`,
        `Dạ có ạ! Làng nghề luôn mở cửa và sẵn sàng hướng dẫn bạn trải nghiệm làm nghề truyền thống cùng các nghệ nhân.`,
        `Cảm ơn bạn đã nhắn tin! Bạn dự kiến ghé làng vào ngày nào để mình sắp xếp phòng chu đáo nhất nhé?`
      ];
      const randomReply = hostReplies[Math.floor(Math.random() * hostReplies.length)];

      const hostMsg: ChatMessage = {
        id: 'host_msg_' + Date.now(),
        text: randomReply,
        sender: 'host',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        senderName: updatedConv.hostName,
        senderAvatar: updatedConv.hostAvatar
      };

      const finalMessages = [...updatedMessages, hostMsg];
      const finalConv: ConversationItem = {
        ...updatedConv,
        messages: finalMessages,
        lastMessage: randomReply,
        lastTime: hostMsg.time
      };

      const finalConversations = getStoredConversations().map(c => c.id === finalConv.id ? finalConv : c);
      saveConversationsToStorage(finalConversations);
      setConversations(finalConversations);
      setActiveConversation(finalConv);
    }, 1200);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Suggested questions for quick interaction from active chat empty state
  const quickQuestions = [
    'Chào chủ nhà! Phòng có bàn làm việc và wifi cáp quang mạnh không?',
    'Làng có các workshop trải nghiệm làng nghề truyền thống không ạ?',
    'Từ trung tâm thành phố di chuyển về homestay mất khoảng bao lâu?'
  ];

  // Helper redirect to explore
  const handleRedirectToExplore = () => {
    if (onNavigateExplore) {
      onNavigateExplore();
    } else if (onNavigateHome) {
      onNavigateHome();
    } else if (onBack) {
      onBack();
    }
  };

  // Determine if in Active Chat State vs Default Inbox State
  const isInActiveChat = Boolean(activeConversation);

  return (
    <div className="h-screen flex flex-col justify-between bg-gradient-to-b from-[#0A3D2F] via-[#05261C] to-[#001710] text-white overflow-hidden relative font-sans">
      
      {/* ========================================================================= */}
      {/* 1. TOP HEADER                                                             */}
      {/* ========================================================================= */}
      <header className="h-16 shrink-0 bg-[#0F6B57]/90 backdrop-blur-xl shadow-md border-b border-white/10 flex items-center justify-between px-4 sm:px-6 z-20">
        
        {/* Left Section */}
        <div className="flex items-center gap-2.5">
          {isInActiveChat ? (
            /* Active Chat: Back button returns to Inbox list */
            <button
              onClick={handleBackToInbox}
              type="button"
              className="p-1.5 rounded-full hover:bg-white/10 text-white/90 hover:text-white transition-colors cursor-pointer flex items-center gap-1"
              title="Quay lại danh sách hộp thư"
              aria-label="Quay lại hộp thư"
            >
              <span className="material-symbols-outlined text-2xl">arrow_back</span>
            </button>
          ) : (
            /* Default Inbox: Optional Back button if passed */
            onBack && (
              <button
                onClick={onBack}
                type="button"
                className="p-1.5 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
                title="Quay lại"
                aria-label="Quay lại"
              >
                <span className="material-symbols-outlined text-xl">arrow_back</span>
              </button>
            )
          )}

          {/* Logo & Brand Title */}
          <div
            onClick={isInActiveChat ? handleBackToInbox : onNavigateHome}
            className="flex items-center gap-2 cursor-pointer hover:opacity-90 active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-primary-fixed text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              spa
            </span>
            <div className="flex flex-col">
              <span className="font-bold text-lg sm:text-xl text-white tracking-tight leading-none">
                NomadNest
              </span>
              <span className="text-[10px] text-emerald-200/80 font-medium">
                {isInActiveChat ? 'Cuộc trò chuyện' : 'Hộp thư làng nghề'}
              </span>
            </div>
          </div>
        </div>

        {/* Center: Host Profile Pill - ONLY rendered in Active Chat State when a host is selected */}
        {isInActiveChat && activeConversation ? (
          <div className="hidden md:flex items-center gap-2.5 px-3 py-1 bg-white/10 rounded-full border border-white/10 shadow-sm animate-fadeIn">
            <div className="relative">
              <img
                src={activeConversation.hostAvatar}
                alt={activeConversation.hostName}
                className="w-7 h-7 rounded-full object-cover border border-emerald-400"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-emerald-400 rounded-full border border-black" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-bold text-white truncate max-w-[180px] leading-tight">
                {activeConversation.hostName}
              </span>
              <span className="text-[10px] text-emerald-300 font-medium leading-tight">
                {activeConversation.village}
              </span>
            </div>
          </div>
        ) : (
          /* Default Inbox: Neutral Title / Badge in Center on desktop */
          <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10">
            <span className="material-symbols-outlined text-emerald-300 text-sm">inbox</span>
            <span className="text-xs font-semibold text-emerald-100 tracking-wide uppercase">
              Hộp thư ({conversations.length})
            </span>
          </div>
        )}

        {/* Right Section: Notifications & User Avatar */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenNotifications || (() => alert('Không có thông báo mới.'))}
            type="button"
            className="text-white/90 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors relative cursor-pointer"
            title="Thông báo"
            aria-label="Thông báo"
          >
            <span className="material-symbols-outlined text-2xl">notifications</span>
            <span className="absolute top-2 right-2 w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          </button>

          <div
            className="w-8 h-8 rounded-full overflow-hidden border-2 border-emerald-400/80 bg-white/20 shrink-0 shadow cursor-pointer"
            title={currentUser?.name || 'Tài khoản'}
          >
            <img
              src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
              alt={currentUser?.name || 'User Avatar'}
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
                src={activeConversation.hostAvatar}
                alt={activeConversation.hostName}
                className="w-7 h-7 rounded-full object-cover border border-emerald-400"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-emerald-400 rounded-full border border-black" />
            </div>
            <div>
              <p className="text-xs font-bold text-white leading-tight">{activeConversation.hostName}</p>
              <p className="text-[10px] text-emerald-300/90 leading-tight">
                {activeConversation.village} • Đang trực tuyến
              </p>
            </div>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
            {activeConversation.hostRole || 'Chủ nhà'}
          </span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. MAIN CONTENT AREA                                                      */}
      {/* ========================================================================= */}
      <main className="flex-1 overflow-y-auto min-h-0 px-4 py-4 max-w-4xl w-full mx-auto flex flex-col">
        
        {/* ----------------------------------------------------------------------- */}
        {/* STATE A: ACTIVE CHAT STATE                                              */}
        {/* ----------------------------------------------------------------------- */}
        {isInActiveChat && activeConversation ? (
          <div className="flex-1 flex flex-col justify-between">
            {activeConversation.messages.length === 0 ? (
              /* Welcoming Empty Thread state for newly started chat */
              <div className="flex-1 flex flex-col items-center justify-center text-center px-4 py-6 animate-fadeIn">
                <div className="relative mb-3">
                  <img
                    src={activeConversation.hostAvatar}
                    alt={activeConversation.hostName}
                    className="w-16 h-16 rounded-full object-cover border-2 border-emerald-400 shadow-xl"
                  />
                  <span className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-400 rounded-full border-2 border-black" />
                </div>
                <h3 className="text-lg font-bold text-white">
                  Bắt đầu trò chuyện với {activeConversation.hostName}
                </h3>
                <p className="text-xs text-emerald-200/80 max-w-xs mt-1">
                  {activeConversation.village} {activeConversation.propertyTitle ? `• ${activeConversation.propertyTitle}` : ''}
                </p>

                {/* Quick questions */}
                <div className="w-full max-w-md flex flex-col gap-2 mt-6 text-left">
                  <p className="text-[11px] font-semibold text-white/60 uppercase tracking-wider px-1">
                    Gợi ý câu hỏi nhanh:
                  </p>
                  {quickQuestions.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(q)}
                      type="button"
                      className="w-full p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-emerald-400/50 text-xs text-white/90 hover:text-white transition-all text-left flex items-center justify-between group cursor-pointer active:scale-98 shadow-sm"
                    >
                      <span className="pr-2">{q}</span>
                      <span className="material-symbols-outlined text-sm text-emerald-400 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all shrink-0">
                        arrow_forward
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              /* Active Chat Message Bubble Stream */
              <div className="flex flex-col space-y-3 w-full pb-2">
                <div className="text-center my-2">
                  <span className="text-[10px] font-semibold tracking-wider uppercase px-3 py-1 rounded-full bg-white/10 text-white/70 border border-white/10">
                    {activeConversation.hostName} • {activeConversation.village}
                  </span>
                </div>

                {activeConversation.messages.map(msg => (
                  <div
                    key={msg.id}
                    className={`flex items-end gap-2 ${
                      msg.sender === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {/* Host Avatar on incoming messages */}
                    {msg.sender === 'host' && (
                      <img
                        src={msg.senderAvatar || activeConversation.hostAvatar}
                        alt={activeConversation.hostName}
                        className="w-7 h-7 rounded-full object-cover border border-emerald-400/60 shrink-0 mb-1"
                      />
                    )}

                    <div
                      className={`max-w-[80%] sm:max-w-[70%] flex flex-col ${
                        msg.sender === 'user' ? 'items-end' : 'items-start'
                      }`}
                    >
                      {msg.sender === 'host' && (
                        <span className="text-[10px] text-emerald-300 font-semibold ml-1 mb-1">
                          {msg.senderName || activeConversation.hostName}
                        </span>
                      )}

                      <div
                        className={`p-3.5 text-sm rounded-2xl shadow-md ${
                          msg.sender === 'user'
                            ? 'bg-gradient-to-r from-emerald-500 to-[#8bd6b6] text-[#002116] font-medium rounded-tr-xs'
                            : 'bg-white/10 backdrop-blur-md text-white border border-white/10 rounded-tl-xs'
                        }`}
                      >
                        <p className="leading-relaxed whitespace-pre-wrap break-words">{msg.text}</p>
                        <div
                          className={`text-[10px] mt-1 text-right flex items-center justify-end gap-1 ${
                            msg.sender === 'user' ? 'text-[#003829]/70 font-semibold' : 'text-white/50'
                          }`}
                        >
                          <span>{msg.time}</span>
                          {msg.sender === 'user' && (
                            <span className="material-symbols-outlined text-xs">done_all</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* User Avatar on outgoing messages */}
                    {msg.sender === 'user' && (
                      <img
                        src={msg.senderAvatar || currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
                        alt="You"
                        className="w-7 h-7 rounded-full object-cover border border-white/40 shrink-0 mb-1"
                      />
                    )}
                  </div>
                ))}

                {/* Host Typing Indicator */}
                {isHostTyping && (
                  <div className="flex items-center gap-2 justify-start mt-1">
                    <img
                      src={activeConversation.hostAvatar}
                      alt={activeConversation.hostName}
                      className="w-7 h-7 rounded-full object-cover border border-emerald-400/60 shrink-0"
                    />
                    <div className="bg-white/10 backdrop-blur-md px-3 py-2 rounded-2xl rounded-tl-xs border border-white/10 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                )}

                {/* Auto Scroll Anchor */}
                <div ref={messagesEndRef} className="h-1" />
              </div>
            )}
          </div>
        ) : (
          /* --------------------------------------------------------------------- */
          /* STATE B: DEFAULT STATE (INBOX / CONVERSATION LIST)                    */
          /* --------------------------------------------------------------------- */
          <div className="flex-1 flex flex-col">
            {conversations.length === 0 ? (
              /* Clean Empty State: No active conversations */
              <div className="flex-1 flex flex-col items-center justify-center text-center px-4 py-12 animate-fadeIn">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-emerald-500/20 to-[#8bd6b6]/10 border-2 border-emerald-400/30 flex items-center justify-center text-emerald-300 shadow-xl mb-4 backdrop-blur-sm">
                  <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                    mail
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-2">
                  Chưa có cuộc trò chuyện nào
                </h2>
                
                <p className="text-sm text-emerald-200/80 max-w-md mx-auto leading-relaxed mb-8">
                  Hộp thư của bạn đang trống. Khi bạn liên hệ với chủ nhà homestay hoặc nghệ nhân làng nghề, các cuộc trò chuyện sẽ xuất hiện tại đây.
                </p>

                {/* Required Redirect Button */}
                <button
                  onClick={handleRedirectToExplore}
                  type="button"
                  className="px-6 py-3.5 rounded-full bg-gradient-to-r from-emerald-500 to-[#8bd6b6] text-[#002116] font-bold text-sm flex items-center gap-2 shadow-lg hover:shadow-emerald-500/30 active:scale-95 transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-lg">explore</span>
                  <span>Khám phá làng nghề & liên hệ chủ nhà</span>
                </button>
              </div>
            ) : (
              /* Conversation Threads List */
              <div className="space-y-3 w-full animate-fadeIn pb-24">
                <div className="flex items-center justify-between px-1 mb-2">
                  <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                    <span className="material-symbols-outlined text-emerald-400 text-lg">forum</span>
                    <span>Tất cả tin nhắn</span>
                  </h3>
                  <span className="text-xs text-emerald-300 font-semibold bg-emerald-500/20 px-2.5 py-0.5 rounded-full border border-emerald-400/30">
                    {conversations.length} cuộc hội thoại
                  </span>
                </div>

                <div className="divide-y divide-white/10 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md overflow-hidden shadow-xl">
                  {conversations.map(conv => (
                    <div
                      key={conv.id}
                      onClick={() => handleOpenConversation(conv)}
                      className="p-4 hover:bg-white/10 active:bg-white/15 transition-all cursor-pointer flex items-center gap-3.5 group"
                    >
                      <div className="relative shrink-0">
                        <img
                          src={conv.hostAvatar}
                          alt={conv.hostName}
                          className="w-12 h-12 rounded-full object-cover border-2 border-emerald-400/80 shadow"
                        />
                        <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-black" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-sm font-bold text-white truncate group-hover:text-emerald-300 transition-colors">
                            {conv.hostName}
                          </h4>
                          <span className="text-[11px] text-white/50 shrink-0 ml-2">
                            {conv.lastTime}
                          </span>
                        </div>

                        <div className="flex items-center justify-between gap-2">
                          <p className="text-xs text-emerald-100/70 truncate">
                            {conv.lastMessage}
                          </p>
                          {conv.unreadCount > 0 && (
                            <span className="w-5 h-5 rounded-full bg-emerald-400 text-[#002116] text-[10px] font-bold flex items-center justify-center shrink-0">
                              {conv.unreadCount}
                            </span>
                          )}
                        </div>

                        <div className="mt-1 flex items-center gap-2">
                          <span className="text-[10px] text-emerald-300/80 font-medium px-1.5 py-0.2 rounded bg-emerald-500/10 border border-emerald-500/20">
                            {conv.village}
                          </span>
                          {conv.propertyTitle && (
                            <span className="text-[10px] text-white/40 truncate">
                              • {conv.propertyTitle}
                            </span>
                          )}
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
      {/* 3. BOTTOM INPUT BAR                                                       */}
      {/* Strictly HIDDEN in Default State; ONLY rendered in Active Chat State!     */}
      {/* ========================================================================= */}
      {isInActiveChat && (
        <div className="shrink-0 w-full px-4 pt-2.5 pb-2 mb-20 sm:mb-24 z-30 animate-fadeIn">
          <div className="max-w-4xl mx-auto bg-[#00281b]/95 backdrop-blur-xl border border-white/15 rounded-2xl p-2 shadow-2xl">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <div className="flex-1 relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Nhập tin nhắn..."
                  className="w-full h-11 pl-4 pr-3 bg-black/30 border border-white/10 rounded-xl text-sm text-white placeholder:text-white/40 focus:border-emerald-400 outline-none transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={!input.trim()}
                className="h-11 px-5 rounded-xl bg-gradient-to-r from-emerald-500 to-[#8bd6b6] text-[#002116] font-bold text-sm flex items-center justify-center gap-1.5 transition-all shadow-md hover:shadow-emerald-500/20 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shrink-0"
              >
                <span>Gửi</span>
                <span className="material-symbols-outlined text-lg">send</span>
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export const ChatListScreen = ChatScreen;
export { default as HostChatScreen } from './HostChatScreen';
