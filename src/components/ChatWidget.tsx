import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { getChatReply } from '../services/chat.service.mock';

type Role = 'guest' | 'student' | 'doctor' | 'editor' | 'admin';

export const ChatWidget: React.FC<{ role?: Role }> = ({ role = 'guest' }) => {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Array<{ from: 'user' | 'bot'; text: string; ts: string }>>([]);
  const [typing, setTyping] = useState(false);
  const scrollingRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollingRef.current) {
      scrollingRef.current.scrollTop = scrollingRef.current.scrollHeight;
    }
  }, [messages, open]);

  const addMessage = (from: 'user' | 'bot', text: string) => {
    const ts = new Date().toLocaleTimeString();
    setMessages((m) => [...m, { from, text, ts }].slice(-50));
  };

  const send = async () => {
    if (!input.trim()) return;
    const userText = input.trim();
    addMessage('user', userText);
    setInput('');
    setTyping(true);
    // small UX delay
    await new Promise((r) => setTimeout(r, 600));
    const reply = await getChatReply(userText, role);
    setTyping(false);
    addMessage('bot', reply);
  };

  const clearChat = () => setMessages([]);

  return (
    <div className="fixed right-6 bottom-6 z-50" aria-live="polite">
      {open ? (
        <div className="w-80 md:w-96 bg-card shadow-2xl rounded-lg overflow-hidden flex flex-col ring-1 ring-border">
          <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-primary/80 to-secondary/80 text-primary-foreground">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-primary/20 rounded-full flex items-center justify-center">💬</div>
              <div>
                <div className="font-semibold">{t('المساعدة الذكية', 'Smart Help')}</div>
                <div className="text-xs opacity-80">{role === 'guest' ? t('زائر', 'Guest') : role}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button aria-label={t('مسح المحادثة', 'Clear chat')} onClick={clearChat} className="text-sm opacity-80 hover:opacity-100">{t('مسح', 'Clear')}</button>
              <button aria-label={t('إغلاق الدردشة', 'Close chat')} onClick={() => setOpen(false)} className="text-xl font-bold leading-none">×</button>
            </div>
          </div>

          <div ref={scrollingRef} className="p-3 flex-1 overflow-y-auto h-64 space-y-3 bg-gradient-to-b from-card/40 to-transparent">
            {messages.length === 0 && (
              <div className="text-sm text-muted-foreground">{t('مرحباً! اسألني عن الموقع أو الخدمات.', 'Hi! Ask me about the site or services.')}</div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className="max-w-[80%]">
                  <div className={`inline-block px-3 py-2 rounded-lg ${m.from === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                    <div className="text-sm whitespace-pre-wrap">{m.text}</div>
                  </div>
                  <div className={`text-[10px] mt-1 ${m.from === 'user' ? 'text-right' : 'text-left'} opacity-70`}>{m.ts}</div>
                </div>
              </div>
            ))}

            {typing && (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">🤖</div>
                <div className="bg-muted px-3 py-2 rounded-lg">
                  <div className="flex items-center gap-1">
                    <span className="h-2 w-2 bg-secondary rounded-full animate-pulse inline-block" />
                    <span className="h-2 w-2 bg-secondary rounded-full animate-pulse inline-block delay-75" />
                    <span className="h-2 w-2 bg-secondary rounded-full animate-pulse inline-block delay-150" />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-3 border-t bg-card">
            <label htmlFor="chat-input" className="sr-only">{t('حقل الدردشة', 'Chat input')}</label>
            <div className="flex gap-2">
              <input
                id="chat-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') send(); }}
                placeholder={t('اكتب سؤالك هنا...', 'Type your question...')}
                className="flex-1 rounded-md border border-border px-3 py-2 text-sm"
                aria-label={t('اكتب سؤالك هنا', 'Type your question')}
              />
              <button onClick={send} aria-label={t('إرسال', 'Send')} className="px-4 py-2 rounded-md bg-secondary text-secondary-foreground text-sm">
                {t('إرسال', 'Send')}
              </button>
            </div>
            <div className="text-xs text-muted-foreground mt-2">{t('دردشة تجريبية — لبيئة الإنتاج، صِل بواجهة خدمة خارجية.', 'Demo chat — connect to external API for production.')}</div>
          </div>
        </div>
      ) : (
        <button aria-label={t('فتح الدردشة', 'Open chat')} onClick={() => setOpen(true)} className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary text-white shadow-lg flex items-center justify-center text-2xl">💬</button>
      )}
    </div>
  );
};

export default ChatWidget;
