import React, { useState, useEffect, useRef } from 'react';
import {
  StoredChatMessage,
  CHAT_STORAGE_KEY,
  getStoredChatMessages,
  saveStoredChatMessage
} from '../../utils/chatStorage';
import { getCurrentUserFromStorage, CurrentUserProfile } from '../../utils/userStorage';
import { EmergencyModal } from '../common/EmergencyModal';
import { AIChatbotModal } from '../common/AIChatbotModal';

interface HostChatScreenProps {
  onBack: () => void;
}

export const HostChatScreen: React.FC<HostChatScreenProps> = ({ onBack }) => {
  const [activeChat, setActiveChat] = useState<boolean>(true); // Default active thread with Guest
  const [currentUser, setCurrentUser] = useState<CurrentUserProfile>(() => getCurrentUserFromStorage('local_host'));
  const [messages, setMessages] = useState<StoredChatMessage[]>(getStoredChatMessages);
  const [newMessageText, setNewMessageText] = useState('');
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Load and sync real-time localStorage & host user profile
  useEffect(() => {
    const syncData = () => {
      setMessages(getStoredChatMessages());
      setCurrentUser(getCurrentUserFromStorage('local_host'));
    };

    syncData();

    const handleStorageChange = (e: StorageEvent | Event) => {
      if ('key' in e && e.key && e.key !== CHAT_STORAGE_KEY && e.key !== 'currentUser') return;
      syncData();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('nomad_chat_updated', handleStorageChange);
    window.addEventListener('nomad_user_updated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('nomad_chat_updated', handleStorageChange);
      window.removeEventListener('nomad_user_updated', handleStorageChange);
    };
  }, []);

  // Auto-scroll to bottom on message updates
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, activeChat]);

  const handleSendMessage = () => {
    if (!newMessageText.trim()) return;
    const updated = saveStoredChatMessage('host', currentUser.name, newMessageText);
    setMessages(updated);
    setNewMessageText('');
  };

  const lastMessage = messages.length > 0 ? messages[messages.length - 1] : null;
  // Get guest partner name dynamically from chat history
  const guestMsg = messages.find((m) => m.senderRole === 'guest');
  const activeGuestName = guestMsg ? guestMsg.senderName : 'Sarah Johnson';

  return (
    <div className="bg-[#002116] text-white min-h-screen pb-28 font-sans">
      {/* Top Sticky Header */}
      <header className="fixed top-0 w-full z-50 bg-[#002116]/95 backdrop-blur-xl flex items-center justify-between px-4 sm:px-6 h-16 border-b border-white/10 shadow-lg">
        <button
          onClick={onBack}
          type="button"
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer active:scale-95 shrink-0"
          title="Quay lại Host Dashboard"
        >
          <span className="material-symbols-outlined text-xl">arrow_back</span>
        </button>

        <div className="text-center">
          <h1 className="font-extrabold text-base text-white tracking-wide">
            {activeChat ? 'Trò Chuyện Với Khách Thuê' : 'Quản Lý Khách Thuê'}
          </h1>
          <p className="text-[10px] text-[#8bd6b6] font-semibold">
            Host: <span className="underline font-bold">{currentUser.name}</span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Emergency Phone Icon */}
          <button
            onClick={() => setIsEmergencyOpen(true)}
            className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#003829] to-emerald-600 text-white shadow-md flex items-center justify-center active:scale-95 border border-white/30 hover:border-emerald-300 transition-all cursor-pointer group relative shrink-0"
            title="Liên hệ khẩn cấp 24/7"
          >
            <span className="material-symbols-outlined text-lg drop-shadow group-hover:scale-110 transition-transform">
              phone_in_talk
            </span>
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500 border border-white animate-pulse" />
          </button>

          {/* AI Chatbot Sheep Icon */}
          <button
            onClick={() => setIsChatbotOpen(true)}
            className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-md flex items-center justify-center active:scale-95 border border-white/30 hover:border-emerald-200 transition-all cursor-pointer group relative text-base shrink-0"
            title="Trợ lý AI NomadNest (Cừu 🐑)"
          >
            <span className="group-hover:scale-110 transition-transform drop-shadow">
              🐑
            </span>
            <span className="absolute -top-1 -right-1 px-1 py-0.2 rounded-full bg-emerald-400 text-emerald-950 font-extrabold text-[7px] border border-white shadow">
              AI
            </span>
          </button>
        </div>
      </header>

      <main className="pt-20 px-4 sm:px-6 max-w-2xl mx-auto space-y-4">
        {/* Current Active Host Identity Pill */}
        <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img
              src={currentUser.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80'}
              alt={currentUser.name}
              className="w-8 h-8 rounded-full object-cover border border-[#8bd6b6]"
            />
            <div className="text-xs">
              <span className="text-white/60 block text-[10px]">Tài khoản Host đang trả lời:</span>
              <span className="font-extrabold text-white text-xs">{currentUser.name}</span>
            </div>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-[#8bd6b6] border border-emerald-500/30">
            Superhost
          </span>
        </div>

        {!activeChat ? (
          /* Conversations List View */
          <div className="space-y-3">
            <div className="bg-emerald-950/40 border border-emerald-500/20 rounded-2xl p-3.5 flex items-center gap-3">
              <span className="material-symbols-outlined text-emerald-400 text-2xl">roofing</span>
              <div className="text-xs">
                <span className="font-bold text-white block">Quản lý giao tiếp khách hàng</span>
                <span className="text-white/70">Mở 2 tab trình duyệt (Guest & Host) để kiểm tra tin nhắn đồng bộ tức thì.</span>
              </div>
            </div>

            <div
              onClick={() => setActiveChat(true)}
              className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-4 flex items-center justify-between hover:bg-white/10 transition-all cursor-pointer shadow-lg active:scale-[0.99]"
            >
              <div className="flex items-center gap-3 min-w-0 pr-2">
                <div className="relative shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                    alt={activeGuestName}
                    className="w-12 h-12 rounded-full object-cover border border-white/20"
                  />
                  <span className="w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-[#002116] absolute bottom-0 right-0 shadow" />
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h2 className="font-extrabold text-sm sm:text-base text-white truncate">{activeGuestName}</h2>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-[#8bd6b6] border border-emerald-500/30">
                      Check-in 15/10
                    </span>
                  </div>
                  <p className="text-xs text-white/70 truncate mt-1">
                    {lastMessage ? `${lastMessage.senderName}: ${lastMessage.text}` : 'Chưa có tin nhắn'}
                  </p>
                </div>
              </div>

              <div className="text-right flex flex-col items-end gap-1 shrink-0">
                <span className="text-[10px] text-white/50">{lastMessage?.timestamp || 'Mới'}</span>
                <span className="w-2.5 h-2.5 bg-[#8bd6b6] rounded-full animate-pulse" />
              </div>
            </div>
          </div>
        ) : (
          /* Active Chat Thread Window (Real-time Storage Sync) */
          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-4 sm:p-5 shadow-2xl flex flex-col h-[75vh]">
            {/* Thread Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                  alt={activeGuestName}
                  className="w-10 h-10 rounded-full object-cover border border-white/20"
                />
                <div>
                  <h3 className="font-extrabold text-sm sm:text-base text-white">{activeGuestName} (Khách Thuê Remote)</h3>
                  <span className="text-[10px] font-semibold text-emerald-400 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Trực tuyến ● Đồng bộ Real-time (Tab Sync)</span>
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActiveChat(false)}
                className="text-xs text-[#8bd6b6] hover:text-white px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
              >
                Danh sách
              </button>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto space-y-3.5 pr-1 py-1">
              {messages.map((m) => {
                const isMine = m.senderRole === 'host';
                return (
                  <div
                    key={m.id}
                    className={`flex flex-col ${isMine ? 'items-end' : 'items-start'}`}
                  >
                    <span className="text-[10px] text-white/50 mb-1 px-1 font-semibold">
                      {isMine ? currentUser.name : m.senderName}
                    </span>
                    <div
                      className={`max-w-[85%] sm:max-w-[78%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed ${
                        isMine
                          ? 'bg-[#8bd6b6] text-[#002116] rounded-br-none font-bold shadow-md'
                          : 'bg-white/15 text-white rounded-bl-none border border-white/15 shadow'
                      }`}
                    >
                      {m.text}
                    </div>
                    <span className="text-[9px] text-white/40 mt-1 px-1">{m.timestamp}</span>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input Bar */}
            <div className="border-t border-white/10 pt-3 flex items-center gap-2 mt-2">
              <input
                type="text"
                value={newMessageText}
                onChange={(e) => setNewMessageText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder={`Trả lời với tư cách Host ${currentUser.name}...`}
                className="flex-1 bg-white/10 border border-white/20 rounded-full px-4 py-2.5 text-xs sm:text-sm text-white placeholder:text-white/40 outline-none focus:border-[#8bd6b6] transition-colors"
              />
              <button
                type="button"
                onClick={handleSendMessage}
                className="w-10 h-10 rounded-full bg-[#8bd6b6] text-[#002116] flex items-center justify-center hover:bg-[#72c2a0] transition-all shadow cursor-pointer active:scale-95 shrink-0"
                title="Gửi tin nhắn"
              >
                <span className="material-symbols-outlined text-lg font-bold">send</span>
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Floating Action Buttons (FABs) - Synchronized with Guest */}
      <div className="fixed bottom-24 right-5 flex flex-col gap-3.5 z-40 items-end">
        {/* FAB 1: Emergency Contact (Liên hệ khẩn cấp) */}
        <button
          onClick={() => setIsEmergencyOpen(true)}
          className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-[#003829] to-emerald-600 text-white shadow-2xl flex items-center justify-center active:scale-92 border-2 border-white/40 hover:border-emerald-300 transition-all cursor-pointer group relative"
          title="Liên hệ khẩn cấp 24/7"
        >
          <span className="material-symbols-outlined text-2xl drop-shadow group-hover:scale-110 transition-transform">
            phone_in_talk
          </span>
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-red-500 border-2 border-white animate-pulse" />
        </button>

        {/* FAB 2: AI Chatbot Sheep (Trợ lý con cừu NomadNest) */}
        <button
          onClick={() => setIsChatbotOpen(true)}
          className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-2xl flex items-center justify-center active:scale-92 border-2 border-white/40 hover:border-emerald-200 transition-all cursor-pointer group relative text-2xl"
          title="Trợ lý AI NomadNest (Cừu 🐑)"
        >
          <span className="group-hover:scale-115 transition-transform drop-shadow">
            🐑
          </span>
          <span className="absolute -top-1 -right-1 px-1.5 py-0.5 rounded-full bg-emerald-400 text-emerald-950 font-extrabold text-[9px] border border-white shadow">
            AI
          </span>
        </button>
      </div>

      {/* Modals */}
      <EmergencyModal
        isOpen={isEmergencyOpen}
        onClose={() => setIsEmergencyOpen(false)}
      />
      <AIChatbotModal
        isOpen={isChatbotOpen}
        onClose={() => setIsChatbotOpen(false)}
      />
    </div>
  );
};
