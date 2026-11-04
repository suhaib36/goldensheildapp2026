import React, { useState } from 'react';
import { X, AlertTriangle, Radio, ShieldAlert, PhoneCall, CheckCircle2, Siren } from 'lucide-react';
import { sound } from '../../utils/audio';

interface IncidentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReportIncident: (title: string, category: string, severity: 'low' | 'medium' | 'high' | 'critical', desc: string) => void;
}

export const IncidentModal: React.FC<IncidentModalProps> = ({
  isOpen,
  onClose,
  onReportIncident,
}) => {
  const [incidentType, setIncidentType] = useState<string>('Unauthorized Intrusion / Loitering');
  const [severity, setSeverity] = useState<'low' | 'medium' | 'high' | 'critical'>('high');
  const [description, setDescription] = useState<string>('');
  const [isTransmitting, setIsTransmitting] = useState<boolean>(false);
  const [transmitted, setTransmitted] = useState<boolean>(false);

  if (!isOpen) return null;

  const incidentTypes = [
    'Unauthorized Intrusion / Loitering',
    'Forced Entry / Broken Barrier',
    'Suspicious Package / Unattended Item',
    'Medical Assistance Required',
    'Fire Alarm / Smoke Detected',
    'Verbal Dispute / Physical Altercation',
  ];

  const handleTriggerSOS = () => {
    setIsTransmitting(true);
    sound.playEmergencyAlarm();

    setTimeout(() => {
      setIsTransmitting(false);
      setTransmitted(true);
      sound.playRadioChirp();

      onReportIncident(
        incidentType,
        'Security Alert',
        severity,
        description || 'Emergency alert dispatched to Central Security Operations. Backup unit notified.'
      );

      setTimeout(() => {
        setTransmitted(false);
        onClose();
      }, 2000);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-red-950/80 backdrop-blur-md p-4 animate-in fade-in duration-150">
      <div className="bg-slate-900 border-2 border-red-500/60 w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl text-white relative">
        {/* Header */}
        <div className="p-4 bg-red-600 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-white text-red-600 flex items-center justify-center shadow-md animate-bounce">
              <Siren className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-black tracking-widest uppercase text-white">INSTANT SOS & DISPATCH</div>
              <div className="text-[10px] text-red-100 font-mono">PRIORITY TACTICAL OVERRIDE</div>
            </div>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-red-700 hover:bg-red-800 flex items-center justify-center text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {transmitted ? (
          <div className="p-8 text-center space-y-4 animate-in zoom-in duration-200">
            <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto drop-shadow-[0_0_12px_#34d399]" />
            <div>
              <h3 className="text-base font-black uppercase tracking-wider text-emerald-300">
                DISPATCH SIGNAL TRANSMITTED
              </h3>
              <p className="text-xs text-slate-300 mt-1 font-mono">
                Command center notified • GPS coordinates locked • Bodycam stream active
              </p>
            </div>
            <div className="bg-slate-800 p-3 rounded-xl border border-slate-700 text-[11px] font-mono text-emerald-400">
              DISPATCH TICKET #SEC-{Math.floor(1000 + Math.random() * 9000)}
            </div>
          </div>
        ) : (
          <div className="p-5 space-y-4">
            {/* Live Simulated Bodycam feed banner */}
            <div className="bg-slate-950 rounded-2xl p-3 border border-slate-800 relative overflow-hidden">
              <div className="flex items-center justify-between text-[10px] font-mono mb-2">
                <span className="flex items-center space-x-1.5 text-red-400 font-bold">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                  <span>BODYCAM LIVE STREAM</span>
                </span>
                <span className="text-slate-400">FPS: 30 • 1080p</span>
              </div>
              <div className="h-20 bg-slate-900 rounded-lg flex items-center justify-center border border-slate-800 relative">
                <Radio className="w-8 h-8 text-slate-600 animate-pulse" />
                <span className="absolute bottom-1 right-2 text-[9px] font-mono text-slate-500">
                  LAT 34.0592 • LON 118.4201
                </span>
              </div>
            </div>

            {/* Incident Type */}
            <div>
              <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">
                Incident Classification
              </label>
              <select
                value={incidentType}
                onChange={(e) => setIncidentType(e.target.value)}
                className="w-full text-xs font-semibold px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-red-500"
              >
                {incidentTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            {/* Severity Level */}
            <div>
              <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1.5">
                Severity Level
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {(['low', 'medium', 'high', 'critical'] as const).map((lvl) => (
                  <button
                    type="button"
                    key={lvl}
                    onClick={() => {
                      sound.playClick();
                      setSeverity(lvl);
                    }}
                    className={`py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all border ${
                      severity === lvl
                        ? lvl === 'critical'
                          ? 'bg-red-600 border-red-500 text-white shadow-md'
                          : lvl === 'high'
                          ? 'bg-orange-500 border-orange-400 text-white'
                          : lvl === 'medium'
                          ? 'bg-amber-500 border-amber-400 text-slate-950'
                          : 'bg-emerald-500 border-emerald-400 text-slate-950'
                        : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            {/* Observation Notes */}
            <div>
              <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">
                Field Briefing (Optional)
              </label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe perpetrator description, direction of travel, or immediate hazards..."
                className="w-full text-xs p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 resize-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            {/* Emergency SOS Trigger Button */}
            <button
              onClick={handleTriggerSOS}
              disabled={isTransmitting}
              className="w-full py-3.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 active:scale-98 text-white font-black text-xs uppercase tracking-widest rounded-xl shadow-xl shadow-red-600/40 flex items-center justify-center space-x-2 transition-all border border-red-400/40"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>{isTransmitting ? 'TRANSMITTING SOS SIGNAL...' : 'TRIGGER DISPATCH ALERT NOW'}</span>
            </button>

            {/* Direct Line Option */}
            <div className="flex items-center justify-center space-x-1.5 text-[11px] text-slate-400 pt-1">
              <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
              <span>Direct Link to Supervisor Marcus Vance: </span>
              <span className="text-white font-mono font-bold">Ext #401</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
