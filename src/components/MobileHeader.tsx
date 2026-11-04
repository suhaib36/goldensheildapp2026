import React from 'react';
import { TabType } from '../types';
import { Bell, Calendar, Shield, User, Compass } from 'lucide-react';
import { sound } from '../utils/audio';

interface MobileHeaderProps {
  currentTab: TabType;
  onOpenSOS: () => void;
  onNavigateTab: (tab: TabType) => void;
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({
  currentTab,
  onOpenSOS,
  onNavigateTab,
}) => {
  const getHeaderInfo = () => {
    switch (currentTab) {
      case 'home':
        return {
          title: 'HOME',
          rightAction: (
            <button
              onClick={() => {
                sound.playEmergencyAlarm();
                onOpenSOS();
              }}
              className="relative w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition-colors"
              title="Notifications & SOS"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            </button>
          ),
        };
      case 'assignments':
        return {
          title: 'ASSIGNMENTS',
          rightAction: (
            <button
              onClick={() => {
                sound.playClick();
                onNavigateTab('profile');
              }}
              className="w-8 h-8 rounded-full bg-slate-900 text-amber-400 text-xs font-bold flex items-center justify-center border border-slate-700 shadow-2xs"
              title="Officer Profile"
            >
              JW
            </button>
          ),
        };
      case 'patrol':
        return {
          title: 'PATROL',
          rightAction: (
            <div className="flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <button
                onClick={() => {
                  sound.playClick();
                  onNavigateTab('profile');
                }}
                className="w-8 h-8 rounded-full bg-slate-900 text-amber-400 text-xs font-bold flex items-center justify-center border border-slate-700 shadow-2xs"
                title="Officer Profile"
              >
                JW
              </button>
            </div>
          ),
        };
      case 'schedule':
        return {
          title: 'SCHEDULE',
          rightAction: (
            <button
              onClick={() => {
                sound.playClick();
              }}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition-colors"
              title="Calendar Roster"
            >
              <Calendar className="w-4 h-4" />
            </button>
          ),
        };
      case 'profile':
        return {
          title: 'PROFILE',
          rightAction: (
            <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200">
              <Shield className="w-4 h-4" />
            </div>
          ),
        };
    }
  };

  const { title, rightAction } = getHeaderInfo();

  return (
    <header className="shrink-0 bg-white border-b border-slate-200/80 px-4 py-3 flex items-center justify-between z-30 select-none">
      {/* Left Golden Shield Mini Crest & Title */}
      <div className="w-8 h-8 flex items-center justify-start">
        <div className="w-7 h-7 rounded-lg bg-slate-900 flex items-center justify-center shadow-2xs">
          <Shield className="w-4 h-4 text-amber-400 fill-amber-400/20" />
        </div>
      </div>

      {/* Center Screen Title matching Stitch designs */}
      <div className="text-center">
        <div className="text-[10px] font-black tracking-widest text-slate-900 uppercase">
          GOLDEN SHIELD
        </div>
        <div className="text-xs font-black tracking-wider text-slate-600 uppercase">
          {title}
        </div>
      </div>

      {/* Right Action */}
      <div className="w-8 h-8 flex items-center justify-end">
        {rightAction}
      </div>
    </header>
  );
};
