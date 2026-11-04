import React, { useState } from 'react';
import { TabType, Checkpoint, SecurityAssignment, FieldNote, IncidentAlert } from './types';
import {
  initialOfficer,
  initialCheckpoints,
  initialAssignments,
  initialFieldNotes,
  initialIncidents,
} from './data/mockData';
import { MobileHeader } from './components/MobileHeader';
import { BottomNav } from './components/BottomNav';
import { HomeScreen } from './components/screens/HomeScreen';
import { AssignmentsScreen } from './components/screens/AssignmentsScreen';
import { PatrolScreen } from './components/screens/PatrolScreen';
import { ScheduleScreen } from './components/screens/ScheduleScreen';
import { ProfileScreen } from './components/screens/ProfileScreen';
import { ScannerModal } from './components/modals/ScannerModal';
import { AddNoteModal } from './components/modals/AddNoteModal';
import { IncidentModal } from './components/modals/IncidentModal';
import { ShiftSwapModal } from './components/modals/ShiftSwapModal';
import { ReportSubmitModal } from './components/modals/ReportSubmitModal';
import { BriefingModal } from './components/modals/BriefingModal';
import { sound } from './utils/audio';

export const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<TabType>('home');

  // Core Dynamic Data State
  const [officer, setOfficer] = useState(initialOfficer);
  const [checkpoints, setCheckpoints] = useState<Checkpoint[]>(initialCheckpoints);
  const [assignments, setAssignments] = useState<SecurityAssignment[]>(initialAssignments);
  const [fieldNotes, setFieldNotes] = useState<FieldNote[]>(initialFieldNotes);
  const [incidents, setIncidents] = useState<IncidentAlert[]>(initialIncidents);

  // Modal Visibility States
  const [scannerOpen, setScannerOpen] = useState<boolean>(false);
  const [selectedScanCheckpoint, setSelectedScanCheckpoint] = useState<Checkpoint | null>(null);

  const [addNoteOpen, setAddNoteOpen] = useState<boolean>(false);
  const [addNoteMode, setAddNoteMode] = useState<'note' | 'photo'>('note');

  const [sosOpen, setSosOpen] = useState<boolean>(false);
  const [tradeOpen, setTradeOpen] = useState<boolean>(false);
  const [reportOpen, setReportOpen] = useState<boolean>(false);

  const [briefingOpen, setBriefingOpen] = useState<boolean>(false);
  const [selectedBriefing, setSelectedBriefing] = useState<SecurityAssignment | null>(null);

  // Verification Handler
  const handleVerifyCheckpoint = (checkpointId: string) => {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

    setCheckpoints((prev) =>
      prev.map((cp) => {
        if (cp.id === checkpointId) {
          return {
            ...cp,
            status: 'completed',
            time: timeString,
            note: 'NFC contact scan verified at console. Front visitor register inspected and verified.',
          };
        }
        if (cp.id === 'cp-04' && checkpointId === 'cp-03') {
          return {
            ...cp,
            status: 'pending',
            estimatedProximity: 'Within 10 mins',
          };
        }
        return cp;
      })
    );
  };

  // Add Field Note Handler
  const handleAddNote = (category: string, content: string, imageUrl?: string) => {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

    const newNote: FieldNote = {
      id: `fn-${Date.now()}`,
      timestamp: timeString,
      author: officer.name,
      category,
      content,
      imageUrl,
    };

    setFieldNotes((prev) => [newNote, ...prev]);
  };

  // Incident SOS Handler
  const handleReportIncident = (
    title: string,
    category: string,
    severity: 'low' | 'medium' | 'high' | 'critical',
    desc: string
  ) => {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

    const newInc: IncidentAlert = {
      id: `inc-${Date.now()}`,
      title,
      location: 'Westfield Business Center • Sector B',
      severity,
      timestamp: timeString,
      category,
      description: desc,
      resolved: false,
    };

    setIncidents((prev) => [newInc, ...prev]);
  };

  // Reset demo state
  const handleResetData = () => {
    setOfficer(initialOfficer);
    setCheckpoints(initialCheckpoints);
    setAssignments(initialAssignments);
    setFieldNotes(initialFieldNotes);
    setIncidents(initialIncidents);
  };

  const pendingCount = checkpoints.filter((c) => c.status === 'pending').length;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans select-none text-slate-900">
      {/* Attached Top Header matching Stitch design */}
      <MobileHeader
        currentTab={currentTab}
        onOpenSOS={() => setSosOpen(true)}
        onNavigateTab={(tab) => setCurrentTab(tab)}
      />

      {/* Mobile Screen Content Body */}
      <main className="flex-1 w-full max-w-md mx-auto px-4 py-4 pb-24 space-y-4">
        {currentTab === 'home' && (
          <HomeScreen
            officer={officer}
            checkpoints={checkpoints}
            onNavigateToTab={(tab) => setCurrentTab(tab)}
            onOpenScanner={(cp) => {
              setSelectedScanCheckpoint(cp);
              setScannerOpen(true);
            }}
            onOpenSOS={() => setSosOpen(true)}
            onOpenAddNote={() => {
              setAddNoteMode('note');
              setAddNoteOpen(true);
            }}
          />
        )}

        {currentTab === 'assignments' && (
          <AssignmentsScreen
            assignments={assignments}
            onNavigateToTab={(tab) => setCurrentTab(tab)}
            onOpenTradeModal={() => setTradeOpen(true)}
            onViewBriefing={(asg) => {
              setSelectedBriefing(asg);
              setBriefingOpen(true);
            }}
          />
        )}

        {currentTab === 'patrol' && (
          <PatrolScreen
            checkpoints={checkpoints}
            fieldNotes={fieldNotes}
            onOpenScanner={(cp) => {
              setSelectedScanCheckpoint(cp);
              setScannerOpen(true);
            }}
            onOpenAddNote={() => {
              setAddNoteMode('note');
              setAddNoteOpen(true);
            }}
            onOpenUploadPhoto={() => {
              setAddNoteMode('photo');
              setAddNoteOpen(true);
            }}
            onOpenSubmitReport={() => setReportOpen(true)}
          />
        )}

        {currentTab === 'schedule' && (
          <ScheduleScreen
            officer={officer}
            onNavigateToTab={(tab) => setCurrentTab(tab)}
            onOpenTradeModal={() => setTradeOpen(true)}
          />
        )}

        {currentTab === 'profile' && (
          <ProfileScreen
            officer={officer}
            onResetData={handleResetData}
            onOpenSOS={() => setSosOpen(true)}
          />
        )}
      </main>

      {/* Attached Bottom Navigation Bar */}
      <BottomNav
        currentTab={currentTab}
        onSelectTab={(tab) => setCurrentTab(tab)}
        pendingCheckpointsCount={pendingCount}
      />

      {/* Modals & Dialogs */}
      <ScannerModal
        isOpen={scannerOpen}
        onClose={() => setScannerOpen(false)}
        checkpoint={selectedScanCheckpoint}
        onVerifySuccess={handleVerifyCheckpoint}
      />

      <AddNoteModal
        isOpen={addNoteOpen}
        onClose={() => setAddNoteOpen(false)}
        onAddNote={handleAddNote}
        mode={addNoteMode}
      />

      <IncidentModal
        isOpen={sosOpen}
        onClose={() => setSosOpen(false)}
        onReportIncident={handleReportIncident}
      />

      <ShiftSwapModal
        isOpen={tradeOpen}
        onClose={() => setTradeOpen(false)}
      />

      <ReportSubmitModal
        isOpen={reportOpen}
        onClose={() => setReportOpen(false)}
        checkpoints={checkpoints}
        notes={fieldNotes}
        onSubmitComplete={() => {
          sound.playScanSuccess();
        }}
      />

      <BriefingModal
        isOpen={briefingOpen}
        onClose={() => setBriefingOpen(false)}
        assignment={selectedBriefing}
      />
    </div>
  );
};
export default App;
