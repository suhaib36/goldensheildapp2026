import React, { useState, useEffect } from 'react';
import { Checkpoint, FieldNote } from '../../types';
import {
  Compass,
  CheckCircle2,
  Clock,
  MapPin,
  QrCode,
  Radio,
  Paperclip,
  Plus,
  Camera,
  ShieldCheck,
  Lock,
  ChevronRight,
  AlertCircle,
  FileCheck,
  Sparkles,
} from 'lucide-react';
import { sound } from '../../utils/audio';

interface PatrolScreenProps {
  checkpoints: Checkpoint[];
  fieldNotes: FieldNote[];
  onOpenScanner: (checkpoint: Checkpoint) => void;
  onOpenAddNote: () => void;
  onOpenUploadPhoto: () => void;
  onOpenSubmitReport: () => void;
}

export const PatrolScreen: React.FC<PatrolScreenProps> = ({
  checkpoints,
  fieldNotes,
  onOpenScanner,
  onOpenAddNote,
  onOpenUploadPhoto,
  onOpenSubmitReport,
}) => {
  const [dispatchTimer, setDispatchTimer] = useState({ minutes: 42, seconds: 17 });
  const [activeRouteTab, setActiveRouteTab] = useState<'map' | 'hud'>('map');

  useEffect(() => {
    const timer = setInterval(() => {
      setDispatchTimer((prev) => {
        let sec = prev.seconds + 1;
        let min = prev.minutes;
        if (sec >= 60) {
          sec = 0;
          min += 1;
        }
        return { minutes: min, seconds: sec };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const completedCount = checkpoints.filter((c) => c.status === 'completed').length;
  const progressPercent = Math.round((completedCount / checkpoints.length) * 100);
  const pendingCheckpoint = checkpoints.find((c) => c.status === 'pending') || checkpoints[0];

  return (
    <div className="space-y-4 pb-4 animate-in fade-in duration-200">
      {/* Active Patrol Dispatch Header Bar */}
      <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-sm space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[10px] font-black tracking-widest text-emerald-700 uppercase font-mono">
              ACTIVE PATROL DISPATCH
            </span>
          </div>
          <div className="px-2.5 py-1 bg-slate-900 text-white rounded-xl text-xs font-mono font-bold flex items-center space-x-1.5 shadow-xs">
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            <span>
              00:{String(dispatchTimer.minutes).padStart(2, '0')}:{String(dispatchTimer.seconds).padStart(2, '0')}
            </span>
          </div>
        </div>

        <div>
          <h1 className="text-lg font-black text-slate-900">Westfield Business Center</h1>
          <p className="text-xs text-slate-600 font-medium">Sector B – Perimeter & Common Ground</p>
          <div className="text-[11px] font-mono text-slate-400 mt-0.5">
            Routine Patrol #3 • 10:00 AM – 11:30 AM
          </div>
        </div>
      </div>

      {/* MISSION TELEMETRY WIDGET */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest font-mono">
            MISSION TELEMETRY
          </span>
          <span className="text-[10px] font-mono text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            {completedCount} of {checkpoints.length} Checkpoints Verified
          </span>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
            {/* Circular progress representation */}
            <svg className="w-16 h-16 transform -rotate-90">
              <circle cx="32" cy="32" r="26" stroke="#f1f5f9" strokeWidth="6" fill="transparent" />
              <circle
                cx="32"
                cy="32"
                r="26"
                stroke="#10b981"
                strokeWidth="6"
                fill="transparent"
                strokeDasharray="163"
                strokeDashoffset={163 - (163 * progressPercent) / 100}
                strokeLinecap="round"
                className="transition-all duration-700"
              />
            </svg>
            <span className="absolute text-sm font-black text-slate-900 font-mono">{progressPercent}%</span>
          </div>

          <div className="flex-1 grid grid-cols-2 gap-2">
            <div className="p-2.5 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">PACE</span>
              <span className="text-xs font-black text-slate-800 flex items-center space-x-1 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>On Schedule</span>
              </span>
            </div>

            <div className="p-2.5 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">STATUS</span>
              <span className="text-xs font-black text-slate-800 flex items-center space-x-1 mt-0.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>0 Anomalies</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* TARGET APPROACHING ALERT CARD */}
      <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-3.5 flex items-center justify-between">
        <div>
          <span className="text-[9px] font-black text-amber-800 uppercase tracking-widest block font-mono">
            TARGET APPROACHING
          </span>
          <div className="text-xs font-bold text-slate-900 mt-0.5">{pendingCheckpoint.name}</div>
        </div>
        <span className="px-2.5 py-1 bg-emerald-500 text-white text-[10px] font-black uppercase tracking-wider rounded-full shadow-2xs font-mono">
          Scan Ready
        </span>
      </div>

      {/* TACTICAL PATROL ROUTE & GPS HUD */}
      <div className="bg-slate-950 text-white rounded-3xl p-4 border border-slate-800 shadow-xl space-y-3 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Compass className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-black uppercase tracking-wider">Tactical Patrol Route</span>
          </div>
          <span className="text-[10px] font-mono text-emerald-400 flex items-center space-x-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>GPS Live • ±2m</span>
          </span>
        </div>

        {/* Tactical Map Visual Canvas */}
        <div className="h-40 bg-slate-900 rounded-2xl border border-slate-800 relative overflow-hidden flex flex-col justify-between p-3">
          {/* Tactical grid background */}
          <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] opacity-35"></div>

          {/* Radar Line Sweep */}
          <div className="absolute top-1/2 left-1/2 w-48 h-48 -translate-x-1/2 -translate-y-1/2 border border-emerald-500/20 rounded-full pointer-events-none">
            <div className="w-full h-full rounded-full border border-emerald-500/10 animate-ping"></div>
          </div>

          {/* Route path line & Checkpoint Nodes */}
          <div className="relative z-10 w-full h-full flex items-center justify-between px-4">
            {checkpoints.map((cp, idx) => {
              const isDone = cp.status === 'completed';
              const isTarget = cp.status === 'pending';
              return (
                <div key={cp.id} className="relative flex flex-col items-center">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all shadow-md ${
                      isDone
                        ? 'bg-emerald-500 text-slate-950 border-2 border-emerald-300'
                        : isTarget
                        ? 'bg-amber-500 text-slate-950 border-2 border-amber-300 ring-4 ring-amber-500/30 animate-pulse'
                        : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}
                  >
                    {isDone ? <CheckCircle2 className="w-4 h-4" /> : cp.order}
                  </div>
                  <span className="text-[9px] font-mono text-slate-300 mt-1 max-w-[60px] truncate text-center">
                    CP-0{cp.order}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Coordinate HUD chip */}
          <div className="relative z-10 bg-slate-950/80 backdrop-blur-xs px-3 py-1 rounded-xl border border-slate-800 self-center text-[10px] font-mono text-slate-300 flex items-center space-x-2">
            <span className="text-emerald-400 font-bold">LAT 34.0592° N</span>
            <span className="text-slate-600">•</span>
            <span className="text-emerald-400 font-bold">LON 118.4201° W</span>
          </div>
        </div>
      </div>

      {/* CHECKPOINT MANIFEST (Sequential Verification) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xs font-black text-slate-900 uppercase tracking-tight">
            CHECKPOINT MANIFEST
          </h3>
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">
            Sequential Verification
          </span>
        </div>

        <div className="space-y-3">
          {checkpoints.map((cp) => {
            const isCompleted = cp.status === 'completed';
            const isPending = cp.status === 'pending';

            return (
              <div
                key={cp.id}
                className={`bg-white rounded-3xl p-4 border transition-all ${
                  isPending
                    ? 'border-2 border-amber-400/80 shadow-md ring-2 ring-amber-400/10'
                    : isCompleted
                    ? 'border-slate-200'
                    : 'border-slate-200 opacity-80'
                }`}
              >
                {/* Header Row */}
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-sm font-black text-slate-900">{cp.name}</h4>
                    <div className="text-[11px] font-mono text-slate-500 mt-0.5 flex items-center space-x-1.5">
                      {cp.time && <span className="font-bold text-slate-700">{cp.time}</span>}
                      {cp.time && <span>•</span>}
                      <span>{cp.tagType} Tag {cp.tagId}</span>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-black uppercase font-mono px-2.5 py-0.5 rounded-full ${
                      isCompleted
                        ? 'bg-emerald-100 text-emerald-800'
                        : isPending
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    • {cp.status}
                  </span>
                </div>

                {/* Inspection Note / Instructions */}
                {cp.note && (
                  <p className="text-xs text-slate-600 font-medium mt-2 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    {cp.note}
                  </p>
                )}

                {/* Evidence Image if attached */}
                {cp.image && (
                  <div className="mt-2.5 flex items-center space-x-2">
                    <span className="px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-[10px] font-mono text-slate-700 flex items-center space-x-1 border border-slate-200">
                      <Paperclip className="w-3 h-3 text-emerald-600" />
                      <span>{cp.image}</span>
                    </span>
                  </div>
                )}

                {/* Pending checkpoint instructions & CTA */}
                {isPending && (
                  <div className="mt-3 space-y-3 pt-2 border-t border-slate-100">
                    <div className="text-xs text-slate-500 font-medium flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5 text-amber-500" />
                      <span>{cp.estimatedProximity || 'Estimated Proximity: Within 5 mins'}</span>
                    </div>

                    <p className="text-xs text-slate-700 font-medium leading-relaxed bg-amber-50/50 p-2.5 rounded-xl border border-amber-200/60">
                      {cp.instructions}
                    </p>

                    {/* Primary Scan Button */}
                    <button
                      onClick={() => {
                        sound.playRadioChirp();
                        onOpenScanner(cp);
                      }}
                      className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-black uppercase tracking-wider rounded-2xl shadow-md flex items-center justify-center space-x-2 transition-all active:scale-98"
                    >
                      <QrCode className="w-4 h-4 text-emerald-400" />
                      <span>CHECK IN NOW (SCAN QR / NFC)</span>
                    </button>
                  </div>
                )}

                {/* Scheduled details */}
                {cp.status === 'scheduled' && (
                  <div className="mt-2 text-xs text-slate-500 font-medium">
                    <span className="font-mono text-slate-400">{cp.targetWindow}</span>
                    <p className="text-[11px] text-slate-500 mt-1">{cp.instructions}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* OFFICER TACTICAL LOGGERS */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-3">
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest font-mono">
          OFFICER TACTICAL LOGGERS
        </span>

        <div className="grid grid-cols-2 gap-2.5">
          <button
            onClick={() => {
              sound.playClick();
              onOpenAddNote();
            }}
            className="py-2.5 px-3 bg-slate-50 hover:bg-slate-100 rounded-2xl border border-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center space-x-1.5 transition-colors"
          >
            <Plus className="w-3.5 h-3.5 text-emerald-600" />
            <span>Add Field Note</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onOpenUploadPhoto();
            }}
            className="py-2.5 px-3 bg-slate-50 hover:bg-slate-100 rounded-2xl border border-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center space-x-1.5 transition-colors"
          >
            <Camera className="w-3.5 h-3.5 text-emerald-600" />
            <span>Upload Photo</span>
          </button>
        </div>
      </div>

      {/* COMPLETION & REPORT SUBMIT CARD */}
      <div className="space-y-2">
        <button
          onClick={() => {
            sound.playClick();
            onOpenSubmitReport();
          }}
          className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 active:scale-98 text-white text-xs font-black uppercase tracking-wider rounded-2xl shadow-lg flex items-center justify-center space-x-2 transition-all"
        >
          <FileCheck className="w-4 h-4 text-emerald-400" />
          <span>Complete & Submit Patrol Report</span>
        </button>

        <div className="text-center flex items-center justify-center space-x-1 text-[10px] font-mono text-slate-400">
          <Lock className="w-3 h-3 text-emerald-600" />
          <span>Encrypted ISO-27001 Security Audit Log Hash Active</span>
        </div>
      </div>
    </div>
  );
};
