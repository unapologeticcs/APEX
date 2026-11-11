import React, { useState, useEffect } from 'react';
import { X, Sparkles, MessageCircle, Heart, Volume2, VolumeX, RefreshCw } from 'lucide-react';
import { Language } from '../../types';
import { translations } from '../../i18n/translations';

interface PipProps {
  language: Language;
  streakDays: number;
  lastEvent?: 'taskCompleted' | 'submission' | 'achievementAdded' | null;
  onClearEvent?: () => void;
}

export const Pip: React.FC<PipProps> = ({
  language,
  streakDays,
  lastEvent,
  onClearEvent
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isSnoozed, setIsSnoozed] = useState(false);
  const [isBubbleOpen, setIsBubbleOpen] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentMessage, setCurrentMessage] = useState<string>('');
  const [eyeState, setEyeState] = useState<'normal' | 'blink' | 'happy' | 'winking'>('normal');

  const t = translations[language].companion;

  // React to events or set initial message
  useEffect(() => {
    if (isSnoozed) return;

    if (lastEvent === 'taskCompleted') {
      setCurrentMessage(t.taskCompleted);
      setIsBubbleOpen(true);
      setEyeState('happy');
      setTimeout(() => setEyeState('normal'), 3000);
      if (onClearEvent) onClearEvent();
    } else if (lastEvent === 'submission') {
      setCurrentMessage(t.submission);
      setIsBubbleOpen(true);
      setEyeState('happy');
      setTimeout(() => setEyeState('normal'), 3000);
      if (onClearEvent) onClearEvent();
    } else if (lastEvent === 'achievementAdded') {
      setCurrentMessage(t.achievementAdded);
      setIsBubbleOpen(true);
      setEyeState('happy');
      setTimeout(() => setEyeState('normal'), 3000);
      if (onClearEvent) onClearEvent();
    } else if (!currentMessage) {
      // Pick initial greeting
      const randomGreeting = t.greetings[Math.floor(Math.random() * t.greetings.length)];
      setCurrentMessage(randomGreeting);
    }
  }, [lastEvent, language, isSnoozed, t]);

  // Subtle natural blinking loop
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setEyeState('blink');
      setTimeout(() => setEyeState('normal'), 180);
    }, 4500);
    return () => clearInterval(blinkInterval);
  }, []);

  const getRandomPhrase = () => {
    const options = [
      ...t.greetings,
      t.motivation,
      t.random,
      streakDays > 1 ? t.streak : t.motivation
    ];
    const picked = options[Math.floor(Math.random() * options.length)];
    setCurrentMessage(picked);
    setIsBubbleOpen(true);
    setEyeState('happy');
    setTimeout(() => setEyeState('normal'), 1500);
  };

  if (isSnoozed) {
    return (
      <div className="fixed bottom-4 right-4 z-40">
        <button
          onClick={() => {
            setIsSnoozed(false);
            setIsBubbleOpen(true);
          }}
          className="p-2.5 rounded-full bg-white/95 border border-[#E7ECE6] text-[#78847B] hover:text-[#26332D] shadow-md hover:bg-[#F3F7F0] transition-all flex items-center gap-1.5 text-xs font-medium"
          title={t.unsnooze}
        >
          <div className="w-4 h-4 rounded bg-[#B7E6A5] flex items-center justify-center text-[10px] font-bold text-[#26332D]">
            P
          </div>
          <span>Pip</span>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end pointer-events-none">
      {/* Pip Speech Bubble */}
      {isBubbleOpen && currentMessage && (
        <div className="pointer-events-auto max-w-xs mb-2.5 p-3.5 bg-white/95 backdrop-blur-md rounded-2xl rounded-br-sm border border-[#E7ECE6] shadow-lg text-[#26332D] text-xs leading-relaxed transition-all animate-in fade-in slide-in-from-bottom-2 duration-300 relative group">
          <div className="flex items-start justify-between gap-2 mb-1">
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#78847B]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B7E6A5]" />
              <span>Pip</span>
              <span className="text-[10px] text-[#78847B]/80 font-normal">· {t.role}</span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={getRandomPhrase}
                className="text-[#78847B] hover:text-[#26332D] p-0.5 rounded transition-colors"
                title="Next thought"
              >
                <RefreshCw className="w-3 h-3" />
              </button>
              <button
                onClick={() => setIsBubbleOpen(false)}
                className="text-[#78847B] hover:text-[#26332D] p-0.5 rounded transition-colors"
                title="Close bubble"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <p className="font-normal text-[#26332D] pr-1">{currentMessage}</p>

          <div className="mt-2.5 pt-2 border-t border-[#E7ECE6]/80 flex items-center justify-between text-[10px] text-[#78847B]">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#B7E6A5]" />
              <span>Streak: {streakDays} days</span>
            </span>
            <button
              onClick={() => setIsSnoozed(true)}
              className="hover:underline text-[10px] text-[#78847B]"
            >
              {t.snooze}
            </button>
          </div>
        </div>
      )}

      {/* Pip Character Avatar */}
      <div className="pointer-events-auto flex items-center gap-2">
        <button
          onClick={() => {
            if (!isBubbleOpen) {
              getRandomPhrase();
            } else {
              setIsExpanded(!isExpanded);
            }
          }}
          className="relative group p-1 transition-transform hover:scale-105 active:scale-95 focus:outline-none"
          aria-label="Interact with Pip"
        >
          {/* Character Body (Soft Pastel Matcha Square with Smooth Rounded Corners) */}
          <div className="w-13 h-13 rounded-2xl bg-[#B7E6A5] border-2 border-[#FFFFFF] shadow-md flex flex-col items-center justify-center relative overflow-hidden transition-colors group-hover:bg-[#aee09c]">
            {/* Subtle soft cheeks in soft pink (#F6C9D5) */}
            <div className="absolute top-7 left-2 w-2 h-1 rounded-full bg-[#F6C9D5]/90" />
            <div className="absolute top-7 right-2 w-2 h-1 rounded-full bg-[#F6C9D5]/90" />

            {/* Eyes */}
            <div className="flex items-center gap-3 mt-1.5">
              {eyeState === 'blink' ? (
                <>
                  <div className="w-2.5 h-0.5 bg-[#26332D] rounded-full" />
                  <div className="w-2.5 h-0.5 bg-[#26332D] rounded-full" />
                </>
              ) : eyeState === 'happy' ? (
                <>
                  <div className="w-2.5 h-2 border-t-2 border-[#26332D] rounded-t-full" />
                  <div className="w-2.5 h-2 border-t-2 border-[#26332D] rounded-t-full" />
                </>
              ) : eyeState === 'winking' ? (
                <>
                  <div className="w-2 h-2 rounded-full bg-[#26332D]" />
                  <div className="w-2.5 h-0.5 bg-[#26332D] rounded-full mt-1" />
                </>
              ) : (
                <>
                  {/* Normal eyes with cute white pupil reflection */}
                  <div className="w-2 h-2 rounded-full bg-[#26332D] relative flex items-start justify-end">
                    <span className="w-0.5 h-0.5 rounded-full bg-white m-0.5" />
                  </div>
                  <div className="w-2 h-2 rounded-full bg-[#26332D] relative flex items-start justify-end">
                    <span className="w-0.5 h-0.5 rounded-full bg-white m-0.5" />
                  </div>
                </>
              )}
            </div>

            {/* Subtle soft smile */}
            <div className="w-2.5 h-1 border-b-2 border-[#26332D] rounded-b-full mt-1" />
          </div>

          {/* Online/Active status indicator */}
          <span className="absolute bottom-1 right-1 w-3 h-3 rounded-full bg-[#F6C9D5] border-2 border-white" />
        </button>
      </div>
    </div>
  );
};
