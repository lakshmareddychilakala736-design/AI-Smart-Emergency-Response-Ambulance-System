import React, { useState } from 'react';
import { Bot, Send, X, ShieldAlert, Sparkles, User } from 'lucide-react';
import { aiAPI } from '../services/api';

export const AIChatbotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'bot'; text: string; emergencyAlert?: boolean }>>([
    { sender: 'bot', text: 'Hello! I am LifeLine AI Medical Assistant. Describe any emergency symptoms or ask for first-aid guidance.' }
  ]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { sender: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const res = await aiAPI.chatbot(userMsg);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: res.reply,
          emergencyAlert: res.is_emergency_triggered
        }
      ]);
    } catch {
      setMessages((prev) => [...prev, { sender: 'bot', text: "Emergency response system active. If severe, press the red SOS button immediately." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 p-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl shadow-2xl shadow-blue-600/50 flex items-center space-x-2 border border-blue-400/30 transition-all hover:scale-105"
      >
        <Bot className="w-6 h-6 animate-pulse" />
        <span className="text-xs font-bold hidden sm:inline">AI Emergency Assistant</span>
      </button>

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-2rem)] bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl z-50 overflow-hidden flex flex-col h-[500px] animate-in fade-in slide-in-from-bottom-4">
          
          {/* Header */}
          <div className="p-4 bg-slate-800/80 border-b border-slate-700 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="p-2 bg-blue-600/20 text-blue-400 rounded-xl">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">LifeLine Triage AI</h4>
                <p className="text-[10px] text-emerald-400 font-medium">● 24/7 Clinical Assistant Active</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white p-1">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex space-x-2 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center shrink-0 text-xs font-bold">
                    AI
                  </div>
                )}
                <div
                  className={`max-w-[80%] p-3 rounded-2xl text-xs ${
                    m.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : m.emergencyAlert
                      ? 'bg-red-500/20 border border-red-500/40 text-red-200 rounded-bl-none'
                      : 'bg-slate-800 text-slate-200 border border-slate-700/60 rounded-bl-none'
                  }`}
                >
                  {m.emergencyAlert && (
                    <div className="flex items-center space-x-1 font-bold text-red-400 mb-1">
                      <ShieldAlert className="w-3.5 h-3.5" />
                      <span>CRITICAL TRIAGE ADVISORY</span>
                    </div>
                  )}
                  {m.text}
                </div>
                {m.sender === 'user' && (
                  <div className="w-7 h-7 rounded-xl bg-slate-700 text-slate-300 flex items-center justify-center shrink-0 text-xs">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="text-xs text-slate-500 italic text-center">AI analyzing clinical triage...</div>
            )}
          </div>

          {/* Input Box */}
          <div className="p-3 border-t border-slate-800 bg-slate-900/90 flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about symptoms or first aid..."
              className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={handleSend}
              className="p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}
    </>
  );
};
