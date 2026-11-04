import React, { useState, useEffect } from 'react';
import { TabType } from '../types';
import { Shield, Bell, Wifi, BatteryCharging, Radio, Volume2, VolumeX, Eye, Smartphone, RotateCcw } from 'lucide-react';
import { sound } from '../utils/audio';

interface HeaderProps {
  currentTab: TabType;
  isCanvasView: boolean;
  setIsCanvasView: (val: boolean) => void;
  onOpenSOS: () => void;
  onResetData: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  isCanvasView,
  setIsCanvasView,
  onOpenSOS,
  onResetData,
}) => {
  const [time, setTime] = useState<string>('10:15 AM EST');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        }) + ' EST'
      );
    };
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const getTabTitle = (tab: TabType) => {
    switch (tab) {
      case 'home':
        return 'HOME';
      case 'assignments':
        return 'ASSIGNMENTS';
      case 'patrol':
        return 'PATROL';
      case 'schedule':
        return 'SCHEDULE';
      case 'profile':
        return 'PROFILE';
      default:
        return 'DASHBOARD';
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all">
      {/* Top Tactical Status Strip */}
      <div className="bg-slate-900 text-slate-300 px-4 py-1.5 flex items-center justify-between text-[11px] font-mono tracking-wider border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <span className="flex items-center space-x-1 text-emerald-400 font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>TACTICAL LINK ACTIVE</span>
          </span>
          <span className="text-slate-500 hidden sm:inline">|</span>
          <span className="text-slate-400 hidden sm:inline flex items-center space-x-1">
            <Radio className="w-3 h-3 text-cyan-400" />
            <span>ENCRYPTED (AES-256)</span>
          </span>
        </div>

        <div className="flex items-center space-x-4">
          <span className="text-slate-200 font-bold">{time}</span>
          <div className="flex items-center space-x-1.5 text-slate-400">
            <Wifi className="w-3 h-3 text-emerald-400" />
            <BatteryCharging className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[10px]">98%</span>
          </div>
        </div>
      </div>

      {/* Main Branding Bar */}
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between">
        {/* Brand Shield & Title */}
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 flex items-center justify-center shadow-md shadow-slate-900/10">
            <Shield className="w-5 h-5 text-amber-400 fill-amber-400/20" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="text-xs font-black tracking-widest text-slate-900 uppercase">GOLDEN SHIELD</span>
              <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded-full uppercase">Verified</span>
            </div>
            <div className="text-[11px] font-bold tracking-wider text-slate-500 uppercase">
              {isCanvasView ? 'STITCH CANVAS (4 SCREENS)' : getTabTitle(currentTab)}
            </div>
          </div>
        </div>

        {/* Global Control Center */}
        <div className="flex items-center space-x-2">
          {/* Canvas vs Phone view toggle */}
          <button
            onClick={() => {
              sound.playClick();
              setIsCanvasView(!isCanvasView);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 border transition-all ${
              isCanvasView
                ? 'bg-amber-500 text-white border-amber-600 shadow-sm'
                : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
            }`}
            title="Toggle between individual Interactive Mobile view and 4-Screen Stitch Canvas view"
          >
            {isCanvasView ? <Smartphone className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span className="hidden md:inline">{isCanvasView ? 'Single Screen View' : 'All 4 Screens Canvas'}</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={() => {
              setSoundEnabled(!soundEnabled);
              sound.playClick();
            }}
            className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors"
            title={soundEnabled ? 'Mute App Audio' : 'Enable Audio'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-600" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
          </button>

          {/* Reset Demo State */}
          <button
            onClick={() => {
              sound.playClick();
              onResetData();
            }}
            className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors hidden sm:block"
            title="Reset to initial Stitch demo data"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Instant SOS Button */}
          <button
            onClick={() => {
              sound.playEmergencyAlarm();
              onOpenSOS();
            }}
            className="bg-red-600 hover:bg-red-700 active:scale-95 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center space-x-1.5 shadow-sm shadow-red-600/30 transition-all animate-pulse"
          >
            <Bell className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">INSTANT SOS</span>
            <span className="sm:hidden">SOS</span>
          </button>
        </div>
      </div>
    </header>
  );
};
