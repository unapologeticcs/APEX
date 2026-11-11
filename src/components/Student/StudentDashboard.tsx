import React, { useState } from 'react';
import {
  Home,
  Compass,
  TrendingUp,
  Award,
  Layers,
  MessageSquare,
  User,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  Bookmark,
  Calendar,
  Building,
  ShieldCheck,
  Plus,
  Trash2,
  ThumbsUp,
  Flag,
  ExternalLink,
  Edit3,
  Lock,
  Eye,
  FileText,
  HelpCircle,
  Mic,
  X
} from 'lucide-react';
import {
  StudentProfile,
  Opportunity,
  ProfessorChallenge,
  ChallengeSubmission,
  GrowthTask,
  PortfolioAchievement,
  DiscussionPost,
  Language,
  OpportunityCategory
} from '../../types';
import { translations } from '../../i18n/translations';

interface StudentDashboardProps {
  language: Language;
  profile: StudentProfile;
  onUpdateProfile: (updated: Partial<StudentProfile>) => void;
  opportunities: Opportunity[];
  savedOpportunityIds: string[];
  onToggleSaveOpportunity: (oppId: string) => void;
  onOpenOpportunityDetails: (opp: Opportunity) => void;
  challenges: ProfessorChallenge[];
  submissions: ChallengeSubmission[];
  onOpenChallengeModal: (chal: ProfessorChallenge) => void;
  growthTasks: GrowthTask[];
  onToggleTask: (taskId: string) => void;
  onAddTask: (task: GrowthTask) => void;
  portfolio: PortfolioAchievement[];
  onAddPortfolioAchievement: () => void;
  onDeletePortfolioAchievement: (id: string) => void;
  discussions: DiscussionPost[];
  onAddDiscussionPost: (post: Omit<DiscussionPost, 'id' | 'date' | 'likes' | 'commentsCount'>) => void;
  onLikeDiscussion: (postId: string) => void;
  onReportDiscussion: (postId: string) => void;
  onOpenDiscoveryAssistant: () => void;
  onOpenEssayFeedback: () => void;
  onOpenInterviewSimulator: () => void;
  onOpenPremium: () => void;
}

type StudentTab =
  | 'home'
  | 'discover'
  | 'journey'
  | 'challenges'
  | 'portfolio'
  | 'discussions'
  | 'profile';

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  language,
  profile,
  onUpdateProfile,
  opportunities,
  savedOpportunityIds,
  onToggleSaveOpportunity,
  onOpenOpportunityDetails,
  challenges,
  submissions,
  onOpenChallengeModal,
  growthTasks,
  onToggleTask,
  onAddTask,
  portfolio,
  onAddPortfolioAchievement,
  onDeletePortfolioAchievement,
  discussions,
  onAddDiscussionPost,
  onLikeDiscussion,
  onReportDiscussion,
  onOpenDiscoveryAssistant,
  onOpenEssayFeedback,
  onOpenInterviewSimulator,
  onOpenPremium
}) => {
  const [activeTab, setActiveTab] = useState<StudentTab>('home');
  const t = translations[language];

  // Discover state
  const [discoverCategory, setDiscoverCategory] = useState<OpportunityCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFieldFilter, setSelectedFieldFilter] = useState<string>('all');
  const [selectedFormatFilter, setSelectedFormatFilter] = useState<string>('all');

  // Journey state
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState('Research');
  const [showAddTaskInput, setShowAddTaskInput] = useState(false);

  // Discussions state
  const [selectedDiscussionCat, setSelectedDiscussionCat] = useState<string>('All');
  const [newPostModalOpen, setNewPostModalOpen] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostCategory, setNewPostCategory] = useState<DiscussionPost['category']>('Science');

  // Profile view toggle
  const [previewAsUniversity, setPreviewAsUniversity] = useState(false);

  // 7 Navigation Sections Contract
  const navigationItems: { id: StudentTab; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: t.studentNav.home, icon: <Home className="w-4 h-4" /> },
    { id: 'discover', label: t.studentNav.discover, icon: <Compass className="w-4 h-4" /> },
    { id: 'journey', label: t.studentNav.journey, icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'challenges', label: t.studentNav.challenges, icon: <Award className="w-4 h-4" /> },
    { id: 'portfolio', label: t.studentNav.portfolio, icon: <Layers className="w-4 h-4" /> },
    { id: 'discussions', label: t.studentNav.discussions, icon: <MessageSquare className="w-4 h-4" /> },
    { id: 'profile', label: t.studentNav.profile, icon: <User className="w-4 h-4" /> },
  ];

  // Filtered opportunities
  const filteredOpportunities = opportunities.filter((opp) => {
    const matchesCategory = discoverCategory === 'all' || opp.category === discoverCategory;
    const matchesQuery =
      searchQuery === '' ||
      opp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.shortDesc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesField = selectedFieldFilter === 'all' || opp.field === selectedFieldFilter;
    const matchesFormat = selectedFormatFilter === 'all' || opp.format === selectedFormatFilter;
    return matchesCategory && matchesQuery && matchesField && matchesFormat;
  });

  const handleCreateNewTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    onAddTask({
      id: `task-${Date.now()}`,
      title: newTaskTitle,
      category: newTaskCategory,
      deadline: '2026-12-05',
      timeEstimate: '1.5 hrs',
      completed: false,
      isAiSuggested: false
    });
    setNewTaskTitle('');
    setShowAddTaskInput(false);
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostTitle.trim() || !newPostContent.trim()) return;

    onAddDiscussionPost({
      authorName: profile.displayName,
      authorGrade: `Grade ${profile.grade}`,
      authorInterests: profile.specificInterests.slice(0, 2).join(' & '),
      title: newPostTitle,
      content: newPostContent,
      category: newPostCategory
    });
    setNewPostTitle('');
    setNewPostContent('');
    setNewPostModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F3F7F0]/40 flex flex-col md:flex-row">
      {/* Persistent Sidebar Navigation on Desktop (7 Sections) */}
      <aside className="w-full md:w-64 bg-white border-r border-[#E7ECE6] flex flex-col shrink-0">
        {/* Scholar Profile Snippet in Sidebar */}
        <div className="p-5 border-b border-[#E7ECE6] bg-[#F3F7F0]/40 flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#B7E6A5] text-[#26332D] font-bold flex items-center justify-center text-sm shadow-2xs">
            {profile.displayName.slice(0, 2).toUpperCase()}
          </div>
          <div className="overflow-hidden">
            <div className="text-xs font-bold text-[#26332D] truncate">{profile.displayName}</div>
            <div className="text-[11px] text-[#78847B] truncate">Grade {profile.grade} · {profile.region}</div>
          </div>
        </div>

        {/* 7 Navigation Links */}
        <nav className="p-3 space-y-1 flex-1">
          {navigationItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-3 transition-all ${
                  isActive
                    ? 'bg-[#F3F7F0] text-[#26332D] font-bold border border-[#E7ECE6]'
                    : 'text-[#78847B] hover:text-[#26332D] hover:bg-[#F3F7F0]/50'
                }`}
              >
                <span className={isActive ? 'text-[#26332D]' : 'text-[#78847B]'}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
                {item.id === 'challenges' && submissions.some((s) => s.status === 'Feedback Available') && (
                  <span className="ml-auto w-2 h-2 rounded-full bg-[#B7E6A5]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* AI Assistant Quick Launcher in Sidebar */}
        <div className="p-4 border-t border-[#E7ECE6] space-y-2 bg-[#F3F7F0]/30">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[#78847B]">
            AI Academic Assistants
          </div>
          <button
            onClick={onOpenEssayFeedback}
            className="w-full text-left p-2 rounded-xl bg-white border border-[#E7ECE6] hover:border-[#B7E6A5] text-[11px] font-medium text-[#26332D] flex items-center gap-2 transition-colors"
          >
            <FileText className="w-3.5 h-3.5 text-[#B7E6A5]" />
            <span>Essay Argument Reviewer</span>
          </button>
          <button
            onClick={onOpenInterviewSimulator}
            className="w-full text-left p-2 rounded-xl bg-white border border-[#E7ECE6] hover:border-[#F6C9D5] text-[11px] font-medium text-[#26332D] flex items-center gap-2 transition-colors"
          >
            <Mic className="w-3.5 h-3.5 text-[#F6C9D5]" />
            <span>Interview Simulator</span>
          </button>
        </div>
      </aside>

      {/* Main View Area */}
      <main className="flex-1 max-w-6xl p-4 sm:p-8 overflow-y-auto">
        {/* SECTION 1: HOME */}
        {activeTab === 'home' && (
          <div className="space-y-8">
            {/* Welcome banner */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E7ECE6] shadow-xs relative overflow-hidden">
              <div className="max-w-2xl space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#78847B]">
                  {t.studentHome.welcome}, {profile.displayName}!
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#26332D] leading-tight">
                  {t.studentHome.subtitle}
                </h1>
                <p className="text-xs text-[#78847B]">
                  Your focus: {profile.specificInterests.join(' · ')}
                </p>
              </div>

              {/* Profile completeness progress strip */}
              <div className="mt-6 pt-5 border-t border-[#E7ECE6] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="text-xs font-semibold text-[#26332D] flex items-center gap-2">
                    <span>{t.studentHome.profileCompleteness}:</span>
                    <span className="font-mono font-bold text-emerald-800">{profile.completeness}%</span>
                  </div>
                  <div className="w-48 sm:w-64 bg-[#F3F7F0] h-2 rounded-full overflow-hidden border border-[#E7ECE6]">
                    <div
                      className="bg-[#B7E6A5] h-full rounded-full transition-all"
                      style={{ width: `${profile.completeness}%` }}
                    />
                  </div>
                </div>
                <button
                  onClick={() => setActiveTab('profile')}
                  className="px-4 py-2 text-xs font-bold text-[#26332D] bg-[#F3F7F0] hover:bg-[#E7ECE6] border border-[#E7ECE6] rounded-xl transition-colors whitespace-nowrap self-start sm:self-auto"
                >
                  {t.studentHome.completeProfileBtn}
                </button>
              </div>
            </div>

            {/* Recommended Opportunities Strip */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-[#26332D]">{t.studentHome.recommendedOpps}</h2>
                <button
                  onClick={() => setActiveTab('discover')}
                  className="text-xs font-bold text-[#26332D] hover:underline flex items-center gap-1"
                >
                  <span>{t.studentHome.viewAllOpps}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {opportunities.slice(0, 3).map((opp) => (
                  <div
                    key={opp.id}
                    className="p-5 rounded-2xl bg-white border border-[#E7ECE6] shadow-2xs flex flex-col justify-between hover:border-[#B7E6A5] transition-colors"
                  >
                    <div>
                      <div className="flex items-center justify-between text-[11px] text-[#78847B] mb-1.5">
                        <span className="capitalize font-bold text-[#26332D]">{opp.category}</span>
                        <span className="font-mono text-rose-700">{opp.deadline}</span>
                      </div>
                      <h4 className="text-xs font-bold text-[#26332D] mb-1.5 line-clamp-2">{opp.name}</h4>
                      <p className="text-[11px] text-[#78847B] line-clamp-2 mb-3">{opp.shortDesc}</p>
                    </div>
                    <div className="pt-3 border-t border-[#E7ECE6] flex items-center justify-between">
                      <span className="text-[10px] text-[#78847B] font-medium">{opp.format}</span>
                      <button
                        onClick={() => onOpenOpportunityDetails(opp)}
                        className="text-xs font-bold text-[#26332D] hover:underline"
                      >
                        Details →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Challenges & Growth Plan Overview Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Active Professor Challenges */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-[#26332D]">{t.studentHome.activeChallenges}</h3>
                  <button
                    onClick={() => setActiveTab('challenges')}
                    className="text-xs font-bold text-[#26332D] hover:underline"
                  >
                    View All Challenges
                  </button>
                </div>

                {submissions.length > 0 ? (
                  <div className="space-y-3">
                    {submissions.map((sub) => {
                      const chal = challenges.find((c) => c.id === sub.challengeId);
                      return (
                        <div
                          key={sub.id}
                          className="p-4 rounded-2xl bg-white border border-[#E7ECE6] shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                        >
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#B7E6A5]/60 text-[#26332D]">
                                {sub.status}
                              </span>
                              <span className="text-[11px] text-[#78847B]">Submitted: {sub.submittedAt}</span>
                            </div>
                            <h4 className="text-xs font-bold text-[#26332D]">{sub.challengeTitle}</h4>
                            <p className="text-[11px] text-[#78847B] mt-0.5">
                              {sub.feedback ? '✓ Professor feedback is ready to review!' : 'Professor is evaluating your paper'}
                            </p>
                          </div>
                          <button
                            onClick={() => {
                              if (chal) onOpenChallengeModal(chal);
                            }}
                            className="px-4 py-2 rounded-xl text-xs font-bold bg-[#B7E6A5] hover:bg-[#aee09c] text-[#26332D] transition-colors shrink-0"
                          >
                            {sub.feedback ? 'Read Feedback' : 'Open Solution'}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="p-6 rounded-2xl bg-white border border-[#E7ECE6] text-center space-y-3">
                    <p className="text-xs text-[#78847B]">{t.studentHome.noActiveChallenges}</p>
                    <button
                      onClick={() => setActiveTab('challenges')}
                      className="px-4 py-2 rounded-xl bg-[#B7E6A5] text-xs font-bold text-[#26332D]"
                    >
                      {t.studentHome.exploreChallengesBtn}
                    </button>
                  </div>
                )}
              </div>

              {/* Growth Plan & Upcoming Deadlines */}
              <div className="lg:col-span-5 space-y-4">
                <h3 className="text-base font-bold text-[#26332D]">{t.studentHome.upcomingDeadlines}</h3>
                <div className="p-5 rounded-2xl bg-white border border-[#E7ECE6] shadow-2xs space-y-3">
                  {growthTasks.slice(0, 3).map((task) => (
                    <div
                      key={task.id}
                      onClick={() => onToggleTask(task.id)}
                      className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#F3F7F0] cursor-pointer transition-colors text-xs"
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-4 h-4 rounded border flex items-center justify-center ${
                            task.completed ? 'bg-[#B7E6A5] border-[#B7E6A5] text-[#26332D]' : 'border-[#E7ECE6]'
                          }`}
                        >
                          {task.completed && <CheckCircle2 className="w-3 h-3" />}
                        </div>
                        <span className={`text-xs ${task.completed ? 'line-through text-[#78847B]' : 'text-[#26332D] font-medium'}`}>
                          {task.title}
                        </span>
                      </div>
                      <span className="text-[10px] text-[#78847B] font-mono shrink-0 ml-2">{task.deadline}</span>
                    </div>
                  ))}

                  <div className="pt-2 border-t border-[#E7ECE6] flex items-center justify-between text-xs">
                    <span className="text-[#78847B]">
                      {growthTasks.filter((t) => t.completed).length} of {growthTasks.length} {t.studentHome.tasksCompleted}
                    </span>
                    <button
                      onClick={() => setActiveTab('journey')}
                      className="font-bold text-[#26332D] hover:underline"
                    >
                      Full Roadmap →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 2: DISCOVER */}
        {activeTab === 'discover' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-extrabold text-[#26332D]">Opportunity Discovery Directory</h2>
                <p className="text-xs text-[#78847B]">Explore verified global academic competitions, research opportunities, and scholarships.</p>
              </div>

              <button
                onClick={onOpenDiscoveryAssistant}
                className="px-4 py-2.5 rounded-xl bg-[#B7E6A5] hover:bg-[#aee09c] text-xs font-bold text-[#26332D] flex items-center gap-1.5 shadow-xs transition-colors self-start sm:self-auto"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t.discover.aiHelpBtn}</span>
              </button>
            </div>

            {/* 10 Category Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-[#E7ECE6] text-xs font-semibold">
              {[
                { id: 'all', label: t.discover.allTab },
                { id: 'competitions', label: t.discover.competitionsTab },
                { id: 'essay', label: t.discover.essayTab },
                { id: 'research', label: t.discover.researchTab },
                { id: 'scholarships', label: t.discover.scholarshipsTab },
                { id: 'exchange', label: t.discover.exchangeTab },
                { id: 'summer_schools', label: t.discover.summerTab },
                { id: 'university', label: t.discover.universityTab },
                { id: 'olympiads', label: t.discover.olympiadsTab },
                { id: 'volunteering', label: t.discover.volunteeringTab },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setDiscoverCategory(tab.id as OpportunityCategory)}
                  className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all ${
                    discoverCategory === tab.id
                      ? 'bg-[#26332D] text-white shadow-2xs font-bold'
                      : 'bg-white border border-[#E7ECE6] text-[#78847B] hover:text-[#26332D] hover:bg-[#F3F7F0]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Search and Filters Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
              <div className="sm:col-span-6 relative">
                <Search className="w-4 h-4 text-[#78847B] absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t.discover.searchPlaceholder}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E7ECE6] bg-white text-xs text-[#26332D] focus:outline-none focus:ring-2 focus:ring-[#B7E6A5]"
                />
              </div>

              <div className="sm:col-span-3">
                <select
                  value={selectedFieldFilter}
                  onChange={(e) => setSelectedFieldFilter(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-[#E7ECE6] bg-white text-xs text-[#26332D]"
                >
                  <option value="all">All Fields</option>
                  <option value="law_politics">Law & Politics</option>
                  <option value="science_research">Science & Research</option>
                  <option value="business_economics">Business & Economics</option>
                  <option value="arts_humanities">Arts & Humanities</option>
                </select>
              </div>

              <div className="sm:col-span-3">
                <select
                  value={selectedFormatFilter}
                  onChange={(e) => setSelectedFormatFilter(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-[#E7ECE6] bg-white text-xs text-[#26332D]"
                >
                  <option value="all">All Formats</option>
                  <option value="Online">Online</option>
                  <option value="Offline">Offline</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>
            </div>

            {/* Opportunity Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredOpportunities.map((opp) => {
                const isSaved = savedOpportunityIds.includes(opp.id);
                return (
                  <div
                    key={opp.id}
                    className="p-6 rounded-2xl bg-white border border-[#E7ECE6] shadow-xs flex flex-col justify-between hover:border-[#B7E6A5] transition-all group"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs text-[#78847B] mb-2">
                        <span className="capitalize font-bold text-[#26332D]">{opp.category}</span>
                        <button
                          onClick={() => onToggleSaveOpportunity(opp.id)}
                          className={`p-1.5 rounded-lg border transition-colors ${
                            isSaved ? 'bg-[#B7E6A5]/50 border-[#B7E6A5] text-[#26332D]' : 'border-[#E7ECE6] text-[#78847B] hover:text-[#26332D]'
                          }`}
                          title="Save Opportunity"
                        >
                          <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-[#26332D]' : ''}`} />
                        </button>
                      </div>

                      <h4 className="text-sm font-bold text-[#26332D] mb-1.5 leading-snug">{opp.name}</h4>
                      <p className="text-xs text-[#78847B] line-clamp-3 mb-4 leading-relaxed">{opp.shortDesc}</p>

                      <div className="space-y-1.5 text-[11px] text-[#78847B] mb-4">
                        <div className="flex items-center gap-1.5 truncate">
                          <Building className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate">{opp.organization}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-rose-700 font-medium">
                          <Clock className="w-3.5 h-3.5 shrink-0" />
                          <span>Deadline: {opp.deadline}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[#E7ECE6] flex items-center justify-between">
                      <span className="text-[10px] font-semibold text-[#26332D] bg-[#F3F7F0] px-2 py-0.5 rounded">
                        {opp.format}
                      </span>
                      <button
                        onClick={() => onOpenOpportunityDetails(opp)}
                        className="text-xs font-bold text-[#26332D] hover:underline"
                      >
                        {t.discover.detailsBtn} →
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* SECTION 3: MY JOURNEY */}
        {activeTab === 'journey' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-extrabold text-[#26332D]">{t.journey.title}</h2>
                <p className="text-xs text-[#78847B]">{t.journey.subtitle}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowAddTaskInput(!showAddTaskInput)}
                  className="px-3 py-2 rounded-xl border border-[#E7ECE6] bg-white hover:bg-[#F3F7F0] text-xs font-bold text-[#26332D] transition-colors"
                >
                  {t.journey.addNewTask}
                </button>
                <button
                  onClick={onOpenPremium}
                  className="px-3.5 py-2 rounded-xl bg-[#F6C9D5]/40 border border-[#F6C9D5] text-xs font-bold text-[#26332D] hover:bg-[#F6C9D5]/60 transition-colors flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-rose-600" />
                  <span>{t.journey.aiGenerateBtn}</span>
                </button>
              </div>
            </div>

            {/* Add Custom Task Form */}
            {showAddTaskInput && (
              <form onSubmit={handleCreateNewTask} className="p-4 rounded-2xl bg-white border border-[#E7ECE6] space-y-3">
                <div className="font-bold text-xs text-[#26332D]">Add Custom Academic Milestone:</div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    required
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    placeholder="e.g., Read 3 papers on cryogenic glacial telemetry..."
                    className="flex-1 px-3 py-2 rounded-xl border border-[#E7ECE6] text-xs text-[#26332D]"
                  />
                  <select
                    value={newTaskCategory}
                    onChange={(e) => setNewTaskCategory(e.target.value)}
                    className="px-3 py-2 rounded-xl border border-[#E7ECE6] text-xs text-[#26332D] bg-white"
                  >
                    <option value="Research">Research</option>
                    <option value="International Law">International Law</option>
                    <option value="Competitions">Competitions</option>
                    <option value="Extracurricular">Extracurricular</option>
                  </select>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-[#B7E6A5] text-xs font-bold text-[#26332D] hover:bg-[#aee09c]"
                  >
                    Save Task
                  </button>
                </div>
              </form>
            )}

            {/* Weekly Checklist Tasks */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-[#26332D] uppercase tracking-wider">{t.journey.shortTermGoals}</h3>
              <div className="space-y-2.5">
                {growthTasks.map((task) => (
                  <div
                    key={task.id}
                    onClick={() => onToggleTask(task.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                      task.completed
                        ? 'bg-[#F3F7F0]/60 border-[#E7ECE6] text-[#78847B]'
                        : 'bg-white border-[#E7ECE6] text-[#26332D] hover:border-[#B7E6A5] shadow-2xs'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 ${
                          task.completed
                            ? 'bg-[#B7E6A5] border-[#B7E6A5] text-[#26332D]'
                            : 'border-[#E7ECE6]'
                        }`}
                      >
                        {task.completed && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </div>
                      <div>
                        <div className={`text-xs font-semibold ${task.completed ? 'line-through text-[#78847B]' : 'text-[#26332D]'}`}>
                          {task.title}
                        </div>
                        <div className="text-[11px] text-[#78847B] flex items-center gap-2 mt-0.5">
                          <span>{task.category}</span>
                          <span>·</span>
                          <span>Est. {task.timeEstimate}</span>
                          {task.isAiSuggested && (
                            <span className="text-[10px] text-blue-700 bg-blue-50 px-1.5 rounded">
                              AI Suggested
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <span className="text-xs font-mono text-[#78847B] shrink-0">
                      Due: {task.deadline}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Free vs Premium Notice Card */}
            <div className="p-5 rounded-2xl bg-[#F3F7F0] border border-[#E7ECE6] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div>
                <div className="font-bold text-[#26332D] flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded-full bg-[#B7E6A5] text-[#26332D] text-[10px] font-bold">
                    {t.journey.freePlanBadge}
                  </span>
                  <span>Basic Growth Roadmap active</span>
                </div>
                <p className="text-[#78847B] mt-1">{t.journey.upgradeForDeeper}</p>
              </div>
              <button
                onClick={onOpenPremium}
                className="px-4 py-2 rounded-xl bg-white border border-[#E7ECE6] hover:border-[#F6C9D5] text-xs font-bold text-[#26332D] shrink-0"
              >
                View Premium Features
              </button>
            </div>
          </div>
        )}

        {/* SECTION 4: PROFESSOR CHALLENGES */}
        {activeTab === 'challenges' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-extrabold text-[#26332D]">{t.challenges.title}</h2>
                <p className="text-xs text-[#78847B]">{t.challenges.subtitle}</p>
              </div>
              <button
                onClick={onOpenEssayFeedback}
                className="px-3.5 py-2 rounded-xl bg-white border border-[#E7ECE6] hover:border-[#B7E6A5] text-xs font-bold text-[#26332D] flex items-center gap-1.5"
              >
                <FileText className="w-3.5 h-3.5 text-[#B7E6A5]" />
                <span>Pre-Submission Essay Reviewer</span>
              </button>
            </div>

            {/* Challenges List */}
            <div className="space-y-5">
              {challenges.map((chal) => {
                const sub = submissions.find((s) => s.challengeId === chal.id);
                return (
                  <div
                    key={chal.id}
                    className="p-6 rounded-3xl bg-white border border-[#E7ECE6] shadow-xs flex flex-col md:flex-row justify-between gap-6 hover:border-[#B7E6A5] transition-all"
                  >
                    <div className="space-y-3 max-w-2xl">
                      <div className="flex items-center gap-2 text-xs text-[#78847B]">
                        <span className="font-bold text-[#26332D]">{chal.type}</span>
                        <span>·</span>
                        <span>{chal.subject}</span>
                        <span>·</span>
                        <span className="font-mono text-rose-700">Deadline: {chal.deadline}</span>
                        {sub && (
                          <span className="ml-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#B7E6A5]/80 text-[#26332D]">
                            {sub.status}
                          </span>
                        )}
                      </div>

                      <h3 className="text-lg font-bold text-[#26332D] leading-snug">{chal.title}</h3>
                      <p className="text-xs text-[#78847B] leading-relaxed line-clamp-3">{chal.shortDesc}</p>

                      <div className="p-3.5 rounded-xl bg-[#F3F7F0] border border-[#E7ECE6] text-xs">
                        <div className="font-bold text-[#26332D]">{chal.professorName}</div>
                        <div className="text-[11px] text-[#78847B]">{chal.professorTitle} · {chal.university}</div>
                      </div>
                    </div>

                    <div className="flex md:flex-col justify-between items-end shrink-0 border-t md:border-t-0 md:border-l border-[#E7ECE6] pt-4 md:pt-0 md:pl-6">
                      <div className="text-xs text-[#78847B] text-right">
                        <div>Difficulty: <strong className="text-[#26332D]">{chal.difficulty}</strong></div>
                        <div>Est. time: <strong className="text-[#26332D]">{chal.estimatedHours}</strong></div>
                      </div>

                      <button
                        onClick={() => onOpenChallengeModal(chal)}
                        className="px-5 py-2.5 rounded-xl bg-[#B7E6A5] hover:bg-[#aee09c] text-xs font-bold text-[#26332D] shadow-xs transition-colors"
                      >
                        {sub?.feedback ? 'Review Professor Feedback' : sub ? 'View Uploaded Paper' : t.challenges.startBtn}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* SECTION 5: MY PORTFOLIO */}
        {activeTab === 'portfolio' && (
          <div className="space-y-6">
            {/* Header with Scholar Info & Add Achievement */}
            <div className="p-6 rounded-3xl bg-white border border-[#E7ECE6] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-extrabold text-[#26332D]">{profile.displayName}</h2>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#F3F7F0] text-[#26332D] border border-[#E7ECE6]">
                    Grade {profile.grade}
                  </span>
                </div>
                <p className="text-xs text-[#78847B] mt-1 max-w-xl">{profile.bio}</p>
                <div className="text-[11px] text-[#78847B] mt-2 flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-[#26332D]">Interests:</span>
                  {profile.specificInterests.map((interest, i) => (
                    <span key={i} className="bg-[#F3F7F0] px-2 py-0.5 rounded text-[#26332D]">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={onAddPortfolioAchievement}
                  className="px-4 py-2.5 rounded-xl bg-[#B7E6A5] hover:bg-[#aee09c] text-xs font-bold text-[#26332D] flex items-center gap-1.5 shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{t.portfolio.addBtn}</span>
                </button>
              </div>
            </div>

            {/* AI Portfolio Strength Analysis (Premium Preview) */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-[#F3F7F0] to-[#F6C9D5]/20 border border-[#E7ECE6] space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-[#26332D]">
                  <Sparkles className="w-4 h-4 text-[#B7E6A5]" />
                  <span>{t.portfolio.analysisTitle}</span>
                </div>
                <button
                  onClick={onOpenPremium}
                  className="text-[11px] text-[#26332D] font-bold underline"
                >
                  {t.portfolio.premiumOnly}
                </button>
              </div>
              <p className="text-xs text-[#78847B] leading-relaxed">
                Identified Core Competency: <strong>Interdisciplinary Environmental Jurisprudence</strong>. Your combination of verified cryospheric scientific analysis and moot court argumentation creates an authentic profile for European and US research faculties.
              </p>
            </div>

            {/* Portfolio Items List */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-[#26332D] uppercase tracking-wider">Documented Achievements & Artifacts</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {portfolio.map((item) => (
                  <div
                    key={item.id}
                    className="p-5 rounded-2xl bg-white border border-[#E7ECE6] shadow-2xs flex flex-col justify-between space-y-3"
                  >
                    <div>
                      <div className="flex items-center justify-between text-[11px] text-[#78847B] mb-1">
                        <span className="font-bold text-[#26332D]">{item.category}</span>
                        <span>{item.year}</span>
                      </div>
                      <h4 className="text-sm font-bold text-[#26332D] mb-1">{item.title}</h4>
                      <div className="text-xs text-emerald-800 font-semibold mb-2">{item.resultOrAward}</div>
                      <p className="text-xs text-[#78847B] leading-relaxed">{item.description}</p>
                    </div>

                    <div className="pt-3 border-t border-[#E7ECE6] space-y-2">
                      <div className="flex flex-wrap gap-1">
                        {item.demonstratedSkills.map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            className="px-2 py-0.5 rounded-md bg-[#F3F7F0] text-[10px] text-[#26332D] font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-[#78847B] pt-1">
                        <span className="flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                          <span>{item.visibility === 'public' ? 'Visible to Universities' : 'Private'}</span>
                        </span>
                        <button
                          onClick={() => onDeletePortfolioAchievement(item.id)}
                          className="text-[#78847B] hover:text-rose-600 p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SECTION 6: DISCUSSIONS */}
        {activeTab === 'discussions' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-extrabold text-[#26332D]">{t.discussions.title}</h2>
                <p className="text-xs text-[#78847B]">{t.discussions.subtitle}</p>
              </div>

              <button
                onClick={() => setNewPostModalOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-[#B7E6A5] hover:bg-[#aee09c] text-xs font-bold text-[#26332D] flex items-center gap-1.5 shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{t.discussions.createBtn}</span>
              </button>
            </div>

            {/* Community Rules Banner */}
            <div className="p-3.5 rounded-xl bg-[#F3F7F0] border border-[#E7ECE6] text-[11px] text-[#78847B] flex items-center justify-between">
              <span>{t.discussions.rulesReminder}</span>
              <span className="font-semibold text-[#26332D]">Academic Honor Code</span>
            </div>

            {/* Discussions Feed */}
            <div className="space-y-4">
              {discussions.map((post) => (
                <div
                  key={post.id}
                  className="p-5 rounded-2xl bg-white border border-[#E7ECE6] shadow-2xs space-y-3"
                >
                  <div className="flex items-center justify-between text-xs text-[#78847B]">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#26332D]">{post.authorName}</span>
                      <span>·</span>
                      <span>{post.authorGrade}</span>
                      <span>·</span>
                      <span className="text-[#26332D] font-medium bg-[#F3F7F0] px-2 py-0.5 rounded text-[10px]">
                        {post.category}
                      </span>
                    </div>
                    <span>{post.date}</span>
                  </div>

                  <h3 className="text-sm font-bold text-[#26332D]">{post.title}</h3>
                  <p className="text-xs text-[#78847B] leading-relaxed">{post.content}</p>

                  <div className="pt-3 border-t border-[#E7ECE6] flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => onLikeDiscussion(post.id)}
                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border transition-colors ${
                          post.isLiked ? 'bg-[#B7E6A5]/50 border-[#B7E6A5] text-[#26332D] font-bold' : 'border-[#E7ECE6] text-[#78847B]'
                        }`}
                      >
                        <ThumbsUp className="w-3.5 h-3.5" />
                        <span>{post.likes}</span>
                      </button>
                      <span className="text-xs text-[#78847B]">{post.commentsCount} replies</span>
                    </div>

                    <button
                      onClick={() => onReportDiscussion(post.id)}
                      className={`text-[11px] flex items-center gap-1 hover:text-rose-600 ${
                        post.isReported ? 'text-rose-600 font-bold' : 'text-[#78847B]'
                      }`}
                    >
                      <Flag className="w-3 h-3" />
                      <span>{post.isReported ? 'Reported' : t.discussions.reportBtn}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* New Post Modal */}
            {newPostModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#26332D]/40 backdrop-blur-xs animate-in fade-in duration-200">
                <div className="bg-white rounded-3xl border border-[#E7ECE6] p-6 max-w-lg w-full space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-[#E7ECE6]">
                    <h3 className="text-sm font-bold text-[#26332D]">Start an Academic Discussion</h3>
                    <button onClick={() => setNewPostModalOpen(false)}>
                      <X className="w-4 h-4 text-[#78847B]" />
                    </button>
                  </div>

                  <form onSubmit={handleCreatePost} className="space-y-3 text-xs">
                    <div>
                      <label className="block font-semibold text-[#26332D] mb-1">Title</label>
                      <input
                        type="text"
                        required
                        value={newPostTitle}
                        onChange={(e) => setNewPostTitle(e.target.value)}
                        placeholder="What specific intellectual question do you want to explore?"
                        className="w-full px-3 py-2 rounded-xl border border-[#E7ECE6] text-xs text-[#26332D]"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-[#26332D] mb-1">Category</label>
                      <select
                        value={newPostCategory}
                        onChange={(e) => setNewPostCategory(e.target.value as any)}
                        className="w-full px-3 py-2 rounded-xl border border-[#E7ECE6] text-xs text-[#26332D] bg-white"
                      >
                        <option value="Science">Science</option>
                        <option value="Law & Politics">Law & Politics</option>
                        <option value="Research">Research</option>
                        <option value="University Life">University Life</option>
                        <option value="Competitions">Competitions</option>
                        <option value="General">General</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold text-[#26332D] mb-1">Content</label>
                      <textarea
                        rows={4}
                        required
                        value={newPostContent}
                        onChange={(e) => setNewPostContent(e.target.value)}
                        placeholder="Provide academic context or background..."
                        className="w-full p-3 rounded-xl border border-[#E7ECE6] text-xs text-[#26332D]"
                      />
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setNewPostModalOpen(false)}
                        className="px-4 py-2 text-xs text-[#78847B]"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-[#B7E6A5] text-[#26332D] font-bold text-xs"
                      >
                        Publish Post
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* SECTION 7: MY PROFILE & VISIBILITY */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-extrabold text-[#26332D]">Scholar Profile & Privacy Settings</h2>
                <p className="text-xs text-[#78847B]">Manage how your academic achievements and portfolio are visible to world universities.</p>
              </div>

              {/* Toggle "How Universities See Me" */}
              <button
                onClick={() => setPreviewAsUniversity(!previewAsUniversity)}
                className={`px-4 py-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  previewAsUniversity
                    ? 'bg-[#26332D] text-white border-[#26332D]'
                    : 'bg-white border-[#E7ECE6] text-[#26332D] hover:bg-[#F3F7F0]'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{previewAsUniversity ? 'Viewing as Approved University' : 'Preview as University'}</span>
              </button>
            </div>

            {/* Profile Visibility Controls */}
            <div className="p-6 rounded-3xl bg-white border border-[#E7ECE6] shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-[#26332D]">Granular Visibility Permissions</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'private', label: 'Private Mode', desc: 'Only you can view your portfolio and submissions.' },
                  { id: 'organizations', label: 'Approved Universities', desc: 'Verified faculty and partner university admissions only.' },
                  { id: 'public', label: 'Public Portfolio Link', desc: 'Shareable link for applications and resumes.' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => onUpdateProfile({ visibility: opt.id as any })}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      profile.visibility === opt.id
                        ? 'border-[#B7E6A5] bg-[#F3F7F0] text-[#26332D]'
                        : 'border-[#E7ECE6] text-[#78847B]'
                    }`}
                  >
                    <div className="font-bold text-xs text-[#26332D] mb-1">{opt.label}</div>
                    <p className="text-[11px] text-[#78847B]">{opt.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Profile Overview Card */}
            <div className="p-6 rounded-3xl bg-white border border-[#E7ECE6] space-y-4 text-xs">
              <h3 className="text-sm font-bold text-[#26332D]">Academic Credentials</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-[#78847B] block mb-0.5">Full Legal Name:</span>
                  <span className="font-semibold text-[#26332D]">{profile.fullName}</span>
                </div>
                <div>
                  <span className="text-[#78847B] block mb-0.5">Display Scholar Name:</span>
                  <span className="font-semibold text-[#26332D]">{profile.displayName}</span>
                </div>
                <div>
                  <span className="text-[#78847B] block mb-0.5">School Level & Region:</span>
                  <span className="font-semibold text-[#26332D]">Grade {profile.grade} · {profile.region}, {profile.country}</span>
                </div>
                <div>
                  <span className="text-[#78847B] block mb-0.5">School Classification:</span>
                  <span className="font-semibold text-[#26332D]">{profile.schoolType} Institution</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
