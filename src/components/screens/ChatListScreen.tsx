import React, { useState } from 'react';

export default function ChatScreen() {
  // Khởi tạo mảng tin nhắn trống tuyệt đối, không có bất kỳ dữ liệu mẫu nào
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');

  const handleSendMessage = () => {
    if (!input.trim()) return;
    const newMessage = {
      id: Date.now(),
      text: input,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, newMessage]);
    setInput('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#0B291A', padding: '16px', color: '#FFF' }}>
      {/* Khu vực hiển thị tin nhắn */}
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', justifyContent: messages.length === 0 ? 'center' : 'flex-start', alignItems: messages.length === 0 ? 'center' : 'stretch' }}>
        {messages.length === 0 ? (
          <p style={{ color: '#888', fontStyle: 'italic', textAlign: 'center' }}>
            Chưa có tin nhắn nào. Cuộc trò chuyện sẽ xuất hiện khi có tương tác thực tế!
          </p>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} style={{ 
              alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              backgroundColor: msg.sender === 'user' ? '#6EE7B7' : '#1F422E',
              color: msg.sender === 'user' ? '#000' : '#FFF',
              padding: '10px 14px',
              borderRadius: '12px',
              margin: '4px 0',
              maxWidth: '75%'
            }}>
              <div>{msg.text}</div>
              <div style={{ fontSize: '10px', opacity: 0.7, textAlign: 'right', marginTop: '2px' }}>{msg.time}</div>
            </div>
          ))
        )}
      </div>

      {/* Ô nhập tin nhắn */}
      <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Nhập tin nhắn..." 
              style={{ flex: 1, padding: '12px', borderRadius: '24px', border: 'none', backgroundColor: '#1F422E', color: '#FFF', outline: 'none' }}
            />
            <button 
              onClick={handleSendMessage}
              style={{ padding: '12px 20px', borderRadius: '24px', backgroundColor: '#6EE7B7', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}
            >
              Gửi
            </button>
      </div>
    </div>
  );
}

export const ChatListScreen = ChatScreen;
export const HostChatScreen = ChatScreen;
