import React, { useState } from 'react';
import { X, Sparkles, FileText, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import { Language } from '../../types';

interface EssayFeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const EssayFeedbackModal: React.FC<EssayFeedbackModalProps> = ({
  isOpen,
  onClose,
  language
}) => {
  const [essayText, setEssayText] = useState(
    `Between 1990 and 2024, the volume of Tien Shan glaciers has diminished by an estimated 27%, severely modifying the seasonal hydrograph of the Syr Darya. Under customary international water law—specifically Articles 5 and 7 of the UN Watercourses Convention (1997)—upstream sovereign hydroelectric exploitation cannot infringe upon the vital human needs and ecological thresholds of downstream riparian states. We propose an automated cubic-meter compensatory tariff triggered whenever regional summer runoff drops below 82% of the historical mean.`
  );
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<null | {
    structure: string;
    clarity: string;
    argumentation: string;
    evidence: string;
    relevance: string;
  }>(null);

  if (!isOpen) return null;

  const handleAnalyze = () => {
    if (!essayText.trim()) return;
    setAnalyzing(true);

    setTimeout(() => {
      setAnalysisResult({
        structure: 'Well-ordered progression from quantitative physical premise (glacial loss) to customary legal foundation (Articles 5 & 7) to concrete policy proposal.',
        clarity: 'Crisp, academic vocabulary. The definition of "vital human needs" provides strong legal grounding.',
        argumentation: 'High analytical coherence. The argument directly answers upstream-downstream equity disputes.',
        evidence: 'Robust use of specific percentages (27% cryospheric loss, 82% runoff threshold), though mentioning the primary satellite or glaciological source would strengthen verification.',
        relevance: '100% focused on transboundary environmental jurisprudence without tangential rhetoric.'
      });
      setAnalyzing(false);
    }, 850);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#26332D]/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-[#E7ECE6] shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-[#E7ECE6] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#B7E6A5] flex items-center justify-center text-[#26332D]">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-[#78847B] uppercase tracking-wider">AI Writing Mentor</div>
              <h3 className="text-sm font-extrabold text-[#26332D]">Essay & Argument Coherence Reviewer</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#78847B] hover:text-[#26332D] hover:bg-[#F3F7F0] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 overflow-y-auto space-y-5 text-xs">
          <div>
            <label className="block text-xs font-bold text-[#26332D] mb-1.5">
              Paste your draft or argument excerpt:
            </label>
            <textarea
              rows={5}
              value={essayText}
              onChange={(e) => setEssayText(e.target.value)}
              placeholder="Paste your essay paragraph, abstract, or thesis..."
              className="w-full p-3.5 rounded-xl border border-[#E7ECE6] text-xs text-[#26332D] focus:outline-none focus:ring-2 focus:ring-[#B7E6A5]"
            />
            <div className="mt-1 flex items-center justify-between text-[11px] text-[#78847B]">
              <span>Word count: {essayText.trim().split(/\s+/).filter(Boolean).length} words</span>
              <span>AI reviews structure only — student owns 100% of the writing</span>
            </div>
          </div>

          <button
            onClick={handleAnalyze}
            disabled={analyzing || !essayText.trim()}
            className="w-full py-2.5 rounded-xl bg-[#B7E6A5] hover:bg-[#aee09c] text-xs font-bold text-[#26332D] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {analyzing ? (
              <>
                <Sparkles className="w-3.5 h-3.5 animate-spin" />
                <span>Evaluating Argument Flow...</span>
              </>
            ) : (
              <span>Analyze Essay Structure</span>
            )}
          </button>

          {analysisResult && (
            <div className="p-5 rounded-2xl bg-[#F3F7F0] border border-[#E7ECE6] space-y-3.5">
              <div className="font-bold text-[#26332D] text-sm flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>Diagnostic Review Breakdown:</span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-xl bg-white border border-[#E7ECE6]">
                  <span className="font-bold text-[#26332D] block mb-0.5">1. Structure & Logical Progression</span>
                  <p className="text-[#78847B]">{analysisResult.structure}</p>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-[#E7ECE6]">
                  <span className="font-bold text-[#26332D] block mb-0.5">2. Clarity & Precision</span>
                  <p className="text-[#78847B]">{analysisResult.clarity}</p>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-[#E7ECE6]">
                  <span className="font-bold text-[#26332D] block mb-0.5">3. Strength of Legal / Scientific Argument</span>
                  <p className="text-[#78847B]">{analysisResult.argumentation}</p>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-[#E7ECE6]">
                  <span className="font-bold text-[#26332D] block mb-0.5">4. Evidence Quality & Verifiability</span>
                  <p className="text-[#78847B]">{analysisResult.evidence}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
