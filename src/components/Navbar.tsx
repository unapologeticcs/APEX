import React, { useState } from 'react';
import {
  Globe,
  Bell,
  Sparkles,
  UserCheck,
  ChevronDown,
  GraduationCap,
  BookOpen,
  ArrowRight,
  LogOut,
  Layers
} from 'lucide-react';
import { Language, UserRole } from '../types';
import { translations } from '../i18n/translations';

interface NavbarProps {
  currentView: 'landing' | 'student' | 'teacher';
  onNavigate: (view: 'landing' | 'student' | 'teacher') => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  userRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  onOpenOnboarding: (role?: UserRole) => void;
  onOpenNotifications: () => void;
  unreadCount: number;
  isPremium: boolean;
  onOpenPremium: () => void;
  studentName?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  language,
  onLanguageChange,
  userRole,
  onRoleChange,
  onOpenOnboarding,
  onOpenNotifications,
  unreadCount,
  isPremium,
  onOpenPremium,
  studentName
}) => {
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const t = translations[language];

  const languages: { code: Language; label: string }[] = [
    { code: 'en', label: 'English' },
    { code: 'ru', label: 'Русский' },
    { code: 'kk', label: 'Қазақша' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E7ECE6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand Zone */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onNavigate('landing')}
            className="flex items-center gap-2.5 text-left group focus:outline-none"
          >
            <div className="w-9 h-9 rounded-xl bg-[#B7E6A5] border border-[#aee09c] flex items-center justify-center font-bold text-[#26332D] text-base shadow-xs group-hover:scale-105 transition-transform">
              A
            </div>
            <div>
              <div className="text-base font-extrabold tracking-tight text-[#26332D] flex items-center gap-1.5 leading-none">
                <span>{t.brand.name}</span>
                <span className="text-[10px] font-semibold text-[#78847B] bg-[#F3F7F0] border border-[#E7ECE6] px-1.5 py-0.5 rounded-full">
                  beta
                </span>
              </div>
              <span className="text-[11px] text-[#78847B] font-medium tracking-tight">
                {t.brand.badge}
              </span>
            </div>
          </button>
        </div>

        {/* Center Nav Links (when on landing) */}
        {currentView === 'landing' ? (
          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-[#78847B]">
            <button
              onClick={() => onNavigate('landing')}
              className="hover:text-[#26332D] transition-colors whitespace-nowrap"
            >
              {t.nav.home}
            </button>
            <a
              href="#how-it-works"
              className="hover:text-[#26332D] transition-colors whitespace-nowrap"
            >
              {t.nav.howItWorks}
            </a>
            <a
              href="#opportunities"
              className="hover:text-[#26332D] transition-colors whitespace-nowrap"
            >
              {t.nav.opportunities}
            </a>
            <a
              href="#professors"
              className="hover:text-[#26332D] transition-colors whitespace-nowrap"
            >
              {t.nav.forUniversities}
            </a>
          </nav>
        ) : (
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-xs font-medium text-[#78847B]">
              {currentView === 'student' ? '🎓 ' + t.nav.studentPortal : '🏛️ ' + t.nav.teacherPortal}
            </span>
          </div>
        )}

        {/* Right Action Zone */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="px-2.5 py-1.5 rounded-lg border border-[#E7ECE6] bg-[#F3F7F0]/60 hover:bg-[#F3F7F0] text-[#26332D] text-xs font-semibold flex items-center gap-1.5 transition-colors"
              aria-label="Select language"
            >
              <Globe className="w-3.5 h-3.5 text-[#78847B]" />
              <span>{languages.find((l) => l.code === language)?.label}</span>
              <ChevronDown className="w-3 h-3 text-[#78847B]" />
            </button>

            {langDropdownOpen && (
              <div className="absolute right-0 mt-1.5 w-36 bg-white border border-[#E7ECE6] rounded-xl shadow-lg p-1 z-50 animate-in fade-in zoom-in-95 duration-150">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      onLanguageChange(l.code);
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs rounded-lg transition-colors flex items-center justify-between ${
                      language === l.code
                        ? 'bg-[#F3F7F0] text-[#26332D] font-bold'
                        : 'text-[#78847B] hover:text-[#26332D] hover:bg-[#F3F7F0]/50'
                    }`}
                  >
                    <span>{l.label}</span>
                    {language === l.code && <span className="w-1.5 h-1.5 rounded-full bg-[#B7E6A5]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick Portal View Switcher Button (Student <-> Teacher) */}
          <div className="hidden lg:flex items-center gap-1 p-1 bg-[#F3F7F0] rounded-xl border border-[#E7ECE6]">
            <button
              onClick={() => {
                onRoleChange('student');
                onNavigate('student');
              }}
              className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                currentView === 'student'
                  ? 'bg-white text-[#26332D] shadow-xs'
                  : 'text-[#78847B] hover:text-[#26332D]'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5 text-[#26332D]" />
              <span>{t.nav.studentPortal}</span>
            </button>
            <button
              onClick={() => {
                onRoleChange('teacher');
                onNavigate('teacher');
              }}
              className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                currentView === 'teacher'
                  ? 'bg-white text-[#26332D] shadow-xs'
                  : 'text-[#78847B] hover:text-[#26332D]'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-[#26332D]" />
              <span>{t.nav.teacherPortal}</span>
            </button>
          </div>

          {/* Notifications bell (when in portal) */}
          {currentView !== 'landing' && (
            <button
              onClick={onOpenNotifications}
              className="relative p-2 rounded-lg border border-[#E7ECE6] bg-white hover:bg-[#F3F7F0] text-[#78847B] hover:text-[#26332D] transition-colors"
              aria-label="View notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#F6C9D5] text-[#26332D] text-[10px] font-bold rounded-full border border-white flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
          )}

          {/* Premium Badge & Upgrade Button */}
          <button
            onClick={onOpenPremium}
            className={`px-2.5 py-1.5 text-xs font-semibold rounded-lg border transition-all flex items-center gap-1.5 ${
              isPremium
                ? 'bg-[#F6C9D5]/30 border-[#F6C9D5] text-[#26332D]'
                : 'bg-white border-[#E7ECE6] text-[#78847B] hover:border-[#F6C9D5] hover:text-[#26332D]'
            }`}
          >
            <Sparkles className={`w-3.5 h-3.5 ${isPremium ? 'text-rose-500' : 'text-[#78847B]'}`} />
            <span className="hidden sm:inline">
              {isPremium ? 'Premium' : t.nav.upgrade}
            </span>
          </button>

          {/* Primary CTA */}
          {currentView === 'landing' ? (
            <button
              onClick={() => onOpenOnboarding()}
              className="px-4 py-2 text-xs font-bold text-[#26332D] bg-[#B7E6A5] hover:bg-[#aee09c] border border-[#a6dd94] rounded-xl shadow-xs transition-all flex items-center gap-1.5 whitespace-nowrap active:scale-98"
            >
              <span>{t.nav.getStarted}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={() => onNavigate('landing')}
              className="p-2 rounded-lg border border-[#E7ECE6] text-[#78847B] hover:text-[#26332D] hover:bg-[#F3F7F0] transition-colors"
              title="Return to Public Homepage"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
