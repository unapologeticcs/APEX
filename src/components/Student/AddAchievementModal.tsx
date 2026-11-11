import React, { useState } from 'react';
import { X, Award, Sparkles, Check, HelpCircle, FileCheck } from 'lucide-react';
import { PortfolioAchievement, Language } from '../../types';

interface AddAchievementModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onSave: (achievement: PortfolioAchievement) => void;
}

export const AddAchievementModal: React.FC<AddAchievementModalProps> = ({
  isOpen,
  onClose,
  language,
  onSave
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<PortfolioAchievement['category']>('Competitions');
  const [organization, setOrganization] = useState('');
  const [year, setYear] = useState('2026');
  const [resultOrAward, setResultOrAward] = useState('');
  const [description, setDescription] = useState('');
  const [visibility, setVisibility] = useState<'private' | 'public'>('public');
  const [skillsInput, setSkillsInput] = useState('Legal Research, Public Speaking');

  // AI Assistant clarification drawer
  const [aiHelperOpen, setAiHelperOpen] = useState(false);
  const [clarifyingQuestion, setClarifyingQuestion] = useState(
    'What was your specific role? For example, did you formulate the core hypothesis, organize the dataset, or lead team rebuttals?'
  );

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newAchievement: PortfolioAchievement = {
      id: `port-${Date.now()}`,
      title,
      category,
      organization: organization || 'Independent Academic Work',
      year,
      resultOrAward: resultOrAward || 'Completed & Documented',
      description: description || 'Academic project conducted by student.',
      visibility,
      demonstratedSkills: skillsInput.split(',').map((s) => s.trim()).filter(Boolean),
      fileName: 'Evidence_Documentation.pdf'
    };

    onSave(newAchievement);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#26332D]/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-[#E7ECE6] shadow-xl max-w-xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-[#E7ECE6] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#B7E6A5] flex items-center justify-center text-[#26332D]">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-[#78847B] uppercase tracking-wider">Portfolio Builder</div>
              <h3 className="text-sm font-extrabold text-[#26332D]">Add Academic Achievement</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#78847B] hover:text-[#26332D] hover:bg-[#F3F7F0] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 flex-1 overflow-y-auto space-y-4 text-xs">
          <div>
            <label className="block text-xs font-semibold text-[#26332D] mb-1">
              Achievement or Project Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Regional Environmental Law Mock Trial or Soil Microplastics Study"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7ECE6] text-xs text-[#26332D] focus:outline-none focus:ring-2 focus:ring-[#B7E6A5]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#26332D] mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl border border-[#E7ECE6] text-xs text-[#26332D] bg-white"
              >
                <option value="Academic Achievements">Academic Achievements</option>
                <option value="Research & Projects">Research & Projects</option>
                <option value="Competitions">Competitions</option>
                <option value="Certificates">Certificates</option>
                <option value="Extracurricular Activities">Extracurricular Activities</option>
                <option value="Volunteering">Volunteering</option>
                <option value="Professor Challenge Results">Professor Challenge Results</option>
                <option value="Skills & Interests">Skills & Interests</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#26332D] mb-1">
                Year
              </label>
              <input
                type="text"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="2026"
                className="w-full px-3 py-2 rounded-xl border border-[#E7ECE6] text-xs text-[#26332D]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#26332D] mb-1">
                Issuing Organization or Institution
              </label>
              <input
                type="text"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                placeholder="e.g., Harvard Undergraduate Council / Youth Science League"
                className="w-full px-3 py-2 rounded-xl border border-[#E7ECE6] text-xs text-[#26332D]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#26332D] mb-1">
                Result, Award, or Milestone
              </label>
              <input
                type="text"
                value={resultOrAward}
                onChange={(e) => setResultOrAward(e.target.value)}
                placeholder="e.g., 1st Place / Finalist / Published Poster"
                className="w-full px-3 py-2 rounded-xl border border-[#E7ECE6] text-xs text-[#26332D]"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-[#26332D]">
                Student Description of Work Done
              </label>
              <button
                type="button"
                onClick={() => setAiHelperOpen(!aiHelperOpen)}
                className="text-[11px] text-[#78847B] hover:text-[#26332D] flex items-center gap-1 font-semibold"
              >
                <Sparkles className="w-3 h-3 text-[#B7E6A5]" />
                <span>AI Description Helper</span>
              </button>
            </div>

            {aiHelperOpen && (
              <div className="p-3 mb-2 rounded-xl bg-[#F3F7F0] border border-[#E7ECE6] space-y-1.5 animate-in fade-in duration-150">
                <div className="font-bold text-[11px] text-[#26332D] flex items-center gap-1">
                  <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
                  <span>AI Mentor Prompt:</span>
                </div>
                <p className="text-[11px] text-[#78847B] leading-relaxed">
                  {clarifyingQuestion}
                </p>
                <div className="text-[10px] text-[#78847B]/80 italic">
                  (APEX rule: AI asks questions to prompt reflection, but the student authors the final entry)
                </div>
              </div>
            )}

            <textarea
              rows={3}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="State what you analyzed, what methodologies or arguments you applied, and what you learned..."
              className="w-full p-3 rounded-xl border border-[#E7ECE6] text-xs text-[#26332D] focus:outline-none focus:ring-2 focus:ring-[#B7E6A5]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#26332D] mb-1">
              Demonstrated Skills (comma-separated)
            </label>
            <input
              type="text"
              value={skillsInput}
              onChange={(e) => setSkillsInput(e.target.value)}
              placeholder="Statistical Modeling, Archival Research, Rebuttal"
              className="w-full px-3 py-2 rounded-xl border border-[#E7ECE6] text-xs text-[#26332D]"
            />
          </div>

          <div className="pt-2 flex items-center justify-between border-t border-[#E7ECE6]">
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#78847B]">Visibility:</span>
              <button
                type="button"
                onClick={() => setVisibility(visibility === 'public' ? 'private' : 'public')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold border ${
                  visibility === 'public'
                    ? 'bg-[#F3F7F0] border-[#B7E6A5] text-[#26332D]'
                    : 'border-[#E7ECE6] text-[#78847B]'
                }`}
              >
                {visibility === 'public' ? 'Visible to Universities' : 'Private to Me'}
              </button>
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#B7E6A5] hover:bg-[#aee09c] text-xs font-bold text-[#26332D] transition-colors shadow-xs"
            >
              Save Achievement
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
