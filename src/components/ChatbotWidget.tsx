import { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  Send, 
  X, 
  RotateCcw, 
  Sparkles, 
  MessageCircle, 
  AlertCircle, 
  Cookie,
  ChevronDown
} from 'lucide-react';

export const N8N_CHAT_WEBHOOK_URL = 'https://sowmyajarajana.app.n8n.cloud/webhook/e13ead5b-3877-49b6-9a89-19b9e1e7f89f/chat';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
  error?: boolean;
}

const QUICK_PROMPTS = [
  '🍪 What cookies do you recommend?',
  '🎁 What comes in the Festive Gift Hamper?',
  '🌶️ Which savory snacks are spicy & crunchy?',
  '🌱 Are all snacks 100% vegetarian?',
  '🚚 How does home delivery work?',
];

interface ChatbotWidgetProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

export function ChatbotWidget({ isOpen, onToggle, onClose }: ChatbotWidgetProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    // Restore prior chat if available
    try {
      const saved = localStorage.getItem('homebite_chat_messages');
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.map((m: any) => ({
          ...m,
          timestamp: new Date(m.timestamp),
        }));
      }
    } catch {
      // Fallback
    }
    return [
      {
        id: 'welcome-1',
        sender: 'bot',
        text: "Namaste! 🙏 Welcome to HomeBite Snacks. I'm your culinary assistant connected live to our kitchen team. Ask me about our ingredients, custom gift hampers, spice levels, or how to order!",
        timestamp: new Date(),
      },
    ];
  });

  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string>(() => {
    let sid = localStorage.getItem('homebite_chat_session_id');
    if (!sid) {
      sid = 'session_' + Math.random().toString(36).substring(2, 12) + '_' + Date.now();
      localStorage.setItem('homebite_chat_session_id', sid);
    }
    return sid;
  });

  const [hasUnread, setHasUnread] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync messages to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('homebite_chat_messages', JSON.stringify(messages));
    } catch (e) {
      console.warn('Failed to save chat to local storage', e);
    }
  }, [messages]);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      setHasUnread(false);
    }
  }, [messages, isOpen, isLoading]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }
  }, [isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const messageContent = (textToSend || inputMessage).trim();
    if (!messageContent || isLoading) return;

    const userMsgId = 'user_' + Date.now();
    const newUserMessage: ChatMessage = {
      id: userMsgId,
      sender: 'user',
      text: messageContent,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Send message to the specified n8n webhook URL
      const response = await fetch(N8N_CHAT_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json, text/plain, */*',
        },
        body: JSON.stringify({
          action: 'sendMessage',
          chatInput: messageContent,
          message: messageContent,
          sessionId: sessionId,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status}: ${response.statusText}`);
      }

      // Parse the response
      const contentType = response.headers.get('content-type') || '';
      let botReplyText = '';

      if (contentType.includes('application/json')) {
        const data = await response.json();
        // Support common n8n response shapes:
        // 1. { output: "text" }
        // 2. { text: "text" }
        // 3. { response: "text" }
        // 4. { message: "text" }
        // 5. [ { output: "text" } ]
        if (Array.isArray(data) && data.length > 0) {
          botReplyText = data[0].output || data[0].text || data[0].message || JSON.stringify(data[0]);
        } else if (typeof data === 'object' && data !== null) {
          botReplyText =
            data.output ||
            data.text ||
            data.response ||
            data.message ||
            data.reply ||
            (data.data && typeof data.data === 'string' ? data.data : '') ||
            (data.content && typeof data.content === 'string' ? data.content : '') ||
            JSON.stringify(data, null, 2);
        } else {
          botReplyText = String(data);
        }
      } else {
        // Plain text response
        botReplyText = await response.text();
      }

      // If empty string returned, give a friendly confirmation
      if (!botReplyText || botReplyText.trim() === '') {
        botReplyText = "I have received your message! If you need urgent assistance with an order, you can also reach our kitchen team directly on WhatsApp.";
      }

      const botMessage: ChatMessage = {
        id: 'bot_' + Date.now(),
        sender: 'bot',
        text: botReplyText,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      if (!isOpen) {
        setHasUnread(true);
      }
    } catch (err: any) {
      console.error('Error contacting n8n chatbot webhook:', err);
      const errorMessage: ChatMessage = {
        id: 'bot_err_' + Date.now(),
        sender: 'bot',
        text: `Unable to connect to the assistant (${err?.message || 'Network error'}). You can try again or reach our team directly via WhatsApp!`,
        timestamp: new Date(),
        error: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    const newSid = 'session_' + Math.random().toString(36).substring(2, 12) + '_' + Date.now();
    setSessionId(newSid);
    localStorage.setItem('homebite_chat_session_id', newSid);
    const initialWelcome: ChatMessage = {
      id: 'welcome-' + Date.now(),
      sender: 'bot',
      text: "Chat cleared! How may I help you today with HomeBite Snacks?",
      timestamp: new Date(),
    };
    setMessages([initialWelcome]);
    localStorage.removeItem('homebite_chat_messages');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const openWhatsAppFallback = () => {
    const text = encodeURIComponent(
      "Hi HomeBite Snacks! 👋 I was chatting with your online assistant and would like to ask a question."
    );
    window.open(`https://wa.me/919845012345?text=${text}`, '_blank');
  };

  return (
    <>
      {/* Floating Chat Trigger Button */}
      <div className="fixed bottom-5 right-5 z-40 flex items-center gap-3">
        {!isOpen && (
          <div className="hidden sm:flex items-center gap-2 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-lg border border-[#E5E0D8] text-xs font-semibold text-[#292524] animate-bounce-short">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Chat with us</span>
          </div>
        )}

        <button
          onClick={onToggle}
          className={`relative flex items-center justify-center p-3.5 sm:px-4 sm:py-3 rounded-full shadow-2xl transition-all duration-300 cursor-pointer active:scale-95 ${
            isOpen
              ? 'bg-[#292524] text-white hover:bg-black'
              : 'bg-[#C25E2E] hover:bg-[#A84E24] text-white'
          }`}
          aria-label={isOpen ? 'Close Chatbot' : 'Open Snack Chatbot'}
        >
          {isOpen ? (
            <ChevronDown className="w-6 h-6" />
          ) : (
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 shrink-0" />
              <span className="hidden sm:inline text-xs font-bold tracking-wide">
                Snack Assistant
              </span>
            </div>
          )}

          {/* Unread indicator */}
          {!isOpen && hasUnread && (
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-amber-500" />
            </span>
          )}
        </button>
      </div>

      {/* Chat Window Panel */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 sm:right-6 z-50 w-[92vw] sm:w-[410px] max-h-[82vh] h-[580px] bg-[#FAF7F2] rounded-2xl shadow-2xl border border-[#E7E2DA] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
          
          {/* Header */}
          <div className="bg-[#292524] text-white px-4 py-3.5 flex items-center justify-between shrink-0 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#C25E2E] flex items-center justify-center text-white shadow-inner relative">
                <Bot className="w-5 h-5" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-[#292524]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-bold font-serif tracking-wide text-white">
                    HomeBite Assistant
                  </h3>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-amber-200 font-medium">
                    AI
                  </span>
                </div>
                <p className="text-[11px] text-white/70 flex items-center gap-1">
                  <span>Connected to n8n webhook</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleClearChat}
                className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                title="Reset conversation"
                aria-label="Reset conversation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={onClose}
                className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                title="Close chat"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Webhook Status / Info Bar */}
          <div className="bg-[#F5EFE6] px-3.5 py-1.5 border-b border-[#E7E2DA] flex items-center justify-between text-[11px] text-[#57534E]">
            <span className="flex items-center gap-1 truncate max-w-[280px]">
              <Sparkles className="w-3 h-3 text-[#C25E2E] shrink-0" />
              <span className="truncate">Instant homemade snack answers & orders</span>
            </span>
            <button
              onClick={openWhatsAppFallback}
              className="text-[#166534] font-semibold hover:underline flex items-center gap-1 shrink-0 ml-2"
              title="Open WhatsApp if needed"
            >
              <MessageCircle className="w-3 h-3 fill-current" />
              <span>WhatsApp</span>
            </button>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-gradient-to-b from-[#FAF7F2] to-[#F5EFE6]">
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-1`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed shadow-sm ${
                      isUser
                        ? 'bg-[#C25E2E] text-white rounded-br-xs'
                        : msg.error
                        ? 'bg-rose-50 text-rose-900 border border-rose-200 rounded-bl-xs'
                        : 'bg-white text-[#292524] border border-[#E5E0D8] rounded-bl-xs'
                    }`}
                  >
                    {msg.error && (
                      <div className="flex items-center gap-1.5 font-bold text-rose-700 mb-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>Connection notice</span>
                      </div>
                    )}
                    <div className="whitespace-pre-wrap break-words">{msg.text}</div>
                    
                    {msg.error && (
                      <div className="mt-2 pt-2 border-t border-rose-200/60 flex items-center gap-2">
                        <button
                          onClick={() => handleSendMessage(messages[messages.length - 2]?.text)}
                          className="px-2 py-1 bg-white hover:bg-rose-100 text-rose-800 text-[10px] font-semibold rounded border border-rose-300 transition-colors cursor-pointer"
                        >
                          Retry
                        </button>
                        <button
                          onClick={openWhatsAppFallback}
                          className="px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-semibold rounded transition-colors cursor-pointer"
                        >
                          Chat on WhatsApp
                        </button>
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] text-[#A8A29E] px-1">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              );
            })}

            {/* Loading / Typing indicator */}
            {isLoading && (
              <div className="flex items-start space-y-1">
                <div className="bg-white border border-[#E5E0D8] rounded-2xl rounded-bl-xs px-4 py-3 shadow-sm flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#C25E2E] animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-2 h-2 rounded-full bg-[#C25E2E] animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-2 h-2 rounded-full bg-[#C25E2E] animate-bounce" />
                  </div>
                  <span className="text-[11px] text-[#78716C] ml-1">Baking a response...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Question Chips (shown when no messages or only welcome message) */}
          {messages.length <= 2 && !isLoading && (
            <div className="px-3.5 py-2 bg-[#F5EFE6] border-t border-[#E7E2DA] overflow-x-auto">
              <p className="text-[10px] uppercase font-semibold text-[#78716C] mb-1.5">
                Suggested questions:
              </p>
              <div className="flex flex-wrap gap-1.5">
                {QUICK_PROMPTS.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(prompt)}
                    className="text-[11px] bg-white hover:bg-[#FAF7F2] text-[#44403C] hover:text-[#C25E2E] px-2.5 py-1 rounded-full border border-[#DCD7CE] transition-all whitespace-nowrap cursor-pointer active:scale-95 shadow-xs"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Bar */}
          <div className="p-3 bg-white border-t border-[#E7E2DA] shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about snacks, ingredients, gifts..."
                disabled={isLoading}
                className="flex-1 bg-[#FAF7F2] border border-[#D6D0C5] focus:border-[#C25E2E] focus:bg-white rounded-xl px-3.5 py-2.5 text-xs text-[#292524] placeholder-[#A8A29E] outline-none transition-all disabled:opacity-50"
              />

              <button
                type="submit"
                disabled={!inputMessage.trim() || isLoading}
                className="p-2.5 bg-[#C25E2E] hover:bg-[#A84E24] disabled:bg-[#D6D0C5] text-white rounded-xl transition-all shadow-sm cursor-pointer disabled:cursor-not-allowed active:scale-95 shrink-0"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-1.5 flex items-center justify-between text-[10px] text-[#A8A29E] px-1">
              <span className="flex items-center gap-1">
                <Cookie className="w-3 h-3 text-[#C25E2E]" />
                <span>HomeBite Snacks Assistant</span>
              </span>
              <span>Webhook Active</span>
            </div>
          </div>

        </div>
      )}
    </>
  );
}
