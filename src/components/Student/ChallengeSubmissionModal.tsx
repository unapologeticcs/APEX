import React, { useState } from 'react';
import {
  X,
  BookOpen,
  Award,
  UploadCloud,
  FileCheck,
  CheckCircle2,
  AlertCircle,
  Clock,
  ArrowRight,
  ShieldCheck,
  Check
} from 'lucide-react';
import { ProfessorChallenge, ChallengeSubmission, Language } from '../../types';
import { translations } from '../../i18n/translations';

interface ChallengeSubmissionModalProps {
  challenge: ProfessorChallenge | null;
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  existingSubmission?: ChallengeSubmission;
  onSubmit: (submissionData: {
    challengeId: string;
    fileName: string;
    workDescription: string;
    sampleExcerpt: string;
  }) => void;
  onAddToPortfolio: (submission: ChallengeSubmission) => void;
}

export const ChallengeSubmissionModal: React.FC<ChallengeSubmissionModalProps> = ({
  challenge,
  isOpen,
  onClose,
  language,
  existingSubmission,
  onSubmit,
  onAddToPortfolio
}) => {
  const [activeTab, setActiveTab] = useState<'details' | 'submit' | 'feedback'>(
    existingSubmission?.status === 'Feedback Available' ? 'feedback' : 'details'
  );
  const [fileName, setFileName] = useState('My_Research_Paper.pdf');
  const [workDescription, setWorkDescription] = useState('');
  const [sampleExcerpt, setSampleExcerpt] = useState('');
  const [honorAgreed, setHonorAgreed] = useState(false);
  const [hasAddedToPortfolio, setHasAddedToPortfolio] = useState(
    existingSubmission?.addedToPortfolio || false
  );

  if (!isOpen || !challenge) return null;
  const t = translations[language].challenges;

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!honorAgreed) return;

    onSubmit({
      challengeId: challenge.id,
      fileName,
      workDescription: workDescription || 'Original student research paper answering prompt criteria.',
      sampleExcerpt: sampleExcerpt || 'Analysis of primary sources and proposed structural amendments.',
    });
    setActiveTab('details');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#26332D]/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-[#E7ECE6] shadow-xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-[#E7ECE6] flex items-start justify-between bg-white">
          <div className="space-y-1 pr-4">
            <div className="flex items-center gap-2 text-xs text-[#78847B]">
              <span className="font-bold text-[#26332D]">{challenge.type}</span>
              <span>·</span>
              <span>{challenge.subject}</span>
              <span>·</span>
              <span className="font-mono text-rose-700">Deadline: {challenge.deadline}</span>
            </div>
            <h2 className="text-xl font-extrabold text-[#26332D] leading-snug">
              {challenge.title}
            </h2>
            <div className="text-xs text-[#78847B]">
              {challenge.professorName} · {challenge.professorTitle} · <strong className="text-[#26332D]">{challenge.university}</strong>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-[#78847B] hover:text-[#26332D] hover:bg-[#F3F7F0] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab navigation within modal */}
        <div className="px-6 border-b border-[#E7ECE6] bg-[#F3F7F0]/40 flex gap-2 pt-2">
          <button
            onClick={() => setActiveTab('details')}
            className={`px-4 py-2 text-xs font-bold border-b-2 transition-all ${
              activeTab === 'details'
                ? 'border-[#26332D] text-[#26332D]'
                : 'border-transparent text-[#78847B] hover:text-[#26332D]'
            }`}
          >
            Challenge Prompt & Rubric
          </button>

          <button
            onClick={() => setActiveTab('submit')}
            className={`px-4 py-2 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'submit'
                ? 'border-[#26332D] text-[#26332D]'
                : 'border-transparent text-[#78847B] hover:text-[#26332D]'
            }`}
          >
            <span>{existingSubmission ? 'My Submission' : t.submitWorkBtn}</span>
            {existingSubmission && (
              <span className="w-2 h-2 rounded-full bg-[#B7E6A5]" />
            )}
          </button>

          {existingSubmission?.feedback && (
            <button
              onClick={() => setActiveTab('feedback')}
              className={`px-4 py-2 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 ${
                activeTab === 'feedback'
                  ? 'border-[#26332D] text-[#26332D]'
                  : 'border-transparent text-[#78847B] hover:text-[#26332D]'
              }`}
            >
              <span>Faculty Evaluation</span>
              <span className="px-1.5 py-0.2 rounded-full bg-[#B7E6A5] text-[10px] text-[#26332D]">
                Ready
              </span>
            </button>
          )}
        </div>

        {/* Tab Body */}
        <div className="p-6 sm:p-8 flex-1 overflow-y-auto space-y-6 text-xs text-[#26332D]">
          {/* TAB 1: DETAILS */}
          {activeTab === 'details' && (
            <div className="space-y-6">
              {/* Instructions */}
              <div>
                <h3 className="font-bold text-sm text-[#26332D] mb-2">Instructions & Problem Statement</h3>
                <div className="p-4 rounded-2xl bg-[#F3F7F0] border border-[#E7ECE6] font-sans text-xs text-[#26332D] whitespace-pre-line leading-relaxed">
                  {challenge.instructions}
                </div>
              </div>

              {/* Learning Objectives */}
              <div>
                <h3 className="font-bold text-xs uppercase tracking-wider text-[#78847B] mb-2">Learning Objectives</h3>
                <ul className="space-y-1.5">
                  {challenge.learningObjectives.map((obj, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-[#26332D]">
                      <span className="text-[#B7E6A5] font-bold">✓</span>
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Rubric */}
              <div>
                <h3 className="font-bold text-xs uppercase tracking-wider text-[#78847B] mb-2">{t.rubricTitle}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {challenge.evaluationCriteria.map((crit, i) => (
                    <div key={i} className="p-3 rounded-xl border border-[#E7ECE6] bg-white text-xs">
                      {crit}
                    </div>
                  ))}
                </div>
              </div>

              {/* Status and Action */}
              <div className="pt-4 border-t border-[#E7ECE6] flex items-center justify-between">
                <span className="text-xs text-[#78847B]">
                  Required Format: {challenge.requiredFormat}
                </span>
                <button
                  onClick={() => setActiveTab('submit')}
                  className="px-6 py-2.5 rounded-xl bg-[#B7E6A5] hover:bg-[#aee09c] text-xs font-bold text-[#26332D] shadow-xs transition-colors"
                >
                  {existingSubmission ? 'View My Upload' : t.startBtn}
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: SUBMIT WORK */}
          {activeTab === 'submit' && (
            <div>
              {existingSubmission ? (
                <div className="space-y-5">
                  <div className="p-4 rounded-2xl bg-[#F3F7F0] border border-[#E7ECE6] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-[#26332D]">Submission Status:</span>
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#B7E6A5]/80 text-[#26332D]">
                        {existingSubmission.status}
                      </span>
                    </div>
                    <div className="text-xs text-[#78847B]">
                      Uploaded file: <strong className="text-[#26332D] font-mono">{existingSubmission.fileName}</strong> ({existingSubmission.fileSize}) on {existingSubmission.submittedAt}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-xs text-[#26332D] mb-1">Your Executive Summary:</h4>
                    <p className="p-3.5 rounded-xl bg-white border border-[#E7ECE6] text-[#78847B] text-xs leading-relaxed">
                      {existingSubmission.workDescription}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-xs text-[#26332D] mb-1">Excerpt from your submitted paper:</h4>
                    <div className="p-4 rounded-xl bg-[#F3F7F0]/60 border border-[#E7ECE6] text-[#26332D] text-xs leading-relaxed font-serif italic">
                      "{existingSubmission.contentSample}"
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-5">
                  <div>
                    <h3 className="font-bold text-sm text-[#26332D] mb-1">{t.submissionFormTitle}</h3>
                    <p className="text-xs text-[#78847B]">{t.uploadNotice}</p>
                  </div>

                  {/* Simulated Upload Area */}
                  <div className="p-6 border-2 border-dashed border-[#E7ECE6] hover:border-[#B7E6A5] rounded-2xl text-center space-y-2 transition-colors bg-[#F3F7F0]/30">
                    <UploadCloud className="w-8 h-8 text-[#78847B] mx-auto" />
                    <div className="text-xs font-bold text-[#26332D]">Drag & drop your file, or browse</div>
                    <div className="text-[11px] text-[#78847B]">Supported: PDF, DOCX (Max 15 MB)</div>
                    <div className="inline-block px-3 py-1 bg-white border border-[#E7ECE6] rounded-lg text-xs font-mono text-[#26332D] mt-2">
                      Selected: {fileName}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#26332D] mb-1">
                      {t.workDescriptionLabel}
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={workDescription}
                      onChange={(e) => setWorkDescription(e.target.value)}
                      placeholder="Briefly describe your hypothesis, sources, and key conclusions..."
                      className="w-full p-3 rounded-xl border border-[#E7ECE6] text-xs text-[#26332D] focus:outline-none focus:ring-2 focus:ring-[#B7E6A5]"
                    />
                  </div>

                  <div
                    onClick={() => setHonorAgreed(!honorAgreed)}
                    className="flex items-start gap-2.5 p-3 rounded-xl bg-[#F3F7F0] border border-[#E7ECE6] cursor-pointer select-none"
                  >
                    <div
                      className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 mt-0.5 ${
                        honorAgreed ? 'bg-[#B7E6A5] border-[#B7E6A5] text-[#26332D]' : 'border-[#E7ECE6]'
                      }`}
                    >
                      {honorAgreed && <Check className="w-3 h-3" />}
                    </div>
                    <span className="text-[11px] text-[#26332D] leading-tight">
                      {t.honorCodeCheck}
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={!honorAgreed}
                    className="w-full py-3 rounded-xl bg-[#B7E6A5] hover:bg-[#aee09c] text-xs font-bold text-[#26332D] transition-colors disabled:opacity-50"
                  >
                    {t.submitWorkBtn}
                  </button>
                </form>
              )}
            </div>
          )}

          {/* TAB 3: FACULTY FEEDBACK */}
          {activeTab === 'feedback' && existingSubmission?.feedback && (
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-[#F3F7F0] border border-[#E7ECE6] space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-[#E7ECE6]">
                  <div>
                    <div className="text-xs font-bold text-[#26332D]">{existingSubmission.feedback.professorName}</div>
                    <div className="text-[11px] text-[#78847B]">Reviewed on {existingSubmission.feedback.reviewedAt}</div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#B7E6A5] text-[#26332D]">
                    Confidential Faculty Evaluation
                  </span>
                </div>

                <p className="text-xs text-[#26332D] leading-relaxed italic">
                  "{existingSubmission.feedback.overallComments}"
                </p>
              </div>

              {/* Strengths */}
              <div className="space-y-2">
                <h4 className="font-bold text-xs uppercase tracking-wider text-emerald-800">{t.strengthsLabel}</h4>
                <ul className="space-y-1.5">
                  {existingSubmission.feedback.strengths.map((str, i) => (
                    <li key={i} className="p-2.5 rounded-xl bg-white border border-[#E7ECE6] text-xs text-[#26332D] flex items-start gap-2">
                      <span className="text-emerald-700 font-bold shrink-0">✓</span>
                      <span>{str}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Improvements */}
              <div className="space-y-2">
                <h4 className="font-bold text-xs uppercase tracking-wider text-amber-800">{t.improvementsLabel}</h4>
                <ul className="space-y-1.5">
                  {existingSubmission.feedback.improvements.map((imp, i) => (
                    <li key={i} className="p-2.5 rounded-xl bg-white border border-[#E7ECE6] text-xs text-[#26332D] flex items-start gap-2">
                      <span className="text-amber-700 font-bold shrink-0">→</span>
                      <span>{imp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recommendations */}
              <div className="p-4 rounded-xl bg-white border border-[#E7ECE6] space-y-1">
                <span className="font-bold text-xs text-[#26332D]">{t.recommendationsLabel}</span>
                <p className="text-xs text-[#78847B]">{existingSubmission.feedback.recommendations}</p>
              </div>

              {/* Add to Portfolio CTA */}
              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => {
                    onAddToPortfolio(existingSubmission);
                    setHasAddedToPortfolio(true);
                  }}
                  disabled={hasAddedToPortfolio}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    hasAddedToPortfolio
                      ? 'bg-[#F3F7F0] border border-[#E7ECE6] text-emerald-800'
                      : 'bg-[#B7E6A5] hover:bg-[#aee09c] text-[#26332D] shadow-xs'
                  }`}
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>{hasAddedToPortfolio ? t.addedToPortfolioDone : t.addToPortfolioBtn}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
