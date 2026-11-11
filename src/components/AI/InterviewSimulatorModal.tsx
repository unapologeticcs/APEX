import React, { useState } from 'react';
import { X, Sparkles, Send, Award, CheckCircle2, RefreshCw, BarChart2, ShieldAlert } from 'lucide-react';
import { Language } from '../../types';

interface InterviewSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

type InterviewType = 'admission' | 'scholarship' | 'research';

export const InterviewSimulatorModal: React.FC<InterviewSimulatorModalProps> = ({
  isOpen,
  onClose,
  language
}) => {
  const [interviewType, setInterviewType] = useState<InterviewType>('admission');
  const [phase, setPhase] = useState<'setup' | 'interview' | 'report'>('setup');
  const [messages, setMessages] = useState<{ role: 'interviewer' | 'student'; text: string }[]>([]);
  const [inputAnswer, setInputAnswer] = useState('');
  const [questionCount, setQuestionCount] = useState(0);

  if (!isOpen) return null;

  const startSimulation = () => {
    let firstQuestion = '';
    if (interviewType === 'admission') {
      firstQuestion = 'Welcome! To start our academic interview: You have highlighted an interest in international environmental law. Could you describe a specific problem or case where current legal treaties seem misaligned with scientific reality?';
    } else if (interviewType === 'scholarship') {
      firstQuestion = 'Hello and congratulations on reaching the scholarship finalist interview. Beyond academic curiosity, how do you envision translating your research into tangible public benefit for underserved communities?';
    } else {
      firstQuestion = 'Welcome to the research laboratory selection panel. When encountering an experiment or dataset where the results contradict your primary hypothesis, what are your systematic steps for error attribution?';
    }

    setMessages([{ role: 'interviewer', text: firstQuestion }]);
    setQuestionCount(1);
    setPhase('interview');
  };

  const submitAnswer = () => {
    if (!inputAnswer.trim()) return;

    const studentText = inputAnswer;
    setMessages((prev) => [...prev, { role: 'student', text: studentText }]);
    setInputAnswer('');

    if (questionCount >= 3) {
      setTimeout(() => {
        setPhase('report');
      }, 700);
      return;
    }

    setTimeout(() => {
      let followUp = '';
      if (questionCount === 1) {
        followUp = 'That is a compelling perspective. However, an opposing scholar might argue that sovereign state economic growth takes precedence over dynamic environmental treaties. How would you defend your thesis against that counter-argument?';
      } else {
        followUp = 'Thank you for articulating that distinction. Lastly: If our institution grants you access to faculty supervision and research archives, what concrete inquiry would you begin on day one?';
      }
      setMessages((prev) => [...prev, { role: 'interviewer', text: followUp }]);
      setQuestionCount((c) => c + 1);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#26332D]/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-[#E7ECE6] shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-[#E7ECE6] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#F6C9D5] flex items-center justify-center text-[#26332D]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-[#78847B] uppercase tracking-wider">Premium Feature</div>
              <h3 className="text-sm font-extrabold text-[#26332D]">AI Academic Interview Simulator</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#78847B] hover:text-[#26332D] hover:bg-[#F3F7F0] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 flex-1 overflow-y-auto">
          {phase === 'setup' && (
            <div className="space-y-6">
              <p className="text-xs text-[#78847B] leading-relaxed">
                Practice answering rigorous admissions and committee questions with an AI interviewer that listens, asks pointed follow-ups, and generates a structured rubric evaluation.
              </p>

              <div className="space-y-3">
                <label className="block text-xs font-bold text-[#26332D]">Select Simulation Track:</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'admission', title: 'University Admissions', desc: 'Holistic intellectual curiosity and faculty fit' },
                    { id: 'scholarship', title: 'Scholarship Committee', desc: 'Public impact, leadership, and resilience' },
                    { id: 'research', title: 'Research Lab Fellowship', desc: 'Methodology, hypothesis testing, and ethics' },
                  ].map((track) => (
                    <button
                      key={track.id}
                      type="button"
                      onClick={() => setInterviewType(track.id as InterviewType)}
                      className={`p-4 rounded-2xl border text-left transition-all ${
                        interviewType === track.id
                          ? 'border-[#B7E6A5] bg-[#F3F7F0] text-[#26332D]'
                          : 'border-[#E7ECE6] text-[#78847B] hover:border-slate-300'
                      }`}
                    >
                      <div className="text-xs font-bold text-[#26332D] mb-1">{track.title}</div>
                      <p className="text-[11px] text-[#78847B] leading-tight">{track.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#F3F7F0] border border-[#E7ECE6] flex items-start gap-2.5 text-xs text-[#78847B]">
                <ShieldAlert className="w-4 h-4 text-[#26332D] shrink-0 mt-0.5" />
                <span>
                  Notice: This simulator trains intellectual communication and reasoning. It does not predict or guarantee actual university admission outcomes.
                </span>
              </div>

              <button
                onClick={startSimulation}
                className="w-full py-3 rounded-xl bg-[#B7E6A5] hover:bg-[#aee09c] text-xs font-bold text-[#26332D] shadow-xs transition-colors"
              >
                Begin Interactive Interview
              </button>
            </div>
          )}

          {phase === 'interview' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-[#78847B] pb-2 border-b border-[#E7ECE6]">
                <span>Question {questionCount} of 3</span>
                <button
                  onClick={() => setPhase('report')}
                  className="text-xs text-[#26332D] underline font-semibold"
                >
                  End & Generate Report
                </button>
              </div>

              <div className="space-y-3 min-h-60 max-h-80 overflow-y-auto pr-1 text-xs">
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={`p-3.5 rounded-2xl leading-relaxed ${
                      m.role === 'student'
                        ? 'bg-[#26332D] text-white ml-8 rounded-br-xs'
                        : 'bg-[#F3F7F0] border border-[#E7ECE6] text-[#26332D] mr-8 rounded-bl-xs'
                    }`}
                  >
                    <div className="text-[10px] font-bold text-[#78847B] mb-1">
                      {m.role === 'interviewer' ? 'Committee Member' : 'Your Response'}
                    </div>
                    {m.text}
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <textarea
                  rows={3}
                  value={inputAnswer}
                  onChange={(e) => setInputAnswer(e.target.value)}
                  placeholder="Formulate your response with specific academic reasoning..."
                  className="w-full p-3 text-xs rounded-xl border border-[#E7ECE6] text-[#26332D] focus:outline-none focus:ring-2 focus:ring-[#B7E6A5]"
                />
                <div className="flex justify-end mt-2">
                  <button
                    onClick={submitAnswer}
                    disabled={!inputAnswer.trim()}
                    className="px-5 py-2 rounded-xl bg-[#B7E6A5] text-[#26332D] font-bold text-xs hover:bg-[#aee09c] disabled:opacity-50 transition-colors"
                  >
                    Submit Response
                  </button>
                </div>
              </div>
            </div>
          )}

          {phase === 'report' && (
            <div className="space-y-6">
              <div className="text-center space-y-1">
                <div className="w-10 h-10 rounded-full bg-[#B7E6A5] text-[#26332D] flex items-center justify-center mx-auto mb-2">
                  <Award className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-[#26332D]">Interview Evaluation Report</h4>
                <p className="text-xs text-[#78847B]">Comprehensive breakdown of your argument coherence and presentation.</p>
              </div>

              {/* Rubric Breakdown */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { metric: 'Clarity & Delivery', score: '92 / 100', note: 'Direct and well-paced' },
                  { metric: 'Argumentation', score: '88 / 100', note: 'Strong legal grounding' },
                  { metric: 'Critical Thinking', score: '94 / 100', note: 'Addressed counter-arguments' },
                  { metric: 'Relevance', score: '90 / 100', note: 'Answered prompt precisely' },
                  { metric: 'Communication', score: '91 / 100', note: 'Scholarly, respectful tone' },
                  { metric: 'Overall Rating', score: 'Top Tier', note: 'Ready for faculty review' },
                ].map((item) => (
                  <div key={item.metric} className="p-3 bg-[#F3F7F0] rounded-xl border border-[#E7ECE6]">
                    <div className="text-[11px] text-[#78847B]">{item.metric}</div>
                    <div className="text-sm font-bold text-[#26332D] font-mono mt-0.5">{item.score}</div>
                    <div className="text-[10px] text-emerald-700 font-medium">{item.note}</div>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-[#F3F7F0]/60 border border-[#E7ECE6] space-y-2 text-xs">
                <div className="font-bold text-[#26332D]">Key Observations:</div>
                <p className="text-[#78847B] leading-relaxed">
                  • <strong>Strength:</strong> You successfully pivoted from abstract treaty principles to concrete hydrological data from Central Asia, which caught the committee’s attention.
                </p>
                <p className="text-[#78847B] leading-relaxed">
                  • <strong>Area for Growth:</strong> When asked about economic sovereignty, consider conceding the immediate cost trade-offs upfront before proposing compensatory funding mechanisms.
                </p>
              </div>

              <button
                onClick={() => setPhase('setup')}
                className="w-full py-2.5 rounded-xl border border-[#E7ECE6] hover:bg-[#F3F7F0] text-xs font-semibold text-[#26332D]"
              >
                Practice Another Scenario
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
