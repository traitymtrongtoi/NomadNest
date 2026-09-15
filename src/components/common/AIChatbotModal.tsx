import React, { useState, useRef, useEffect } from 'react';

interface AIChatbotModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
}

export const AIChatbotModal: React.FC<AIChatbotModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'bot',
      text: 'Hello! I am your NomadNest Sheep AI Assistant 🐑! I can help you find craft villages, advise on co-living stays, Wi-Fi, Grab transport, or local Da Nang culture. How can I help you today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const quickQuestions = [
    'Is there strong Wi-Fi in Nam O Village?',
    'How to book a Grab ride to craft villages?',
    'How much is pottery making experience?',
    'Quiet co-working spots near the beach?'
  ];

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    // Simulate AI response logic
    setTimeout(() => {
      let botReply = 'Thank you for your question! NomadNest connects you with over 15 craft village workshops across Da Nang, ready to welcome travelers and remote workers with 100+ Mbps high-speed Wi-Fi.';

      const lower = text.toLowerCase();
      if (lower.includes('wifi') || lower.includes('nam o') || lower.includes('nam ô')) {
        botReply = 'Nam O Fish Sauce Village homestays feature 150 Mbps fiber-optic Wi-Fi, standard ergonomic workspaces for Digital Nomads, and stunning ocean views! 🌊💻';
      } else if (lower.includes('grab') || lower.includes('ride') || lower.includes('transport') || lower.includes('xe')) {
        botReply = 'You can tap the 3D "Grab" icon on the Home screen to book rides from Da Nang Airport to Non Nuoc Stone Village or Nam O. Fares range from 80,000 to 150,000 VND. 🚕';
      } else if (lower.includes('price') || lower.includes('pottery') || lower.includes('cost') || lower.includes('gốm') || lower.includes('tiền')) {
        botReply = 'Craft workshop passes (pottery, mat weaving, fish sauce brewing) average 120,000 - 250,000 VND per session, including artisan guidance and finished products to take home! 🏺';
      } else if (lower.includes('quiet') || lower.includes('beach') || lower.includes('co-working') || lower.includes('yên tĩnh')) {
        botReply = 'Great recommendations for you: Man Thai Fishery Homestay or Tuy Loan Rice Paper Village Villa featuring quiet green spaces, perfect for focused online work. 🌿';
      }

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: botReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#00281D] border border-white/20 rounded-3xl w-full max-w-lg h-[580px] text-white shadow-2xl flex flex-col relative overflow-hidden">
        
        {/* Header */}
        <div className="p-4 bg-emerald-950/90 border-b border-white/10 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-white flex items-center justify-center text-2xl shadow-lg border border-white/30">
              🐑
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-extrabold text-base text-white">NomadNest AI Assistant</h2>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <p className="text-[11px] text-emerald-300">Cultural & village stay advisor</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>

        {/* Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 no-scrollbar bg-gradient-to-b from-[#00281D] to-[#001D15]">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'bot' && (
                <div className="w-7 h-7 rounded-full bg-emerald-600 text-white text-xs flex items-center justify-center shrink-0 border border-white/20 shadow">
                  🐑
                </div>
              )}

              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-xs md:text-sm leading-relaxed shadow-md ${
                  msg.sender === 'user'
                    ? 'bg-emerald-600 text-white rounded-br-none'
                    : 'bg-white/10 text-white border border-white/15 rounded-bl-none backdrop-blur-md'
                }`}
              >
                {msg.text}
                <div className="text-[9px] text-white/50 text-right mt-1 font-mono">{msg.timestamp}</div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-emerald-300">
              <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-[10px] flex items-center justify-center">🐑</span>
              <span className="animate-pulse">AI Assistant is responding...</span>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Quick Question Chips */}
        <div className="px-3 py-2 bg-black/20 border-t border-white/10 flex gap-2 overflow-x-auto no-scrollbar shrink-0">
          {quickQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="px-3 py-1 bg-white/10 hover:bg-emerald-600/80 border border-white/15 text-[11px] font-medium text-emerald-200 hover:text-white rounded-full whitespace-nowrap transition-colors cursor-pointer shrink-0"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-3 bg-emerald-950/90 border-t border-white/10 flex items-center gap-2 shrink-0"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask Sheep AI about craft villages, Wi-Fi, Grab..."
            className="flex-1 h-10 px-4 bg-black/30 border border-white/20 rounded-xl text-xs text-white placeholder:text-white/40 focus:border-emerald-400 outline-none"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="h-10 px-4 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1 cursor-pointer"
          >
            <span>Send</span>
            <span className="material-symbols-outlined text-sm">send</span>
          </button>
        </form>

      </div>
    </div>
  );
};
