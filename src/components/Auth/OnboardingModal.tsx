import React, { useState } from 'react';
import {
  X,
  GraduationCap,
  BookOpen,
  ArrowRight,
  ArrowLeft,
  Check,
  Eye,
  EyeOff,
  Sparkles,
  ShieldCheck,
  Building,
  Clock,
  Compass
} from 'lucide-react';
import { Language, UserRole, AcademicField, StudentProfile, TeacherProfile } from '../../types';
import { translations } from '../../i18n/translations';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  initialRole?: UserRole;
  onCompleteStudent: (profile: Partial<StudentProfile>) => void;
  onCompleteTeacher: (profile: Partial<TeacherProfile>) => void;
}

const academicFieldList: { id: AcademicField; label: string; desc: string }[] = [
  { id: 'law_politics', label: 'Law & Politics', desc: 'Jurisprudence, international relations, policy' },
  { id: 'science_research', label: 'Science & Research', desc: 'Physics, chemistry, astronomy, earth sciences' },
  { id: 'tech_engineering', label: 'Technology & Engineering', desc: 'Computer science, robotics, electrical systems' },
  { id: 'business_economics', label: 'Business & Economics', desc: 'Microeconomics, finance, trade, entrepreneurship' },
  { id: 'arts_humanities', label: 'Arts & Humanities', desc: 'Philosophy, history, literature, linguistics' },
  { id: 'social_sciences', label: 'Social Sciences', desc: 'Sociology, anthropology, psychology, human geography' },
  { id: 'medicine_life', label: 'Medicine & Life Sciences', desc: 'Biomedicine, genetics, public health, neurology' },
  { id: 'math_natural', label: 'Mathematics & Natural Sciences', desc: 'Pure mathematics, statistics, data modeling' },
];

const subfieldMap: Record<AcademicField, string[]> = {
  law_politics: [
    'International Relations',
    'International Law',
    'Human Rights',
    'Political Science',
    'Public Policy',
    'Debate & Public Speaking',
    'Legal Research'
  ],
  science_research: [
    'Astrophysics & Space',
    'Particle Physics',
    'Environmental Science',
    'Organic Chemistry',
    'Neuroscience',
    'Marine Ecology',
    'Scientific Research'
  ],
  tech_engineering: [
    'Machine Learning & AI',
    'Robotics & Hardware',
    'Cybersecurity',
    'Aerospace Engineering',
    'Software Architecture',
    'Data Structures'
  ],
  business_economics: [
    'Microeconomic Policy',
    'Venture Finance',
    'Sustainable Development',
    'Behavioral Economics',
    'International Trade'
  ],
  arts_humanities: [
    'Epistemology & Ethics',
    'World History',
    'Comparative Literature',
    'Theoretical Linguistics',
    'Art History'
  ],
  social_sciences: [
    'Cognitive Psychology',
    'Urban Sociology',
    'Cultural Anthropology',
    'Economic Geography'
  ],
  medicine_life: [
    'Molecular Genetics',
    'Immunology',
    'Global Public Health',
    'Bioengineering',
    'Neurobiology'
  ],
  math_natural: [
    'Number Theory',
    'Combinatorics',
    'Statistical Modeling',
    'Linear Algebra',
    'Cryptography'
  ]
};

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose,
  language,
  initialRole,
  onCompleteStudent,
  onCompleteTeacher
}) => {
  const [role, setRole] = useState<UserRole | null>(initialRole || null);
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);

  // Student form state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAgreed, setTermsAgreed] = useState(false);

  const [displayName, setDisplayName] = useState('');
  const [grade, setGrade] = useState('11');
  const [country, setCountry] = useState('Kazakhstan');
  const [region, setRegion] = useState('Almaty');
  const [schoolType, setSchoolType] = useState<'Public' | 'Private' | 'Other'>('Public');

  const [selectedFields, setSelectedFields] = useState<AcademicField[]>(['law_politics', 'science_research']);
  const [selectedSubfields, setSelectedSubfields] = useState<string[]>(['International Law', 'Environmental Science']);

  const [prefFormat, setPrefFormat] = useState<'Online' | 'Offline' | 'Both'>('Both');
  const [prefLocation, setPrefLocation] = useState<'Local' | 'International' | 'Both'>('Both');
  const [prefScholarships, setPrefScholarships] = useState(true);
  const [prefExchange, setPrefExchange] = useState(true);
  const [prefResearch, setPrefResearch] = useState(true);
  const [prefLevel, setPrefLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced' | 'Open to all'>('Intermediate');
  const [weeklyHours, setWeeklyHours] = useState('3–5 hours');

  // Teacher form state
  const [institution, setInstitution] = useState('Faculty of Law & Global Studies');
  const [department, setDepartment] = useState('International Environmental Law');
  const [academicTitle, setAcademicTitle] = useState('Associate Professor & Research Director');

  if (!isOpen) return null;

  const t = translations[language].onboarding;

  const handleToggleField = (fieldId: AcademicField) => {
    if (selectedFields.includes(fieldId)) {
      setSelectedFields(selectedFields.filter((f) => f !== fieldId));
    } else {
      if (selectedFields.length < 3) {
        setSelectedFields([...selectedFields, fieldId]);
      }
    }
  };

  const handleToggleSubfield = (sub: string) => {
    if (selectedSubfields.includes(sub)) {
      setSelectedSubfields(selectedSubfields.filter((s) => s !== sub));
    } else {
      setSelectedSubfields([...selectedSubfields, sub]);
    }
  };

  const handleFinalSubmit = () => {
    if (role === 'student') {
      onCompleteStudent({
        fullName: fullName || displayName || 'Amina Aliyeva',
        displayName: displayName || fullName || 'Amina Aliyeva',
        email: email || 'amina.scholar@example.edu',
        grade,
        country,
        region,
        schoolType,
        fields: selectedFields,
        specificInterests: selectedSubfields,
        preferences: {
          format: prefFormat,
          location: prefLocation,
          scholarships: prefScholarships,
          exchange: prefExchange,
          research: prefResearch,
          level: prefLevel,
          weeklyHours,
        },
        completeness: 85,
      });
    } else {
      onCompleteTeacher({
        fullName: fullName || 'Dr. David Vance, PhD',
        displayName: displayName || 'Prof. David Vance',
        email: email || 'd.vance@cambridge-law.ac.uk',
        institution,
        department,
        title: academicTitle,
        verified: true,
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#26332D]/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-[#E7ECE6] shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative flex flex-col">
        {/* Modal Header */}
        <div className="p-6 border-b border-[#E7ECE6] flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-10">
          <div>
            <span className="text-[11px] font-bold text-[#78847B] tracking-wider uppercase">
              {role === 'student' ? 'Student Registration' : role === 'teacher' ? 'Faculty Onboarding' : 'Welcome'}
            </span>
            <div className="text-base font-extrabold text-[#26332D]">
              {role === null && t.roleTitle}
              {role === 'student' && `${t.step} ${step} ${t.of} 6`}
              {role === 'teacher' && `${t.step} ${step} ${t.of} 2`}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#78847B] hover:text-[#26332D] hover:bg-[#F3F7F0] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar (when role is picked) */}
        {role !== null && (
          <div className="w-full bg-[#F3F7F0] h-1.5">
            <div
              className="bg-[#B7E6A5] h-full transition-all duration-300"
              style={{
                width: role === 'student' ? `${(step / 6) * 100}%` : `${(step / 2) * 100}%`,
              }}
            />
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 sm:p-8 flex-1 space-y-6">
          {/* STEP 0: Role Selection */}
          {role === null && (
            <div className="space-y-6">
              <p className="text-xs sm:text-sm text-[#78847B] leading-relaxed">
                {t.roleSubtitle}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setRole('student');
                    setStep(1);
                  }}
                  className="p-6 rounded-2xl border-2 border-[#E7ECE6] hover:border-[#B7E6A5] bg-white hover:bg-[#F3F7F0]/40 text-left transition-all space-y-3 group focus:outline-none"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#F3F7F0] group-hover:bg-[#B7E6A5] transition-colors flex items-center justify-center text-[#26332D]">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-[#26332D]">
                    {t.studentCardTitle}
                  </h3>
                  <p className="text-xs text-[#78847B] leading-relaxed">
                    {t.studentCardDesc}
                  </p>
                  <div className="pt-2 text-xs font-bold text-[#26332D] flex items-center gap-1">
                    <span>Select Student</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setRole('teacher');
                    setStep(1);
                  }}
                  className="p-6 rounded-2xl border-2 border-[#E7ECE6] hover:border-[#B7E6A5] bg-white hover:bg-[#F3F7F0]/40 text-left transition-all space-y-3 group focus:outline-none"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#F3F7F0] group-hover:bg-[#B7E6A5] transition-colors flex items-center justify-center text-[#26332D]">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-[#26332D]">
                    {t.teacherCardTitle}
                  </h3>
                  <p className="text-xs text-[#78847B] leading-relaxed">
                    {t.teacherCardDesc}
                  </p>
                  <div className="pt-2 text-xs font-bold text-[#26332D] flex items-center gap-1">
                    <span>Select Professor</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* STUDENT STEPS */}
          {role === 'student' && (
            <>
              {/* Step 1: Account credentials */}
              {step === 1 && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-[#26332D]">{t.s1Title}</h3>
                    <p className="text-xs text-[#78847B]">Start your free academic journey.</p>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#26332D] mb-1">
                        {t.s1FullName}
                      </label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Amina Aliyeva"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7ECE6] text-xs text-[#26332D] focus:outline-none focus:ring-2 focus:ring-[#B7E6A5]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#26332D] mb-1">
                        {t.s1Email}
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="amina.scholar@example.edu"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7ECE6] text-xs text-[#26332D] focus:outline-none focus:ring-2 focus:ring-[#B7E6A5]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-[#26332D] mb-1">
                          {t.s1Password}
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7ECE6] text-xs text-[#26332D] focus:outline-none focus:ring-2 focus:ring-[#B7E6A5]"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-2.5 top-2.5 text-[#78847B]"
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#26332D] mb-1">
                          {t.s1Confirm}
                        </label>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7ECE6] text-xs text-[#26332D] focus:outline-none focus:ring-2 focus:ring-[#B7E6A5]"
                        />
                      </div>
                    </div>

                    <div
                      onClick={() => setTermsAgreed(!termsAgreed)}
                      className="flex items-start gap-2.5 pt-2 cursor-pointer select-none"
                    >
                      <div
                        className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 mt-0.5 ${
                          termsAgreed ? 'bg-[#B7E6A5] border-[#B7E6A5] text-[#26332D]' : 'border-[#E7ECE6]'
                        }`}
                      >
                        {termsAgreed && <Check className="w-3 h-3" />}
                      </div>
                      <span className="text-[11px] text-[#78847B] leading-tight">
                        {t.s1Agree}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Basic info */}
              {step === 2 && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-[#26332D]">{t.s2Title}</h3>
                    <p className="text-xs text-[#78847B]">We use this only to filter eligible grade-level competitions.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#26332D] mb-1">
                        Preferred Display Name
                      </label>
                      <input
                        type="text"
                        value={displayName || fullName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        placeholder="Amina Aliyeva"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7ECE6] text-xs text-[#26332D]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#26332D] mb-1">
                        {t.s2Grade}
                      </label>
                      <select
                        value={grade}
                        onChange={(e) => setGrade(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7ECE6] text-xs text-[#26332D] bg-white"
                      >
                        <option value="8">Grade 8 (Middle School)</option>
                        <option value="9">Grade 9 (Freshman)</option>
                        <option value="10">Grade 10 (Sophomore)</option>
                        <option value="11">Grade 11 (Junior)</option>
                        <option value="12">Grade 12 (Senior)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#26332D] mb-1">
                        {t.s2Country}
                      </label>
                      <input
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        placeholder="Kazakhstan"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7ECE6] text-xs text-[#26332D]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#26332D] mb-1">
                        {t.s2Region}
                      </label>
                      <input
                        type="text"
                        value={region}
                        onChange={(e) => setRegion(e.target.value)}
                        placeholder="Almaty"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7ECE6] text-xs text-[#26332D]"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-[#26332D] mb-1">
                        {t.s2SchoolType}
                      </label>
                      <div className="flex gap-3">
                        {(['Public', 'Private', 'Other'] as const).map((type) => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setSchoolType(type)}
                            className={`flex-1 py-2 text-xs font-semibold rounded-xl border transition-all ${
                              schoolType === type
                                ? 'bg-[#F3F7F0] border-[#B7E6A5] text-[#26332D]'
                                : 'border-[#E7ECE6] text-[#78847B]'
                            }`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Academic Fields */}
              {step === 3 && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-[#26332D]">{t.s3Title}</h3>
                    <p className="text-xs text-[#78847B]">
                      {t.s3Subtitle} ({selectedFields.length} / 3 selected)
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-72 overflow-y-auto pr-1">
                    {academicFieldList.map((f) => {
                      const isSelected = selectedFields.includes(f.id);
                      return (
                        <div
                          key={f.id}
                          onClick={() => handleToggleField(f.id)}
                          className={`p-3.5 rounded-2xl border cursor-pointer text-left transition-all ${
                            isSelected
                              ? 'bg-[#F3F7F0] border-[#B7E6A5] text-[#26332D]'
                              : 'border-[#E7ECE6] text-[#78847B] hover:border-slate-300'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-bold text-[#26332D]">{f.label}</span>
                            <div
                              className={`w-4 h-4 rounded border flex items-center justify-center ${
                                isSelected ? 'bg-[#B7E6A5] border-[#B7E6A5] text-[#26332D]' : 'border-[#E7ECE6]'
                              }`}
                            >
                              {isSelected && <Check className="w-3 h-3" />}
                            </div>
                          </div>
                          <p className="text-[11px] text-[#78847B] leading-tight">{f.desc}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 4: Specific Subfield Interests */}
              {step === 4 && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-[#26332D]">{t.s4Title}</h3>
                    <p className="text-xs text-[#78847B]">{t.s4Subtitle}</p>
                  </div>

                  <div className="space-y-4 max-h-72 overflow-y-auto pr-1">
                    {selectedFields.map((fieldKey) => (
                      <div key={fieldKey} className="space-y-2">
                        <span className="text-xs font-bold text-[#26332D] uppercase tracking-wider">
                          {academicFieldList.find((f) => f.id === fieldKey)?.label}
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {subfieldMap[fieldKey]?.map((sub) => {
                            const isPicked = selectedSubfields.includes(sub);
                            return (
                              <button
                                key={sub}
                                type="button"
                                onClick={() => handleToggleSubfield(sub)}
                                className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                                  isPicked
                                    ? 'bg-[#B7E6A5]/70 border-[#B7E6A5] text-[#26332D] font-bold'
                                    : 'border-[#E7ECE6] text-[#78847B] hover:border-slate-300'
                                }`}
                              >
                                {sub}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 5: Preferences */}
              {step === 5 && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-[#26332D]">{t.s5Title}</h3>
                    <p className="text-xs text-[#78847B]">{t.s5Subtitle}</p>
                  </div>

                  <div className="space-y-4 text-xs">
                    <div>
                      <label className="block font-semibold text-[#26332D] mb-1.5">{t.prefFormat}</label>
                      <div className="flex gap-2">
                        {(['Online', 'Offline', 'Both'] as const).map((fmt) => (
                          <button
                            key={fmt}
                            type="button"
                            onClick={() => setPrefFormat(fmt)}
                            className={`flex-1 py-2 rounded-xl border text-xs font-medium transition-all ${
                              prefFormat === fmt ? 'bg-[#F3F7F0] border-[#B7E6A5] text-[#26332D] font-bold' : 'border-[#E7ECE6] text-[#78847B]'
                            }`}
                          >
                            {fmt}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block font-semibold text-[#26332D] mb-1.5">{t.prefHours}</label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {['1–2 hours', '3–5 hours', '6–8 hours', '8+ hours'].map((hrs) => (
                          <button
                            key={hrs}
                            type="button"
                            onClick={() => setWeeklyHours(hrs)}
                            className={`py-2 rounded-xl border text-xs font-medium transition-all ${
                              weeklyHours === hrs ? 'bg-[#F3F7F0] border-[#B7E6A5] text-[#26332D] font-bold' : 'border-[#E7ECE6] text-[#78847B]'
                            }`}
                          >
                            {hrs}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-[#E7ECE6]">
                      <div
                        onClick={() => setPrefScholarships(!prefScholarships)}
                        className="flex items-center justify-between p-2.5 rounded-xl border border-[#E7ECE6] cursor-pointer"
                      >
                        <span className="text-[#26332D] font-medium">{t.prefScholarships}</span>
                        <div className={`w-4 h-4 rounded border flex items-center justify-center ${prefScholarships ? 'bg-[#B7E6A5] border-[#B7E6A5] text-[#26332D]' : 'border-[#E7ECE6]'}`}>
                          {prefScholarships && <Check className="w-3 h-3" />}
                        </div>
                      </div>
                      <div
                        onClick={() => setPrefResearch(!prefResearch)}
                        className="flex items-center justify-between p-2.5 rounded-xl border border-[#E7ECE6] cursor-pointer"
                      >
                        <span className="text-[#26332D] font-medium">{t.prefResearch}</span>
                        <div className={`w-4 h-4 rounded border flex items-center justify-center ${prefResearch ? 'bg-[#B7E6A5] border-[#B7E6A5] text-[#26332D]' : 'border-[#E7ECE6]'}`}>
                          {prefResearch && <Check className="w-3 h-3" />}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 6: Review & Finalize */}
              {step === 6 && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-[#26332D]">{t.s6Title}</h3>
                    <p className="text-xs text-[#78847B]">{t.s6Ready}</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#F3F7F0] border border-[#E7ECE6] space-y-3 text-xs">
                    <div className="flex justify-between pb-2 border-b border-[#E7ECE6]">
                      <span className="text-[#78847B]">Scholar:</span>
                      <span className="font-bold text-[#26332D]">{displayName || fullName || 'Amina Aliyeva'}</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-[#E7ECE6]">
                      <span className="text-[#78847B]">Level & Location:</span>
                      <span className="font-semibold text-[#26332D]">Grade {grade} · {region}, {country}</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-[#E7ECE6]">
                      <span className="text-[#78847B]">Academic Fields:</span>
                      <span className="font-semibold text-[#26332D]">
                        {selectedFields.map((f) => academicFieldList.find((item) => item.id === f)?.label).join(', ')}
                      </span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-[#E7ECE6]">
                      <span className="text-[#78847B]">Specific Interests:</span>
                      <span className="font-semibold text-[#26332D] truncate max-w-xs">
                        {selectedSubfields.join(', ')}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#78847B]">Dedication:</span>
                      <span className="font-semibold text-[#26332D]">{weeklyHours} / week ({prefFormat})</span>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* TEACHER STEPS */}
          {role === 'teacher' && (
            <>
              {step === 1 && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-[#26332D]">Faculty Verification & Details</h3>
                    <p className="text-xs text-[#78847B]">Publish academic challenges and discover emerging scholars.</p>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#26332D] mb-1">Full Name & Title</label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Dr. David Vance, PhD"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7ECE6] text-xs text-[#26332D]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#26332D] mb-1">Academic Email</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="d.vance@cambridge-law.ac.uk"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7ECE6] text-xs text-[#26332D]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#26332D] mb-1">Institution / University</label>
                      <input
                        type="text"
                        value={institution}
                        onChange={(e) => setInstitution(e.target.value)}
                        placeholder="Faculty of Law & Global Studies"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7ECE6] text-xs text-[#26332D]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#26332D] mb-1">Department / Research Lab</label>
                      <input
                        type="text"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        placeholder="International Environmental Law"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7ECE6] text-xs text-[#26332D]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-[#26332D]">Faculty Honor & Mentorship Policy</h3>
                    <p className="text-xs text-[#78847B]">Confirming your academic role.</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#F3F7F0] border border-[#E7ECE6] space-y-2 text-xs text-[#26332D]">
                    <div className="font-bold flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-700" />
                      <span>Verified Academic Reviewer</span>
                    </div>
                    <p className="text-[11px] text-[#78847B] leading-relaxed">
                      By publishing challenges, you agree to provide constructive, honest feedback to student submissions within 14 days and respect student privacy.
                    </p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="p-6 border-t border-[#E7ECE6] flex items-center justify-between bg-white sticky bottom-0">
          {role !== null && (
            <button
              type="button"
              onClick={() => {
                if (step > 1) {
                  setStep(step - 1);
                } else {
                  setRole(null);
                }
              }}
              className="px-4 py-2 text-xs font-semibold text-[#78847B] hover:text-[#26332D] rounded-xl flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{t.back}</span>
            </button>
          )}

          <div className="ml-auto">
            {role !== null && (
              <>
                {(role === 'student' && step < 6) || (role === 'teacher' && step < 2) ? (
                  <button
                    type="button"
                    onClick={() => setStep(step + 1)}
                    className="px-5 py-2.5 text-xs font-bold text-[#26332D] bg-[#B7E6A5] hover:bg-[#aee09c] rounded-xl shadow-xs transition-all flex items-center gap-1.5"
                  >
                    <span>{t.next}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleFinalSubmit}
                    className="px-6 py-2.5 text-xs font-bold text-[#26332D] bg-[#B7E6A5] hover:bg-[#aee09c] rounded-xl shadow-xs transition-all flex items-center gap-1.5"
                  >
                    <Check className="w-4 h-4" />
                    <span>{t.complete}</span>
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
