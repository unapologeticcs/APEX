import React from 'react';
import { X, Bell, Check, Clock, BookOpen, Award, Compass, Info } from 'lucide-react';
import { AppNotification, Language } from '../../types';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: AppNotification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  language: Language;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  language
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-[#26332D]/30 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-sm bg-white h-full shadow-2xl flex flex-col border-l border-[#E7ECE6] animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-5 border-b border-[#E7ECE6] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-[#26332D]" />
            <h3 className="font-bold text-sm text-[#26332D]">Academic Notifications</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#78847B] hover:text-[#26332D] hover:bg-[#F3F7F0]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action bar */}
        <div className="px-5 py-2.5 bg-[#F3F7F0]/60 border-b border-[#E7ECE6] flex items-center justify-between text-xs">
          <span className="text-[#78847B]">
            {notifications.filter((n) => !n.read).length} unread updates
          </span>
          <button
            onClick={onMarkAllAsRead}
            className="text-[11px] font-semibold text-[#26332D] hover:underline"
          >
            Mark all read
          </button>
        </div>

        {/* Notifications List */}
        <div className="p-4 flex-1 overflow-y-auto space-y-3">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => onMarkAsRead(notif.id)}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer text-xs space-y-1.5 ${
                notif.read
                  ? 'bg-white border-[#E7ECE6] opacity-75'
                  : 'bg-[#F3F7F0]/60 border-[#B7E6A5] shadow-2xs'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#26332D] flex items-center gap-1.5">
                  {!notif.read && <span className="w-1.5 h-1.5 rounded-full bg-[#B7E6A5]" />}
                  <span>{notif.title}</span>
                </span>
                <span className="text-[10px] text-[#78847B] font-mono">{notif.timestamp}</span>
              </div>
              <p className="text-[11px] text-[#78847B] leading-relaxed">{notif.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
