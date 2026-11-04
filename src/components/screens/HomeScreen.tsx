import React, { useState, useEffect } from 'react';
import { OfficerProfile, Checkpoint, TabType } from '../../types';
import {
  Shield,
  Coffee,
  LogOut,
  MapPin,
  Compass,
  CheckCircle2,
  Clock,
  Radio,
  Copy,
  Check,
  ChevronRight,
  AlertTriangle,
  Siren,
  QrCode,
  BookOpen,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { sound } from '../../utils/audio';

interface HomeScreenProps {
  officer: OfficerProfile;
  checkpoints: Checkpoint[];
  onNavigateToTab: (tab: TabType) => void;
  onOpenScanner: (checkpoint: Checkpoint) => void;
  onOpenSOS: () => void;
  onOpenAddNote: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  officer,
  checkpoints,
  onNavigateToTab,
  onOpenScanner,
  onOpenSOS,
  onOpenAddNote,
}) => {
  const [shiftElapsed, setShiftElapsed] = useState({ hours: 4, minutes: 25, seconds: 12 });
  const [copiedKeycode, setCopiedKeycode] = useState<boolean>(false);
  const [isOnBreak, setIsOnBreak] = useState<boolean>(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setShiftElapsed((prev) => {
        let sec = prev.seconds + 1;
        let min = prev.minutes;
        let hr = prev.hours;
        if (sec >= 60) {
          sec = 0;
          min += 1;
        }
        if (min >= 60) {
          min = 0;
          hr += 1;
        }
        return { hours: hr, minutes: min, seconds: sec };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const completedCheckpoints = checkpoints.filter((c) => c.status === 'completed').length;
  const progressPercent = Math.round((completedCheckpoints / checkpoints.length) * 100);
  const nextPendingCheckpoint = checkpoints.find((c) => c.status === 'pending') || checkpoints[0];

  const handleCopyKeycode = () => {
    sound.playClick();
    navigator.clipboard?.writeText('#8842-SEC');
    setCopiedKeycode(true);
    setTimeout(() => setCopiedKeycode(false), 2000);
  };

  return (
    <div className="space-y-4 pb-20 animate-in fade-in duration-200">
      {/* Officer Greeting Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[10px] font-bold text-emerald-700 tracking-wider uppercase">
              ON DUTY • ACTIVE Tier 1
            </span>
          </div>
          <h1 className="text-xl font-black text-slate-900 mt-0.5">Good Morning, {officer.name.split(' ')[0]}</h1>
          <p className="text-xs font-medium text-slate-500 font-mono mt-0.5">
            Badge #{officer.badgeNumber} • Shift: {officer.currentShift.startTime} – {officer.currentShift.endTime}
          </p>
        </div>

        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-slate-900 to-slate-800 p-0.5 shadow-md flex items-center justify-center shrink-0">
          <div className="w-full h-full rounded-[14px] bg-slate-900 flex items-center justify-center text-amber-400 font-black text-sm">
            JW
          </div>
        </div>
      </div>

      {/* ACTIVE SHIFT TELEMETRY CARD (High-Tech Tactical Navy Card) */}
      <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white rounded-3xl p-5 border border-slate-800 shadow-xl relative overflow-hidden">
        {/* Decorative Grid Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] opacity-25"></div>

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="text-xs font-black uppercase tracking-widest text-emerald-400">ACTIVE SHIFT</span>
            </div>
            <span className="text-[10px] font-mono bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full flex items-center space-x-1">
              <Radio className="w-3 h-3 text-emerald-400" />
              <span>GPS Locked</span>
            </span>
          </div>

          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-black tracking-tight font-mono text-white">
              {String(shiftElapsed.hours).padStart(2, '0')}h {String(shiftElapsed.minutes).padStart(2, '0')}m
            </span>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Elapsed</span>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-800/80">
            <div className="text-sm font-bold text-slate-100 flex items-center space-x-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>{officer.currentShift.property}</span>
            </div>
            <div className="text-[11px] text-slate-400 flex items-center space-x-1 mt-1 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>Perimeter Geofence Verified • {officer.currentShift.geofenceAccuracy}</span>
            </div>
          </div>

          {/* Quick Shift Actions */}
          <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-800/80">
            <button
              onClick={() => {
                sound.playClick();
                setIsOnBreak(!isOnBreak);
              }}
              className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5 transition-all border ${
                isOnBreak
                  ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                  : 'bg-slate-800/80 hover:bg-slate-800 text-slate-200 border-slate-700'
              }`}
            >
              <Coffee className="w-3.5 h-3.5" />
              <span>{isOnBreak ? 'End Break' : 'Quick Break'}</span>
            </button>

            <button
              onClick={() => {
                sound.playRadioChirp();
                alert('Shift Clock-Out requires supervisor confirmation or end of 10-hour shift window at 06:00 PM.');
              }}
              className="py-2 px-3 rounded-xl text-xs font-bold bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700 flex items-center justify-center space-x-1.5 transition-all"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Clock Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* PRIMARY ASSIGNMENT CARD */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-black tracking-wider text-slate-500 uppercase">
            PRIMARY ASSIGNMENT
          </span>
          <span className="text-[9px] font-black bg-amber-100 text-amber-900 border border-amber-200 px-2 py-0.5 rounded-full uppercase flex items-center space-x-1">
            <Sparkles className="w-2.5 h-2.5 text-amber-600" />
            <span>HIGH VISIBILITY</span>
          </span>
        </div>

        <h2 className="text-base font-black text-slate-900">{officer.currentShift.property}</h2>
        <p className="text-xs text-slate-600 font-medium mt-0.5">Commercial Property Security & Perimeter Guard</p>

        {/* Location chip */}
        <div className="flex items-center space-x-1 text-xs text-slate-500 mt-2">
          <MapPin className="w-3.5 h-3.5 text-slate-400" />
          <span>{officer.currentShift.address}</span>
        </div>

        {/* Supervisor & Keycode Strip */}
        <div className="grid grid-cols-2 gap-3 mt-4 pt-3 border-t border-slate-100 bg-slate-50 p-3 rounded-2xl">
          <div>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">SUPERVISOR ON DUTY</span>
            <span className="text-xs font-bold text-slate-800 mt-0.5 block">{officer.currentShift.supervisor}</span>
          </div>

          <div>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">ACCESS GATE KEYCODE</span>
            <button
              onClick={handleCopyKeycode}
              className="flex items-center space-x-1 text-xs font-mono font-bold text-emerald-700 hover:text-emerald-800 mt-0.5"
            >
              <span>{officer.currentShift.gateKeycode}</span>
              {copiedKeycode ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3 text-slate-400" />}
            </button>
          </div>
        </div>
      </div>

      {/* ACTIVE PATROL RUN CARD */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Compass className="w-4 h-4 text-emerald-600" />
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight">Active Patrol Run</h3>
          </div>
          <span className="text-xs font-black text-emerald-600 font-mono bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            {progressPercent}% Complete
          </span>
        </div>

        {/* Progress Bar */}
        <div>
          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
          <div className="flex justify-between items-center text-[11px] text-slate-500 mt-1.5 font-medium">
            <span>{completedCheckpoints} of {checkpoints.length} Checkpoints Logged</span>
            <span className="text-amber-600 font-bold flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>Due in 15 mins</span>
            </span>
          </div>
        </div>

        {/* Target Location Box */}
        <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/80 flex items-center justify-between">
          <div>
            <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">TARGET LOCATION</div>
            <div className="text-xs font-bold text-slate-900 mt-0.5">{nextPendingCheckpoint.name}</div>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onNavigateToTab('patrol');
            }}
            className="py-1.5 px-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl flex items-center space-x-1 shadow-xs transition-colors"
          >
            <span>Navigate</span>
            <ChevronRight className="w-3 h-3 text-emerald-400" />
          </button>
        </div>
      </div>

      {/* QUICK ACTIONS GRID */}
      <div>
        <div className="text-[11px] font-black text-slate-500 uppercase tracking-wider px-1 mb-2">
          QUICK ACTIONS
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          {/* Action 1: Start Patrol */}
          <button
            onClick={() => {
              sound.playClick();
              onNavigateToTab('patrol');
            }}
            className="p-3.5 bg-white hover:bg-slate-50 rounded-2xl border border-slate-200 shadow-2xs text-left transition-all active:scale-98 group"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Compass className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono text-emerald-600 font-bold">10:30 AM</span>
            </div>
            <div className="text-xs font-black text-slate-900">Start Patrol</div>
            <div className="text-[10px] text-slate-500">Scheduled Route</div>
          </button>

          {/* Action 2: Report Incident */}
          <button
            onClick={() => {
              sound.playEmergencyAlarm();
              onOpenSOS();
            }}
            className="p-3.5 bg-white hover:bg-red-50/50 rounded-2xl border border-red-200 shadow-2xs text-left transition-all active:scale-98 group"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 rounded-xl bg-red-100 text-red-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Siren className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono text-red-600 font-bold">Instant SOS</span>
            </div>
            <div className="text-xs font-black text-slate-900">Report Incident</div>
            <div className="text-[10px] text-red-600 font-medium">Trigger Alert</div>
          </button>

          {/* Action 3: Scan Checkpoint */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenScanner(nextPendingCheckpoint);
            }}
            className="p-3.5 bg-white hover:bg-slate-50 rounded-2xl border border-slate-200 shadow-2xs text-left transition-all active:scale-98 group"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <QrCode className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono text-blue-600 font-bold">NFC / QR</span>
            </div>
            <div className="text-xs font-black text-slate-900">Scan Checkpoint</div>
            <div className="text-[10px] text-slate-500">Verify Tag</div>
          </button>

          {/* Action 4: Guard Logbook */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenAddNote();
            }}
            className="p-3.5 bg-white hover:bg-slate-50 rounded-2xl border border-slate-200 shadow-2xs text-left transition-all active:scale-98 group"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <BookOpen className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono text-amber-600 font-bold">Shift Logs</span>
            </div>
            <div className="text-xs font-black text-slate-900">Guard Logbook</div>
            <div className="text-[10px] text-slate-500">Add Entry</div>
          </button>
        </div>
      </div>

      {/* RECENT TELEMETRY & ALERTS */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-black text-slate-900 uppercase tracking-tight">Recent Telemetry & Alerts</h3>
          <button
            onClick={() => {
              sound.playClick();
              onNavigateToTab('patrol');
            }}
            className="text-[11px] font-bold text-emerald-600 hover:text-emerald-700"
          >
            View All
          </button>
        </div>

        <div className="space-y-2.5">
          {/* Telemetry Item 1 */}
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-start justify-between">
            <div className="flex items-start space-x-2.5">
              <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0"></div>
              <div>
                <div className="text-xs font-bold text-slate-900">Checkpoint 2 Verified</div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  South Perimeter Gate tag scanned successfully
                </div>
              </div>
            </div>
            <span className="text-[10px] font-mono text-slate-400 shrink-0">09:45 AM</span>
          </div>

          {/* Telemetry Item 2: Command Broadcast */}
          <div className="p-3 bg-amber-50/60 rounded-2xl border border-amber-200/80">
            <div className="flex items-center space-x-1.5 mb-1">
              <span className="text-[9px] font-bold bg-amber-500 text-white px-1.5 py-0.2 rounded-md uppercase font-mono">
                Command Broadcast Ops
              </span>
            </div>
            <p className="text-[11px] text-slate-700 leading-relaxed font-medium">
              Perimeter Gate B maintenance ongoing until 12:00 PM. Direct visitor traffic to Gate A.
            </p>
          </div>
        </div>
      </div>

      {/* UPCOMING ROSTER */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-black text-slate-900 uppercase tracking-tight flex items-center space-x-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            <span>Upcoming Roster</span>
          </h3>
          <button
            onClick={() => {
              sound.playClick();
              onNavigateToTab('schedule');
            }}
            className="text-[11px] font-bold text-emerald-600 hover:text-emerald-700"
          >
            View Schedule
          </button>
        </div>

        <div className="space-y-2">
          {/* Roster Item 1 */}
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="text-center w-10 py-1 bg-white rounded-xl border border-slate-200 shadow-2xs">
                <span className="text-[9px] font-bold text-slate-400 uppercase block">THU</span>
                <span className="text-sm font-black text-slate-900">24</span>
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">Westfield Business Center</div>
                <div className="text-[11px] text-slate-500">08:00 AM – 06:00 PM (Day Shift)</div>
              </div>
            </div>
            <span className="text-[11px] font-bold text-emerald-600 font-mono">Confirmed</span>
          </div>

          {/* Roster Item 2 */}
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="text-center w-10 py-1 bg-white rounded-xl border border-slate-200 shadow-2xs">
                <span className="text-[9px] font-bold text-slate-400 uppercase block">FRI</span>
                <span className="text-sm font-black text-slate-900">25</span>
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">Metro Financial Tower</div>
                <div className="text-[11px] text-slate-500">02:00 PM – 10:00 PM (Late Shift)</div>
              </div>
            </div>
            <span className="text-[11px] font-bold text-blue-600 font-mono">Assigned</span>
          </div>
        </div>
      </div>
    </div>
  );
};
