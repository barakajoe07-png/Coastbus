import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Phone, MessageSquare, ArrowLeft, ArrowRight, RefreshCw, Star, Info, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  waLink?: string;
  waLabel?: string;
  showHelpContact?: boolean;
}

const FAQ_DATA = [
  {
    id: 'print',
    question: 'How do I print or track my ticket?',
    answer: 'To print or track your ticket, please click the "Print" tab in the bottom navigation. Simply enter your Reference Number (received via SMS or Email) to instantly preview or download your boarding pass. If you cannot find your reference, our 24/7 support team can retrieve and print your ticket directly for you!',
    waLink: 'https://wa.me/254754303484?text=Hi%20Buscar!%20I%20need%20help%20printing%20or%20tracking%20my%20bus%20ticket.',
    waLabel: 'Chat Now'
  },
  {
    id: 'fares',
    question: 'Coach ticket fares and discounts',
    answer: 'Our executive express coach ticket fares vary by destination. For instance, Nairobi to Mombasa is KES 1500–2500, Nairobi to Kampala is KES 2500–5000, and Nairobi to Malindi is KES 2000 flat! Children under 3 travel free if sitting on a guardian\'s lap. Want to check group discounts or seasonal promo codes?',
    waLink: 'https://wa.me/254754303484?text=Hi%20Buscar!%20I%20would%20like%20to%20inquire%20about%20ticket%20fares%20and%20group%20discounts.',
    waLabel: 'Chat Now'
  },
  {
    id: 'baggage',
    question: 'Baggage limits and cargo shipping',
    answer: 'Each passenger is entitled to 1 piece of free hand luggage up to 15kg. Extra weight, large boxes, or special cargo are transported at highly affordable rates in our spacious undercarriage hold. For secure parcel delivery, cargo logistics, or shipping rates, our dedicated shipping agents are ready to assist.',
    waLink: 'https://wa.me/254754303484?text=Hi%20Buscar!%20I%20have%20an%20inquiry%20about%20passenger%20baggage%20limits%20or%20parcel%20cargo%20shipping.',
    waLabel: 'Chat Now'
  },
  {
    id: 'refunds',
    question: 'Cancellations, refunds and rescheduling',
    answer: 'Ticket cancellations made at least 24 hours prior to departure are eligible for a partial refund or can be rescheduled to any future date free of charge. Same-day rescheduling is subject to a 10% re-booking fee. Need to reschedule or cancel a booked seat?',
    waLink: 'https://wa.me/254754303484?text=Hi%20Buscar!%20I%20need%20to%20change%20the%20travel%20date%20or%20cancel%20my%20booking.',
    waLabel: 'Chat Now'
  },
  {
    id: 'care',
    question: 'Connect with Live Customer Support',
    answer: 'You can directly dial our 24/7 support hotline at +254 754 303 484, or tap below to launch an instant live chat with our customer support desk for immediate help with booking, seat selection, or status updates.',
    waLink: 'https://wa.me/254754303484?text=Hi%20Buscar%20Support!%20I%20need%20immediate%20assistance%20with%20my%20bus%20booking.',
    waLabel: 'Chat Now'
  }
];

const playNotificationSound = () => {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const audioCtx = new AudioContextClass();
    
    const osc1 = audioCtx.createOscillator();
    const osc2 = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    osc1.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    osc1.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
    osc1.frequency.exponentialRampToValueAtTime(698.46, audioCtx.currentTime + 0.12); // F5

    osc2.frequency.setValueAtTime(659.25, audioCtx.currentTime); // E5
    osc2.frequency.exponentialRampToValueAtTime(880.00, audioCtx.currentTime + 0.12); // A5

    gainNode.gain.setValueAtTime(0.06, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);

    osc1.start(audioCtx.currentTime);
    osc2.start(audioCtx.currentTime);
    osc1.stop(audioCtx.currentTime + 0.3);
    osc2.stop(audioCtx.currentTime + 0.3);
  } catch (error) {
    console.warn('Audio context failed to initialize:', error);
  }
};

export default function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: 'Hello! Welcome to Buscar Online Booking support. I am your virtual assistant.\n\nHow can I help you today? Select one of our common questions below, or type your query.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [customInput, setCustomInput] = useState('');
  const [hasNewMessage, setHasNewMessage] = useState(true);

  const messageEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  useEffect(() => {
    if (messages.length > 1) {
      const lastMsg = messages[messages.length - 1];
      if (lastMsg.sender === 'bot') {
        playNotificationSound();
      }
    }
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setHasNewMessage(false);
    }
  };

  const handleSelectFAQ = (faq: typeof FAQ_DATA[number]) => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Add User Message
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: faq.question,
      timestamp: timeStr
    };

    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    // Simulate typing and reply
    setTimeout(() => {
      setIsTyping(false);
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: faq.answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        waLink: faq.waLink,
        waLabel: faq.waLabel,
        showHelpContact: true
      };
      setMessages(prev => [...prev, botMsg]);
    }, 1200);
  };

  const handleSendCustomMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!customInput.trim()) return;

    const textToSend = customInput.trim();
    setCustomInput('');
    
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Add User custom message
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: timeStr
    };

    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    // Dynamic reply
    setTimeout(() => {
      setIsTyping(false);
      
      const randomReqNum = `REQ-${Math.floor(1000 + Math.random() * 9000)}`;
      const prefilledWaUrl = `https://wa.me/254754303484?text=${encodeURIComponent(`Hi Buscar support! I need assistance with Request #${randomReqNum} regarding: ` + textToSend)}`;
      
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: `Thanks for your inquiry about "${textToSend}". I have logged your ticket into our support inbox as Request Number #${randomReqNum}.\n\nFor immediate attention, you can directly connect with our live 24/7 booking dispatch team with this request number!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        waLink: prefilledWaUrl,
        waLabel: 'Chat Now',
        showHelpContact: true
      };
      
      setMessages(prev => [...prev, botMsg]);
    }, 1400);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'welcome',
        sender: 'bot',
        text: 'Hello! Welcome to Buscar Online Booking support. I am your virtual assistant.\n\nHow can I help you today? Select one of our common questions below, or type your query.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <>
      {/* Floating launcher button */}
      <button 
        id="chat-bot-launcher"
        onClick={toggleChat}
        className="fixed bottom-24 right-5 bg-black hover:bg-neutral-900 text-white p-4 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.25)] z-50 transition-all duration-300 hover:scale-110 flex items-center justify-center border-2 border-white/85 group"
        aria-label="Toggle Customer Care Chatbot"
      >
        {isOpen ? (
          <X className="w-6 h-6 animate-in fade-in zoom-in duration-300" />
        ) : (
          <div className="relative">
            <MessageCircle className="w-6.5 h-6.5 text-white fill-white/10 group-hover:rotate-6 transition-transform" />
            {hasNewMessage && (
              <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-red-600 rounded-full border-2 border-black animate-pulse" />
            )}
          </div>
        )}
      </button>

      {/* Chat window panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 40, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.92 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="fixed bottom-40 right-4 left-4 sm:left-auto sm:w-96 max-w-sm bg-white rounded-2xl border border-slate-100 shadow-[0_16px_48px_rgba(15,23,42,0.15)] z-50 overflow-hidden flex flex-col h-[520px]"
          >
            {/* Dark Header */}
            <div className="bg-[#151515] text-white px-4 py-3.5 flex items-center justify-between border-b border-neutral-800 shadow-md">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-red-600 border border-white/20 flex items-center justify-center text-white font-black text-xs shadow-inner">
                    B
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-[#151515]" />
                </div>
                <div>
                  <h4 className="font-extrabold text-xs tracking-tight uppercase text-white">Buscar Virtual Agent</h4>
                  <p className="text-[10px] text-emerald-400 font-bold tracking-wider uppercase flex items-center gap-1 mt-0.5">
                    Online • 24/7 Dispatch
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button 
                  onClick={handleResetChat}
                  title="Reset Conversation"
                  className="p-1.5 hover:bg-neutral-800 rounded-full text-neutral-400 hover:text-white transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
                <button 
                  onClick={toggleChat}
                  className="p-1.5 hover:bg-neutral-800 rounded-full text-neutral-400 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-4 bg-slate-50/50 space-y-4">
              {messages.map((msg) => {
                const isBot = msg.sender === 'bot';
                return (
                  <div 
                    key={msg.id} 
                    className={`flex ${isBot ? 'justify-start' : 'justify-end'} items-start gap-2 animate-in fade-in duration-300`}
                  >
                    {isBot && (
                      <div className="w-7 h-7 rounded-full bg-[#36498c]/10 text-[#36498c] flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5 border border-[#36498c]/5">
                        B
                      </div>
                    )}
                    <div className="max-w-[85%] space-y-1">
                      <div 
                        className={`p-3 text-xs leading-relaxed shadow-xs ${
                          isBot 
                            ? 'bg-white text-slate-800 border border-slate-100 rounded-2xl rounded-tl-sm' 
                            : 'bg-[#36498c] text-white rounded-2xl rounded-tr-sm font-semibold'
                        }`}
                      >
                        <span className="whitespace-pre-wrap">{msg.text}</span>

                        {/* WhatsApp solution redirect banner if attached to the message */}
                        {isBot && msg.waLink && (
                          <div className="mt-3.5 pt-3.5 border-t border-slate-100 flex flex-col gap-2">
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider block">
                              Need live help?
                            </span>
                            <a 
                              href={msg.waLink}
                              target="_blank" 
                              rel="noreferrer"
                              className="bg-[#00a859] hover:bg-[#00904b] text-white font-extrabold text-[11px] rounded-xl py-2 px-3 flex items-center justify-center gap-1.5 transition-all shadow-sm active:scale-95 text-center leading-none"
                            >
                              <MessageSquare className="w-3.5 h-3.5 fill-white/10" />
                              {msg.waLabel || 'Chat Now'}
                            </a>
                            <p className="text-[9px] text-gray-400 font-medium text-center">
                              Secure connection to dispatch office.
                            </p>
                          </div>
                        )}
                      </div>
                      
                      {/* Message Timestamp */}
                      <span className={`block text-[9px] text-gray-400 px-1 ${!isBot ? 'text-right' : ''}`}>
                        {msg.timestamp}
                      </span>
                    </div>
                  </div>
                );
              })}

              {/* Bot Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start items-start gap-2">
                  <div className="w-7 h-7 rounded-full bg-[#36498c]/10 text-[#36498c] flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">
                    B
                  </div>
                  <div className="bg-white border border-slate-100 p-3.5 rounded-2xl rounded-tl-sm shadow-xs flex items-center justify-center">
                    <div className="flex gap-1 items-center">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
                    </div>
                  </div>
                </div>
              )}

              {/* Quick interactive action chips (FAQs) */}
              {!isTyping && (
                <div className="pt-3 animate-in fade-in duration-500">
                  <span className="block text-[10px] text-gray-400 font-extrabold tracking-widest uppercase mb-3 px-1">
                    Select a Topic
                  </span>
                  <div className="flex flex-col gap-2.5">
                    {FAQ_DATA.map((faq) => (
                      <button
                        key={faq.id}
                        onClick={() => handleSelectFAQ(faq)}
                        className="w-full text-left bg-white hover:bg-slate-50 hover:border-slate-300 text-slate-700 hover:text-[#36498c] border border-slate-200/60 p-3.5 rounded-2xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer group shadow-2xs active:scale-98"
                      >
                        <span className="truncate pr-3 font-bold">{faq.question}</span>
                        <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-[#36498c] group-hover:translate-x-0.5 transition-all shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div ref={messageEndRef} />
            </div>

            {/* Custom Input footer */}
            <form 
              onSubmit={handleSendCustomMessage}
              className="p-3 border-t border-slate-100 bg-white flex items-center gap-2"
            >
              <input 
                type="text"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                placeholder="Ask Buscar anything..."
                className="flex-1 bg-slate-50 border border-slate-200 focus:border-[#36498c] focus:ring-1 focus:ring-[#36498c] outline-hidden text-xs rounded-xl py-2.5 px-3.5 font-semibold placeholder-gray-400 text-slate-800 transition-colors"
              />
              <button
                type="submit"
                disabled={!customInput.trim()}
                className={`p-2.5 rounded-xl flex items-center justify-center transition-all ${
                  customInput.trim() 
                    ? 'bg-[#36498c] text-white hover:bg-black cursor-pointer shadow-sm active:scale-95' 
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                }`}
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
