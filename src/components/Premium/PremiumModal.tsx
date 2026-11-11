import React from 'react';
import { X, Sparkles, Check, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { Language } from '../../types';
import { translations } from '../../i18n/translations';

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  isPremium: boolean;
  onTogglePremium: () => void;
}

export const PremiumModal: React.FC<PremiumModalProps> = ({
  isOpen,
  onClose,
  language,
  isPremium,
  onTogglePremium
}) => {
  if (!isOpen) return null;
  const t = translations[language].premium;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#26332D]/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-[#E7ECE6] shadow-xl max-w-lg w-full p-6 sm:p-8 space-y-6 relative overflow-hidden">
        {/* Soft pastel decorative gradient */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#F6C9D5]/30 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold tracking-wider text-[#78847B] uppercase bg-[#F3F7F0] px-2 py-0.5 rounded-full border border-[#E7ECE6]">
              {t.badge}
            </span>
            <h3 className="text-xl font-extrabold text-[#26332D]">{t.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-[#78847B] hover:text-[#26332D] hover:bg-[#F3F7F0] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-[#78847B] leading-relaxed">
          {t.sub}
        </p>

        {/* Feature comparison list */}
        <div className="space-y-2.5 text-xs text-[#26332D]">
          <div className="p-3 rounded-2xl bg-[#F3F7F0]/60 border border-[#E7ECE6] space-y-1">
            <span className="font-bold flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-700" />
              <span>Full AI University & Scholarship Interview Simulator</span>
            </span>
            <p className="text-[11px] text-[#78847B] pl-5.5">
              Extended turn-by-turn simulation panels with custom faculty personas.
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-[#F3F7F0]/60 border border-[#E7ECE6] space-y-1">
            <span className="font-bold flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-700" />
              <span>Deep Academic Portfolio Strength & Skill Gap Analysis</span>
            </span>
            <p className="text-[11px] text-[#78847B] pl-5.5">
              Faculty-level critique identifying unaddressed disciplines in your target field.
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-[#F3F7F0]/60 border border-[#E7ECE6] space-y-1">
            <span className="font-bold flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-700" />
              <span>Advanced Growth Plan Adjustments</span>
            </span>
            <p className="text-[11px] text-[#78847B] pl-5.5">
              Dynamic workload optimization calibrated against school exam schedules.
            </p>
          </div>
        </div>

        {/* Prototype toggle button */}
        <div className="pt-2 border-t border-[#E7ECE6] space-y-3">
          <div className="text-center text-[11px] text-[#78847B] italic">
            {t.simulatedNotice}
          </div>

          <button
            onClick={() => {
              onTogglePremium();
            }}
            className={`w-full py-3 rounded-2xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2 ${
              isPremium
                ? 'bg-[#F3F7F0] border border-[#E7ECE6] text-[#26332D]'
                : 'bg-[#B7E6A5] hover:bg-[#aee09c] text-[#26332D]'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>{isPremium ? t.toggleActive : t.switchBtn}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
