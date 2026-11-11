export type Language = 'en' | 'ru' | 'kk';

export type UserRole = 'student' | 'teacher';

export type AcademicField =
  | 'law_politics'
  | 'science_research'
  | 'tech_engineering'
  | 'business_economics'
  | 'arts_humanities'
  | 'social_sciences'
  | 'medicine_life'
  | 'math_natural';

export interface StudentProfile {
  id: string;
  displayName: string;
  fullName: string;
  email: string;
  grade: string;
  country: string;
  region: string;
  schoolType: 'Public' | 'Private' | 'Other';
  bio: string;
  fields: AcademicField[];
  specificInterests: string[];
  preferences: {
    format: 'Online' | 'Offline' | 'Both';
    location: 'Local' | 'International' | 'Both';
    scholarships: boolean;
    exchange: boolean;
    research: boolean;
    level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Open to all';
    weeklyHours: string;
  };
  visibility: 'private' | 'organizations' | 'public';
  completeness: number;
  streakDays: number;
  isPremium: boolean;
}

export interface TeacherProfile {
  id: string;
  displayName: string;
  fullName: string;
  email: string;
  institution: string;
  department: string;
  title: string;
  bio: string;
  verified: boolean;
}

export type OpportunityCategory =
  | 'all'
  | 'competitions'
  | 'essay'
  | 'research'
  | 'scholarships'
  | 'exchange'
  | 'summer_schools'
  | 'university'
  | 'olympiads'
  | 'volunteering';

export interface Opportunity {
  id: string;
  name: string;
  organization: string;
  category: OpportunityCategory;
  field: AcademicField;
  shortDesc: string;
  fullDesc: string;
  eligibility: string;
  deadline: string;
  location: string;
  format: 'Online' | 'Offline' | 'Hybrid';
  cost: string;
  officialSource: string;
  officialUrl: string;
  verifiedDate: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Open to all';
}

export type ChallengeType =
  | 'Essay'
  | 'Research Proposal'
  | 'Problem Solving'
  | 'Case Study'
  | 'Scientific Project'
  | 'Critical Analysis';

export interface ProfessorChallenge {
  id: string;
  title: string;
  professorName: string;
  professorTitle: string;
  university: string;
  department: string;
  field: AcademicField;
  subject: string;
  type: ChallengeType;
  shortDesc: string;
  instructions: string;
  learningObjectives: string[];
  requiredFormat: string;
  wordLimit: string;
  difficulty: 'Introductory' | 'Intermediate' | 'Advanced';
  deadline: string;
  estimatedHours: string;
  evaluationCriteria: string[];
  publishedDate: string;
  status: 'Published' | 'Draft' | 'Completed';
  submissionsCount: number;
  reviewPendingCount: number;
}

export type SubmissionStatus =
  | 'Not Started'
  | 'In Progress'
  | 'Submitted'
  | 'Under Review'
  | 'Feedback Available';

export interface ChallengeSubmission {
  id: string;
  challengeId: string;
  challengeTitle: string;
  studentId: string;
  studentName: string;
  studentGrade: string;
  submittedAt: string;
  fileName: string;
  fileSize: string;
  workDescription: string;
  contentSample: string;
  status: SubmissionStatus;
  feedback?: {
    overallComments: string;
    strengths: string[];
    improvements: string[];
    recommendations: string;
    reviewedAt: string;
    professorName: string;
  };
  addedToPortfolio?: boolean;
}

export interface GrowthTask {
  id: string;
  title: string;
  category: string;
  deadline: string;
  timeEstimate: string;
  completed: boolean;
  isAiSuggested: boolean;
}

export interface PortfolioAchievement {
  id: string;
  title: string;
  category:
    | 'Academic Achievements'
    | 'Research & Projects'
    | 'Competitions'
    | 'Certificates'
    | 'Extracurricular Activities'
    | 'Volunteering'
    | 'Professor Challenge Results'
    | 'Skills & Interests';
  organization: string;
  year: string;
  resultOrAward: string;
  description: string;
  fileName?: string;
  visibility: 'private' | 'public';
  demonstratedSkills: string[];
}

export interface DiscussionPost {
  id: string;
  authorName: string;
  authorGrade: string;
  authorInterests: string;
  title: string;
  content: string;
  category: 'Science' | 'Law & Politics' | 'Research' | 'University Life' | 'Competitions' | 'General';
  date: string;
  likes: number;
  isLiked?: boolean;
  commentsCount: number;
  isReported?: boolean;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'challenge' | 'feedback' | 'opportunity' | 'system';
}
