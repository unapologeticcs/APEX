import React, { useState } from 'react';
import { X, Sparkles, Send, ArrowRight, BookOpen, Compass, Check } from 'lucide-react';
import { Language, Opportunity } from '../../types';

interface OpportunityDiscoveryAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  opportunities: Opportunity[];
  onSelectOpportunity: (opp: Opportunity) => void;
}

export const OpportunityDiscoveryAssistantModal: React.FC<OpportunityDiscoveryAssistantModalProps> = ({
  isOpen,
  onClose,
  language,
  opportunities,
  onSelectOpportunity
}) => {
  const [messages, setMessages] = useState<{ role: 'ai' | 'user'; text: string; matchedOpps?: Opportunity[] }[]>([
    {
      role: 'ai',
      text: 'Hello! I am your Opportunity Discovery Assistant. Tell me: what academic questions or fields excite you most, and are you looking for competitions, research labs, or summer programs?'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  if (!isOpen) return null;

  const handleSend = () => {
    if (!inputText.trim()) return;

    const userMsg = inputText;
    setMessages((prev) => [...prev, { role: 'user', text: userMsg }]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      // Intelligently find matching opportunities based on user text keywords
      const query = userMsg.toLowerCase();
      let matched = opportunities.filter((o) =>
        o.name.toLowerCase().includes(query) ||
        o.shortDesc.toLowerCase().includes(query) ||
        o.category.toLowerCase().includes(query) ||
        o.field.toLowerCase().includes(query)
      );

      if (matched.length === 0) {
        matched = opportunities.slice(0, 2);
      } else {
        matched = matched.slice(0, 3);
      }

      setMessages((prev) => [
        ...prev,
        {
          role: 'ai',
          text: `Based on your curiosity, I identified ${matched.length} programs with high academic rigor. Remember: compare their eligibility criteria and decide which one aligns best with your weekly availability!`,
          matchedOpps: matched
        }
      ]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#26332D]/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-[#E7ECE6] shadow-xl max-w-xl w-full max-h-[85vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-[#E7ECE6] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#B7E6A5] flex items-center justify-center text-[#26332D]">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#78847B] uppercase tracking-wider">AI Discovery Mentor</div>
              <h3 className="text-sm font-extrabold text-[#26332D]">Find Your Academic Match</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#78847B] hover:text-[#26332D] hover:bg-[#F3F7F0] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Log */}
        <div className="p-5 flex-1 overflow-y-auto space-y-4 bg-[#F3F7F0]/30 text-xs">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] p-3.5 rounded-2xl leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-[#26332D] text-white rounded-br-xs'
                    : 'bg-white border border-[#E7ECE6] text-[#26332D] rounded-bl-xs shadow-2xs'
                }`}
              >
                {m.text}
              </div>

              {/* Matched opportunities cards */}
              {m.matchedOpps && m.matchedOpps.length > 0 && (
                <div className="mt-2.5 w-full space-y-2">
                  {m.matchedOpps.map((opp) => (
                    <div
                      key={opp.id}
                      className="p-3 bg-white rounded-xl border border-[#E7ECE6] hover:border-[#B7E6A5] transition-colors flex items-center justify-between gap-3 text-left shadow-2xs"
                    >
                      <div>
                        <div className="text-xs font-bold text-[#26332D]">{opp.name}</div>
                        <div className="text-[11px] text-[#78847B] truncate max-w-xs">{opp.organization} · {opp.deadline}</div>
                      </div>
                      <button
                        onClick={() => {
                          onSelectOpportunity(opp);
                          onClose();
                        }}
                        className="px-2.5 py-1 text-[11px] font-bold text-[#26332D] bg-[#B7E6A5] hover:bg-[#aee09c] rounded-lg shrink-0"
                      >
                        Details
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-1.5 text-xs text-[#78847B] p-2">
              <Sparkles className="w-3.5 h-3.5 animate-spin text-[#B7E6A5]" />
              <span>Analyzing academic directories...</span>
            </div>
          )}
        </div>

        {/* Quick prompt suggestions */}
        <div className="px-5 py-2 border-t border-[#E7ECE6] bg-white flex items-center gap-2 overflow-x-auto text-[11px]">
          <span className="text-[#78847B] shrink-0">Try asking:</span>
          {['Environmental law essay', 'Physics research fellowship', 'Youth policy grants'].map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => {
                setInputText(suggestion);
              }}
              className="px-2.5 py-1 rounded-full bg-[#F3F7F0] hover:bg-[#E7ECE6] text-[#26332D] whitespace-nowrap"
            >
              {suggestion}
            </button>
          ))}
        </div>

        {/* Input box */}
        <div className="p-4 border-t border-[#E7ECE6] bg-white flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Describe your interests or goals..."
            className="flex-1 px-3.5 py-2 rounded-xl border border-[#E7ECE6] text-xs text-[#26332D] focus:outline-none focus:ring-2 focus:ring-[#B7E6A5]"
          />
          <button
            onClick={handleSend}
            className="p-2 rounded-xl bg-[#B7E6A5] text-[#26332D] hover:bg-[#aee09c] transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
