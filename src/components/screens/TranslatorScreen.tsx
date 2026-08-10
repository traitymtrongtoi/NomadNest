import React, { useState, useEffect } from 'react';
import { CULTURAL_PHRASES } from '../../data/mockData';

interface TranslatorScreenProps {
  onBack?: () => void;
}

export const TranslatorScreen: React.FC<TranslatorScreenProps> = ({ onBack }) => {
  const [sourceLang, setSourceLang] = useState<'EN' | 'VI'>('EN');
  const [text, setText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [activeCategory, setActiveCategory] = useState<'all' | 'common' | 'craft' | 'slang' | 'dos_and_donts'>('all');
  const [isListening, setIsListening] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeInputMode, setActiveInputMode] = useState<'text' | 'voice' | 'camera'>('text');

  // Camera Translation Mode states
  const [cameraImage, setCameraImage] = useState<string | null>(null);
  const [cameraTranslationResult, setCameraTranslationResult] = useState<string | null>(null);
  const [isScanningCamera, setIsScanningCamera] = useState(false);

  // Auto-translate effect when text changes - Strict 1:1 literal translation engine
  useEffect(() => {
    const trimmed = text.trim();
    if (!trimmed) {
      setTranslatedText('');
      return;
    }

    const timer = setTimeout(() => {
      setIsTranslating(true);
      setTimeout(() => {
        const lower = trimmed.toLowerCase().replace(/[.,?!;:]/g, '');

        if (sourceLang === 'EN') {
          // Strict EN -> VI 1:1 mapping
          const exactMapEnVi: Record<string, string> = {
            'hello': 'Xin chào',
            'hi': 'Xin chào',
            'good morning': 'Chào buổi sáng',
            'good afternoon': 'Chào buổi chiều',
            'good evening': 'Chào buổi tối',
            'goodbye': 'Tạm biệt',
            'bye': 'Tạm biệt',
            'thank you': 'Cảm ơn',
            'thanks': 'Cảm ơn',
            'how much': 'Bao nhiêu tiền?',
            'how much is it': 'Cái này bao nhiêu tiền?',
            'how much does it cost': 'Cái này giá bao nhiêu?',
            'price': 'Giá cả',
            'where is it': 'Nó ở đâu?',
            'where is': 'Ở đâu',
            'bathroom': 'Phòng vệ sinh',
            'toilet': 'Phòng vệ sinh',
            'water': 'Nước',
            'food': 'Thức ăn',
            'menu': 'Thực đơn',
            'bill': 'Hóa đơn',
            'check please': 'Tính tiền',
            'delicious': 'Ngon',
            'help': 'Giúp tôi',
            'help me': 'Cứu tôi / Giúp tôi',
            'yes': 'Có',
            'no': 'Không',
            'sorry': 'Xin lỗi',
            'excuse me': 'Xin lỗi',
            'discount': 'Giảm giá',
            'cheaper': 'Rẻ hơn',
            'fish sauce': 'Nước mắm',
            'nam o fish sauce': 'Nước mắm Nam Ô',
            'craft village': 'Làng nghề',
            'room': 'Phòng',
            'wifi': 'Wifi',
            'pass': 'Mật khẩu',
            'how much is a bottle of authentic nam o fish sauce': 'Một chai nước mắm Nam Ô nguyên chất giá bao nhiêu?'
          };

          if (exactMapEnVi[lower]) {
            setTranslatedText(exactMapEnVi[lower]);
          } else if (lower.startsWith('how much is')) {
            const rest = lower.replace('how much is', '').trim();
            setTranslatedText(`${rest ? rest : 'Cái này'} giá bao nhiêu?`);
          } else if (lower.startsWith('where is')) {
            const rest = lower.replace('where is', '').trim();
            setTranslatedText(`${rest ? rest : 'Nó'} ở đâu?`);
          } else {
            // General clean word-by-word / phrase fallback without any added context
            const dict: Record<string, string> = {
              'how': 'thế nào',
              'much': 'bao nhiêu',
              'is': 'là',
              'are': 'là',
              'the': '',
              'a': 'một',
              'an': 'một',
              'bottle': 'chai',
              'of': 'của',
              'authentic': 'nguyên chất',
              'fish': 'cá',
              'sauce': 'nước mắm',
              'price': 'giá',
              'room': 'phòng',
              'wifi': 'wifi',
              'password': 'mật khẩu',
              'where': 'ở đâu',
              'what': 'cái gì',
              'who': 'ai',
              'when': 'khi nào',
              'why': 'tại sao',
              'buy': 'mua',
              'sell': 'bán',
              'good': 'tốt',
              'bad': 'xấu'
            };

            const translatedWords = trimmed.split(' ').map(w => {
              const cleanW = w.toLowerCase().replace(/[.,?!;:]/g, '');
              return dict[cleanW] !== undefined ? dict[cleanW] : w;
            }).filter(Boolean).join(' ');

            setTranslatedText(translatedWords || trimmed);
          }
        } else {
          // Strict VI -> EN 1:1 mapping
          const exactMapViEn: Record<string, string> = {
            'xin chào': 'Hello',
            'chào': 'Hello',
            'chào buổi sáng': 'Good morning',
            'tạm biệt': 'Goodbye',
            'cảm ơn': 'Thank you',
            'bao nhiêu': 'How much?',
            'bao nhiêu tiền': 'How much money?',
            'giá bao nhiêu': 'How much does it cost?',
            'ở đâu': 'Where is it?',
            'phòng vệ sinh': 'Bathroom',
            'nước': 'Water',
            'thực đơn': 'Menu',
            'tính tiền': 'Check, please',
            'ngon': 'Delicious',
            'giúp tôi': 'Help me',
            'có': 'Yes',
            'không': 'No',
            'xin lỗi': 'Sorry / Excuse me',
            'giảm giá': 'Discount',
            'nước mắm': 'Fish sauce',
            'làng nghề': 'Craft village',
            'phòng': 'Room',
            'mật khẩu wifi': 'Wifi password'
          };

          if (exactMapViEn[lower]) {
            setTranslatedText(exactMapViEn[lower]);
          } else if (lower.includes('bao nhiêu')) {
            setTranslatedText('How much is it?');
          } else if (lower.includes('ở đâu')) {
            setTranslatedText('Where is it located?');
          } else {
            setTranslatedText(trimmed);
          }
        }
        setIsTranslating(false);
      }, 250);
    }, 300);

    return () => clearTimeout(timer);
  }, [text, sourceLang]);

  const speakText = (phraseText: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(phraseText);
      utterance.lang = sourceLang === 'EN' ? 'vi-VN' : 'en-US';
      window.speechSynthesis.speak(utterance);
    } else {
      alert(`Phát âm: "${phraseText}"`);
    }
  };

  const handleCopyText = (copyVal: string) => {
    if (!copyVal) return;
    navigator.clipboard.writeText(copyVal);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleVoiceInput = () => {
    setActiveInputMode('voice');
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      setText('How much is a bottle of authentic Nam O fish sauce?');
    }, 1800);
  };

  const handleCameraScanSample = (imgUrl: string, recognizedText: string, transText: string) => {
    setCameraImage(imgUrl);
    setIsScanningCamera(true);
    setCameraTranslationResult(null);
    setTimeout(() => {
      setIsScanningCamera(false);
      setCameraTranslationResult(transText);
    }, 1200);
  };

  const filteredPhrases = activeCategory === 'all'
    ? CULTURAL_PHRASES
    : CULTURAL_PHRASES.filter(p => p.category === activeCategory);

  return (
    <div className="bg-gradient-to-b from-[#00281D] via-[#001D15] to-[#00120D] text-white min-h-screen pb-28 font-sans">
      {/* Top Header */}
      <header className="fixed top-0 w-full z-50 bg-[#00281D]/95 backdrop-blur-xl flex items-center justify-between px-5 h-16 border-b border-white/10 shadow-lg">
        {onBack ? (
          <button onClick={onBack} className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-xl">arrow_back</span>
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-emerald-400 text-xl">g_translate</span>
            <span className="font-extrabold text-base text-white">Nomad Translator</span>
          </div>
        )}
        <h1 className="font-extrabold text-base text-white">Phiên Dịch Viên Văn Hóa</h1>
        <div className="w-10" />
      </header>

      <main className="pt-20 px-4 max-w-xl mx-auto space-y-6">
        {/* Language Switch Bar (Minimalist Google Translate Style) */}
        <div className="bg-black/30 backdrop-blur-md rounded-2xl p-1.5 border border-white/15 flex items-center justify-between shadow-md">
          <button
            onClick={() => setSourceLang(sourceLang === 'EN' ? 'VI' : 'EN')}
            className="flex-1 py-2 text-center text-xs font-bold text-emerald-300 hover:text-white transition-colors"
          >
            {sourceLang === 'EN' ? 'Tiếng Anh (English)' : 'Tiếng Việt'}
          </button>

          <button
            onClick={() => setSourceLang(sourceLang === 'EN' ? 'VI' : 'EN')}
            className="w-9 h-9 rounded-full bg-emerald-500 text-white flex items-center justify-center hover:rotate-180 transition-transform duration-300 shadow cursor-pointer"
            title="Đổi ngôn ngữ"
          >
            <span className="material-symbols-outlined text-lg">swap_horiz</span>
          </button>

          <button
            onClick={() => setSourceLang(sourceLang === 'EN' ? 'VI' : 'EN')}
            className="flex-1 py-2 text-center text-xs font-bold text-emerald-300 hover:text-white transition-colors"
          >
            {sourceLang === 'EN' ? 'Tiếng Việt' : 'Tiếng Anh (English)'}
          </button>
        </div>

        {/* Seamless Translation Workspace (Google Translate Style) */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/15 rounded-3xl p-5 shadow-2xl space-y-4 relative overflow-hidden">
          {activeInputMode !== 'camera' ? (
            <>
              {/* Text Input Area */}
              <div className="relative min-h-[110px] flex flex-col justify-between">
                <textarea
                  rows={3}
                  value={text}
                  onChange={e => {
                    setText(e.target.value);
                    if (activeInputMode !== 'text') setActiveInputMode('text');
                  }}
                  placeholder={sourceLang === 'EN' ? 'Nhập văn bản hoặc bấm micro để nói...' : 'Type text or press mic to speak...'}
                  className="w-full bg-transparent text-white placeholder:text-white/40 text-lg font-medium outline-none resize-none leading-relaxed"
                />
                {text && (
                  <button
                    onClick={() => { setText(''); setTranslatedText(''); }}
                    className="absolute top-0 right-0 w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-base">close</span>
                  </button>
                )}
              </div>

              {/* Seamless Subtle Divider Line */}
              <div className="w-full h-px bg-white/15 my-2" />

              {/* Clean Translation Result Section */}
              <div className="min-h-[90px] relative flex flex-col justify-between pt-1">
                {isTranslating ? (
                  <div className="flex items-center gap-2 text-xs text-emerald-300 font-medium">
                    <span className="material-symbols-outlined animate-spin text-base">sync</span>
                    <span>Đang dịch ngôn ngữ...</span>
                  </div>
                ) : translatedText ? (
                  <div className="space-y-4 pb-8">
                    {/* Direct Clean Translation Display without AI prefixes */}
                    <p className="text-xl font-bold text-emerald-300 leading-relaxed pr-12">
                      {translatedText}
                    </p>

                    {/* Neat Output Actions in Bottom Right Corner */}
                    <div className="absolute bottom-0 right-0 flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15">
                      <button
                        onClick={() => speakText(translatedText)}
                        className="p-1.5 rounded-full hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer"
                        title="Phát âm"
                      >
                        <span className="material-symbols-outlined text-lg">volume_up</span>
                      </button>
                      <button
                        onClick={() => handleCopyText(translatedText)}
                        className="p-1.5 rounded-full hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer relative"
                        title="Sao chép"
                      >
                        <span className="material-symbols-outlined text-lg">
                          {copied ? 'check' : 'content_copy'}
                        </span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-white/30 italic">
                    {sourceLang === 'EN' ? 'Bản dịch tiếng Việt sẽ xuất hiện trực tiếp tại đây...' : 'English translation will appear here directly...'}
                  </p>
                )}
              </div>

              {/* 3 CIRCULAR TOOLBAR BUTTONS (Text, Voice Mic, Camera) */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-center gap-6">
                {/* Button 1: Keyboard / Text */}
                <button
                  type="button"
                  onClick={() => setActiveInputMode('text')}
                  className={`w-12 h-12 rounded-full flex flex-col items-center justify-center transition-all cursor-pointer shadow-md ${
                    activeInputMode === 'text'
                      ? 'bg-white/20 text-white border border-white/30 scale-105'
                      : 'bg-black/30 text-white/70 hover:bg-white/10 border border-white/10'
                  }`}
                  title="Nhập văn bản"
                >
                  <span className="material-symbols-outlined text-xl">keyboard</span>
                </button>

                {/* Button 2: Voice Mic (Prominent Center Button) */}
                <button
                  type="button"
                  onClick={handleVoiceInput}
                  className={`w-16 h-16 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-xl ${
                    isListening
                      ? 'bg-red-500 text-white border-2 border-red-300 animate-pulse scale-110'
                      : 'bg-gradient-to-tr from-emerald-500 to-teal-400 text-white hover:scale-105 border-2 border-white/30'
                  }`}
                  title="Dịch bằng Giọng Nói"
                >
                  <span className="material-symbols-outlined text-2xl">mic</span>
                </button>

                {/* Button 3: Camera Translation */}
                <button
                  type="button"
                  onClick={() => setActiveInputMode('camera')}
                  className={`w-12 h-12 rounded-full flex flex-col items-center justify-center transition-all cursor-pointer shadow-md ${
                    activeInputMode === 'camera'
                      ? 'bg-white/20 text-white border border-white/30 scale-105'
                      : 'bg-black/30 text-white/70 hover:bg-white/10 border border-white/10'
                  }`}
                  title="Dịch qua Camera / Biển báo"
                >
                  <span className="material-symbols-outlined text-xl">photo_camera</span>
                </button>
              </div>
            </>
          ) : (
            /* CAMERA TRANSLATION MODE VIEW */
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-400 text-xl">photo_camera</span>
                  <span className="font-bold text-sm text-white">Dịch Bằng Camera & Biển Báo</span>
                </div>
                <button
                  onClick={() => {
                    setActiveInputMode('text');
                    setCameraImage(null);
                    setCameraTranslationResult(null);
                  }}
                  className="text-xs text-white/60 hover:text-white underline cursor-pointer"
                >
                  Đóng camera
                </button>
              </div>

              {/* Camera Scanner Container */}
              <div className="relative w-full aspect-video bg-black/60 rounded-2xl overflow-hidden border border-emerald-400/30 flex flex-col items-center justify-center text-center p-4">
                {cameraImage ? (
                  <div className="relative w-full h-full">
                    <img src={cameraImage} alt="Menu / Sign Scan" className="w-full h-full object-cover rounded-xl" />
                    {isScanningCamera && (
                      <div className="absolute inset-0 bg-black/50 backdrop-blur-xs flex flex-col items-center justify-center">
                        <span className="material-symbols-outlined animate-spin text-3xl text-emerald-400 mb-1">sync</span>
                        <p className="text-xs font-bold text-white">Đang quét chữ trên ảnh...</p>
                      </div>
                    )}
                    {cameraTranslationResult && (
                      <div className="absolute bottom-2 left-2 right-2 bg-black/85 backdrop-blur-md p-3 rounded-xl border border-emerald-400/40 text-left animate-fadeIn">
                        <span className="text-[9px] uppercase font-bold text-emerald-400 tracking-wider block mb-0.5">Bản dịch camera:</span>
                        <p className="text-xs font-bold text-white leading-snug">{cameraTranslationResult}</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center mx-auto border border-emerald-400/30">
                      <span className="material-symbols-outlined text-2xl">document_scanner</span>
                    </div>
                    <p className="text-xs font-bold text-white">Chụp ảnh hoặc chọn hình ảnh Thực Đơn / Biển Báo Làng Nghề</p>
                    <p className="text-[11px] text-white/60">Quét chữ trực tiếp bằng camera trên điện thoại</p>
                  </div>
                )}
              </div>

              {/* Sample Scans for Testing */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase text-emerald-300 tracking-wider">Thử nghiệm chụp biển báo / menu thực tế:</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleCameraScanSample(
                      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80',
                      'Nước mắm Nam Ô truyền thống',
                      'Authentic Traditional Nam O Fish Sauce - Aged 12 months in wooden barrels'
                    )}
                    className="p-2.5 bg-black/30 hover:bg-white/10 border border-white/15 rounded-xl text-left transition-all cursor-pointer flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-emerald-400 text-lg">restaurant_menu</span>
                    <div>
                      <p className="text-xs font-bold text-white">Biển Làng Nghề</p>
                      <p className="text-[10px] text-white/60">Quét bảng hiệu xưởng</p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleCameraScanSample(
                      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80',
                      'Bánh tráng Túy Loan nướng than hồng',
                      'Tuy Loan Charcoal-Grilled Rice Paper - Special Local Snack'
                    )}
                    className="p-2.5 bg-black/30 hover:bg-white/10 border border-white/15 rounded-xl text-left transition-all cursor-pointer flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-emerald-400 text-lg">local_dining</span>
                    <div>
                      <p className="text-xs font-bold text-white">Menu Ẩm Thực</p>
                      <p className="text-[10px] text-white/60">Dịch món ăn địa phương</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Return to text mode */}
              <button
                type="button"
                onClick={() => setActiveInputMode('text')}
                className="w-full py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
              >
                Chuyển về nhập bàn phím
              </button>
            </div>
          )}
        </div>

        {/* Cultural Dictionary & Essential Phrases */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-extrabold text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-emerald-400">menu_book</span>
              Từ Vựng Văn Hóa Làng Nghề
            </h2>
          </div>

          {/* Categories Horizontal Filter */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {[
              { id: 'all', label: 'Tất cả' },
              { id: 'common', label: 'Thông dụng' },
              { id: 'craft', label: 'Làng Nghề' },
              { id: 'slang', label: 'Tiếng lóng Đà Nẵng' },
              { id: 'dos_and_donts', label: 'Ứng xử' }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-emerald-500 text-white shadow-md'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Phrase Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {filteredPhrases.map(item => (
              <div
                key={item.id}
                className="bg-white/5 border border-white/10 rounded-2xl p-3.5 flex items-center justify-between hover:bg-white/10 transition-colors cursor-pointer group"
                onClick={() => speakText(item.vietnamese)}
              >
                <div>
                  <h3 className="text-sm font-bold text-white">{item.vietnamese}</h3>
                  <p className="text-xs text-emerald-300 mt-0.5">{item.english}</p>
                  {item.pronunciation && (
                    <span className="text-[10px] text-white/50 block italic">[{item.pronunciation}]</span>
                  )}
                </div>
                <button
                  type="button"
                  className="w-8 h-8 rounded-full bg-white/10 text-emerald-300 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-colors cursor-pointer shrink-0 ml-2"
                >
                  <span className="material-symbols-outlined text-base">volume_up</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

