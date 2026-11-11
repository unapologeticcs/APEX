import React, { useState } from 'react';
import {
  Home,
  PlusCircle,
  FileCheck,
  Users,
  Bookmark,
  User,
  BookOpen,
  Award,
  Search,
  Filter,
  Check,
  Send,
  Building,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowRight
} from 'lucide-react';
import {
  TeacherProfile,
  ProfessorChallenge,
  ChallengeSubmission,
  StudentProfile,
  Language,
  AcademicField
} from '../../types';
import { translations } from '../../i18n/translations';

interface TeacherDashboardProps {
  language: Language;
  profile: TeacherProfile;
  challenges: ProfessorChallenge[];
  onPublishChallenge: (newChallenge: ProfessorChallenge) => void;
  submissions: ChallengeSubmission[];
  onReviewSubmission: (submissionId: string, feedback: NonNullable<ChallengeSubmission['feedback']>) => void;
  students: StudentProfile[];
}

type TeacherTab =
  | 'home'
  | 'create'
  | 'challenges'
  | 'submissions'
  | 'discover_students'
  | 'saved_profiles'
  | 'profile';

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({
  language,
  profile,
  challenges,
  onPublishChallenge,
  submissions,
  onReviewSubmission,
  students
}) => {
  const [activeTab, setActiveTab] = useState<TeacherTab>('home');
  const t = translations[language].teacher;

  // Saved profiles state
  const [savedStudentIds, setSavedStudentIds] = useState<string[]>(['student-101']);

  // Create Challenge Wizard state
  const [createStep, setCreateStep] = useState(1);
  const [chalTitle, setChalTitle] = useState('');
  const [chalShortDesc, setChalShortDesc] = useState('');
  const [chalInstructions, setChalInstructions] = useState('');
  const [chalField, setChalField] = useState<AcademicField>('law_politics');
  const [chalSubject, setChalSubject] = useState('Comparative Constitutional Law');
  const [chalType, setChalType] = useState<ProfessorChallenge['type']>('Critical Analysis');
  const [chalDifficulty, setChalDifficulty] = useState<ProfessorChallenge['difficulty']>('Advanced');
  const [chalDeadline, setChalDeadline] = useState('2026-12-30');
  const [chalEstHours, setChalEstHours] = useState('8–10 hours');
  const [chalFormat, setChalFormat] = useState('PDF with academic citations (Chicago/APA)');
  const [chalWordLimit, setChalWordLimit] = useState('1,200–1,800 words');
  const [chalCriteria, setChalCriteria] = useState(
    'Analytical depth (40%), Evidence integration (30%), Legal coherence (30%)'
  );

  // Submissions review state
  const [selectedSubmission, setSelectedSubmission] = useState<ChallengeSubmission | null>(
    submissions[0] || null
  );
  const [overallComments, setOverallComments] = useState(
    'Demonstrates exceptional critical maturity and independent formulation.'
  );
  const [strengthsInput, setStrengthsInput] = useState(
    'Sophisticated primary source citation; dynamic compensation clause logic'
  );
  const [improvementsInput, setImprovementsInput] = useState(
    'Consider historical precedents under the 1960 Indus Waters Treaty'
  );
  const [recommendationsInput, setRecommendationsInput] = useState(
    'Read Oxford International Watercourses jurisprudence by Prof. McCaffrey'
  );
  const [feedbackSuccessNotice, setFeedbackSuccessNotice] = useState(false);

  // Student discovery filter
  const [studentSearch, setStudentSearch] = useState('');

  const toggleSaveStudent = (id: string) => {
    if (savedStudentIds.includes(id)) {
      setSavedStudentIds(savedStudentIds.filter((s) => s !== id));
    } else {
      setSavedStudentIds([...savedStudentIds, id]);
    }
  };

  const handlePublishChallenge = () => {
    if (!chalTitle.trim()) return;

    const newChal: ProfessorChallenge = {
      id: `chal-${Date.now()}`,
      title: chalTitle,
      professorName: profile.fullName,
      professorTitle: profile.title,
      university: profile.institution,
      department: profile.department,
      field: chalField,
      subject: chalSubject,
      type: chalType,
      shortDesc: chalShortDesc || 'University academic challenge open to high school scholars.',
      instructions: chalInstructions || 'Provide full critical reasoning and structured bibliography.',
      learningObjectives: [
        'Interdisciplinary problem formulation',
        'Academic source attribution',
        'Synthesizing quantitative data with legal/scientific doctrine'
      ],
      requiredFormat: chalFormat,
      wordLimit: chalWordLimit,
      difficulty: chalDifficulty,
      deadline: chalDeadline,
      estimatedHours: chalEstHours,
      evaluationCriteria: chalCriteria.split(',').map((c) => c.trim()),
      publishedDate: new Date().toISOString().split('T')[0],
      status: 'Published',
      submissionsCount: 0,
      reviewPendingCount: 0
    };

    onPublishChallenge(newChal);
    setActiveTab('challenges');
    setCreateStep(1);
  };

  const handleSendFeedback = () => {
    if (!selectedSubmission) return;

    onReviewSubmission(selectedSubmission.id, {
      overallComments,
      strengths: strengthsInput.split(';').map((s) => s.trim()),
      improvements: improvementsInput.split(';').map((s) => s.trim()),
      recommendations: recommendationsInput,
      reviewedAt: new Date().toISOString().split('T')[0],
      professorName: `${profile.fullName} (${profile.institution})`
    });

    setFeedbackSuccessNotice(true);
    setTimeout(() => setFeedbackSuccessNotice(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#F3F7F0]/40 flex flex-col md:flex-row">
      {/* Sidebar Navigation for Teachers */}
      <aside className="w-full md:w-64 bg-white border-r border-[#E7ECE6] flex flex-col shrink-0">
        <div className="p-5 border-b border-[#E7ECE6] bg-[#F3F7F0]/40 flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#B7E6A5] text-[#26332D] font-bold flex items-center justify-center text-sm shadow-2xs">
            {profile.displayName.slice(0, 2).toUpperCase()}
          </div>
          <div className="overflow-hidden">
            <div className="text-xs font-bold text-[#26332D] truncate">{profile.displayName}</div>
            <div className="text-[11px] text-[#78847B] truncate">{profile.institution}</div>
          </div>
        </div>

        <nav className="p-3 space-y-1 flex-1">
          {[
            { id: 'home', label: 'Overview', icon: <Home className="w-4 h-4" /> },
            { id: 'create', label: t.createNewChallengeBtn, icon: <PlusCircle className="w-4 h-4" /> },
            { id: 'challenges', label: t.myChallengesTab, icon: <BookOpen className="w-4 h-4" /> },
            { id: 'submissions', label: t.submissionsTab, icon: <FileCheck className="w-4 h-4" /> },
            { id: 'discover_students', label: t.discoverStudentsTab, icon: <Users className="w-4 h-4" /> },
            { id: 'saved_profiles', label: t.savedProfilesTab, icon: <Bookmark className="w-4 h-4" /> },
            { id: 'profile', label: 'Faculty Profile', icon: <User className="w-4 h-4" /> },
          ].map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as TeacherTab)}
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-3 transition-all ${
                  isActive
                    ? 'bg-[#F3F7F0] text-[#26332D] font-bold border border-[#E7ECE6]'
                    : 'text-[#78847B] hover:text-[#26332D] hover:bg-[#F3F7F0]/50'
                }`}
              >
                <span className={isActive ? 'text-[#26332D]' : 'text-[#78847B]'}>{item.icon}</span>
                <span>{item.label}</span>
                {item.id === 'submissions' && submissions.some((s) => s.status === 'Submitted') && (
                  <span className="ml-auto px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-[#B7E6A5] text-[#26332D]">
                    1
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main Teacher Content Area */}
      <main className="flex-1 max-w-6xl p-4 sm:p-8 overflow-y-auto">
        {/* OVERVIEW */}
        {activeTab === 'home' && (
          <div className="space-y-8">
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E7ECE6] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#78847B]">
                  Faculty Portal · {profile.institution}
                </span>
                <h1 className="text-2xl font-extrabold text-[#26332D] mt-1">{t.homeTitle}</h1>
                <p className="text-xs text-[#78847B] mt-1">{t.homeSub}</p>
              </div>

              <button
                onClick={() => setActiveTab('create')}
                className="px-5 py-2.5 rounded-xl bg-[#B7E6A5] hover:bg-[#aee09c] text-xs font-bold text-[#26332D] shadow-xs transition-colors self-start sm:self-auto"
              >
                {t.createNewChallengeBtn}
              </button>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-white border border-[#E7ECE6] shadow-2xs">
                <span className="text-xs text-[#78847B]">{t.activeChallengesCount}</span>
                <div className="text-2xl font-bold font-mono text-[#26332D] mt-1">{challenges.length}</div>
                <div className="text-[11px] text-[#78847B] mt-1">Open to secondary scholars</div>
              </div>
              <div className="p-5 rounded-2xl bg-white border border-[#E7ECE6] shadow-2xs">
                <span className="text-xs text-[#78847B]">{t.totalSubmissions}</span>
                <div className="text-2xl font-bold font-mono text-[#26332D] mt-1">{submissions.length}</div>
                <div className="text-[11px] text-emerald-800 font-medium mt-1">Across Central Asia & Global</div>
              </div>
              <div className="p-5 rounded-2xl bg-white border border-[#E7ECE6] shadow-2xs">
                <span className="text-xs text-[#78847B]">{t.awaitingReview}</span>
                <div className="text-2xl font-bold font-mono text-rose-700 mt-1">
                  {submissions.filter((s) => s.status !== 'Feedback Available').length}
                </div>
                <div className="text-[11px] text-[#78847B] mt-1">Submissions needing critique</div>
              </div>
            </div>

            {/* Recent Submissions quick table */}
            <div className="p-6 rounded-3xl bg-white border border-[#E7ECE6] space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-[#26332D]">Recent Student Solutions</h3>
                <button
                  onClick={() => setActiveTab('submissions')}
                  className="text-xs font-bold text-[#26332D] hover:underline"
                >
                  Manage All →
                </button>
              </div>

              <div className="space-y-3">
                {submissions.map((sub) => (
                  <div
                    key={sub.id}
                    className="p-4 rounded-2xl bg-[#F3F7F0]/40 border border-[#E7ECE6] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="font-bold text-[#26332D]">{sub.studentName} ({sub.studentGrade})</div>
                      <div className="text-[#78847B]">{sub.challengeTitle}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#B7E6A5]/80 text-[#26332D]">
                        {sub.status}
                      </span>
                      <button
                        onClick={() => {
                          setSelectedSubmission(sub);
                          setActiveTab('submissions');
                        }}
                        className="px-3 py-1.5 rounded-xl bg-white border border-[#E7ECE6] font-semibold text-[#26332D] hover:bg-[#F3F7F0]"
                      >
                        {t.reviewActionBtn}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CREATE CHALLENGE (4 Steps) */}
        {activeTab === 'create' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-extrabold text-[#26332D]">{t.createNewChallengeBtn}</h2>
              <p className="text-xs text-[#78847B]">Step {createStep} of 4 · Publish university-level academic tasks for young scholars.</p>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-[#E7ECE6] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#B7E6A5] h-full transition-all"
                style={{ width: `${(createStep / 4) * 100}%` }}
              />
            </div>

            <div className="p-6 rounded-3xl bg-white border border-[#E7ECE6] space-y-5 text-xs">
              {/* STEP 1: Info */}
              {createStep === 1 && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-[#26332D]">Step 1 — Challenge Information</h3>

                  <div>
                    <label className="block font-semibold mb-1">Challenge Title</label>
                    <input
                      type="text"
                      value={chalTitle}
                      onChange={(e) => setChalTitle(e.target.value)}
                      placeholder="e.g., Critical Analysis of Planetary Biosignatures"
                      className="w-full p-2.5 rounded-xl border border-[#E7ECE6]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold mb-1">Subject / Domain</label>
                      <input
                        type="text"
                        value={chalSubject}
                        onChange={(e) => setChalSubject(e.target.value)}
                        placeholder="Comparative Constitutional Law"
                        className="w-full p-2.5 rounded-xl border border-[#E7ECE6]"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold mb-1">Task Type</label>
                      <select
                        value={chalType}
                        onChange={(e) => setChalType(e.target.value as any)}
                        className="w-full p-2.5 rounded-xl border border-[#E7ECE6] bg-white"
                      >
                        <option value="Critical Analysis">Critical Analysis</option>
                        <option value="Research Proposal">Research Proposal</option>
                        <option value="Problem Solving">Problem Solving</option>
                        <option value="Case Study">Case Study</option>
                        <option value="Scientific Project">Scientific Project</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold mb-1">Short Description</label>
                    <textarea
                      rows={2}
                      value={chalShortDesc}
                      onChange={(e) => setChalShortDesc(e.target.value)}
                      placeholder="Summary shown on discovery cards..."
                      className="w-full p-2.5 rounded-xl border border-[#E7ECE6]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-1">Full Instructions & Background Prompt</label>
                    <textarea
                      rows={4}
                      value={chalInstructions}
                      onChange={(e) => setChalInstructions(e.target.value)}
                      placeholder="Explain the academic problem, required citations, and specific analytical questions..."
                      className="w-full p-2.5 rounded-xl border border-[#E7ECE6]"
                    />
                  </div>
                </div>
              )}

              {/* STEP 2: Requirements */}
              {createStep === 2 && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-[#26332D]">Step 2 — Requirements & Rubric</h3>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold mb-1">Difficulty</label>
                      <select
                        value={chalDifficulty}
                        onChange={(e) => setChalDifficulty(e.target.value as any)}
                        className="w-full p-2.5 rounded-xl border border-[#E7ECE6] bg-white"
                      >
                        <option value="Introductory">Introductory</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold mb-1">Estimated Hours</label>
                      <input
                        type="text"
                        value={chalEstHours}
                        onChange={(e) => setChalEstHours(e.target.value)}
                        placeholder="8–10 hours"
                        className="w-full p-2.5 rounded-xl border border-[#E7ECE6]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold mb-1">Submission Deadline</label>
                      <input
                        type="date"
                        value={chalDeadline}
                        onChange={(e) => setChalDeadline(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-[#E7ECE6]"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold mb-1">Word Count Limits</label>
                      <input
                        type="text"
                        value={chalWordLimit}
                        onChange={(e) => setChalWordLimit(e.target.value)}
                        placeholder="1,200–1,800 words"
                        className="w-full p-2.5 rounded-xl border border-[#E7ECE6]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold mb-1">Evaluation Criteria (comma-separated)</label>
                    <input
                      type="text"
                      value={chalCriteria}
                      onChange={(e) => setChalCriteria(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-[#E7ECE6]"
                    />
                  </div>
                </div>
              )}

              {/* STEP 3: Visibility */}
              {createStep === 3 && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-[#26332D]">Step 3 — Target Scholar Visibility</h3>
                  <p className="text-[#78847B]">Select who can discover and submit solutions for this challenge:</p>

                  <div className="space-y-2">
                    <div className="p-3.5 rounded-xl border border-[#B7E6A5] bg-[#F3F7F0] flex items-center justify-between">
                      <span className="font-bold text-[#26332D]">Open to all secondary school students globally</span>
                      <Check className="w-4 h-4 text-[#26332D]" />
                    </div>
                    <div className="p-3.5 rounded-xl border border-[#E7ECE6] text-[#78847B]">
                      Restricted to Grade 11 & 12 scholars only
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: Review & Publish */}
              {createStep === 4 && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-[#26332D]">Step 4 — Final Preview & Publishing</h3>

                  <div className="p-4 rounded-2xl bg-[#F3F7F0] border border-[#E7ECE6] space-y-2">
                    <div className="text-sm font-bold text-[#26332D]">{chalTitle || 'Untitled Challenge'}</div>
                    <div className="text-[#78847B]">{chalSubject} · {chalType} · {chalDifficulty}</div>
                    <p className="text-[#78847B] italic">"{chalShortDesc || 'Student academic problem'}"</p>
                  </div>
                </div>
              )}

              {/* Wizard Nav Controls */}
              <div className="pt-4 border-t border-[#E7ECE6] flex items-center justify-between">
                {createStep > 1 ? (
                  <button
                    type="button"
                    onClick={() => setCreateStep(createStep - 1)}
                    className="px-4 py-2 text-xs font-bold text-[#78847B]"
                  >
                    Back
                  </button>
                ) : <div />}

                {createStep < 4 ? (
                  <button
                    type="button"
                    onClick={() => setCreateStep(createStep + 1)}
                    className="px-5 py-2.5 rounded-xl bg-[#B7E6A5] text-xs font-bold text-[#26332D]"
                  >
                    Next Step →
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handlePublishChallenge}
                    className="px-6 py-2.5 rounded-xl bg-[#B7E6A5] hover:bg-[#aee09c] text-xs font-bold text-[#26332D]"
                  >
                    Publish Challenge to Students
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* MY CHALLENGES */}
        {activeTab === 'challenges' && (
          <div className="space-y-6">
            <h2 className="text-xl font-extrabold text-[#26332D]">{t.myChallengesTab}</h2>
            <div className="space-y-4">
              {challenges.map((c) => (
                <div key={c.id} className="p-6 rounded-2xl bg-white border border-[#E7ECE6] flex justify-between items-center text-xs">
                  <div>
                    <h3 className="font-bold text-sm text-[#26332D]">{c.title}</h3>
                    <div className="text-[#78847B] mt-0.5">{c.type} · Deadline: {c.deadline} · {c.submissionsCount} submissions</div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#B7E6A5]/60 font-bold text-[#26332D]">
                    {c.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SUBMISSIONS & STRUCTURED FEEDBACK */}
        {activeTab === 'submissions' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-extrabold text-[#26332D]">{t.submissionsTab}</h2>
              <p className="text-xs text-[#78847B]">Provide structured, encouraging academic critiques for student work.</p>
            </div>

            {feedbackSuccessNotice && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{t.feedbackSentSuccess}</span>
              </div>
            )}

            {selectedSubmission && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left: Student submission details */}
                <div className="lg:col-span-6 p-6 rounded-3xl bg-white border border-[#E7ECE6] space-y-4 text-xs">
                  <div className="flex items-center justify-between pb-3 border-b border-[#E7ECE6]">
                    <div>
                      <div className="text-sm font-bold text-[#26332D]">{selectedSubmission.studentName}</div>
                      <div className="text-[#78847B]">Grade {selectedSubmission.studentGrade} · {selectedSubmission.submittedAt}</div>
                    </div>
                    <span className="font-mono text-[11px] text-[#78847B]">{selectedSubmission.fileName}</span>
                  </div>

                  <div>
                    <h4 className="font-bold text-[#26332D] mb-1">Student's Problem Summary:</h4>
                    <p className="p-3 rounded-xl bg-[#F3F7F0] text-[#78847B] leading-relaxed">
                      {selectedSubmission.workDescription}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-[#26332D] mb-1">Submitted Excerpt:</h4>
                    <div className="p-4 rounded-xl bg-[#F3F7F0]/60 border border-[#E7ECE6] text-[#26332D] italic font-serif leading-relaxed">
                      "{selectedSubmission.contentSample}"
                    </div>
                  </div>
                </div>

                {/* Right: Structured feedback form */}
                <div className="lg:col-span-6 p-6 rounded-3xl bg-white border border-[#E7ECE6] space-y-4 text-xs">
                  <h3 className="font-bold text-sm text-[#26332D]">Faculty Evaluation Form</h3>

                  <div>
                    <label className="block font-semibold mb-1">Overall Commentary</label>
                    <textarea
                      rows={3}
                      value={overallComments}
                      onChange={(e) => setOverallComments(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-[#E7ECE6]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-1">Strengths (semicolon-separated)</label>
                    <input
                      type="text"
                      value={strengthsInput}
                      onChange={(e) => setStrengthsInput(e.target.value)}
                      className="w-full p-2 rounded-xl border border-[#E7ECE6]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-1">Areas for Growth (semicolon-separated)</label>
                    <input
                      type="text"
                      value={improvementsInput}
                      onChange={(e) => setImprovementsInput(e.target.value)}
                      className="w-full p-2 rounded-xl border border-[#E7ECE6]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-1">Recommended Reading</label>
                    <input
                      type="text"
                      value={recommendationsInput}
                      onChange={(e) => setRecommendationsInput(e.target.value)}
                      className="w-full p-2 rounded-xl border border-[#E7ECE6]"
                    />
                  </div>

                  <button
                    onClick={handleSendFeedback}
                    className="w-full py-3 rounded-xl bg-[#B7E6A5] hover:bg-[#aee09c] text-xs font-bold text-[#26332D] flex items-center justify-center gap-2 shadow-xs transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{t.sendFeedbackBtn}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* DISCOVER STUDENTS */}
        {activeTab === 'discover_students' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-extrabold text-[#26332D]">{t.discoverStudentsTab}</h2>
              <p className="text-xs text-[#78847B]">Discover young emerging scholars who have opted to make their portfolios visible to verified universities.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {students
                .filter((s) => s.visibility !== 'private')
                .map((student) => {
                  const isBookmarked = savedStudentIds.includes(student.id);
                  return (
                    <div
                      key={student.id}
                      className="p-6 rounded-2xl bg-white border border-[#E7ECE6] shadow-2xs space-y-3 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-bold text-sm text-[#26332D]">{student.displayName}</div>
                          <div className="text-[11px] text-[#78847B]">Grade {student.grade} · {student.region}, {student.country}</div>
                        </div>
                        <button
                          onClick={() => toggleSaveStudent(student.id)}
                          className={`p-1.5 rounded-lg border ${
                            isBookmarked ? 'bg-[#B7E6A5]/50 border-[#B7E6A5] text-[#26332D]' : 'border-[#E7ECE6] text-[#78847B]'
                          }`}
                        >
                          <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-[#26332D]' : ''}`} />
                        </button>
                      </div>

                      <p className="text-[#78847B] leading-relaxed">{student.bio}</p>

                      <div className="flex flex-wrap gap-1 pt-2 border-t border-[#E7ECE6]">
                        {student.specificInterests.map((interest, i) => (
                          <span key={i} className="px-2 py-0.5 rounded bg-[#F3F7F0] text-[10px] text-[#26332D] font-medium">
                            {interest}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {/* SAVED PROFILES */}
        {activeTab === 'saved_profiles' && (
          <div className="space-y-6">
            <h2 className="text-xl font-extrabold text-[#26332D]">{t.savedProfilesTab}</h2>
            <div className="space-y-4">
              {students
                .filter((s) => savedStudentIds.includes(s.id))
                .map((s) => (
                  <div key={s.id} className="p-5 rounded-2xl bg-white border border-[#E7ECE6] flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-sm text-[#26332D]">{s.displayName}</div>
                      <div className="text-[#78847B]">Grade {s.grade} · {s.specificInterests.join(', ')}</div>
                    </div>
                    <button
                      onClick={() => toggleSaveStudent(s.id)}
                      className="text-xs text-rose-600 underline font-semibold"
                    >
                      Remove Bookmark
                    </button>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* FACULTY PROFILE */}
        {activeTab === 'profile' && (
          <div className="p-6 rounded-3xl bg-white border border-[#E7ECE6] space-y-4 text-xs">
            <h2 className="text-xl font-extrabold text-[#26332D]">Faculty Verification & Department</h2>
            <div className="space-y-2">
              <div><strong>Name:</strong> {profile.fullName}</div>
              <div><strong>Title:</strong> {profile.title}</div>
              <div><strong>Institution:</strong> {profile.institution}</div>
              <div><strong>Department:</strong> {profile.department}</div>
              <div className="text-emerald-700 font-bold">✓ Verified Academic Email</div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
