import { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Bot, User, Loader2, Sparkles } from 'lucide-react';

// ==========================================
// 1. BACKEND INTEGRATION SERVICE
// ==========================================
const apiService = {
  async sendMessage(conversationHistory, newMessageText) {
    /* 
      BACKEND CONNECTION EXAMPLE:
      const response = await fetch('https://your-api.com/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: conversationHistory, prompt: newMessageText }),
      });
      const data = await response.json();
      return data.reply;
    */

    // Simulated response delay:
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`Received: "${newMessageText}". How can I help you further?`);
      }, 1000);
    });
  }
};

// ==========================================
// 2. FLOATING CHAT WIDGET COMPONENT
// ==========================================
export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: '1',
      sender: 'bot',
      text: 'Hi there! 👋 Need any help?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll inside popover on message update
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isLoading, isOpen]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const trimmedInput = input.trim();
    if (!trimmedInput || isLoading) return;

    const userMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: trimmedInput,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const botReplyText = await apiService.sendMessage(messages, trimmedInput);
      const botMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: botReplyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Failed to send message:', error);
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: 'Something went wrong. Please try again.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isError: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      
      {/* CHAT POPOVER BOX */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-[360px] sm:w-[380px] h-[500px] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          
          {/* Header */}
          <header className="flex items-center justify-between px-4 py-3 bg-slate-900/90 backdrop-blur border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                  <Bot className="w-4 h-4" />
                </div>
                <span className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-500 rounded-full ring-2 ring-slate-900"></span>
              </div>
              <div>
                <h3 className="text-xs font-semibold text-slate-100 flex items-center gap-1">
                  Support Assistant
                  <Sparkles className="w-3 h-3 text-amber-400 fill-amber-400" />
                </h3>
                <p className="text-[10px] text-slate-400">Usually replies instantly</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors"
              aria-label="Close Chat"
            >
              <X className="w-4 h-4" />
            </button>
          </header>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-950/40">
            {messages.map((msg) => {
              const isBot = msg.sender === 'bot';
              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2 ${isBot ? 'justify-start' : 'justify-end'}`}
                >
                  {isBot && (
                    <div className="w-6 h-6 rounded-md bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0 mt-0.5">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <div
                    className={`max-w-[82%] rounded-xl px-3 py-2 text-xs leading-relaxed ${
                      isBot
                        ? msg.isError
                          ? 'bg-rose-500/10 border border-rose-500/30 text-rose-200 rounded-tl-none'
                          : 'bg-slate-800/90 border border-slate-700/50 text-slate-200 rounded-tl-none'
                        : 'bg-indigo-600 text-white rounded-tr-none shadow-sm'
                    }`}
                  >
                    <p className="whitespace-pre-wrap break-words">{msg.text}</p>
                    <span
                      className={`block text-[9px] mt-1 ${
                        isBot ? 'text-slate-400' : 'text-indigo-200/80'
                      } text-right`}
                    >
                      {msg.timestamp}
                    </span>
                  </div>

                  {!isBot && (
                    <div className="w-6 h-6 rounded-md bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 shrink-0 mt-0.5">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              );
            })}

            {isLoading && (
              <div className="flex items-start gap-2 justify-start">
                <div className="w-6 h-6 rounded-md bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <div className="bg-slate-800/90 border border-slate-700/50 rounded-xl rounded-tl-none px-3 py-2 flex items-center gap-2 text-slate-400 text-xs">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-400" />
                  <span>Thinking...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <footer className="p-3 bg-slate-900 border-t border-slate-800">
            <form onSubmit={handleSendMessage} className="relative flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question..."
                disabled={isLoading}
                className="w-full bg-slate-950 text-slate-100 placeholder-slate-500 text-xs rounded-lg pl-3 pr-10 py-2.5 border border-slate-800 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 disabled:opacity-50 transition-all"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="absolute right-1.5 p-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md disabled:opacity-40 disabled:hover:bg-indigo-600 transition-all"
              >
                {isLoading ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Send className="w-3.5 h-3.5" />
                )}
              </button>
            </form>
          </footer>
        </div>
      )}

      {/* FLOATING TRIGGER BUTTON */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full flex items-center justify-center shadow-lg shadow-indigo-600/30 transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-950"
        aria-label="Toggle Chat"
      >
        {isOpen ? (
          <X className="w-6 h-6 transition-transform duration-200 rotate-90" />
        ) : (
          <MessageSquare className="w-6 h-6" />
        )}
      </button>
    </div>
  );
}
