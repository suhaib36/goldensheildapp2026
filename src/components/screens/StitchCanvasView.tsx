import React from 'react';
import { OfficerProfile, Checkpoint, SecurityAssignment, FieldNote, TabType } from '../../types';
import { HomeScreen } from './HomeScreen';
import { AssignmentsScreen } from './AssignmentsScreen';
import { PatrolScreen } from './PatrolScreen';
import { ScheduleScreen } from './ScheduleScreen';
import { ExternalLink, Layers, Sparkles } from 'lucide-react';
import { sound } from '../../utils/audio';

interface StitchCanvasViewProps {
  officer: OfficerProfile;
  checkpoints: Checkpoint[];
  assignments: SecurityAssignment[];
  fieldNotes: FieldNote[];
  onOpenScanner: (checkpoint: Checkpoint) => void;
  onOpenSOS: () => void;
  onOpenAddNote: () => void;
  onOpenUploadPhoto: () => void;
  onOpenSubmitReport: () => void;
  onOpenTradeModal: () => void;
  onViewBriefing: (assignment: SecurityAssignment) => void;
  onFocusScreen: (tab: TabType) => void;
}

export const StitchCanvasView: React.FC<StitchCanvasViewProps> = ({
  officer,
  checkpoints,
  assignments,
  fieldNotes,
  onOpenScanner,
  onOpenSOS,
  onOpenAddNote,
  onOpenUploadPhoto,
  onOpenSubmitReport,
  onOpenTradeModal,
  onViewBriefing,
  onFocusScreen,
}) => {
  const screens = [
    {
      id: '109e566dc9d247b3a55a72f879969205',
      name: 'GOLDEN SHIELD PATROL',
      subtitle: 'Active Patrol Dispatch & Tactical HUD',
      tab: 'patrol' as TabType,
      component: (
        <PatrolScreen
          checkpoints={checkpoints}
          fieldNotes={fieldNotes}
          onOpenScanner={onOpenScanner}
          onOpenAddNote={onOpenAddNote}
          onOpenUploadPhoto={onOpenUploadPhoto}
          onOpenSubmitReport={onOpenSubmitReport}
        />
      ),
    },
    {
      id: '246fc5de515a4aeaaa37cb25067c8a4b',
      name: 'GOLDEN SHIELD ASSIGNMENTS',
      subtitle: 'Security Assignments & Post Rotations',
      tab: 'assignments' as TabType,
      component: (
        <AssignmentsScreen
          assignments={assignments}
          onNavigateToTab={onFocusScreen}
          onOpenTradeModal={onOpenTradeModal}
          onViewBriefing={onViewBriefing}
        />
      ),
    },
    {
      id: '723b093f68a14513852b2f8f82c89a2a',
      name: 'GOLDEN SHIELD HOME',
      subtitle: 'Officer Dashboard & Shift Telemetry',
      tab: 'home' as TabType,
      component: (
        <HomeScreen
          officer={officer}
          checkpoints={checkpoints}
          onNavigateToTab={onFocusScreen}
          onOpenScanner={onOpenScanner}
          onOpenSOS={onOpenSOS}
          onOpenAddNote={onOpenAddNote}
        />
      ),
    },
    {
      id: '8525570e3e1e447cace72e4d646a5c5d',
      name: 'GOLDEN SHIELD SCHEDULE',
      subtitle: 'Shift & Attendance Executive Roster',
      tab: 'schedule' as TabType,
      component: (
        <ScheduleScreen
          officer={officer}
          onNavigateToTab={onFocusScreen}
          onOpenTradeModal={onOpenTradeModal}
        />
      ),
    },
  ];

  return (
    <div className="w-full py-6 px-4">
      {/* Canvas Banner */}
      <div className="max-w-7xl mx-auto mb-6 bg-slate-900 text-white p-4 rounded-3xl border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-black tracking-widest text-amber-400 uppercase font-mono">
                GOOGLE STITCH PROJECT #2124397902356485373
              </span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.2 rounded-full font-mono">
                4 SCREENS SYNCHRONIZED
              </span>
            </div>
            <h2 className="text-base font-black text-white mt-0.5">Golden Shield Application Canvas</h2>
          </div>
        </div>

        <div className="text-xs text-slate-400 font-mono">
          Click any screen below to enter interactive single-screen device mode.
        </div>
      </div>

      {/* 4 Screens Horizontal Canvas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 max-w-7xl mx-auto items-start">
        {screens.map((screen, idx) => (
          <div key={screen.id} className="flex flex-col space-y-2">
            {/* Screen Header Label */}
            <div className="flex items-center justify-between px-2">
              <div>
                <span className="text-[10px] font-mono text-slate-500 font-bold block">
                  SCREEN 0{idx + 1} • {screen.tab.toUpperCase()}
                </span>
                <h3 className="text-xs font-black text-slate-200 tracking-tight">{screen.name}</h3>
              </div>
              <button
                onClick={() => {
                  sound.playClick();
                  onFocusScreen(screen.tab);
                }}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-emerald-400 text-[10px] font-mono font-bold rounded-lg border border-slate-700 flex items-center space-x-1 transition-all"
                title="Focus this screen in mobile device frame"
              >
                <span>Interactive</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>

            {/* Simulated Phone Frame */}
            <div className="bg-slate-900 p-2.5 rounded-[40px] border-4 border-slate-800 shadow-2xl relative">
              {/* Phone Speaker Notch */}
              <div className="w-24 h-4 bg-slate-950 rounded-b-xl mx-auto mb-2 relative z-20 flex items-center justify-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-slate-800"></div>
                <div className="w-8 h-1 bg-slate-800 rounded-full"></div>
              </div>

              {/* Screen Content Container with independent scroll */}
              <div className="bg-slate-100 rounded-[32px] overflow-hidden max-h-[780px] overflow-y-auto p-3 text-slate-900 border border-slate-200">
                {screen.component}
              </div>
            </div>

            {/* Screen Hash Pill */}
            <div className="text-center font-mono text-[9px] text-slate-500 truncate px-2">
              ID: {screen.id}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
