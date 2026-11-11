import React, { useState } from 'react';
import {
  StudentProfile,
  TeacherProfile,
  Opportunity,
  ProfessorChallenge,
  ChallengeSubmission,
  GrowthTask,
  PortfolioAchievement,
  DiscussionPost,
  AppNotification,
  Language,
  UserRole
} from './types';
import {
  initialStudentProfile,
  initialTeacherProfile,
  initialOpportunities,
  initialChallenges,
  initialSubmissions,
  initialGrowthTasks,
  initialPortfolio,
  initialDiscussions,
  initialNotifications
} from './data/mockData';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/Landing/LandingPage';
import { StudentDashboard } from './components/Student/StudentDashboard';
import { TeacherDashboard } from './components/Teacher/TeacherDashboard';
import { OnboardingModal } from './components/Auth/OnboardingModal';
import { OpportunityDetailsModal } from './components/Student/OpportunityDetailsModal';
import { ChallengeSubmissionModal } from './components/Student/ChallengeSubmissionModal';
import { AddAchievementModal } from './components/Student/AddAchievementModal';
import { OpportunityDiscoveryAssistantModal } from './components/AI/OpportunityDiscoveryAssistantModal';
import { InterviewSimulatorModal } from './components/AI/InterviewSimulatorModal';
import { EssayFeedbackModal } from './components/AI/EssayFeedbackModal';
import { PremiumModal } from './components/Premium/PremiumModal';
import { NotificationDrawer } from './components/Notifications/NotificationDrawer';
import { Pip } from './components/Companion/Pip';

export default function App() {
  // Navigation & session state
  const [currentView, setCurrentView] = useState<'landing' | 'student' | 'teacher'>('landing');
  const [language, setLanguage] = useState<Language>('en');
  const [userRole, setUserRole] = useState<UserRole>('student');

  // Application Data States
  const [studentProfile, setStudentProfile] = useState<StudentProfile>(initialStudentProfile);
  const [teacherProfile, setTeacherProfile] = useState<TeacherProfile>(initialTeacherProfile);
  const [opportunities, setOpportunities] = useState<Opportunity[]>(initialOpportunities);
  const [savedOpportunityIds, setSavedOpportunityIds] = useState<string[]>(['opp-1', 'opp-2']);
  const [challenges, setChallenges] = useState<ProfessorChallenge[]>(initialChallenges);
  const [submissions, setSubmissions] = useState<ChallengeSubmission[]>(initialSubmissions);
  const [growthTasks, setGrowthTasks] = useState<GrowthTask[]>(initialGrowthTasks);
  const [portfolio, setPortfolio] = useState<PortfolioAchievement[]>(initialPortfolio);
  const [discussions, setDiscussions] = useState<DiscussionPost[]>(initialDiscussions);
  const [notifications, setNotifications] = useState<AppNotification[]>(initialNotifications);
  const [isPremium, setIsPremium] = useState(false);

  // Pip Event State
  const [pipEvent, setPipEvent] = useState<'taskCompleted' | 'submission' | 'achievementAdded' | null>(null);

  // Modals & Panels State
  const [onboardingOpen, setOnboardingOpen] = useState(false);
  const [onboardingInitialRole, setOnboardingInitialRole] = useState<UserRole | undefined>(undefined);
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);
  const [selectedChallenge, setSelectedChallenge] = useState<ProfessorChallenge | null>(null);
  const [addAchievementOpen, setAddAchievementOpen] = useState(false);
  const [discoveryAssistantOpen, setDiscoveryAssistantOpen] = useState(false);
  const [interviewSimulatorOpen, setInterviewSimulatorOpen] = useState(false);
  const [essayFeedbackOpen, setEssayFeedbackOpen] = useState(false);
  const [premiumModalOpen, setPremiumModalOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Handlers
  const handleOpenOnboarding = (role?: UserRole) => {
    setOnboardingInitialRole(role);
    setOnboardingOpen(true);
  };

  const handleCompleteStudentOnboarding = (profileData: Partial<StudentProfile>) => {
    setStudentProfile((prev) => ({
      ...prev,
      ...profileData,
    }));
    setUserRole('student');
    setCurrentView('student');
  };

  const handleCompleteTeacherOnboarding = (profileData: Partial<TeacherProfile>) => {
    setTeacherProfile((prev) => ({
      ...prev,
      ...profileData,
    }));
    setUserRole('teacher');
    setCurrentView('teacher');
  };

  const handleToggleSaveOpportunity = (oppId: string) => {
    if (savedOpportunityIds.includes(oppId)) {
      setSavedOpportunityIds(savedOpportunityIds.filter((id) => id !== oppId));
    } else {
      setSavedOpportunityIds([...savedOpportunityIds, oppId]);
      // Push notification
      const opp = opportunities.find((o) => o.id === oppId);
      if (opp) {
        setNotifications((prev) => [
          {
            id: `notif-${Date.now()}`,
            title: 'Opportunity Bookmarked',
            message: `You saved "${opp.name}". We will alert you 7 days before deadline on ${opp.deadline}.`,
            timestamp: 'Just now',
            read: false,
            type: 'opportunity',
          },
          ...prev,
        ]);
      }
    }
  };

  const handleToggleTask = (taskId: string) => {
    setGrowthTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const willBeCompleted = !t.completed;
          if (willBeCompleted) {
            setPipEvent('taskCompleted');
          }
          return { ...t, completed: willBeCompleted };
        }
        return t;
      })
    );
  };

  const handleAddTask = (newTask: GrowthTask) => {
    setGrowthTasks((prev) => [newTask, ...prev]);
  };

  const handlePublishChallenge = (newChallenge: ProfessorChallenge) => {
    setChallenges((prev) => [newChallenge, ...prev]);
    // Notify students
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: 'New Faculty Challenge Published!',
        message: `${newChallenge.professorName} published a new challenge: "${newChallenge.title}".`,
        timestamp: 'Just now',
        read: false,
        type: 'challenge',
      },
      ...prev,
    ]);
  };

  const handleSubmitChallengeWork = (submissionData: {
    challengeId: string;
    fileName: string;
    workDescription: string;
    sampleExcerpt: string;
  }) => {
    const targetChal = challenges.find((c) => c.id === submissionData.challengeId);
    const newSub: ChallengeSubmission = {
      id: `sub-${Date.now()}`,
      challengeId: submissionData.challengeId,
      challengeTitle: targetChal?.title || 'Academic Assignment',
      studentId: studentProfile.id,
      studentName: studentProfile.displayName,
      studentGrade: studentProfile.grade,
      submittedAt: new Date().toISOString().split('T')[0],
      fileName: submissionData.fileName,
      fileSize: '1.8 MB',
      workDescription: submissionData.workDescription,
      contentSample: submissionData.sampleExcerpt,
      status: 'Submitted',
    };

    setSubmissions((prev) => [newSub, ...prev]);
    setPipEvent('submission');

    // Notification
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: 'Work Successfully Submitted',
        message: `Your paper for "${targetChal?.title}" has been delivered to the professor’s review queue.`,
        timestamp: 'Just now',
        read: false,
        type: 'challenge',
      },
      ...prev,
    ]);
  };

  const handleReviewSubmission = (
    submissionId: string,
    feedback: NonNullable<ChallengeSubmission['feedback']>
  ) => {
    setSubmissions((prev) =>
      prev.map((s) => {
        if (s.id === submissionId) {
          return {
            ...s,
            status: 'Feedback Available',
            feedback,
          };
        }
        return s;
      })
    );

    // Add alert notification for student
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: 'Professor Evaluation Received!',
        message: `${feedback.professorName} has finished reviewing your solution. Read your critique.`,
        timestamp: 'Just now',
        read: false,
        type: 'feedback',
      },
      ...prev,
    ]);
  };

  const handleAddSubmissionToPortfolio = (submission: ChallengeSubmission) => {
    const chal = challenges.find((c) => c.id === submission.challengeId);
    const newAchievement: PortfolioAchievement = {
      id: `port-${Date.now()}`,
      title: submission.challengeTitle,
      category: 'Professor Challenge Results',
      organization: `${chal?.university || 'Academic Faculty'} (${chal?.professorName || 'Professor Review'})`,
      year: '2026',
      resultOrAward: 'Reviewed by University Faculty',
      description: submission.workDescription,
      fileName: submission.fileName,
      visibility: 'public',
      demonstratedSkills: [
        'Critical Formulation',
        'Primary Source Analysis',
        'Academic Drafting',
      ],
    };

    setPortfolio((prev) => [newAchievement, ...prev]);
    setPipEvent('achievementAdded');
  };

  const handleSavePortfolioAchievement = (achievement: PortfolioAchievement) => {
    setPortfolio((prev) => [achievement, ...prev]);
    setPipEvent('achievementAdded');
  };

  const handleDeletePortfolioAchievement = (id: string) => {
    setPortfolio((prev) => prev.filter((p) => p.id !== id));
  };

  const handleAddDiscussionPost = (post: Omit<DiscussionPost, 'id' | 'date' | 'likes' | 'commentsCount'>) => {
    const newPost: DiscussionPost = {
      ...post,
      id: `post-${Date.now()}`,
      date: 'Just now',
      likes: 1,
      isLiked: true,
      commentsCount: 0,
    };
    setDiscussions((prev) => [newPost, ...prev]);
  };

  const handleLikeDiscussion = (postId: string) => {
    setDiscussions((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const isLiked = !p.isLiked;
          return {
            ...p,
            isLiked,
            likes: isLiked ? p.likes + 1 : p.likes - 1,
          };
        }
        return p;
      })
    );
  };

  const handleReportDiscussion = (postId: string) => {
    setDiscussions((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, isReported: true } : p))
    );
  };

  const unreadNotificationCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-white text-[#26332D] selection:bg-[#B7E6A5] selection:text-[#26332D]">
      {/* Top Bar Navigation */}
      <Navbar
        currentView={currentView}
        onNavigate={(view) => setCurrentView(view)}
        language={language}
        onLanguageChange={(lang) => setLanguage(lang)}
        userRole={userRole}
        onRoleChange={(r) => {
          setUserRole(r);
          setCurrentView(r);
        }}
        onOpenOnboarding={(r) => handleOpenOnboarding(r)}
        onOpenNotifications={() => setNotificationsOpen(true)}
        unreadCount={unreadNotificationCount}
        isPremium={isPremium}
        onOpenPremium={() => setPremiumModalOpen(true)}
        studentName={studentProfile.displayName}
      />

      {/* Main View Switching */}
      {currentView === 'landing' && (
        <LandingPage
          language={language}
          onExplore={() => {
            setCurrentView('student');
          }}
          onJoin={() => handleOpenOnboarding('student')}
          featuredOpportunities={opportunities}
          featuredChallenges={challenges}
          onOpenOpportunity={(opp) => setSelectedOpportunity(opp)}
          onOpenChallenge={(chal) => setSelectedChallenge(chal)}
        />
      )}

      {currentView === 'student' && (
        <StudentDashboard
          language={language}
          profile={studentProfile}
          onUpdateProfile={(updated) => setStudentProfile((prev) => ({ ...prev, ...updated }))}
          opportunities={opportunities}
          savedOpportunityIds={savedOpportunityIds}
          onToggleSaveOpportunity={handleToggleSaveOpportunity}
          onOpenOpportunityDetails={(opp) => setSelectedOpportunity(opp)}
          challenges={challenges}
          submissions={submissions}
          onOpenChallengeModal={(chal) => setSelectedChallenge(chal)}
          growthTasks={growthTasks}
          onToggleTask={handleToggleTask}
          onAddTask={handleAddTask}
          portfolio={portfolio}
          onAddPortfolioAchievement={() => setAddAchievementOpen(true)}
          onDeletePortfolioAchievement={handleDeletePortfolioAchievement}
          discussions={discussions}
          onAddDiscussionPost={handleAddDiscussionPost}
          onLikeDiscussion={handleLikeDiscussion}
          onReportDiscussion={handleReportDiscussion}
          onOpenDiscoveryAssistant={() => setDiscoveryAssistantOpen(true)}
          onOpenEssayFeedback={() => setEssayFeedbackOpen(true)}
          onOpenInterviewSimulator={() => setInterviewSimulatorOpen(true)}
          onOpenPremium={() => setPremiumModalOpen(true)}
        />
      )}

      {currentView === 'teacher' && (
        <TeacherDashboard
          language={language}
          profile={teacherProfile}
          challenges={challenges}
          onPublishChallenge={handlePublishChallenge}
          submissions={submissions}
          onReviewSubmission={handleReviewSubmission}
          students={[studentProfile]}
        />
      )}

      {/* Interactive Academic Companion (Pip) */}
      <Pip
        language={language}
        streakDays={studentProfile.streakDays}
        lastEvent={pipEvent}
        onClearEvent={() => setPipEvent(null)}
      />

      {/* MODALS */}
      {/* 1. Onboarding Modal */}
      <OnboardingModal
        isOpen={onboardingOpen}
        onClose={() => setOnboardingOpen(false)}
        language={language}
        initialRole={onboardingInitialRole}
        onCompleteStudent={handleCompleteStudentOnboarding}
        onCompleteTeacher={handleCompleteTeacherOnboarding}
      />

      {/* 2. Opportunity Details Modal */}
      <OpportunityDetailsModal
        opportunity={selectedOpportunity}
        isOpen={Boolean(selectedOpportunity)}
        onClose={() => setSelectedOpportunity(null)}
        language={language}
        isSaved={Boolean(selectedOpportunity && savedOpportunityIds.includes(selectedOpportunity.id))}
        onToggleSave={handleToggleSaveOpportunity}
      />

      {/* 3. Challenge Details & Submission Modal */}
      <ChallengeSubmissionModal
        challenge={selectedChallenge}
        isOpen={Boolean(selectedChallenge)}
        onClose={() => setSelectedChallenge(null)}
        language={language}
        existingSubmission={submissions.find((s) => s.challengeId === selectedChallenge?.id)}
        onSubmit={handleSubmitChallengeWork}
        onAddToPortfolio={handleAddSubmissionToPortfolio}
      />

      {/* 4. Add Achievement Modal */}
      <AddAchievementModal
        isOpen={addAchievementOpen}
        onClose={() => setAddAchievementOpen(false)}
        language={language}
        onSave={handleSavePortfolioAchievement}
      />

      {/* 5. Opportunity Discovery Assistant Modal */}
      <OpportunityDiscoveryAssistantModal
        isOpen={discoveryAssistantOpen}
        onClose={() => setDiscoveryAssistantOpen(false)}
        language={language}
        opportunities={opportunities}
        onSelectOpportunity={(opp) => setSelectedOpportunity(opp)}
      />

      {/* 6. Interview Simulator Modal */}
      <InterviewSimulatorModal
        isOpen={interviewSimulatorOpen}
        onClose={() => setInterviewSimulatorOpen(false)}
        language={language}
      />

      {/* 7. Essay Feedback Assistant Modal */}
      <EssayFeedbackModal
        isOpen={essayFeedbackOpen}
        onClose={() => setEssayFeedbackOpen(false)}
        language={language}
      />

      {/* 8. Premium Modal */}
      <PremiumModal
        isOpen={premiumModalOpen}
        onClose={() => setPremiumModalOpen(false)}
        language={language}
        isPremium={isPremium}
        onTogglePremium={() => setIsPremium(!isPremium)}
      />

      {/* 9. Notification Drawer */}
      <NotificationDrawer
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
        notifications={notifications}
        onMarkAsRead={(id) =>
          setNotifications((prev) =>
            prev.map((n) => (n.id === id ? { ...n, read: true } : n))
          )
        }
        onMarkAllAsRead={() =>
          setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
        }
        language={language}
      />
    </div>
  );
}
