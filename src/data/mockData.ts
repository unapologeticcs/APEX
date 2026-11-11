import {
  StudentProfile,
  TeacherProfile,
  Opportunity,
  ProfessorChallenge,
  ChallengeSubmission,
  GrowthTask,
  PortfolioAchievement,
  DiscussionPost,
  AppNotification
} from '../types';

export const initialStudentProfile: StudentProfile = {
  id: 'student-101',
  displayName: 'Amina Aliyeva',
  fullName: 'Amina Aliyeva',
  email: 'amina.scholar@example.edu',
  grade: '11',
  country: 'Kazakhstan',
  region: 'Almaty',
  schoolType: 'Public',
  bio: 'High school junior exploring the intersection of environmental law, biodiversity conservation, and global policy frameworks. Passionate about climate debate and research.',
  fields: ['law_politics', 'science_research'],
  specificInterests: [
    'International Law',
    'Environmental Science',
    'Public Policy',
    'Debate and Public Speaking'
  ],
  preferences: {
    format: 'Both',
    location: 'Both',
    scholarships: true,
    exchange: true,
    research: true,
    level: 'Intermediate',
    weeklyHours: '3–5 hours'
  },
  visibility: 'organizations',
  completeness: 75,
  streakDays: 3,
  isPremium: false,
};

export const initialTeacherProfile: TeacherProfile = {
  id: 'teacher-201',
  displayName: 'Prof. David Vance',
  fullName: 'Dr. David Vance, PhD',
  email: 'd.vance@cambridge-law.ac.uk',
  institution: 'Faculty of Law & Global Studies',
  department: 'International Environmental Law',
  title: 'Associate Professor & Research Director',
  bio: 'Chair of Global Environmental Governance. Reviewing high school student submissions for the annual Young Jurists Academic Challenge.',
  verified: true,
};

export const initialOpportunities: Opportunity[] = [
  {
    id: 'opp-1',
    name: 'Harvard International Global Climate Essay Prize',
    organization: 'Harvard Undergraduate Global Studies Council',
    category: 'essay',
    field: 'law_politics',
    shortDesc: 'Annual academic essay competition for secondary students exploring legal and economic solutions to ecological crises.',
    fullDesc: 'Participants submit a 1,500–2,500 word critical academic paper analyzing multinational agreements on climate reparations. Winning papers receive full scholarships for the Harvard Summer Institute.',
    eligibility: 'High school students in grades 9–12 worldwide. Independent submissions only.',
    deadline: '2026-12-15',
    location: 'Cambridge, MA / Virtual Finalists',
    format: 'Hybrid',
    cost: 'Free to enter (Need-based travel grant for winners)',
    officialSource: 'Harvard Undergraduate Council (Official Academic Partner)',
    officialUrl: 'https://harvard.edu/global-studies/essay-prize',
    verifiedDate: 'November 2026',
    level: 'Advanced'
  },
  {
    id: 'opp-2',
    name: 'CERN High School Scientific Research Fellowship',
    organization: 'European Organization for Nuclear Research (CERN)',
    category: 'research',
    field: 'science_research',
    shortDesc: 'Two-week fully funded residential research internship at the CERN particle accelerator for school teams.',
    fullDesc: 'High school student teams propose a scientific experiment using a real particle beamline. Two winning teams travel to Geneva, Switzerland to conduct their experiments alongside CERN physicists.',
    eligibility: 'Teams of 5–9 students aged 16+ enrolled in secondary school. Physics teacher mentor required.',
    deadline: '2026-11-30',
    location: 'Geneva, Switzerland',
    format: 'Offline',
    cost: 'Fully funded (Travel, lodging, and meals covered)',
    officialSource: 'CERN Beamline for Schools Committee',
    officialUrl: 'https://beamlineforschools.cern',
    verifiedDate: 'November 2026',
    level: 'Advanced'
  },
  {
    id: 'opp-3',
    name: 'Oxford Junior Jurists Mock Trial & Legal Case Competition',
    organization: 'Oxford International Law Society',
    category: 'competitions',
    field: 'law_politics',
    shortDesc: 'Virtual moot court tournament analyzing public international law cases and treaty interpretations.',
    fullDesc: 'Simulate proceedings before the International Court of Justice. Teams receive a fictional state dispute and draft written memorials before participating in live virtual oral arguments.',
    eligibility: 'Individual students or pairs, grades 10–12. English proficiency required.',
    deadline: '2027-01-20',
    location: 'Virtual / Online',
    format: 'Online',
    cost: 'Free registration with waiver for state school students',
    officialSource: 'Oxford Mooting Society Academic Division',
    officialUrl: 'https://oxfordlawsociety.org/junior-jurists',
    verifiedDate: 'October 2026',
    level: 'Intermediate'
  },
  {
    id: 'opp-4',
    name: 'NASA / Caltech Jet Propulsion Summer Academy',
    organization: 'California Institute of Technology & NASA JPL',
    category: 'summer_schools',
    field: 'science_research',
    shortDesc: 'Immersive 4-week virtual summer institute in planetary astronomy, robotics, and spectroscopy.',
    fullDesc: 'Students work directly with real satellite telemetry and Mars rover spectral data. Includes weekly seminars from planetary scientists and an individual research poster presentation.',
    eligibility: 'Open to secondary students worldwide with high academic curiosity in STEM.',
    deadline: '2027-02-10',
    location: 'Pasadena, CA (Virtual Global Cohort)',
    format: 'Online',
    cost: 'Full merit scholarships available for international applicants',
    officialSource: 'NASA Office of STEM Engagement',
    officialUrl: 'https://jpl.nasa.gov/edu/summer-academy',
    verifiedDate: 'November 2026',
    level: 'Open to all'
  },
  {
    id: 'opp-5',
    name: 'World Bank Youth Policy Hackathon & Grant',
    organization: 'World Bank Group Global Youth Initiative',
    category: 'scholarships',
    field: 'business_economics',
    shortDesc: '$5,000 implementation grant for high school initiatives tackling rural digital access.',
    fullDesc: 'Teams of youth researchers submit analytical proposals examining microfinance or connectivity bottlenecks in developing economies. Selected projects receive seed funding and World Bank mentorship.',
    eligibility: 'Students aged 14–19. Multi-disciplinary teams encouraged.',
    deadline: '2026-12-01',
    location: 'Washington, DC / Hybrid',
    format: 'Hybrid',
    cost: 'Free to enter (Grant prize: $5,000)',
    officialSource: 'World Bank Youth Innovation Fund',
    officialUrl: 'https://worldbank.org/youth-innovation',
    verifiedDate: 'November 2026',
    level: 'Intermediate'
  },
  {
    id: 'opp-6',
    name: 'International Linguistics Olympiad (IOL) National Selection',
    organization: 'International Linguistics Committee',
    category: 'olympiads',
    field: 'arts_humanities',
    shortDesc: 'Fascinating puzzle-solving competition decoding undeciphered languages without prior linguistic knowledge.',
    fullDesc: 'The olympiad tests analytical deduction, pattern recognition, and cultural linguistic structure. No foreign language prerequisites are needed; all problems are self-contained logical puzzles.',
    eligibility: 'High school students who have not yet matriculated at university.',
    deadline: '2027-01-15',
    location: 'National Centers Worldwide',
    format: 'Hybrid',
    cost: 'Free national selection rounds',
    officialSource: 'International Olympiad in Linguistics',
    officialUrl: 'https://ioling.org',
    verifiedDate: 'October 2026',
    level: 'Open to all'
  },
  {
    id: 'opp-7',
    name: 'Global Youth Biodiversity Action Lab',
    organization: 'United Nations Environment Programme (UNEP)',
    category: 'volunteering',
    field: 'science_research',
    shortDesc: 'Community ecological monitoring project connecting youth citizen scientists with IUCN data scientists.',
    fullDesc: 'Conduct local environmental assessments, log migratory bird data, and write regional policy briefs reviewed by UNEP ecological advisors.',
    eligibility: 'Youth aged 15–18. Passion for conservation.',
    deadline: '2026-12-28',
    location: 'Global / Local Fieldwork',
    format: 'Hybrid',
    cost: 'Free participation',
    officialSource: 'UNEP Youth Conservation Taskforce',
    officialUrl: 'https://unep.org/youth-action-lab',
    verifiedDate: 'November 2026',
    level: 'Beginner'
  },
  {
    id: 'opp-8',
    name: 'Cambridge Immerse Pre-University Academic Fellowship',
    organization: 'Cambridge Academic Research Trust',
    category: 'university',
    field: 'law_politics',
    shortDesc: 'Pre-university immersion program exploring jurisprudence, constitutional ethics, and statecraft.',
    fullDesc: 'Intensive 2-week seminar modules led by University of Cambridge researchers. Students produce an undergraduate-level research essay with individual supervisions.',
    eligibility: 'High school students aged 15–18 in top academic standing.',
    deadline: '2027-03-01',
    location: 'Cambridge, UK',
    format: 'Offline',
    cost: '100% need-based bursaries available',
    officialSource: 'Cambridge Pre-University Board',
    officialUrl: 'https://cambridge.org/pre-uni-fellowships',
    verifiedDate: 'November 2026',
    level: 'Advanced'
  }
];

export const initialChallenges: ProfessorChallenge[] = [
  {
    id: 'chal-1',
    title: 'Critique of Transboundary Water Treaties in Central Asia',
    professorName: 'Prof. David Vance',
    professorTitle: 'Associate Professor of Public International Law',
    university: 'Faculty of Law & Global Studies',
    department: 'International Environmental Law',
    field: 'law_politics',
    subject: 'Environmental Jurisprudence & Water Security',
    type: 'Critical Analysis',
    shortDesc: 'Analyze the legal loopholes in transboundary water-sharing agreements and propose an equitable amendment.',
    instructions: `You are tasked with reviewing the historical framework of the Aral Sea Basin water-sharing agreements.
In 1,000–1,800 words:
1. Identify two critical structural ambiguities in existing quota allocations under post-1992 accords.
2. Evaluate how modern climate variance (glacial retreat rates in Tien Shan and Pamir) challenges traditional historical allocation quotas.
3. Propose a legally sound clause for dynamic seasonal reallocation adhering to the UN Watercourses Convention (1997).`,
    learningObjectives: [
      'Understanding the principle of equitable and reasonable utilization in international law',
      'Translating hydrological environmental data into legal contract clauses',
      'Balancing upstream energy sovereignty with downstream agricultural necessity'
    ],
    requiredFormat: 'PDF or DOCX document with academic citations (Chicago or APA). Word count: 1,000–1,800 words.',
    wordLimit: '1,000–1,800 words',
    difficulty: 'Advanced',
    deadline: '2026-11-28',
    estimatedHours: '8–12 hours',
    evaluationCriteria: [
      'Depth of legal reasoning and treaty analysis (35%)',
      'Integration of scientific climate data (25%)',
      'Feasibility and precision of proposed clause (25%)',
      'Clarity, academic tone, and source citation (15%)'
    ],
    publishedDate: '2026-10-15',
    status: 'Published',
    submissionsCount: 14,
    reviewPendingCount: 2
  },
  {
    id: 'chal-2',
    title: 'Planetary Biosignatures: Disentangling Abiotic Methane on Mars',
    professorName: 'Dr. Sarah Lin',
    professorTitle: 'Senior Research Fellow in Astrobiology',
    university: 'Institute of Planetary Exploration',
    department: 'Earth & Planetary Sciences',
    field: 'science_research',
    subject: 'Astrobiology & Atmospheric Chemistry',
    type: 'Research Proposal',
    shortDesc: 'Design a micro-experiment protocol to differentiate serpentinization from methanogenic biology on rocky exoplanets.',
    instructions: `Atmospheric methane spikes observed in Gale Crater continue to puzzle astrobiologists.
Draft a concise 1,200-word research design for a robotic sensor payload:
1. Explain how isotopic carbon-12 vs carbon-13 ratios can distinguish abiotic serpentinization from biological metabolism.
2. Outline the detection limits and potential environmental interferences (perchlorates, UV degradation).
3. Conclude with a hypothesis statement testable by the next generation of robotic orbiters.`,
    learningObjectives: [
      'Master isotopic fractionation principles in geochemical systems',
      'Formulate falsifiable hypotheses in extraterrestrial life detection',
      'Understand sensor telemetry constraints in deep space missions'
    ],
    requiredFormat: 'Scientific paper format with abstract, methodology, and hypothesis diagram.',
    wordLimit: '1,200–1,600 words',
    difficulty: 'Advanced',
    deadline: '2026-12-10',
    estimatedHours: '10–14 hours',
    evaluationCriteria: [
      'Scientific rigor and chemical accuracy (40%)',
      'Methodology viability within aerospace constraints (30%)',
      'Analytical clarity and hypothesis formulation (30%)'
    ],
    publishedDate: '2026-10-20',
    status: 'Published',
    submissionsCount: 8,
    reviewPendingCount: 1
  },
  {
    id: 'chal-3',
    title: 'Algorithmic Fairness in Urban Public Transit Subsidy Allocation',
    professorName: 'Prof. Marcus Weber',
    professorTitle: 'Chair of Data Ethics & Economics',
    university: 'Urban Policy Research Institute',
    department: 'Economics & Computational Social Science',
    field: 'business_economics',
    subject: 'Microeconomics & Data Justice',
    type: 'Case Study',
    shortDesc: 'Evaluate how automated poverty scoring models create geographic transit deserts for low-income commuters.',
    instructions: `Many metropolitan authorities deploy machine learning scoring to distribute discounted transit passes.
Using the provided demographic dataset:
1. Identify statistical proxy bias in income estimation models that rely on cellular roaming patterns.
2. Demonstrate how false negative rates disproportionately affect informal economy workers.
3. Formulate an economic policy recommendation combining algorithmic audits with human grievance appeal channels.`,
    learningObjectives: [
      'Detecting proxy variables in economic ML models',
      'Evaluating public welfare distribution equity',
      'Drafting executive-level economic policy briefs'
    ],
    requiredFormat: 'Policy brief with 2 charts or data tables + narrative rationale.',
    wordLimit: '1,000–1,500 words',
    difficulty: 'Intermediate',
    deadline: '2026-12-20',
    estimatedHours: '6–8 hours',
    evaluationCriteria: [
      'Quantitative understanding of bias metrics (35%)',
      'Socioeconomic impact assessment (35%)',
      'Actionable policy recommendations (30%)'
    ],
    publishedDate: '2026-11-01',
    status: 'Published',
    submissionsCount: 19,
    reviewPendingCount: 3
  }
];

export const initialSubmissions: ChallengeSubmission[] = [
  {
    id: 'sub-01',
    challengeId: 'chal-1',
    challengeTitle: 'Critique of Transboundary Water Treaties in Central Asia',
    studentId: 'student-101',
    studentName: 'Amina Aliyeva',
    studentGrade: '11',
    submittedAt: '2026-11-04',
    fileName: 'Aliyeva_Transboundary_Water_Treaty_Critique_v2.pdf',
    fileSize: '1.4 MB',
    workDescription: 'My submission focuses on the 1992 Almaty Agreement. I incorporated recent 2024 satellite glacier ablation rates from the Tian Shan range to propose an automated cubic-meter compensatory tariff triggered when regional summer runoff drops below 82% of the historical mean.',
    contentSample: `Executive Summary: The 1992 Almaty Agreement established static water allocation quotas predicated upon Soviet-era hydrological averages that failed to anticipate the non-linear acceleration of cryospheric degradation. Between 1990 and 2024, the volume of Tien Shan glaciers has diminished by an estimated 27%, severely modifying the seasonal hydrograph of the Syr Darya. Under customary international water law—specifically Articles 5 and 7 of the UN Watercourses Convention (1997)—upstream sovereign hydroelectric exploitation cannot infringe upon the vital human needs and ecological thresholds of downstream riparian states...`,
    status: 'Feedback Available',
    feedback: {
      overallComments: 'Exceptional intellectual depth for an 11th-grade scholar. Your argument regarding cryospheric non-linearity immediately elevates this paper above standard legal reviews. The connection drawn between glacial ablation rates and the legal doctrine of "vital human needs" reflects remarkable interdisciplinary maturity.',
      strengths: [
        'Brilliant integration of 2024 satellite ablation data directly into the legal interpretation of Article 5 (UN Watercourses Convention).',
        'Your proposed compensatory tariff clause is structurally coherent and demonstrates sophisticated contract drafting instincts.',
        'High level of academic rigor and clean citation format throughout.'
      ],
      improvements: [
        'Consider exploring how third-party arbitration bodies (e.g., the Permanent Court of Arbitration) would verify real-time runoff telemetry before triggering penalty tariffs.',
        'Address the political economy of winter hydroelectric storage vs summer irrigation demand more explicitly in section 3.2.'
      ],
      recommendations: 'I strongly encourage you to read Stephen McCaffrey’s "The Law of International Watercourses" (Oxford University Press). This work is of undergraduate publication quality; consider entering it into the Harvard Climate Essay Prize.',
      reviewedAt: '2026-11-08',
      professorName: 'Prof. David Vance (Cambridge Law / Faculty of Global Studies)'
    },
    addedToPortfolio: true
  }
];

export const initialGrowthTasks: GrowthTask[] = [
  {
    id: 'task-1',
    title: 'Read UN Watercourses Convention (1997) Articles 5–8 on Equitable Utilization',
    category: 'International Law',
    deadline: '2026-11-14',
    timeEstimate: '45 mins',
    completed: true,
    isAiSuggested: true
  },
  {
    id: 'task-2',
    title: 'Draft 500-word preliminary outline for Harvard Climate Essay Prize',
    category: 'Competitions',
    deadline: '2026-11-18',
    timeEstimate: '1.5 hrs',
    completed: true,
    isAiSuggested: true
  },
  {
    id: 'task-3',
    title: 'Complete Astrobiology sensor telemetry reading for Dr. Lin’s Challenge',
    category: 'Science Research',
    deadline: '2026-11-24',
    timeEstimate: '2 hrs',
    completed: false,
    isAiSuggested: true
  },
  {
    id: 'task-4',
    title: 'Attend virtual webinar with Oxford Moot Court Society',
    category: 'Extracurricular',
    deadline: '2026-12-02',
    timeEstimate: '1 hr',
    completed: false,
    isAiSuggested: false
  },
  {
    id: 'task-5',
    title: 'Organize high school environmental debate club mock session',
    category: 'Leadership',
    deadline: '2026-12-08',
    timeEstimate: '3 hrs',
    completed: false,
    isAiSuggested: false
  }
];

export const initialPortfolio: PortfolioAchievement[] = [
  {
    id: 'port-1',
    title: 'Critique of Transboundary Water Treaties in Central Asia',
    category: 'Professor Challenge Results',
    organization: 'Faculty of Law & Global Studies (Prof. David Vance)',
    year: '2026',
    resultOrAward: 'Top 5% Commendation / Faculty Citation',
    description: 'Conducted legal-scientific analysis of the 1992 Almaty Agreement in the context of Tien Shan glacial retreat. Received detailed personal faculty review and commendation from Cambridge environmental law scholars.',
    fileName: 'Aliyeva_Transboundary_Water_Treaty_Critique_v2.pdf',
    visibility: 'public',
    demonstratedSkills: [
      'Treaty Interpretation',
      'Environmental Jurisprudence',
      'Cryospheric Data Synthesis',
      'Legal Drafting'
    ]
  },
  {
    id: 'port-2',
    title: 'National High School Debate Championship: Eco-Policy Division',
    category: 'Competitions',
    organization: 'National Debate League',
    year: '2025',
    resultOrAward: '1st Place Speaker & Championship Trophy',
    description: 'Led a 3-person parliamentary debate team through 7 elimination rounds arguing the ethics of carbon border adjustment mechanisms and developing country exemptions.',
    visibility: 'public',
    demonstratedSkills: [
      'Public Argumentation',
      'Economic Policy Analysis',
      'Rapid Rebuttal',
      'Team Collaboration'
    ]
  },
  {
    id: 'port-3',
    title: 'Regional Soil Microplastics Contamination Field Study',
    category: 'Research & Projects',
    organization: 'Youth Ecological Academy of Sciences',
    year: '2025',
    resultOrAward: 'Best Junior Research Poster',
    description: 'Collected 40 agricultural soil core samples across the Almaty suburban belt. Utilized density separation and stereomicroscopy to quantify low-density polyethylene fiber densities.',
    visibility: 'public',
    demonstratedSkills: [
      'Field Sample Protocol',
      'Microscopic Identification',
      'Statistical Error Analysis',
      'Scientific Report Writing'
    ]
  }
];

export const initialDiscussions: DiscussionPost[] = [
  {
    id: 'post-1',
    authorName: 'Amina Aliyeva',
    authorGrade: 'Grade 11',
    authorInterests: 'International Law & Environmental Science',
    title: 'How do international courts handle conflicting climate attribution models in state disputes?',
    content: 'While researching transboundary water treaties, I noticed that states frequently bring rival hydrological climate projections into arbitration. How do legal judges determine scientific consensus when peer-reviewed models diverge on 10-year runoff forecasts?',
    category: 'Law & Politics',
    date: '2 days ago',
    likes: 18,
    isLiked: true,
    commentsCount: 7
  },
  {
    id: 'post-2',
    authorName: 'Kairat Zhumabekov',
    authorGrade: 'Grade 12',
    authorInterests: 'Astrophysics & Machine Learning',
    title: 'Tips for drafting the CERN Beamline experiment proposal without university laboratory access?',
    content: 'Our team is drafting a detector experiment for the CERN Beamline for Schools competition. For those who applied in previous years: did you focus more on creative simulation ideas or demonstrated hardware prototypes in your write-up?',
    category: 'Science',
    date: '3 days ago',
    likes: 24,
    commentsCount: 12
  },
  {
    id: 'post-3',
    authorName: 'Sofia Chen',
    authorGrade: 'Grade 10',
    authorInterests: 'Bioethics & Genetics',
    title: 'Where can high schoolers publish genuine peer-reviewed review articles?',
    content: 'Looking for verified, ethical open-access journals that welcome student-authored systematic literature reviews without exorbitant submission fees. Any experiences with youth academies?',
    category: 'Research',
    date: '5 days ago',
    likes: 31,
    commentsCount: 15
  }
];

export const initialNotifications: AppNotification[] = [
  {
    id: 'notif-1',
    title: 'New Professor Feedback Available!',
    message: 'Prof. David Vance has reviewed your submission for "Critique of Transboundary Water Treaties". Read the detailed faculty evaluation.',
    timestamp: '2 hours ago',
    read: false,
    type: 'feedback'
  },
  {
    id: 'notif-2',
    title: 'New Challenge Matching Your Interests',
    message: 'Dr. Sarah Lin published "Planetary Biosignatures: Disentangling Abiotic Methane on Mars".',
    timestamp: '1 day ago',
    read: false,
    type: 'challenge'
  },
  {
    id: 'notif-3',
    title: 'Deadline Approaching in 6 Days',
    message: 'Harvard Global Climate Essay Prize registration closes on November 28, 2026.',
    timestamp: '2 days ago',
    read: true,
    type: 'opportunity'
  }
];
