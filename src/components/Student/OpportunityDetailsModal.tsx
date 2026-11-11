import React from 'react';
import { X, Calendar, MapPin, Building, Bookmark, ExternalLink, ShieldCheck, Check, DollarSign, FileCheck } from 'lucide-react';
import { Opportunity, Language } from '../../types';
import { translations } from '../../i18n/translations';

interface OpportunityDetailsModalProps {
  opportunity: Opportunity | null;
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  isSaved: boolean;
  onToggleSave: (oppId: string) => void;
}

export const OpportunityDetailsModal: React.FC<OpportunityDetailsModalProps> = ({
  opportunity,
  isOpen,
  onClose,
  language,
  isSaved,
  onToggleSave
}) => {
  if (!isOpen || !opportunity) return null;
  const t = translations[language].discover;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#26332D]/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-[#E7ECE6] shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-[#E7ECE6] flex items-start justify-between bg-white">
          <div className="space-y-1 pr-4">
            <div className="flex items-center gap-2 text-xs text-[#78847B]">
              <span className="capitalize font-bold text-[#26332D]">{opportunity.category}</span>
              <span>·</span>
              <span>{opportunity.format}</span>
              <span>·</span>
              <span className="flex items-center gap-1 text-emerald-700 font-medium">
                <ShieldCheck className="w-3.5 h-3.5" />
                {t.verifiedOfficial}
              </span>
            </div>
            <h2 className="text-xl font-extrabold text-[#26332D] leading-snug">
              {opportunity.name}
            </h2>
            <div className="text-xs text-[#78847B] flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5" />
              <span>{opportunity.organization}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-[#78847B] hover:text-[#26332D] hover:bg-[#F3F7F0] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 flex-1 overflow-y-auto space-y-6 text-xs text-[#26332D]">
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-[#F3F7F0] border border-[#E7ECE6]">
            <div>
              <span className="text-[11px] text-[#78847B] block">{t.deadlineLabel}</span>
              <span className="font-bold font-mono text-rose-700 text-xs">{opportunity.deadline}</span>
            </div>
            <div>
              <span className="text-[11px] text-[#78847B] block">{t.locationLabel}</span>
              <span className="font-semibold text-xs truncate block">{opportunity.location}</span>
            </div>
            <div>
              <span className="text-[11px] text-[#78847B] block">{t.costLabel}</span>
              <span className="font-semibold text-xs text-emerald-800 truncate block">{opportunity.cost}</span>
            </div>
            <div>
              <span className="text-[11px] text-[#78847B] block">{t.filterLevel}</span>
              <span className="font-semibold text-xs">{opportunity.level}</span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="font-bold text-sm text-[#26332D]">Program Description</h3>
            <p className="text-[#78847B] leading-relaxed text-xs">
              {opportunity.fullDesc}
            </p>
          </div>

          {/* Eligibility */}
          <div className="space-y-2">
            <h3 className="font-bold text-sm text-[#26332D]">{t.eligibilityLabel}</h3>
            <p className="text-[#78847B] leading-relaxed text-xs">
              {opportunity.eligibility}
            </p>
          </div>

          {/* Requirements & Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl border border-[#E7ECE6] bg-white space-y-2">
              <h4 className="font-bold text-xs text-[#26332D] flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-[#B7E6A5]" />
                <span>{t.documentsNeeded}</span>
              </h4>
              <ul className="text-[11px] text-[#78847B] space-y-1">
                <li>• Academic transcript or grade report</li>
                <li>• Personal statement or research essay (1,500w)</li>
                <li>• Teacher or counselor recommendation form</li>
                <li>• Proof of secondary school enrollment</li>
              </ul>
            </div>

            <div className="p-4 rounded-2xl border border-[#E7ECE6] bg-white space-y-2">
              <h4 className="font-bold text-xs text-[#26332D] flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#B7E6A5]" />
                <span>{t.howToApply}</span>
              </h4>
              <ol className="text-[11px] text-[#78847B] space-y-1 list-decimal list-inside">
                <li>Register on official host portal</li>
                <li>Submit written prompt and citations</li>
                <li>Faculty committee review stage</li>
                <li>Finalist interview & scholarship decision</li>
              </ol>
            </div>
          </div>

          {/* Verification timestamp */}
          <div className="p-3 rounded-xl bg-[#F3F7F0]/60 border border-[#E7ECE6] flex items-center justify-between text-[11px] text-[#78847B]">
            <span>{opportunity.officialSource}</span>
            <span>{t.lastVerified}: {opportunity.verifiedDate}</span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-[#E7ECE6] flex items-center justify-between bg-white">
          <button
            onClick={() => onToggleSave(opportunity.id)}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 ${
              isSaved
                ? 'bg-[#B7E6A5]/50 border-[#B7E6A5] text-[#26332D]'
                : 'border-[#E7ECE6] text-[#78847B] hover:text-[#26332D]'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-[#26332D]' : ''}`} />
            <span>{isSaved ? t.savedBtn : t.saveBtn}</span>
          </button>

          <a
            href={opportunity.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-[#B7E6A5] hover:bg-[#aee09c] text-xs font-bold text-[#26332D] flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <span>{t.visitOfficial}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
