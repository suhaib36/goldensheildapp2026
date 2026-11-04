import React, { useState } from 'react';
import { OfficerProfile, TabType } from '../../types';
import { scheduleWeekDays } from '../../data/mockData';
import {
  Calendar,
  Clock,
  ChevronLeft,
  ChevronRight,
  Shield,
  FileDown,
  ArrowRightLeft,
  CheckCircle2,
  MapPin,
  Coffee,
  Check,
  Compass,
} from 'lucide-react';
import { sound } from '../../utils/audio';

interface ScheduleScreenProps {
  officer: OfficerProfile;
  onNavigateToTab: (tab: TabType) => void;
  onOpenTradeModal: () => void;
}

export const ScheduleScreen: React.FC<ScheduleScreenProps> = ({
  officer,
  onNavigateToTab,
  onOpenTradeModal,
}) => {
  const [viewMode, setViewMode] = useState<'weekly' | 'monthly'>('weekly');
  const [selectedDay, setSelectedDay] = useState<number>(23); // Today
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [exportComplete, setExportComplete] = useState<boolean>(false);

  const handleExportTimesheet = () => {
    sound.playRadioChirp();
    setIsExporting(true);

    setTimeout(() => {
      setIsExporting(false);
      setExportComplete(true);
      sound.playScanSuccess();

      // Trigger dummy download
      const element = document.createElement('a');
      const file = new Blob([
        `GOLDEN SHIELD CERTIFIED TIMESHEET\nOfficer: ${officer.name}\nBadge: ${officer.badgeNumber}\nMonth: October 2024\nHours Logged: 164.0\nOvertime: 12.5 hrs\nOn-Time Rate: 100%\nCryptographic Audit Hash: SHA256-GS-8842-CERTIFIED`
      ], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = `Timesheet_${officer.badgeNumber}_Oct2024.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);

      setTimeout(() => setExportComplete(false), 3000);
    }, 1200);
  };

  return (
    <div className="space-y-4 pb-4 animate-in fade-in duration-200">
      {/* Page Title & Month Picker */}
      <div className="space-y-1">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-mono">
          EXECUTIVE ROSTER
        </span>
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-black text-slate-900 tracking-tight">Shift & Attendance</h1>
          <div className="flex items-center space-x-1.5 bg-white border border-slate-200 rounded-xl px-2.5 py-1 text-xs font-bold text-slate-800 shadow-2xs">
            <button
              onClick={() => sound.playClick()}
              className="text-slate-400 hover:text-slate-800"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <span>Oct 2024</span>
            <button
              onClick={() => sound.playClick()}
              className="text-slate-400 hover:text-slate-800"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* METRICS SUMMARY ROW (3 STATISTICAL CARDS) */}
      <div className="grid grid-cols-3 gap-2.5">
        {/* Metric 1: Hours */}
        <div className="bg-white p-3.5 rounded-3xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Hours</span>
          <div className="text-2xl font-black text-slate-900 font-mono mt-0.5">164</div>
          <span className="text-[10px] text-slate-500 font-medium">Logged this mo.</span>
        </div>

        {/* Metric 2: Shifts */}
        <div className="bg-white p-3.5 rounded-3xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Shifts</span>
          <div className="text-2xl font-black text-slate-900 font-mono mt-0.5">18</div>
          <span className="text-[10px] text-emerald-600 font-bold">100% On-Time</span>
        </div>

        {/* Metric 3: Overtime */}
        <div className="bg-white p-3.5 rounded-3xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Overtime</span>
          <div className="text-2xl font-black text-emerald-600 font-mono mt-0.5">+12.5</div>
          <span className="text-[10px] text-slate-500 font-medium">Tier 1 Rate</span>
        </div>
      </div>

      {/* VIEW TOGGLES & WEEK STRIP */}
      <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-sm space-y-3">
        {/* Toggle buttons */}
        <div className="flex bg-slate-100 p-1 rounded-2xl">
          <button
            onClick={() => {
              sound.playClick();
              setViewMode('weekly');
            }}
            className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all ${
              viewMode === 'weekly' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Weekly View
          </button>
          <button
            onClick={() => {
              sound.playClick();
              setViewMode('monthly');
            }}
            className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all ${
              viewMode === 'monthly' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Monthly View
          </button>
        </div>

        {/* 7-Day Strip */}
        <div className="grid grid-cols-7 gap-1.5 pt-1">
          {scheduleWeekDays.map((d) => {
            const isSelected = selectedDay === d.date;
            return (
              <button
                key={d.date}
                onClick={() => {
                  sound.playClick();
                  setSelectedDay(d.date);
                }}
                className={`flex flex-col items-center py-2.5 px-1 rounded-2xl transition-all ${
                  d.isToday
                    ? 'bg-slate-900 text-white shadow-md'
                    : isSelected
                    ? 'bg-emerald-50 border-2 border-emerald-500 text-slate-900'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-100'
                }`}
              >
                <span className={`text-[9px] font-bold uppercase ${d.isToday ? 'text-slate-400' : 'text-slate-400'}`}>
                  {d.day}
                </span>
                <span className={`text-sm font-black my-0.5 ${d.isToday ? 'text-white' : 'text-slate-900'}`}>
                  {d.date}
                </span>
                <span
                  className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded-full ${
                    d.isToday
                      ? 'bg-emerald-400 text-slate-950'
                      : d.status === 'off'
                      ? 'text-slate-400'
                      : 'text-emerald-700 bg-emerald-100/60'
                  }`}
                >
                  {d.hours}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* IN PROGRESS SHIFT CARD */}
      <div className="bg-white rounded-3xl p-5 border-2 border-emerald-500/30 shadow-md space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[10px] font-black text-emerald-700 uppercase tracking-wider font-mono">
              • IN PROGRESS
            </span>
          </div>
          <span className="text-[10px] font-mono font-bold text-slate-400">Shift Code: #GS-8842</span>
        </div>

        <div>
          <h2 className="text-base font-black text-slate-900">Westfield Business Center</h2>
          <div className="flex items-center space-x-1.5 text-xs text-slate-600 font-mono mt-0.5">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>08:00 AM – 06:00 PM (10 hrs)</span>
          </div>
        </div>

        {/* Check-in Info */}
        <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 text-xs flex items-center justify-between">
          <div>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">CLOCKED IN AT</span>
            <span className="font-bold text-slate-800 font-mono mt-0.5 block">07:54 AM</span>
          </div>
          <span className="text-[10px] font-mono text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full font-bold">
            6m Early • GPS Verified
          </span>
        </div>

        {/* Progress Tracker */}
        <div>
          <div className="flex items-center justify-between text-xs font-medium text-slate-600 mb-1.5">
            <span>Shift Elapsed (4h 12m)</span>
            <span className="font-mono font-bold text-slate-900">42%</span>
          </div>
          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: '42%' }}></div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={() => {
              sound.playClick();
              onNavigateToTab('patrol');
            }}
            className="py-2.5 px-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl flex items-center justify-center space-x-1.5 transition-colors shadow-xs"
          >
            <Compass className="w-3.5 h-3.5 text-emerald-400" />
            <span>Patrol Log</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              alert('Rest break logged: 15-minute standard break protocol recorded.');
            }}
            className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl flex items-center justify-center space-x-1.5 transition-colors"
          >
            <Coffee className="w-3.5 h-3.5" />
            <span>Log Rest Break</span>
          </button>
        </div>
      </div>

      {/* UPCOMING ASSIGNMENTS (Next 72 Hours) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xs font-black text-slate-900 uppercase tracking-tight">
            Upcoming Assignments
          </h3>
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">Next 72 Hours</span>
        </div>

        <div className="space-y-2.5">
          {/* Assignment 1 */}
          <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-2xs space-y-1.5">
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
              <span className="font-bold text-slate-700">TOMORROW • THU, OCT 24</span>
              <span className="bg-slate-100 px-2 py-0.5 rounded-full font-bold">8 Hours</span>
            </div>
            <h4 className="text-sm font-black text-slate-900">Metro Financial Plaza</h4>
            <div className="flex items-center justify-between text-xs text-slate-600">
              <span className="font-mono">07:00 AM – 03:00 PM</span>
              <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                ROLE: Access Control
              </span>
            </div>
          </div>

          {/* Assignment 2 */}
          <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-2xs space-y-1.5">
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
              <span className="font-bold text-slate-700">FRI, OCT 25</span>
              <span className="bg-slate-100 px-2 py-0.5 rounded-full font-bold">8 Hours</span>
            </div>
            <h4 className="text-sm font-black text-slate-900">Metro Financial Plaza</h4>
            <div className="flex items-center justify-between text-xs text-slate-600">
              <span className="font-mono">07:00 AM – 03:00 PM</span>
              <span className="text-[10px] font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                ROLE: Perimeter Escort
              </span>
            </div>
          </div>

          {/* Assignment 3 */}
          <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-2xs space-y-1.5">
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
              <span className="font-bold text-slate-700">SAT, OCT 26 • Night Duty</span>
              <span className="bg-slate-100 px-2 py-0.5 rounded-full font-bold">8 Hours</span>
            </div>
            <h4 className="text-sm font-black text-slate-900">Apex Technology Campus</h4>
            <div className="flex items-center justify-between text-xs text-slate-600">
              <span className="font-mono">10:00 PM – 06:00 AM (+1)</span>
              <span className="text-[10px] font-mono font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-200">
                ROLE: Asset Vault Guard
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM UTILITY ACTIONS */}
      <div className="space-y-2 pt-2">
        <button
          onClick={handleExportTimesheet}
          disabled={isExporting}
          className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-black uppercase tracking-wider rounded-2xl shadow-md flex items-center justify-center space-x-2 transition-all active:scale-98"
        >
          {exportComplete ? (
            <>
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Timesheet PDF Downloaded</span>
            </>
          ) : (
            <>
              <FileDown className="w-4 h-4 text-emerald-400" />
              <span>{isExporting ? 'Generating Certified Timesheet...' : 'Export Certified Timesheet PDF'}</span>
            </>
          )}
        </button>

        <button
          onClick={() => {
            sound.playClick();
            onOpenTradeModal();
          }}
          className="w-full py-3 bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold rounded-2xl border border-slate-200 shadow-2xs transition-colors flex items-center justify-center space-x-2"
        >
          <ArrowRightLeft className="w-3.5 h-3.5 text-amber-500" />
          <span>Request Shift Swap / Coverage</span>
        </button>
      </div>
    </div>
  );
};
