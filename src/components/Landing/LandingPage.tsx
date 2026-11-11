import React from 'react';
import {
  ArrowRight,
  Sparkles,
  Compass,
  TrendingUp,
  Share2,
  Award,
  BookOpen,
  CheckCircle2,
  Calendar,
  Building,
  ShieldCheck,
  GraduationCap,
  ExternalLink,
  Users
} from 'lucide-react';
import { Language, Opportunity, ProfessorChallenge } from '../../types';
import { translations } from '../../i18n/translations';

interface LandingPageProps {
  language: Language;
  onExplore: () => void;
  onJoin: () => void;
  featuredOpportunities: Opportunity[];
  featuredChallenges: ProfessorChallenge[];
  onOpenOpportunity: (opp: Opportunity) => void;
  onOpenChallenge: (chal: ProfessorChallenge) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  language,
  onExplore,
  onJoin,
  featuredOpportunities,
  featuredChallenges,
  onOpenOpportunity,
  onOpenChallenge,
}) => {
  const t = translations[language].landing;

  return (
    <div className="bg-white text-[#26332D]">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-16 md:pb-28 border-b border-[#E7ECE6]">
        {/* Soft decorative background accents */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#F3F7F0] rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-[#F6C9D5]/30 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column (Editorial Typography) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F3F7F0] border border-[#E7ECE6] text-[#26332D] text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#B7E6A5]" />
                <span>{t.roleBadge}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#26332D] leading-[1.1]">
                <span className="block">{t.heroTitlePart1}</span>
                <span className="block text-[#78847B] font-serif italic mt-1">
                  {t.heroTitlePart2}
                </span>
              </h1>

              <p className="text-base sm:text-lg text-[#78847B] max-w-xl leading-relaxed">
                {t.heroSubtitle}
              </p>

              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <button
                  onClick={onJoin}
                  className="px-6 py-3.5 text-xs sm:text-sm font-bold text-[#26332D] bg-[#B7E6A5] hover:bg-[#aee09c] border border-[#a6dd94] rounded-xl shadow-xs transition-all flex items-center gap-2 active:scale-98"
                >
                  <span>{t.joinBtn}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={onExplore}
                  className="px-6 py-3.5 text-xs sm:text-sm font-semibold text-[#26332D] bg-white border border-[#E7ECE6] hover:bg-[#F3F7F0] rounded-xl transition-all"
                >
                  {t.exploreBtn}
                </button>
              </div>

              {/* Trust markers */}
              <div className="pt-6 border-t border-[#E7ECE6] flex flex-wrap items-center gap-6 text-xs text-[#78847B]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#26332D]" />
                  <span>{t.statsTalent}</span>
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-[#26332D]" />
                  <span>{t.statsChallenges}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Visual Academic Profile Composition */}
            <div className="lg:col-span-5 relative">
              <div className="bg-[#F3F7F0] p-6 rounded-3xl border border-[#E7ECE6] shadow-sm relative space-y-4">
                {/* Simulated Student Profile Card */}
                <div className="bg-white p-5 rounded-2xl border border-[#E7ECE6] shadow-xs">
                  <div className="flex items-center justify-between pb-3 border-b border-[#E7ECE6]">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#B7E6A5] flex items-center justify-center font-bold text-[#26332D] text-sm">
                        AA
                      </div>
                      <div>
                        <div className="text-sm font-bold text-[#26332D]">Amina Aliyeva</div>
                        <div className="text-[11px] text-[#78847B]">Grade 11 · Almaty, Kazakhstan</div>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#F3F7F0] text-[#26332D] border border-[#E7ECE6]">
                      Public Portfolio
                    </span>
                  </div>

                  {/* Interests tags (unboxed text discipline) */}
                  <div className="py-3 text-xs text-[#78847B] flex items-center gap-2 flex-wrap">
                    <span className="font-medium text-[#26332D]">Focus:</span>
                    <span>International Law</span>
                    <span>·</span>
                    <span>Environmental Science</span>
                    <span>·</span>
                    <span>Debate</span>
                  </div>

                  {/* Verified Professor Submission Card */}
                  <div className="p-3.5 rounded-xl bg-[#F3F7F0]/80 border border-[#E7ECE6] space-y-2">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-semibold text-[#26332D]">Critique of Transboundary Water Treaties</span>
                      <span className="text-emerald-700 font-bold bg-[#B7E6A5]/50 px-2 py-0.5 rounded text-[10px]">
                        Reviewed
                      </span>
                    </div>
                    <p className="text-[11px] text-[#78847B] leading-normal line-clamp-2">
                      “Exceptional intellectual depth. Your argument regarding cryospheric non-linearity connects legal doctrine with climate science.”
                    </p>
                    <div className="text-[10px] font-semibold text-[#26332D]">
                      — Prof. David Vance, Cambridge Law Faculty
                    </div>
                  </div>
                </div>

                {/* Floating achievement badges */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-white border border-[#E7ECE6] shadow-2xs">
                    <div className="text-[11px] text-[#78847B]">Growth Plan</div>
                    <div className="text-sm font-bold text-[#26332D] mt-0.5">3 / 4 Milestones</div>
                    <div className="w-full bg-[#E7ECE6] h-1.5 rounded-full mt-2 overflow-hidden">
                      <div className="bg-[#B7E6A5] h-full rounded-full" style={{ width: '75%' }} />
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-[#E7ECE6] shadow-2xs">
                    <div className="text-[11px] text-[#78847B]">Verified Evidence</div>
                    <div className="text-sm font-bold text-[#26332D] mt-0.5">3 Academic Artifacts</div>
                    <div className="text-[10px] text-emerald-700 font-medium mt-1">✓ Visible to Universities</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Three Stages Section: Discover, Develop, Connect */}
      <section id="how-it-works" className="py-20 md:py-28 border-b border-[#E7ECE6] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#26332D] mb-3">
              {t.threeStepsTitle}
            </h2>
            <p className="text-sm text-[#78847B] leading-relaxed">
              We don’t just help you get discovered. We help you build the substantive academic foundation that makes you discoverable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Stage 1: Discover */}
            <div className="p-8 rounded-3xl bg-[#F3F7F0] border border-[#E7ECE6] flex flex-col justify-between hover:shadow-xs transition-shadow">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-white border border-[#E7ECE6] flex items-center justify-center text-[#26332D] shadow-xs">
                  <Compass className="w-6 h-6 text-[#26332D]" />
                </div>
                <div className="text-xs font-mono font-bold text-[#78847B] tracking-wider">01. {t.discoverTitle}</div>
                <h3 className="text-xl font-bold text-[#26332D]">
                  Find Opportunities You Didn’t Know Existed
                </h3>
                <p className="text-xs sm:text-sm text-[#78847B] leading-relaxed">
                  {t.discoverDesc}
                </p>
              </div>
              <ul className="mt-8 pt-6 border-t border-[#E7ECE6] text-xs text-[#26332D] space-y-2">
                <li className="flex items-center gap-2">✓ Verified official deadlines & eligibility</li>
                <li className="flex items-center gap-2">✓ Need-based & merit scholarships catalog</li>
                <li className="flex items-center gap-2">✓ Tailored to your specific academic curiosity</li>
              </ul>
            </div>

            {/* Stage 2: Develop */}
            <div className="p-8 rounded-3xl bg-white border border-[#E7ECE6] shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow relative">
              <span className="absolute -top-3 right-6 px-3 py-1 bg-[#F6C9D5] text-[#26332D] text-[10px] font-bold rounded-full border border-white">
                Personalized Growth
              </span>
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#F3F7F0] border border-[#E7ECE6] flex items-center justify-center text-[#26332D]">
                  <TrendingUp className="w-6 h-6 text-[#26332D]" />
                </div>
                <div className="text-xs font-mono font-bold text-[#78847B] tracking-wider">02. {t.developTitle}</div>
                <h3 className="text-xl font-bold text-[#26332D]">
                  Build Skills & Structured Portfolio
                </h3>
                <p className="text-xs sm:text-sm text-[#78847B] leading-relaxed">
                  {t.developDesc}
                </p>
              </div>
              <ul className="mt-8 pt-6 border-t border-[#E7ECE6] text-xs text-[#26332D] space-y-2">
                <li className="flex items-center gap-2">✓ Realistic weekly availability scheduling</li>
                <li className="flex items-center gap-2">✓ Milestone checklists and habit tracking</li>
                <li className="flex items-center gap-2">✓ Structured evidence of projects and papers</li>
              </ul>
            </div>

            {/* Stage 3: Connect */}
            <div className="p-8 rounded-3xl bg-[#F3F7F0] border border-[#E7ECE6] flex flex-col justify-between hover:shadow-xs transition-shadow">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-white border border-[#E7ECE6] flex items-center justify-center text-[#26332D] shadow-xs">
                  <Share2 className="w-6 h-6 text-[#26332D]" />
                </div>
                <div className="text-xs font-mono font-bold text-[#78847B] tracking-wider">03. {t.connectTitle}</div>
                <h3 className="text-xl font-bold text-[#26332D]">
                  Showcase Real Work to Professors
                </h3>
                <p className="text-xs sm:text-sm text-[#78847B] leading-relaxed">
                  {t.connectDesc}
                </p>
              </div>
              <ul className="mt-8 pt-6 border-t border-[#E7ECE6] text-xs text-[#26332D] space-y-2">
                <li className="flex items-center gap-2">✓ Real university faculty challenges</li>
                <li className="flex items-center gap-2">✓ Confidential, rigorous academic feedback</li>
                <li className="flex items-center gap-2">✓ Granular student privacy controls</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Opportunities Preview */}
      <section id="opportunities" className="py-20 border-b border-[#E7ECE6] bg-[#F3F7F0]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#78847B]">
                Curated Academic Programs
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#26332D] mt-1">
                Featured Global Opportunities
              </h2>
            </div>
            <button
              onClick={onExplore}
              className="text-xs font-bold text-[#26332D] hover:underline flex items-center gap-1.5"
            >
              <span>Explore All 850+ Opportunities</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredOpportunities.slice(0, 3).map((opp) => (
              <div
                key={opp.id}
                className="p-6 rounded-2xl bg-white border border-[#E7ECE6] shadow-xs flex flex-col justify-between hover:border-[#B7E6A5] transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-[#78847B] mb-2">
                    <span className="capitalize font-semibold text-[#26332D]">{opp.category}</span>
                    <span className="text-[11px] font-mono">Deadline: {opp.deadline}</span>
                  </div>
                  <h4 className="text-base font-bold text-[#26332D] mb-2">{opp.name}</h4>
                  <p className="text-xs text-[#78847B] line-clamp-3 mb-4 leading-relaxed">
                    {opp.shortDesc}
                  </p>
                  <div className="text-[11px] text-[#78847B] flex items-center gap-1.5 mb-2">
                    <Building className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{opp.organization}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E7ECE6] flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-[#26332D] bg-[#F3F7F0] px-2 py-0.5 rounded">
                    {opp.format}
                  </span>
                  <button
                    onClick={() => onOpenOpportunity(opp)}
                    className="text-xs font-bold text-[#26332D] hover:underline"
                  >
                    View Details →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Professor Challenges Spotlight */}
      <section id="professors" className="py-20 md:py-28 border-b border-[#E7ECE6] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#78847B]">
              {t.challengesHeadline}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#26332D] mt-1 mb-3">
              Solve Real University-Level Research Problems
            </h2>
            <p className="text-sm text-[#78847B] leading-relaxed">
              {t.challengesSub}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredChallenges.slice(0, 2).map((chal) => (
              <div
                key={chal.id}
                className="p-7 rounded-3xl bg-[#F3F7F0] border border-[#E7ECE6] flex flex-col justify-between space-y-6"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-[#78847B] mb-3">
                    <span className="font-semibold text-[#26332D]">{chal.type}</span>
                    <span className="font-mono text-[11px]">Due: {chal.deadline}</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#26332D] mb-3">{chal.title}</h3>
                  <p className="text-xs sm:text-sm text-[#78847B] leading-relaxed mb-6">
                    {chal.shortDesc}
                  </p>

                  <div className="p-4 rounded-2xl bg-white border border-[#E7ECE6] space-y-1">
                    <div className="text-xs font-bold text-[#26332D]">{chal.professorName}</div>
                    <div className="text-[11px] text-[#78847B]">{chal.professorTitle} · {chal.university}</div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-[#78847B] font-mono">
                    Estimated: {chal.estimatedHours}
                  </span>
                  <button
                    onClick={() => onOpenChallenge(chal)}
                    className="px-5 py-2.5 text-xs font-bold text-[#26332D] bg-[#B7E6A5] hover:bg-[#aee09c] rounded-xl shadow-xs transition-all"
                  >
                    Examine Challenge
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Philosophy Section */}
      <section className="py-20 border-b border-[#E7ECE6] bg-[#F3F7F0]/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E7ECE6] text-[#26332D] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#B7E6A5]" />
            <span>{t.aiPhilosophyBadge}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#26332D]">
            {t.aiPhilosophyTitle}
          </h2>

          <p className="text-sm sm:text-base text-[#78847B] max-w-2xl mx-auto leading-relaxed">
            {t.aiPhilosophyText}
          </p>

          <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
            <div className="p-5 rounded-2xl bg-white border border-[#E7ECE6]">
              <div className="text-xs font-bold text-[#26332D] mb-1">✕ What AI Doesn't Do</div>
              <p className="text-[11px] text-[#78847B]">
                Does not write essays, fabricate research data, or guarantee admissions.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-[#E7ECE6]">
              <div className="text-xs font-bold text-[#26332D] mb-1">✓ What AI Does</div>
              <p className="text-[11px] text-[#78847B]">
                Organizes deadlines, clarifies requirements, and asks probing questions.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-[#E7ECE6]">
              <div className="text-xs font-bold text-[#26332D] mb-1">👑 Student Ownership</div>
              <p className="text-[11px] text-[#78847B]">
                Students remain 100% responsible for their choices, ideas, and accomplishments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-20 md:py-28 bg-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#26332D]">
            {t.ctaTitle}
          </h2>
          <p className="text-sm sm:text-base text-[#78847B] max-w-xl mx-auto leading-relaxed">
            {t.ctaSub}
          </p>
          <div className="pt-2">
            <button
              onClick={onJoin}
              className="px-8 py-4 text-sm font-bold text-[#26332D] bg-[#B7E6A5] hover:bg-[#aee09c] border border-[#a6dd94] rounded-2xl shadow-xs transition-all inline-flex items-center gap-2 active:scale-98"
            >
              <span>{t.ctaBtn}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-[#E7ECE6] bg-[#F3F7F0]/30 text-xs text-[#78847B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="font-extrabold text-[#26332D] text-sm mb-1">APEX</div>
            <p className="max-w-md">{t.footerAbout}</p>
          </div>
          <div className="text-center md:text-right">
            <div>{t.footerLinks}</div>
            <div className="text-[10px] text-[#78847B]/80 mt-1">
              © 2026 APEX Academic Discovery Platform. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
