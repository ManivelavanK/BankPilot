import { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Sparkles, Menu } from 'lucide-react';
import { useOutletContext } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { slideInLeft, slideInRight, fadeIn } from '../components/MotionUtils';

const sampleQuestions = [
  "Why was this loan approved?",
  "What are the major risks?",
  "What is the company's financial strength?",
  "How does the debt-to-equity ratio compare?",
  "What is the credit score breakdown?"
];

const aiResponses: Record<string, string> = {
  "why was this loan approved?": "The loan was approved based on strong financial metrics: DSCR of 2.1x (above 1.5x threshold), consistent revenue growth of 22% YoY, low debt-to-equity ratio of 0.8x, and excellent management track record with no litigation history. The company operates in a stable IT services sector with diversified client base.",
  "what are the major risks?": "Key risks identified: 1) Client concentration - top 3 clients account for 45% of revenue, 2) Working capital cycle of 90 days may strain liquidity, 3) Ongoing vendor dispute worth ₹2.5 Cr, 4) Industry exposure to IT services sector at 28% of portfolio limit.",
  "what is the company's financial strength?": "Financial strength is robust: Revenue of ₹62 Cr with 22% profit margin, current ratio of 1.8x indicating good liquidity, ROE of 18%, and consistent EBITDA growth. Cash reserves of ₹8.5 Cr provide adequate buffer. Credit rating: A+ from CRISIL.",
  "how does the debt-to-equity ratio compare?": "The company's debt-to-equity ratio of 0.8x is well below the industry average of 1.2x and our policy threshold of 2.0x. This indicates conservative leverage and strong equity cushion, reducing default risk significantly.",
  "what is the credit score breakdown?": "Credit Score: 76/100. Breakdown: Financial Health (85/100), Management Quality (88/100), Industry Risk (70/100), Legal Compliance (92/100), Market Position (68/100). The score reflects low overall risk with strong fundamentals."
};

export function AICopilot() {
  const { setSidebarOpen } = useOutletContext<{ setSidebarOpen: (open: boolean) => void }>();
  const [messages, setMessages] = useState<Array<{ type: 'user' | 'ai'; text: string }>>([
    { type: 'ai', text: 'Hello! I\'m BankPilot AI Copilot. Ask me anything about credit decisions, risk analysis, or company evaluations.' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const hasScrolledRef = useRef(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = 0;
    }
  }, []);

  useEffect(() => {
    if (hasScrolledRef.current && messages.length > 1) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
    if (messages.length > 1) {
      hasScrolledRef.current = true;
    }
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = input;
    setMessages(prev => [...prev, { type: 'user', text: userMessage }]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = aiResponses[userMessage.toLowerCase()] ||
        "I understand your question. Based on the credit analysis, I recommend reviewing the detailed CAM report for comprehensive insights. Our AI engine continuously monitors financial statements, legal records, and market data to provide real-time risk assessment.";
      setMessages(prev => [...prev, { type: 'ai', text: response }]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuestionClick = (question: string) => {
    setInput(question);
  };

  return (
    <div className="bg-transparent pb-8">
      <div className="w-full">
        <div className="sticky top-0 z-50 bg-slate-50/80 backdrop-blur-md -mx-4 px-4 py-4 sm:-mx-8 sm:px-8 sm:py-6 mb-8 border-b border-slate-200">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center overflow-hidden shadow-xl border border-white/20">
              <img src="/bankpilot-logo.jpg" alt="BankPilot Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden p-1.5 hover:bg-white rounded-lg transition-colors border border-slate-200"
                  aria-label="Toggle Sidebar"
                >
                  <Menu className="w-5 h-5 text-slate-600" />
                </button>
                <h1 className="text-3xl font-bold text-[#1E293B] tracking-tight whitespace-nowrap">AI Copilot Intelligence</h1>
              </div>
              <p className="text-xs text-[#64748B] font-bold uppercase tracking-widest mt-1">Neural Credit Assistant • Active</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 min-h-[500px] lg:h-[calc(100vh-220px)]">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:col-span-2 bg-white/80 backdrop-blur-md rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] flex flex-col h-[500px] lg:h-full border border-white/40 overflow-hidden"
          >
            <div className="p-6 border-b border-[#E2E8F0]/50 flex-shrink-0 bg-slate-50/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <h2 className="text-[14px] font-bold text-[#1E293B] uppercase tracking-widest">Decision Stream</h2>
                </div>
                <div className="flex items-center gap-2">
                  <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-[10px] font-bold uppercase tracking-widest">GPT-4o Augmented</div>
                </div>
              </div>
            </div>

            <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-8 custom-scrollbar">
              <div className="flex flex-col gap-6">
                <AnimatePresence initial={false}>
                  {messages.map((msg, idx) => (
                    <motion.div
                      key={idx}
                      variants={msg.type === 'user' ? slideInRight : slideInLeft}
                      initial="initial"
                      animate="animate"
                      className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex gap-4 max-w-lg ${msg.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg ${msg.type === 'user'
                          ? 'bg-gradient-to-br from-[#2563EB] to-[#06B6D4] text-white'
                          : 'bg-white border border-[#E2E8F0] text-[#2563EB]'
                          }`}>
                          {msg.type === 'user' ? (
                            <User className="w-5 h-5" />
                          ) : (
                            <Bot className="w-5 h-5" />
                          )}
                        </div>
                        <div className={`rounded-2xl px-4 py-3 sm:px-6 sm:py-4 shadow-xl ${msg.type === 'user'
                          ? 'bg-gradient-to-br from-[#3B82F6] to-[#2563EB]'
                          : 'bg-white text-[#334155] border border-[#E2E8F0]/50'
                          }`}>
                          <p className={`text-[13px] sm:text-sm leading-relaxed font-semibold ${msg.type === 'user' ? 'text-white' : ''}`}>{msg.text}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  {isTyping && (
                    <motion.div
                      variants={slideInLeft}
                      initial="initial"
                      animate="animate"
                      className="flex justify-start"
                    >
                      <div className="flex gap-4 items-center">
                        <div className="w-10 h-10 rounded-xl bg-white border border-[#E2E8F0] text-[#2563EB] flex items-center justify-center">
                          <Bot className="w-5 h-5 animate-pulse" />
                        </div>
                        <div className="bg-slate-100/50 rounded-2xl px-6 py-4 flex gap-1.5 items-center">
                          <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                          <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                          <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div ref={messagesEndRef} />
              </div>
            </div>

            <div className="border-t border-[#E2E8F0]/50 p-6 bg-slate-50/50 flex-shrink-0">
              <div className="flex items-center gap-4 bg-white rounded-2xl p-2 shadow-inner border border-[#E2E8F0]/50 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Inquire about risk metrics or financial health..."
                  className="flex-1 outline-none text-sm bg-transparent px-4 font-medium text-gray-900 placeholder-gray-500"
                />
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSend}
                  className="bg-gradient-to-r from-[#2563EB] to-[#06B6D4] text-white p-3 rounded-xl hover:shadow-lg transition-shadow flex items-center justify-center shadow-blue-500/20"
                >
                  <Send className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </motion.div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/80 backdrop-blur-md rounded-[24px] shadow-xl p-6 border border-white/40"
            >
              <h3 className="text-[12px] font-bold text-[#1E293B] mb-4 uppercase tracking-widest border-b border-slate-100 pb-2">Suggested Queries</h3>
              <div className="space-y-3">
                {sampleQuestions.map((question, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ x: 5 }}
                    onClick={() => handleQuestionClick(question)}
                    className="w-full text-left p-4 bg-slate-50/50 rounded-2xl shadow-sm hover:shadow-md transition-all border border-transparent hover:border-blue-200 group relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-white/50 to-blue-500/0 -translate-x-full group-hover:animate-shimmer" />
                    <p className="text-[13px] text-[#2563EB] group-hover:text-[#2563EB] font-bold leading-snug relative z-10">{question}</p>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="p-6 bg-[#1A2E44] rounded-[24px] shadow-2xl relative overflow-hidden group"
            >
              <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-blue-500/20 blur-3xl rounded-full group-hover:scale-150 transition-transform duration-700" />
              <div className="flex items-start gap-4 relative z-10">
                <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-2 uppercase tracking-widest">Neural Insights</h4>
                  <p className="text-[11px] text-blue-100/70 leading-relaxed font-medium">Predictive modeling and natural language processing are active. Analysis includes financial statements, litigation history, and market sentiment.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
